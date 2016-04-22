var NN = NN || {};

NN.GameState = NN.GameState || {};

NN.GameState.init = function(currentLevel) {

    // game constants

    // level data
    this.currentLevel = currentLevel ? currentLevel : 1;

    this.GAMEX = this.game.world.width;
    this.GAMEY = this.game.world.height;

    this.keyboard = this.game.input.keyboard.createCursorKeys();
    this.keyboard.space = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    this.facing = {
        "down":  0,
        "left":  1,
        "up":    2,
        "right": 3
    };
};

NN.GameState.create = function() {
    this.loadLevel();
    this.createBackground(this.levelData.columns, this.levelData.rows);
    // this.createBackground(5, 7);

    this.player = this.createCharacter('player', 0, 0, 'right');
    this.game.physics.arcade.enable(this.player);
    this.nabbedText = this.add.group();
    this.generateNumbers(this.currentLevel);
    this.generateNabbedText();
    this.texts = this.add.group();
    this.createBoard(this.levelData.columns, this.levelData.rows);
    if (this.levelData.baddies) {
        this.generateBaddies();
    }

    var eventDuration;
    var startPoint = {};
    var endPoint = {};
    var direction;
    var minimum = 15;

    this.game.input.onDown.add(function(pointer) {
        startPoint.x = pointer.clientX;
        startPoint.y = pointer.clientY;
    }, this);

    // Enable SWIPING for Player Movement
    // TODO get this functionality into the library
    this.game.input.onUp.add(function(pointer) {
        direction = false;

        endPoint.x = pointer.clientX;
        endPoint.y = pointer.clientY;

        var deltaX = endPoint.x - startPoint.x;
        var deltaY = endPoint.y - startPoint.y;

        if(Math.abs(deltaX) >= Math.abs(deltaY)) {
            if (Math.abs(deltaX) < minimum) {
                this.nab();
            }
            else if (deltaX < 0) {
                direction = 'left';
            }
            else {
                direction = 'right';
            }
        }
        else {
            if (Math.abs(deltaY) < minimum) {
                this.nab();
            }
            else if (deltaY < 0) {
                direction = 'up';
            }
            else {
                direction = 'down';
            }
        }
        if (direction) {
            this.moveTo(this.player, direction);
        }
    }, this);
};

NN.GameState.update = function() {
    if (this.timeCheck && this.time.now - this.timeCheck > 1500) {
        this.pushEmOut();
        if (this.time.now - this.timeCheck > 2000) {
            this.nabbing = false;
            this.timeCheck = false;
        }
    }

    this.updatePlayer();

    this.game.physics.arcade.overlap(this.player, this.baddies, this.baddieAttack, null, this);
};

NN.GameState.loadLevel = function() {
    this.levelData = JSON.parse(this.game.cache.getText('level' + this.currentLevel));
};

NN.GameState.createBackground = function(columns, rows) {
    this.tileSize = Math.floor(this.GAMEX / columns);
    var remainder = (this.GAMEX % columns);
    this.skew = Math.floor(remainder / 2);
    this.boardSizeX = this.tileSize * columns;
    this.boardSizeY = this.tileSize * rows;

    this.tiles = this.add.tileSprite(this.skew, this.GAMEY - this.boardSizeY, this.boardSizeX, this.boardSizeY, 'tile', 0);
    var scale = this.tileSize / this.tiles.texture.width;
    this.tiles.tileScale.x = scale;
    this.tiles.tileScale.y = scale;
};

NN.GameState.generateNabbedText = function(){
    this.levelText = this.add.text(0, 0);
    this.levelText.style.font = 'bold 70pt Arial';
    this.levelText.style.fill = '#0f0';
    this.levelText.text = this.currentLevel;
    var coords = [];
    for ( var i = 0; i < 12; i++ ) {
        coords = this.nabbedCoordsOfIndex(i);
        var nabbed = this.add.text(coords[0], coords[1]);
        nabbed.style.font = 'bold 25pt Arial';
        nabbed.style.fill = '#fff';
        nabbed.anchor.setTo(0.5);
        this.nabbedText.add(nabbed);
    }
    this.updateNabbedText();
};

NN.GameState.generateNumbers = function(level) {
    var numbers = library.range(1, 12 * level + 1);
    this.answers = {};
    this.nabbed = [];
    this.nabbed[11] = null;
    this.choices = [];
    this.pool = [];
    var index = 1;
    numbers.forEach(function(n) {
        var self = this;
        if (n % level == 0) {
            self.choices.push(n);
            self.answers[n] = index;
            index++;
        }
        else {
            self.pool.push(n);
        }
    }, this)

    var boardSize = this.levelData.rows * this.levelData.columns;

    for (var i = 12; i < boardSize; i++) {
        var idx = Math.floor(Math.random() * (this.pool.length));
        this.choices.push((this.pool.splice(idx, 1))[0]);
    }

    library.shuffle(this.choices);

};

