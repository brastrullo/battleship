import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './containers/Board';
import StartButton from './containers/StartButton'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startGame: false,
      boardData: {
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
      cellData: {
        0: '',
        1: '#',
        2: '%',
        3: 'X'
      },
      shipSelected: { 
        name: undefined
      },
      placeShipsArray : [],
      shipHorizontal: 'V',
      action: undefined,
      ships: {
        carrier: { size: 5, placement: {} },
        battleship: { size: 4, placement: {} },
        cruiser: { size: 3, placement: {} },
        submarine:{ size: 3, placement: {} },
        destroyer: { size: 2, placement: {} },
      }
    }
  }
  initializeGame() {
    this.setState({ startGame: true, action: 'selectShip' })
  }

  componentWillMount() {
    const getData = () => {
      const arr = Object.keys(this.state.ships)
      this.setState({
        placeShipsArray : arr
      }, () => console.log(this.state.ships))
    }
    
    getData()
  }

  // updates shipSelected obj in state  
  selectShip(e) {
    const ship = e.target.value
    const shipObj = ship ? this.state.ships[ship] : {}
    this.setState({
      shipSelected: {
        name: e.target.value,
        size: shipObj.size,
        orientation: this.state.shipHorizontal
      }, action: 'placeShip'
    }, () => console.log('state:', this.state.shipSelected))
  }

  rotateShip() {
    const orientation = this.state.shipHorizontal === 'H' ? 'V' : 'H'
    const shipSelected = Object.assign({}, this.state.shipSelected)
    shipSelected.orientation = orientation

    this.setState({
      shipHorizontal: orientation,
      shipSelected: shipSelected,
    }, () => console.log('Turned ship.'))
  }

  placeShip(shipObj) {
    const ships = Object.assign({}, this.state.ships)
    ships[this.state.shipSelected.name] = shipObj
    const placement = ships[this.state.shipSelected.name].placement
    this.setState({ ships }, () => this.updateBoardData())
  }

  // creates an object map of the board 
  generateBoardData = () => {
    const rows = 10
    const columns = 10
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    const alphabetArray = alphabet.slice(0, rows)
    const columnsArray = [...Array(columns).keys()].map(el => 0)
    return alphabetArray.reduce((obj, item) => {
        obj[item] = columnsArray
        return obj
      }, {})
  }

  // inputs an array of cell id's(i.e. [D1,D2,D3]) to return
  // an object with each cell id's value (i.e. {D1: 0, D2: 0, D3: 0})
  getCellArrayData = (cellArray) => {
    return cellArray.reduce((obj, item) => {
      const letter = item.split('')[0]
      const number = item.split('')[1] - 1
      const data = this.state.boardData[letter][number]
      obj[item] = data
      return obj
    }, {})
  }

  updateBoardData = () => {
    const board = Object.assign({}, this.state.boardData)
    const shipSelected = this.state.shipSelected.name
    const indexOfShip = this.state.placeShipsArray.indexOf(shipSelected)
    const placeShipsArray = this.state.placeShipsArray
    placeShipsArray.splice(indexOfShip, indexOfShip + 1 )
    const ships = this.state.ships
    Object.values(ships).forEach(ship => {
      if (Object.keys(ship.placement).length > 0) {
        Object.entries(ship.placement).forEach(cell => {
          const l = cell[0].split('')[0]
          const n = cell[0].split('')[1] - 1
          board[l][n] = cell[1]
        })
      }
    })
    this.setState({
      boardData:  board,
      placeShipsArray: placeShipsArray,
      shipSelected: { name: undefined },
      action: placeShipsArray.length > 0 ? 'placeShip' : 'startTurn' 
    }, () => console.log(board))
  }

  render() {
    const startGame = this.state.startGame
    const placeShipsSelect = this.state.placeShipsArray.map(ship =>
      <option key={ship} value={ship}>{ship}</option>)
  
    return (
      <div className="App">
        { startGame ?
          <div>
            <p>Place Ships</p>
            <select onChange={(e) => this.selectShip(e)} value={this.state.shipSelected.name}>
              <option value="">--Select Ship--</option>
              {placeShipsSelect}
            </select>
            {this.state.shipSelected &&
              <button onClick={() => this.rotateShip()}>
                Rotate Ship: {this.state.shipHorizontal}
              </button>
            }
            <Board 
              data={this.state.boardData}
              action={this.state.action}
              shipSelected={this.state.shipSelected}
              placeShip={(e) => this.placeShip(e)}
              getBoardData={(e) => this.getBoardData(e)}
              getCellArrayData={(e) => this.getCellArrayData(e)}
              updateBoardData={(arr, data) => this.updateBoardData(arr, data)}
            />
          </div>
          :
          <StartButton handleClick={() => this.initializeGame()} />
        }
      </div>  
    );
  }
}

const mapStateToProps = state => ({
  ...state
 })

export default connect(mapStateToProps)(App);