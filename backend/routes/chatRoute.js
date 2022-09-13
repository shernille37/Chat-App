import express from 'express';
import {
  createChat,
  userChats,
  findChat,
} from '../controllers/chatController.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(validateToken, createChat).get(validateToken, userChats);
router.get('/:chatMateId', validateToken, findChat);

export default router;
