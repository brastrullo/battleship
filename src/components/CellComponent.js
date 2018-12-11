import React from 'react';
import PropTypes from 'prop-types';

const Cell = (props) => {
  const {
    cell,
    className,
    cellMarker,
    clickHandler,
    hoverHandler,
    leaveHandler
  } = props

  const handleClick = (e) => clickHandler(e.target.id)
  const handleHover = (e) => hoverHandler(e.target.id)

  return (
    <td
      className={className}
      id={cell}
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={leaveHandler}
    >
      { cellMarker }
    </td>
  )
}

Cell.propTypes = {
  cell: PropTypes.string,
  className: PropTypes.string,
  cellMarker: PropTypes.string,
  clickHandler: PropTypes.func,
  hoverHandler: PropTypes.func,
  leavehandler: PropTypes.func
}

export default Cell