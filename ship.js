function Ship(img) {
    this.x = width / 2;
    this.y = height - 40;
    this.xDirection = 0;
    this.img = img;
    this.width = this.img.width;
    this.height = this.img.height;
    this.isDead = false;
    this.isExploding = false;
    this.shrapnel = [];

    this.show = function() {
        if (this.isDead) {
            this.processExplosion();
            return;
        }

        imageMode(CENTER);
        image(this.img, this.x, this.y);

        //textSize(14);
        //fill(255);
        //text("ShipX: " + this.x + " ShipY: " + this.y, 10, height - 10);
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

    this.explode = function() {
        this.isExploding = true;
        this.isDead = true;
        
        for (var i = 0; i < 20; i++) {
            this.shrapnel.push(new Shrapnel(10, this.x, this.y, random(-Math.PI, Math.PI)));
        }
    }

    this.processExplosion = function(){
        for (var i = this.shrapnel.length - 1; i >= 0; i--) {
            this.shrapnel[i].show();
            this.shrapnel[i].move();
            
            // if shrapnel is offscreen
            if (this.shrapnel[i].x < 0 || width < this.shrapnel[i].x - this.shrapnel[i].r
                || this.shrapnel[i].y + this.shrapnel[i].r < 0 || height < this.shrapnel[i].y - this.shrapnel[i].r)
            {
                    this.shrapnel.splice(i, 1);
            }
        }

        if (this.shrapnel.length == 0) {
            this.isExploding = false;
        }
    }
}