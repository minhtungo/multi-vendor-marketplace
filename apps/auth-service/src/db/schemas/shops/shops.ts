import crypto from 'crypto';
import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { vendors } from '@/db/schemas/vendors';
import { shopStatusSchema } from '@/db/schemas/constants';

export const shops = pgTable('shops', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  vendorId: text()
    .notNull()
    .references(() => vendors.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  description: text(),
  slug: text().notNull().unique(),
  logo: text(),
  banner: text(),
  address: text(),
  city: text(),
  state: text(),
  country: text(),
  postalCode: text(),
  phoneNumber: text(),
  email: text(),
  website: text(),
  isActive: boolean().default(true),
  isVerified: boolean().default(false),
  status: shopStatusSchema().default('draft'),
  createdAt: timestamp({ mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'date' }).notNull().defaultNow(),
});
