export default class Racket{
    constructor(ctx, x, y, speed)
    {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.sizeX = null;
        this.sizeY = null;
        this.speed = speed;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.sizeX = 15;
        this.sizeY = 100;
        this.ctx.fillRect(this.x,this.y,this.sizeX,this.sizeY);
    }

    move(speed){
        this.speed = speed;
    }

    update(height) {
        // this.y + this.sizeY >= height && (this.speed = -this.speed);
        if(this.y <= 0 && this.speed < 0 ){
            this.speed = 0;
        }
        else if(this.y >= height-this.sizeY && this.speed > 0){
            this.speed = 0;
        }
        this.y += this.speed;

    }
}