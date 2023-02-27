import axios from "axios";

const myAxios = axios.create({
  // baseURL: import.meta.env && '/app-dev',
  baseURL: "/app-dev",
});

myAxios.interceptors.request.use((config) => {
  // 请求
  return config;
});

myAxios.interceptors.response.use((response) => {
  // 第一个data是拦截器返回的数据
  // return response.data.data;
  return getData(response);
});

function getData(Data) {
  // 递归拿data
  if (typeof Data.data === "object") {
    return getData(Data.data);
  } else {
    return Data;
  }
}
export default myAxios;
