import React, { useEffect } from 'react';
import Message from './Message';
import { format } from 'timeago.js';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages } from '../actions/messageActions';

const MessageBox = ({ message }) => {
  const authUser = useSelector((state) => state.auth.authUser);
  const { user } = authUser;

  const messages = useSelector((state) => state.message.message);
  const { messageList, loading, error } = messages;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages(message.chatId));
  }, []);

  return (
    <div className='chat-body'>
      {loading ? (
        <Message variant='info'>Loading...</Message>
      ) : error ? (
        <Message variant='error'>{error}</Message>
      ) : messageList.length === 0 ? (
        <Message variant='info'>No Messages</Message>
      ) : (
        messageList.map((message) => (
          <div
            key={message._id}
            className={
              message.senderId === user._id ? 'message own' : 'message'
            }
          >
            <span>{message.text}</span>
            <span>{format(message.createdAt)}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageBox;
