import { Component } from 'react';
import './SavedSet.css';

class SavedSet extends Component{
    render(){
        const savedDate = this.props.time;
        return (
            <div className="SavedSet">
                <div className="inner-action" title="Delete this set"><button><img src="../../delete.png" alt="Delete"/></button></div>
                <h5>{savedDate.hours}h {savedDate.minutes}mins {savedDate.seconds}</h5>
            </div>
            );
        }


    constructor(props) {
        super(props);
        this.state = {};

        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    }

    export default SavedSet;
