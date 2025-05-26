import { privateApi } from '@/api/api-client';
import { server } from '@/configs/server';
import type { ApiResponse } from '@/types/api';
import type { Upload } from '@/types/upload';

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
  return privateApi.post(server.path.upload.confirmUpload, {
    fileName,
    key,
    mimeType,
    size,
  });
}
