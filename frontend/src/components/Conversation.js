import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getChats } from '../actions/chatActions';
import { resetSuccessAdd, resetSuccessDelete } from '../reducers/chatReducers';
import { logout } from '../actions/userActions';

import Message from './Message';
import Spinner from './utils/Spinner';
import Modal from './utils/Modal';
import AddChat from './AddChat';

import '../assets/style/Chat.css';

const Conversation = ({ user, setClickedUser, socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chatList = useSelector((state) => state.chat.chatList);
  const { chats, loading, error } = chatList;

  const successAdd = useSelector((state) => state.chat.successAdd);
  const successDelete = useSelector((state) => state.chat.successDelete);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    dispatch(getChats());
  }, []);

  useEffect(() => {
    if (successAdd || successDelete) {
      dispatch(getChats());
      dispatch(resetSuccessAdd());
      dispatch(resetSuccessDelete());
      setOpenModal(false);
    }
  }, [successAdd, successDelete]);

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
            onClick={() => setOpenModal(true)}
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
        open={openModal}
        close={() => setOpenModal(false)}
        header={'Choose a User'}
      >
        <AddChat />
      </Modal>
    </div>
  );
};

export default Conversation;
