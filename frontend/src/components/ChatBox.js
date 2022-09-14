import React from 'react';
import '../assets/style/ChatBox.css';
import MessageBox from './MessageBox';
import MessageSender from './MessageSender';

const ChatBox = ({ user: chatMate }) => {
  return (
    chatMate && (
      <div className='chatbox-container'>
        <>
          <div className='chat-header'>{chatMate.name}</div>

          {/* Chatbox messages */}

          <MessageBox chatMate={chatMate} />

          {/* Chat Sender */}
          <MessageSender chatMate={chatMate} />
        </>
      </div>
    )
  );
};

export default ChatBox;
