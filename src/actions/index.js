import * as type from './constants'

export const selectShip = (selected) => ({
  type: type.SELECT_SHIP,
  payload: selected
})

export const updateShipObj = (ship, obj) => ({
  type: type.UPDATE_SHIP_OBJECT,
  payload: {
    ship,
    obj
  }
})

export const toggleOrientation = (ship) => ({
  type: type.TOGGLE_ORIENTATION,
  payload: { ship }
})

export const placeShip = (ship, placement) => ({
  type: type.PLACE_SHIP,
  payload: {
    ship,
    placement
  }
})

export const getShipSize = (ship, size) => ({
  type: type.GET_SHIP_SIZE,
  payload: {
    ship,
    size
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

export const getBoardData = (payload) => ({
  type: type.GET_BOARD_DATA,
  payload
})

export const setLetterHeadings = (rows) => ({
  type: type.SET_LETTER_HEADINGS,
  payload: rows
})

export const setNumberHeadings = (columns) => ({
  type: type.SET_NUMBER_HEADINGS,
  payload: columns
})

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

export const createBoard = (data) => ({
  type: type.CREATE_BOARD,
  data
})

export const updateBoard = (data) => ({
  type: type.UPDATE_BOARD,
  payload: data
})

export const setAction = (data) => ({
  type: type.SET_ACTION,
  data
})

export const updateSelectShipArray = (ship) => ({
  type: type.UPDATE_SELECT_SHIP_ARRAY,
  payload: ship
})
