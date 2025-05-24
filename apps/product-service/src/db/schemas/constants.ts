import { pgEnum } from 'drizzle-orm/pg-core';

export const statusSchema = pgEnum('status', ['published', 'draft']);
export const productTypeSchema = pgEnum('type', ['physical', 'digital']);
export const productCategoryStatusSchema = pgEnum('product_category_status', ['active', 'inactive']);
