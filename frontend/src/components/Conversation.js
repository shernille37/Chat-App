import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChats } from '../actions/chatActions';
import Message from './Message';
import '../assets/style/Chat.css';
import Spinner from './utils/Spinner';

const Conversation = ({ setClickedUser }) => {
  const dispatch = useDispatch();

  const chatList = useSelector((state) => state.chat.chatList);
  const { chats, loading, error } = chatList;

  useEffect(() => {
    dispatch(getChats());
  }, []);

  return loading ? (
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
  );
};

export default Conversation;
