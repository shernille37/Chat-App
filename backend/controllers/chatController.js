import Chat from '../models/ChatModel.js';
import Message from '../models/MessageModel.js';
import asyncHandler from 'express-async-handler';

// @desc Create a new chat (connection)
// @route POST /api/chat
// @access PRIVATE

export const createChat = asyncHandler(async (req, res) => {
  const chatIsExist = await Chat.findOne({
    members: { $all: [req.user._id.toString(), req.body.chatMate] },
  });

  if (chatIsExist) {
    res.status(400);
    throw new Error('Conversation already exists');
  } else {
    const newChat = new Chat({
      members: [req.user._id.toString(), req.body.chatMate],
    });

    const result = await newChat.save();
    res.status(201).json(result);
  }
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

// @desc DELETE conversation
// @route GET /api/chat?:chatMate
// @access PRIVATE

export const deleteChat = asyncHandler(async (req, res) => {
  const chat = await Chat.findOne({
    members: { $all: [req.user._id.toString(), req.query.chatMate] },
  });

  await chat.remove();
  const deleteMessages = await Message.deleteMany({ chatId: chat._id });

  if (chat) res.status(200).json(deleteMessages);
  else throw new Error('No chat found');
});
