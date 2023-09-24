import pgk from "pg";
const { Pool } = pgk;

const pool = new Pool({
  //host: "dpg-ck7ai4fsasqs73a1rkr0-a",
  host: "dpg-ck84njvsasqs73bp3pgg-a",
  port: 5432,
  //database: "parking_tz9v",
  database: "parking_sql",
  //user: "parking_tz9v_user",
  user: "parking_sql_user",
  //password: "KiQ0S15Wfmw789wWVdsC5yuLI0sTn31Z",
  password: "JcshoqBKlvyyovLGVEOp5LSkrpf48eXg",
});

export const createUserTable = async () => {
  return await pool.query(
    "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, firstName TEXT, lastName TEXT, email TEXT, passwords TEXT)"
  );
};

export default pool;
