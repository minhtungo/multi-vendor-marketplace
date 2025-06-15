import { uploadController } from '@/controllers/upload.controller';
import { createApiResponse } from '@repo/shared-server/docs';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod/v4';
import { validateRequest } from '@repo/shared-server/middlewares';
import {
  ConfirmUploadSchema,
  DeleteUploadSchema,
  GetPresignedUrlSchema,
  GetUserUploadsSchema,
  uploadSchema,
} from '@/models/upload.model';

export const uploadRegistry = new OpenAPIRegistry();
export const uploadRouter: Router = Router();

// GET: Retrieve user's uploaded files
uploadRegistry.registerPath({
  method: 'get',
  path: '/uploads',
  tags: ['Upload'],
  request: {
    query: GetUserUploadsSchema.shape.query,
  },
  responses: createApiResponse(z.array(uploadSchema), 'Success'),
});

uploadRouter.get('/', validateRequest(GetUserUploadsSchema), uploadController.getUserUploads);

// POST: Get presigned URL for file upload
uploadRegistry.registerPath({
  method: 'post',
  path: '/uploads/presigned-url',
  tags: ['Upload'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: GetPresignedUrlSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(z.object({}), 'Success'),
});

uploadRouter.post('/confirm', validateRequest(ConfirmUploadSchema), uploadController.confirmUpload);

// POST: Confirm successful file upload
uploadRegistry.registerPath({
  method: 'post',
  path: '/upload/confirm',
  tags: ['Upload'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: ConfirmUploadSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(uploadSchema, 'Success'),
});

// DELETE: Remove uploaded file
uploadRegistry.registerPath({
  method: 'delete',
  path: '/uploads/{fileId}',
  tags: ['Upload'],
  request: {
    params: DeleteUploadSchema.shape.params,
  },
  responses: createApiResponse(z.null(), 'Success'),
});

// DELETE: Remove uploaded file
uploadRouter.delete('/:fileId', validateRequest(DeleteUploadSchema), uploadController.deleteUpload);
