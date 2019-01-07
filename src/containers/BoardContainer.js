import React from 'react'
import { connect } from 'react-redux'
import Board from '../components/Board'
import { shipSize } from '../constants'
import { cellTaken, setCellData } from '../utils'
import {
  setCellArray,
  emptyCellArray,
  updateBoard,
  removeShipFromArray,
  clearSelectedShip,
  updateShipPlacement
} from '../actions'

const BoardContainer = (props) => {
  const {
    boardData,
    orientation,
    cellArray,
    shipSelected,
    updateShipPlacement,
    removeShipFromArray,
    clearSelectedShip,
    emptyCellArray,
    updateBoard,
    placeShipHandler,
  } = props

  const shipData = {
    orientation,
    size: shipSize[shipSelected]
  }

  const placeShipOnBoard = () => {
    if (cellArray.length === 0) {
      console.log('Cannot place empty array')
      return 
    }
    if (cellTaken(boardData, cellArray)) {
      console.log('Placement taken. Please choose other cells.')
      return
    }

    const cellData = setCellData(cellArray, 1)
    updateShipPlacement(shipSelected, cellData)
    removeShipFromArray(shipSelected)
    clearSelectedShip()
    emptyCellArray()

    const board = Object.assign({}, boardData)
    
    Object.entries(cellData).forEach(cell => {
      const l = cell[0].split('')[0]
      const n = cell[0].split('')[1] - 1
      board[l][n] = cell[1]
    })
    updateBoard(board)
  }

  return (
    <Board
      boardData={boardData}
      shipData={shipData}
      placeShipOnBoard={placeShipOnBoard}
    />
  )
}

const mapDispatchToProps  = (state) => {
  return {
    boardData: state.boardData,
    orientation: state.orientation,
    shipSelected: state.shipSelected,
    shipsArray: state.shipArray,
    shipCellData: state.shipCellData,
    cellArray: state.cellArray,
    setCellArray: state.setCellArray,
    cellSelected: state.cellSelected,
    cellHovered: state.cellHovered
  }
}

export default connect(
  mapDispatchToProps, {
    setCellArray,
    updateBoard,
    removeShipFromArray,
    updateShipPlacement,
    clearSelectedShip,
    emptyCellArray,

  }
)(BoardContainer);