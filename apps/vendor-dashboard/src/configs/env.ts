import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    APP_PORT: z.number(),
  },
  clientPrefix: 'VITE_',
  client: {
    VITE_APP_TITLE: z.string().min(1).optional(),
    VITE_SERVER_URL: z.string(),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
})
