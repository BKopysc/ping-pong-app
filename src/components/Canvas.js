import React, { useRef } from "react";
import styles from './Canvas.module.css';
import DottedNet from "./DottedNet";
import Racket from "./Racket";
import Ball from "./Ball";

export default class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.canvas = null;
        this.setCanvasRef = element => {
            this.canvas = element;
        }
        this.ctx = null;
        this.width = null;
        this.height = null;

        this.leftRacket = null;
        this.rightRacket = null;

        this.moveRacketSpeed = 15;

        this.ball = null;

        this.dottedNet = [];

    }


    onKeyDownAction = (event) => {
        if (event.key === "s") {
            this.leftRacket.move(this.moveRacketSpeed);
        }
        if (event.key === "w") {
            this.leftRacket.move(-this.moveRacketSpeed);
        }
        if (event.key === "o") {
            this.rightRacket.move(-this.moveRacketSpeed);
        }
        if (event.key === "l") {
            this.rightRacket.move(this.moveRacketSpeed);
        }
    }

    onKeyUpAction = (event) => {
        if (event.key === "s" || event.key === "w"){
            this.leftRacket.move(0);
        }
        if (event.key === "o" || event.key === "l") {
            this.rightRacket.move(0);
        }
    }


    loop = () => {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.globalCompositeOperation = "sourve-over";
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(0,0,this.width, this.height);

        this.leftRacket.draw();
        this.rightRacket.draw();
        this.dottedNet.map((dot) => dot.draw());
        this.ball.draw();

        this.leftRacket.update(this.height);
        this.rightRacket.update(this.height);
        this.ball.update(this.width, this.height);
        this.ball.collision(this.leftRacket, this.rightRacket);

        requestAnimationFrame(this.loop);
        // this.leftRacket.draw();
    }

    generateNet() {
        var a = 10;
        while (a <= this.height - 10) {
            this.dottedNet = [...this.dottedNet, new DottedNet(this.ctx, this.width / 2, a, 3)]
            a += 10
        }
        console.log(this.dottedNet)
    }

    componentDidMount() {
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.leftRacket = new Racket(this.ctx, 15, this.height / 2 - 50, 0); // 1 = speed
        this.rightRacket = new Racket(this.ctx, this.width - 30, this.height / 2 - 50, 0) //1 = speed
        this.ball = new Ball(this.ctx, this.width / 2, this.height / 2, 12)

        this.generateNet();

        this.ball.addSpeed(7, 7)

        document.addEventListener("keydown", this.onKeyDownAction);
        document.addEventListener("keyup", this.onKeyUpAction);
        this.loop();
    }

    render() {
        return (
            <div className={styles.CanvasDiv}>
                <canvas className={styles.Canvas} ref={this.setCanvasRef} width={640} height={400} />
            </div>
        );
    }
}