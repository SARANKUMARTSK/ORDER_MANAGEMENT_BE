import TestimonialModel from '../model/testimonial.js'

const getAllComments = async (req, res) => {
    try {
        let comments = await TestimonialModel.find({})
        res.status(200).send({
            message: "Comments fetched successfully",
            comments
        })

    } catch (error) {
        res.status(200).send({
            message: error.message || "Internal Server Error"
        })
    }
}

const deleteComments = async (req, res) => {
    try {
        let comment = await TestimonialModel.findByIdAndDelete({ _id: req.params.id })

        if (comment) {
            res.status(200).send({
                message: "Comment Deleted Successfully"
            })
        } else {
            res.status(400).send({
                message: "Comment Not Found"
            })
        }

    } catch (error) {
        res.status(200).send({
            message: error.message || "Internal Server Error"
        })
    }
}


export default {
    getAllComments, deleteComments
}