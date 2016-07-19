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
    // this.buttonText = this.game.add.text(button_width, button_height, 'Start!');
    // this.buttonImage.ctx.fillStyle = '#3b3';

    // The next two lines don't seem to have the effect of giving us a white
    // box around our green button
    //this.buttonImage.ctx.strokeStyle = '#fff';
    //this.buttonImage.ctx.lineWidth = 5;

    //this.buttonImage.ctx.fillRect(0, 0, button_width - 1, button_height - 1);

    //this.startButton = this.add.button(this.game.width / 2, this.game.height * 4 / 5, this.buttonText, NN.HomeState.start, this),
    this.startButton = this.add.button(this.game.width / 2, this.game.height * 4 / 6, 'play_button', NN.HomeState.start, this),
    this.levelsButton = this.add.button(this.game.width / 2, this.game.height * 2 / 6, 'levels_button', NN.HomeState.start, this),
    // this.levelsButton = this.add.button(this.game.width / 2, this.game.height * 2 / 6, 'levels_button', NN.LevelSelectorState.start, this),
    this.startButton.anchor.setTo(0.5);
    this.startButton.scale.setTo(0.5);
    this.levelsButton.anchor.setTo(0.5);
    this.levelsButton.scale.setTo(0.5);

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
    this.state.start('GameState');
//     this.state.start('LevelSelectorState');
};
