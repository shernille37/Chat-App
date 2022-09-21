import { createSlice } from '@reduxjs/toolkit';
import {
  getAllUsers,
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
  userList: {
    list: [],
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
      })

      // GET ALL USERS

      .addCase(getAllUsers.pending, ({ userList }, action) => {
        userList.loading = true;
      })
      .addCase(getAllUsers.fulfilled, ({ userList }, action) => {
        userList.loading = false;
        userList.list = action.payload;
      })
      .addCase(getAllUsers.rejected, ({ userList }, action) => {
        userList.loading = false;
        userList.error = action.payload;
      });
  },
});

export const userSlice = userReducer.reducer;
