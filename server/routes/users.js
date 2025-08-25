import express from 'express';
import { userController } from '../controller/userController.js';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/email/:email', userController.getUserByEmail);
router.get('/:user_id', userController.getProfile);
router.put('/:user_id', userController.updateProfile);
router.delete('/:user_id', userController.deleteUser);

export default router;