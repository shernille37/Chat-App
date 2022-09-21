import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteChat } from '../actions/chatActions';

import MessageBox from './MessageBox';
import MessageSender from './MessageSender';
import Modal from './utils/Modal';

import '../assets/style/Chat.css';
import '../assets/style/ChatBox.css';

const ChatBox = ({ clickedUser, setClickedUser }) => {
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteChat({ chatMate: clickedUser._id }));
    setOpenModal(false);
    setClickedUser(null);
  };

  return clickedUser ? (
    <>
      <div className='right-side-chat'>
        <div className='chatbox-container'>
          <div className='chat-header'>
            {clickedUser.name}
            <i
              className='icon fa-solid fa-trash'
              onClick={() => setOpenModal(true)}
            ></i>
          </div>

          {/* Chatbox messages */}
          <MessageBox clickedUser={clickedUser} />

          {/* Chat Sender */}
          <MessageSender clickedUser={clickedUser} />
        </div>
      </div>

      <Modal
        header={'Are you sure?'}
        open={openModal}
        close={() => setOpenModal(false)}
      >
        <div className='modal-button'>
          <button className='confirm' onClick={handleDelete}>
            Yes
          </button>
          <button className='cancel' onClick={() => setOpenModal(false)}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  ) : (
    <div className='chat-header'>Click on a conversation</div>
  );
};

export default ChatBox;
