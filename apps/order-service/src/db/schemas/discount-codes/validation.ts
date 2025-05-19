import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { discountCodes } from './discount-codes';

export const insertDiscountCodeSchema = createInsertSchema(discountCodes);
export const discountCodeSchema = createSelectSchema(discountCodes);

export type InsertDiscountCode = typeof discountCodes.$inferInsert;
export type DiscountCode = typeof discountCodes.$inferSelect;
