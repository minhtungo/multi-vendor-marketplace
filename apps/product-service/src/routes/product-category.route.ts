import { paths } from '@/configs/paths';
import { productCategoryController } from '@/controllers/product-category.controller';
import { insertProductCategorySchema, productCategorySchema } from '@/db/schemas/product-categories';
import { createApiResponse } from '@/docs/openAPIResponseBuilders';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';

export const productCategoryRegistry = new OpenAPIRegistry();
export const productCategoryRouter: Router = Router();

// Get All Product Categories Route
productCategoryRegistry.registerPath({
  method: 'get',
  path: paths.productCategories,
  tags: ['Product Categories'],
  responses: createApiResponse(z.array(productCategorySchema), 'Product categories retrieved successfully'),
});

productCategoryRouter.get(paths.productCategories, productCategoryController.getAllProductCategories);

// Get Single Product Category Route
productCategoryRegistry.registerPath({
  method: 'get',
  path: `${paths.productCategories}/{id}`,
  tags: ['Product Categories'],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: createApiResponse(productCategorySchema, 'Product category retrieved successfully'),
});

productCategoryRouter.get(`${paths.productCategories}/:id`, productCategoryController.getProductCategory);

// Create Product Category Route
productCategoryRegistry.registerPath({
  method: 'post',
  path: paths.productCategories,
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

productCategoryRouter.post(paths.productCategories, productCategoryController.createProductCategory);

// Update Product Category Route
productCategoryRegistry.registerPath({
  method: 'put',
  path: `${paths.productCategories}/{id}`,
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

productCategoryRouter.put(`${paths.productCategories}/:id`, productCategoryController.updateProductCategory);

// Delete Product Category Route
productCategoryRegistry.registerPath({
  method: 'delete',
  path: `${paths.productCategories}/{id}`,
  tags: ['Product Categories'],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: createApiResponse(productCategorySchema, 'Product category deleted successfully'),
});

productCategoryRouter.delete(`${paths.productCategories}/:id`, productCategoryController.deleteProductCategory);

// Delete All Product Categories Route
productCategoryRegistry.registerPath({
  method: 'delete',
  path: paths.productCategories,
  tags: ['Product Categories'],
  responses: createApiResponse(productCategorySchema, 'All product categories deleted successfully'),
});

productCategoryRouter.delete(paths.productCategories, productCategoryController.deleteAllProductCategories);
