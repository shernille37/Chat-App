import { createSlice } from '@reduxjs/toolkit';
import { getMessages } from '../actions/messageActions';

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
      });
  },
});

export const messageSlice = messageReducer.reducer;
