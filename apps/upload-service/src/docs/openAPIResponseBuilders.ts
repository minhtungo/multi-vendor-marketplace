import { ServiceResponseSchema } from '@repo/server/lib';
import { HTTP_STATUS_CODES } from '@repo/server/core';

import type { z } from 'zod';

export function createApiResponse(schema: z.ZodTypeAny, description: string, statusCode = HTTP_STATUS_CODES.OK) {
  return {
    [statusCode]: {
      description,
      content: {
        'application/json': {
          schema: ServiceResponseSchema(schema),
        },
      },
    },
  };
}
