import express from 'express';
import {
  authUser,
  getAllUsers,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(validateToken, getAllUsers);
router.post('/login', authUser);
router.route('/:id').get(validateToken, getUserProfile);

export default router;
