import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
export const app = express();

app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true, limit:"50mb"}));
app.use(cookieParser());

import { userRouter } from "./routes/userRoutes.js";
import { hotelRouter } from "./routes/hotelRoutes.js";
import { bookingRouter } from "./routes/bookingRoutes.js";

app.use("/api/v1",userRouter);
app.use("/api/v1",hotelRouter);
app.use("/api/v1",bookingRouter);
