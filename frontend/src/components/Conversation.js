import React from 'react';
import '../assets/style/Chat.css';

const Conversation = ({ chat }) => {
  return <div>{chat.name}</div>;
};

export default Conversation;
