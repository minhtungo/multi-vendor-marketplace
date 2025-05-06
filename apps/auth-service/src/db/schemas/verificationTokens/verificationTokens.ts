import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import crypto from "crypto";
import { users } from "@/db/schemas/users";

export const verificationTokens = pgTable("verificationTokens", {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	token: text().notNull(),
	expires: timestamp({ mode: "date" }).notNull(),
	userId: text()
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
});
