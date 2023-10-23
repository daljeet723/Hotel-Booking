import { Hotel } from "../model/HotelModel.js"
import { ErrorHandler } from "../utils/ErrorHandler.js";
import ApiFeatures from "../utils/ApiFeatures.js";

//ADD HOTEL -- done
//Retrieve a List of Hotels -- done
//Update hotel --2
//Search Hotels: -- 3
//Hotel Images and Media:
//User Reviews and Ratings:


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
        const resultPerPage = 8;
        const hotelCount = await Hotel.countDocuments();
        
        const apiFeatures = new ApiFeatures(Hotel.find(),req.query)
        .search()
        .filter();
        

        //count hotels available after search query
        let hotels = await apiFeatures.query;
        let filteredHotelCount = hotels.length;

        //use clone as below query is already executed above
        hotels = await apiFeatures.query.clone();

         res.status(200).json({
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
