import pool from "../config/sql.js";

export const addCar = async (req, res) => {
  const { carName, registrationPlate, type } = req.body;
  const paramsUserId = req.params.userId;

  try {
    if (!carName && !registrationPlate && !type) {
      return res.status(400).json({
        message: "Inorrect info",
      });
    }

    const user = await pool.query("SELECT * FROM users WHERE id = $1 ", [
      paramsUserId,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "User can't be identified!" });
    }

    await pool.query(
      "INSERT INTO usercar(userId, carName, registrationPlate, type) VALUES($1, $2, $3, $4) ",
      [paramsUserId, carName, registrationPlate, type]
    );

    return res.status(201).json({ message: "user`s car added to list" });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const updateCar = async (req, res) => {
  //const { body } = req;
  const { carName, registrationPlate, type } = req.body;
  const id = req.params.userId;
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1 ", [
      paramsUserId,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "User can't be identified!" });
    }

    const car = await pool.query("SELECT * FROM usercar WHERE userId = $1 ", [
      id,
    ]);
    if (car.rows.length === 0) {
      return res.status(400).json({ message: "Car did'not find" });
    }
    await pool.query(
      "UPDATE usercar SET  carName=$1, registrationPlate=$2, type=$3 WHERE userId = $4",
      [carName, registrationPlate, type, id]
    );

    return res.status(204).json({ message: "Car updated" });
  } catch (error) {
    return res.status(401).json(error);
  }
};
