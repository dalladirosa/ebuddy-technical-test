import { Router } from 'express';
import { UserController } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const userController = new UserController();

router.get('/profile', authMiddleware, userController.getUserProfile);
router.patch('/profile', authMiddleware, userController.updateUserProfile);

export { router as userRoutes };
