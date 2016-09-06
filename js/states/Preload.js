var NN = NN || {};

NN.PreloadState = NN.PreloadState || {};

NN.PreloadState.preload = function() {
    // TODO change this secondary logo to be the NN icon
    // Change splash page from the cordova image to my EE image
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5);
    this.logo.width = this.game.world.width * 0.80;
    this.logo.height = this.game.world.width * 0.80;

    //this.load.image('player', 'assets/images/NN-Player.jpg');
    this.load.image('tile', 'assets/images/basicTile.png');
    this.load.image('play_button', 'assets/images/Play.png');
    this.load.image('levels_button', 'assets/images/Level_Icon.png');
    this.load.image('level_button', 'assets/images/Level_Button.png');
    // TODO create the InstructionsBG.png image
    this.load.image('instructions', 'assets/images/InstructionsBG.png');
    this.load.spritesheet('player', 'assets/images/PlayerSheet.png', 100, 100, 4, 0, 0);
    this.load.spritesheet('baddie', 'assets/images/BullySheet.png', 100, 100, 4, 0, 0);
    this.load.spritesheet('level_icons', 'assets/images/levels.png', 64, 64, 5, 0, 0);

    this.load.text('levels', 'assets/data/levels.json');
};

NN.PreloadState.create = function() {
    this.game.time.events.add(Phaser.Timer.SECOND * 2, function() {
        this.state.start('HomeState');
    }, this);
};
