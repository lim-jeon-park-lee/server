import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseSetting: any = {
  type: 'mariadb',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_TABLE,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/**/entities/*{.ts,.js}'],
  migrations: [__dirname + '/migration/**/*{.ts,.js}'],
  subscribers: [],
};

export const AppDataSource = new DataSource(databaseSetting);
