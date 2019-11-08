import axios from "axios";

//设置基准路径
axios.defaults.baseURL = "http://picc.api.dev.kcbigdata.cn/";

// 添加请求拦截器
const $axios = axios.create({
  timeout: 5000
});

$axios.interceptors.request.use(
  config => {

    //在发送请求之前做某件事
    config.headers["authorization"] = localStorage.getItem("picc_token")
      ? localStorage.getItem("picc_token")
      : "";
    return config;
  },
  error => {

    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  res => {
    //对响应数据做些事

    return res;
  },
  error => {
    if (error.message.includes("timeout")) {

      return Promise.reject("网络超时");
    }

    return Promise.reject(error.message);
  }
);

export default $axios;
