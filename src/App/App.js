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
            <Content onTimerChange = {this.handleTimerChange} savedSets = {this.state.savedSets} onSetDeletion = {this.handleSetDeletion}/>
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
                lastSetId = 2;
                localStorage.setItem('lastSetId',lastSetId.toString());
            }

            this.state = {
                savedSets : currentSet,
                lastSetId: parseInt(lastSetId),
                currentSet : {}
            };
            this.saveCurrentSet = this.saveCurrentSet.bind(this);
            this.handleTimerChange = this.handleTimerChange.bind(this);
            this.handleSave = this.handleSave.bind(this);
            this.handleSetDeletion = this.handleSetDeletion.bind(this);
        }


        handleTimerChange(newTimer){
            let timer = newTimer;
            timer.id = this.state.lastSetId;
            this.setState(prevState =>({
                savedSets : prevState.savedSets,
                currentSet : timer
            }), ()=>{
                // console.log(this.state);
            });
        }

        saveCurrentSet(){
            // let's verify if there is already a set with the same time.
            let savedSet = this.state.savedSets;
            const curentSet = this.state.currentSet;
            let isDuplicate = false;
            savedSet.forEach(set => {
                if(set.hours === curentSet.hours && set.minutes === curentSet.minutes && set.seconds === curentSet.seconds ){
                    console.log('existe déja');
                    alert('this set already exists !');
                    isDuplicate = true;
                }
            });
            if(!isDuplicate){
                let lastSetId = this.state.lastSetId;
                lastSetId++;
                let newSet = this.state.currentSet;
                newSet.id = lastSetId;
                savedSet.push(newSet);
                this.setState(prevState =>({
                    savedSets: savedSet,
                    currentSet : prevState.currentSet,
                    lastSetId: parseInt(lastSetId),
                }));
                localStorage.setItem('savedSets',JSON.stringify(savedSet));
                localStorage.setItem('lastSetId',lastSetId.toString());
            }
        }

        handleSave(){
            this.saveCurrentSet();
        }


        handleSetDeletion(set){
            let oldSet =  this.state.savedSets;
            // console.log(JSON.stringify(oldSet));
            const newSet = oldSet.filter((currentSet) => currentSet.id !== set.id);
            this.setState(prevState =>({
                savedSets: newSet,
                currentSet : prevState.currentSet,
                lastSetId: prevState.lastSetId,
            }));
            localStorage.setItem('savedSets',JSON.stringify(newSet));
        }
    }



    export default App;
