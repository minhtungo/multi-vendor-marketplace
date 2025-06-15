import { productCategoryController } from '@/controllers/product-category.controller';
import {
  categorySchema,
  CreateProductCategorySchema,
  DeleteProductCategorySchema,
  GetProductCategorySchema,
  UpdateProductCategorySchema,
} from '@/models/product-categories.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { validateRequest } from '@repo/shared-server/middlewares';
import { Router } from 'express';
import { z } from 'zod/v4';

export const productCategoryRegistry = new OpenAPIRegistry();
export const productCategoryRouter: Router = Router();

// GET: Retrieve all product categories
productCategoryRegistry.registerPath({
  method: 'get',
  path: '/categories',
  tags: ['ProductCategories'],
  responses: createApiResponse(z.array(categorySchema), 'Categories retrieved successfully'),
});

productCategoryRouter.get('/', productCategoryController.getAllProductCategories);

// GET: Retrieve specific product category by ID
productCategoryRegistry.registerPath({
  method: 'get',
  path: '/categories/{id}',
  tags: ['ProductCategories'],
  request: {
    params: GetProductCategorySchema.shape.params,
  },
  responses: createApiResponse(categorySchema, 'Category retrieved successfully'),
});

productCategoryRouter.get(
  '/:id',
  validateRequest(GetProductCategorySchema),
  productCategoryController.getProductCategory
);

// POST: Create new product category
productCategoryRegistry.registerPath({
  method: 'post',
  path: '/categories',
  tags: ['ProductCategories'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateProductCategorySchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(categorySchema, 'Category created successfully'),
});

productCategoryRouter.post(
  '/',
  validateRequest(CreateProductCategorySchema),
  productCategoryController.createProductCategory
);

// PUT: Update existing product category
productCategoryRegistry.registerPath({
  method: 'put',
  path: '/categories/{id}',
  tags: ['ProductCategories'],
  request: {
    params: UpdateProductCategorySchema.shape.params,
    body: {
      content: {
        'application/json': {
          schema: UpdateProductCategorySchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(categorySchema, 'Category updated successfully'),
});

productCategoryRouter.put(
  '/:id',
  validateRequest(UpdateProductCategorySchema),
  productCategoryController.updateProductCategory
);

// DELETE: Remove all product categories
productCategoryRegistry.registerPath({
  method: 'delete',
  path: '/categories/all',
  tags: ['ProductCategories'],
  responses: createApiResponse(z.null(), 'All categories deleted successfully'),
});

productCategoryRouter.delete('/all', productCategoryController.deleteAllProductCategories);

// DELETE: Remove specific product category by ID
productCategoryRegistry.registerPath({
  method: 'delete',
  path: '/categories/{id}',
  tags: ['ProductCategories'],
  request: {
    params: DeleteProductCategorySchema.shape.params,
  },
  responses: createApiResponse(z.null(), 'Category deleted successfully'),
});

productCategoryRouter.delete(
  '/:id',
  validateRequest(DeleteProductCategorySchema),
  productCategoryController.deleteProductCategory
);
