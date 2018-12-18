import React, { Component } from 'react';
import logo from './logo.svg';
import Map from './components/Map';
import styles from './App.module.css';

class App extends Component {

    render() 
    {
        return (<div className={styles.mapContainer}><Map accessToken="pk.eyJ1Ijoiam9uYXRoYW5jbGFyZSIsImEiOiJjanBjczd0cmwwYjM4M3BudjV2M3lvdHZ5In0.TerFDj6LBma-HNs0Np0Wtg" className={styles.mapContainer} /></div>);
    }
  /*render() {
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
  }*/

}

export default App;
