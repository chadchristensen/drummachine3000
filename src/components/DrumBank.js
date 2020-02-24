import React from 'react'
import PropTypes from 'prop-types'

import DrumPad from './DrumPad';

function DrumBank({ sounds, handlePadPress }) {
  const renderDrumPads = () => {
    return sounds.map((sound, i) => {
      return (
        <DrumPad
          key={sound}
          item={i}
          onClick={() => handlePadPress(sound, i)}
        />
      );
    });
  }

  return (
    <div className="drumbank">
      {renderDrumPads()}
    </div>
  )
}

DrumBank.propTypes = {

}

export default DrumBank

