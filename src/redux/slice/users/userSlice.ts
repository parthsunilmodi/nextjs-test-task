import { createSlice } from '@reduxjs/toolkit';
import {getUser, loginUser, logOutUser, signUpUser} from './usersApi';

type UserState = {
  name: string;
  email: string;
  token: string;
  refreshToken: string;
  loading: boolean;
  error: string | undefined;
  user: any;
};

const initialState: UserState = {
  name: '',
  email: '',
  token: '',
  refreshToken: '',
  loading: false,
  error: '',
  user: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(loginUser.fulfilled, (state, action:any) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
     state.loading = false;
     state.error = action.error.message;
    });
    builder.addCase(signUpUser.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(signUpUser.fulfilled, (state, action:any) => {
      state.token = action.payload.data.accessToken;
      state.refreshToken = action.payload.data.refreshToken;
      state.loading = false;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(getUser.fulfilled, (state, action:any) => {
      state.user = action.payload
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(logOutUser.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(logOutUser.fulfilled, (state, action:any) => {
      initialState
    });
    builder.addCase(logOutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addDefaultCase((state, action) => {
      state.loading = false;
    });
  }
});

export default userSlice.reducer;
