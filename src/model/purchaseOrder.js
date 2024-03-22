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



const purchaseSchema = new mongoose.Schema(
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
            default: new Date(Date.now()).toISOString().split('T')[0]
        },
        productDescription: {
            type: String,
            default: ""
        },
        paymentStatus: {
            type: String,
            default: "New Order"
        },
        productId: {
            type: String,
            default: generateRandomString(2)
        },
    },
    {
        collection: "purchaseOrders",
        versionKey: false
    }
)

const purchaseModel = mongoose.model("purchaseOrders", purchaseSchema)

export default purchaseModel