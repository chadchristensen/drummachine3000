import React from 'react';
import PropTypes from 'prop-types';

function LedDisplay({ sound }) {
  return (
    <div className="led-display">
      {sound}
    </div>
  )
}

LedDisplay.propTypes = {
  sound: PropTypes.string
}

export default React.memo(LedDisplay);