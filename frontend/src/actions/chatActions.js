import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addChat = createAsyncThunk(
  'ADD_CHAT',
  async ({ chatMate }, { rejectWithValue }) => {
    const { token } = JSON.parse(localStorage.getItem('user')) || null;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.post('/api/chat', { chatMate }, config);

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

export const getChats = createAsyncThunk(
  'GET_USER_CHATS',
  async (id, { rejectWithValue }) => {
    const { token, _id: authUserId } =
      JSON.parse(localStorage.getItem('user')) || null;

    let chatPromises = [];

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data: chatList } = await axios.get(`/api/chat`, config);

      chatList.map((c) => {
        const chatMateId = c.members.find((id) => id !== authUserId);

        chatPromises.push(axios.get(`/api/users/${chatMateId}`, config));
      });

      const res = await Promise.all(chatPromises);

      return res.map((c, i) => {
        return { ...c.data, chatId: chatList[i]._id };
      });
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response
      );
    }
  }
);
