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

function DrumBank({ sounds, handlePadPress }) {
  const renderDrumPads = () => {
    return sounds.map((sound, i) => {
      return (
        <DrumPad
          key={sound}
          item={i}
          handlePadPress={() => handlePadPress(sound, i)}
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
  handlePadPress: PropTypes.func.isRequired
}

export default DrumBank

