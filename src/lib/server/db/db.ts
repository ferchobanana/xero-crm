import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

const pgClient = postgres("")
export const db = drizzle(pgClient)

