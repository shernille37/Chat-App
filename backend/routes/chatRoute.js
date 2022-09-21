import express from 'express';
import {
  createChat,
  userChats,
  findChat,
  deleteChat,
} from '../controllers/chatController.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(validateToken, createChat)
  .get(validateToken, userChats)
  .delete(validateToken, deleteChat);
router.get('/:chatMateId', validateToken, findChat);

export default router;
