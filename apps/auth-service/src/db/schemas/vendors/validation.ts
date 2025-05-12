import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { vendors } from './vendors';

export const insertVendorSchema = createInsertSchema(vendors);
export const VendorSchema = createSelectSchema(vendors);

export type InsertVendor = typeof vendors.$inferInsert;
export type Vendor = typeof vendors.$inferSelect;
