import { Component } from 'react';
import './Counter.css';

class Counter extends Component{
    render() {
        const timer = this.props.timer;
        const pauseText = this.state.timerIsPaused?"RESUME":"PAUSE";
        return (
            <div className="counter">
            <div className="counter-pane">
            <h3>Here you go :</h3>
            <h5>
            <span className="counter-item">{timer.hours}<span className="counter-item-name">h</span></span>
            <span className="counter-item">{timer.minutes}<span className="counter-item-name">mins</span></span>
            <span className="counter-item">{timer.seconds}<span className="counter-item-name">secs</span></span>
            </h5>
            </div>
            <div className="counter-actions">
            <button className="btn" id="cancel" onClick={this.cancelCounter}>Cancel</button>
            <button className="btn" id="pause" onClick={this.pauseCounter}>{pauseText}</button>
            </div>
            </div>
            );
        }

        constructor(props) {
            super(props);
            //console.log(this.props.timer);
            this.state = {
                timer : {
                    hours : this.props.timer.hours,
                    minutes : this.props.timer.minutes,
                    seconds : this.props.timer.seconds
                },
                timerIsPaused : false
            };

            this.handleSubmit = this.handleSubmit.bind(this);
            this.pauseCounter = this.pauseCounter.bind(this);
            this.cancelCounter = this.cancelCounter.bind(this);
        }


        handleSubmit(event) {
            console.log(this.state.value);
            event.preventDefault();
        }

        pauseCounter(){
            if(this.state.timerIsPaused){
                this.setState(prevState => ({
                    timer : {
                        hours : prevState.timer.hours,
                        minutes : prevState.timer.minutes,
                        seconds : prevState.timer.seconds
                    },
                    timerIsPaused : false
                }));
                this.props.onCounterResume();
            }
            else{
                this.setState(prevState => ({
                    timer : {
                        hours : prevState.timer.hours,
                        minutes : prevState.timer.minutes,
                        seconds : prevState.timer.seconds
                    },
                    timerIsPaused : true
                }));
                this.props.onCounterPause();
            }
        }

        cancelCounter(){
            this.props.onCounterCancel();
        }
    }


    export default Counter;
