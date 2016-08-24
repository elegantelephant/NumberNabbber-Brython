var NN = NN || {};

NN.InstructionsState = NN.InstructionsState || {};

NN.InstructionsState.init = function(levelnum) {
    this.game.stage.backgroundColor = '#00f';
    this.levelnum = levelnum;
    this.GAMEX = this.game.world.width;
    this.GAMEY = this.game.world.height;
};

NN.InstructionsState.preload = function() {
};

NN.InstructionsState.create = function() {
    var background = this.game.add.sprite(0,0,'instructions');
    background.inputEnabled = true;
    background.x = 0;
    background.y = 0;
    background.height = this.GAMEY;
    background.width = this.GAMEX;
    // background.scaleX = (0.5);
    // background.scaleY = (0.2);
    // background.scaleX = (this.GAMEX / background.width);
    // background.scaleY = (this.GAMEY / background.height);

    var style = {font: 'bold 24pt Arial', fill: '#0f0'};
    var words1 = this.game.add.text(this.GAMEX/2, this.GAMEY / 3,     'Text', style);
    var words2 = this.game.add.text(this.GAMEX/2, this.GAMEY / 2,     'Text', style);
    var words3 = this.game.add.text(this.GAMEX/2, this.GAMEY * 2 / 3, 'Text', style);
    words1.anchor.setTo(0.5); 
    words2.anchor.setTo(0.5); 
    words3.anchor.setTo(0.5); 

    if ( this.levelnum == 1 ) {
        words1.text = 'Swipe to move';
        words2.text = 'and tap to nab';
        words3.text = 'all the answers';
    }

    if ( this.levelnum == 2 ) {
        words1.text = 'The answers are';
        words2.text = 'multiples of the';
        words3.text = 'current level';
    }

    if ( this.levelnum == 3 ) {
        words1.text = 'Enjoy your last';
        words2.text = 'level without';
        words3.text = 'enemies!';
    }

    background.events.onInputDown.add(function() {
        this.startGameState();
    }, this);
};

NN.InstructionsState.startGameState = function(button) {
    this.state.start('GameState', true, false, this.levelnum, true);
};
