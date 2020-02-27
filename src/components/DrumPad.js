import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Pad = styled.button`
  background-color: #666666;
  height: 75px;
  width: 75px;
  border-radius: 6px;
  margin: 10px;
  outline: none;
  border-color: transparent;
  box-shadow:  8px 8px 15px #575757, -8px -8px 15px #757575;
  transition: backround-image 1s linear;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background: linear-gradient(145deg, #6d6d6d, #5c5c5c);
  }
`

function DrumPad(props) {
  return (
    <Pad
        onMouseDown={props.handlePadPress}
    />
  )
}

DrumPad.propTypes = {
  handlePadPress: PropTypes.func.isRequired
}

export default React.memo(DrumPad)