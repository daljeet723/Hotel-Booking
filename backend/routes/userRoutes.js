import express from "express";
import { forgotPassword, 
    getAllUsers, 
    registerUser,
    userLogin, 
    userLogout } from "../controller/UserController.js";
import { isUserLogin } from "../middleware/UserAccess.js";

export const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(userLogin);
userRouter.route("/logout").get(userLogout);
userRouter.route("/users").get(getAllUsers);
userRouter.route("/forgotPassword").post(forgotPassword)
