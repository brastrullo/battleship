import React from 'react';

export default (props) => {
  const { cell, placingShip, ship, cellState } = props
  const className = placingShip ? `${ship}` : ''
  const showValue = (cellState) => {
    let cell
    switch(cellState) {
      case 0:
        cell = '.'
        break;
      case 1:
        cell = '#'
        break;
      case 2:
        cell = 'X'
        break;
      default:
        break;
    }
    return cell;
  }
  return (
    <td
      className={className}
      id={cell}
      onClick={(e) => props.handleClick(e)}
      onMouseEnter={(e) => props.handleHover(e)}
    >
      { showValue(cellState) }
    </td>
  )
}