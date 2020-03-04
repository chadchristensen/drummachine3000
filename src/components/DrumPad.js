import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Pad = styled.button`
  background: ${props => props.isActive ? 'linear-gradient(145deg, #6d6d6d, #5c5c5c)' : '#666666'};
  height: 75px;
  width: 75px;
  border-radius: 6px;
  margin: 10px;
  outline: none;
  border: ${props => props.isActive ? '2px outset rgba(149, 131, 165, 0.45)' : 'transparent'};
  box-shadow: 8px 8px 15px #575757, -8px -8px 15px #757575;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background: linear-gradient(145deg, #6d6d6d, #5c5c5c);
  }

  kbd {
    font-family: 'Paytone One';
    font-weight: 400;
    font-size: ${props => props.isActive ? '2.4em' : '2.5em'};
    text-transform: uppercase;
    color: #d8d1e7;
    text-shadow: 0 0 1px rgb(90, 87, 111);
  }
`

function DrumPad({isActive, sound, keyboardChar, handlePadPress, item}) {
  return (
    <Pad
        isActive={isActive}
        onMouseDown={() => handlePadPress(sound)}
        onMouseUp={() => handlePadPress("")}
    >
      <kbd>{keyboardChar}</kbd>
    </Pad>
  )
}

DrumPad.propTypes = {
  sound: PropTypes.string.isRequired,
  item: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  handlePadPress: PropTypes.func.isRequired
}

export default React.memo(DrumPad)