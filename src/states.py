'Game states'

import game
from browser.local_storage import storage as local
from browser.session_storage import storage as session
from browser import window

STATES = None


def format_time(total_seconds):
    'Formats a number of seconds as mm:ss'
    total_seconds = int(float(total_seconds))  # In case we get a string
    minutes = total_seconds // 60
    seconds = total_seconds % 60
    return '{:0>2}:{:0>2}'.format(minutes, seconds)


def is_locked(level):
    """
    Returns True or False to indicate whether the specified level is locked.

    A level is locked if the previous level exists and has no best time.
    """

    if level == 1:
        return False

    return not get_best_time(level - 1)


def get_best_time(level):
    'Returns the best time for the given level'

    return int(float(local.get('bestTime{}'.format(level), 0)))


def get_current_level():
    'Returns the current level number'

    current = 1

    for level in range(2, 21):
        if is_locked(level):
            break
        current = level

    return current


def set_best_time(level, time):
    'Sets the best time for the given level, if better than the current best'

    # TODO: This method of storing times works, but it's pretty ugly.
    # Maybe look into abstracting the storage object with a wrapper
    # that JSON-ifies values going in?
    previous_best = get_best_time(level)

    if not previous_best or time < get_best_time(level):
        local['bestTime{}'.format(level)] = time


def boot():
    'Initial game state - loads the logo and starts the preload state'

    def _init():
        phaser = window.Phaser

        game.GAME.scale.scaleMode = phaser.ScaleManager.SHOW_ALL
        game.GAME.scale.fullScreenscaleMode = phaser.ScaleManager.SHOW_ALL

    def _preload():
        'Phaser state hook'
        print('boot state _preload() function')
        # TODO: Rename the file, too
        game.GAME.load.image('company_logo', 'assets/images/logo.png')

    def _create():
        'Phaser state hook'
        print('boot state _create() function')
        game.GAME.state.start('preload')

    return {
        'preload': _preload,
        'create': _create,
    }


def preload():
    'Preload state - loads the remaining assets'

    def _preload():
        'Phaser state hook'
        print('preload state _preload() function')
        # TODO: Change this secondary logo to be the NN icon
        # TODO: Change splash page from the cordova image to my EE image
        game.GAME.stage.backgroundColor = '#aaa'
        logo = game.GAME.add.sprite(
            game.GAME.world.centerX, game.GAME.world.centerY, 'company_logo')
        logo.anchor.setTo(0.5)
        logo.height = logo.width = game.GAME.world.width * 0.8

        # game.GAME.load.image('player', 'assets/images/NN-Player.jpg')
        game.GAME.load.image('tile', 'assets/images/basicTile.png')
        game.GAME.load.image('play_button', 'assets/images/Play.png')
        game.GAME.load.image('levels_button', 'assets/images/Level_Icon.png')
        game.GAME.load.image('level_button', 'assets/images/Level_Button.png')
        # TODO: create the InstructionsBG.png image
        game.GAME.load.image(
            'instructions', 'assets/images/InstructionsBG.png')
        game.GAME.load.image('lock', 'assets/images/Lock_Icon.png')
        game.GAME.load.image('menu', 'assets/images/MenuButton.png')
        game.GAME.load.image('replay', 'assets/images/ReplayArrow.png')
        game.GAME.load.image('continue', 'assets/images/ContinueArrow.png')
        game.GAME.load.spritesheet(
            'player', 'assets/images/PlayerSheet.png', 100, 100, 4, 0, 0)
        game.GAME.load.spritesheet(
            'baddie', 'assets/images/BullySheet.png', 100, 100, 4, 0, 0)
        game.GAME.load.spritesheet(
            'level_icons', 'assets/images/levels.png', 64, 64, 5, 0, 0)

        game.GAME.load.text('levels', 'assets/data/levels.json')

    def _create():
        'Phaser state hook'

        print('preload state _create() function')

        def next_state():
            'Start the next state'
            game.GAME.state.start('home')

        game.GAME.time.events.add(
            window.Phaser.Timer.SECOND * 2,
            next_state
        )

    return {
        'preload': _preload,
        'create': _create,
    }


