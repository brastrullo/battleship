import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer  from './reducers/RootReducer';

const initialState = {
  board: {
    cols: 10,
    rows: 10,
    data: {
      'A': [1,1,0,0,0,0,0,0,0,0],
      'B': [1,0,0,0,0,0,0,0,0,0],
      'C': [0,0,0,0,0,0,0,0,0,0],
      'D': [0,0,0,0,0,0,0,0,0,0],
      'E': [0,0,0,0,0,0,0,0,0,0],
      'F': [0,0,0,0,0,0,0,0,0,0],
      'G': [0,0,0,0,0,0,0,0,0,0],
      'H': [0,0,0,0,0,0,0,0,0,0],
      'I': [0,0,0,0,0,0,0,0,0,0],
      'J': [0,0,0,0,0,0,0,0,0,0]
    }
  },
  shipsArray: [
    'carrier',
    'battleship',
    'cruiser',
    'submarine',
    'destroyer'
  ],
  shipsObj: {
    carrier: { size: 5, placement: {}, orientation: 'H' },
    battleship: { size: 4, placement: {}, orientation: 'H' },
    cruiser: { size: 3, placement: {}, orientation: 'H' },
    submarine:{ size: 3, placement: {}, orientation: 'H' },
    destroyer: { size: 2, placement: {}, orientation: 'H' },
  },
  selectedShip: null,
  cellSelected: null,
  cellHovered: null,
  placeShipArray : [],
  action: 'setBoardSize',
}

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    throw err
  }
}


export default function configureStore() {
  console.log('initialState:', initialState)
 return createStore(
  rootReducer,
  initialState,
   applyMiddleware(thunk, logger, crashReporter)
 );
}

