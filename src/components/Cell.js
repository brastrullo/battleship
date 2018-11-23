import React from 'react';

export default (props) => {
  const { value, placingShip } = props
  return (
    <td
      className={placingShip ? 'placeShip' : ''}
      value={value}
      id={value}
      onClick={(e) => props.handleClick(e)}
      onMouseEnter={(e) => props.handleHover(e)}
    ></td>
  )
}