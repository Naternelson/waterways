import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import Waterway from './api/usgs/waterway';

function App() {

  useEffect(()=>{
    const params = {
      latitude: 41.3024159,
      longitude: -112.0475231,
      radius: 50, 
      unitType: "miles"
    }
    console.log("sup")
    Waterway.retrieveArea(params).then(data => console.log(Object.keys(data[0]))).catch(err => console.log(`My Error ${err}`))
  },[])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
