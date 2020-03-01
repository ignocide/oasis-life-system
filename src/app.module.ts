import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmsService } from './alarms/alarms.service';
import { AlarmsController } from './alarms/alarms.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ ScheduleModule.forRoot() ],
  controllers: [ AppController, AlarmsController ],
  providers: [ AppService, AlarmsService ],
})
export class AppModule {}
