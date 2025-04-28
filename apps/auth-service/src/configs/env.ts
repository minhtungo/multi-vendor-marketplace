import dotenv from 'dotenv';
import { cleanEnv, host, num, port, str, testOnly } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  // Common
  NODE_ENV: str({
    devDefault: testOnly('test'),
    choices: ['development', 'production', 'test'],
  }),
  HOST: host({ devDefault: testOnly('localhost') }),
  PORT: port({ devDefault: testOnly(3000) }),
  // App
  APP_ORIGIN: str({ devDefault: testOnly('http://localhost:3000') }),
  // Rate Limiter
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ default: 100 }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ default: 15 * 60 * 1000 }),
  // Token
  ACCESS_TOKEN_SECRET: str(),
  REFRESH_TOKEN_SECRET: str(),
  // Redis Config
  REDIS_HOST: host({ default: 'localhost' }),
  REDIS_PORT: port({ default: 6379 }),
  REDIS_PASSWORD: str({ default: '' }),
  REDIS_DB_NUMBER: num({ default: 0 }),
  // SMTP Config
  SMTP_HOST: host({ default: 'localhost' }),
  SMTP_PORT: port({ default: 1025 }),
  SMTP_USER: str({ default: 'user' }),
  SMTP_PASSWORD: str({ default: 'password' }),
  SMTP_SERVICE: str({ default: 'gmail' }),
  EMAIL_FROM: str({ default: 'noreply@example.com' }),
});
