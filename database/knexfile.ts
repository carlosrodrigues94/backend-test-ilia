import * as path from 'path';

import { Knex } from 'knex';

import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const config: Knex.Config = {
  client: 'pg',
  migrations: {
    directory: path.resolve(__dirname, './migrations'),
  },
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
  },
};

export default config;
