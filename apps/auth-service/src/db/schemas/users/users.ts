import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import crypto from 'crypto';

export const users = pgTable('users', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text().notNull(),
  email: text().notNull(),
  password: text(),
  emailVerified: timestamp({ mode: 'date' }),
  image: text(),
});
