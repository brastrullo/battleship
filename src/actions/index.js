import * as type from './actionTypes'

export const selectShip = (selected) => ({
  type: type.SELECT_SHIP,
  payload: selected
})

export const toggleOrientation = (orientation) => ({
  type: type.TOGGLE_ORIENTATION,
  payload: orientation === 'H' ? 'V' : 'H'
})

export const updateShipPlacement = (ship, placement) => ({
  type: type.UPDATE_SHIP_PLACEMENT,
  payload: {
    ship,
    placement
  }
})

export const setCellArray = (array) => ({
  type: type.SET_CELL_ARRAY,
  payload: array
})

export const emptyCellArray = () => ({
  type: type.EMPTY_CELL_ARRAY,
  payload: []
})

export const clearSelectedShip = () => ({
  type: type.CLEAR_SELECTED_SHIP,
  payload: null
})

export const setBoardCols = (columns) => ({
  type: type.SET_BOARD_COL,
  payload: columns
})

export const setBoardRows = (rows) => ({
  type: type.SET_BOARD_ROW,
  payload: rows
})

export const initializeGame = (gameStarted = true) => ({  
  type: type.INITIALIZE_GAME,
  payload: gameStarted
})

// export const getShipData = (obj) => ({
//   type: type.GET_SHIP_DATA,
//   payload: {
//     selected: obj.selected,
//     orientation: obj.orientation,
//     size: obj.size
//   }
// })


// // // an example of using redux-thunk

// // export const fetchTodos = (filter) => (dispatch) => {
// //   dispatch(requestTodos(filter));

// //   return api.fetchTodos(filter).then(response => {
// //     dispatch(receiveTodos(filter, response));
// //   });
// // }

// export const hoverShipCells = (cell, shipDataObj) => (dispatch) => {
//   return getShipData(shipDataObj).then(
//           () => dispatch(hoverCell(cell)),
//           obj => dispatch()
//         )
// }

// export const getBoardData = (payload) => ({
//   type: type.GET_BOARD_DATA,
//   payload
// })

export const selectCell = (cell) => ({
  type: type.SELECT_CELL,
  payload: cell
})

export const hoverCell = (cell) => ({
  type: type.HOVER_CELL,
  payload: cell
})

export const unhoverCell = () => ({
  type: type.UNHOVER_CELL,
  payload: null
})

export const updateBoard = (data) => ({
  type: type.UPDATE_BOARD,
  payload: data
})

export const removeShipFromArray = (ship) => ({
  type: type.REMOVE_SHIP_FROM_ARRAY,
  payload: ship
})

// export const createBoard = (data) => ({
//   type: type.CREATE_BOARD,
//   data
// })
