import { privateApi } from '@/api/api-client';
import { api } from '@/configs/server';
import type { ApiResponse } from '@repo/types/api';
import type { Upload } from '@repo/types/upload';

type ConfirmUploadInput = {
  key: string;
  fileName: string;
  mimeType: string;
  size: number;
};

export async function confirmUpload({
  key,
  fileName,
  mimeType,
  size,
}: ConfirmUploadInput): Promise<ApiResponse<Upload>> {
  return privateApi.post(api.uploads.confirmUpload, {
    fileName,
    key,
    mimeType,
    size,
  });
}
