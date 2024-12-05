/* eslint-disable */
import { DataSource } from 'typeorm';
import {CreateUserAndBlogTablesMigration1733390807406} from './src/migrations/1733390807406-CreateUserAndBlogTablesMigration';
import { User } from './src/core/domain/entities/user.entity';
import { Blog } from './src/core/domain/entities/blog.entity';
import dotenv from 'dotenv'

dotenv.config()

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrationsRun: false,
  synchronize: false,
  entities: [User, Blog],
  migrations: [CreateUserAndBlogTablesMigration1733390807406],
});

export default AppDataSource;