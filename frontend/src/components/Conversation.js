import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getChats } from '../actions/chatActions';
import { logout } from '../actions/userActions';

import Message from './Message';
import '../assets/style/Chat.css';
import Spinner from './utils/Spinner';

const Conversation = ({ user, setClickedUser, socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chatList = useSelector((state) => state.chat.chatList);
  const { chats, loading, error } = chatList;

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    dispatch(getChats());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    socket.current.emit('logout', user._id);
  };

  return (
    <div className='left-side-chat'>
      <div className='chat-container'>
        <div className='chat-heading'>
          <p className='name'>{user.name}</p>
          <p>Chats</p>
          <i className='icon fa-solid fa-plus'></i>
        </div>
        {loading ? (
          <Spinner />
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
              <div>{chat.name}</div>
            </div>
          ))
        )}

        <div className='logout' onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Conversation;
