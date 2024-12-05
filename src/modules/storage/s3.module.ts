import { Module } from '@nestjs/common';
import { Client } from 'minio'; // Import the MinIO client
import { ConfigService } from '@nestjs/config';
import { MinioFileStorage } from '../../infrastructure/storage/minio/file.storage';

@Module({
  imports: [],
  providers: [
    {
      provide: 'S3',
      useFactory: (configService: ConfigService) =>
        new Client({
          endPoint: configService.get<string>('S3_URL'),
          port: +configService.get<number>('S3_SERVER_PORT'),
          useSSL: configService.get<boolean>('S3_SSL') === true,
          accessKey: configService.get<string>('S3_USERNAME'),
          secretKey: configService.get<string>('S3_PASSWORD'),
        }),
      inject: [ConfigService],
    },
    MinioFileStorage,
  ],
  exports: ['S3', MinioFileStorage],
})
export class S3Module {}
