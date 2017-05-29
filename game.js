function Game(ship, bullets) {
    this.isWon = false;
    this.isLost = false;
    this.ship = ship;
    this.bullets = bullets;

    this.mousePressed = function() {
        if (0 < mouseX && mouseX <= width
            && 0 < mouseY && mouseY <= height) {
                bullets.push(new Bullet(ship));
        }
    }

    this.keyReleased = function() {
        if (key != " ") {
            ship.setDirection(0);
        }
    }

    this.keyPressed = function(e) {
        if (key === "R") {
            reset();
        }
        
        if (key === " ") {
            bullets.push(new Bullet(ship));
            e.preventDefault();
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
        
        fill(255);
        text(s, width / 2 - textWidth(s) / 2, height / 2 - textHeight / 2);
    }
}