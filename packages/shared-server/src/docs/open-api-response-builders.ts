import type { z } from 'zod/v4';
import { ServiceResponseSchema } from '../lib';
import { HTTP_STATUS_CODES } from '../core';

export function createApiResponse(schema: z.ZodType, description: string, statusCode = HTTP_STATUS_CODES.OK) {
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
