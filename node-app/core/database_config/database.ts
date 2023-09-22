// data/data_sources/postgres/database.ts

import { Sequelize } from 'sequelize';
import {
    POSTGRES_USER,
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_PASSWORD,
} from './config';

if (!POSTGRES_DB || !POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_HOST) {
    throw new Error('Database configuration is missing!');
  }
  
  export const sequelize = new Sequelize(
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    {
      host: POSTGRES_HOST,
      dialect: 'postgres',
      logging: false
    }
  );
  
