import React from 'react';
import '../assets/style/ChatBox.css';
import MessageBox from './MessageBox';
import MessageSender from './MessageSender';

const ChatBox = ({ clickedUser }) => {
  return (
    clickedUser && (
      <div className='chatbox-container'>
        <>
          <div className='chat-header'>{clickedUser.name}</div>

          {/* Chatbox messages */}

          <MessageBox clickedUser={clickedUser} />

          {/* Chat Sender */}
          <MessageSender clickedUser={clickedUser} />
        </>
      </div>
    )
  );
};

export default ChatBox;
