import { uploadController } from '@/controllers/upload.controller';
import { createApiResponse } from '@repo/shared-server/docs';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod/v4';
import { validateRequest } from '@repo/shared-server/middlewares';
import { confirmUploadSchema, presignedUrlSchema, uploadSchema } from '@/models/upload.model';

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
  validateRequest(z.object({ body: presignedUrlSchema })),
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
          schema: confirmUploadSchema,
        },
      },
    },
  },
  responses: createApiResponse(uploadSchema, 'Success'),
});

uploadRouter.post('/confirm', uploadController.confirmUpload);
