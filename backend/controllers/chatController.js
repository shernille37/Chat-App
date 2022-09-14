import Chat from '../models/ChatModel.js';
import asyncHandler from 'express-async-handler';

// @desc Create a new chat (connection)
// @route POST /api/chat
// @access PRIVATE

export const createChat = asyncHandler(async (req, res) => {
  const newChat = new Chat({
    members: [req.user._id.toString(), req.body.chatMate],
  });

  const result = await newChat.save();
  res.status(201).json(result);
});

// @desc Find user chats (can be more than one)
// @route GET /api/chat
// @access PRIVATE

export const userChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({
    members: { $in: [req.user._id.toString()] },
  });

  if (chats) res.status(200).json(chats);
  else throw new Error('No chat(s) found');
});

// @desc Find specific chat (only one)
// @route POST /api/chat/:chatMateId
// @access PRIVATE

export const findChat = asyncHandler(async (req, res) => {
  const chat = await Chat.findOne({
    members: { $all: [req.user._id.toString(), req.params.chatMateId] },
  });

  if (chat) res.status(200).json(chat);
  else throw new Error('No chat found');
});
