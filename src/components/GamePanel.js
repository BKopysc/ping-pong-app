import React from "react";
import Canvas from "./Canvas";
import Counter from "./Counter";
import styles from "./GamePanel.module.css"
import Score from "./Score";
import Timer from "./Timer";

export default class GamePanel extends React.Component {
    constructor() {
        super();
        this.state = {
            scoreLeft: 0,
            scoreRight: 0,
            isRunning: true,
            pauseVisibility: 'visible',
            pauseButtonText: ['Continue', 'Pause']
        };
    }

    changeLeftScore = () => {
        this.setState({ scoreLeft: this.state.scoreLeft + 1 })
    }

    changeRightScore = () => {
        this.setState({ scoreRight: this.state.scoreRight + 1 })
    }

    changeRunning = () => {
        this.setState({ isRunning: !(this.state.isRunning) })
    }

    endGame = () => {
        this.setState({ 
            isRunning: !(this.state.isRunning),
            pauseVisibility: "hidden"
        })
    }

    restart = () => {
        window.location.reload(true);
    }




    render() {
        return (
            <div>
                <Timer
                    seconds = {5}
                    endOfTime = {this.changeRunning}
                    />
                <Canvas
                    changeLeftScore={this.changeLeftScore}
                    changeRightScore={this.changeRightScore}
                    isRunning={this.state.isRunning}
                />
                <div className={styles.divNav}>
                    <button className={styles.pauseButton} onClick={this.changeRunning} style={{visibility: this.state.pauseVisibility}}>{this.state.pauseButtonText[+this.state.isRunning]}</button>
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