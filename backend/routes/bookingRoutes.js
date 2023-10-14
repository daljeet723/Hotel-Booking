import express from "express";
import { isUserLogin } from "../middleware/UserAccess.js";
import { bookHotel, getUserBooking } from "../controller/BookingController.js";

export const bookingRouter = express.Router();

bookingRouter.route("/bookHotel/new").post(isUserLogin,bookHotel);
bookingRouter.route("/userBookings/:userId").get(isUserLogin, getUserBooking);