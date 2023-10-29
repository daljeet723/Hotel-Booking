import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        unique:true,
        required: [true, "Please enter your hotel name"],
    },
    city: {
        type: String,
        required: [true, "Please enter your hotel name"],
    },
    amenties: String,
    description: {
        type: String,
        maxLength:[300, "Description should not exceed 100 characters"]
    },
    address: {
        type: String,
        required: [true, "Please enter your hotel address"],
    },
    phoneNo: {
        type: Number,
        required: [true, "Please enter your contact details"],
    },
    image: [ // willbe array of object because of multiple images
        {   //when host in cloud will get public id and url
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    ratings:{
        type:String,
        default:0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "user",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],


})

export const Hotel = mongoose.model("Hotel", hotelSchema);