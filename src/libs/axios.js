import axios from 'axios'

axios.interceptors.request.use(function (config) {
    if(sessionStorage.getItem('token')){
        config.headers.Authorization='Sys '+sessionStorage.getItem('token');
        // config.headers["Content-Type"]='application/json';
    }
  return config
}, function (error) {

  return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {

  return response
}, function (error) {
  return Promise.reject(error)
});

export default axios;
