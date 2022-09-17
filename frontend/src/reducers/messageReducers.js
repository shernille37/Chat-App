import { createSlice } from '@reduxjs/toolkit';
import {
  getMessages,
  receiveMessage,
  sendMessage,
  socketReceiveMessage,
  socketSendMessage,
} from '../actions/messageActions';

const initialState = {
  message: {
    messageList: [],
    loading: true,
    error: null,
  },
  sentMessage: null,
  receivedMessage: null,
};

const messageReducer = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // GET MESSAGES
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

      // SEND MESSAGE
      .addCase(sendMessage.pending, ({ message }, action) => {
        message.loading = false;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.message.loading = false;
        state.message.messageList.push(action.payload);
        state.sentMessage = action.payload;
      })
      .addCase(sendMessage.rejected, ({ message }, action) => {
        message.loading = false;
        message.error = action.payload;
      })

      // RECEIVE THE MESSAGE
      .addCase(receiveMessage, ({ message }, action) => {
        message.loading = false;
        message.messageList.push(action.payload);
      });
  },
});

export const messageSlice = messageReducer.reducer;
