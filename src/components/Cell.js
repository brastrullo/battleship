import React from 'react';
import PropTypes from 'prop-types';

const Cell = (props) => {
  const {
    cell,
    className,
    cellSymbol,
    onClick,
    onHover,
    onLeave
  } = props

  const handleClick = (e) => onClick(e.target.id)
  const handleHover = (e) => onHover(e.target.id)

  return (
    <td
      className={className}
      id={cell}
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={onLeave}
    >
      { cellSymbol }
    </td>
  )
}

Cell.propTypes = {
  cell: PropTypes.string,
  className: PropTypes.string,
  cellMarker: PropTypes.string,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  onLeave: PropTypes.func
}

export default Cell