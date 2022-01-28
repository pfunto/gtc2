import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

if (localStorage.getItem('token')) {
  instance.interceptors.request.use(
    async (config) => {
      config.headers = {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
}

export default instance;
