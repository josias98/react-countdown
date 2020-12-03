import './App.css';
import Navbar from './Navbar/Navbar';
import Content from './Content/Content';
import SaveCounter from './SaveCounter/SaveCounter';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <SaveCounter />
      <Content/>
    </div>
  );
}

export default App;
