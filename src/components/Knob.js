import React, { useState } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`

const Dial = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #666666;
  box-shadow: -5px -5px 10px #575757, 5px 5px 10px #757575;
  transform: rotate(180deg);
`

const InnerDial = styled.div`
    border-radius: 25px;
    width: 50px;
    height: 50px;
`

const Label = styled.span`
  font-family: 'Raleway Dots';
  text-shadow: rgba(255, 255, 255, .8) 0 0 2px;
  font-size: .75em;
  margin-top: .75em;
  text-transform: uppercase;
`

const Notch = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 15px;
  width: 4px;
  background-color: #666;
  border-radius: 1px;
  box-shadow: inset 1px 1px 2px #575757, inset -1px -1px 2px #757575;
`

function Knob({label, degrees, min, max, value, onChange}) {
  const convertRange = (oldMin, oldMax, newMin, newMax, oldValue) => {
    return (oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
  };

  const startAngle = (360 - degrees) / 2;
  const endAngle = startAngle + degrees;
  let currentDegree = Math.floor(
    convertRange(
      min,
      max,
      startAngle,
      endAngle,
      value
    )
  );

  const [deg, setDeg] = useState(currentDegree);

  const startDrag = e => {
    e.preventDefault();
    const knob = e.target.getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2
    };
    const moveHandler = e => {
      currentDegree = getDeg(e.clientX, e.clientY, pts);
      if (currentDegree === startAngle) currentDegree--;
      let newValue = Math.floor(
        convertRange(
          startAngle,
          endAngle,
          min,
          max,
          currentDegree
        )
      );
      setDeg(currentDegree);
      onChange(newValue);
    };
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", e => {
      document.removeEventListener("mousemove", moveHandler);
    });
  };

  const getDeg = (cX, cY, pts) => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let deg = Math.atan(y / x) * 180 / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90;
    } else {
      deg += 270;
    }
    let finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
    return finalDeg;
  };

  return (
    <Container>
      <Dial>
        <InnerDial style={{ transform: `rotate(${deg}deg)` }} onMouseDown={startDrag}>
          <Notch />
        </InnerDial>
      </Dial>
      <Label>
        {label}
      </Label>
    </Container>
  )
}

Knob.defaultProps = {
  min: 1,
  max: 100,
  numTicks: 0,
  degrees: 270,
  value: 50
};

Knob.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  degrees: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func
}

export default React.memo(Knob);