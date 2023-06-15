import { createAsyncThunk } from '@reduxjs/toolkit';
import request from 'axios';
import axiosInstance from '../../axiosInstance';
import { setToast } from '../toast/toastSlice';


interface ISignUpValues {
  name: string;
  password: string;
  username: string;
}

interface ILogin {
  password: string;
  username: string;
}

export const loginUser = createAsyncThunk(
  'auth/signin',
  async (value: ILogin, { dispatch }) => {
    try {
      const response = await axiosInstance.post('/auth/signin', value);
      localStorage.setItem('authToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      dispatch(setToast({ visible: true, message: 'Login successful', type: 'success' }));
      return response.data;
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        dispatch(setToast({ visible: true, message: e.response.data.message || 'Something went wrong', type: 'error' }));
        throw new Error(e.response.data.message);
      }
    }

  },
);


export const signUpUser = createAsyncThunk(
  'auth/signup',
  async (value: ISignUpValues) => {
    try {
      const response = await axiosInstance.post('/auth/signup', value);
      localStorage.setItem('authToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response;
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.response.data.message);
      }
    }
  },
);

export const getUser = createAsyncThunk(
  'getUser',
  async () => {
    try {
      const response = await axiosInstance.get('/users');
      return response.data;
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.response.data.message);
      }
    }
  },
);

export const logOutUser = createAsyncThunk(
  'logOutUser',
  async () => {
    try {
      localStorage.clear();
      return null;
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.response.data.message);
      }
    }
  },
);


