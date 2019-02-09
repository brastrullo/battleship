import React from 'react';
import { connect } from 'react-redux';
import BoardContainer from './containers/BoardContainer';
import BoardSizeSelectContainer from './containers/BoardSizeSelectContainer';
import { setEnemyBoard } from './actions'
import './App.css';

// TODO:
// - COMPLETE: randomize place ship
// - FIX: ship hover at non-default board size
// - FIX: all ship random placement still has overlap
// - FEAT: add history/undo/redo actions

const App = (props) => {
  const {
    startGame
  } = props

  return (
    <div className="App">
        {
          startGame ?
            <BoardContainer />
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