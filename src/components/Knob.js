import React from 'react'
import PropTypes from 'prop-types';

export default function Knob({label, minValue, maxValue}) {
  return (
    <div
      style={{display: "flex", flexDirection: "column", alignItems: "center"}}
    >
      <div style={{
        position: "relative",
        width: "50px",
        height: "50px",
        borderRadius: "38px",
        background: "#666666",
        boxShadow:  "5px 5px 10px #575757, -5px -5px 10px #757575"
      }}>
        <div
          style={{
            height: "15px",
            width: "4px",
            backgroundColor: "#666",
            borderRadius: "1px",
            boxShadow: "inset 1px 1px 2px #575757, inset -1px -1px 2px #757575",
            position: "absolute",
            left: "47%",
          }}
        ></div>
      </div>
      <span
        style={{
          color: "#ddd",
          textShadow: "rgba(255, 255, 255, .8) 0 0 2px",
          fontSize: ".75em",
          marginTop: ".75em",
          letterSpacing: ".05em",
        }}
      >
        {label.toUpperCase()}
      </span>
    </div>
  )
}

Knob.propTypes = {
  label: PropTypes.string,
  minValue: PropTypes.number,
  maxValue: PropTypes.number
}