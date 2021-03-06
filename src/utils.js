export const cleanBoard = (rows, cols) => Array.from(Array(cols).keys()).map(c => Array.from(Array(rows).keys()).map(r => 0))
// export const cleanBoard = (rows, cols) =>
//   alphabet.slice(0, cols).reduce((obj, letter) => {
//     obj[letter] = Array.from(Array(rows).keys()).map(r => 0)
//     return obj
//   }, [])

export const l2n = (l) => l.toLowerCase().charCodeAt(0) - 97
// creates an object that has the cells as the keys and the values as cellData
// 0: default, 1: ship, 2: hit, 3: miss
export const setCellData = (arr, data) =>
  arr.reduce((obj, item) => {
    obj[item] = data
    return obj
  }, {})

export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export const calcHoveringCells = (cell, shipData, board) => {
  // OBJ STRUCTURE: shipData = { orientation, size }
  if (shipData == false || cell === null) {
    console.log('calcHoveringCells()', shipData, cell)
    return []
  }
  const orientation = shipData.orientation
  const size = shipData.size
  const horizontal = orientation === 'H'
  const vertical = orientation === 'V'
  const cellValue = cell.split('')
  const rows = board.rows
  const cols = board.cols
  const alphabetArr = alphabet.slice(0, rows)
  const start = alphabetArr.indexOf(cellValue[0])
  const end = start + size

  const horizontalLetters =
    alphabetArr.length < end
    ? alphabetArr.slice(alphabetArr.length - size)
    : alphabetArr.slice(start, end)
  const horizontalArr = horizontalLetters.map(letter => `${letter}${cell.substr(1)}`)
  const verticalArr = horizontalLetters.map((e, i) => {
    const number = 
      (cell.substr(1) > cols - size + 1)
      ? (cols - size) + i + 1
      : Number(cell.substr(1)) + i
    return `${cell.charAt(0)}${number}`
  })
  if (horizontal) {
    console.log('horizontal', horizontalArr)
    return horizontalArr
  }
  if (vertical) {
    console.log('vertical', verticalArr)
    return verticalArr
  }
}

// inputs an array of cell id's(i.e. [D1,D2,D3]) to return
// an object with each cell id's value (i.e. {D1: 0, D2: 0, D3: 0})
export const cellTaken = (boardData, placeShipArray) => {
  if (placeShipArray.length === 0) return
  const cellData = placeShipArray.reduce((obj, item) => {
    const letter = item.split('')[0]
    const number = item.split('')[1] - 1
    const value = boardData[letter.charCodeAt(0) - 65][number]
    obj[item] = value
    return obj
  }, {})
  return Object.values(cellData).includes(1)
}

export const getCellArrayData = (boardData, placeShipArray) => {
  console.log('getcellArrayData', placeShipArray)
  return placeShipArray.reduce((obj, item) => {
    const letter = item.split('')[0]
    const number = item.subtr(1) - 1
    const value = boardData[letter][number]
    obj[item] = value
    return obj
  }, {})
}

  // creates an object map of the board data
export const generateBoardData = (rows = 10, columns = 10) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const alphabetArray = alphabet.slice(0, rows)
  const columnsArray = [...Array(columns).keys()].map(el => 0)
  return alphabetArray.reduce((obj, item) => {
      obj[item] = columnsArray
      return obj
    }, {})
}

export const randomIntFromInterval = (min, max) => Math.floor(Math.random()*(max-min+1)+min)

export const randomCell = (board = {}) => {
  const rows = board.rows ? board.rows : 10
  const cols = board.cols ? board.cols : 10
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const alphabetArray = alphabet.slice(0, cols)
  const rowInt = randomIntFromInterval(1, rows)
  const colInt = alphabetArray[randomIntFromInterval(0, cols - 1)]
  const cell = `${colInt}${rowInt}`

  if (cell.length > 3 || rowInt <= 0 || rowInt > rows) throw new Error(`${cell} is not a cell`)
  return cell
}

export const randomPlacement = (size, board, boardData) => {
  let orientation, shipData, cell, placement
  do {
    orientation = randomIntFromInterval(0,1) ? 'H' : 'V'
    shipData = { orientation, size }
    cell = randomCell(board)
    placement = calcHoveringCells(cell, shipData, board)
  } while(cellTaken(boardData, placement))

  placement.forEach(cell => {
    if (cell.substr(1) <= 0 || cell.substr(1) > board.cols ) throw new Error(`${placement} is not a valid`)
  })

  return placement
}
