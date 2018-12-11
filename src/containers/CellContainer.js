import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  selectCell,
  hoverCell,
  unhoverCell,
  setCellArray,
  placeShip,
  updateSelectShipArray,
  setAction,
  emptyCellArray,
  clearSelectedShip,
  updateShipObj,
  updateBoard
} from '../actions'
import { alphabet, setCellData, getCellArrayData, cellData } from '../utils';
import Cell from '../components/Cell'


const CellContainer = (props) => {
  const {
    action,
    cell,
    selectCell,
    hoverCell,
    unhoverCell,
    boardData,
    className,
    cellState,
    setCellArray,
    placeShip,
    selectedShip,
    placeSelectedShip,
    selectHoveringCells,
    placeShipArray,
    shipsObj
  } = props

  const cellMarker = cellData[cellState]
  const handleClick = (e) => {
    switch(action) {
      case 'selectShip':
        break;
      case 'placeShip':
        selectCell(e)
        placeSelectedShip()
        break;
      default:
        return;
    }

  }
  const handleHover = (e) => {
    switch(action) {
      case 'selectShip':
        console.log('Please select ship.')
        break
      case 'placeShip':
        console.log('Ship selected. Place ship.')
        hoverCell(e)
        const cellArray = selectHoveringCells(cell)
        setCellArray(cellArray)
        console.log(placeShipArray)
        break
      default:
        return
    }

  }
  const leaveHandler = () => {
    switch(action) {
      case 'placeShip':
        unhoverCell()
        break
        default:
        return
    }
  }

  return (
    <Cell
      className={className}
      cell={cell}
      cellMarker={cellMarker}
      clickHandler={handleClick}
      hoverHandler={handleHover}
      leaveHandler={leaveHandler}
    />
  )
}

const mapDispatchToProps  = (state) => {
  return {
    shipsObj: state.shipsObj,
    // updateShipObj: updateShipObj,
    boardData: state.board.data,
    placeShip: state.placeShip,
    placeShipArray: state.placeShipArray,
    selectedShip: state.selectedShip,
    // shipsArray: state.shipsArray,
    // updateBoard: state.updateBoard,
    // selectCell: state.selectCell,
    // hoverCell: state.hoverCell,
    action: state.action,
    cellSelected: state.cellSelected,
    cellHovered: state.cellHovered,
    setCellArray: state.setCellArray,
    // action: state.action
  }
}

Cell.propTypes = {
  selected: PropTypes.string,
  cell: PropTypes.string,
  cellState: PropTypes.number,
  cellMarker: PropTypes.string,
  selectCell: PropTypes.func,
  hoverCell: PropTypes.func,
  unhoverCell: PropTypes.func,
  className: PropTypes.string,
  cellHovered: PropTypes.string,
  cellSelected: PropTypes.string 
}

export default connect(
  // updateShipObj,
  // updateBoard,
  // setAction,
  // emptyCellArray,
  // clearSelectedShip,
  // updateSelectShipArray,
  mapDispatchToProps, {
    placeShip,
    selectCell,
    hoverCell,
    unhoverCell,
    setCellArray
  }
)(CellContainer);