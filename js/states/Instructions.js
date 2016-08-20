var NN = NN || {};

NN.InstructionsState = NN.InstructionsState || {};

NN.InstructionsState.init = function(levelnum) {
    this.game.stage.backgroundColor = '#00f';
    this.levelnum = levelnum;
    this.GAMEY = this.game.world.height;
};

NN.InstructionsState.preload = function() {
};

NN.InstructionsState.create = function() {
    var background = this.game.add.sprite(0,0,'instructions');
    background.inputEnabled = true;

    var style = {font: 'bold 30pt Arial', fill: '#0f0'};
    if ( this.levelnum == 1 ) {
        this.game.add.text(30, this.GAMEY / 3 - 10,     'Swipe to move', style);
        this.game.add.text(30, this.GAMEY / 2 - 10,     'and tap to nab', style);
        this.game.add.text(30, this.GAMEY * 2 / 3 - 10, 'all the answers', style);
    }

    if ( this.levelnum == 2 ) {
        this.game.add.text(30, this.GAMEY / 3 - 10,     'The answers are', style);
        this.game.add.text(30, this.GAMEY / 2 - 10,     'multiples of the', style);
        this.game.add.text(30, this.GAMEY * 2 / 3 - 10, 'current level', style);
    }

    if ( this.levelnum == 3 ) {
        this.game.add.text(30, this.GAMEY / 3 - 10,     'Enjoy your last', style);
        this.game.add.text(30, this.GAMEY / 2 - 10,     'level without', style);
        this.game.add.text(30, this.GAMEY * 2 / 3 - 10, 'enemies!', style);
    }

    background.events.onInputDown.add(function() {
        this.startGameState();
    }, this);
};

NN.InstructionsState.startGameState = function(button) {
    this.state.start('GameState', true, false, this.levelnum, true);
};
