import React, { useState } from 'react';
import InputEmoji from 'react-input-emoji';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../actions/messageActions';
import '../assets/style/ChatBox.css';

const MessageSender = ({ chatMate }) => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (text) => {
    dispatch(sendMessage({ chatId: chatMate.chatId, text }));
    setMessage('');
  };

  return (
    <div className='chat-sender'>
      <i className='icon fa-solid fa-plus'></i>
      <InputEmoji
        value={message}
        onChange={setMessage}
        onEnter={submitHandler}
      />
    </div>
  );
};

export default MessageSender;
