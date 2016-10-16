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
    var buttonX;
    var buttonY;
    while (i <= 20) {
        buttonX = (1 + (i-1) % 4) * this.game.width / 5;
        buttonY = (2 + Math.floor((i-1) / 4)) * this.game.width / 5;
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

            this.levelText = this.add.text(buttonX, buttonY);
            this.levelText.style.font = 'bold 50pt Arial';
            this.levelText.style.fill = '#00f';
            this.levelText.text = i.toString();
            this.levelText.anchor.setTo(0.5);

        if (record[i-1] || record[i] || i == 1) {
            // this level is unlocked ... display level number
            if (record[i]) {
                // show records, since they beat this level already
                this.recordText.text = record[i];
                this.levelText.style.font = 'bold 30pt Arial';
                this.levelText.anchor.setTo(0.5, 0.75);
            }
        }
        else if (!record[i-1] && i > 1) {
            // This level is locked
            this.levelText.style.font = 'bold 11pt Arial';
            this.levelText.anchor.setTo(0.5);
            this.levelText.x += this.levelsButton.width/4;
            this.levelText.y -= this.levelsButton.width/3.5;

            this.levelLock = this.add.sprite(buttonX, buttonY, 'lock');
            this.levelLock.anchor.setTo(0.6, 0.5);
            this.levelLock.scale.setTo(this.levelsButton.width/this.levelLock.width*0.6);
            this.levelsButton.input.enabled = false;
        }

        i++;
    }
};

NN.LevelSelectorState.startGameState = function(button) {
    this.state.start('GameState', true, false, button.customParams.levelNumber);
};
