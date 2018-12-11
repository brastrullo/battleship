// creates an object that has the cells as the keys and the values as cellData
// 0: default, 1: ship, 2: hit, 3: miss
export const setCellData = (arr, data) =>
  arr.reduce((obj, item) => {
    obj[item] = data
    return obj
  }, {})

export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// inputs an array of cell id's(i.e. [D1,D2,D3]) to return
// an object with each cell id's value (i.e. {D1: 0, D2: 0, D3: 0})
export const getCellArrayData = (boardData, cellArray) => {
  return cellArray.reduce((obj, item) => {
    const letter = item.split('')[0]
    const number = item.split('')[1] - 1
    const value = boardData[letter][number]
    obj[item] = value
    return obj
  }, {})
}

export const cellData = {
  0: '.', // default no hit or ship
  1: '#', // cell taken has ship 
  2: '%', //  ship hit
  3: 'X' // board miss
}