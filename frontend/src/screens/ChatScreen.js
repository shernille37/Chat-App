import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Conversation from '../components/Conversation';
import ChatBox from '../components/ChatBox';
import { receiveMessage } from '../actions/messageActions';

import { io } from 'socket.io-client';

const ChatScreen = () => {
  const authUser = useSelector((state) => state.auth.authUser);
  const { user } = authUser;

  const sentMessage = useSelector((state) => state.message.sentMessage);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [clickedUser, setClickedUser] = useState('');

  const socket = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // CONNECT TO THE SOCKET
  useEffect(() => {
    socket.current = io('http://localhost:8800');

    if (user) {
      socket.current.emit('add-new-user', user._id);
      socket.current.on('get-users', (activeUsers) => {
        setOnlineUsers(activeUsers);
      });
    }
  }, [user]);

  // SEND MESSAGE TO THE SOCKET SERVER
  useEffect(() => {
    if (sentMessage !== null) {
      socket.current.emit('send-message', sentMessage);
    }
  }, [sentMessage]);

  // RECEIVE MESSAGE FROM THE SOCKET SERVER
  useEffect(() => {
    socket.current.on('receive-message', (data) => {
      dispatch(receiveMessage(data));
    });
  }, []);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  return (
    user && (
      <div className='chat'>
        {/* LEFT SIDE */}

        <Conversation setClickedUser={setClickedUser} user={user} />

        {/* RIGHT SIDE */}

        <ChatBox clickedUser={clickedUser} />
      </div>
    )
  );
};

export default ChatScreen;
