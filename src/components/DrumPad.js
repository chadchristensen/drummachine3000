import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Pad = styled.button`
  background: ${props => props.isActive ? 'linear-gradient(145deg, #6d6d6d, #5c5c5c)' : '#666666'};
  /* background: #666666; */
  height: 75px;
  width: 75px;
  border-radius: 6px;
  margin: 10px;
  outline: none;
  border: ${props => props.isActive ? '2px outset rgba(149, 131, 165, 0.45)' : 'transparent'};
  box-shadow:  8px 8px 15px #575757, -8px -8px 15px #757575;
  transition: backround-image 1s linear;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background: linear-gradient(145deg, #6d6d6d, #5c5c5c);
  }
`

function DrumPad({isActive, sound, handlePadPress, item}) {
  return (
    <Pad
        // onFocus={() => console.log('onfocus triggerd')}
        isActive={isActive}
        onMouseDown={() => handlePadPress(sound, item)}
        onMouseUp={() => handlePadPress("", item)}
    />
  )
}

DrumPad.propTypes = {
  sound: PropTypes.string.isRequired,
  item: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  handlePadPress: PropTypes.func.isRequired
}

export default React.memo(DrumPad)