import express from "express";
import { getAllUsers, registerUser, userLogin } from "../controller/UserController.js";


export const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(userLogin);
userRouter.route("/users").get(getAllUsers);
