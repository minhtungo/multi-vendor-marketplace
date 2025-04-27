import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { accounts } from "./accounts";

export const insertAccountSchema = createInsertSchema(accounts);
export const AccountSchema = createSelectSchema(accounts);

export type InsertAccount = typeof accounts.$inferInsert;
export type Account = typeof accounts.$inferSelect;
