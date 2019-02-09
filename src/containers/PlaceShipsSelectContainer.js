import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {
  selectShip,
  toggleOrientation,
  toggleRandomize,
  setCellArray,
  updateShipPlacement,
  removeShipFromArray,
  restoreAllShips,
  clearSelectedShip,
  updateBoard
} from '../actions'
import { randomPlacement, setCellData, cleanBoard, cellTaken, l2n } from '../utils'
import { shipSize, allShipsArray } from '../constants'
import { all } from 'q';

const PlaceShipsSelect = (props) => {
  const {
    boardData,
    shipSelected,
    shipsArray,
    selectShip,
    clearSelectedShip,
    toggleOrientation,
    randomize,
    toggleRandomize,
    orientation,
    rows,
    cols,
    placeShipHandler,
    setCellArray,
    updateBoard,
    updateShipPlacement,
    removeShipFromArray,
    restoreAllShips
  } = props
  const selectShipArray = shipsArray.map(ship =>
    <option key={ship} value={ship}>{ship}</option>)
  const onChangeHandler = (e) => {
    selectShip(e)
    if (randomize && e !== 'all') generateRandomShipPlacement(e)
  }

  const toggleRandomizeMode = (e) => {
    toggleRandomize()
    if (e.checked && shipSelected !== null) generateRandomShipPlacement()
    return e.checked
  }

  const generateRandomShipPlacement = (shipSelected) => {
    if (rows !== undefined && cols !== undefined) {
      const boardSize = { rows, cols }
      const size = shipSize[shipSelected]
      const placement = randomPlacement(size, boardSize, boardData)
      if (placement) setCellArray(placement)
    }
  }

  const undo = () => {
    console.log('undo')
  }

  const randomizeAllShips = () => {
    if (shipSelected === 'all') {
      const board = Object.assign({}, boardData)
      const boardSize = { rows, cols }
      let ships = [...shipsArray]
      let allShipsObj = {}
      const allShipsCells = []

      ships.forEach(ship => {
        const size = shipSize[ship]
        const cellArray = randomPlacement(size, boardSize, board)
        const cellData = setCellData(cellArray, 1)
        updateShipPlacement(ship, cellData)
        removeShipFromArray(ship)
        allShipsCells.push(cellArray)
        Object.assign(allShipsObj, cellData)
      })

      const flatArr = allShipsCells.reduce((acc, val) => acc.concat(val), [])
      console.log('allShipsObj', allShipsObj, flatArr)
      Object.entries(allShipsObj).forEach(cell => {
        const l = cell[0].split('')[0]
        const n = cell[0].substr(1) - 1
        board[l2n(l)][n] = 1
      })
      clearSelectedShip()
    }
  }

  const clearBoard = () => {
    const board = cleanBoard(rows, cols)
    allShipsArray.forEach(ship => updateShipPlacement(ship, {}))
    restoreAllShips()
    toggleRandomize()
    updateBoard(board)
  }

  return (
    <div>
      <button onClick={() => clearBoard()}>Clear Board</button>
      { shipsArray.length > 0 ?
        <div>
          <p>Ships left to place: {shipsArray.length}</p>
          {
            shipsArray.length !== 5 &&
            <div>
              <button onClick={() => undo()}>Undo Last Placement</button>
            </div>
          }
          <label htmlFor="selectOrientation"><small>Random</small></label>
          <input id="selectOrientation" type="checkbox" onClick={(e) => toggleRandomizeMode(e.target)} />
          <select onChange={(e) => onChangeHandler(e.target.value)}>
            <option value="">--Select Ship--</option>
            {selectShipArray}
            { randomize &&
            <option value="all">All</option>}
          </select>
          {
            shipSelected &&
            <span>
            {
              randomize ?
                (shipSelected === 'all')
                  ? <button onClick={() => randomizeAllShips()}>Randomize All Ships</button>
                  : <button onClick={() => placeShipHandler()}>Place Ships</button>
              :
                <span>
                  <button onClick={() => toggleOrientation(orientation)}>Toggle Orientation</button>
                  <span> { orientation }</span>
                </span>
            }
            </span>
          }
        </div>
        :
        <div>
          <p>Enemy Turn</p>
          <button onClick={() => clearBoard()}>Clear Board</button>
          <button onClick={() => console.log('start round')}>Start Round</button>
        </div>
      }
    </div>
  )
}


// {
//   randomize ?
//   <span>
//     { shipSelected &&
//       <span>
//         <button onClick={() => toggleOrientation(orientation)}>Toggle Orientation</button>
//         <span> { orientation }</span>
//       </span>
//     }
//   </span>
//   :
//   <div>{shipSelected && <button>Place ship</button> }</div>
// }




const mapDispatchToProps  = (state) => {
  return {
    boardData: state.boardData.present,
    shipSelected: state.shipSelected,
    shipsArray: state.shipsArray,
    orientation: state.orientation,
    toggleOrientation: state.toggleOrientation,
    randomize: state.randomize,
    toggleRandomize: state.toggleRandomize,
    rows: state.boardRows,
    cols: state.boardCols,
  }
}

export default connect(
  mapDispatchToProps, {
    selectShip,
    toggleOrientation,
    toggleRandomize,
    setCellArray,
    updateBoard,
    updateShipPlacement,
    removeShipFromArray,
    clearSelectedShip,
    restoreAllShips
  }
)(PlaceShipsSelect)

PlaceShipsSelect.proptypes = {
  setAction: PropTypes.func,
  setCellData: PropTypes.func,
  updateShipPlacement: PropTypes.func,
  removeShipFromArray: PropTypes.func,
  restoreAllShips: PropTypes.func,
  shipSelected: PropTypes.string,
  shipsArray: PropTypes.array,
  shipsObj: PropTypes.object,
  selectShip: PropTypes.func,
  toggleOrientation: PropTypes.func,
  randomize: PropTypes.bool,
  toggleRandomize: PropTypes.func,
  rows: PropTypes.num,
  cols: PropTypes.number
}
