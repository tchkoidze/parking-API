import express from "express";
import {
  addCar,
  getUsersCars,
  updateCar,
} from "../controllers/userCar-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const userCarRouter = express.Router();

userCarRouter.post("/usercar/:userId", authMiddleware, addCar);
userCarRouter.put("/usercar/:carId", authMiddleware, updateCar);
userCarRouter.get("/usercars/:userId", authMiddleware, getUsersCars);
userCarRouter.delete("/usercar/:carId", authMiddleware, deleteCar);

export default userCarRouter;
