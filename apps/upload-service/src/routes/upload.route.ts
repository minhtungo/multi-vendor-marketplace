import { uploadController } from '@/controllers/upload.controller';
import { createApiResponse } from '@/docs/openAPIResponseBuilders';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';

export const uploadRegistry = new OpenAPIRegistry();
export const uploadRouter: Router = Router();
