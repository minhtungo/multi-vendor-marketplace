import type { z } from 'zod';
import { ServiceResponseSchema } from '../lib';
import { HTTP_STATUS_CODES } from '../core';

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
