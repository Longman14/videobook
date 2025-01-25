import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { config } from 'dotenv';

config({ path: '.env.local' });

const databaseUrl = process.env.NEXT_PUBLIC_DB_CONNECTION_STRING;

if (!databaseUrl) {
  throw new Error("Database connection string is not defined in NEXT_PUBLIC_DB_CONNECTION_STRING");
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

export { db };
