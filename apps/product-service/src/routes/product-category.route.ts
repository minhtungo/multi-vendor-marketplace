import { productCategoryController } from '@/controllers/product-category.controller';
import { categorySchema, insertCategorySchema, updateCategorySchema } from '@/models/product-categories.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { validateRequest } from '@repo/shared-server/middlewares';
import { Router } from 'express';
import { z } from 'zod/v4';

export const productCategoryRegistry = new OpenAPIRegistry();
export const productCategoryRouter: Router = Router();

// Get All Product Categories Route
productCategoryRegistry.registerPath({
  method: 'get',
  path: '/product-categories',
  tags: ['Product Categories'],
  responses: createApiResponse(z.array(categorySchema), 'Product categories retrieved successfully'),
});

productCategoryRouter.get('/', productCategoryController.getAllProductCategories);

// Get Single Product Category Route
productCategoryRegistry.registerPath({
  method: 'get',
  path: `/product-categories/{id}`,
  tags: ['Product Categories'],
  request: {
    params: z.object({
      id: z.uuid(),
    }),
  },
  responses: createApiResponse(categorySchema, 'Product category retrieved successfully'),
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
          schema: insertCategorySchema,
        },
      },
    },
  },
  responses: createApiResponse(categorySchema, 'Product category created successfully'),
});

productCategoryRouter.post(
  '/',
  validateRequest(z.object({ body: insertCategorySchema })),
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
  responses: createApiResponse(categorySchema, 'Product category updated successfully'),
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
      id: z.uuid(),
    }),
  },
  responses: createApiResponse(categorySchema, 'Product category deleted successfully'),
});

productCategoryRouter.delete(
  `/:id`,
  validateRequest(z.object({ params: z.object({ id: z.uuid() }) })),
  productCategoryController.deleteProductCategory
);

// Delete All Product Categories Route
productCategoryRegistry.registerPath({
  method: 'delete',
  path: '/product-categories',
  tags: ['Product Categories'],
  responses: createApiResponse(z.null(), 'All product categories deleted successfully'),
});

productCategoryRouter.delete('/all', productCategoryController.deleteAllProductCategories);
