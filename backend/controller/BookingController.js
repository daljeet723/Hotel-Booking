import { Booking } from "../model/Booking.js"


//Booking and Reservations: Implement APIs for users to make hotel reservations.
// This can include checking room availability, booking rooms, and managing reservations
export const bookHotel = async (req, res) => {
    try {
        const { checkInDate, checkOutDate, noOfGuest, roomType,
            paymentInfo,hotelInfo, totalPrice } = req.body;

        const booking = await Booking.create({
            checkInDate, checkOutDate, noOfGuest, roomType,
            paymentInfo, totalPrice,
            hotelInfo,
            bookAt: Date.now(),
            user:req.user._id,
        });

        return res.status(200).json({
            success: true,
            message: "Thank You, Your booking confirmed successfully",
            booking
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getUserBooking = async (req, res) => {
    try {
        const { userId } = req.params;

        //userId is a field in Booking model
        const bookings = await Booking.find({ userId });

        if (!bookings) {
            return res.status(404).json({
                success: false,
                message: "No bookings found"
            })
        }
        else {
            return res.status(200).json({
                success: true,
                bookings
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}