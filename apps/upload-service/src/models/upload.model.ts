import { createSelectSchema } from 'drizzle-zod';
import { uploads } from '@/db/schemas';
import { z } from 'zod/v4';

export const presignedUrlSchema = z.object({
  fileName: z.string(),
});

export const confirmUploadSchema = z.object({
  key: z.string(),
  fileName: z.string(),
  mimeType: z.string(),
  size: z.number().optional(),
});

export const uploadSchema = createSelectSchema(uploads);
