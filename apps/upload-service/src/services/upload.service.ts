import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

import { appConfig } from '@/configs/app-config';
import { env } from '@/configs/env';
import { getFileUrl } from '@/lib/get-file-url';
import { s3Client } from '@/lib/s3-client';
import { UploadRepository } from '@/repositories/upload.repository';
import { logger } from '@/utils/logger';
import { HTTP_STATUS_CODES } from '@repo/shared-server/core';
import { ServiceResponse, executeWithErrorHandling } from '@repo/shared-server/lib';
import { v4 as uuidv4 } from 'uuid';
import { createS3PresignedUpload } from '@/lib/s3';

export const DEFAULT_GET_USER_UPLOADS_OFFSET = 0;
export const DEFAULT_GET_USER_UPLOADS_LIMIT = 30;

export class UploadService {
  private uploadRepository: UploadRepository;

  constructor(repository: UploadRepository = new UploadRepository()) {
    this.uploadRepository = repository;
  }

  async getPresignedUrl(fileName?: string) {
    return executeWithErrorHandling(
      'getPresignedUrl',
      async () => {
        const { url, fields, key } = await createS3PresignedUpload(fileName);

        return ServiceResponse.success('Presigned URL created successfully', {
          url,
          fields,
          key,
          fileName: fileName || 'unnamed',
        });
      },
      logger
    );
  }

  async confirmUpload(data: { key: string; fileName: string; mimeType: string; size?: number }, userId: string) {
    return executeWithErrorHandling(
      'confirmUpload',
      async () => {
        const fileUrl = getFileUrl(data.key);

        const fileUpload = await this.uploadRepository.createFileUpload({
          key: data.key,
          fileName: data.fileName,
          mimeType: data.mimeType,
          size: data.size?.toString(),
          url: fileUrl,
          userId,
        });

        return ServiceResponse.success('File upload recorded successfully', fileUpload);
      },
      logger
    );
  }

  async getUserUploads(
    userId: string,
    offset: number = DEFAULT_GET_USER_UPLOADS_OFFSET,
    limit: number = DEFAULT_GET_USER_UPLOADS_LIMIT
  ) {
    return executeWithErrorHandling(
      'getUserUploads',
      async () => {
        const uploads = await this.uploadRepository.getFileUploadsByUserId(userId, offset, limit + 1);
        const hasNextPage = uploads.length > limit;
        const paginatedUploads = hasNextPage ? uploads.slice(0, limit) : uploads;
        const nextOffset = hasNextPage ? offset + limit : null;

        return ServiceResponse.success('User uploads retrieved successfully', {
          uploads: paginatedUploads,
          hasNextPage,
          nextOffset,
        });
      },
      logger
    );
  }

  async deleteUpload(fileId: string, userId: string) {
    return executeWithErrorHandling(
      'deleteUpload',
      async () => {
        const fileUpload = await this.uploadRepository.getFileUploadById(fileId);

        if (!fileUpload) {
          return ServiceResponse.failure('File not found', null, HTTP_STATUS_CODES.NOT_FOUND);
        }

        if (fileUpload.userId !== userId) {
          return ServiceResponse.failure('Unauthorized', null, HTTP_STATUS_CODES.FORBIDDEN);
        }

        await this.uploadRepository.deleteFileUpload(fileId);

        return ServiceResponse.success('File deleted successfully', null);
      },
      logger
    );
  }

  async deleteUploads(fileIds: string[], userId: string) {
    return executeWithErrorHandling(
      'deleteUploads',
      async () => {
        // Process each file deletion and collect results
        const results = await Promise.all(
          fileIds.map(async (fileId) => {
            try {
              const fileUpload = await this.uploadRepository.getFileUploadById(fileId);

              if (!fileUpload) {
                return { fileId, success: false, error: 'File not found' };
              }

              if (fileUpload.userId !== userId) {
                return { fileId, success: false, error: 'Unauthorized' };
              }

              await this.uploadRepository.deleteFileUpload(fileId);
              return { fileId, success: true };
            } catch (error) {
              return { fileId, success: false, error: (error as Error).message };
            }
          })
        );

        const successful = results.filter((r) => r.success).map((r) => r.fileId);
        const failed = results
          .filter((r) => !r.success)
          .map((r) => ({
            fileId: r.fileId,
            error: r.error,
          }));

        return ServiceResponse.success(`Successfully deleted ${successful.length} of ${fileIds.length} files`, {
          successful,
          failed,
        });
      },
      logger
    );
  }
}

export const uploadService = new UploadService();
