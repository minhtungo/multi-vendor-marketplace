import { ServiceResponseSchema } from '@/lib/service-response';
import { StatusCodes } from 'http-status-codes';
import type { z } from 'zod';

export function createApiResponse(
  schema: z.ZodTypeAny,
  description: string,
  statusCode = StatusCodes.OK
) {
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
