import { Controller, Post, Param } from '@nestjs/common';
import { MusicsService } from './musics.service';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}
  @Post('/youtube/:url')
  downloadFromYoutube(@Param('url') url) {
    this.musicsService.add(url);
    return 'OK';
  }

  @Post('/play')
  play() {
    this.musicsService.play();
  }

  @Post('/stop')
  stop() {
    this.musicsService.stop();
  }
}
