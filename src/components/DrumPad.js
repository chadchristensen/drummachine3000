import React from 'react';
import PropTypes from 'prop-types';

export default function DrumPad(props) {
  return (
    <button
        style={{
          borderRadius: "6",
          background: "#666666",
          boxShadow:  "8px 8px 15px #575757, -8px -8px 15px #757575"
        }}
        className="drumpad"
        onClick={props.onClick}
    />
  )
}

DrumPad.propTypes = {
  onClick: PropTypes.func.isRequired
}