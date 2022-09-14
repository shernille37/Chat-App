import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import '../assets/style/Login.css';
import Message from '../components/Message';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authUser = useSelector((state) => state.auth.authUser);

  const { user, loading, error } = authUser;

  const input = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  const showPasswordHandler = () => {
    if (input.current.type === 'password') {
      input.current.type = 'text';
    } else {
      input.current.type = 'password';
    }
  };

  return (
    <>
      <div className='form-container'>
        <form className='form' onSubmit={submitHandler}>
          <div className='title'>Login</div>
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
              ref={input}
              type='password'
              name='password'
              placeholder=' '
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className='icon fa-solid fa-key'></i>
            <i
              className='showPw fa-regular fa-eye-slash'
              onClick={showPasswordHandler}
            ></i>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
          </div>
          <button type='submit' className='btn-submit'>
            Login
          </button>
          <div className='form-text'>
            <p>Not registered yet?</p> <Link to='/register'>Register Here</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginScreen;
