var NN = NN || {};

//initiate the Phaser framework
NN.game = new Phaser.Game(360, 640, Phaser.AUTO);

NN.game.state.add('GameState', NN.GameState);
NN.game.state.start('GameState');
