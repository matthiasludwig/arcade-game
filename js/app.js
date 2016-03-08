var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;

var PlayerStart = {
    x: 202,
    y: 400
};

// Enemies our player must avoid
var Enemy = function(xvariable, yvariable, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = xvariable;
    this.y = yvariable;
    this.move = speed * 100; // Multiplied by 100 to adjust the speed to an acceptable level
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >= 606){
        this.x = this.x - 707;
    }
    this.x = this.x + (this.move * dt);
    this.render();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(xvariable, yvariable) {
    this.sprite = 'images/char-boy.png';
    this.x = xvariable;
    this.y = yvariable;
};

Player.prototype.update = function(x,y) {
    this.checkCollisions();

    if (x >= 0 && x<= 404) {
        this.x = x;
    }
    if (y <= 400) {
        this.y = y;
    }
    if (y < 50) {
        this.x = PlayerStart.x;
        this.y = PlayerStart.y;
    }
    console.log(this.x,this.y)
    this.render();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left') {
        this.update(this.x - TILE_WIDTH, this.y);
    }
    if (keyCode === 'up') {
        this.update(this.x, this.y - TILE_HEIGHT);
    }
    if (keyCode === 'right') {
        this.update(this.x + TILE_WIDTH, this.y);
    }
    if (keyCode === 'down') {
        this.update(this.x, this.y + TILE_HEIGHT);
    }
};

Player.prototype.checkCollisions = function() {
      for (var i = 0; i < allEnemies.length; i++) {
        if (this.x >= allEnemies[i].x + 0 &&
            this.x < allEnemies[i].x + 50 &&
            this.y >= allEnemies[i].y + 0 &&
            this.y <  allEnemies[i].y + 50) {
                this.x = PlayerStart.x;
                this.y = PlayerStart.y;
        }
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(0,70, 2);
var enemy2 = new Enemy(0,150, 1);
var enemy3 = new Enemy(0,230, 3);
var enemy4 = new Enemy(-202, 70, 2.5);
var enemy5 = new Enemy(-202, 150, 3.5);
var enemy6 = new Enemy(-202, 230, 1.5);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

var player = new Player(PlayerStart.x, PlayerStart.y); // Start the player in the bottom row in the middle at the beginning

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
