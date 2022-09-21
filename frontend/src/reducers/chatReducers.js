import { createSlice } from '@reduxjs/toolkit';
import { addChat, deleteChat, getChats } from '../actions/chatActions';

const initialState = {
  chatList: {
    chats: [],
    loading: true,
    error: null,
  },
  successAdd: false,
  successDelete: false,
};

const chatReducer = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    resetSuccessAdd: (state) => {
      state.successAdd = false;
    },
    resetSuccessDelete: (state) => {
      state.successDelete = false;
    },
  },
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
      })
      .addCase(addChat.pending, (state, action) => {
        state.successAdd = false;
      })
      .addCase(addChat.fulfilled, (state, action) => {
        state.successAdd = true;
      })
      .addCase(addChat.rejected, (state, action) => {
        state.successAdd = false;
        state.chatList.error = action.payload;
      })
      .addCase(deleteChat.pending, (state, action) => {
        state.successDelete = false;
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.successDelete = true;
      })
      .addCase(deleteChat.rejected, (state, action) => {
        state.successDelete = false;
        state.chatList.error = action.payload;
      });
  },
});

export const chatSlice = chatReducer.reducer;
export const { resetSuccessAdd, resetSuccessDelete } = chatReducer.actions;
