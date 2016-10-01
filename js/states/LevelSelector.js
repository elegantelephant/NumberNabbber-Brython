var NN = NN || {};

NN.LevelSelectorState = NN.LevelSelectorState || {};

NN.LevelSelectorState.init = function() {
    this.game.stage.backgroundColor = '#000';
};

NN.LevelSelectorState.preload = function() {
};

NN.LevelSelectorState.create = function() {
    var i = 1;
    var record = [];
    var storedRecord;
    while (i <= 20) {
        var buttonX = (1 + (i-1) % 4) * this.game.width / 5;
        var buttonY = (2 + Math.floor((i-1) / 4)) * this.game.width / 5;
        this.levelsButton = this.add.button(buttonX, buttonY, 'level_button', NN.LevelSelectorState.startGameState, this),
        this.levelsButton.anchor.setTo(0.5);
        this.levelsButton.width = this.game.width / 5 - 2;
        this.levelsButton.height = this.game.width / 5 - 2;
        this.levelsButton.customParams = {};
        this.levelsButton.customParams.levelNumber = i;
        storedRecord = localStorage.getItem('bestTime' + i);
        record[i] = NN.GameState.stringifyTime(storedRecord);

            this.recordText = this.add.text(buttonX, buttonY);
            this.recordText.style.font = 'bold 18pt Arial';
            this.recordText.style.fill = '#00f';
            this.recordText.anchor.setTo(0.5, 0);

        if (record[i]) {
            // show records
            this.recordText.text = record[i];
        }
        else if (!record[i-1] && i > 1) {
            // unlock if previous level is beaten
            this.recordText.text = 'LOCK';
        }

        this.levelText = this.add.text(buttonX, buttonY);
        this.levelText.style.font = 'bold 30pt Arial';
        this.levelText.style.fill = '#00f';
        this.levelText.text = i.toString();
        this.levelText.anchor.setTo(0.5, 0.75);

        i++;
    }
};

NN.LevelSelectorState.startGameState = function(button) {
    this.state.start('GameState', true, false, button.customParams.levelNumber);
};
