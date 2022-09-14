import { createSlice } from '@reduxjs/toolkit';
import {
  getUserProfile,
  login,
  logout,
  register,
} from '../actions/userActions';

const initialState = {
  authUser: {
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
    loading: false,
    error: null,
  },
  userInfo: {
    details: null,
    loading: true,
    error: null,
  },
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      // LOGOUT
      .addCase(logout, (state, action) => {
        localStorage.removeItem('user');
        return { ...initialState, authUser: { user: null } };
      })

      // LOGIN
      .addCase(login.pending, ({ authUser }, action) => {
        authUser.loading = true;
      })
      .addCase(login.fulfilled, ({ authUser }, action) => {
        authUser.loading = false;
        authUser.user = action.payload;

        localStorage.setItem('user', JSON.stringify(authUser.user));
      })
      .addCase(login.rejected, ({ authUser }, action) => {
        authUser.loading = false;
        authUser.error = action.payload;
      })

      // REGISTER

      .addCase(register.pending, ({ authUser }, action) => {
        authUser.loading = true;
      })
      .addCase(register.fulfilled, ({ authUser }, action) => {
        authUser.loading = false;
        authUser.user = action.payload;

        localStorage.setItem('user', JSON.stringify(authUser.user));
      })
      .addCase(register.rejected, ({ authUser }, action) => {
        authUser.loading = false;
        authUser.error = action.payload;
      })

      // GET USER PROFILE

      .addCase(getUserProfile.pending, ({ userInfo }, action) => {
        userInfo.loading = true;
      })
      .addCase(getUserProfile.fulfilled, ({ userInfo }, action) => {
        userInfo.loading = false;
        userInfo.details = action.payload;
      })
      .addCase(getUserProfile.rejected, ({ userInfo }, action) => {
        userInfo.loading = false;
        userInfo.error = action.payload;
      });
  },
});

export const userSlice = userReducer.reducer;
