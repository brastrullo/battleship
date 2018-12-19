export const shipSize = {
  battleship: 4,
  carrier: 5,
  cruiser: 3,
  destroyer: 2,
  submarine: 3
}

export const allShipsArray = [
  'battleship',
  'carrier',
  'cruiser',
  'destroyer',
  'submarine'
]

export const cellData = {
  0: '.', // default no hit or ship
  1: '#', // cell taken has ship 
  2: '%', //  ship hit
  3: 'X' // board miss
}