import { env } from '@/configs/env';
import { uploadConfig } from '@/configs/upload';
import { s3Client } from '@/lib/s3-client';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { v4 as uuidv4 } from 'uuid';

export const createS3PresignedUpload = async (fileName?: string) => {
  let key = uuidv4();

  if (fileName) {
    const extension = fileName.split('.').pop();
    if (extension) {
      key = `${key}.${extension}`;
    }
  }

  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket: env.AWS_S3_BUCKET_NAME!,
    Key: key,
    Conditions: [['content-length-range', 0, uploadConfig.maxFileSize]],
    Expires: uploadConfig.presignedUrl.expiresIn,
  });

  const uploadUrl = env.NODE_ENV === 'development' ? `${env.AWS_S3_ENDPOINT}/${env.AWS_S3_BUCKET_NAME}/` : url;

  return {
    url: uploadUrl,
    fields,
    key,
  };
};
