var NN = NN || {};

//initiate the Phaser framework
NN.game = new Phaser.Game(360, 640, Phaser.AUTO);

NN.game.state.add('BootState', NN.BootState);
NN.game.state.add('PreloadState', NN.PreloadState);
NN.game.state.add('HomeState', NN.HomeState);
NN.game.state.add('LevelSelectorState', NN.LevelSelectorState);
NN.game.state.add('GameState', NN.GameState);
NN.game.state.start('BootState');
