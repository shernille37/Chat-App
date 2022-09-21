import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getChats } from '../actions/chatActions';
import { resetSuccessAdd } from '../reducers/chatReducers';
import { logout } from '../actions/userActions';

import Message from './Message';
import '../assets/style/Chat.css';
import Spinner from './utils/Spinner';
import Modal from './utils/Modal';
import AddChat from './AddChat';

const Conversation = ({ user, setClickedUser, socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chatList = useSelector((state) => state.chat.chatList);
  const { chats, loading, error } = chatList;

  const successAdd = useSelector((state) => state.chat.successAdd);

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    dispatch(getChats());
  }, []);

  useEffect(() => {
    if (successAdd) {
      dispatch(getChats());
      dispatch(resetSuccessAdd());
    }
  }, [successAdd]);

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
          <i
            className='icon fa-solid fa-plus'
            onClick={() => setIsClicked(true)}
          ></i>
        </div>
        {error && <Message variant='error'>{error}</Message>}
        {loading ? (
          <Spinner />
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

      <Modal
        open={isClicked}
        close={() => setIsClicked(false)}
        header={'Choose a User'}
      >
        <AddChat close={() => setIsClicked(false)} />
      </Modal>
    </div>
  );
};

export default Conversation;
