'Game states'

import game
from browser import window

STATES = None


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
            width / 2, height * 2 / 3, 'play_button', _start_game)
        play_button.anchor.setTo(0.5)
        play_button.scale.setTo(0.5)

        levels_button = game.GAME.add.button(
            width / 2, height / 3, 'levels_button', _start_level_selector)
        levels_button.anchor.setTo(0.5)
        levels_button.scale.setTo(0.5)

    def _start_game(button, event, unknown_flag):
        'Switch to the game state'

        if button.customParams:
            game.GAME.state.start(
                'play', True, False, button.customParams.levelNumber)
        else:
            game.GAME.state.start('play')

    def _start_level_selector():
        'Switch to the level selector state'
        print('home state _start_level_selector() function')
        game.GAME.state.start('level_selector')

    return {
        'init': _init,
        'create': _create,
    }


def level_selector():
    'Level selector game state - allows the player to choose a level'

    def _create():
        'Phaser state hook'
        print('level_selector state create hook')

    return {
        'create': _create,
    }


def play():
    'Play game state - allows the user to play the game!'

    def _create(level_number=1):
        'Phaser state hook'
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
