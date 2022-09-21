import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Message from './Message';

const AddChat = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authUser = useSelector((state) => state.auth.authUser);

  const { user, loading, error } = authUser;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form className='form' onSubmit={submitHandler}>
      {loading && <Message variant='info'>Logging In...</Message>}
      {error && <Message variant='error'>{error}</Message>}
      <div className='input-container'>
        <input
          type='email'
          name='email'
          placeholder=' '
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <i className='icon fa-regular fa-envelope-open'></i>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
      </div>
      <div className='input-container'>
        <input
          type='password'
          name='password'
          placeholder=' '
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i className='icon fa-solid fa-key'></i>

        <label htmlFor='password' className='form-label'>
          Password
        </label>
      </div>
      <button type='submit' className='btn-submit'>
        Add
      </button>
    </form>
  );
};

export default AddChat;
