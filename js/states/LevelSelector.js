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
        var buttonX = (1 + (i-1) % 4) * this.game.width / 5;
        var buttonY = (2 + Math.floor((i-1) / 4)) * this.game.width / 5;
        this.levelsButton = this.add.button(buttonX, buttonY, 'level_button', NN.LevelSelectorState.startGameState, this),
        this.levelsButton.anchor.setTo(0.5);
        this.levelsButton.width = this.game.width / 5;
        this.levelsButton.height = this.game.width / 5;
        this.levelsButton.customParams = {};
        this.levelsButton.customParams.levelNumber = i;

        this.levelText = this.add.text(buttonX, buttonY);
        this.levelText.style.font = 'bold 30pt Arial';
        this.levelText.style.fill = '#000';
        this.levelText.text = i.toString();
        this.levelText.anchor.setTo(0.5);

        i++;
    }
};

NN.LevelSelectorState.startGameState = function(button) {
    this.state.start('GameState', true, false, button.customParams.levelNumber);
};
