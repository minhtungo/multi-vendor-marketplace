import { productCategoryController } from '@/controllers/product-category.controller';
import { insertProductCategorySchema, productCategorySchema } from '@/db/schemas/product-categories';
import { createApiResponse } from '@repo/server/docs';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '@repo/server/middlewares';
import { CreateProductCategoryRequestSchema } from '@/models/product-categories.model';

export const productCategoryRegistry = new OpenAPIRegistry();
export const productCategoryRouter: Router = Router();

// Get All Product Categories Route
productCategoryRegistry.registerPath({
  method: 'get',
  path: '/product-categories',
  tags: ['Product Categories'],
  responses: createApiResponse(z.array(productCategorySchema), 'Product categories retrieved successfully'),
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
  responses: createApiResponse(productCategorySchema, 'Product category retrieved successfully'),
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
          schema: CreateProductCategoryRequestSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.array(productCategorySchema), 'Product category created successfully'),
});

productCategoryRouter.post(
  '/',
  validateRequest(z.object({ body: CreateProductCategoryRequestSchema })),
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
          schema: insertProductCategorySchema.partial(),
        },
      },
    },
  },
  responses: createApiResponse(productCategorySchema, 'Product category updated successfully'),
});

productCategoryRouter.put(`/:id`, productCategoryController.updateProductCategory);

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

productCategoryRouter.delete(`/:id`, productCategoryController.deleteProductCategory);

// Delete All Product Categories Route
productCategoryRegistry.registerPath({
  method: 'delete',
  path: '/product-categories',
  tags: ['Product Categories'],
  responses: createApiResponse(productCategorySchema, 'All product categories deleted successfully'),
});

productCategoryRouter.delete('/all', productCategoryController.deleteAllProductCategories);
