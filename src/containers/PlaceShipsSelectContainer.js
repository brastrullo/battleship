import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {
  setAction,
  selectShip,
  toggleOrientation
} from '../actions'

const PlaceShipsSelect = (props) => {
  const { 
    setAction,
    selectedShip,
    shipsArray,
    shipsObj,
    selectShip,
    toggleOrientation
  } = props
  const selectShipArray = shipsArray.map(ship =>
    <option key={ship} value={ship}>{ship}</option>)
  const onChangeHandler = (e) => {
    selectShip(e)
    setAction('placeShip')
  }
  return (
    <div>
      <p>Ships left to place: </p>
      <p>{shipsArray.join(', ').toString()}</p>
      <select onChange={(e) => onChangeHandler(e.target.value)}>
        <option value="">--Select Ship--</option>
        {selectShipArray}
      </select>
      { selectedShip && 
        <span>
          <button onClick={() => toggleOrientation(selectedShip)}>Toggle Orientation</button>
          <span> { shipsObj[selectedShip].orientation }</span>
        </span>
      }
    </div>
  )
}

const mapDispatchToProps  = (state) => {
  return {
    action: state.action,
    shipsObj: state.shipsObj,
    selectedShip: state.selectedShip,
    shipsArray: state.shipsArray,
    toggleOrientation: state.toggleOrientation
  }
}

export default connect(
  mapDispatchToProps, {
    setAction,
    selectShip,
    toggleOrientation
  }
)(PlaceShipsSelect)

PlaceShipsSelect.proptypes = {
  setAction: PropTypes.func,
  selectedShip: PropTypes.string,
  shipsArray: PropTypes.array,
  shipsObj: PropTypes.object,
  selectShip: PropTypes.func,
  toggleOrientation: PropTypes.func
}
