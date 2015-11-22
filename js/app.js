// Added "use strict" to enable strict mode to change silent errors to throw errors and to potentially increase performance optimization
"use strict";

var canvasWidth = 505;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;

    // This speed allows the enemies to have different speeds
    // Set speed a little fast at * 210, but would change it for every level if other levels are added
    this.speed = Math.floor(Math.random() * 210) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //If x is less than the canvas width, multiply this.speed by the dt variable for smoother animation defined in engine.js
    //Else set the x coordinate to -25 off screen

    if (this.x < canvasWidth) {
        this.x += this.speed * dt;
    } else {
        this.x = -25;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Similar to the Enemy class, this loads the character image and adds variables where the instances will go.
// Defined this.x and this.y variables for
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// Collision function to reset player back to starting Y coordinate
Player.prototype.collision = function() {
    allEnemies.forEach(function(enemy) {
        if (enemy.x < player.x + 40 && enemy.x + 60 > player.x && enemy.y < player.y + 60 && enemy.y + 40 > player.y) {
            player.reset();
        }
    });
};

// Player resets when they get to the top/water which is at the 50y coordinate on the canvas.
Player.prototype.update = function() {
    if (this.y < 50) {
        this.reset();
    }

    this.collision();
};


//Draws the player to the screen, just like Enemy.prototype.render
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Connects keystrokes to the movement space on the canvas
Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x > 0) {
        this.x -= 100;
    }
    if (direction === 'right' && this.x < 350) {
        this.x += 100;
    }
    if (direction === 'up' && this.y > 50) {
        this.y -= 85;
    }
    if (direction === 'down' && this.y < 400) {
        this.y += 85;
    }
};

//Set a starting point for the player and location of player when a reset occurs
Player.prototype.reset = function() {
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Created initEnemies function to house allEnemies array and initial coordinates for the enemies
// Created for loop to run through and create new coordinates for each new enemy
var initEnemies = function(initialCoordinates) {
    var initialCoordinateSet,
        i;
    var allEnemies = [];

    for (i = 0; i < initialCoordinates.length; i++) {
        initialCoordinateSet = initialCoordinates[i];
        allEnemies.push(new Enemy(initialCoordinateSet.x, initialCoordinateSet.y));
    }

    return allEnemies;
};

// Add enemies to array
// Randomly generate an x position and subtract by canvas width
// Subtracted 200 more x distance one of the enemies on same row

var allEnemies = initEnemies([{
    x: Math.floor(Math.random() * 480) - canvasWidth,
    y: 55
}, {
    x: Math.floor(Math.random() * 660) - canvasWidth,
    y: 220
}, {
    x: Math.floor(Math.random() * 620) - (canvasWidth + 200),
    y: 140
}, {
    x: Math.floor(Math.random() * 550) - canvasWidth,
    y: 140
}]);

// Place the player object in a variable called player

var player = new Player(200, 400);

// Collision function to reset player back to starting Y coordinate
var checkCollisions = function() {
    allEnemies.forEach(function(enemy) {
        if (enemy.x < player.x + 40 && enemy.x + 60 > player.x && enemy.y < player.y + 60 && enemy.y + 40 > player.y) {
            player.reset();
        }
    });
};

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
