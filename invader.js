function Invader(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.img = loadImage("images/alien0_green.png");
    this.width = width;
    this.height = height;
    this.direction = 1;
    this.speed = 1;
    this.life = 3;

    this.show = function() {
        fill(200, 0, 0);
        //ellipse(this.x, this.y, this.r * 2, this.r * 2);

        imageMode(CENTER);
        image(this.img, this.x, this.y, this.width, this.height);
    }

    this.move = function() {
        this.x = this.x + this.direction * this.speed;
    }

    this.shiftDown = function() {
        this.y += 20;
    }

    this.hit = function() {
        this.life--;

        if (this.life == 2) {
            this.img = loadImage("images/alien0_orange.png");
        } else if (this.life == 1) {
            this.img = loadImage("images/alien0_red.png");
        }

        this.width /= 1.5;
        this.height /= 1.5;
    }

    this.hits = function(ship) {        
        var d = dist(this.x, this.y, ship.x, ship.y);
        var invaderHitBox = Math.max(this.width, this.height) / 2;
        var shipHitBox = Math.max(ship.width, ship.height) / 2;
        
        if (d < invaderHitBox + shipHitBox) {
            return true;
        }

        return false;
    }
}