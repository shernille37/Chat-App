import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendMessage = createAsyncThunk(
  'SEND_MESSAGE',
  async ({ chatId, text, receiverId }, { rejectWithValue }) => {
    const { token } = JSON.parse(localStorage.getItem('user')) || null;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.post(
        `/api/message/${chatId}`,
        { text, receiverId },
        config
      );

      return data;
    } catch (error) {
      rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response
      );
    }
  }
);

export const receiveMessage = createAction(
  'RECEIVE_MESSAGE',
  (receivedMessage) => {
    return {
      payload: {
        ...receivedMessage,
      },
    };
  }
);

export const getMessages = createAsyncThunk(
  'GET_MESSAGES',
  async (chatId, { rejectWithValue }) => {
    const { token } = JSON.parse(localStorage.getItem('user')) || null;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(`/api/message/${chatId}`, config);

      return data;
    } catch (error) {
      rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response
      );
    }
  }
);
