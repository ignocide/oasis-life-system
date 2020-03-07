import { Controller, Post, Param } from '@nestjs/common';
import { MusicService } from './music.service';

const timeout = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      return res();
    }, 10000);
  });
};

@Controller('musics')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}
  @Post('/youtube/:url')
  async addFromYoutube(@Param('url') url) {
    await timeout();
    this.musicService.add(url);
    return 'OK';
  }

  @Post('/play')
  play() {
    this.musicService.play();
    return 'OK';
  }

  @Post('/stop')
  stop() {
    this.musicService.stop();
  }
}
