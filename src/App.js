import logo from './logo.svg';
import './App.css';
import Waterway from './lib/waterway-api/waterway';

function App() {
  const params = {
    latitude: 41.3024159,
    longitude: -112.0475231,
    radius: 50, 
    unitType: "miles"
}
   const prom = Waterway.retrieveArea(params).then(data => console.log(data)).catch(err => console.log(err))
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
