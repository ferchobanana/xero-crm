import { pgTable, serial, varchar, text, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core"

export const usersTable = pgTable('users', {
    id: text('id').primaryKey(),
    email: text('email').unique(),
    userName: varchar('user_name', { length: 50 }),
    password: text('password'),
    type: text('type'),
    data: jsonb('data'),
    urlProfilePicture: text('url_profile_picture'),
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

export const configsTable = pgTable('configs', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull().references(() => usersTable.id),
    APIToken: text('API_token').notNull(),
    datasetID: text('dataset_id').notNull()
})

export const eventsTable = pgTable('events', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull().references(() => usersTable.id),
    eventData: jsonb('event_data').notNull(),
    type: text('type').notNull(),
    createtAt: timestamp('created_at').defaultNow()
})