import { Injectable, forwardRef, Inject } from '@nestjs/common';
import Audio from '../lib/audio';
import { Cron } from '@nestjs/schedule';

const ALARM_AUDIO_FILES = [ './alarm.mp3' ];

@Injectable()
export class AlarmsService {
  private audio: Audio;
  private keep: boolean;
  private snoozeCount: number;

  constructor() {
    this.start();
  }

  @Cron('0 7 * * *')
  morningCallJob() {
    this.start();
  }

  @Cron('0 8 * * *')
  morningCallJob2() {
    this.start();
  }

  start() {
    if (this.audio) {
      return;
    }

    this.keep = true;
    this.snoozeCount = 10;
    this.play();
  }

  play(): void {
    let randomValue = Math.floor(Math.random() * ALARM_AUDIO_FILES.length);
    this.audio = new Audio(ALARM_AUDIO_FILES[randomValue], {
      onFinish: () => {
        if (this.keep && this.snoozeCount--) {
          this.snooze();
        }
      },
    });

    this.audio.playContinue(1000 * 60 * 5);
  }

  snooze(): void {
    setTimeout(() => {
      this.play();
    }, 1000 * 60 * 5);
  }

  stop(): void {
    this.keep = false;
    if (this.audio) {
      this.audio.stop();
      this.audio = null;
    } else {
      return;
    }
  }
}
