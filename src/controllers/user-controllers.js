import pool from "../config/sql.js";

export const signup = async (req, res) => {
  const { firstMame, lastName, email } = req.body;

  try {
    const resultQuery = await pool.query(
      "INSERT INTO users(firstName, lastName, email) VALUES($1, $2, $3)",
      [firstMame, lastName, email]
    );
    const row = resultQuery.rows;
    return res.status(201).json(row);
  } catch (error) {
    return res.status(401).json(error);
  }
};
