import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
