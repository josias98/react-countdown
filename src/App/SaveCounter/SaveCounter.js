import { Component } from 'react';
import './SaveCounter.css';

class SaveCounter extends Component{
    render(){
        return (
            <div className="SaveCounter">
            <button className="save-btn" id="save-btn" title="Save Current Set" onClick={this.saveSet}>+</button>
            </div>
            );
        }

        constructor(props) {
            super(props);
            this.state = {};
            this.saveSet = this.saveSet.bind(this);
        }

        saveSet(){
            this.props.onSave();
        }
    }

    export default SaveCounter;
