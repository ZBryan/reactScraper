import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import base from "./base";

class App extends Component {
  state = {};

  componentDidMount() {
    // this.ref = base.syncState(`this.props.match`);
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
