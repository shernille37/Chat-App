import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { getChats } from '../actions/chatActions';
import Conversation from '../components/Conversation';
import Message from '../components/Message';
import ChatBox from '../components/ChatBox';
import '../assets/style/Chat.css';

const ChatScreen = () => {
  const authUser = useSelector((state) => state.auth.authUser);
  const { user } = authUser;

  const chatList = useSelector((state) => state.chat.chatList);
  const { chats, loading, error } = chatList;

  const [clickedUser, setClickedUser] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
    else {
      dispatch(getChats());
    }
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

            {loading ? (
              <Message variant='info'>Loading...</Message>
            ) : error ? (
              <Message variant='error'>{error}</Message>
            ) : chats.length === 0 ? (
              <Message variant='info'>No Chats</Message>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat._id}
                  className='chat-list'
                  onClick={() => setClickedUser(chat)}
                >
                  <Conversation chat={chat} />
                </div>
              ))
            )}

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
