import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./counter";
import AppWrapper from "./react-redux-demo";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <AppWrapper />
      </div>
    );
  }
}

export default App;
