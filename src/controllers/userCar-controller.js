import pool from "../config/sql.js";

export const addCar = async (req, res) => {
  const { carName, registrationPlate, type } = req.body;
  const paramsUserId = req.params.userId;

  try {
    /*if (carName && registrationPlate && type) {
      return res.status(200).json({
        message: "Correct info",
      });
    }*/

    const user = await pool.query("SELECT * FROM users WHERE id = $1 ", [
      paramsUserId,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "User can't be identified!" });
    }

    await pool.query(
      "INSERT INTO usercar(user_id, car_name, registration_plate, type) VALUES($1, $2, $3, $4) ",
      [paramsUserId, carName, registrationPlate, type]
    );

    return res.status(201).json({ message: "user`s car added to list" });
  } catch (error) {
    return res.status(401).json(error);
  }
};
