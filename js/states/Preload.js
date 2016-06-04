var NN = NN || {};

NN.PreloadState = NN.PreloadState || {};

NN.PreloadState.preload = function() {

    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5);
    this.logo.width = this.game.world.width * 0.80;
    this.logo.height = this.game.world.width * 0.80;

    //this.load.image('player', 'assets/images/NN-Player.jpg');
    this.load.image('tile', 'assets/images/basicTile.png');
    this.load.image('play_button', 'assets/images/Play.png');
    this.load.image('levels_button', 'assets/images/Level_Icon.png');
    this.load.spritesheet('player', 'assets/images/Green_Circles_100.png', 100, 100, 4, 0, 0);
    this.load.spritesheet('baddie', 'assets/images/Red_Circles_100.png', 100, 100, 4, 0, 0);

    this.load.text('levels', 'assets/data/levels.json');
};

NN.PreloadState.create = function() {
    this.game.time.events.add(Phaser.Timer.SECOND * 2, function() {
        this.state.start('HomeState');
    }, this);
};
