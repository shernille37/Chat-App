import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getChats = createAsyncThunk(
  'GET_USER_CHATS',
  async ({ id }, { rejectWithValue }) => {
    // TODO TOKEN

    try {
      const { data } = axios.get(`/api/chat/${id}`);

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
