import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import crypto from 'crypto';

export const twoFactorTokens = pgTable('twoFactorTokens', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  token: text().notNull(),
  expires: timestamp({ mode: 'date' }).notNull(),
  email: text().notNull(),
});
