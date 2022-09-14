import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import Message from '../components/Message';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.auth.authUser);

  const { user, loading, error } = authUser;

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    dispatch(register({ name, email, password }));
  };

  return (
    <>
      <div className='form-container'>
        <form className='form' onSubmit={submitHandler}>
          <div className='title'>Register</div>
          {loading && <Message variant='info'>Signing Up...</Message>}
          {error && <Message variant='error'>{error}</Message>}
          {message && <Message variant='error'>{message}</Message>}

          <div className='input-container'>
            <input
              type='text'
              name='name'
              placeholder=' '
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <i className='icon fa-regular fa-user'></i>
          </div>

          <div className='input-container'>
            <input
              type='email'
              name='email'
              placeholder=' '
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <i className='icon fa-regular fa-envelope-open'></i>
          </div>

          <div className='input-container'>
            <input
              type='password'
              name='password'
              placeholder=' '
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <i className='icon fa-solid fa-key'></i>
          </div>

          <div className='input-container'>
            <input
              type='password'
              name='password'
              placeholder=' '
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor='password' className='form-label'>
              Confirm Password
            </label>
            <i className='icon fa-solid fa-key'></i>
          </div>

          <button type='submit' className='btn-submit'>
            Enter
          </button>
          <div className='form-text'>
            <p>Have an account already?</p> <Link to='/login'>Login Here</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterScreen;
