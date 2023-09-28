import pool from "../config/sql.js";

const registerCar = async (req, res) => {
  const { car_name, registration_plate, type } = req.body;
  try {
    if (car_name && registration_plate && type) {
      return res.status(200).json({
        message: "Correct info",
      });
    }
    await pool.query(
      "INSERT INTO usercar(user_id, car_name, registration_plate, type) VALUES($1, $2, $3, $4) ",
      [car_name, registration_plate, type]
    );
  } catch (error) {}
};
