import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DrumPad from './DrumPad';

const PadsContainer = styled.div`
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  flex-flow: wrap-reverse;
  align-content: center;
`

function DrumBank({ sounds, activeSound, handlePadPress }) {
  const renderDrumPads = () => {
    return sounds.map((sound, i) => {
      return (
        <DrumPad
          isActive={sound === activeSound}
          sound={sound}
          key={sound}
          item={i}
          handlePadPress={handlePadPress}
        />
      );
    });
  }

  return (
    <PadsContainer>
      {renderDrumPads()}
    </PadsContainer>
  )
}

DrumBank.propTypes = {
  sounds: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeSound: PropTypes.string,
  handlePadPress: PropTypes.func.isRequired
}

export default DrumBank

