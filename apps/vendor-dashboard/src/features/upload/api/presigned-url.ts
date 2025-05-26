import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@repo/types/api';

type GetPresignedUrlInput = string;

export async function getPresignedUrl(fileName: GetPresignedUrlInput): Promise<
  ApiResponse<{
    url: string;
    fields: Record<string, string>;
    key: string;
    fileName: string;
  }>
> {
  return privateApi.post(server.path.upload.presignedUrl, {
    fileName,
  });
}
