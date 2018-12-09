import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const valor_presente = 1960000
const interes = 0.019
const numero_cuotas = 12

const interes_x_numero_cuotas = Math.pow(1 + interes, numero_cuotas)
const valor_cuota = valor_presente * ( (interes * interes_x_numero_cuotas)/ (interes_x_numero_cuotas - 1) )

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hi, Edit <code>{valor_cuota}</code> and save to reload.
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
