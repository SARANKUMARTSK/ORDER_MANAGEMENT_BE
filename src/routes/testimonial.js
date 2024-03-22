import express from 'express'
const router = express.Router()
import TestimonialController from '../controller/testimonial.js'


router.get('/',TestimonialController.getAllComments)
router.delete('/:id',TestimonialController.deleteComments)

export default router