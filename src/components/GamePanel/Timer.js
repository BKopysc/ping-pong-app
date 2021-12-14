import React from "react";

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsLeft: this.props.seconds,
            timeLeft: ["",""]
        };

        this.timer = 0;
        this.start = this.start.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    calculateTime() {
        let new_minutes = (Math.floor(this.state.secondsLeft / 60)).toString();
        let new_seconds = (this.state.secondsLeft % 60).toString();
        this.setState({ timeLeft: [new_minutes, new_seconds] })
    }

    start() {
        if (this.timer === 0 && this.state.secondsLeft > 0) {
            this.timer = setInterval(this.countDown, 1000)
            this.calculateTime();
        }
    }

    countDown() {
        if (this.props.isRunning) {
            let newSecondsLeft = this.state.secondsLeft - 1;
            this.setState({ secondsLeft: newSecondsLeft })
            this.calculateTime();   

            if (newSecondsLeft === 0) {
                clearInterval(this.timer);
                this.props.endOfTime();
            }
        }
    }


    render() {
        this.start()
        return (
            <div style={{paddingLeft:'510px', paddingBottom:"10px"}}>
                <label style={{fontSize:'20px'}}>Time: </label>
                <label style={{fontSize:'20px'}}>{this.state.timeLeft[0]} m {this.state.timeLeft[1]} s</label>
            </div>
        );
    }

}