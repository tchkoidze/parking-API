import express from "express";
import { addParkingZone } from "../controllers/parkingzone-controller.js";

const parkingZoneRouter = express.Router();

parkingZoneRouter.post("/parkingZone", addParkingZone);

export default parkingZoneRouter;
