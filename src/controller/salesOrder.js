import SalesOrdersModel from "../model/salesOrder.js"


const getAllSalesOrders = async (req, res) => {
    try {
        let salesOrders = await SalesOrdersModel.find({}, { password: 0 })
        res.status(200).send({
            message: "Orders Data Fetched Successfully",
            salesOrders
        })

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

const createSalesOrder = async (req, res) => {
    try {
        await SalesOrdersModel.create(req.body)
        res.status(200).send({
            message: "New Sales Order Added",
        })

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

const editSalesOrder = async (req, res) => {
    try {
        const updatedOrder = await SalesOrdersModel.findOneAndUpdate(
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
            res.status(400).send({
                message: "Order Not Found"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
}

const getOrderById = async (req, res) => {
    try {
        let order = await SalesOrdersModel.findOne({ _id: req.params.id })
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

const deleteSalesOrder = async (req, res) => {
    try {
        const order = await SalesOrdersModel.find({ _id: req.params.id })
        if (order) {
            let data = await SalesOrdersModel.deleteOne({ _id: req.params.id })
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


const search = async (req, res) => {
    const query = req.body.searchTerm
    try {
        const customer = await SalesOrdersModel.find({ name: { $regex: query, $options: "i" } }).limit(10)
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
    getAllSalesOrders, createSalesOrder, search, editSalesOrder, deleteSalesOrder, getOrderById
}