import Message from '../models/MessageModel.js';
import asyncHandler from 'express-async-handler';

export const addMessage = asyncHandler(async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const message = new Message({
    chatId,
    senderId,
    text,
  });

  const result = await message.save();

  res.status(201).json(result);
});

export const getMessages = asyncHandler(async (req, res) => {
  const chatId = req.params.chatId;

  const result = await Message.find({ chatId });

  if (result) {
    res.status(200).json(result);
  } else {
    throw new Error('No message found');
  }
});
