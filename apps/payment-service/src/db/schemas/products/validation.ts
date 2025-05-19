import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { products } from './products';

export const insertProductSchema = createInsertSchema(products);
export const productSchema = createSelectSchema(products);

export type InsertProduct = typeof products.$inferInsert;
export type Product = typeof products.$inferSelect;
