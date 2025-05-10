import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure the WebSocket for Neon database
neonConfig.webSocketConstructor = ws;

// In development or when using localhost, skip TLS verification
// This helps avoid certificate verification issues
if (process.env.NODE_ENV === 'development' || process.env.SKIP_DB_TLS_VERIFY === 'true') {
  console.log('Running in development mode - disabling TLS verification for database connection');
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle({ client: pool, schema });