function Invader(x, y) {
    this.x = x;
    this.y = y;
    this.r = 36;
    this.direction = 1;
    this.speed = 1;
    this.life = 3;

    this.show = function() {
        fill(200, 0, 0);
        ellipse(this.x, this.y, this.r, this.r);
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
        
        if (d < this.r + ship.width || d < this.r + ship.height / 2) {
            return true;
        }

        return false;
    }
}