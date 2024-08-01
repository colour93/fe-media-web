import axios, { AxiosResponse } from 'axios';
import { IBaseResponse } from '../typings/network';
import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

const axiosInstance = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<IBaseResponse>) => {
    const { code, msg } = response.data;
    if ([200, 201, 304].includes(code)) {
      return response;
    } else {
      toast({
        title: msg ?? '未知错误',
        status: 'error'
      })
      return Promise.reject(new Error(msg || 'unknown error'));
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
