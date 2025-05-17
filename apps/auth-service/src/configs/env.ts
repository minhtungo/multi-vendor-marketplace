import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  //Config
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  HOST: z.string().min(1).default('localhost'),
  PORT: z.coerce.number().int().positive().default(3001),
  APP_ORIGIN: z
    .string()
    .transform((val) => {
      try {
        return JSON.parse(val);
      } catch {
        return val.split(',').map((url) => url.trim());
      }
    })
    .pipe(z.array(z.string().url()))
    .default('http://localhost:5173,http://localhost:5174'),
  VENDOR_ORIGIN: z.string().url().default('http://localhost:5174'),
  COMMON_RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(1000),
  COMMON_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(1000),
  // Cookies
  ACCESS_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_COOKIE_NAME: z.string().min(1),
  VENDOR_REFRESH_TOKEN_COOKIE_NAME: z.string().min(1),
  VENDOR_REFRESH_TOKEN_SECRET: z.string().min(1),
  // Redis
  REDIS_HOST: z.string().min(1).default('localhost'),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  REDIS_PASSWORD: z.string().min(1).default(''),
  REDIS_DB_NUMBER: z.coerce.number().int().positive().default(0),
  REDIS_TLS_ENABLED: z.boolean().default(false),
  // Stripe
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = {
  ...parsedEnv.data,
  isDevelopment: parsedEnv.data.NODE_ENV === 'development',
  isProduction: parsedEnv.data.NODE_ENV === 'production',
  isTest: parsedEnv.data.NODE_ENV === 'test',
};
