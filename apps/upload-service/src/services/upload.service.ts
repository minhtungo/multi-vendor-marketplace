import { env } from '@/configs/env';
import { uploadRepository } from '@/repositories/upload.repository';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse } from '@repo/server/lib';

class UploadService {
  constructor(private readonly uploadRepo = uploadRepository) {}
}

export const uploadService = new UploadService();
