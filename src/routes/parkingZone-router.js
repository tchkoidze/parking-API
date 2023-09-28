import express from "express";
import {
  addParkingZone,
  getAllParkingZone,
  updateParkingZone,
} from "../controllers/parkingzone-controller.js";

const parkingZoneRouter = express.Router();

parkingZoneRouter.post("/parkingZone", addParkingZone);
parkingZoneRouter.get("/parkingZone", getAllParkingZone);
parkingZoneRouter.get("/parkingZone/:parkingId", updateParkingZone);

export default parkingZoneRouter;
