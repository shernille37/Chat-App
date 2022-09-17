import Message from '../models/MessageModel.js';
import asyncHandler from 'express-async-handler';

// @desc Add Messaeg
// @route POST /api/message/:chatId
// @access PRIVATE
export const addMessage = asyncHandler(async (req, res) => {
  const chatId = req.params.chatId;
  const senderId = req.user._id;
  const { text, receiverId } = req.body;

  const message = new Message({
    chatId,
    senderId,
    receiverId,
    text,
  });

  const result = await message.save();

  res.status(201).json(result);
});

// @desc Get Messages from ChatID
// @route GET /api/message/:chatId
// @access PRIVATE
export const getMessages = asyncHandler(async (req, res) => {
  const chatId = req.params.chatId;

  const result = await Message.find({ chatId });

  if (result) {
    res.status(200).json(result);
  } else {
    throw new Error('No message found');
  }
});
