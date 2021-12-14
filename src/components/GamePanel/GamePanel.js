import React from "react";
import Canvas from "./Canvas/Canvas";
import Counter from "./Counter/Counter";
import styles from "./GamePanel.module.css"
import Score from "./Score/Score";
import Timer from "./Timer";

export default class GamePanel extends React.Component {
    constructor() {
        super();
        this.state = {
            scoreLeft: 0,
            scoreRight: 0,
            isEnd: false,
            isRunning: true,
            pauseVisibility: true,
            winnerText: "none",
            pauseButtonText: ['Continue', 'Pause']
        };
    }

    changeLeftScore = () => {
        this.setState({ scoreLeft: this.state.scoreLeft + 1})
    }

    changeRightScore = () => {
        this.setState({ scoreRight: this.state.scoreRight + 1 })
    }

    changeRunning = () => {
        this.setState({ isRunning: !(this.state.isRunning) })
    }

    endGame = () => {
        let newWinnerText=""
        if(this.state.scoreLeft > this.state.scoreRight){
            newWinnerText = "Left Player Wins!"
        }
        else if(this.state.scoreLeft < this.state.scoreRight){
            newWinnerText = "Right Player Wins!"
        }
        else{
            newWinnerText = "Draw!"
        }
        this.setState({
            isEnd: true,
            winnerText: newWinnerText
        })
    }

    restart = () => {
        window.location.reload(true);
    }




    render() {
        //this.state.pauseVisibility ? styles.pauseButton : styles.pauseButtonHidden
        return (
            <div>
                <Timer
                    seconds = {80}
                    endOfTime = {this.endGame}
                    isRunning = {this.state.isRunning}
                    />
                <Canvas
                    changeLeftScore={this.changeLeftScore}
                    changeRightScore={this.changeRightScore}
                    isEnd={this.state.isEnd}
                    isRunning={this.state.isRunning}
                    points={this.state.scoreLeft + this.state.scoreRight}
                    winnerText = {this.state.winnerText}
                />
                <div className={styles.divNav}>
                    <button className={styles.pauseButton} onClick={this.changeRunning}>{this.state.pauseButtonText[+this.state.isRunning]}</button>
                    <Score
                        scoreLeft={this.state.scoreLeft}
                        scoreRight={this.state.scoreRight}
                    />
                    <button className={styles.restartButton} onClick={this.restart}>Restart</button>
                </div>
            </div>
        );
    }
}