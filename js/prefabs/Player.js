var NN = NN || {};

NN.Player = function(game, key) {
    Phaser.Sprite.call(this, game, key);

    this.game = game;

    {
        this.add.sprite(-500, -500, 'player', 2);

        var player_scale_x = this.tile_size / this.player.width;
        var player_scale_y = this.tile_size / this.player.height;
        this.player.scale.setTo(player_scale_x, player_scale_y);
    }
};
