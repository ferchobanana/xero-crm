import { defineConfig } from 'drizzle-kit'

export default defineConfig({
 schema: "./schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: "",
  },
  verbose: true,
  strict: true,
})