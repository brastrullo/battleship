import React from 'react';
import CellContainer from '../containers/CellContainer';
import { alphabet, setCellData } from '../utils';

const Board = (props) => {
  const {
    action,
    hovered,
    boardData,
    selectedShip,
    placeShipArray,
    placeSelectedShip,
    selectHoveringCells,
    cols,
    rows
  } = props
  const boardRows = [...Array(rows).keys()].map(el => 0)
  const alphabetArr = alphabet.slice(0, cols)
  const header = [].concat('', alphabetArr)
  const columns = header.map(cell => <th key={cell}>{cell}</th> )

  const grid = boardRows.map((letter, i) => {
    const row = i + 1
    return (
      <tr key={row}>
        <th>{row}</th>
        {alphabetArr.map(letter => {
            const cell = `${letter}${row}`
            const cellState = boardData[letter][row - 1]
            const placingShip = placeShipArray ? placeShipArray.includes(cell) : false
            const className =  placingShip ? `${selectedShip}` : ''

            return (
              <CellContainer
                selectHoveringCells={selectHoveringCells}
                className={className}
                placeSelectedShip={placeSelectedShip}
                key={cell}
                cell={cell}
                cellState={cellState}
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