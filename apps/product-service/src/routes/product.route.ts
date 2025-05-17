import { paths } from '@/configs/paths';
import { productController } from '@/controllers/product.controller';
import { insertProductSchema } from '@/db/schemas/products';
import { createApiResponse } from '@/docs/openAPIResponseBuilders';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';

export const productRegistry = new OpenAPIRegistry();
export const productRouter: Router = Router();

// Create Product Route
productRegistry.registerPath({
  method: 'post',
  path: paths.products,
  tags: ['Products'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: insertProductSchema,
        },
      },
    },
  },
  responses: createApiResponse(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
      price: z.number(),
    }),
    'Product created successfully'
  ),
});

productRouter.post(paths.products, productController.createProduct);
