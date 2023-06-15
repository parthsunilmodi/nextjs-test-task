import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = `Bearer ${localStorage.getItem('authToken')}`;
    
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    console.log(error)
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) =>   {
    const originalConfig = error.config;
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      localStorage.clear();
    } else {
      console.error(error);
      // localStorage.clear()
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
