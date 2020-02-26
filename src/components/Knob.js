import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Dial = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 38px;
  background: #666666;
  box-shadow: 5px 5px 10px #575757, -5px -5px 10px #757575;
`

const Label = styled.span`
  color: #ddd;
  text-shadow: rgba(255, 255, 255, .8) 0 0 2px;
  font-size: .75em;
  margin-top: .75em;
  letter-spacing: .05em;
  text-transform: uppercase;
`

const Notch = styled.div`
  height: 15px;
  width: 4px;
  background-color: #666;
  border-radius: 1px;
  box-shadow: inset 1px 1px 2px #575757, inset -1px -1px 2px #757575;
  position: absolute;
  left: 47%;
`

function Knob({label, minValue, maxValue}) {
  return (
    <Container>
      <Dial>
        <Notch />
      </Dial>
      <Label>
        {label}
      </Label>
    </Container>
  )
}

Knob.propTypes = {
  label: PropTypes.string,
  minValue: PropTypes.number,
  maxValue: PropTypes.number
}

export default React.memo(Knob);