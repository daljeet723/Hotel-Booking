import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        unique: true,
        required: [true, "Please enter your hotel name"],
    },
    city: {
        type: String,
        required: [true, "Please enter your hotel name"],
    },
    amenties: String,
    description: {
        type: String,
        maxLength: [300, "Description should not exceed 100 characters"]
    },
    address: {
        type: String,
        required: [true, "Please enter your hotel address"],
    },
    phoneNo: {
        type: Number,
        required: [true, "Please enter your contact details"],
    },
    price: {
        type: Number,
        required: [true, "Please enter your starting prices"],
    },

    //roomTypes is an array of objects, where each object has a type and a price
    roomTypes: [
        {
            type: {
                type: String,
                default: 'Single Room', // Set the default value to 'Single Room'
            },
            price: {
                type: Number,
            },
        },
    ],
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
    ratings: {
        type: String,
        default: 0
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


// {
//     "hotelName": "Example Hotel",
//     "city": "Example City",
//     "amenties": "Example Amenities",
//     "description": "Example hotel description. It should not exceed 300 characters.",
//     "address": "Example Address",
//     "phoneNo": 1234567890,
//     "price": 150,
//     "roomTypes": [
//       {
//         "type": "Standard",
//         "price": 100
//       },
//       {
//         "type": "Deluxe",
//         "price": 150
//       }
//       // Add more room types as needed
//     ],
//     "image": [
//       {
//         "public_id": "example_public_id_1",
//         "url": "https://example.com/image1.jpg"
//       },
//       {
//         "public_id": "example_public_id_2",
//         "url": "https://example.com/image2.jpg"
//       }
//       // Add more images as needed
//     ],
//     "ratings": "5", // Example rating
//     "reviews": [
//       {
//         "user": "user_id_1", // Replace with actual user ID
//         "name": "John Doe",
//         "rating": 4,
//         "comment": "Great experience!"
//       },
//       {
//         "user": "user_id_2", // Replace with actual user ID
//         "name": "Jane Doe",
//         "rating": 5,
//         "comment": "Excellent service!"
//       }
//       // Add more reviews as needed
//     ]
//   }
