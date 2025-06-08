import crypto from 'node:crypto';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const twoFactorConfirmations = pgTable('twoFactorConfirmations', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: uuid(),
});
