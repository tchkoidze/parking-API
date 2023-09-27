import userRegistrationSchema from "../Schemas/user-registration-schema.js";
import pool from "../config/sql.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passwordResetSchema from "../Schemas/password-reset-schema.js";
import passwordRecoverySchema from "../Schemas/password-recovery-schema.js";

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
    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Incorrect email or password. :)" });
    }
    console.log("data:", body.email, body.password);
    console.log("database email:", user.rows[0].password);

    const isMatch = await bcrypt.compare(body.password, user.rows[0].password);
    console.log("isMatch:", isMatch);

    if (isMatch) {
      const payload = {
        email: user.rows[0].email, // Include relevant data here
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      console.log("data is correct:", body.email, body.password);
      console.log("payload:", payload);

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
  const { email, hash } = req.body;
  if (email && hash) {
    const verifiedEmail = await pool.query(
      `SELECT * FROM verifications WHERE email = $1`,
      [email]
    );

    if (verifiedEmail.rows[0].hash === hash) {
      //verify user
      //await pool.query("INSERT INTO users(verify) VALUES($1) ", [true]);
      // Update the 'verify' column to true for the matching email
      await pool.query("UPDATE users SET verify = $1 WHERE email = $2", [
        true,
        email,
      ]);
      return res.status(200).json({ message: "Email verified successfully." });
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

// Endpoint to simulate sending a password reset email
export const passwordRecovery = async (req, res) => {
  //const { email } = req.body;
  const { body } = req;
  const validator = await passwordRecoverySchema(body);
  const { email } = await validator.validate(body);

  const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (user.rows.length === 0) {
    return res
      .status(400)
      .json({ message: "user with this email did'not find" });
  }

  // Check if the email exists in the database
  const recoveryToken = crypto.randomBytes(48).toString("hex");

  // Store the reset token in the database along with the email
  await pool.query(
    "INSERT INTO passwordRecoveys(recoveryToken, email) VALUES($1, $2) ",
    [recoveryToken, email]
  );

  // Log the simulated email sending
  console.log(
    `Simulated password reset email sent to ${email} with token: ${resetToken}`
  );

  return res
    .status(200)
    .json({ message: "Password reset email sent.", resetToken });
};

// Endpoint to simulate resetting the password
export const passwordReset = async (req, res) => {
  //const { email, recoveryToken, newPassword } = req.body;
  const { body } = req;

  try {
    const validator = await passwordResetSchema(body);
    const { password, recoveryToken } = await validator.validateAsync(body);

    const resetDocument = await pool.query(
      `SELECT * FROM passwordRecoveys WHERE email = $1`,
      [recoveryToken]
    );

    if (resetDocument.rows.length === 0) {
      return res.status(400).json({
        message: "There is no any request for this account to update password",
      });
    }

    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      resetDocument.rows[0].email,
    ]);

    if (user.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "user with this email did'not find" });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query("UPDATE users SET password = $1 WHERE email = $2", [
      hashedPassword,
      resetDocument.rows[0].email,
    ]);
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(401).json(error);
  }
};

////////////////
/*if (recoveryToken && password) {
  const verifiedEmail = await pool.query(
    `SELECT * FROM verifications WHERE email = $1`,
    [email]
  );

  if (verifiedEmail.rows[0].recoveryToken === recoveryToken) {
    // Reset the password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query("UPDATE users SET password = $1 WHERE email = $2", [
      hashedPassword,
      email,
    ]);

    return res.status(200).json({ message: "Password updated successfully" });
  } else {
    return res.status(400).json({ message: "Invalid email or reset token." });
  }
} else {
  return res.status(400).json({ message: "Invalid request." });
}*/

///

/*if (email) {
  // Check if the email exists in the database
  const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (user.rows[0].email) {
    // Generate a password reset token
    const recoveryToken = crypto.randomBytes(48).toString("hex");

    // Store the reset token in the database along with the email
    await pool.query(
      "INSERT INTO passwordRecoveys(recoveryToken, email) VALUES($1, $2) ",
      [recoveryToken, email]
    );

    // Log the simulated email sending
    console.log(
      `Simulated password reset email sent to ${email} with token: ${resetToken}`
    );

    return res
      .status(200)
      .json({ message: "Password reset email sent.", resetToken });
  } else {
    return res
      .status(404)
      .json({ message: "Email not found in the database." });
  }
} else {
  return res.status(400).json({ message: "Invalid request." });
}*/
