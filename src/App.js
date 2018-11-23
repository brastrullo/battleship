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

  selectShip(e) {
    const shipObj = this.state.ships[e.target.value]
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

  placeShip(ship) {
    this.setState()
  }

  shipHover = (cell, value) => {
    return cell === value
  }

  render() {
    const startGame = this.state.startGame
    return (
      <div className="App">
        { startGame ?
          <div>
            <Board 
              action={this.state.action}
              shipSelected={this.state.shipSelected}
            />
            <p>Place Ships</p>
            <select onChange={(e) => this.selectShip(e)} value={this.state.shipSelected.name}>
              <option value="">--Select Ship--</option>
              <option value="carrier">Carrier</option>
              <option value="battleship">Battleship</option>
              <option value="cruiser">Cruiser</option>
              <option value="submarine">Submarine</option>
              <option value="destroyer">Destroyer</option>
            </select>
            {this.state.shipSelected &&
              <button onClick={() => this.rotateShip()}>
                Rotate Ship: {this.state.shipHorizontal}
              </button>
            }
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