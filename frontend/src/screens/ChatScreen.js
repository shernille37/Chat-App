import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../assets/style/Chat.css';

const ChatScreen = () => {
  const [chats, setChats] = useState([]);

  const authUser = useSelector((state) => state.auth.authUser);
  const { user } = authUser;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  return (
    <div className='chat'>
      {/* LEFT SIDE */}

      <div className='left-side-chat'>
        <div className='chat-container'>
          <h2>Chats</h2>
          <div className='chat-list'>Conversations</div>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className='right-side-chat'>
        <h2>Right Side</h2>
      </div>
    </div>
  );
};

export default ChatScreen;
