import React, { useState } from 'react';
import InputEmoji from 'react-input-emoji';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../actions/messageActions';
import '../assets/style/ChatBox.css';

const MessageSender = ({ clickedUser }) => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (text) => {
    // SEND MESSAGE TO DATABASE AND SOCKET
    dispatch(
      sendMessage({
        chatId: clickedUser.chatId,
        receiverId: clickedUser._id,
        text,
      })
    );
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
