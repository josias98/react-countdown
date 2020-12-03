import { Component } from 'react';
import './Content.css';
import TimeInputs from './TimeInputs/TimeInputs';
import Counter from './Counter/Counter';
const { default: SavedSet } = require("./SavedSet/SavedSet");

class Content extends Component{

    timerCounter;
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

    handleCounterStart(timer,resume=false){
        if(resume){
            this.setState(prevState =>({
                timer : {
                    hours : prevState.timer.hours,
                    minutes : prevState.timer.minutes,
                    seconds : prevState.timer.seconds,
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
        else{
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

        // let now = new Date().getTime();
        let targetMiliseconds = new Date().getTime() + timer.hours*3600*1000 + timer.minutes*60*1000 + timer.seconds*1000;

        var that = this;


        let x = setInterval(function(){
        let tempNow = new Date().getTime();
        let distance = targetMiliseconds - tempNow;
            if(distance<=0){
                distance = 0;
                clearInterval(x);
                console.info('Timer is over !');
            }

            let _hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let _minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let _seconds = Math.floor((distance % (1000 * 60)) / 1000);

            that.setState(prevState =>({
                timer : {
                    hours : timer.hours,
                    minutes : timer.minutes,
                    seconds : timer.seconds,
                },
                countingMode : true,
                timerIsPaused : false,
                liveTimer : {
                    hours : _hours,
                    minutes : _minutes,
                    seconds : _seconds,
                },
            }));

        },1000);
        this.timerCounter = x;
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

        clearInterval(this.timerCounter);
    }


    handleCounterResume(){
        this.handleCounterStart(this.state.liveTimer, true);
    }

    handleCounterCancel(){
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
        clearInterval(this.timerCounter);
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
