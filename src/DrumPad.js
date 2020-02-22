import React from 'react'

export default (props) => {
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

