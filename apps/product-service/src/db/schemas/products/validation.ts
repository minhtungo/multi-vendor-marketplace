import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { products } from './products';

export const insertProductSchema = createInsertSchema(products, {
  // Handle string to number coercion for quantity
  stock: z.union([z.number(), z.string().transform(Number)]).pipe(z.number()),
  // Handle string to number coercion for price
  price: z.union([z.number(), z.string().transform(Number)]).pipe(z.number()),
  // Handle optional compareAtPrice with coercion
  compareAtPrice: z
    .union([z.number(), z.string().transform(Number)])
    .pipe(z.number())
    .optional(),
  // Ensure vendorId is a valid UUID string
  vendorId: z.string().uuid('Invalid vendor ID format'),
});

// Schema for create product requests (excludes vendorId since it comes from user context)
export const createProductRequestSchema = insertProductSchema.omit({
  vendorId: true,
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const productSchema = createSelectSchema(products);

export type InsertProduct = typeof products.$inferInsert;
export type Product = typeof products.$inferSelect;
export type CreateProductRequest = z.infer<typeof createProductRequestSchema>;
