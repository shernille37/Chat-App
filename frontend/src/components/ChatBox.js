import React, { useEffect } from 'react';
import '../assets/style/ChatBox.css';
import Message from './Message';

import { useSelector, useDispatch } from 'react-redux';
import { getMessages } from '../actions/messageActions';

const ChatBox = ({ user: chatMate }) => {
  const authUser = useSelector((state) => state.auth.authUser);
  const { user } = authUser;

  const messages = useSelector((state) => state.message.message);
  const { messageList, loading, error } = messages;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages(chatMate.chatId));
  }, [chatMate]);

  return (
    chatMate && (
      <div className='chatbox-container'>
        <>
          <div className='chat-header'>{chatMate.name}</div>

          {/* Chatbox messages */}
          <div className='chat-body'>
            {loading ? (
              <Message variant='info'>Loading...</Message>
            ) : error ? (
              <Message variant='error'>{error}</Message>
            ) : messageList.length === 0 ? (
              <p>No Messages</p>
            ) : (
              messageList.map((message) => (
                <>
                  <div
                    className={
                      message.senderId === user._id ? 'message own' : 'message'
                    }
                  >
                    <span>{message.text}</span>
                    <span>{message.createdAt}</span>
                  </div>
                </>
              ))
            )}
          </div>
        </>
      </div>
    )
  );
};

export default ChatBox;
