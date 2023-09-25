import pgk from "pg";
const { Pool } = pgk;

const pool = new Pool({
  host: "dpg-ck8ruc7q54js73drt0qg-a",
  //host: "dpg-ck84vmfq54js73anapc0-a",
  port: 5432,
  database: "parking_akuj",
  //database: "parking_sql_66tz",
  user: "parking_akuj_user",
  //user: "parking_sql_66tz_user",
  password: "1N6727ekU4HvUFwP2TZXeH6tTX7qDVCV",
  //password: "ZYaCb5VwD4WELgTcCOmh2wdI8WFWXNQE",
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

export default pool;
