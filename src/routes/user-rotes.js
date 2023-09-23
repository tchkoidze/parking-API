import express from "express";
import { getAllUsers, signup } from "../controllers/user-controllers.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.get("/users", getAllUsers);

export default userRouter;
