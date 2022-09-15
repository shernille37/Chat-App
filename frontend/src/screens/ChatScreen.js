import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Conversation from '../components/Conversation';
import ChatBox from '../components/ChatBox';

const ChatScreen = () => {
  const authUser = useSelector((state) => state.auth.authUser);
  const { user } = authUser;

  const [clickedUser, setClickedUser] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  return (
    user && (
      <div className='chat'>
        {/* LEFT SIDE */}

        <Conversation setClickedUser={setClickedUser} user={user} />

        {/* RIGHT SIDE */}

        <ChatBox clickedUser={clickedUser} />
      </div>
    )
  );
};

export default ChatScreen;
