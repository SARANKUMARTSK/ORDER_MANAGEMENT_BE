import mongoose from "./index.js";

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const timestamp = Date.now().toString(36);
    result += timestamp;
    return result;
}



const salesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Customer Name is required"]
        },
        email: {
            type: String,
            required: [true, "Customer Email is required"]
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
        phoneNumber: {
            type: Number,
            required: [true, "Phone Number is required"]
        },
        productName: {
            type: String,
            required: [true, "Product Name is required"]
        },
        productQty: {
            type: Number,
            required: [true, "Quantity is Required"]
        },
        orderDate: {
            type: Date,
            default: Date.now()
        },
        estimateDate: {
            type: Date,
            default: Date.now()
        },
        productDescription: {
            type: String,
            default: ""
        },
        deliveryStatus: {
            type: String,
            default: "New Order"
        },
        courierType: {
            type: String,
            default: "Standard"
        },
        paymentStatus: {
            type: String,
            default: "No"
        },
        trackingCode: {
            type: String,
            default: generateRandomString(5)
        },
        productId: {
            type: String,
            default: generateRandomString(2)
        }
    },
    {
        collection: "salesOrders",
        versionKey: false
    }
)

const salesModel = mongoose.model("salesOrders", salesSchema)

export default salesModel