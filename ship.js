function Ship(img) {
    this.x = width / 2;
    this.y = height - 40;
    this.xDirection = 0;
    this.img = img;
    this.width = this.img.width;
    this.height = this.img.height;

    this.show = function() {
        imageMode(CENTER);
        image(this.img, this.x, this.y);
    }

    this.move = function() {
        var tempX = this.x + this.xDirection * 5;

        if (tempX - this.width / 2 < 0 || width < tempX + this.width / 2) {
            this.setDirection(0);
            return;
        }

        this.x = tempX;
}

    this.setDirection = function(direction){
        this.xDirection = direction;
    }
}