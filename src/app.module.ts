import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmsService } from './alarms/alarms.service';
import { AlarmsController } from './alarms/alarms.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { MusicService } from './music/music.service';
import { MusicController } from './music/music.controller';
import { MusicGateway } from './music.gateway';
import { DatabaseModule } from './database/database.module';
import { repositoryProviders } from './repository/repository.providers';

@Module({
  imports: [ ScheduleModule.forRoot(), DatabaseModule ],
  controllers: [ AppController, AlarmsController, MusicController ],
  providers: [ AppService, AlarmsService, MusicService, MusicGateway, ...repositoryProviders ],
})
export class AppModule {}
