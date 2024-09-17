import axios from 'axios';
import { ExceptionApiResponse } from '@/common/exceptions';
import Cookies from 'js-cookie';

const isProduction = process.env.NODE_ENV === 'production';
export const BASE_URL_DEV = process.env.NEXT_PUBLIC_BASE_URL_DEV;
export const BASE_URL_PRO = process.env.NEXT_PUBLIC_BASE_URL_PRO;
export const BASE_URL = isProduction ? BASE_URL_PRO : BASE_URL_DEV;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials:true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin':'*'
  },
});
axiosInstance.interceptors.request.use(
  function (config) {
    let token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const apiError = error?.response?.data ?? null;
    if (apiError) {
      const status = apiError.status;
      if (status === 401) {
        Cookies.remove('token');
        const pathname = window.location.pathname;
        if (!pathname.includes('signin')) {
          window.location.replace('/signin');
        }
      }
    }
    ExceptionApiResponse(error);
    return Promise.reject(error);
  }
);

const { get, post, put, delete: destroy } = axiosInstance;
export { get, post, put, destroy };

export default axiosInstance;
