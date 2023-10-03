import { Hotel } from "../model/HotelModel.js"
import { ErrorHandler } from "../utils/ErrorHandler.js";

//ADD HOTEL
//Update hotel
//Retrieve a List of Hotels
//Search Hotels:
//Hotel Images and Media:
//User Reviews and Ratings:
//Booking and Reservations: Implement APIs for users to make hotel reservations.
// This can include checking room availability, booking rooms, and managing reservations

//CREATE HOTEL
export const addHotel = async (req, res) => {
    try {
        //it will check whether token is available in headers or not
        // req.user.id comes from isUserLogin api in middleware function
        req.body.user = req.user.id;

        // Check if a hotel with the same name already exists
        const existingHotel = await Hotel.findOne({ hotelName: req.body.hotelName });

        if (existingHotel) {
            return res.status(401).json({
                success: false,
                message: `Hotel '${req.body.hotelName}' already exists.`,
            });
        } else {
            // Hotel with the same name doesn't exist, so create a new hotel document
            const hotel = await Hotel.create(req.body);

            return res.status(200).json({
                success: true,
                message: "Congratulations, your hotel is registered successfully.",
                hotel,
            });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL HOTELS
export const allHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        return res.status(200).json({
            success: true,
            hotels
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//UPDATE HOTEL DETAILS
export const updateHotel = async (req, res,next) => {
    // const { id: hotelId } = req.query;
    try {
        let hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            return next(new ErrorHandler("Hotel not found", 404))
        }

        //findByIdAndModify(id, what to update, optional)
        hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        )
        res.status(200).json({
            success: true,
            message:"Hotel details updated successfully",
            hotel
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}



//Payment Integration
//Location-Based Services:
//Multi-Language Support
//Key Technologies:
