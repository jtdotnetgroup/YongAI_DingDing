import axios from 'axios'
import store from '../store';
import Vue from 'vue';

import { CheckToken } from '@/lib/tokenHelper'


export const request = axios.create({
  //永爱的
  //  baseURL: 'http://120.76.205.135:8080',
  //测试的
  baseURL: 'http://120.77.40.245:8080/yapms/',
  // baseURL: "http://192.168.1.145:8091",
  timeout: 50000,

})


// 添加请求拦截器
request.interceptors.request.use(async function (config) {
  Vue.prototype.$toast.loading({message:'加载中',duration:0})
  config.headers.common['code'] = sessionStorage.getItem('code')
  if (config.url.indexOf('getAccessToken') < 0) {
    await CheckToken();
    // 在发送请求之前做些什么
    config.headers.common["Content-Type"] = 'text/plain;charset=UTF-8'
    config.headers.common['userId'] = sessionStorage.getItem('userId')
    config.headers.common['token'] = sessionStorage.getItem('token')
    config.headers.common['pageNo'] = sessionStorage.getItem('pageNo')
    return config;
  } else {
    return config;
  }

}, function (error) {
  // 对请求错误做些什么
  store.commit('SET_LOADING', false);
  Vue.prototype.$toast.clear();
  return Promise.reject(error);
});

//添加响应拦截器
request.interceptors.response.use(function (response) {
  Vue.prototype.$toast.clear();
  // store.commit('SET_LOADING', false);
 

  return response

}, function (error) {

  // Vue.prototype.$toast.fail("拦截器"+error)
  Vue.prototype.$toast.clear();

  if (error.message.indexOf('timeout') >= 0) {
    Vue.prototype.$toast.fail("请求超时")
  } 

  if (error.response) {
    switch (error.response.data.status) {
      case 403:
        Vue.prototype.$toast.fail('抱歉，你没有权限操作')
        break;
      case 500:
        Vue.prototype.$toast.fail('空参数和空值，后台代码出现报错')
        break;
      case 400:
        Vue.prototype.$toast.fail('非法参数，语法格式有误，服务器无法理解此请求')
        break;
      case 404:
        Vue.prototype.$toast.fail('服务器无法回应')
        break;
      default:
        break;
    }

  } else {
    Vue.prototype.$toast.fail(JSON.stringify(error.message))
  }

  Promise.reject(error)

})




