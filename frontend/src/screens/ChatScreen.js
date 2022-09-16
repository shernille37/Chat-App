import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Conversation from '../components/Conversation';
import ChatBox from '../components/ChatBox';

import { io } from 'socket.io-client';

const ChatScreen = () => {
  const authUser = useSelector((state) => state.auth.authUser);
  const { user } = authUser;

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState('');
  const [sendMessage, setSendMessage] = useState(null);
  const [clickedUser, setClickedUser] = useState('');

  const socket = useRef();

  const navigate = useNavigate();

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
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage]);

  // RECEIVE MESSAGE FROM THE SOCKET SERVER
  useEffect(() => {
    socket.current.on('receive-message', (data) => {
      setReceivedMessage(data);
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

        <ChatBox
          clickedUser={clickedUser}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    )
  );
};

export default ChatScreen;
