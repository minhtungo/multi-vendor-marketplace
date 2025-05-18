import { env } from '@/configs/env';
import { createLogger } from '@repo/server/lib/logger';

export const logger = createLogger({
  name: 'product-service',
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  isProduction: env.NODE_ENV === 'production',
});
