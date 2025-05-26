import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const PresignedUrlSchema = z.object({
  fileName: z.string(),
});

export const ConfirmUploadSchema = z.object({
  key: z.string(),
  fileName: z.string(),
  mimeType: z.string(),
  size: z.number().optional(),
});
