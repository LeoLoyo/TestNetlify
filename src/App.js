import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Rates from './Rates'




class App extends Component {
  async componentDidMount(){
    // const rates = await Rates()
    // console.log("TCL: App -> componentDidMount -> rates", rates)
    const data = await fetch("https://localbitcoins.com/buy-bitcoins-online/CO/colombia/.json").then(data => data.json())
    console.log("TCL: App -> componentDidMount -> data", data)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hi, Edit and save to reload.
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
}





export default App;
