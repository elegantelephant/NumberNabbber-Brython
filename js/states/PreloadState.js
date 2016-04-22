var NN = NN || {};

NN.PreloadState = NN.PreloadState || {};

NN.PreloadState.preload = function() {

    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5);
    this.logo.width = this.game.world.width * 0.80;
    this.logo.height = this.game.world.width * 0.80;

    //this.load.image('player', 'assets/images/NN-Player.jpg');
    this.load.image('tile', 'assets/images/basicTile.png');
    this.load.spritesheet('player', 'assets/images/Green_Circles_100.png', 100, 100, 4, 0, 0);
    this.load.spritesheet('baddie', 'assets/images/Red_Circles_100.png', 100, 100, 4, 0, 0);

    this.load.text('level1', 'assets/data/level1.json');
    this.load.text('level2', 'assets/data/level2.json');
    this.load.text('level3', 'assets/data/level3.json');
    this.load.text('level4', 'assets/data/level4.json');
    /*
    this.load.text('level5', 'assets/data/level5.json');
    this.load.text('level6', 'assets/data/level6.json');
    this.load.text('level7', 'assets/data/level7.json');
    this.load.text('level8', 'assets/data/level8.json');
    this.load.text('level9', 'assets/data/level9.json');
    this.load.text('level10', 'assets/data/level10.json');
    this.load.text('level11', 'assets/data/level11.json');
    this.load.text('level12', 'assets/data/level12.json');
    this.load.text('level13', 'assets/data/level13.json');
    this.load.text('level14', 'assets/data/level14.json');
    this.load.text('level15', 'assets/data/level15.json');
    this.load.text('level16', 'assets/data/level16.json');
    this.load.text('level17', 'assets/data/level17.json');
    this.load.text('level18', 'assets/data/level18.json');
    this.load.text('level19', 'assets/data/level19.json');
    this.load.text('level20', 'assets/data/level20.json');
    */
};

NN.PreloadState.create = function() {
    this.game.time.events.add(Phaser.Timer.SECOND * 2, function() {
        this.state.start('GameState');
    }, this);
};
