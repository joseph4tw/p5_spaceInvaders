function Game(ship, bullets, sounds) {
    this.isWon = false;
    this.isLost = false;
    this.ship = ship;
    this.bullets = bullets;
    this.sounds = sounds;

    this.sounds.explosion.setVolume(0.1);
    this.sounds.invaderHit.setVolume(0.1);
    this.sounds.invaderDie.setVolume(0.1);
    this.sounds.bullet.setVolume(0.1);
    this.sounds.gameWon.setVolume(0.1);
    this.sounds.gameLost.setVolume(0.1);

    this.mousePressed = function() {
        if (0 < mouseX && mouseX <= width
            && 0 < mouseY && mouseY <= height) {
                this.bullets.push(new Bullet(this.ship));
                this.playSoundBullet();
        }
    }

    this.keyReleased = function() {
        if (key != " ") {
            this.ship.setDirection(0);
        }
    }

    this.keyPressed = function(e) {
        if (key === "R") {
            reset();
        }
        
        if (key === " ") {
            this.bullets.push(new Bullet(this.ship));
            this.playSoundBullet();
            
            e.preventDefault();
        }
        
        if (keyCode === RIGHT_ARROW) {
            this.ship.setDirection(1);
        } else if (keyCode === LEFT_ARROW) {
            this.ship.setDirection(-1);
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

    this.toggleSound = function() {
        if (!this.sounds.muted) {
            this.sounds.muted = true;
            soundButton.html("Sound Off");
        } else {
            this.sounds.muted = false;
            soundButton.html("Sound On");
        }
    }

    this.playSoundBullet = function() {
        if (!this.sounds.muted) {
            this.sounds.bullet.play();
        }
    }

    this.playSoundExplosion = function() {
        if (!this.sounds.muted) {
            this.sounds.explosion.play();
        }
    }

    this.playSoundInvaderHit = function() {
        if (!this.sounds.muted) {
            this.sounds.invaderHit.play();
        }
    }

    this.playSoundInvaderDie = function() {
        if (!this.sounds.muted) {
            this.sounds.invaderDie.play();
        }
    }

    this.playSoundGameWon = function() {
        if (!this.sounds.muted) {
            this.sounds.gameWon.play();
        }
    }

    this.playSoundGameLost = function() {
        if (!this.sounds.muted) {
            this.sounds.gameLost.play();
        }
    }
}