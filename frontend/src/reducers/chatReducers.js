import { createSlice } from '@reduxjs/toolkit';
import { getChats } from '../actions/chatActions';

const initialState = {
  chatList: {
    chats: [],
    loading: true,
    error: null,
  },
};

const chatReducer = createSlice({
  name: 'chats',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getChats.pending, ({ chatList }, action) => {
        chatList.loading = true;
      })
      .addCase(getChats.fulfilled, ({ chatList }, action) => {
        chatList.loading = false;
        chatList.chats = action.payload;
      })
      .addCase(getChats.rejected, ({ chatList }, action) => {
        chatList.loading = false;
        chatList.error = action.payload;
      });
  },
});

export const chatSlice = chatReducer.reducer;
