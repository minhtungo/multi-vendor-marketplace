import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import { z } from 'zod';

import { bucketPolicyController } from '@/controllers/bucket-policy.controller';
import { createApiResponse } from '@repo/server/docs';
import { validateRequest } from '@repo/server/middlewares';

export const bucketPolicyRegistry = new OpenAPIRegistry();
export const bucketPolicyRouter: Router = express.Router();

// Schema definitions
const CustomPolicySchema = z.object({
  policy: z.object({}).passthrough(), // Allow any valid JSON object
});

const IPRestrictedSchema = z.object({
  allowedIPs: z.array(z.string().ip()),
});

// Register OpenAPI paths
bucketPolicyRegistry.registerPath({
  method: 'post',
  path: '/bucket-policy/public',
  tags: ['Bucket Policy'],
  responses: createApiResponse(z.object({}), 'Bucket made public successfully'),
});

bucketPolicyRegistry.registerPath({
  method: 'post',
  path: '/bucket-policy/private',
  tags: ['Bucket Policy'],
  responses: createApiResponse(z.object({}), 'Bucket made private successfully'),
});

bucketPolicyRegistry.registerPath({
  method: 'get',
  path: '/bucket-policy/current',
  tags: ['Bucket Policy'],
  responses: createApiResponse(
    z.object({
      policy: z.object({}).passthrough().nullable(),
      isPublic: z.boolean(),
    }),
    'Current bucket policy retrieved'
  ),
});

bucketPolicyRegistry.registerPath({
  method: 'post',
  path: '/bucket-policy/custom',
  tags: ['Bucket Policy'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CustomPolicySchema,
        },
      },
    },
  },
  responses: createApiResponse(z.object({}), 'Custom bucket policy set successfully'),
});

bucketPolicyRegistry.registerPath({
  method: 'post',
  path: '/bucket-policy/ip-restricted',
  tags: ['Bucket Policy'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: IPRestrictedSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.object({}), 'IP-restricted access set successfully'),
});

// Routes
bucketPolicyRouter.post('/public', bucketPolicyController.makePublic);

bucketPolicyRouter.post('/private', bucketPolicyController.makePrivate);

bucketPolicyRouter.get('/current', bucketPolicyController.getCurrentPolicy);

bucketPolicyRouter.post(
  '/custom',
  validateRequest(z.object({ body: CustomPolicySchema })),
  bucketPolicyController.setCustomPolicy
);

bucketPolicyRouter.post(
  '/ip-restricted',
  validateRequest(z.object({ body: IPRestrictedSchema })),
  bucketPolicyController.setIPRestrictedAccess
);
