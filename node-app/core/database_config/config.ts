import 'dotenv/config';

// PostgreSQL configurations
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_HOST = process.env.POSTGRES_HOST;
console.log("Database" ,process.env.POSTGRES_DB)
export const POSTGRES_DB = process.env.POSTGRES_DB;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT as string, 10);