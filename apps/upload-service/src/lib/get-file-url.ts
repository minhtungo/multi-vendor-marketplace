import { env } from '@/configs/env';

export const getFileUrl = (key: string) => {
  const baseUrl =
    env.NODE_ENV === 'development'
      ? `${env.AWS_S3_ENDPOINT}/${env.AWS_S3_BUCKET_NAME}/`
      : `https://${env.AWS_S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/`;

  return `${baseUrl}${key}`;
};
