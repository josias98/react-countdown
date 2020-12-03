import { Component } from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import Content from './Content/Content';
import SaveCounter from './SaveCounter/SaveCounter';

class App extends Component{
    render(){
        return (
            <div className="App">
            <Navbar/>
            <SaveCounter onSave = {this.handleSave} />
            <Content onTimerChange = {this.handleTimerChange}/>
            </div>
            );
        }

    constructor(props) {
            super(props);
            let currentSet = JSON.parse(localStorage.getItem('savedSets'));
            if(currentSet==null){
                currentSet = [];
                localStorage.setItem('savedSets',JSON.stringify(currentSet));
            }
            this.state = {
                saveSets : currentSet,
                currentSet : {}
            };
            this.saveCurrentSet = this.saveCurrentSet.bind(this);
            this.handleTimerChange = this.handleTimerChange.bind(this);
            this.handleSave = this.handleSave.bind(this);
        }


    handleTimerChange(newTimer){
        console.log(newTimer);
        this.setState(prevState =>({
            saveSets : prevState.saveSets,
            currentSet : newTimer
        }), ()=>{
            console.log(this.state);
        });
    }

    saveCurrentSet(){
        let savedSet = this.state.saveSets;
        console.log(savedSet);
        const newSet = this.state.currentSet;
        console.log(newSet);
        savedSet.push(newSet);
        console.log(savedSet);
        localStorage.setItem('savedSets',JSON.stringify(savedSet));
    }

    handleSave(){
        this.saveCurrentSet();
    }

    }



    export default App;
