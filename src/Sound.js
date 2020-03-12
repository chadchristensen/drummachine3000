export default class Sound {

    constructor(context, buffer) {
      this.context = context;
      this.buffer = buffer;
    }
  
    setup() {
        this.gainNode = this.context.createGain();
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
    }
  
    play(volume, pitch) {
      this.setup();
      let gain = volume / 100;
      this.source.playbackRate.value = pitch / 50;
      this.gainNode.gain.setValueAtTime(gain, 0);
      this.source.start(this.context.currentTime);
    }  
  }
