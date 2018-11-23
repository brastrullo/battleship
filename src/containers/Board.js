import React, { Component } from 'react';
import Cell from '../components/Cell'
// import { connect } from 'react-redux';
// import { action } from '../actions/index';

export class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: 10,
      rows: 10,
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      cellHovered: undefined,
      cellClicked: undefined,
      placingShip: undefined
    };
  }

  handleClick = (e) => {
    this.setState({ cellClicked: e.target.getAttribute('value') },
      () => console.log('clicked:', this.state.cellClicked))
  }

  handleHover = (e) => {
    this.setState({ cellHovered: e.target.getAttribute('value') },
      () => this.cellHovered(this.state.cellHovered))
  }

  cellHovered(cell) {
    const ship = this.props.shipSelected
    const horizontal = this.props.shipSelected.orientation === 'H'
    const vertical = this.props.shipSelected.orientation === 'V'
    const selectHoveringCells = (cell) => {
      const cellValue = cell.split('')
      const alphabetArr = this.state.alphabet.slice(0, this.state.rows)
      const start = alphabetArr.indexOf(cellValue[0])
      const end = start + ship.size

      const horizontalLetters =
        alphabetArr.length < end
        ? alphabetArr.slice(alphabetArr.length - ship.size)
        : alphabetArr.slice(start, end)
      const horizontalArr = horizontalLetters.map(letter => `${letter}${cell.substr(1)}`)
      const verticalArr = horizontalLetters.map((e, i) => {
        const number = 
          (cell.substr(1) > this.state.columns - ship.size + 1)
          ? (this.state.columns - ship.size) + i + 1
          : Number(cell.substr(1)) + i
        return `${cell.charAt(0)}${number}`
      })
      if (horizontal) return horizontalArr
      if (vertical) return verticalArr
    }
    switch(this.props.action) {
      case 'selectShip':
        console.log('Please select ship.')
        break;
      case 'placeShip':
        console.log('Ship selected. Place ship.')
        this.setState({ placingShip: selectHoveringCells(cell)})
        break;
      default:
      return;
    }
  }

  generateBoard = (col, row) => {
    const alphabetArr = this.state.alphabet.slice(0, col)
    const header = [].concat('', alphabetArr)

    const columns = header.map(cell => <th key={cell}>{cell}</th> );

    const grid = alphabetArr.map((letter, i) => {
      const row = i + 1
      return (
        <tr key={row}>
          <th>{row}</th>
          {alphabetArr.map(letter => {
              const value = `${letter}${row}`;
              const placingShip = this.state.placingShip ? this.state.placingShip.includes(value) : false
              return (
                <Cell
                  hovered={this.state.cellHovered}
                  placingShip={placingShip}
                  key={value}
                  value={value}
                  handleClick={(e) => this.handleClick(e)}
                  handleHover={(e) => this.handleHover(e)}
                />
              )
            })}
        </tr>
      )
    })

    return (
      <table>
        <thead>
          <tr>
            {columns}
          </tr>
        </thead>
        <tbody>
          {grid}
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <div>
        {this.generateBoard(this.state.columns, this.state.rows)}
      </div>
    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ action }, dispatch);
// }

// export default connect(null, mapDispatchToProps)(Board);
export default Board