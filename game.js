function Game(ship, bullets) {
    this.isWon = false;
    this.isLost = false;
    this.ship = ship;
    this.bullets = bullets;

    this.keyReleased = function() {
        if (key != " ") {
            ship.setDirection(0);
        }
    }

    this.keyPressed = function() {
        if (key === " ") {
            bullets.push(new Bullet(ship));
        }
        
        if (keyCode === RIGHT_ARROW) {
            ship.setDirection(1);
        } else if (keyCode === LEFT_ARROW) {
            ship.setDirection(-1);
        }
    }

    this.showWonScreen = function() {
        textSize(32);
        fill(255);
        text("You won!", width / 2, height / 2);
    }

    this.showLostScreen = function() {
        textSize(32);
        fill(200, 0, 0);
        text("Game Over", width / 2, height / 2);
    }
}