var NN = NN || {};

NN.HomeState = NN.HomeState || {};

NN.HomeState.init = function() {
    this.game.stage.backgroundColor = '#000';
};

NN.HomeState.preload = function() {
};

NN.HomeState.create = function() {
    var button_width = this.game.width / 2;
    var button_height = this.game.height / 10;
    this.playButton = this.add.button(this.game.width / 2, this.game.height * 4 / 6, 'play_button', NN.HomeState.startGameState, this),
    this.levelsButton = this.add.button(this.game.width / 2, this.game.height * 2 / 6, 'levels_button', NN.HomeState.startLevelSelectorState, this),
    this.playButton.anchor.setTo(0.5);
    this.playButton.scale.setTo(0.5);
    this.levelsButton.anchor.setTo(0.5);
    this.levelsButton.scale.setTo(0.5);
};

NN.HomeState.startGameState = function(button) {
    if (button.customParams) {
        this.state.start('GameState', true, false, button.customParams.levelNumber);
    }
    else {
        this.state.start('GameState');
    }
};

NN.HomeState.startLevelSelectorState = function() {
    this.state.start('LevelSelectorState');
};
