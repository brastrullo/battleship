// import React from 'react';

// const Board = (props) => {
//   const {
//     placeShipOnBoard,
//     boardData,
//     shipData
//   } = props
//   const boardRows = boardData[Object.keys(boardData)[0]].map(el => 0)
//   const alphabetArr = Object.keys(boardData)
//   const header = [].concat('', alphabetArr)
//   const columns = header.map(cell => <th key={cell}>{cell}</th>)
//   const grid = boardRows.map((letter, i) => {
//     const row = i + 1
//     return (
//       <tr key={row}>
//         <th>{row}</th>
//         {alphabetArr.map(letter => {
//             const cell = `${letter}${row}`
//             const cellState = boardData[letter][row - 1]

//             return (
//               <CellContainer
//                 shipData={shipData}
//                 key={cell}
//                 cell={cell}
//                 cellState={cellState}
//                 placeShipOnBoard={placeShipOnBoard}
//               />
//             )
//           })}
//       </tr>
//     )
//   })

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             {columns}
//           </tr>
//         </thead>
//         <tbody>
//           {grid}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default Board;