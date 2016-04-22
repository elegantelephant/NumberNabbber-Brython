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
    this.buttonText = this.game.add.text(button_width, button_height, 'Start!');
    //this.buttonImage.ctx.fillStyle = '#3b3';

    // The next two lines don't seem to have the effect of giving us a white
    // box around our green button
    //this.buttonImage.ctx.strokeStyle = '#fff';
    //this.buttonImage.ctx.lineWidth = 5;

    //this.buttonImage.ctx.fillRect(0, 0, button_width - 1, button_height - 1);

    this.startButton = this.add.button(this.game.width / 2, this.game.height * 4 / 5, this.buttonText, NN.HomeState.start, this),
    this.startButton.anchor.setTo(0.5);
    //this.startButton.style.font = 'Arial';
    //this.startButton.style.fontSize = '80%';
    //this.startButton.style.color = '#fff';
    //this.startButton.style.border = '0.1em solid #fff';

    //this.startButton.onInputDown(NN.HomeState.start, this);
};

NN.HomeState.start = function() {
    this.state.start('GameState');
};
