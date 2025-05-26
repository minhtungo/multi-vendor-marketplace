import { confirmUpload } from '@/features/upload/api/confirm-upload';
import { getPresignedUrl } from '@/features/upload/api/presigned-url';
import type { Upload } from '@/types/upload';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const ACCEPTED_FILE_TYPES = 'image/*,.pdf,.doc,.docx';

type UploadFileInput = File;

export async function uploadFile(file: UploadFileInput): Promise<Upload> {
  const response = await getPresignedUrl(file.name);

  const { url, fields, key } = response.data;

  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  formData.append('file', file);

  const uploadedResponse = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (uploadedResponse.status === 204 || uploadedResponse.status === 200) {
    const confirmResponse = await confirmUpload({
      key,
      fileName: file.name,
      mimeType: file.type,
      size: file.size,
    });

    return confirmResponse.data;
  }

  throw new Error('Failed to upload file');
}

export function useUploadFile() {
  return useMutation({
    mutationFn: uploadFile,
  });
}
