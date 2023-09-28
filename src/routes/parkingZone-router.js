import express from "express";
import {
  addParkingZone,
  deleteParkingZone,
  getAllParkingZone,
  updateParkingZone,
} from "../controllers/parkingzone-controller.js";

const parkingZoneRouter = express.Router();

parkingZoneRouter.post("/parkingZone", addParkingZone);
parkingZoneRouter.get("/parkingZone", getAllParkingZone);
parkingZoneRouter.put("/parkingZone/:parkingId", updateParkingZone);
parkingZoneRouter.delete("/parkingZone/:parkingId", deleteParkingZone);

export default parkingZoneRouter;
