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
import CellComponent from '../components/CellComponent'


const Cell = (props) => {
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

  const updateBoardData = () => {
    const board = Object.assign({}, boardData)
    console.log(board)
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
    console.log('board', board)
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
    <CellComponent
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
)(Cell);