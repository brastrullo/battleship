import React from 'react';
import { connect } from 'react-redux';
import BoardContainer from './containers/BoardContainer';
import PlaceShipsSelectContainer from './containers/PlaceShipsSelectContainer';
import BoardSizeSelectContainer from './containers/BoardSizeSelectContainer';
import { setEnemyBoard } from './actions'
import './App.css';

// TODO:
// - COMPLETE: randomize place ship
// - FIX: ship hover at non-default board size

const App = (props) => {
  const {
    startGame
  } = props

  const placeShipHandler = () => console.log('placed!')

  return (
    <div className="App">
        {
          startGame ?
            <div>
              <PlaceShipsSelectContainer placeShipHandler={placeShipHandler} />
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