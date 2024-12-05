import { Inject, Injectable } from '@nestjs/common';
import { FileStoragePort } from '../../../core/domain/ports/file-storage.port';
import { Client } from 'minio';
import * as fs from 'fs';
import { UploadResponseType } from '../../../core/domain/types/upload-response.type';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MinioFileStorage implements FileStoragePort {
  private readonly bucket: string;
  constructor(
    @Inject('S3') private readonly client: Client,
    private readonly configService: ConfigService,
  ) {
    this.bucket = this.configService.get<string>('S3_BUCKET');
  }

  async upload(file: Express.Multer.File): Promise<UploadResponseType> {
    if (!file) {
      return {
        name: '',
        url: '',
      };
    }
    const objectName = `${Date.now()}-${file.originalname}`;
    const bucketExists = await this.getBucket();
    if (!bucketExists) {
      await this.createBucket();
    }
    await this.client.putObject(this.bucket, objectName, file.buffer);
    return {
      name: objectName,
      url: await this.downloadFile(objectName),
    };
  }

  async delete(key: string): Promise<void> {
    await this.client.removeObject(this.bucket, key);
  }

  async existKey(key: string): Promise<boolean> {
    try {
      if (!key) return false;
      await this.client.statObject(this.bucket, key);
      return true;
    } catch (err) {
      return false;
    }
  }

  async downloadFile(key: string): Promise<string> {
    if (!key) return '';
    try {
      if (await this.existKey(key)) {
        return await this.client.presignedGetObject(this.bucket, key, 604800);
      }
    } catch (e) {
      console.log(e);
    }
    return '';
  }
  async getBucket(): Promise<boolean> {
    try {
      return await this.client.bucketExists(this.bucket);
    } catch (error) {
      return false;
    }
  }
  async createBucket(): Promise<void> {
    await this.client.makeBucket(this.bucket, 'us-east-1');
  }
}
