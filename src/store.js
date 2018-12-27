import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer  from './reducers/RootReducer';

const initialState = {
  boardData: {
    'A': [0,1,0,0,0,0,0,0,0,0],
    'B': [1,0,0,0,0,0,0,0,0,0],
    'C': [0,0,0,0,0,0,0,0,0,0],
    'D': [0,0,0,0,0,0,0,0,0,0],
    'E': [0,0,0,0,0,0,0,0,0,0],
    'F': [0,0,0,0,0,0,0,0,0,0],
    'G': [0,0,0,0,0,0,0,0,0,0],
    'H': [0,0,0,0,0,0,0,0,0,0],
    'I': [0,0,0,0,0,0,0,0,0,0],
    'J': [0,0,0,0,0,0,0,0,0,0]
  },
  enemyBoard: {
    'A': [0,0,0,0,0,0,0,0,0,0],
    'B': [0,0,0,0,0,0,0,0,0,0],
    'C': [0,0,0,0,0,0,0,0,0,0],
    'D': [0,0,0,0,0,0,0,0,0,0],
    'E': [0,0,0,0,0,0,0,0,0,0],
    'F': [0,0,0,0,0,0,0,0,0,0],
    'G': [0,0,0,0,0,0,0,0,0,0],
    'H': [0,0,0,0,0,0,0,0,0,0],
    'I': [0,0,0,0,0,0,0,0,0,0],
    'J': [0,0,0,0,0,0,0,0,0,0]
  },
  boardCols: 10,
  boardRows: 10,
  shipSelected: null,
  shipsArray: [
    'battleship',
    'carrier',
    'cruiser',
    'destroyer',
    'submarine'
  ],
  randomize: false,
  shipCellData: {
    battleship: {},
    carrier: {},
    cruiser: {},
    destroyer: {},
    submarine: {}
  },
  cellHovered: null,
  cellArray : [],
  orientation: 'H',
  gameInitialized: false
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

