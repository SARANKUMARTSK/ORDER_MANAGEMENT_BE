import express from "express";
import ChatController from '../controller/chat.js'

const router = express.Router()

router.get('/', ChatController.getAllChats)
router.post('/', ChatController.createChat)
router.delete('/:id', ChatController.deleteChat)


export default router