export default class DottedNet{
    constructor(ctx, x, y,radius)
    {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "grey";
        this.sizeX = 15;
        this.sizeY = 100;
        this.ctx.arc(this.x,this.y,this.radius,0,2 * Math.PI);
        this.ctx.fill();
    }
}