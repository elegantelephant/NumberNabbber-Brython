var NN = NN || {};

NN.GameState = {

    init: function(currentLevel) {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // game constants
        
        // level data
        this.numLevels = 20;
        // this.currentLevel = 4;
        this.currentLevel = this.currentLevel ? this.currentLevel : 1;

        this.GAMEX = this.game.world.width;
        this.GAMEY = this.game.world.height;

        this.keyboard = this.game.input.keyboard.createCursorKeys();
    },

    preload: function() {
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
    },

    create: function() {
        this.loadLevel();
        this.createBackground(this.levelData.columns, this.levelData.rows);
        // this.createBackground(5, 7);

        this.createPlayer();
        this.generateTopText();
        this.generateNumbers(this.currentLevel);
        // this.createBoard(this.levelData.columns, this.levelData.rows);
    },

    update: function() {
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
    },

    loadLevel: function() {
        this.levelData = JSON.parse(this.game.cache.getText('level' + this.currentLevel));
    },

    createBackground: function(columns, rows) {
        //this.tiles = this.add.group();
        this.tileSize = Math.floor(this.GAMEX / columns);
        var remainder = (this.GAMEX % columns);
        this.skew = Math.floor(remainder / 2);
        this.boardSizeX = this.tileSize * columns;
        this.boardSizeY = this.tileSize * rows;

        this.tiles = this.add.tileSprite(this.skew, this.GAMEY - this.boardSizeY, this.boardSizeX, this.boardSizeY, 'tile', 0);
        var scale = this.tileSize / this.tiles.texture.width;
        this.tiles.tileScale.x = scale;
        this.tiles.tileScale.y = scale;
    },

    createPlayer: function() {
        this.player = this.add.sprite(this.skew + this.tileSize / 2, this.GAMEY - this.boardSizeY + this.tileSize / 2, 'player', 3);
        var playerScaleX = this.tileSize / this.player.width;
        var playerScaleY = this.tileSize / this.player.height;
        this.player.scale.setTo(playerScaleX, playerScaleY);
        this.player.anchor.setTo(0.5);
    },

    generateTopText: function(){
    },

    generateNumbers: function(level) {
        var numbers = this.range(1, 12 * level + 1);
        this.answers = this.range(level, 12 * level + 1, level);
        this.choices = [];
        this.pool = [];
        numbers.forEach(function(n) {
            var self = this;
            if (n % level == 0) {
                self.choices.push(n);
            }
            else {
                self.pool.push(n);
            }
        }, this)

        var boardSize = this.levelData.rows * this.levelData.columns;

        for (var i = 12; i < boardSize; i++) {
            var index = Math.floor(Math.random() * (this.pool.length));
            this.choices.push((this.pool.splice(index, 1))[0]);
        }

        this.shuffle(this.choices);
        
    },

    range: function(first, last, interval) {
        if (!last) {
            last = first || 0;
            first = 0;
        }
        if (!interval) {
            interval = last < first ? -1 : 1;
        }
        var length = Math.max(Math.ceil((last - first) / interval), 0);
        var numbers = Array(length);

        for (var i = 0; i < length; i++, first += interval) {
            numbers[i] = first;
        }
        return numbers;
    },

    shuffle: function(list) {
        for (var i = list.length-1; i >=0; i--) {

            var randomIndex = Math.floor(Math.random()*(i+1)); 
            var itemAtIndex = list[randomIndex]; 

            list[randomIndex] = list[i]; 
            list[i] = itemAtIndex;
        }
        return list;
    },

    createBoard: function(columns, rows) {
        index = 0;
        for (var x = 0; x < columns; x++) {
            for (var y = 0; y < rows; y++) {
                this.newTile(x, y, index);
                index++;
            }
        }
    },

    newTile: function(x, y, i) {
        var tile = {};
        tile.x = x;
        tile.y = y;
        tile.index = i;
        tile.coords.x = (x + 0.5) * this.tileSize + this.skew;
        tile.coords.y = (this.GAMEY - this.boardSizeY) + (y + 0.5) * this.tileSize;
        return tile;

        var playerScaleX = this.tileSize / this.player.width;
        var playerScaleY = this.tileSize / this.player.height;
        this.player.scale.setTo(playerScaleX, playerScaleY);
        this.player.anchor.setTo(0.5);
    },

    moveTo: function(character, direction) {
        if(character.isMoving) {
            return false;
        }
        if(!this.possibleMove(character, direction)) {
            return false;
        }
        character.isMoving = true;
        var moveChar = this.game.add.tween(character);
        var newPos = this.newCoords(character, direction);
        moveChar.to({x: newPos[0], y: newPos[1] - 8}, 500);
        moveChar.onComplete.add(function() {
            character.isMoving = false;
            // console.log("in here");
            character.x = newPos[0];
            character.y = newPos[1];
        }, character);
        character.frame = newPos[2];
        moveChar.start();
        // console.log("moving");
    },

    possibleMove: function(char, direction) {
        return true;
    },

    newCoords: function(char, direction) {
        var newPos = [char.x, char.y];
        // console.log('old pos: ' + char.x + ', ' + char.y);
        // console.log('new pos: ' + newPos[0] + ', ' + newPos[1]);
        if (direction == 'right') {
            newPos[0] = char.x + this.tileSize;
            if (newPos[0] > this.GAMEX) {
                newPos[0] = char.x;
            }
            newPos[2] = 3;
        }
        else if (direction == 'left') {
            newPos[0] = char.x - this.tileSize;
            if (newPos[0] < 0) {
                newPos[0] = char.x;
            }
            newPos[2] = 1;
        }
        else if (direction == 'up') {
            newPos[1] = char.y - this.tileSize;
            if (newPos[1] < this.GAMEY - this.boardSizeY) {
                newPos[1] = char.y;
            }
            newPos[2] = 2;
        }
        else if (direction == 'down') {
            newPos[1] = char.y + this.tileSize;
            if (newPos[1] > this.GAMEY) {
                newPos[1] = char.y;
            }
            newPos[2] = 0;
        }
        else {
            console.log("Which direction?");
        }
        // console.log(direction);
        return newPos;
    },
};



function Tile(index) {
  this.index = index;
  return this;
}
var array = [];
array.push(new Tile(array.length));










