import express from "express";
import {
  addCar,
  getUserCars,
  updateCar,
} from "../controllers/userCar-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const userCarRouter = express.Router();

userCarRouter.post("/usercar/:userId", authMiddleware, addCar);
userCarRouter.put("/usercar/:userId", authMiddleware, updateCar);
userCarRouter.get("/usercars/:userId", authMiddleware, getUserCars);

export default userCarRouter;
