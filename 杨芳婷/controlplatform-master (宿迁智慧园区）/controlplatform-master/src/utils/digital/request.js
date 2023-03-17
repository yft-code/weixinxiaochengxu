import Vue from "vue";
import axios from "axios";
import { Message, MessageBox } from "element-ui";

import { getBasePath } from './config';

const service = axios.create({
  headers: {
    'Cache-Control': 'no-cache'
  },
  baseURL: getBasePath(),
  timeout: 1000 * 20, // request timeout
});

// request interceptor
service.interceptors.request.use(config => config, error => Promise.reject(error));

service.interceptors.response.use(
  (response) => {
    const code = response.status;
    // 失败
    if (code !== 200) {
      // 提示报错
      Message({
        message: '接口报错！',
        type: "error",
        duration: 2000,
        customClass: "messageCustom",
      });
      return Promise.reject(new Error("Error"));
    } else {
      return response.data;
    }
  },
  (error) => {
    // error.response.status 
    Message({
      message: error,
      type: "error",
      duration: 2000,
      customClass: "messageCustom",
      onClose: function () {
        return Promise.reject(error);
      },
    });
  }
);
export default service;
