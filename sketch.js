var game;
var ship;
var shipImage;
var invaders = [];
var invadersKilled = 0;
var initialInvaders = 10;
var invadersMaxSpeed = 10;
var bullets = [];

function preload() {
    shipImage = loadImage("images/spaceship.png");
}

function reset() {
    invaders = [];
    invadersKilled = 0;
    bullets = [];
    setup();
}

function setup() {
    var canvas = createCanvas(640, 480);
    canvas.parent("canvas");

    ship = new Ship(shipImage);
    
    for (var i = 0; i < initialInvaders; i++) {
        invaders.push(new Invader(i * 50 + 50, 50));
    }

    game = new Game(ship, bullets);
}

function draw() {
    background(150);

    game.showScore(invadersKilled);

    if (game.isWon) {
        game.showWonScreen();
        processShip();
        processBullets();
        return;
    }

    if (game.isLost) {
        game.showLostScreen();

        for (var i = 0; i < invaders.length; i++) {
            invaders[i].show();
        }
        ship.show();
        
        return;
    }
    
    processShip();
    processInvaders();
    processBullets();
}

function processShip() {
    ship.show();
    ship.move();
}

function processInvaders() {
    var edge = false;

    for (var i = invaders.length - 1; i >= 0; i--) {
        invaders[i].speed = Math.min(invadersMaxSpeed, invadersKilled + 1);
        invaders[i].move();
        invaders[i].show();

        if (invaders[i].x + invaders[i].r >= width
            || invaders[i].x - invaders[i].r <= 0) {
                edge = true;
        }

        if (invaders[i].hits(ship)) {
            game.isLost = true;
            ship.explode();
            return;
        }

        if (invaders[i].y > height + invaders[i].r) {
            invaders.splice(i, 1);
            game.isLost = true;
            return;
        }
    }

    if (edge) {
        for (var i = 0; i < invaders.length; i++) {
            invaders[i].direction *= -1;
            invaders[i].shiftDown();
        }
    }
}

function processBullets() {
    for (var i = bullets.length - 1; i >= 0; i--) {
        bullets[i].move();
        bullets[i].show();
        var hitInvader = false;

        for (var j = 0; j < invaders.length; j++) {
            if (bullets[i].hits(invaders[j])) {
                invaders[j].hit();
                
                if (invaders[j].life < 1) {
                    invaders.splice(j, 1);
                    invadersKilled++;
                    if (invaders.length == 0) {
                        game.isWon = true;
                    }
                }
                hitInvader = true;
                continue;
            }
        }

        if (bullets[i].y < 10 || hitInvader) {
            bullets.splice(i, 1);
            return;
        }
    }
}

function keyReleased() {
    game.keyReleased();
}

function keyPressed() {
    game.keyPressed();
}
