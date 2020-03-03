import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmsService } from './alarms/alarms.service';
import { AlarmsController } from './alarms/alarms.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { MusicsService } from './musics/musics.service';
import { MusicsController } from './musics/musics.controller';
import { MusicsGateway } from './musics.gateway';

@Module({
  imports: [ ScheduleModule.forRoot() ],
  controllers: [ AppController, AlarmsController, MusicsController ],
  providers: [ AppService, AlarmsService, MusicsService, MusicsGateway ],
})
export class AppModule {}
