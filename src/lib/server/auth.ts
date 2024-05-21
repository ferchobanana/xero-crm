import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { db } from "./db/db"
import { usersTable, sessionsTable } from "./db/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionsTable, usersTable); // your adapter

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}