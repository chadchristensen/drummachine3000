import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 60%;
  height: 5em;
  padding: 0 1em;
  border-radius: 3px;
  margin: 0 auto 20px auto;
  background: linear-gradient(174deg, #353535, #2d2d2d);
  border: 3px solid #2d2d2d;
  text-transform: uppercase;
  font-family: 'Raleway Dots';
  text-shadow: rgba(255, 255, 255, .8) 0 0 2px;
`

const SoundRow = styled.div`
  opacity: ${props => props.sound !== "" ? 1 : 0};
  transition: opacity .4s cubic-bezier(0, 1.17, 0.58, 1);
  height: 1em;
`

const ParameterRow = styled.div`
  font-size: .7em;
  align-self: flex-start;

  span {
    display: inline-block;
    margin-right: 1em;
  }
`

function LedDisplay({ sound }) {
  return (
    <DisplayContainer>
      <SoundRow sound={sound}>{sound}</SoundRow>
      <ParameterRow>
        {/* // TODO: Change to dynamic data for parameters */}
        <span>Volume: 50%</span>
        <span>Delay: 20%</span>
      </ParameterRow>
    </DisplayContainer>
  )
}

LedDisplay.propTypes = {
  sound: PropTypes.string
}

export default React.memo(LedDisplay);