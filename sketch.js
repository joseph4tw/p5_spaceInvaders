var game;
var ship;
var background1;
var background2;
var backgroundImage1;
var backgroundImage2;
var backgroundYIncrement = 0.2;
var shipImage;
var invadersImage;
var invaders = [];
var invadersKilled = 0;
var initialInvaders = 10;
var invadersMaxSpeed = 10;
var bullets = [];

function preload() {
    backgroundImage1 = loadImage("images/background.png");
    backgroundImage2 = loadImage("images/background.png");

    shipImage = loadImage("images/spaceship_white.png");
    invadersImage = loadImage("images/alien0_red.png");
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

    background1 = new Background(backgroundImage1, width / 2, height / 2, width, height);

    var background2StartingY = -height / 2;
    background2 = new Background(backgroundImage2, width / 2, background2StartingY, width, height);

    ship = new Ship(shipImage);
    
    for (var i = 0; i < initialInvaders; i++) {
        invaders.push(new Invader(i * 50 + 50, 50, invadersImage.width, invadersImage.height));
    }

    game = new Game(ship, bullets);
}

function draw() {
    background1.y += backgroundYIncrement;
    background2.y += backgroundYIncrement;

    image(background1.img, background1.x, background1.y, background1.width, background1.height);
    image(background2.img, background2.x, background2.y, background2.width, background2.height);

    if (background1.y >= height * 1.5) {
        // move background back to top
        background1.y = -height / 2;
    } else if (background2.y >= height * 1.5) {
        // move background back to top
        background2.y = -height / 2;
    }

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

        if (invaders[i].x + invaders[i].width / 2 >= width
            || invaders[i].x - invaders[i].width / 2 <= 0) {
                edge = true;
        }

        if (invaders[i].hits(ship)) {
            game.isLost = true;
            ship.explode();
            return;
        }

        if (invaders[i].y + invaders[i].img.height / 2 > height) {
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
