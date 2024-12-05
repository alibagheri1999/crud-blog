import { UploadResponseType } from '../types/upload-response.type';

export interface FileStoragePort {
  upload(file: Express.Multer.File): Promise<UploadResponseType>;
  delete(filePath: string): Promise<void>;
  existKey(key: string): Promise<boolean>;
  downloadFile(key: string): Promise<string>;
  getBucket(): Promise<boolean>;
  createBucket(): Promise<void>;
}
