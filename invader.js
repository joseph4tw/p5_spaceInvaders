function Invader(x, y) {
    this.x = x;
    this.y = y;
    this.r = 18;
    this.direction = 1;
    this.speed = 1;
    this.life = 3;

    this.show = function() {
        fill(200, 0, 0);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    this.move = function() {
        this.x = this.x + this.direction * this.speed;
    }

    this.shiftDown = function() {
        this.y += 20;
    }

    this.hit = function() {
        this.life--;
        this.r = this.r / 2;
    }

    this.hits = function(ship) {        
        var d = dist(this.x, this.y, ship.x, ship.y);
        var shipHitBox = Math.max(ship.width, ship.height) / 2;

        if (d < this.r + shipHitBox) {
            return true;
        }

        return false;
    }
}