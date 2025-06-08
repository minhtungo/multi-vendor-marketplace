import { pgEnum } from 'drizzle-orm/pg-core';

export const vendorStatusSchema = pgEnum('vendor_status', ['pending', 'active', 'suspended']);
export const shopStatusSchema = pgEnum('shop_status', ['draft', 'published', 'suspended']);
