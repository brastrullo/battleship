import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoardContainer from './containers/BoardContainer';
import PlaceShipsSelectContainer from './containers/PlaceShipsSelectContainer';
import './App.css';
import BoardSizeSelectContainer from './containers/BoardSizeSelectContainer';

class App extends Component {
  // initializeGame() {
  //   this.setState({ startGame: true, action: 'selectShip' })
  // }

  // componentWillMount() {
  //   const getData = () => {
  //     const arr = Object.keys(this.state.ships)
  //     this.setState({
  //       placeShipsArray : arr
  //     })
  //   }
    
  //   getData()
  // }

  // // updates shipSelected obj in state  
  // selectShip(e) {
  //   const ship = e.target.value
  //   const shipObj = ship ? this.state.ships[ship] : {}
  //   this.setState({
  //     shipSelected: {
  //       name: e.target.value,
  //       size: shipObj.size,
  //       orientation: this.state.shipHorizontal
  //     }, action: 'placeShip'
  //   }, () => console.log('state:', this.state.shipSelected))
  // }

  // rotateShip() {
  //   const orientation = this.state.shipHorizontal === 'H' ? 'V' : 'H'
  //   const shipSelected = Object.assign({}, this.state.shipSelected)
  //   shipSelected.orientation = orientation

  //   this.setState({
  //     shipHorizontal: orientation,
  //     shipSelected: shipSelected,
  //   }, () => console.log('Turned ship.'))
  // }

  // placeShip(shipObj) {
  //   const ships = Object.assign({}, this.state.ships)
  //   ships[this.state.shipSelected.name] = shipObj
  //   const placement = ships[this.state.shipSelected.name].placement
  //   this.setState({ ships }, () => this.updateBoardData())
  // }

  // // creates an object map of the board 
  // generateBoardData = () => {
  //   const rows = 10
  //   const columns = 10
  //   const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  //   const alphabetArray = alphabet.slice(0, rows)
  //   const columnsArray = [...Array(columns).keys()].map(el => 0)
  //   return alphabetArray.reduce((obj, item) => {
  //       obj[item] = columnsArray
  //       return obj
  //     }, {})
  // }

  render() {
    // const startGame = this.state.startGame
    // const placeShipsSelect = this.state.placeShipsArray.map(ship =>
    //   <option key={ship} value={ship}>{ship}</option>)
  
    return (
      <div className="App">
        {/* { startGame ?
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
        } */}
          {
            this.props.startGame ? 
              <div>
                <PlaceShipsSelectContainer />
                <BoardContainer />
              </div>
            : 
            <div>
              <div>Battleship</div>
              <BoardSizeSelectContainer />
            </div>
          }
      </div>  
    );
  }
}

const mapStateToProps = state => ({
  startGame: state.initializeGame
})

export default connect(mapStateToProps)(App);