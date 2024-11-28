import { message } from 'antd';
import axios from 'axios';

export type ResponseDataType = {
  [key: string]: any;
};

export type ResponseType<T = ResponseDataType> = {
  code: number;
  data: T;
  msg?: string;
};

const request = axios.create({
  timeout: 10 * 1000
});

// 请求拦截
request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截
request.interceptors.response.use(
  res => {

    const { code, msg } = (res.data || {}) as ResponseType;

    if (code !== 200) {
      // 错误提示
      if (msg) {
        message.error(msg);
      }
      
      throw new Error(msg);
    }

    // 对响应数据做点什么
    return res.data as any;
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);


export default request;