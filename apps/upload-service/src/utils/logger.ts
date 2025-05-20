import { env } from '@/configs/env';
import { createLogger } from '@repo/server/lib';

export const logger = createLogger({
  name: 'upload-service',
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  isProduction: env.NODE_ENV === 'production',
});
