import React from 'react';

const StartButton = (props) => {
  return <button onClick={() => props.handleClick()}>New Game</button>
}

export default StartButton;