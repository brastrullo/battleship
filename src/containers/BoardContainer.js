import React from 'react'
import { connect } from 'react-redux'
import PlaceShipsSelectContainer from '../containers/PlaceShipsSelectContainer'
import CellContainer from '../containers/CellContainer'
import { shipSize } from '../constants'
import { cellTaken, setCellData, alphabet, l2n } from '../utils'
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

    const board = Array.from(boardData)
    Object.entries(cellData).forEach(cell => {
      const l = cell[0].split('')[0]
      const n = cell[0].substr(1) - 1
      const id = l2n(l)
      board[id][n] = cell[1]
    })
    updateBoard(board)
  }

  // const boardRows = Array.from(Array(boardData[0].length).keys()).map(r => 0)
  const boardRows = boardData[0]
  const alphabetArr = alphabet.slice(0, boardData.length)
  const header = [].concat('', alphabetArr)
  const columns = header.map(cell => <th key={cell}>{cell}</th>)
  const grid = boardRows.map((l, i) => {
    const row = i + 1
    return (
      <tr key={row}>
        <th>{row}</th>
        {alphabetArr.map((letter, id) => {
          const cell = `${letter}${row}`
          const cellState = boardData[id][row - 1]
          
            return (
              <CellContainer
                shipData={shipData}
                key={cell}
                cell={cell}
                cellState={cellState}
                placeShipOnBoard={placeShipOnBoard}
              />
            )
          })}
      </tr>
    )
  })

  return (
    <div>
      <PlaceShipsSelectContainer placeShipHandler={placeShipOnBoard} />
      <div>
        <table>
          <thead>
            <tr>
              {columns}
            </tr>
          </thead>
          <tbody>
            {grid}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapDispatchToProps  = (state) => {
  return {
    boardData: state.boardData.present,
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