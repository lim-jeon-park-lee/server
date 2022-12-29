import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseSetting: any = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_TABLE,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [__dirname + '/migration/**/*{.ts,.js}'],
  subscribers: [],
};

export const AppDataSource = new DataSource(databaseSetting);
