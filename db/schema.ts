import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from '@paralleldrive/cuid2';

export const usersTable = sqliteTable("chats", {
  id: text().$defaultFn(() => createId()).primaryKey().notNull(),
  title: text().notNull(),
  created_at: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
