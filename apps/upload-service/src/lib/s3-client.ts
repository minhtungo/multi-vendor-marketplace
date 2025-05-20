import { env } from '@/configs/env';
import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: env.AWS_REGION,
  ...(env.USE_LOCAL_S3 && {
    endpoint: env.AWS_S3_ENDPOINT,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
  }),
});
