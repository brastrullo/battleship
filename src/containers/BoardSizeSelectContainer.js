import React from 'react';
import { connect } from 'react-redux';
import { shipSize } from '../constants'
import { randomCell, randomPlacement } from '../utils'
import {
  setBoardCols,
  setBoardRows,
  initializeGame,
  setEnemyBoard
} from '../actions'

const BoardSizeSelect = (props) => {
  const { 
    setBoardCols,
    setBoardRows,
    initializeGame,
    setEnemyBoard,
    enemyBoard
  } = props
  const mapSelect = [...Array(6).keys()].map(el => <option key={`col${el}`} value={el + 5}>{el + 5}</option>)

  const generateEnemyBoard = (board) => {
    const newBoard = Object.assign({}, board)
    setEnemyBoard(newBoard)
  }

  const randomizeEnemyBoard = () => {
    console.log('randomizeEnemyBoard')
  }

  const startGame = () => {
    initializeGame()
    generateEnemyBoard(enemyBoard)
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
    cols: state.boardCols,
    rows: state.boardRows,
    initializeGame: state.initializeGame,
    enemyBoard: state.enemyBoard
  }
}

export default connect(
  mapDispatchToProps, {
    initializeGame,
    setBoardCols,
    setBoardRows,
    setEnemyBoard
  }
)(BoardSizeSelect);