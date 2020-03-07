import { Connection } from 'typeorm';
import { Music } from './music.entity';

export const repositoryProviders = [
  {
    provide: 'MUSIC_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Music),
    inject: [ 'DATABASE_CONNECTION' ],
  },
];
