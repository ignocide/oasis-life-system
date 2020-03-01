import Player from 'ffplay';
import * as path from 'path';

const defaultOpts = {
  onFinish: function() {},
};

interface AudioOptions {
  onFinish: () => void;
}

class Audio {
  _path: string;
  _audio: Player;
  _opts: AudioOptions;
  _isPlaying: boolean;
  _continueTimer: NodeJS.Timeout;
  constructor(audioPath, opts = { ...defaultOpts }) {
    this._path = path.join(process.env.PWD, audioPath);
    this._opts = Object.assign({}, defaultOpts, opts);
    this._isPlaying = false;
  }

  //play once
  play = () => {
    this._isPlaying = true;
    this._audio = new Player(this._path);
    this._audio.proc.on('exit', () => {
      this._isPlaying = false;
      this._opts.onFinish();
    });
  };

  //default duration 1hour
  playContinue = (duration = 3600000) => {
    this._isPlaying = true;
    this._audio = new Player(this._path);
    this._audio.proc.on('exit', this.keepPlay);
    this._continueTimer = setTimeout(() => {
      this.stop();
    }, duration);
  };

  keepPlay = (code, err) => {
    if (this._isPlaying) {
      this._audio = new Player(this._path);
      this._audio.proc.on('exit', this.keepPlay);
    }
  };

  pause = () => {
    this._audio.pause();
    //todo play countinue timer;
  };
  resume = () => {
    this._audio.resume();
    //todo play countinue timer;
  };
  stop = () => {
    this._isPlaying = false;
    if (this._audio) {
      this._audio.stop();
      this._audio = null;
    }
    if (this._continueTimer) {
      clearTimeout(this._continueTimer);
    }
    this._opts.onFinish();
  };
}

export default Audio;
