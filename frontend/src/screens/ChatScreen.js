import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';
import Conversation from '../components/Conversation';
import ChatBox from '../components/ChatBox';
import '../assets/style/Chat.css';

const ChatScreen = () => {
  const authUser = useSelector((state) => state.auth.authUser);
  const { user } = authUser;

  const [clickedUser, setClickedUser] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  return (
    user && (
      <div className='chat'>
        {/* LEFT SIDE */}

        <div className='left-side-chat'>
          <div className='chat-container'>
            <div className='chat-heading'>
              <p className='name'>{user.name}</p>
              <p>Chats</p>
              <i className='icon fa-solid fa-plus'></i>
            </div>

            <Conversation setClickedUser={setClickedUser} />

            <div className='logout' onClick={() => dispatch(logout())}>
              Logout
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className='right-side-chat'>
          {clickedUser ? (
            <ChatBox user={clickedUser} />
          ) : (
            <div className='chat-header'>Click on a conversation</div>
          )}
        </div>
      </div>
    )
  );
};

export default ChatScreen;
