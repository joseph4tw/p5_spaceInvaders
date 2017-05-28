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
        if (key === "R") {
            reset();
        }
        
        if (key === " ") {
            bullets.push(new Bullet(ship));
        }
        
        if (keyCode === RIGHT_ARROW) {
            ship.setDirection(1);
        } else if (keyCode === LEFT_ARROW) {
            ship.setDirection(-1);
        }
    }

    this.showScore = function(score) {
        var textHeight = 18;
        textSize(textHeight);
        var scoreText = "Score: " + score;

        fill(255);
        text(scoreText, 10, 20);
    }

    this.showWonScreen = function() {
        var textHeight = 32;
        textSize(textHeight);
        var s = "You won!";

        fill(255);
        text(s, width / 2 - textWidth(s) / 2, height / 2 - textHeight / 2);
    }

    this.showLostScreen = function() {
        var textHeight = 32;
        textSize(textHeight);
        var s = "Game Over";
        
        fill(200, 0, 0);
        text(s, width / 2 - textWidth(s) / 2, height / 2 - textHeight / 2);
    }
}