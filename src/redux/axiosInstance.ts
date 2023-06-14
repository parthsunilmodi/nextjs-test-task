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
    const authUsername = localStorage.getItem('authUsername');
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      const data = await axiosInstance
        .post('/auth/refresh', {
          refreshToken: refreshToken,
          username: authUsername
        });
      if (data.status === 200){
        await localStorage.setItem('authToken',data.data.data.accessToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;
        return axiosInstance(originalConfig)
      }
    } else {
      console.error(error);
      // localStorage.clear()
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
