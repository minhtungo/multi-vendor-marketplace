import { productCategoryController } from '@/controllers/product-category.controller';
import { insertProductCategorySchema, productCategorySchema } from '@/db/schemas/product-categories';
import { createApiResponse } from '@repo/server/docs';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';

export const productCategoryRegistry = new OpenAPIRegistry();
export const productCategoryRouter: Router = Router();

// Get All Product Categories Route
productCategoryRegistry.registerPath({
  method: 'get',
  path: '/product-categories',
  tags: ['Product Categories'],
  responses: createApiResponse(z.array(productCategorySchema), 'Product categories retrieved successfully'),
});

productCategoryRouter.get('/product-categories', productCategoryController.getAllProductCategories);

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
  responses: createApiResponse(productCategorySchema, 'Product category retrieved successfully'),
});

productCategoryRouter.get(`/product-categories/:id`, productCategoryController.getProductCategory);

// Create Product Category Route
productCategoryRegistry.registerPath({
  method: 'post',
  path: '/product-categories',
  tags: ['Product Categories'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: insertProductCategorySchema,
        },
      },
    },
  },
  responses: createApiResponse(productCategorySchema, 'Product category created successfully'),
});

productCategoryRouter.post('/product-categories', productCategoryController.createProductCategory);

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
          schema: insertProductCategorySchema.partial(),
        },
      },
    },
  },
  responses: createApiResponse(productCategorySchema, 'Product category updated successfully'),
});

productCategoryRouter.put(`/product-categories/:id`, productCategoryController.updateProductCategory);

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
  responses: createApiResponse(productCategorySchema, 'Product category deleted successfully'),
});

productCategoryRouter.delete(`/product-categories/:id`, productCategoryController.deleteProductCategory);

// Delete All Product Categories Route
productCategoryRegistry.registerPath({
  method: 'delete',
  path: '/product-categories',
  tags: ['Product Categories'],
  responses: createApiResponse(productCategorySchema, 'All product categories deleted successfully'),
});

productCategoryRouter.delete('/product-categories/all', productCategoryController.deleteAllProductCategories);
