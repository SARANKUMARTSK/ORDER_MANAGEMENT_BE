import express from 'express';
import UserController from '../controller/user.js'
const router = express.Router();
import UserGuard from '../middleware/UserGaurd.js';
import AdminGuard from '../middleware/AdminGaurd.js';

router.get('/',UserController.getAllUsers);
router.get('/:id',UserController.getUserById);
router.post('/signup',UserController.signUp);
router.post('/login',UserController.login);
router.put('/edit/:id',AdminGuard,UserController.editUserById);
router.delete('/delete/:id',AdminGuard,UserController.deleteUserById);
router.put('/reset-password',UserController.forgotPassword);
router.put('/reset-mailer',UserController.resetMail);
export default router