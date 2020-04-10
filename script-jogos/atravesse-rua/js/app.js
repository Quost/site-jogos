// Constants
const minX = 5;
const maxX = 413;
const minY = 0;
const maxY = 455;

// Character super class
var Character = function(sprite, x, y, speed) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

Character.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.hitbox = [50, 50];
};

Enemy.prototype = new Character();

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.speed * dt;
  if(this.x > ctx.canvas.width) {
    this.x = -300;
  }
};

// Draw the enemy on the screen, required method for game


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x = 209, y = 455) {
  this.sprite = 'images/char-boy.png'
  this.x = x;
  this.y = y;
  this.hitbox = [50, 50];
};

Player.prototype = new Character();

Player.prototype.update = function(dt) {
  if(this.x <= minX) {
    this.x = minX;
  } else if(this.x > maxX) {
    this.x = maxX;
  }

  if(this.y < minY) {
    this.y = minY;
  } else if(this.y > maxY) {
    this.y = maxY;
  }
};

Player.prototype.startPosition = function() {
  this.x = 209;
  this.y = 455;
};

Player.prototype.customSprite = function(sprite) {
  switch(sprite) {
    case 'cat':
      this.sprite = 'images/char-cat-girl.png';
      break;

    case 'horn':
      this.sprite = 'images/char-horn-girl.png';
      break;

    case 'pink':
      this.sprite = 'images/char-pink-girl.png';
      break;

    case 'princess':
      this.sprite = 'images/char-princess-girl.png';
      break;   
  }
};

Player.prototype.handleInput = function(keys) {
  switch(keys) {
    case 'left':
      this.x = this.x - 102;
      break;

    case 'right':
      this.x = this.x + 102;
      break;

    case 'up':
      this.y = this.y - 83;
      break;

    case 'down':
      this.y = this.y + 83;
      break;
  }
};

var Gem = function(x, y) {
  this.sprite = 'images/gem-blue.png';
  this.x = x;
  this.y = y;
  this.hitbox = [50, 50];
};

Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 40, 44);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
  new Enemy(-100, 140, 400),
  new Enemy(-300, 220, 250),
  new Enemy(-200, 300, 300),
  new Enemy(-150, 380, 150),
];

var player = new Player();

var score = 0;

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

// restart game button
document.getElementById("play-again").addEventListener("click", function() {
  location.reload();
});