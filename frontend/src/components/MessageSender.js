import React, { useState } from 'react';
import InputEmoji from 'react-input-emoji';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../actions/messageActions';
import '../assets/style/ChatBox.css';

const MessageSender = ({ chatMate }) => {
  const dispatch = useDispatch();

  const submitHandler = (text) => {
    dispatch(sendMessage({ chatId: chatMate.chatId, text }));
  };

  return (
    <div className='chat-sender'>
      <i className='icon fa-solid fa-plus'></i>
      <InputEmoji onEnter={submitHandler} />
    </div>
  );
};

export default MessageSender;
