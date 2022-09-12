import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './reducers/userReducers';

const reducer = combineReducers({
  auth: userSlice,
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
