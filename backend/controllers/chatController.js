import Chat from '../models/ChatModel.js';
import asyncHandler from 'express-async-handler';

// @desc Create a new chat (connection)
// @route POST /api/chat
// @access PUBLIC

export const createChat = asyncHandler(async (req, res) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });

  const result = await newChat.save();
  res.status(201).json(result);
});

// @desc Find user chats (can be more than one)
// @route POST /api/chat/:userId
// @access PUBLIC

export const userChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({
    members: { $in: [req.params.userId] },
  });

  res.status(200).json(chats);
});

// @desc Find specific chat (only one)
// @route POST /api/chat/find/:senderId/:receiverId
// @access PUBLIC

export const findChat = asyncHandler(async (req, res) => {
  const chat = await Chat.findOne({
    members: { $all: [req.params.firstId, req.params.secondId] },
  });

  res.status(200).json(chat);
});
