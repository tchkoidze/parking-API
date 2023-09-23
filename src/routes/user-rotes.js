import express from "express";
import {
  deleteUser,
  getAllUsers,
  signup,
} from "../controllers/user-controllers.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.get("/users", getAllUsers);
userRouter.delete("/users/:id", deleteUser);
export default userRouter;
