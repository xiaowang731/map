import axios from "axios";
import { message } from "antd"; // 导入 message 组件

const request = axios.create({
  baseURL: "http://149.248.10.38:9090/api",
  timeout: 5000,
});

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response) {
      // 如果服务器返回了错误的响应，可以通过 error.response 获取错误信息
      message.error(
        `请求失败: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      // 请求已经发出，但没有收到响应
      message.error("请求超时或未收到响应");
    } else {
      // 其他错误
      message.error(`错误: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default request;
