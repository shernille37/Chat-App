import express from 'express';
import { addMessage, getMessages } from '../controllers/messageController.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', validateToken, addMessage);
router.get('/:chatId', validateToken, getMessages);

export default router;
