import { productController } from '@/controllers/product.controller';
import { productSchema } from '@/db/schemas/products';
import {
  createProductRequestSchema,
  updateProductRequestSchema,
  productListResponseSchema,
  getProductsQuerySchema,
  getProductQuerySchema,
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
  path: `/products`,
  tags: ['Products'],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    query: getProductQuerySchema,
  },
  responses: createApiResponse(productSchema, 'Product retrieved successfully'),
});

productRouter.get(`/:id`, validateRequest(getProductQuerySchema), productController.getProduct);

//TODO: separate get products for vendor and public
// Get All Products Route with Pagination
productRegistry.registerPath({
  method: 'get',
  path: '/products',
  tags: ['Products'],
  request: {
    query: getProductsQuerySchema,
  },
  responses: createApiResponse(productListResponseSchema, 'Products retrieved successfully'),
});

productRouter.get(
  '/',
  validateRequest(
    z.object({
      query: getProductsQuerySchema.optional(),
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
          schema: createProductRequestSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Product created successfully'),
});

productRouter.post(
  '/',
  validateRequest(z.object({ body: createProductRequestSchema })),
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
          schema: updateProductRequestSchema,
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
      body: updateProductRequestSchema,
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
