import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar/Navbar';
import Content from './Content/Content';

function formatUser(firstname, lastname){
    return `Hello Mr. ${firstname} ${lastname.toUpperCase()} !`;
}

function App() {
  const noeud = <p>Le couple, c'est nous deux. Don't forget it.</p>
  return (
    <div className="App">
      <Navbar/>
      <Content/>
    </div>
  );
}

export default App;
