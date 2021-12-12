export default class Ball {
    constructor(ctx, x, y, size) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.speedX = null;
        this.speedY = null;
        this.size = size;
    }

    addSpeed(speedX, speedY) {
        this.speedX = speedX;
        this.speedY = speedY;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    update(width, height) {
        this.x + this.size >= width && (this.speedX = -this.speedX); //zmiana kierunku piłki
        this.x - this.size <= 0 && (this.speedX = -this.speedX);

        this.y + this.size >= height && (this.speedY = -this.speedY);
        this.y - this.size <= 0 && (this.speedY = -this.speedY);

        this.x += this.speedX;
        this.y += this.speedY;
    }

    collision(leftRacket, rightRacket) {

        const padding_left = leftRacket.x + leftRacket.sizeX;
        const padding_right = rightRacket.x;

        const distance1 = Math.abs(this.x - padding_left) //ze wzoru na odleglosc punktu od prostej
        const distance2 = Math.abs(this.x - padding_right)

        if (this.y < leftRacket.y + leftRacket.sizeY && this.y > leftRacket.y) {
            if (distance1 < this.size) {
                this.speedX = -this.speedX
            }
        }
        else if (this.y < rightRacket.y + rightRacket.sizeY && this.y > rightRacket.y){
            if(distance2 < this.size){
                this.speedX = -this.speedX
            }
        }


    }

}