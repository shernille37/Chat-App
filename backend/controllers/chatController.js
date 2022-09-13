import Chat from '../models/ChatModel.js';
import asyncHandler from 'express-async-handler';

// @desc Create a new chat (connection)
// @route POST /api/chat
// @access PRIVATE

export const createChat = asyncHandler(async (req, res) => {
  const newChat = new Chat({
    user: req.user._id,
    chatMate: req.body.chatMate,
  });

  const result = await newChat.save();
  res.status(201).json(result);
});

// @desc Find user chats (can be more than one)
// @route GET /api/chat
// @access PRIVATE

export const userChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({ user: req.user._id }).populate(
    'chatMate',
    'name'
  );

  res.status(200).json(chats);
});

// @desc Find specific chat (only one)
// @route POST /api/chat/:chatMateId
// @access PRIVATE

export const findChat = asyncHandler(async (req, res) => {
  const chat = await Chat.findOne({
    user: req.user._id,
    chatMate: req.params.chatMateId,
  });

  res.status(200).json(chat);
});
