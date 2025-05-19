import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  //Config
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  HOST: z.string().min(1).default('localhost'),
  PORT: z.coerce.number().int().positive().default(3001),
  VENDOR_ORIGIN: z.string().url().default('http://localhost:5174'),
  // Redis
  REDIS_HOST: z.string().min(1).default('localhost'),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  REDIS_PASSWORD: z.string().min(1).default(''),
  REDIS_DB_NUMBER: z.coerce.number().int().positive().default(0),
  REDIS_TLS_ENABLED: z.boolean().default(false),
  // Database
  POSTGRES_PORT: z.coerce.number().int().positive().default(5433),
  POSTGRES_USER: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_DB: z.string().min(1),
  DATABASE_URL: z.string().min(1),
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
