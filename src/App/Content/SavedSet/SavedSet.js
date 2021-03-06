import { Component } from 'react';
import './SavedSet.css';

class SavedSet extends Component{
    render(){
        const savedDate = this.props.time;
        return (
            <div className="SavedSet" onClick={this.applySet}>
                <div className="inner-action" title="Delete this set"><button  onClick={this.deleteSet}><img src="../../delete.png" alt="Delete"/></button></div>
                <h5>{savedDate.hours}h {savedDate.minutes}mins {savedDate.seconds}</h5>
            </div>
            );
        }


    constructor(props) {
        super(props);
        this.state = {};

        this.deleteSet = this.deleteSet.bind(this);
        this.applySet = this.applySet.bind(this);
    }

    deleteSet(){
        this.props.onDelete(this.props.time);
    }

    applySet(){
        this.props.onApply(this.props.time);
    }

    }

    export default SavedSet;
