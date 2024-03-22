import mongoose from "./index.js";

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


let userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is Required"]
        },
        email: {
            type: String,
            required: [true, "Email is Required"],
            validate: {
                validator: (value) => validateEmail(value)
            }
        },
        phoneNumber: {
            type: String,
            required: [true, "Phone Number is Required"]
        },
        address: {
            doorNumber: {
                type: String,
                required: [true, " Door Number is required"]
            },
            street: {
                type: String,
                required: [true, "Street is required"]
            },
            city: {
                type: String,
                required: [true, "City is required"]
            },
            pincode: {
                type: Number,
                required: [true, "Pincode is required"]
            }
        },
        password: {
            type: String,
            required: [true, "Password is Required"]
        },
        status: {
            type: Boolean,
            default: true
        },
        role: {
            type: String,
            default: 'user'
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }, {
    collection: "users",
    versionKey: false
}
)

const userModel = mongoose.model('users', userSchema)

export default userModel