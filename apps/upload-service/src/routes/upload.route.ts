import { uploadController } from '@/controllers/upload.controller';
import { createApiResponse } from '@repo/server/docs';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '@repo/server/middlewares';
import { ConfirmUploadSchema, PresignedUrlSchema } from '@/models/upload.model';

export const uploadRegistry = new OpenAPIRegistry();
export const uploadRouter: Router = Router();
uploadRegistry.registerPath({
  method: 'post',
  path: '/uploads/presigned-url',
  tags: ['Upload'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            fileName: z.string(),
          }),
        },
      },
    },
  },
  responses: createApiResponse(z.object({}), 'Success'),
});

uploadRouter.post(
  '/presigned-url',
  validateRequest(z.object({ body: PresignedUrlSchema })),
  uploadController.getPresignedUrl
);

uploadRegistry.registerPath({
  method: 'post',
  path: '/upload/confirm',
  tags: ['Upload'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: ConfirmUploadSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.object({}), 'Success'),
});

uploadRouter.post('/confirm', uploadController.confirmUpload);
