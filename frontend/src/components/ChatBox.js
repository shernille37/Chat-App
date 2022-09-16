import React from 'react';
import MessageBox from './MessageBox';
import MessageSender from './MessageSender';

import '../assets/style/Chat.css';
import '../assets/style/ChatBox.css';

const ChatBox = ({ clickedUser, setSendMessage, receivedMessage }) => {
  return clickedUser ? (
    <div className='right-side-chat'>
      <div className='chatbox-container'>
        <>
          <div className='chat-header'>{clickedUser.name}</div>

          {/* Chatbox messages */}
          <MessageBox
            clickedUser={clickedUser}
            receivedMessage={receivedMessage}
          />

          {/* Chat Sender */}
          <MessageSender
            clickedUser={clickedUser}
            setSendMessage={setSendMessage}
          />
        </>
      </div>
    </div>
  ) : (
    <div className='chat-header'>Click on a conversation</div>
  );
};

export default ChatBox;
