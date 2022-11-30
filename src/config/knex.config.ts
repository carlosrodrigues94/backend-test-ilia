import { registerAs } from '@nestjs/config';
import { Knex } from 'knex';

export const knexConfig = registerAs('knex', () => {
  return <Knex.Config>{
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
    },
  };
});
