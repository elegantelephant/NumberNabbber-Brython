'This will contain all the things!'

from browser import window
from states import STATES

PHASER = window.Phaser
GAME = None


def run():
    'Run the game'

    global GAME
    GAME = PHASER.Game.new(
        360,
        640,
        PHASER.CANVAS,
        'game'
    )
    for key, state in STATES.items():
        print('Adding {} state'.format(key))
        GAME.state.add(key, state)
    GAME.state.start('boot')
