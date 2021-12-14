export default class Ball {
    constructor(ctx, x, y, size, speedX, speedY, scoreLeft, scoreRight) {
        this.ctx = ctx;
        this.x0 = x;
        this.y0 = y;
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.speedY0 = speedY;
        this.size = size;
        this.scoreLeft = scoreLeft;
        this.scoreRight = scoreRight;
        //this.newRound = newRound;
    }

    defaultPosition(){
        this.x = this.x0;
        this.y = this.y0;
        this.speedY = this.speedY0;
        var randomBool = Math.random() < 0.5;
        if(randomBool){
            this.speedX = -this.speedX
        }
        else{
            this.speedX = this.speedX
        }
    }

    randomSpin(){
        var min = Math.ceil(this.speedY-2);
        var max = Math.floor(this.speedY+2);
        this.speedY= Math.floor(Math.random() * (max - min + 1)) + min;
    }

    addSpeed(speedX, speedY) {
        this.speedX = speedX;
        this.speedY = speedY;
        this.speedY0 = speedY;
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

    collision(leftRacket, rightRacket, leftGoalLine, rightGoalLine) {

        const padding_left = leftRacket.x + leftRacket.sizeX;
        const padding_right = rightRacket.x;

        const distance1 = Math.abs(this.x - padding_left) //ze wzoru na odleglosc punktu od prostej
        const distance2 = Math.abs(this.x - padding_right)

        const distance_line_left = Math.abs(this.x - leftGoalLine.x - leftGoalLine.sizeX)
        const distance_line_right = Math.abs(this.x - rightGoalLine.x)

        if (this.y < leftRacket.y + leftRacket.sizeY && this.y > leftRacket.y) {
            if (distance1 < this.size) {
                this.speedX = -this.speedX
                this.randomSpin()
            }
        }
        if (this.y < rightRacket.y + rightRacket.sizeY && this.y > rightRacket.y){
            if(distance2 < this.size){
                this.speedX = -this.speedX
                this.randomSpin()
            }
        }
        if(this.y < leftGoalLine.y + leftGoalLine.sizeY && this.y > leftGoalLine.y){
            if(distance_line_left < this.size){
                this.scoreRight()
                this.defaultPosition()
            }   
        }
        if(this.y < rightGoalLine.y + rightGoalLine.sizeY && this.y > rightGoalLine.y){
            if(distance_line_right < this.size){
                this.scoreLeft()
                this.defaultPosition()
            }
        }


    }

}