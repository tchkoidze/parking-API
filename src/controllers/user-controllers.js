import userRegistrationSchema from "../Schemas/user-registration-schema.js";
import pool from "../config/sql.js";

export const signup = async (req, res) => {
  //const { firstName, lastName, email } = req.body;
  const { body } = req;

  const validator = await userRegistrationSchema(body);

  const { value: data, error } = validator.validate(body);

  if (error) {
    // Log the validation error details
    console.log("Validation Error:", error.details);
    return res.status(422).json(error.details);
  }

  const { firstName, lastName, email, passwords } = data;

  try {
    const resultQuery = await pool.query(
      "INSERT INTO users(firstName, lastName, email, passwords) VALUES($1, $2, $3, $4)",
      [firstName, lastName, email, passwords]
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

export const deleteUser = async (req, res) => {
  const id = +req.params.id;

  try {
    await pool.query("DELETE FROM users WHERE id=$1", [id]);
    return res.status(201).json({ message: "product deleted!" });
  } catch (error) {
    return res.status(401).json(error);
  }
};
