import { Injectable } from '@nestjs/common';
import ytdl from 'ytdl-core';
import * as fs from 'fs';
import * as path from 'path';
import readline from 'readline';
import Audio from '../lib/audio';

@Injectable()
export class MusicsService {
  private audioFolder: string = path.join(process.env.PWD, 'musics');
  private playlist: string[] = [];
  private initialPlaylist: string[] = [];
  private isPlaying: boolean = false;
  private audio?: Audio = null;
  constructor() {
    var files: string[] = fs.readdirSync(this.audioFolder);
    //@todo mp3파일만 호출
    this.initialPlaylist = this.shuffle(files);
    this.playlist = [ ...this.initialPlaylist ];
  }

  async downloadFromYoutube(link: string, onFinish: (audioFileName: string) => void = () => {}) {
    let audioOptions = { filter: (format) => format.container === 'mp4', quality: 'highest' };
    let info = await ytdl.getInfo(link, audioOptions);
    let title = info.title;
    title = title.replace(/\s/gi, '_');
    let audioFileName = [ title, 'mp3' ].join('.');
    let audioOutput = path.join(this.audioFolder, audioFileName);
    ytdl(link).pipe(fs.createWriteStream(audioOutput)).on('finish', () => {
      onFinish(audioFileName);
    });
    return info;
  }

  async add(url: string) {
    await this.downloadFromYoutube(url, (audioFileName) => {
      this.playlist.unshift(audioFileName);
    });
  }

  shuffle(arr: any[]) {
    var j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
    }
    return arr;
  }

  play() {
    if (!this.playlist.length) {
      if (!this.initialPlaylist.length) {
        this.stop();
        return;
      }
      this.playlist = [ ...this.initialPlaylist ];
    }
    let audioFile = this.playlist.shift();
    this.isPlaying = true;
    this.audio = new Audio(path.join(this.audioFolder, audioFile), {
      onFinish: () => {
        if (this.isPlaying) {
          this.play();
        }
      },
    });
    this.audio.play();
  }

  stop() {
    this.isPlaying = false;
    if (this.audio) {
      this.audio.stop();
      this.audio = null;
    }
  }
}
