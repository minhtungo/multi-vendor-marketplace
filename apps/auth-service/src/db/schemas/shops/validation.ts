import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { shops } from './shops';

export const insertShopSchema = createInsertSchema(shops);
export const ShopSchema = createSelectSchema(shops);

export type InsertShop = typeof shops.$inferInsert;
export type Shop = typeof shops.$inferSelect;
