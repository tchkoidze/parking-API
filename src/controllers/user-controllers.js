import userRegistrationSchema from "../Schemas/user-registration-schema.js";
import pool from "../config/sql.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  const { firstName, lastName, email, password } = data;

  /*const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);*/

  try {
    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const verificationHash = crypto.randomBytes(48).toString("hex");

    const salt = 10;
    // Hash the user's password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, salt);

    //const verificationQuery =
    await pool.query("INSERT INTO verifications(hash, email) VALUES($1, $2) ", [
      verificationHash,
      email,
    ]);

    // Simulate sending an email by logging the token and email
    console.log(
      `Simulated email sent to ${email}. Verification Token: ${verificationHash}`
    );

    await pool.query(
      "INSERT INTO users(firstName, lastName, email, password) VALUES($1, $2, $3, $4)",
      [firstName, lastName, email, hashedPassword]
    );
    return res.status(201).json({
      message: "user signed up. Verification token sent.",
      verificationHash,
    });
  } catch (error) {
    return res.status(401).json(error);
  }

  /*if (!user) {
    const salt = 10;

    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationQuery = await pool.query(
      "INSERT INTO verifications(hash, email) VALUES($1, $2) ",
      [hash, email]
    );
  }*/

  /*try {
    const resultQuery = await pool.query(
      "INSERT INTO users(firstName, lastName, email, password) VALUES($1, $2, $3, $4)",
      [firstName, lastName, email, password]
    );
    const row = resultQuery.rows;
    return res.status(201).json(row);
  } catch (error) {
    return res.status(401).json(error);
  }*/
};

export const login = async (req, res) => {
  const { body } = req;

  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND verify=$2",
      [body.email, true]
    );

    //!user
    if (user.rows.length > 0) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    const isMatch = await bcrypt.compare(body.password, user.rows[0].password);

    if ((body.email === user.rows[0].email) & isMatch) {
      const token = jwt.sign(user.rows[0].email, process.env.JWT_SECRET);

      return res.status(200).json({ message: "Login successful!", token });
    } else {
      return res.status(402).json({ message: "Incorrect email or password." });
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};

// Endpoint to simulate email verification
export const emailVerification = async (req, res) => {
  const { email, token } = req.body;
  if (email & token) {
    const verifiedEmail = await pool.query(
      `SELECT * FROM verifications WHERE email = $1`,
      [email]
    );

    if (verifiedEmail.rows[0].hash === token) {
      return res.status(200).json({ message: "Email verified successfully." });
      //verify user
      await pool.query("INSERT INTO users(verify) VALUES($1) ", [true]);
    } else {
      return res.status(400).json({ message: "Invalid verification token." });
    }
  } else {
    return res.status(400).json({ message: "Invalid request." });
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
