import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  // withCredentials: true,
});

axios.interceptors.response.use(
  (response) => {
    const authorizationHeader = response.headers.authorization;
    if (authorizationHeader) {
      localStorage.setItem('token', authorizationHeader);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error.message);
  }
);

export const get = (url, config) => axiosInstance.get(url, { ...config });

export const post = (url, body, config) => axiosInstance.post(url, body, config);

export const put = (url, body, config) => axiosInstance.put(url, body, config);

export const patch = (url, body, config) => axiosInstance.patch(url, body, config);

export const destroy = (url, body, config) => axiosInstance.delete(url, body, config);
