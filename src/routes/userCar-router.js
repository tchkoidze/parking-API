import express from "express";
import { addCar, updateCar } from "../controllers/userCar-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const userCarRouter = express.Router();

userCarRouter.post("/usercar/:userId", authMiddleware, addCar);
userCarRouter.put("/usercar/:userId", authMiddleware, updateCar);

export default userCarRouter;
