import React, { Component } from "react";
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
  padding: 3em;
  min-height: 100vh;
  background: #d3cce3;
  background: -webkit-linear-gradient(45deg, #e9e4f0, #d3cce3);
  background: linear-gradient(45deg, #e9e4f0, #d3cce3);
`

const Title = styled.h1`
  font-family: 'Oxygen', 'Arial', 'sans-serif';
  font-weight: 700;
  font-size: 3em;
  font-variant: small-caps;
  color: #332f3a;
  text-shadow: 0px 1px 2px #807598;
`

const DrumMachine = styled.div`
  display: inline-block;
  width: 600px;
  padding: 25px;
  background-color: #666666;
  border-radius: 5px;
  color: #ddd;
  letter-spacing: .05em;
  border-top: 1px solid #565656;
  border-bottom: 4px solid #565656;
  box-shadow: 1px 3px 5px 0px #807598;
`

const WorkSpace = styled.div`
  display: flex;
`

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sounds: keyMappings,
      activeSound: "Hit a pad",
      context: new (window.AudioContext || window.webkitAudioContext)(),
      volume: 50
    };
  }

  componentDidMount() {
    window.addEventListener("keydown", e => {
      this.handleKeyPress(e);
    });

    window.addEventListener("keyup", (e) => {
      // TODO: Make helper function to check keyCode
      if (keyMappings.findIndex(keyMapping => keyMapping.keyCode === e.which) === -1) return;
      this.setState({activeSound: ""})
    })

    // load all of our sounds
    this.buffer = new Buffer(this.state.context, Object.values(keyMappings).map(keyMapping => keyMapping.sound));
    this.buffer.loadAll();
  }

  handleKeyPress(e) {
    const keyIndex = keyMappings.findIndex( keyMapping => keyMapping.keyCode === e.which);

    if (keyIndex === -1) return;

    this.handlePadPress(keyMappings[keyIndex].sound, keyIndex)
  }

  handlePadPress = (sound, i) => {
    if (sound === "") {
      this.setState({activeSound: ""});
      return;
    }

    const soundFile = new Sound(
      this.state.context,
      this.buffer.getSoundByIndex(i)
    );

    soundFile.play(this.state.volume);

    // display the active sound in the LED Display
    this.setState({
      activeSound: sound
    });
  }

  handleVolumeChange = newValue => {
    this.setState({
      volume: newValue
    });
  };

  render() {
    return (
      <AppContainer>
        <header>
          <Title>Drum Maschine 3000</Title>
        </header>
        <DrumMachine>
          <LedDisplay volume={this.state.volume} sound={this.state.activeSound} />
          <WorkSpace>
            <DrumBank
              activeSound={this.state.activeSound}
              sounds={this.state.sounds}
              handlePadPress={this.handlePadPress}
            />
            <div>
              <Knob
                label="volume"
                degrees={260}
                min={1}
                max={100}
                value={this.state.volume}
                onChange={this.handleVolumeChange}
              />
            </div>
          </WorkSpace>
        </DrumMachine>
      </AppContainer>
    );
  }
}

export default App;
