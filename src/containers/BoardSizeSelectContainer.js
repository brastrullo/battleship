import React from 'react';
import { connect } from 'react-redux';
import { setAction, setBoardCols, setBoardRows, initializeGame } from '../actions'

const BoardSizeSelect = (props) => {
  const { 
    setBoardCols,
    setBoardRows,
    initializeGame,
    setAction
  } = props
  const mapSelect = [...Array(6).keys()].map(el => <option key={`col${el}`} value={el + 5}>{el + 5}</option>)

  const startGame = () => {
    initializeGame()
    setAction('selectShip')
  }
  return (
    <div>
      <select onChange={(e) => setBoardCols(Number(e.target.value))}>
        <option value="">Select Columns:(Default:10)</option>
        { mapSelect }
      </select>
      <select onChange={(e) => setBoardRows(Number(e.target.value))}>
        <option value="">Select Rows:(Default:10)</option>
        { mapSelect }
      </select>
      <button onClick={() => startGame()}>Start Game</button>
    </div>
  )
}

const mapDispatchToProps  = (state) => {
  return {
    cols: state.board.cols,
    rows: state.board.cols,
    initializeGame: state.initializeGame
  }
}

export default connect(
  mapDispatchToProps, {
    initializeGame,
    setBoardCols,
    setBoardRows,
    setAction
  }
)(BoardSizeSelect);