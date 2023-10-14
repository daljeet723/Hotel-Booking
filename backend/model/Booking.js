import mongoose from "mongoose";

const BookingScehma = new mongoose.Schema({
    //userId is added to the schema as a mongoose.Schema.Types.ObjectId.
    // This assumes that each user has a unique identifier of type ObjectId.
    // The ref property establishes a reference to the User model.
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model, assuming you have a User model
        required: true,
      },
    "checkInDate": {
        type: Date,
        required: [true, "Please enter check-in date"],
        validate: [
            {
                validator: function (value) {
                    return value >= new Date();
                },
                message: 'Check-in date must be greater than or equal to today',
            }
        ]

    },
    "checkOutDate": {
        type: Date,
        required: [true, "Please enter check-out date"],
        validate: [{
            validator: function (value) {
                // Check if the check-out date is greater than the check-in date
                return value > this.checkInDate;
            },
            message: 'Check-out date must be greater than check-in date',
        }],
    },
    "noOfGuest": {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                // Check if the number of guests is a positive integer
                return Number.isInteger(value) && value > 0
            },
            message: 'Number of guests must be a positive integer',
        }

    },
    "roomType": {
        type: String,
        default: 'Single Room'
    },
    "cleaningFee": {
        type: Number,
    },
    "activity": {
        type: Number,
    },
    "parkingFee": {
        type: Number,
    },
    "paymentInfo":{
        id:{
            type:String, required:true
        },
        status:{
            type:String, required:true
        }
    },
    "bookAt":{
        type:Date, required:true
    },
    "totalPrice":{
        type:Number, default:0, required:true
    },
    "hotelInfo":[
        {
            "hotelName":{
                type:String, required:true
            },
            "city":{
                type:String, required:true
            },
            "address":{
                type:String, required:true
            },
            "phoneNo":{
                type:Number, required:true
            },
            "hotel":{
                type:mongoose.Schema.ObjectId,
                ref:"Hotel",
                required:true
            }

        }   
    ]

});


export const Booking = mongoose.model("Booking", BookingScehma)

//Here's a breakdown of the hotelInfo field in your Mongoose schema:

//type: mongoose.Schema.ObjectId: 
    //Specifies that the field should be of type ObjectId. This is the type used for MongoDB's unique identifiers.

//ref: "Hotel": 
    //Specifies that this field is a reference to the Hotel model. 
    //It establishes a relationship between the Booking model and the Hotel model.

//required: true: 
    //Specifies that a value for this field is required when creating a new booking. 
    //In your case, it's required to associate a booking with a specific hotel.

//In summary, when making a request to create a booking,
// you need to provide the _id of the hotel you want to associate with that booking in the hotelInfo field. 
//The exact value you provide depends on the _id of the hotel you want to reference in your database.





