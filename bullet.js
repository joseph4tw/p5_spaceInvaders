function Bullet(ship) {
    this.x = ship.x;
    this.y = ship.y;
    this.speed = 7;
    this.r = ship.width / 8;

    this.show = function() {
        fill(255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    this.move = function() {
        this.y -= this.speed;
    }

    this.hits = function(invader) {
        var d = dist(this.x, this.y, invader.x, invader.y);
        var invaderHitBox = Math.max(invader.width, invader.height) / 2;
        
        if (d < this.r + invaderHitBox) {
            return true;
        }
        
        return false;
    }
}