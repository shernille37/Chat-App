import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getChats = createAsyncThunk(
  'GET_USER_CHATS',
  async ({ id }, { rejectWithValue }) => {
    const { token } = JSON.parse(localStorage.getItem('user')) || null;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(`/api/chat/${id}`, config);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response
      );
    }
  }
);
