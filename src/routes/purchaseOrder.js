import express from "express";
import PurchaseOrderController from '../controller/purchaseOrder.js'
import UserGaurd from '../middleware/UserGaurd.js';
import AdminGaurd from '../middleware/AdminGaurd.js';

const router = express.Router()

router.get('/',UserGaurd,PurchaseOrderController.getAllPurchaseOrders)
router.post('/',UserGaurd,PurchaseOrderController.createPurchaseOrder)
router.get('/:id',UserGaurd,PurchaseOrderController.getOrderById)
router.get('/search',UserGaurd,PurchaseOrderController.search)
router.put('/edit-purchase-order/:id',AdminGaurd,PurchaseOrderController.editPurchaseOrder)
router.delete('/delete-purchase-order/:id',AdminGaurd,PurchaseOrderController.deletePurchaseOrder)


export default router
