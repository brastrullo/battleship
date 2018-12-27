import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {
  selectShip,
  toggleOrientation,
  toggleRandomize
} from '../actions'
import { randomPlacement } from '../utils'
import { shipSize } from '../constants'

const PlaceShipsSelect = (props) => {
  const { 
    shipSelected,
    shipsArray,
    selectShip,
    toggleOrientation,
    randomize,
    toggleRandomize,
    orientation,
    rows,
    cols,
    placeShipHandler
  } = props
  const selectShipArray = shipsArray.map(ship =>
    <option key={ship} value={ship}>{ship}</option>)
  const onChangeHandler = (e) => {
    if (randomize) generateRandomShipPlacement()
    selectShip(e)
  }

  const toggleRandomizeMode = (e) => {
    toggleRandomize()
    e.checked ? generateRandomShipPlacement() : console.log()
    return e.checked
  }

  const generateRandomShipPlacement = () => {
    const board = { rows, cols }
    const size = shipSize[shipSelected]
    const randShipPlace = randomPlacement(size, board)
    console.log('pop', randShipPlace)
  }

  return (
    <div>
      { shipsArray.length > 0 ?
        <div>
          <p>Ships left to place: {shipsArray.length}</p>
          <label htmlFor="selectOrientation"><small>Random</small></label>
          <input id="selectOrientation" type="checkbox" onClick={(e) => toggleRandomizeMode(e.target)} />
          <select onChange={(e) => onChangeHandler(e.target.value)}>
            <option value="">--Select Ship--</option>
            {selectShipArray}
          </select>
          {
            shipSelected &&
            <span>
            {
              randomize ?
                <button onClick={() => placeShipHandler()}>Place ship</button>
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
        <div>Enemy Turn</div>
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
    shipSelected: state.shipSelected,
    shipsArray: state.shipsArray,
    orientation: state.orientation,
    toggleOrientation: state.toggleOrientation,
    randomize: state.randomize,
    toggleRandomize: state.toggleRandomize,
    rows: state.rows,
    cols: state.cols
  }
}

export default connect(
  mapDispatchToProps, {
    selectShip,
    toggleOrientation,
    toggleRandomize
  }
)(PlaceShipsSelect)

PlaceShipsSelect.proptypes = {
  setAction: PropTypes.func,
  shipSelected: PropTypes.string,
  shipsArray: PropTypes.array,
  shipsObj: PropTypes.object,
  selectShip: PropTypes.func,
  toggleOrientation: PropTypes.func,
  randomize: PropTypes.bool,
  toggleRandomize: PropTypes.func
}
