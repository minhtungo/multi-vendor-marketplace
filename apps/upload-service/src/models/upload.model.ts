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

// Request validation schemas
export const GetPresignedUrlSchema = z.object({
  body: presignedUrlSchema,
});

export const ConfirmUploadSchema = z.object({
  body: confirmUploadSchema,
});

export const GetUserUploadsSchema = z.object({
  query: z.object({
    offset: z.coerce.number().default(0),
    limit: z.coerce.number().default(20),
  }),
});

export const DeleteUploadSchema = z.object({
  params: z.object({
    fileId: z.string(),
  }),
});

export type GetPresignedUrlInput = z.infer<typeof GetPresignedUrlSchema>;
export type ConfirmUploadInput = z.infer<typeof ConfirmUploadSchema>;
export type GetUserUploadsInput = z.infer<typeof GetUserUploadsSchema>;
export type DeleteUploadInput = z.infer<typeof DeleteUploadSchema>;
