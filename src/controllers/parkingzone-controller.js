import parkingZoneSchema from "../Schemas/parkingZone-schema.js";
import pool from "../config/sql.js";

export const addParkingZone = async (req, res) => {
  const { body } = req;
  try {
    const validator = await parkingZoneSchema(body);
    const { parkingName, address, hourlyCost } = validator.validateAsync(body);

    await pool.query(
      "INSERT INTO parkingzones(parkingName, address, hourlyCost) VALUES ($1, $2, $3)",
      [parkingName, address, hourlyCost]
    );

    return res.status(200).json({ message: "Parking zone created!" });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const getAllParkingZone = async (req, res) => {
  try {
    const resultQuery = await pool.query("SELECT * FROM parkingzones");
    const rows = resultQuery.rows;
    return response.status(201).json({ message: "get user's all car!", rows });
  } catch (error) {
    return response.status(401).json(error);
  }
};

export const updateParkingZone = async (req, res) => {
  const { body } = req;
  const paramsparkingZone = req.params.parkingId;
  try {
    const validator = await parkingZoneSchema(body);
    const { parkingName, address, hourlyCost } = validator.validateAsync(body);

    const parkingZone = await pool.query(
      "SELECT * FROM parkingzones WHERE id = $1 ",
      [paramsparkingZone]
    );

    if (parkingZone.rows.length === 0) {
      return res.status(400).json({ message: "parking zone did'not find" });
    }

    await pool.query(
      "UPDATE parkingzones SET  parkingName=$1, address=$2, hourlyCost=$3 WHERE id = $4",
      [parkingName, address, hourlyCost, paramsparkingZone]
    );

    return res.status(201).json({ message: "parking zone updated" });
  } catch (error) {
    return res.status(401).json(error);
  }
};