def home():
    'Home game state - provides the home screen / main menu'

    def _init():
        'Phaser state hook'
        print('home state _init() function')

    def _create():
        'Phaser state hook'
        print('home state _create() function')
        game.GAME.stage.backgroundColor = '#000'
        width = game.GAME.width
        height = game.GAME.height

        play_button = game.GAME.add.button(
            width / 2, height * 2 / 3, 'play_button', _play)
        play_button.anchor.setTo(0.5)
        play_button.scale.setTo(0.5)

        levels_button = game.GAME.add.button(
            width / 2, height / 3, 'levels_button', _start_level_selector)
        levels_button.anchor.setTo(0.5)
        levels_button.scale.setTo(0.5)

    # TODO: The third parameter is boolean, but what does it mean?
    def _play(button, event, _):
        'Switch to the game state'

        # TODO: Check for customParams.level_number

        custom_params = getattr(button, 'customParams', {})
        level = custom_params.get('level', None)
        if level is None:
            level = get_current_level()
        print('setting session["level"] to {}'.format(level))
        session['level'] = str(level)
        game.GAME.state.start('play')

    def _start_level_selector():
        'Switch to the level selector state'
        print('home state _start_level_selector() function')
        game.GAME.state.start('level_selector')

    return {
        'init': _init,
        'create': _create,
        'play': _play,
    }


def level_selector():
    'Level selector game state - allows the player to choose a level'

    def _init():
        'Phaser state hook'

        print('level_selector state init hook')
        game.GAME.stage.backgroundColor = '#000'

    def _create():
        'Phaser state hook'

        print('level_selector state create hook')
        levels = 20
        row_length = 4
        row_count = levels / row_length
        width = game.GAME.width
        button_width = width / (row_length + 1)
        center_x = game.GAME.world.centerX
        center_y = game.GAME.world.centerY

        # Lay out the level buttons
        for level in range(1, levels + 1):
            # Find position, starting from the center of the screen
            # Assumes square buttons for now
            pos_x = (
                (level - 1) % row_length - row_length / 2 + 0.5
            ) * button_width + center_x
            pos_y = (
                (level - 1) // row_length - row_count / 2 + 0.5
            ) * button_width + center_y
            button = game.GAME.add.button(
                pos_x, pos_y, 'level_button', STATES['home']['play'])
            # Note: Changing the anchor changes the position. Could this be
            # useful for later things, such as a scrolling background?
            button.anchor.setTo(0.5)

            button.width = button.height = button_width
            button.customParams = {}
            button.customParams['level'] = level

            best_time = get_best_time(level)
            if best_time is not None:
                size = button_width // 5
                record_text = game.GAME.add.text(pos_x, pos_y)
                record_text.text = format_time(best_time)
                record_text.style.font = 'bold {}pt Arial'.format(size)
                record_text.style.fill = '#00f'
                record_text.anchor.setTo(0.5, -0.4)

            if is_locked(level):
                print('level {} is locked'.format(level))
                level_lock = game.GAME.add.sprite(pos_x, pos_y, 'lock')
                level_lock.anchor.setTo(0.5, 0.6)
                level_lock.width = level_lock.height = button.width * 0.5
                button.inputEnabled = False
            else:
                print('level {} is not locked'.format(level))
                level_text = game.GAME.add.text(pos_x, pos_y)
                level_text.text = str(level)
                size = button_width // 2
                level_text.style.font = 'bold {}pt Arial'.format(size)
                level_text.style.fill = '#00f'
                level_text.anchor.setTo(0.5, 0.60)

    return {
        'create': _create,
    }


def play():
    'Play game state - allows the user to play the game!'

    # First argument is the game object.
    def _create():
        'Phaser state hook'
        level_number = int(session.get('level', 1))
        print('play state create hook, level number: {}'.format(level_number))

    return {
        'create': _create,
    }


STATES = {
    'boot': boot(),
    'preload': preload(),
    'home': home(),
    'level_selector': level_selector(),
    'play': play(),
}
