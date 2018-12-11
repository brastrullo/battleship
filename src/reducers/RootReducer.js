import { combineReducers } from 'redux';
import * as type from '../actions/constants'

const boardReducer = (state, action) => {
  switch(action.type) {
    case type.GET_BOARD_DATA:
      return { ...state, data: action.payload }
    case type.SET_BOARD_COL:
      return { ...state, cols: action.payload }
    case type.SET_BOARD_ROW:
      return { ...state, rows: action.payload }
    case type.UPDATE_BOARD:
      return { ...state, data: action.payload }
    default:
      return {...state}
  }
}

const placeShipArrayReducer = (state = [], action) => {
  switch(action.type) {
    case type.SET_CELL_ARRAY:
      return action.payload
    case type.EMPTY_CELL_ARRAY:
    return action.payload
    default:
      return state
  }
}

const boardColsReducer = (cols = 10, action) => {
  switch(action.type) {
    case type.SET_BOARD_COL:
      return action.payload
    default:
      return cols
  }
}

const boardRowsReducer = (rows = 10, action) => {
  switch(action.type) {
    case type.SET_BOARD_ROW:
      return action.payload
    default:
      return rows
  }
}

const initializeGameReducer = (gameStarted = false, action) => {
  switch(action.type) {
    case type.INITIALIZE_GAME:
      return action.payload
    default:
      return gameStarted
  }
}

const selectedShipReducer = (state = null, action) => {
  switch(action.type) {
    case type.SELECT_SHIP:
      return action.payload
    case type.CLEAR_SELECTED_SHIP:
      return undefined
    default:
      return state
  }
}

const shipsObjReducer = (state, action) => {
  const ship = action.payload ? action.payload.ship : ''
  const obj = action.payload ? action.payload.obj : ''
  switch(action.type) {
    case type.UPDATE_SHIP_OBJECT:
      return { ...state, [ship]: obj }
    case type.PLACE_SHIP:
      return { ...state,
        [ship] : { ...state[ship], placement: action.payload.placement } }
    case type.TOGGLE_ORIENTATION:
    const orientation = state[ship].orientation
      return { ...state,
        [ship]: { ...state[ship], orientation: orientation === 'H' ? 'V' : 'H' } }
    default:
      return {...state}
  }
}

const selectShipsArrayReducer = (state = {}, action) => {
  switch(action.type) {
    case type.UPDATE_SELECT_SHIP_ARRAY:
      const i = state.indexOf(action.payload)
      state.splice(i, 1)
      return state
    default:
      return state
  }
}

const cellSelectedReducer = (cell = null, action) => {
  switch(action.type) {
    case type.SELECT_CELL:
      return action.payload
    default:
      return cell
  }
}

const cellHoveredReducer = (cell = null, action) => {
  switch(action.type) {
    case type.HOVER_CELL:
      return action.payload
    case type.UNHOVER_CELL:
      return action.payload
    default:
      return cell
  }
}

const setActionReducer = (state = {}, action) => {
	switch (action.type) {
		case type.SET_ACTION:
		return action.data
		default:
		return state
	}
}

export default combineReducers({
  mockBoardData: (state = {}) => state,
  ships: (state = {}) => state,
  shipsObj: shipsObjReducer,
  shipsArray: selectShipsArrayReducer,
  placeShipArray: placeShipArrayReducer,
  board: boardReducer,
  action: setActionReducer,
  cellSelected: cellSelectedReducer,
  cellHovered: cellHoveredReducer,
  columns: boardColsReducer,
  rows: boardRowsReducer,
  selectedShip: selectedShipReducer,
  initializeGame: initializeGameReducer
})