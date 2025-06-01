import { productCategoryController } from '@/controllers/product-category.controller';
import { categoryResponseSchema, createCategorySchema, updateCategorySchema } from '@/models/product-categories.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/server/docs';
import { validateRequest } from '@repo/server/middlewares';
import { Router } from 'express';
import { z } from 'zod';

export const productCategoryRegistry = new OpenAPIRegistry();
export const productCategoryRouter: Router = Router();

// Get All Product Categories Route
productCategoryRegistry.registerPath({
  method: 'get',
  path: '/product-categories',
  tags: ['Product Categories'],
  responses: createApiResponse(categoryResponseSchema, 'Product categories retrieved successfully'),
});

productCategoryRouter.get('/', productCategoryController.getAllProductCategories);

// Get Single Product Category Route
productCategoryRegistry.registerPath({
  method: 'get',
  path: `/product-categories/{id}`,
  tags: ['Product Categories'],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: createApiResponse(categoryResponseSchema, 'Product category retrieved successfully'),
});

productCategoryRouter.get(`/:id`, productCategoryController.getProductCategory);

// Create Product Category Route
productCategoryRegistry.registerPath({
  method: 'post',
  path: '/product-categories',
  tags: ['Product Categories'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createCategorySchema,
        },
      },
    },
  },
  responses: createApiResponse(categoryResponseSchema, 'Product category created successfully'),
});

productCategoryRouter.post(
  '/',
  validateRequest(z.object({ body: createCategorySchema })),
  productCategoryController.createProductCategory
);

// Update Product Category Route
productCategoryRegistry.registerPath({
  method: 'put',
  path: `/product-categories/{id}`,
  tags: ['Product Categories'],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        'application/json': {
          schema: updateCategorySchema,
        },
      },
    },
  },
  responses: createApiResponse(categoryResponseSchema, 'Product category updated successfully'),
});

productCategoryRouter.put(
  `/:id`,
  validateRequest(z.object({ body: updateCategorySchema })),
  productCategoryController.updateProductCategory
);

// Delete Product Category Route
productCategoryRegistry.registerPath({
  method: 'delete',
  path: `/product-categories/{id}`,
  tags: ['Product Categories'],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: createApiResponse(categoryResponseSchema, 'Product category deleted successfully'),
});

productCategoryRouter.delete(
  `/:id`,
  validateRequest(z.object({ params: z.object({ id: z.string().uuid() }) })),
  productCategoryController.deleteProductCategory
);

// Delete All Product Categories Route
productCategoryRegistry.registerPath({
  method: 'delete',
  path: '/product-categories',
  tags: ['Product Categories'],
  responses: createApiResponse(categoryResponseSchema, 'All product categories deleted successfully'),
});

productCategoryRouter.delete('/all', productCategoryController.deleteAllProductCategories);
