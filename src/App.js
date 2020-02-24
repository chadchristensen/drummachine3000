import React, { Component } from "react";
import DrumBank from "./components/DrumBank.js";
import LedDisplay from "./LedDisplay.js";
import Sound from "./Sound.js";
import Buffer from "./Buffer.js";
import Knob from './components/Knob.js';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sounds: [
        "kick01", "kick02", "snare01", "snare02",
        "clap01", "closedhh01", "closedhh02", "openhh01",
        "sfx01", "sfx02", "sfx03", "sfx04",
        "vocal01", "vocal02", "vocal03", "vocal04"
      ],
      activeSound: "Hit a pad",
      context: new (window.AudioContext || window.webkitAudioContext)(),
      volume: 50
    };
  }

  componentDidMount() {
    window.addEventListener("keydown", e => {
      this.handleKeyPress(e);
    });

    // load all of our sounds
    this.buffer = new Buffer(this.state.context, this.state.sounds);
    this.buffer.loadAll();
  }

  handleKeyPress(e) {
    e.preventDefault();
    switch (e.which) {
      case 90:
        this.handlePadPress("kick01", 0);
        break;
      case 88:
        this.handlePadPress("kick02", 1);
        break;
      case 67:
        this.handlePadPress("snare01", 2);
        break;
      case 86:
        this.handlePadPress("snare02", 3);
        break;
      case 65:
        this.handlePadPress("clap01", 4);
        break;
      case 83:
        this.handlePadPress("closedhh01", 5);
        break;
      case 68:
        this.handlePadPress("closedhh02", 6);
        break;
      case 70:
        this.handlePadPress("openhh01", 7);
        break;
      case 81:
        this.handlePadPress("sfx01", 8);
        break;
      case 87:
        this.handlePadPress("sfx02", 9);
        break;
      case 69:
        this.handlePadPress("sfx03", 10);
        break;
      case 82:
        this.handlePadPress("sfx04", 11);
        break;
      case 49:
        this.handlePadPress("vocal01", 12);
        break;
      case 50:
        this.handlePadPress("vocal02", 13);
        break;
      case 51:
        this.handlePadPress("vocal03", 14);
        break;
      case 52:
        this.handlePadPress("vocal04", 15);
        break;
      default:
        break;
    }
  }

  handlePadPress = (sound, i) => {
    var soundFile = new Sound(
      this.state.context,
      this.buffer.getSoundByIndex(i)
    );

    soundFile.play(this.state.volume);

    // display the active sound in the LED Display
    this.setState({
      activeSound: sound
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Drum Maschine 3000</h1>
        </header>
        <div className="container">
          <LedDisplay sound={this.state.activeSound} />
          <div style={{ display: "flex" }}>
            <DrumBank sounds={this.state.sounds} handlePadPress={this.handlePadPress} />
            <div className="controls">
              <Knob label="volume" minValue="0" maxValue="100" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
