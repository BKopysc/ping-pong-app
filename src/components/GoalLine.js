export default class GoalLine {
    constructor(ctx, x, y, sizeX, sizeY) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    }
}