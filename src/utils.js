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
  if (shipData == false || cell === null) return []
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
  if (horizontal) return horizontalArr
  if (vertical) return verticalArr
}

// inputs an array of cell id's(i.e. [D1,D2,D3]) to return
// an object with each cell id's value (i.e. {D1: 0, D2: 0, D3: 0})
export const cellTaken = (boardData, placeShipArray) => {
  const cellData = placeShipArray.reduce((obj, item) => {
    const letter = item.split('')[0]
    const number = item.split('')[1] - 1
    const value = boardData[letter][number]
    obj[item] = value
    return obj
  }, {})
  return Object.values(cellData).includes(1)
}

export const getCellArrayData = (boardData, placeShipArray) => {
  return placeShipArray.reduce((obj, item) => {
    const letter = item.split('')[0]
    const number = item.split('')[1] - 1
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
  const rowInt = randomIntFromInterval(0, rows)
  const colInt = alphabetArray[randomIntFromInterval(0, cols - 1)]
  const cell = `${colInt}${rowInt}`

  if (cell.length > 3) throw new Error(`${cell} is not a cell`)
  return cell
}

export const randomPlacement = (size, board) => {
  const randBinary = randomIntFromInterval(0,1)
  const shipData = {
    orientation: randBinary ? 'H' : 'V',
    size: size
  }
  const cell = randomCell(board)
  const placement = calcHoveringCells(cell, shipData, board)
  return placement
}