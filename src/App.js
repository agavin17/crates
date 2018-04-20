import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Bitquilts from './bitquilts/bitquilts.js';
import Navigation from './navbar/navbar.js';
import Footer from './footer/footer.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
        </header> */}
        {/* <Navigation /> */}
        <Bitquilts />
        <Footer />
      </div>
    );
  }
}

export default App;
