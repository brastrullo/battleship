import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Cell from '../components/Cell'
import { cellData } from '../constants'
import { alphabet, calcHoveringCells } from '../utils'
import {
  selectCell,
  hoverCell,
  unhoverCell,
  setCellArray,
  updateShipPlacement,
  clearSelectedShip,
  emptyCellArray,
  removeShipFromArray
} from '../actions'

const CellContainer = (props) => {
  const {
    cell,
    cellState,
    cellArray,
    shipSelected,
    shipData,
    rows,
    cols,
    setCellArray,
    placeShipOnBoard,
    randomize
  } = props

  const placingShip = cellArray ? cellArray.includes(cell) : false
  const className =  placingShip ? `${shipSelected}` : ''
  const cellSymbol = cellData[cellState]

  const selectHoveringCells = (e, shipData) => {
    const board = { rows, cols }
    const hovered = calcHoveringCells(e, shipData, board)
    if (hovered.length > 0) {
      setCellArray(hovered)
    }
  }

  const handleClick = (e) => {
    const action =
      shipSelected ?
        (randomize ? 'randomize' : 'placeShip')
        : 'selectShip'
    switch(action) {
      case 'randomize':
        break
      case 'selectShip':
        break
      case 'placeShip':
        placeShipOnBoard()
        break
      default:
        return
    }
  }

  const handleHover = (id) => {
    const action =
      shipSelected ?
        (randomize ? 'randomize' : 'placeShip')
        : 'selectShip'
    switch(action) {
      case 'selectShip':
        console.log('Please select ship.')
        break
      case 'placeShip':
        selectHoveringCells(id, shipData)
        console.log('Ship selected. Click on cell to place ship.')
        break
      default:
        return
    }
  }

  const leaveHandler = () => shipSelected ? console.log('setupLeaveHandler') : ''
  return (
    <Cell
      cell={cell}
      className={randomize ? '' : className}
      cellSymbol={cellSymbol}
      onClick={handleClick}
      onHover={handleHover}
      onLeave={leaveHandler}
    />
  )
}

const mapDispatchToProps  = (state) => {
  return {
    boardData: state.boardData.present,
    cellSelected: state.cellSelected,
    cellHovered: state.cellHovered,
    cellArray: state.cellArray,
    setCellArray: state.setCellArray,
    selectCell: state.selectCell,
    hoverCell: state.hoverCell,
    unhoverCell: state.unhoverCell,
    shipSelected: state.shipSelected,
    rows: state.boardRows,
    cols: state.boardCols,
    randomize: state.randomize
  }
}

Cell.propTypes = {
  cell: PropTypes.string,
  cellSelected: PropTypes.string,
  cellHovered: PropTypes.string,
  cellState: PropTypes.number,
  shipSelected: PropTypes.string,
}

export default connect(
  mapDispatchToProps, {
    selectCell,
    hoverCell,
    unhoverCell,
    setCellArray,
    updateShipPlacement,
    clearSelectedShip,
    emptyCellArray,
    removeShipFromArray
  }
)(CellContainer)