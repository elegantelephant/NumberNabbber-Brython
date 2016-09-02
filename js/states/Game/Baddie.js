var NN = NN || {};

NN.GameState = NN.GameState || {};

NN.GameState.generateBaddies = function() {
    this.baddies = this.add.group();
    this.baddies.enableBody = true;
    this.game.physics.arcade.enable(this.baddies);
    this.baddieStartPos = [this.levelData.columns - 1, this.levelData.rows - 1];
    this.spawnBaddie();
};

NN.GameState.spawnBaddie = function() {
    var spawnInterval = 4800;
    var baddie = this.createCharacter('baddie', this.baddieStartPos[0], this.baddieStartPos[1], 'left');
    this.baddies.add(baddie);
    var beforeMoving = 1300;
    this.moveBaddieTimer = this.game.time.events.add(beforeMoving, function(){
        this.moveBaddie(baddie);
    }, this);

    if (this.baddies.length < this.levelData.baddies) {
        this.nextBaddieTimer = this.game.time.events.add(spawnInterval, function(){
            this.spawnBaddie();
        }, this);
    }
};

NN.GameState.moveBaddie = function (baddie) {
    var directions = ['up', 'down', 'left', 'right'];
    // give him a much better chance of moving than of turning.
    for (var i = 1; i <= 7; i++ ) {
        directions.push(baddie.customParams.facing);
    };

    // move if he choses the direction he is facing, turn otherwise.
    var chosenDirection = library.choose(directions);
    if (chosenDirection == baddie.customParams.facing) {
        if (this.onBoard(baddie, chosenDirection) && this.canGo(baddie, chosenDirection)) {
            this.moveTo(baddie, chosenDirection);
        }
        else {
            this.moveBaddie(baddie);
            return;
        }
    }
    else {
        this.face(baddie, chosenDirection);
    }

    // wait for a moveInterval, then move again.
    var moveInterval = 1300 + Math.floor(Math.random() * 100);
    this.moveBaddieTimer = this.game.time.events.add(moveInterval, function(){
        this.moveBaddie(baddie);
    }, this);
};

NN.GameState.canGo = function(char, direction) {
    // check to see if there is a baddie in that direction already.
    return true;
};

NN.GameState.baddieAttack = function() {
    if(this.player.customParams.invincible) {
        return;
    }
    var invincibleTime = 4000;
    this.player.customParams.invincible = true;
    this.invincibleTimer = this.game.time.events.add(invincibleTime, function(){
        this.player.customParams.invincible = false;
    }, this);

    this.removeNabbed();
    this.removeNabbed();
    this.mixEmUp();
};
