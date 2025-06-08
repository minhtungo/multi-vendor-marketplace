import dotenv from 'dotenv';
import { z } from 'zod/v4';

dotenv.config();

const envSchema = z.object({
  //Config
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  HOST: z.string().min(1).default('localhost'),
  PORT: z.coerce.number().int().positive().default(3000),
  APP_ORIGIN: z.string(),
  COMMON_RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(1000),
  COMMON_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(1000),
  //JWT
  JWT_SECRET: z.string().min(1),

  //URLs
  AUTH_SERVICE_URL: z.url().default('http://localhost:8081'),
  USER_SERVICE_URL: z.url().default('http://localhost:8086'),
  PRODUCT_SERVICE_URL: z.url().default('http://localhost:8082'),
  PAYMENT_SERVICE_URL: z.url().default('http://localhost:8083'),
  UPLOAD_SERVICE_URL: z.url().default('http://localhost:8084'),
  ORDER_SERVICE_URL: z.url().default('http://localhost:8085'),
  CART_SERVICE_URL: z.url().default('http://localhost:8087'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', z.treeifyError(parsedEnv.error));
  throw new Error('Invalid environment variables');
}

export const env = {
  ...parsedEnv.data,
  isDevelopment: parsedEnv.data.NODE_ENV === 'development',
  isProduction: parsedEnv.data.NODE_ENV === 'production',
  isTest: parsedEnv.data.NODE_ENV === 'test',
};
