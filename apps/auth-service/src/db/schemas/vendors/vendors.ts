import { vendorStatusSchema } from '@/db/schemas/constants';
import crypto from 'crypto';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const vendors = pgTable('vendors', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text().notNull(),
  email: text().notNull(),
  password: text(),
  description: text(),
  phoneNumber: text(),
  address: text(),
  city: text(),
  state: text(),
  country: text(),
  postalCode: text(),
  website: text(),
  status: vendorStatusSchema().default('pending'),

  // Stripe related fields
  stripeId: text(), // Connected Stripe account ID

  createdAt: timestamp({ mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'date' }).notNull().defaultNow(),
});
