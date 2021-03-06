import React, { useState, useEffect } from "react";
import styled from 'styled-components';

import DrumBank from "./components/DrumBank.js";
import LedDisplay from "./components/LedDisplay.js";
import Sound from "./Sound.js";
import Buffer from "./Buffer.js";
import Knob from './components/Knob.js';
import "./App.css";

import keyMappings from './data/keyMappings.json';

const AppContainer = styled.div`
  text-align: center;
  padding: 1.6em;
  min-height: 100vh;
  background: #d3cce3;
  background: -webkit-linear-gradient(45deg, #e9e4f0, #d3cce3);
  background: linear-gradient(45deg, #e9e4f0, #d3cce3);

  @media(max-width: 600px) {
    padding: .25em;
  }
`

const Title = styled.h1`
  font-family: 'Oxanium', 'Arial', 'sans-serif';
  font-weight: 700;
  font-size: 3em;
  font-variant: small-caps;
  margin-top: .25em;
  margin-bottom: .4em;
  color: #332f3a;
  text-shadow: 0px 1px 2px #807598;

  @media(max-width: 600px) {
    font-size: 2em;
  }
`

const DrumMachine = styled.div`
  display: inline-block;
  width: 95%;
  max-width: 600px;
  padding: 25px;
  background-color: #666666;
  border-radius: 5px;
  color: #ddd;
  letter-spacing: .05em;
  border-top: 1px solid #565656;
  border-bottom: 4px solid #565656;
  box-shadow: 1px 3px 5px 0px #807598;

  @media(max-width: 600px) {
    padding: 15px;
  }
`

const WorkSpace = styled.div`
  display: flex;
  justify-content: space-around;
  margin: .75em;

  @media(max-width: 600px) {
    margin: 0;
  }
`

const ControlKnobs = styled.div`
  @media(max-width: 600px) {
    display: none;
  }
`

let buffer;
let context;

function App () {
  const sounds = keyMappings;

  const [activeSound, setActiveSound] = useState('Hit a pad');
  const [volume, setVolume] = useState(50);
  const [pitch, setPitch] = useState(50);
  // Setup on first render
  useEffect(() => {
    // Setup Audio context
    context = new (window.AudioContext || window.webkitAudioContext)();

    // Create buffer and load all sounds
    buffer = new Buffer(context, Object.values(keyMappings).map(keyMapping => keyMapping.sound));
    buffer.loadAll();

    function handleKeyPress(e) {
      const soundObject = keyMappings.find( keyMapping => keyMapping.keyCode === e.which);
  
      if(soundObject) {
        setActiveSound(soundObject.sound)
      }
    }

    window.addEventListener("keydown", e => {
      handleKeyPress(e);
    });
  
    window.addEventListener("keyup", (e) => {
      // TODO: Make helper function to check keyCode
      if (keyMappings.findIndex(keyMapping => keyMapping.keyCode === e.which) === -1) return;
      setActiveSound("")
    })
  }, [])
  
  // Trigger sound when activeSound changes and is not an empty string
  useEffect(() => {
    if (activeSound === "") return;

    const keyIndex = keyMappings.findIndex(keyMapping => keyMapping.sound === activeSound);
    const soundFile = new Sound(context, buffer.getSoundByIndex(keyIndex));

    soundFile.play(volume, pitch);
  }, [activeSound]);

  function handleVolumeChange(newValue) {
    setVolume(newValue);
  };

  function handlePitchChange(newPitchValue) {
    setPitch(newPitchValue);
  }

  return (
    <AppContainer>
      <header>
        <Title>Drum Maschine 3000</Title>
      </header>
      <DrumMachine>
        <LedDisplay volume={volume} pitch={pitch} sound={activeSound} />
        <WorkSpace>
          <DrumBank
            activeSound={activeSound}
            sounds={sounds}
            handlePadPress={setActiveSound}
          />
          <ControlKnobs>
            <Knob
              label="volume"
              degrees={260}
              min={1}
              max={100}
              value={volume}
              onChange={handleVolumeChange}
            />
            <Knob
              label='pitch'
              degrees={260}
              min={1}
              max={100}
              value={pitch}
              onChange={handlePitchChange}
            />
          </ControlKnobs>
        </WorkSpace>
      </DrumMachine>
    </AppContainer>
  );
}

export default App;
