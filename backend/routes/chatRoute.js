import express from 'express';
import {
  createChat,
  userChats,
  findChat,
} from '../controllers/chatController.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', validateToken, createChat);
router.get('/:userId', validateToken, userChats);
router.get('/find/:firstId/:secondId', validateToken, findChat);

export default router;
