import express from "express";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const app = express();

app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true, limit:"50mb"}));
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

import { userRouter } from "./routes/userRoutes.js";
import { hotelRouter } from "./routes/hotelRoutes.js";
import { bookingRouter } from "./routes/bookingRoutes.js";

app.use("/api/v1",userRouter);
app.use("/api/v1",hotelRouter);
app.use("/api/v1",bookingRouter);
