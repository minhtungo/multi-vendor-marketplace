import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_SERVER_URL: z.string().min(1),
    NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME: process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME,
  },
});
