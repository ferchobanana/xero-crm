import { pgTable, serial, varchar, text, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core"

export const usersTable = pgTable('users', {
    id: text('id').primaryKey(),
    userName: varchar('user_name', { length: 50 }),
    email: text('email').unique(),
    passwordHash: text('password_hash'),
    createdAt: timestamp('created_at').defaultNow()
})

export const sessionsTable = pgTable('sessions', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => usersTable.id),
    expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: "date"
	}).notNull()
})