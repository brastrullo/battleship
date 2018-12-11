import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoardContainer from './containers/BoardContainer';
import PlaceShipsSelectContainer from './containers/PlaceShipsSelectContainer';
import './App.css';
import BoardSizeSelectContainer from './containers/BoardSizeSelectContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
          {
            this.props.startGame ? 
              <div>
                <PlaceShipsSelectContainer />
                <BoardContainer />
              </div>
            : 
            <div>
              <div>Battleship</div>
              <BoardSizeSelectContainer />
            </div>
          }
      </div>  
    );
  }
}

const mapStateToProps = state => ({
  startGame: state.initializeGame
})

export default connect(mapStateToProps)(App);