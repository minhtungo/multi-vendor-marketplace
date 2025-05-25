import express, { type Request, type Response, type Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { healthCheckRegistry } from '@/routes/health-check.route';
import { authUserRegistry } from '@/routes/auth.user.route';
import { generateOpenAPIDocument } from '@repo/server/docs';

export const openAPIRouter: Router = express.Router();
const openAPIDocument = generateOpenAPIDocument([healthCheckRegistry, authUserRegistry], {
  title: 'Auth Service API',
  version: '1.0.0',
});

openAPIRouter.get('/swagger.json', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(openAPIDocument);
});

openAPIRouter.use('/', swaggerUi.serve, swaggerUi.setup(openAPIDocument));
