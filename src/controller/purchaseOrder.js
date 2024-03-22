import PurchaseOrdersModel from "../model/purchaseOrder.js"


const getAllPurchaseOrders = async (req, res) => {
    try {
        let purchaseOrders = await PurchaseOrdersModel.find({}, { password: 0 })
        res.status(200).send({
            message: "Customer Data Fetched Successfully",
            purchaseOrders
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

const createPurchaseOrder = async (req, res) => {
    try {
        await PurchaseOrdersModel.create(req.body)
        res.status(200).send({
            message: "New Purchase Order Added",
        })

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

const editPurchaseOrder = async (req, res) => {
    try {
        const updatedOrder = await PurchaseOrdersModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    'address.doorNumber': req.body.address.doorNumber,
                    'address.street': req.body.address.street,
                    'address.city': req.body.address.city,
                    'address.pincode': req.body.address.pincode,
                    phoneNumber: req.body.phoneNumber,
                    productName: req.body.productName,
                    productQty: req.body.productQty,
                    orderDate: req.body.orderDate,
                    estimateDate: req.body.estimateDate,
                    productDescription: req.body.productDescription,
                    deliveryStatus: req.body.deliveryStatus,
                    paymentStatus: req.body.paymentStatus
                }
            },
            { new: true } // To return the updated document
        );

        if (updatedOrder) {
            res.status(200).send({
                message: "Order Data Edited Successfully",
                updatedOrder
            });
        } else {
            res.status(500).send({
                message: "Order Not Found"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
}

const deletePurchaseOrder = async (req, res) => {
    try {
        const order = await PurchaseOrdersModel.find({ _id: req.params.id })
        if (order) {
            let data = await PurchaseOrdersModel.deleteOne({ _id: req.params.id })
            res.status(200).send({
                message: "Order Deleted Successfully",
                data
            })
        } else {
            res.status(500).send({
                message: "Order Not Found"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

const getOrderById = async (req, res) => {
    try {
        let order = await PurchaseOrdersModel.findOne({ _id: req.params.id })
        res.status(200).send({
            message: "Orders Fetched Successfully",
            order
        })

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

const search = async (req, res) => {
    const query = req.body.searchTerm
    try {
        const customer = await PurchaseOrdersModel.find({ name: { $regex: query, $options: "i" } }).limit(10)
        if (customer.length) {
            res.status(200).send({
                message: "Search Result found",
                customer
            })
        } else {
            res.status(400).send({
                message: 'Search Result Not Found'
            })
        }

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}



export default {
    getAllPurchaseOrders, createPurchaseOrder, search, editPurchaseOrder, deletePurchaseOrder, getOrderById
}