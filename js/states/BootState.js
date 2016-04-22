var NN = NN || {};

NN.BootState = NN.BootState || {};

NN.BootState.init = function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
};

NN.BootState.preload = function() {
    this.load.image('logo', 'assets/images/logo.png');
};

NN.BootState.create = function() {
    this.state.start('PreloadState');
};
