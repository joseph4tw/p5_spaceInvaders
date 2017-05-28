function Ship() {
    this.x = width / 2;
    this.y = height - 40;
    this.xDirection = 0;
    this.width = 20;
    this.height = 60;

    this.show = function() {
        fill(255);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
    }

    this.move = function() {
        this.x += this.xDirection * 5;

        if (this.x + this.width > width || this.x < this.width) {
            this.setDirection(0);
        }
    }

    this.setDirection = function(direction){
        this.xDirection = direction;
    }
}