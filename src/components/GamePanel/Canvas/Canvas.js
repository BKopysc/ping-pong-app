import React, { useRef } from "react";
import DottedNet from "../DottedNet";
import Racket from "../Racket";
import Ball from "../Ball";
import GoalLine from "../GoalLine";

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

        this.leftGoalLine = null;
        this.rightGoalLine = null;

        this.dottedNet = [];
        this.restaredBefore = false;

        this.requestID = null;

    }

    changeLeftScore = () => {
        this.props.changeLeftScore()
    }

    changeRightScore = () => {
        this.props.changeRightScore()
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
        if (event.key === "s" || event.key === "w") {
            this.leftRacket.move(0);
        }
        if (event.key === "o" || event.key === "l") {
            this.rightRacket.move(0);
        }
    }


    loop = () => {
        //rysowanie planszy
        if (this.props.isRunning) {
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.globalCompositeOperation = "sourve-over";
            this.ctx.lineWidth = 5;
            this.ctx.strokeStyle = "black";
            this.ctx.strokeRect(0, 0, this.width, this.height);

            //rysowanie elementów
            this.leftGoalLine.draw();
            this.rightGoalLine.draw();
            this.leftRacket.draw();
            this.rightRacket.draw();
            this.dottedNet.map((dot) => dot.draw());
            this.ball.draw();

            //aktualizacja elementów i sprawdzanie kolizji
            this.ball.collision(this.leftRacket, this.rightRacket, this.leftGoalLine, this.rightGoalLine);
            this.leftRacket.update(this.height, this.props.points);
            this.rightRacket.update(this.height, this.props.points);
            this.ball.update(this.width, this.height);

            if (this.props.isEnd) {
                this.ctx.fillStyle = "rgb(255,255,255)"
                this.ctx.fillRect(0, 0, this.width, this.height)
                this.ctx.font = "40px Courier";
                this.ctx.fillStyle = "black"
                this.ctx.textAlign = "center"
                this.ctx.fillText(this.props.winnerText, this.width/2, this.height/2);
            }
            else{
                requestAnimationFrame(this.loop);
            }
        }
        else {
            this.ctx.fillStyle = "rgba(255, 255, 255, 0.01)"
            this.ctx.fillRect(0, 0, this.width, this.height);
            requestAnimationFrame(this.loop);
        }

    }

    generateNet() {
        var a = 10;
        while (a <= this.height - 10) {
            this.dottedNet = [...this.dottedNet, new DottedNet(this.ctx, this.width / 2, a, 3)]
            a += 10
        }
    }

    setStartup() {
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.leftRacket = new Racket(this.ctx, 20, this.height / 2 - 50);
        this.rightRacket = new Racket(this.ctx, this.width - 35, this.height / 2 - 50);
        this.ball = new Ball(this.ctx, this.width / 2, this.height / 2, 12, 6, 0, this.changeLeftScore, this.changeRightScore);
        this.leftGoalLine = new GoalLine(this.ctx, 0, this.height / 2 - 150, 3, 300);
        this.rightGoalLine = new GoalLine(this.ctx, this.width - 3, this.height / 2 - 150, 3, 300)

        this.generateNet();

        document.addEventListener("keydown", this.onKeyDownAction);
        document.addEventListener("keyup", this.onKeyUpAction);
        this.loop();
    }

    componentDidMount() {
        this.setStartup();
    }

    render() {
        return (
            <div>
                <canvas ref={this.setCanvasRef} width={640} height={400} />
            </div>
        );
    }
}