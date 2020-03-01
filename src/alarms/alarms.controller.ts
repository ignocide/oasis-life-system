import { Controller, Post } from '@nestjs/common';
import { AlarmsService } from './alarms.service';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}
  @Post('/stop')
  stopAlarm() {
    this.alarmsService.stop();
  }
}
