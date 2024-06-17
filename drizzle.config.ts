import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./src/lib/server/db/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://hnosjotape:unEOwWF6gqX9@ep-lucky-pond-a52sle5e.us-east-2.aws.neon.tech/waboost?sslmode=require",
  },
  verbose: true,
  strict: true,
})