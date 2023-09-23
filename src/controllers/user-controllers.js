import pool from "../config/sql.js";

export const signup = async (req, res) => {
  const { firstMame, lastName, email } = req.body;

  try {
    const resultQuery = await pool.query(
      "INSERT INTO users(firstName, lastName, email) VALUES($1, $2, $3)",
      [firstName, lastName, email]
    );
    const row = resultQuery.rows;
    return res.status(201).json(row);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const getAllUsers = async (_, response) => {
  try {
    const resultQuery = await pool.query("SELECT * FROM users");
    const rows = resultQuery.rows;
    return response.status(200).json(rows);
  } catch (error) {
    return response.status(401).json(error);
  }
};
