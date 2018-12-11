import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import CellContainer from './CellContainer';
import Board from '../components/Board'
import { alphabet, setCellData, getCellArrayData } from '../utils';
import {
  setCellArray,
  emptyCellArray,
  updateBoard,
  clearSelectedShip,
  setAction,
  placeShip
} from '../actions'

const BoardContainer = (props) => {
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

  const updateBoardData = () => {
    const board = Object.assign({}, boardData)
    const indexOfShip = placeShipArray.indexOf(selectedShip)
    placeShipArray.splice(indexOfShip, indexOfShip + 1 )
    Object.values(shipsObj).forEach(ship => {
      if (Object.keys(ship.placement).length > 0) {
        Object.entries(ship.placement).forEach(cell => {
          const l = cell[0].split('')[0]
          const n = cell[0].split('')[1] - 1
          board[l][n] = cell[1]
        })
      }
    })
    const action = placeShipArray.length > 0 ? 'placeShip' : 'startTurn' 
    updateBoard(board)
    emptyCellArray()
    clearSelectedShip()
    setAction(action)
  }

  const placeSelectedShip = () => {
    const cellData = getCellArrayData(boardData, placeShipArray)
    const cellTaken = Object.values(cellData).includes(1)
    if (!cellTaken) {
      const dataObj = setCellData(placeShipArray, 1)
      placeShip(selectedShip, dataObj)
      clearSelectedShip()
      emptyCellArray()
      updateBoardData()
      setAction('selectShip')
      console.log(`Placed: ${selectedShip}`)
      return
    }
    console.log('Spot taken. Place in other cells.')
  }

  return (
    <Board
      boardData={boardData}
      selectHoveringCells= {selectHoveringCells}
      rows={rows}
      cols={cols}
      action={action}
      placeShipArray= {placeShipArray}
      placeSelectedShip={placeSelectedShip}
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
    placeShip: state.placeShip,
    shipsArray: state.shipArray,
  }
}

export default connect(
  mapDispatchToProps, {
    setCellArray,
    emptyCellArray,
    placeShip
  }
)(BoardContainer);