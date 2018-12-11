import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import CellContainer from './CellContainer';
import BoardComponent from '../components/BoardComponent'
import { alphabet, setCellData } from '../utils';
import {
  setCellArray,
  emptyCellArray,
  updateBoard,
  clearSelectedShip,
  setAction
} from '../actions'

const Board = (props) => {
  const {
    action,
    boardData,
    shipArray,
    placeShipArray,
    setCellArray,
    shipsObj,
    selectedShip,
    cols,
    rows
  } = props

  const size = selectedShip ? shipsObj[selectedShip].size : 0
  const orientation =  selectedShip ? shipsObj[selectedShip].orientation : 'H'

  // const updatePlaceShip = () => {
  //   const cellData = setCellData(placeShipArray, 1)
  //   placeShip(selectedShip, cellData)

  // }

  const selectHoveringCells = (cell) => {
    const horizontal = orientation === 'H'
    const vertical = orientation === 'V'
    const cellValue = cell.split('')
    const alphabetArr = alphabet.slice(0, rows)
    const start = alphabetArr.indexOf(cellValue[0])
    const end = start + size

    const horizontalLetters =
      alphabetArr.length < end
      ? alphabetArr.slice(alphabetArr.length - size)
      : alphabetArr.slice(start, end)
    const horizontalArr = horizontalLetters.map(letter => `${letter}${cell.substr(1)}`)
    const verticalArr = horizontalLetters.map((e, i) => {
      const number = 
        (cell.substr(1) > cols - size + 1)
        ? (cols - size) + i + 1
        : Number(cell.substr(1)) + i
      return `${cell.charAt(0)}${number}`
    })
    if (horizontal) return horizontalArr
    if (vertical) return verticalArr
  }

  return (
    <BoardComponent
      boardData={boardData}
      selectHoveringCells= {selectHoveringCells}
      rows={rows}
      cols={cols}
      action={action}
      placeShipArray= {placeShipArray}
      selectedShip={selectedShip}
      onMouseLeave={() => console.log('asdf')}
    />
  )
}

const mapDispatchToProps  = (state) => {
  return {
    boardData: state.board.data,
    action: state.action,
    cols: state.board.cols,
    rows: state.board.rows,
    shipArray: state.shipArray,
    shipsObj: state.shipsObj,
    placeShipArray: state.placeShipArray,
    selectedShip: state.selectedShip,
    shipsArray: state.shipArray,
  }
}

export default connect(
  mapDispatchToProps, {
    setCellArray,
    emptyCellArray
  }
)(Board);