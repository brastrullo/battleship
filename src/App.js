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
      shipSelected: { 
        name: undefined
      },
      placeShipsArray : [],
      shipHorizontal: 'V',
      action: undefined,
      ships: {
        carrier: { size: 5 },
        battleship: { size: 4 },
        cruiser: { size: 3 },
        submarine:{ size: 3 },
        destroyer: { size: 2 },
      }
    }
  }
  initializeGame() {
    this.setState({ startGame: true, action: 'selectShip' })
  }

  componentWillMount() {
    
    const getData = () => {
      const arr = Object.keys(this.state.ships)
      this.setState({ placeShipsArray : arr })
    }
    
    getData()
    this.setState({ boardData: this.generateBoardData() }, () => console.log(this.state.boardData))
  }


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
    this.setState({ ships }, () => console.log(this.state.ships, this.state.shipSelected.name))
  }
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

  updateBoardData = (data) => {
    const board = {}
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
              action={this.state.action}
              shipSelected={this.state.shipSelected}
              placeShip={(obj) => this.placeShip(obj)}
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