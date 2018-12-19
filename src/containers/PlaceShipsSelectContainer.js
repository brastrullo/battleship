import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {
  selectShip,
  toggleOrientation
} from '../actions'

const PlaceShipsSelect = (props) => {
  const { 
    shipSelected,
    shipsArray,
    selectShip,
    toggleOrientation,
    orientation
  } = props
  const selectShipArray = shipsArray.map(ship =>
    <option key={ship} value={ship}>{ship}</option>)
  const onChangeHandler = (e) => {
    selectShip(e)
  }
  return (
    <div>
      { shipsArray.length > 0 ?
        <div>
          <p>Ships left to place: </p>
          <p>{shipsArray.join(', ').toString()}</p>
          <select onChange={(e) => onChangeHandler(e.target.value)}>
            <option value="">--Select Ship--</option>
            {selectShipArray}
          </select>
        </div>
        :
        <div>Enemy Turn</div>
      }
      { shipSelected && 
        <span>
          <button onClick={() => toggleOrientation(orientation)}>Toggle Orientation</button>
          <span> { orientation }</span>
        </span>
      }
    </div>
  )
}

const mapDispatchToProps  = (state) => {
  return {
    shipSelected: state.shipSelected,
    shipsArray: state.shipsArray,
    orientation: state.orientation,
    toggleOrientation: state.toggleOrientation
  }
}

export default connect(
  mapDispatchToProps, {
    selectShip,
    toggleOrientation
  }
)(PlaceShipsSelect)

PlaceShipsSelect.proptypes = {
  setAction: PropTypes.func,
  shipSelected: PropTypes.string,
  shipsArray: PropTypes.array,
  shipsObj: PropTypes.object,
  selectShip: PropTypes.func,
  toggleOrientation: PropTypes.func
}
