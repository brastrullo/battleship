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
    };
  }

  handleClick = (e) => console.log(e.target.getAttribute('value'))

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
              const val = `${letter}${row}`;
              return <td id={val} key={val} value={val} onClick={(e) => this.handleClick(e)}></td>
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