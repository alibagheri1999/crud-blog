import { Module } from '@nestjs/common';
import { BlogController } from '../../infrastructure/transport/rest/blog.controller';
import { BlogApplication } from '../../core/application/blog.application';
import { BlogRepository } from '../../infrastructure/database/postgres/blog.repository';
import { Blog } from '../../core/domain/entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from '../storage/s3.module';
import { User } from '../../core/domain/entities/user.entity';
import { UserRepository } from '../../infrastructure/database/postgres/user.repository';
import { RequestScopeModule } from 'nj-request-scope';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog, User]),
    S3Module,
    RequestScopeModule,
  ],
  controllers: [BlogController],
  providers: [BlogApplication, BlogRepository, UserRepository],
})
export class BlogModule {}
