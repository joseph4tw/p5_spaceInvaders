function Shrapnel(r, x, y, angle) {
    this.r = r;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 10;
    
    this.show = function() {
        noStroke();
        fill(255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    this.move = function() {
        var dx = Math.cos(this.angle) * this.speed;
        var dy = Math.sin(this.angle) * this.speed;

        this.x += dx;
        this.y += dy;
    }
}