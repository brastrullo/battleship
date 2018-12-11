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
    selectShip,
    shipsArray,
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
      <select onChange={(e) => onChangeHandler(e.target.value)}>
        <option value="">--Select Ship--</option>
        {selectShipArray}
      </select>
      { selectedShip && 
        <button onClick={() => toggleOrientation(selectedShip)}>Turn Ship</button>
      }
    </div>
  )
}

PlaceShipsSelect.proptypes = {
  setAction: PropTypes.func,
  selectedShip: PropTypes.string,
  selectShip: PropTypes.func,
  shipsArray: PropTypes.array,
  toggleOrientation: PropTypes.func
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
    selectShip,
    toggleOrientation,
    setAction
  }
)(PlaceShipsSelect);