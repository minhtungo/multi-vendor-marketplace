import { paths } from '@/configs/paths';
import { productController } from '@/controllers/product.controller';
import { insertProductSchema, productSchema } from '@/db/schemas/products';
import { createApiResponse } from '@/docs/openAPIResponseBuilders';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { z } from 'zod';

export const productRegistry = new OpenAPIRegistry();
export const productRouter: Router = Router();

// Get Single Product Route
// productRegistry.registerPath({
//   method: 'get',
//   path: `${paths.product}/{id}`,
//   tags: ['Products'],
//   request: {
//     params: z.object({
//       id: z.string().uuid(),
//     }),
//   },
//   responses: createApiResponse(
//     z.object({
//       id: z.string().uuid(),
//       name: z.string(),
//       slug: z.string(),
//       price: z.number(),
//       vendorId: z.string().uuid(),
//       createdAt: z.string().datetime(),
//       updatedAt: z.string().datetime(),
//     }),
//     'Product retrieved successfully'
//   ),
// });

productRouter.get(`${paths.product}/:id`, productController.getProduct);

// Get All Products Route with Pagination
productRegistry.registerPath({
  method: 'get',
  path: paths.products,
  tags: ['Products'],
  request: {
    query: z.object({
      page: z.string().transform(Number).default('1'),
      limit: z.string().transform(Number).default('20'),
    }),
  },
  responses: createApiResponse(
    z.object({
      products: z.array(productSchema),
      pagination: z.object({
        total: z.number(),
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
      }),
    }),
    'Products retrieved successfully'
  ),
});

productRouter.get(paths.products, productController.getAllProducts);

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

// Update Product Route
productRegistry.registerPath({
  method: 'put',
  path: '/product/{id}',
  tags: ['Products'],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        'application/json': {
          schema: insertProductSchema.partial(),
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
    'Product updated successfully'
  ),
});

productRouter.put(`${paths.product}/:id`, productController.updateProduct);

// Delete All Products Route
productRegistry.registerPath({
  method: 'delete',
  path: `${paths.products}/all`,
  tags: ['Products'],
  responses: createApiResponse(z.null(), 'All products deleted successfully'),
});

productRouter.delete(`${paths.products}/all`, productController.deleteAllProducts);

// Delete Product Route
productRegistry.registerPath({
  method: 'delete',
  path: `${paths.product}/{id}`,
  tags: ['Products'],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: createApiResponse(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
      price: z.number(),
    }),
    'Product deleted successfully'
  ),
});

productRouter.delete(`${paths.product}/:id`, productController.deleteProduct);