NN.GameState.createBoard = function(columns, rows) {
    this.board = [];
    index = 0;
    var pixel_x;
    var pixel_y;
    for (var x = 0; x < columns; x++) {
        this.board[x] = [];
        for (var y = 0; y < rows; y++) {
            pixel_x = (x + 0.5) * this.tileSize + this.skew;
            pixel_y = (this.GAMEY - this.boardSizeY) + (y + 0.5) * this.tileSize;
            text = this.texts.getFirstExists(false);

            if (!text) {
                text = this.add.text(pixel_x, pixel_y);
                this.texts.add(text);
                text.anchor.setTo(0.5);
            }
            text.customParams = {};
            text.customParams.x = x;
            text.customParams.y = y;
            text.text = this.choices[index];
            text.style.font = 'bold 25pt Arial';
            text.style.fill = '#fff';

            this.board[x][y] = text;
            index++;
        }
    }
};

NN.GameState.newNumber = function(posX, posY) {
    var index = Math.floor(Math.random() * this.pool.length);
    var newnum = this.pool.splice(index, 1)[0];
    var number = this.board[posX][posY];
    number.x = this.GAMEX / 2;
    number.y = this.GAMEY - this.boardSizeY / 2;
    number.text = newnum;
    number.style.font = 'bold 25pt Arial';
    number.style.fill = '#fff';
    number.anchor.setTo(0.5);
    var moveText = this.game.add.tween(number);
    var coords = this.coordsFromPos(posX, posY);
    moveText.to({x: coords[0], y: coords[1]}, 500);
    moveText.onComplete.add(function() {
        // this.board[posX][posY] = number;
    }, this);
    moveText.start();
};

NN.GameState.coordsFromPos = function(X, Y) {
    var coords = [];
    coords[0] = this.skew + this.tileSize / 2 + X * this.tileSize;
    coords[1] = this.GAMEY - this.boardSizeY + this.tileSize / 2 + Y * this.tileSize;
    return (coords);
};

NN.GameState.updateNabbedText = function() {
    for (var i = 0; i < this.nabbed.length; i++) {
        var number = this.nabbed[i];
        if (number) {
            this.nabbedText.children[i].text = number;
        }
        else {
            this.nabbedText.children[i].text = '__';
        }
    }
};

NN.GameState.mixEmUp = function() {
    this.timeCheck = this.time.now;
    this.nabbing = true;
    library.shuffleDeeply(this.board);
    this.pullEmIn();
};

NN.GameState.removeNabbed = function() {
    // Make sure there is a nabbed number to remove first
    var nabbedNums = this.nabbed.filter(function(a){return a;});
    if (nabbedNums.length == 0) {
        return;
    }

    // choose a random wrong answer from the board
    var tempArray = library.flatten(this.board);
    var wrongAnswers = tempArray.filter(function(a){
        return (parseInt(a.text, 10) % this.currentLevel);
    }, this);
    var chosen = library.choose(wrongAnswers);

    // choose a random right answer from the nabbed list
    var choice = library.choose(nabbedNums);
    var index = this.nabbed.indexOf(choice);

    // change the wrong number from the board to the right number from the nabbed list
    var wrongText = chosen.text;
    chosen.text = choice;

    // then put the wrong number back in the pool
    this.pool.push(wrongText);

    this.nabbed[index] = false;
    var nabbedLocation = this.nabbedCoordsOfIndex(index);
    chosen.position = {x: nabbedLocation[0], y: nabbedLocation[1]};
    this.updateNabbedText();
};

NN.GameState.pullEmIn = function() {
    var cols = this.levelData.columns;
    var rows = this.levelData.rows;
    for (var x = 0; x < cols; x++) {
        for (var y = 0; y < rows; y++) {
            var moveText = this.game.add.tween(this.board[x][y]);
            var target = this.coordsFromPos( (cols-1) / 2, (rows-1) / 2);
            moveText.to({x: target[0], y: target[1]}, 500);
            moveText.start();
        }
    }
};

NN.GameState.nabbedCoordsOfIndex = function(index) {
    var pixel_x = 120;
    var pixel_y = 40;
    var x = index % 4;
    var y = Math.floor(index / 4);

    var coords = [pixel_x + x*60, pixel_y + y*40];
    return coords;
};

NN.GameState.pushEmOut = function() {
    if (this.pushing) {
        return;
    }
    this.pushing = true;
    var cols = this.levelData.columns;
    var rows = this.levelData.rows;
    var target = [];
    for (var x = 0; x < cols; x++) {
        for (var y = 0; y < rows; y++) {
            var moveTextBack = this.game.add.tween(this.board[x][y]);
            // moveTextBack.to({x: this.board[x][y].position.x, y: this.board[x][y].position.y}, 500);
            target = this.coordsFromPos(x, y);
            moveTextBack.to({x: target[0], y: target[1]}, 500);
            moveTextBack.onComplete.add(function() {
                this.pushing = false;
            }, this);
            moveTextBack.start();
        }
    }
};

NN.GameState.checkWin = function() {
    for (var i = 0; i < 12; i++) {
        if (!this.nabbed[i])
            return; // Not won
    }
    var nextLevel = this.currentLevel + 1;
    if (nextLevel > this.game.numLevels) {
        console.log("You win!");
    }
    else {
        this.game.state.restart(true, false, nextLevel);
    }
};
