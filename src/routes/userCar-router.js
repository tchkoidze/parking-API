import express from "express";
import { addCar } from "../controllers/userCar-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const userCarRouter = express.Router();

userCarRouter.post("/usercar/:userId", authMiddleware, addCar);

export default userCarRouter;
