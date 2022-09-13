import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { chatSlice } from './reducers/chatReducers';
import { userSlice } from './reducers/userReducers';

const reducer = combineReducers({
  auth: userSlice,
  chat: chatSlice,
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
