import Vue from "vue";
import router from '../router'
import axios from 'axios';
import { Message } from 'element-ui';

// axios 配置

// http request 拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
        case 403:
          // if(localStorage.token) {
          // 	Message.error("登录已过期，请重新登录！");
          // 	// 清除token
          // 	localStorage.clear();
          // }else {
          // 	Message.error("无权限，请先登录！");
          // }
          // router.push("/login");
          break;
        // 404请求不存在
        case 404:
          break;
        // 其他错误，直接抛出错误提示
        default:
          Message.error(error.response.data.message);
      }
      return Promise.reject(error.response);
    }
  }
);
export default axios;