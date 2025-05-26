import express, { type Request, type Response, type Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { generateOpenAPIDocument } from '@repo/server/docs';
import { uploadRegistry } from '@/routes/upload.route';

export const openAPIRouter: Router = express.Router();
const openAPIDocument = generateOpenAPIDocument([uploadRegistry], {
  title: 'Upload Service API',
  version: '1.0.0',
});

openAPIRouter.get('/swagger.json', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(openAPIDocument);
});

openAPIRouter.use('/', swaggerUi.serve, swaggerUi.setup(openAPIDocument));
