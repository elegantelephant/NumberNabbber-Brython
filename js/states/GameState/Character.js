var NN = NN || {};

NN.GameState = NN.GameState || {};

NN.GameState.createCharacter = function(handle, startX, startY, direction) {
    var character = this.add.sprite(0, 0, handle, this.facing[direction]);
    character.customParams = {};
    character.customParams.x = startX;
    character.customParams.y = startY;
    character.customParams.facing = direction;
    var position = this.coordsFromPos(startX, startY);
    character.position.x = position[0];
    character.position.y = position[1];
    var characterScaleX = this.tileSize * 0.8 / character.width;
    var characterScaleY = this.tileSize * 0.8 / character.height;
    character.scale.setTo(characterScaleX, characterScaleY);
    character.anchor.setTo(0.5);
    return character;
};

NN.GameState.updatePlayer = function() {
    if (this.keyboard.left.isDown) {
        this.moveTo(this.player, 'left');
    }
    else if (this.keyboard.right.isDown) {
        this.moveTo(this.player, 'right');
    }
    else if (this.keyboard.up.isDown) {
        this.moveTo(this.player, 'up');
    }
    else if (this.keyboard.down.isDown) {
        this.moveTo(this.player, 'down');
    }
    if (this.keyboard.space.isDown) {
        // this.nab(this.board[this.player.customParams.x][this.player.customParams.y]);
        this.nab();
    }

    if (this.player.customParams.invincible) {
        if (this.time.now % 300 < 130) {
            // this.player.visible = false;
            this.player.alpha = 0.4;
        }
        else {
            this.player.alpha = 0.8;
        }
    }
    else {
        // this.player.visible = true;
        this.player.alpha = 1;
    }

};

NN.GameState.moveTo = function(character, direction) {
    // do not move in the middle of a movement.
    if(character.isMoving) {
        return false;
    }
    character.isMoving = true;
    var moveChar = this.game.add.tween(character);
    var newPos = this.newCoords(character, direction);
    moveChar.to({x: newPos[0], y: newPos[1] - 8}, 500);
    moveChar.onComplete.add(function() {
        character.isMoving = false;
        character.x = newPos[0];
        character.y = newPos[1];
    });
    character.frame = newPos[2];
    moveChar.start();
};

NN.GameState.face = function (char, direction) {
    char.frame = this.facing[direction];
    char.customParams.facing = direction;
};

NN.GameState.newCoords = function(char, direction) {
    var newPos = [char.x, char.y];
    this.face(char, direction);

    // if that direction is not onBoard, just return now.
    if (!this.onBoard(char, direction)) {
        return newPos;
    }

    if (direction == 'right') {
        newPos[0] = char.x + this.tileSize;
        char.customParams.x += 1;
    }
    else if (direction == 'left') {
        newPos[0] = char.x - this.tileSize;
        char.customParams.x -= 1;
    }
    else if (direction == 'up') {
        newPos[1] = char.y - this.tileSize;
        char.customParams.y -= 1;
    }
    else if (direction == 'down') {
        newPos[1] = char.y + this.tileSize;
        char.customParams.y += 1;
    }
    else {
        console.log("Which direction?");
    }
    return newPos;
};

// a boolean check to see if that character moving in that direction would stay "on the board"
NN.GameState.onBoard = function (char, dir) {
    var newPos = [char.x, char.y];
    if (dir == 'right' && char.x + this.tileSize > this.GAMEX) {
        return false;
    }
    else if (dir == 'left' && char.x - this.tileSize < 0) {
        return false;
    }
    else if (dir == 'up' && char.y - this.tileSize < this.GAMEY - this.boardSizeY) {
        return false;
    }
    else if (dir == 'down' && char.y + this.tileSize > this.GAMEY) {
        return false;
    }
    else {
        return true;
    }
};

NN.GameState.nab = function() {
    var posX = this.player.customParams.x;
    var posY = this.player.customParams.y;

    var number = this.board[posX][posY];
    if (this.nabbing) {
        return;
    }

    // TODO something with level 1
    var index = this.answers[number.text];
    if (index) {
        this.nabbing = true;
        var src_x = number.x;
        var src_y = number.y;
        var dst_text = number.text;
        if (this.currentLevel > 1) {
            this.newNumber(posX, posY);
        }
        // move the number we are nabbing to the top of the screen
        var target = this.nabbedText.children[index-1];
        var dst_x = target.x;
        var dst_y = target.y;
        var moveText = this.game.add.tween(target);
        target.x = src_x;
        target.y = src_y;
        target.text = dst_text;
        moveText.to({x: dst_x, y: dst_y}, 500);
        moveText.onComplete.add(function() {
            this.nabbed[index-1] = dst_text;
            this.updateNabbedText();
            this.nabbing = false;
        }, this);
        moveText.start();
    }
    else {
        this.removeNabbed();
        this.mixEmUp();
    }
};

