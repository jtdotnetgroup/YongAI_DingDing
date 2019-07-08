import axios from 'axios'

export const request = axios.create({
    baseURL: 'http://192.168.1.145:8090',
    timeout: 5000,
    
})


request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.common["Content-Type"]='text/plain;charset=UTF-8'
    config.headers.common['code']=sessionStorage.getItem('code')
    config.headers.common['userId']= sessionStorage.getItem('userId') 
    config.headers.common['token']= sessionStorage.getItem('token') 
    config.headers.common['pageNo']= sessionStorage.getItem('pageNo')
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });




