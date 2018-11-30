import React from 'react';

export default (props) => {
  const { cell, placingShip, ship } = props
  const className = placingShip ? `${ship}` : ''
  return (
    <td
      className={className}
      id={cell}
      onClick={(e) => props.handleClick(e)}
      onMouseEnter={(e) => props.handleHover(e)}
    >
    </td>
  )
}