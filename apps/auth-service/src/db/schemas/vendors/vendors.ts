import crypto from 'crypto';
import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { users } from '@/db/schemas/users';
import { vendorStatusSchema } from '@/db/schemas/constants';

export const vendors = pgTable('vendors', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text().notNull(),
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
