import pgk from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pgk;

const pool = new Pool({
  host: process.env.POSTGRE_HOST,
  port: process.env.POSTGRE_PORT,
  database: process.env.POSTGRE_DATABASE,
  user: process.env.POSTGRE_USER,
  password: process.env.POSTGRE_PASSWORD,
});

export const createUserTable = async () => {
  return await pool.query(
    "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, firstName TEXT, lastName TEXT, email TEXT, password TEXT, balance DECIMAL(18, 2) DEFAULT 100, verify BOOLEAN DEFAULT FALSE)"
  );
};

// Create the 'verifications' table if it doesn't exist
export const createVerificationsTable = async () => {
  return await pool.query(
    "CREATE TABLE IF NOT EXISTS verifications(id SERIAL PRIMARY KEY, hash TEXT, email TEXT)"
  );
};

// Create the 'recovery' table if it doesn't exist
export const createPasswordRecoveryTable = async () => {
  return await pool.query(
    "CREATE TABLE IF NOT EXISTS passwordRecoverys(id SERIAL PRIMARY KEY, recoveryToken TEXT, email TEXT)"
  );
};

export default pool;
