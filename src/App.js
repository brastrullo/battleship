import React from 'react';
import { connect } from 'react-redux';
import BoardContainer from './containers/BoardContainer';
import PlaceShipsSelectContainer from './containers/PlaceShipsSelectContainer';
import BoardSizeSelectContainer from './containers/BoardSizeSelectContainer';
import './App.css';

const App = (props) => {
  const {
    startGame
  } = props
  return (
    <div className="App">
        {
          startGame ?
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
  )
}

const mapStateToProps = state => ({
  startGame: state.gameInitialized
})

export default connect(mapStateToProps, {

})(App);