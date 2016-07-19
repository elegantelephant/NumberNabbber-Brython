var NN = NN || {};

NN.LevelSelectorState = NN.LevelSelectorState || {};

NN.LevelSelectorState.init = function() {
    this.game.stage.backgroundColor = '#000';
};

NN.LevelSelectorState.preload = function() {

};

NN.LevelSelectorState.create = function() {
    var i = 1;
    while (i <= 20) {
        var buttonX = (1 + (i % 4) * this.game.width) / 6;
        var buttonY = (2 + (i / 4) * this.game.height) / 7;
        this.levelsButton = this.add.button(buttonX, buttonY, 'levels_button', NN.HomeState.start, this),
        i++;
        this.levelsButton.anchor.setTo(0.5);
        this.levelsButton.scale.setTo(0.25, 0.5);
    }
    //this.startButton.onInputOut.add(over, this);
    //this.startButton.style.font = 'Arial';
    //this.startButton.style.fontSize = '80%';
    //this.startButton.style.color = '#fff';
    //this.startButton.style.border = '0.1em solid #fff';

    //this.startButton.onInputDown(NN.HomeState.start, this);
};

NN.HomeState.start = function() {
    this.state.start('GameState');
};

NN.LevelSelectorState.start = function() {
    this.state.start('LevelSelectorState');
};
