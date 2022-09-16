import { createSlice } from '@reduxjs/toolkit';
import {
  getMessages,
  receiveMessage,
  sendMessage,
} from '../actions/messageActions';

const initialState = {
  message: {
    messageList: [],
    loading: true,
    error: null,
  },
};

const messageReducer = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMessages.pending, ({ message }, action) => {
        message.loading = true;
      })
      .addCase(getMessages.fulfilled, ({ message }, action) => {
        message.loading = false;
        message.messageList = action.payload;
      })
      .addCase(getMessages.rejected, ({ message }, action) => {
        message.loading = false;
        message.error = action.payload;
      })
      .addCase(sendMessage.pending, ({ message }, action) => {
        message.loading = false;
      })
      .addCase(sendMessage.fulfilled, ({ message }, action) => {
        message.loading = false;
        message.messageList.push(action.payload);
      })
      .addCase(sendMessage.rejected, ({ message }, action) => {
        message.loading = false;
        message.error = action.payload;
      })
      .addCase(receiveMessage.pending, ({ message }, action) => {
        message.loading = false;
      })
      .addCase(receiveMessage.fulfilled, ({ message }, action) => {
        message.loading = false;
        message.messageList.push(action.payload);
      })
      .addCase(receiveMessage.rejected, ({ message }, action) => {
        message.loading = false;
        message.error = action.payload;
      });
  },
});

export const messageSlice = messageReducer.reducer;
