import { Component } from 'react';
import './Content.css';
import TimeInputs from './TimeInputs/TimeInputs';
import Counter from './Counter/Counter';
const { default: SavedSet } = require("./SavedSet/SavedSet");

class Content extends Component{


    constructor(props) {
        super(props);
        this.state = {
            timer : {
                hours : 0,
                minutes : 0,
                seconds : 0
            },
            liveTimer : {
                hours : 0,
                minutes : 0,
                seconds : 0
            },
            countingMode: false,
            timerIsPaused : false,
        };
        this.GetMode = this.GetMode.bind(this);
        this.handleCounterStart = this.handleCounterStart.bind(this);
        this.handleCounterPause = this.handleCounterPause.bind(this);
        this.handleCounterResume = this.handleCounterResume.bind(this);
        this.handleCounterCancel = this.handleCounterCancel.bind(this);
    }

    GetMode(){
        const timer = this.state.liveTimer;
        let actualTime = this.state.timer;
        if(this.state.countingMode){
            return <Counter timer={timer} onCounterPause = {this.handleCounterPause} onCounterResume = {this.handleCounterResume} onCounterCancel = {this.handleCounterCancel}/>;
        }
        else{
            return <TimeInputs onTimeInputsChange = {this.handleCounterStart} actualTime = {actualTime}/>;
        }
    }

    handleCounterStart(timer){
        this.setState(prevState =>({
            timer : {
                hours : timer.hours,
                minutes : timer.minutes,
                seconds : timer.seconds,
            },
            countingMode : true,
            timerIsPaused : false,
            liveTimer : {
                hours : timer.hours,
                minutes : timer.minutes,
                seconds : timer.seconds,
            },
        }));
    }

    handleCounterPause(){
        this.setState(prevState => ({
            timer : {
                hours : prevState.timer.hours,
                minutes : prevState.timer.minutes,
                seconds : prevState.timer.seconds,
            },
            countingMode : prevState.countingMode,
            timerIsPaused : true,
            liveTimer : {
                hours : prevState.liveTimer.hours,
                minutes : prevState.liveTimer.minutes,
                seconds : prevState.liveTimer.seconds,
            },
        }));

        console.log('PAUSED !');
    }


    handleCounterResume(){
        console.log('RESUMED !');
        this.setState(prevState => ({
            timer : {
                hours : prevState.timer.hours,
                minutes : prevState.timer.minutes,
                seconds : prevState.timer.seconds,
            },
            countingMode : prevState.countingMode,
            timerIsPaused : false,
            liveTimer : {
                hours : prevState.liveTimer.hours,
                minutes : prevState.liveTimer.minutes,
                seconds : prevState.liveTimer.seconds,
            },
        }));
    }


    handleCounterCancel(){
        // console.log(this.state);
        this.setState(prevState => ({
            timer : {
                hours : prevState.timer.hours,
                minutes : prevState.timer.minutes,
                seconds : prevState.timer.seconds,
            },
            countingMode : false,
            timerIsPaused : false,
            liveTimer : {
                hours : 0,
                minutes : 0,
                seconds : 0,
            },
        }));
        console.log('CANCELLED !');
    }

    render() {
        return (
            <div className="content">
                { this.GetMode() }
                <div className="saved-sets">
                    <SavedSet />
                    <SavedSet />
                    <SavedSet />
                </div>
            </div>
            );
        }
}


export default Content;
