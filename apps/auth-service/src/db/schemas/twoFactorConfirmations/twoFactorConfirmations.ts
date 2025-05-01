import { pgTable, text } from 'drizzle-orm/pg-core';
import crypto from 'crypto';
import { users } from '@/db/schemas/users';

export const twoFactorConfirmations = pgTable('twoFactorConfirmations', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});
