import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { chatSlice } from './reducers/chatReducers';
import { userSlice } from './reducers/userReducers';
import { messageSlice } from './reducers/messageReducers';

const reducer = combineReducers({
  auth: userSlice,
  chat: chatSlice,
  message: messageSlice,
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
