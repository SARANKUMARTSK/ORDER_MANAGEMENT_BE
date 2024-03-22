import express from "express";
import SalesOrderController from '../controller/salesOrder.js'
import UserGuard from '../middleware/UserGaurd.js';
import AdminGuard from '../middleware/AdminGaurd.js';
const router = express.Router()

router.get('/',UserGuard,SalesOrderController.getAllSalesOrders)
router.get('/:id',UserGuard,SalesOrderController.getOrderById)
router.post('/',UserGuard,SalesOrderController.createSalesOrder)
router.get('/search',UserGuard,SalesOrderController.search)
router.put('/edit-sales-order/:id',AdminGuard,SalesOrderController.editSalesOrder)
router.delete('/delete-sales-order/:id',AdminGuard,SalesOrderController.deleteSalesOrder)


export default router
