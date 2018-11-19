import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './containers/Board';
import StartButton from './containers/StartButton'
import './App.css';

class App extends Component {

  initializeGame() {
    console.log('Init')
  }

  render() {
    return (
      <div className="App">
        <Board />
        <StartButton handleClick={() => this.initializeGame()} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
 })

export default connect(mapStateToProps)(App);