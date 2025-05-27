import { productController } from '@/controllers/product.controller';
import { productSchema } from '@/db/schemas/products';
import {
  CreateProductRequestSchema,
  UpdateProductRequestSchema,
  ProductListResponseSchema,
} from '@/models/product.model';
import { createApiResponse } from '@repo/server/docs';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '@repo/server/middlewares';

export const productRegistry = new OpenAPIRegistry();
export const productRouter: Router = Router();

// Get Single Product Route
productRegistry.registerPath({
  method: 'get',
  path: `/products/{id}`,
  tags: ['Products'],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: createApiResponse(productSchema, 'Product retrieved successfully'),
});

productRouter.get(
  `/:id`,
  validateRequest(
    z.object({
      params: z.object({ id: z.string().uuid() }),
    })
  ),
  productController.getProduct
);

// Get All Products Route with Pagination
productRegistry.registerPath({
  method: 'get',
  path: '/products',
  tags: ['Products'],
  request: {
    query: z.object({
      page: z.string().transform(Number).default('1'),
      limit: z.string().transform(Number).default('20'),
    }),
  },
  responses: createApiResponse(ProductListResponseSchema, 'Products retrieved successfully'),
});

productRouter.get(
  '/',
  validateRequest(
    z.object({
      query: z
        .object({
          page: z.coerce.number().int().positive().default(1),
          limit: z.coerce.number().int().positive().max(100).default(20),
        })
        .optional(),
    })
  ),
  productController.getProducts
);

// Create Product Route
productRegistry.registerPath({
  method: 'post',
  path: '/products',
  tags: ['Products'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateProductRequestSchema,
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

productRouter.post(
  '/',
  validateRequest(z.object({ body: CreateProductRequestSchema })),
  productController.createProduct
);

// Update Product Route
productRegistry.registerPath({
  method: 'put',
  path: `/products/{id}`,
  tags: ['Products'],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        'application/json': {
          schema: UpdateProductRequestSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Product updated successfully'),
});

productRouter.put(
  `/:id`,
  validateRequest(
    z.object({
      params: z.object({ id: z.string().uuid() }),
      body: UpdateProductRequestSchema,
    })
  ),
  productController.updateProduct
);

// Delete All Products Route
productRegistry.registerPath({
  method: 'delete',
  path: `/products/all`,
  tags: ['Products'],
  responses: createApiResponse(z.null(), 'All products deleted successfully'),
});

productRouter.delete(`/all`, productController.deleteAllProducts);

// Delete Product Route
productRegistry.registerPath({
  method: 'delete',
  path: `/products/{id}`,
  tags: ['Products'],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: createApiResponse(z.null(), 'Product deleted successfully'),
});

productRouter.delete(`/:id`, productController.deleteProduct);
