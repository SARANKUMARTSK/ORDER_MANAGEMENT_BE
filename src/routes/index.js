import express from 'express';
const router = express.Router();
import UserRoutes from './user.js'
import PurchaseRoutes from './purchaseOrder.js'
import SalesRoutes from './salesOrder.js'
import TestimonialRoutes from './testimonial.js'
import ChatRoutes from './chat.js'

router.use('/user',UserRoutes)
router.use('/sales-order',SalesRoutes)
router.use('/purchase-order',PurchaseRoutes)
router.use('/testimonial',TestimonialRoutes)
router.use('/chat',ChatRoutes)


export default router