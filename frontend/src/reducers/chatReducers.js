import { createSlice } from '@reduxjs/toolkit';
import { addChat, deleteChat, getChats } from '../actions/chatActions';
import { receiveMessage } from '../actions/messageActions';

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
    resetError: (state) => {
      state.chatList.error = null;
    },
    resetSuccessAdd: (state) => {
      state.successAdd = false;
    },
    resetSuccessDelete: (state) => {
      state.successDelete = false;
    },
  },
  extraReducers(builder) {
    builder

      // GET CHATS
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

      // ADD A CHAT
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

      // DELETE CHAT
      .addCase(deleteChat.pending, (state, action) => {
        state.successDelete = false;
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.successDelete = true;
      })
      .addCase(deleteChat.rejected, (state, action) => {
        state.successDelete = false;
        state.chatList.error = action.payload;
      })

      // RECEIVE A MESSAGE
      .addCase(receiveMessage, ({ chatList }, action) => {
        chatList.loading = false;
      });
  },
});

export const chatSlice = chatReducer.reducer;
export const { resetError, resetSuccessAdd, resetSuccessDelete } =
  chatReducer.actions;
