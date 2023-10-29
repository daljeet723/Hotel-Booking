import express from "express";
import { addHotel, allHotels, getHotelDetail, updateHotel } from "../controller/HotelController.js";
import { isUserLogin } from "../middleware/UserAccess.js";

export const hotelRouter = express.Router();

//HOTEL ROUTES
hotelRouter.route("/addHotel").post(isUserLogin, addHotel);
hotelRouter.route("/hotels").get(allHotels);
hotelRouter.route("/admin/updateHotel/:id").put(isUserLogin,updateHotel);
hotelRouter.route("/hotel/:id").get(getHotelDetail)