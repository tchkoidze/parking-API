import express from "express";
import {
  deleteUser,
  emailVerification,
  getAllUsers,
  login,
  passwordRecovery,
  passwordReset,
  signup,
} from "../controllers/user-controllers.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/recovery", passwordRecovery);
userRouter.post("/reset", passwordReset);
userRouter.post("/verify", emailVerification);
userRouter.get("/users", getAllUsers);
userRouter.delete("/users/:id", deleteUser);
export default userRouter;
