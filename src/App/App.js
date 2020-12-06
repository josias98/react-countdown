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
            <Content onTimerChange = {this.handleTimerChange} savedSets = {this.state.saveSets} onSetDeletion = {this.handleSetDeletion}/>
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
            let lastSetId = localStorage.getItem('lastSetId');
            if(lastSetId==null){ // doesnt exist
                lastSetId = 0;
                localStorage.setItem('lastSetId',lastSetId);
            }
            this.state = {
                saveSets : currentSet,
                lastSetId: parseInt(lastSetId),
                currentSet : {}
            };
            this.saveCurrentSet = this.saveCurrentSet.bind(this);
            this.handleTimerChange = this.handleTimerChange.bind(this);
            this.handleSave = this.handleSave.bind(this);
        }


        handleTimerChange(newTimer){
            // console.log(newTimer);
            this.setState(prevState =>({
                saveSets : prevState.saveSets,
                currentSet : newTimer
            }), ()=>{
                // console.log(this.state);
            });
        }

        saveCurrentSet(){
            let savedSet = this.state.saveSets;
            let lastSetId = this.state.lastSetId;
            console.log(lastSetId);
            lastSetId++;
            console.log(lastSetId);
            let newSet = this.state.currentSet;
            newSet.id = lastSetId;
            savedSet.push(newSet);
            console.log(savedSet);
            this.setState(prevState =>({
                saveSets: savedSet,
                currentSet : prevState.currentSet,
                lastSetId: lastSetId,
            }))
            localStorage.setItem('savedSets',JSON.stringify(savedSet));
            localStorage.setItem('lastSetId',lastSetId);
        }

        handleSave(){
            this.saveCurrentSet();
        }

        handleSetDeletion(set){
            console.log('App component will delete this set');
            console.log(set);
        }

    }



    export default App;
