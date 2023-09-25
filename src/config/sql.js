import pgk from "pg";
const { Pool } = pgk;

const pool = new Pool({
  //host: "dpg-ck7ai4fsasqs73a1rkr0-a",
  host: "dpg-ck84vmfq54js73anapc0-a",
  port: 5432,
  //database: "parking_tz9v",
  database: "parking_sql_66tz",
  //user: "parking_tz9v_user",
  user: "parking_sql_66tz_user",
  //password: "KiQ0S15Wfmw789wWVdsC5yuLI0sTn31Z",
  password: "ZYaCb5VwD4WELgTcCOmh2wdI8WFWXNQE",
});

export const createUserTable = async () => {
  return await pool.query(
    "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, firstName TEXT, lastName TEXT, email TEXT, password TEXT)"
  );
};

// Create the 'verifications' table if it doesn't exist
export const createVerificationsTable = async () => {
  return await pool.query(
    "CREATE TABLE IF NOT EXISTS verifications(id SERIAL PRIMARY KEY, hash TEXT, email TEXT)"
  );
};

export default pool;
