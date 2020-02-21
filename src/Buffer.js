export default class Buffer {

    constructor(context, urls) {  
      this.context = context;
      this.urls = urls;
      this.buffer = [];
    }
  
    loadSound(url, index) {
      let request = new XMLHttpRequest();
      request.open('get', url, true);
      request.responseType = 'arraybuffer';
      let thisBuffer = this;
      request.onload = function() {
        thisBuffer.context.decodeAudioData(request.response, function(buffer) {
          thisBuffer.buffer[index] = buffer;    
        });
      };
      request.send();
    };
  
    loadAll() {
      this.urls.forEach((url, index) => {
        this.loadSound(`https://s3.amazonaws.com/drummachinefiles/${url}.wav`, index);
      })
    }
  
    getSoundByIndex(index) {
      return this.buffer[index];
    }
  
  }
  