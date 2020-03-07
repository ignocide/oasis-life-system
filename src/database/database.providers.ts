import { createConnection } from 'typeorm';
// console.log(__dirname + '/../**/*.entity{.ts,.js}');
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'ignocide',
        password: 'tjdals!2',
        database: 'home',
        entities: [ __dirname + '/../**/*.entity{.ts,.js}' ],
        synchronize: true,
      }),
  },
];
