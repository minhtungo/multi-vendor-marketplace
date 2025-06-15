import { csvUpload } from '@/configs/multer';
import { productController } from '@/controllers/product.controller';
import {
  CreateProductSchema,
  DeleteProductSchema,
  GetProductSchema,
  GetProductsSchema,
  productListResponseSchema,
  productSchema,
  UpdateProductSchema,
} from '@/models/product.model';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@repo/shared-server/docs';
import { validateRequest } from '@repo/shared-server/middlewares';
import { Router } from 'express';
import { z } from 'zod/v4';

export const productRegistry = new OpenAPIRegistry();
export const productRouter: Router = Router();

// GET: Retrieve all products with pagination
//TODO: separate get products for vendor and public
productRegistry.registerPath({
  method: 'get',
  path: '/products',
  tags: ['Products'],
  request: {
    query: GetProductsSchema.shape.query?.unwrap(),
  },
  responses: createApiResponse(productListResponseSchema, 'Products retrieved successfully'),
});

productRouter.get('/', validateRequest(GetProductsSchema), productController.getProducts);

// GET: Retrieve single product by query parameters
productRegistry.registerPath({
  method: 'get',
  path: `/products`,
  tags: ['Products'],
  request: {
    query: GetProductSchema.shape.query,
  },
  responses: createApiResponse(productSchema, 'Product retrieved successfully'),
});

productRouter.get(`/list`, validateRequest(GetProductSchema), productController.getProduct);

// POST: Create new product
productRegistry.registerPath({
  method: 'post',
  path: '/products',
  tags: ['Products'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateProductSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(productSchema, 'Product created successfully'),
});

productRouter.post('/', validateRequest(CreateProductSchema), productController.createProduct);

// POST: Import products from CSV file
productRegistry.registerPath({
  method: 'post',
  path: '/projects/import',
  tags: ['Projects'],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            file: z.instanceof(File).describe('CSV file to upload'),
            projectName: z.string().optional().describe('Optional project name'),
          }),
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Products imported successfully'),
});

productRouter.post('/import', csvUpload.any(), productController.importProducts);

// PUT: Update existing product
productRegistry.registerPath({
  method: 'put',
  path: `/products/{id}`,
  tags: ['Products'],
  request: {
    params: UpdateProductSchema.shape.params,
    body: {
      content: {
        'application/json': {
          schema: UpdateProductSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(z.null(), 'Product updated successfully'),
});

productRouter.put(`/:id`, validateRequest(UpdateProductSchema), productController.updateProduct);

// DELETE: Remove all products
productRegistry.registerPath({
  method: 'delete',
  path: `/products/all`,
  tags: ['Products'],
  responses: createApiResponse(z.null(), 'All products deleted successfully'),
});

productRouter.delete(`/all`, productController.deleteAllProducts);

// DELETE: Remove specific product by ID
productRegistry.registerPath({
  method: 'delete',
  path: `/products/{id}`,
  tags: ['Products'],
  request: {
    params: DeleteProductSchema.shape.params,
  },
  responses: createApiResponse(z.null(), 'Product deleted successfully'),
});

productRouter.delete(`/:id`, validateRequest(DeleteProductSchema), productController.deleteProduct);
