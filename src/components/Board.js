import React from 'react';
import CellContainer from '../containers/CellContainer';
import { alphabet } from '../utils';

const Board = (props) => {
  const {
    placeShipOnBoard,
    boardData,
    cols,
    rows,
    shipData
  } = props

  const boardRows = [...Array(rows).keys()].map(el => 0)
  const alphabetArr = alphabet.slice(0, cols)
  const header = [].concat('', alphabetArr)
  const columns = header.map(cell => <th key={cell}>{cell}</th>)
  const grid = boardRows.map((letter, i) => {
    const row = i + 1
    return (
      <tr key={row}>
        <th>{row}</th>
        {alphabetArr.map(letter => {
            const cell = `${letter}${row}`
            const cellState = boardData[letter][row - 1]

            return (
              <CellContainer
                shipData={shipData}
                key={cell}
                cell={cell}
                cellState={cellState}
                placeShipOnBoard={placeShipOnBoard}
              />
            )
          })}
      </tr>
    )
  })

  return (
    <div>
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
    </div>
  )
}

export default Board;