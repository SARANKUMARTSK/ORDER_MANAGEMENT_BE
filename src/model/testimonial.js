import mongoose from "./index.js";


let testimonialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is Required"]
        },
        email: {
            type: String,
            required: [true, "Email is Required"]
        },
        phoneNumber: {
            type: String,
            required: [true, "Phone Number is Required"]
        },
        comments: {
            type: String,
            required: [true, "Please Enter any Comments"]
        },
        address: {
            city: {
                type: String,
                required: [true, "Please Enter City Name"]
            },
            state: {
                type: String,
                required: [true, "Please Enter State Name"]
            }
        },
        image: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDt6YUZ8byMEXMW-FqLnk72EfrpTC-hcBKjQ&usqp=CAU"
        },
        stars: {
            type: Number,
            required: [true, "Please Give Rating"]
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    {
        collection: "testimonials",
        versionKey: false
    }
)

const testimonialModel = mongoose.model("testimonials", testimonialSchema)

export default testimonialModel