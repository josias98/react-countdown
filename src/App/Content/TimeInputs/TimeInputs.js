import { Component } from 'react';
import './TimeInputs.css';

class TimeInputs extends Component{
    render() {
        return (
            <div className="settings">
            <h5>Set your time : </h5>
            <form onSubmit={this.handleSubmit}>
            <input type="text" id="hours" className="time-input" placeholder="00"  value={this.state.value.hours}  onChange={this.handleHoursChange} />
            <input type="text" id="minutes" className="time-input" placeholder="00"  value={this.state.value.minutes}  onChange={this.handleMinutesChange} />
            <input type="text" id="seconds" className="time-input" placeholder="00"  value={this.state.value.seconds}  onChange={this.handleSecondsChange} />
            <div className="action">
            <button id="start" type="submit">Start</button>
            </div>
            </form>
            </div>
            );
        }

    constructor(props) {
        super(props);
        this.state = {
            value : {
                hours : this.props.actualTime.hours,
                minutes : this.props.actualTime.minutes,
                seconds : this.props.actualTime.seconds
            }
        };

        this.handleHoursChange = this.handleHoursChange.bind(this);
        this.handleMinutesChange = this.handleMinutesChange.bind(this);
        this.handleSecondsChange = this.handleSecondsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleHoursChange(event) {
        this.setState(prevState => ({
            value : {
                hours : this.getValidateInput(event.target.value),
                minutes : prevState.value.minutes,
                seconds : prevState.value.seconds,
            }
        }), ()=>{
            this.props.onTimerChange(this.state.value);
        });
    }

    getValidateInput(input){
        const output = parseInt(input);
        if(isNaN(output)){
            return 0;
        }
        else{
            if(output<=0){
                return 0;
            }else if(output>=59){
                return 59;
            }else{
                return output;
            }
        }
    }


    handleMinutesChange(event) {
        this.setState(prevState => ({
            value : {
                hours : prevState.value.hours,
                minutes : this.getValidateInput(event.target.value),
                seconds : prevState.value.seconds,
            }
        }), ()=>{
            this.props.onTimerChange(this.state.value);
        });
    }


    handleSecondsChange(event) {
        this.setState(prevState => ({
            value : {
                hours : prevState.value.hours,
                minutes : prevState.value.minutes,
                seconds : this.getValidateInput(event.target.value)
            }
        }), ()=>{
            this.props.onTimerChange(this.state.value);
        });
    }

    handleSubmit(event) {
        this.props.onTimeInputsChange(this.state.value);
        event.preventDefault();
    }
}


export default TimeInputs;
