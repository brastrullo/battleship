import { combineReducers } from 'redux';
import undoable, { distinctState } from 'redux-undo'
import * as type from '../actions/actionTypes'
import { alphabet, allShipsArray, newBoardData } from '../constants'

const enemyBoardReducer = (state = newBoardData, action) => {
  switch(action.type) {
    case type.SET_ENEMY_BOARD:
      return action.payload
    default:
      return state
  }
}

const boardDataReducer = (state = newBoardData, action) => {
  switch(action.type) {
    case type.GET_BOARD_DATA:
      return action.payload
    case type.UPDATE_BOARD:
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

const randomizeReducer = (state = false, action) => {
  switch(action.type) {
    case type.TOGGLE_RANDOMIZE:
      return state ? false : true
    default:
      return state
  }
}

const shipSelectedReducer = (state = null, action) => {
  switch(action.type) {
    case type.SELECT_SHIP:
      return action.payload
    case type.CLEAR_SELECTED_SHIP:
      return action.payload
    default:
      return state
  }
}

const shipsArrayReducer = (state = {}, action) => {
  switch(action.type) {
    case type.REMOVE_SHIP_FROM_ARRAY:
      return state.filter(ship => ship !== action.payload)
    case type.RESTORE_SHIP_TO_ARRAY:
      return [...state, action.payload]
    case type.RESTORE_ALL_SHIPS:
      return allShipsArray
    default:
      return state
  }
}

const shipCellDataReducer = (state, action) => {
  const ship = action.payload ? action.payload.ship : ''
  switch(action.type) {
    case type.UPDATE_SHIP_PLACEMENT:
    return { ...state,
      [ship] : action.payload.placement}
      default:
      return {...state}
  }
}

const cellArrayReducer = (state = [], action) => {
  switch(action.type) {
    case type.SET_CELL_ARRAY:
      return action.payload
    case type.EMPTY_CELL_ARRAY:
    return action.payload
    default:
      return state
  }
}

const orientationReducer = (state = 'H', action) => {
  switch(action.type) {
    case type.TOGGLE_ORIENTATION:
      return action.payload
    default:
      return state
  }
}

// const shipsObjReducer = (state, action) => {
//   const ship = action.payload ? action.payload.ship : ''
//   const obj = action.payload ? action.payload.obj : ''
//   switch(action.type) {
//     case type.UPDATE_SHIP_OBJECT:
//       return { ...state, [ship]: obj }
//     case type.PLACE_SHIP:
//       return { ...state,
//         [ship] : { ...state[ship], placement: action.payload.placement } }
//     case type.TOGGLE_ORIENTATION:
//     const orientation = state[ship].orientation
//       return { ...state,
//         [ship]: { ...state[ship], orientation: orientation === 'H' ? 'V' : 'H' } }
//     default:
//       return {...state}
//   }
// }

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

const gameInitializedReducer = (gameStarted = false, action) => {
  switch(action.type) {
    case type.INITIALIZE_GAME:
      return action.payload
    default:
      return gameStarted
  }
}


const undoableBoardData = undoable(boardDataReducer, {
  filter: distinctState()
})

// boardDataNew: undoableBoardData,
export default combineReducers({
  enemyBoard: enemyBoardReducer,
  boardData: undoableBoardData,
  boardCols: boardColsReducer,
  boardRows: boardRowsReducer,
  randomize: randomizeReducer,
  shipSelected: shipSelectedReducer,
  shipsArray: shipsArrayReducer,
  shipCellData: shipCellDataReducer,
  cellArray: cellArrayReducer,
  orientation: orientationReducer,
  cellSelected: cellSelectedReducer,
  cellHovered: cellHoveredReducer,
  gameInitialized: gameInitializedReducer
})