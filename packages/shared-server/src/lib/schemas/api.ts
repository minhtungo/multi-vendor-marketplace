import { z } from 'zod/v4';

export const paginationResponseSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});
