import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getChats = createAsyncThunk(
  'GET_USER_CHATS',
  async (id, { rejectWithValue, getState }) => {
    const { token } = JSON.parse(localStorage.getItem('user')) || null;

    let chatPromises = [];

    const authUserId = getState().auth.authUser.user._id;

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
