import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import { format } from 'timeago.js';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages } from '../actions/messageActions';
import Spinner from './utils/Spinner';

const MessageBox = ({ clickedUser }) => {
  const authUser = useSelector((state) => state.auth.authUser);
  const { user } = authUser;

  const messages = useSelector((state) => state.message.message);
  const { messageList, loading, error } = messages;

  const dispatch = useDispatch();
  const scroll = useRef(null);

  useEffect(() => {
    dispatch(getMessages(clickedUser.chatId));
  }, [clickedUser]);

  useEffect(() => {
    scroll?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  return (
    <div className='chat-body'>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant='error'>{error}</Message>
      ) : messageList.length === 0 ? (
        <Message variant='info'>No Messages</Message>
      ) : (
        messageList.map((message) => (
          <div
            ref={scroll}
            key={message._id}
            className={
              message.senderId && message.senderId === user._id
                ? 'message own'
                : 'message'
            }
          >
            <span>{message.text}</span>
            <span>
              {message.createdAt
                ? format(message.createdAt)
                : format(Date.now())}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageBox;
