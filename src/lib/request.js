import axios from 'axios'
import store from '../store';


export const request = axios.create({
     baseURL: 'http://120.77.40.245:8088/yapms',
    // baseURL:"192.168.1.165:8080"
    timeout:50000,
    
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  store.commit('SET_LOADING');
    // 在发送请求之前做些什么
    config.headers.common["Content-Type"]='text/plain;charset=UTF-8'
    config.headers.common['code']=sessionStorage.getItem('code')
    config.headers.common['userId']= sessionStorage.getItem('userId') 
    config.headers.common['token']= sessionStorage.getItem('token') 
    config.headers.common['pageNo']= sessionStorage.getItem('pageNo')
    return config;
  }, function (error) {
    // 对请求错误做些什么
    store.commit('SET_LOADING');
    return Promise.reject(error);
  });

//添加响应拦截器
request.interceptors.response.use(function(response){

  store.commit('SET_LOADING');

  return response

},function (error){

  // alert("拦截器"+error)
  store.commit('SET_LOADING');
   if(error.response){
    switch(error.response.data.status){
      case 403:
      alert('抱歉，你没有权限操作')
      break;
      case 500:       
       alert('空参数和空值，后台代码出现报错')
      break;
      case 400:
      alert('非法参数，语法格式有误，服务器无法理解此请求')
      break;
      case 404:       
       alert('服务器无法回应')
      break;
      default:
      break;
    }
    
   }else if(error.message.indexOf('timeout')>=0){

    alert("请求超时")

   }else{
    alert(error.message)
   }

   return Promise.reject(error)

}) 




