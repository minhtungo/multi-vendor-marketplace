import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  //Config
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  HOST: z.string().min(1).default('localhost'),
  PORT: z.coerce.number().int().positive().default(3000),
  APP_ORIGIN: z
    .string()
    .transform((val) => {
      try {
        // Try to parse as JSON first
        return JSON.parse(val);
      } catch {
        // If not JSON, split by comma and trim
        return val.split(',').map((url) => url.trim());
      }
    })
    .pipe(z.array(z.string().url()))
    .default('http://localhost:5173,http://localhost:5174'),
  COMMON_RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(1000),
  COMMON_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(1000),
  //URLs
  AUTH_SERVICE_URL: z.string().default('http://localhost:8081'),
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
