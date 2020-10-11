// 引入axios
import axios from 'axios';
import router from '../router/index';
import {
  Toast
} from 'vant';
// 初始化接口信息
const $axios = axios.create({
  baseURL: '/api', //每次请求都会将该值放入请求地址前
  timeout: 3000,
})
// 请求拦截器 在请求头上添加token
$axios.interceptors.request.use(function (config) {
  var userInfo = JSON.parse(localStorage.getItem('userInfo'));
  // 修改请求头，添加token
  // 每一个请求都会加token
  config.headers.Authorization = userInfo ? userInfo.token : '';
  return config; //一定要return config 否则  请求无法发送
}, function (error) {
  return Promise.reject(error);
})
// 响应拦截器   返回数据的校验  状态是否正确  信息的提取
$axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.code == 403) {
    Toast.fail(response.data.msg)
    router.push('/login')
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default $axios;
