import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../actions/userActions';
import Spinner from './utils/Spinner';
import Message from './Message';

import '../assets/style/AddChat.css';
import { addChat } from '../actions/chatActions';

const AddChat = () => {
  const authUser = useSelector((state) => state.auth.authUser);
  const { user } = authUser;

  const userList = useSelector((state) => state.auth.userList);
  const { list, loading, error } = userList;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
    else dispatch(getAllUsers());
  }, [user]);

  const submitHandler = (userId) => {
    dispatch(addChat({ chatMate: userId }));
  };

  return loading ? (
    <Spinner />
  ) : (
    <>
      {error && <Message variant='error'>{error}</Message>}
      {list.length === 0 ? (
        <div className='no-user'>No users found</div>
      ) : (
        <ul className='userlist'>
          {list.map((user) => (
            <li key={user._id} onClick={() => submitHandler(user._id)}>
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AddChat;
