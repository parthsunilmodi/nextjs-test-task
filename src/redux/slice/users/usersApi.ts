import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axiosInstance'
import request from "axios";


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
  async (value:ILogin) => {
    try {
      const response = await axiosInstance.post('/auth/signin',value);
      localStorage.setItem('authToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.message)
      }
    }
    
  },
);


export const signUpUser = createAsyncThunk(
  'auth/signup',
  async (value: ISignUpValues) => {
    try {
      const response = await axiosInstance.post('/auth/signup',value);
      localStorage.setItem('authToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.message)
      }
    }
  },
);

export const getUser = createAsyncThunk(
  'getUser',
  async () => {
    try {
      const response = await axiosInstance.get('/users');
      return response.data
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.message)
      }
    }
  },
);

export const logOutUser = createAsyncThunk(
  'logOutUser',
  async () => {
    try {
      localStorage.clear();
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.message)
      }
    }
  },
);


