import express from 'express';
import { addMessage, getMessages } from '../controllers/messageController.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
  .route('/:chatId')
  .post(validateToken, addMessage)
  .get(validateToken, getMessages);

export default router;
