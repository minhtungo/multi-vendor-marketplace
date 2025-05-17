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
  // Redis
  REDIS_HOST: z.string().min(1).default('localhost'),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  REDIS_PASSWORD: z.string().min(1).default(''),
  REDIS_DB_NUMBER: z.coerce.number().int().positive().default(0),
  REDIS_TLS_ENABLED: z.boolean().default(false),
  //SMTP
  SMTP_HOST: z.string().min(1).default('localhost'),
  SMTP_PORT: z.coerce.number().int().positive().default(1025),
  SMTP_USER: z.string().min(1).default('user'),
  SMTP_PASSWORD: z.string().min(1).default('password'),
  SMTP_SERVICE: z.string().min(1).default('gmail'),
  EMAIL_FROM: z.string().min(1).default('noreply@example.com'),
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
