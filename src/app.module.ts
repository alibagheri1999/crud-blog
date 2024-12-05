import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './modules/blog/blog.module';
import { S3Module } from './modules/storage/s3.module';
import { PostgresModule } from './modules/database/postgres.module';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { RequestScopeModule } from 'nj-request-scope';
@Module({
  imports: [
    ConfigModule.forRoot(),
    PostgresModule,
    S3Module,
    FirebaseModule,
    BlogModule,
    RequestScopeModule,
  ],
  providers: [],
})
export class AppModule {}
