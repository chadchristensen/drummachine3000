import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DisplayContainer = styled.div`
  width: 60%;
  border-radius: 2px;
  margin: 0 auto 20px auto;
  padding: 25px 25px;
  border-radius: 6px;
  background: #666666;
  box-shadow: inset 8px 8px 15px #575757, inset -8px -8px 15px #757575;
  text-transform: uppercase;
  font-family: 'Raleway Dots';
  text-shadow: rgba(255, 255, 255, .8) 0 0 2px;
`

function LedDisplay({ sound }) {
  return (
    <DisplayContainer>
      {sound}
    </DisplayContainer>
  )
}

LedDisplay.propTypes = {
  sound: PropTypes.string
}

export default React.memo(LedDisplay);