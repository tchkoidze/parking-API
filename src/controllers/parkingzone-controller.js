import parkingZoneSchema from "../Schemas/parkingZone-schema.js";
import pool from "../config/sql.js";

export const addParkingZone = async (req, res) => {
  const { body } = req;
  try {
    const validator = await parkingZoneSchema(body);
    const { parkingName, address, hourlyCost } = validator.validateAsync(body);

    await pool.query(
      "INSERT INTO parkingzone(parkingName, address, hourlyCost) VALUES ($1, $2, $3)",
      [parkingName, address, hourlyCost]
    );

    return res.status(200).json({ message: "Parking zone created!" });
  } catch (error) {
    return res.status(401).json(error);
  }
};
