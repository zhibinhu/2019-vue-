import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import store from './store';
import App from './app.vue';
import util from '@/libs/util.js';
import hasPermission from '@/libs/hasPermission.js';
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
// import './libs/axios' 
import * as filters from './filters' // global filters
import myGlobal from './components/myGlobal.vue'
import './images/iconfont/iconfont.css';

Vue.use(iView);
Vue.use(hasPermission);
Vue.use(ElementUI);
axios.defaults.withCredentials = true;
window.Promise = Promise;
Vue.prototype.$myHttp = axios;
Vue.prototype.myGlobal = myGlobal;
Vue.prototype.notifyShowFlag=true;
Vue.prototype.menuUri = '';//./src/data/menu.json'   本地调试时用这个，打包时置空
window.suffix = ''; //?user=songchao&id=15302559515867820&roles=pUser     本地调试时用这个，打包时置空
axios.defaults.timeout = 100000;

//测试环境
/*Vue.prototype.uploaduri = 'http://192.168.1.174:6102/';    /!*文件上传路径*!/
Vue.prototype.prefix = 'http://192.168.1.174:6102/';
Vue.prototype.prefixEX = './trans/';
Vue.prototype.permissionPrefix = 'http://192.168.1.174:6102/';*/

//正式环境
/*Vue.prototype.uploaduri = 'http://portal.cnbmxinyun.com:8002/';    /!*文件上传路径*!/
Vue.prototype.prefix = 'http://portal.cnbmxinyun.com:8002/';
Vue.prototype.prefixEX = './trans/';
Vue.prototype.permissionPrefix = 'http://portal.cnbmxinyun.com:8002/';*/

//本地
Vue.prototype.loginPrefix = process.env.API_HOST;
Vue.prototype.uploaduri = process.env.API_HOST;
Vue.prototype.permissionPrefix = process.env.API_HOST;
Vue.prototype.prefix = process.env.API_HOST;
Vue.prototype.prefixWork = process.env.API_HOST;
Vue.prototype.homePrefix = process.env.API_HOST;
Vue.prototype.prefixEX = 'http://192.168.1.174:6001/trans/';
window.UEDITOR_SERVER_URL = process.env.UEDITOR_SERVER_URL;
window.API_HOST = process.env.API_HOST;

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

var vm=new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    mounted() {
        // 调用方法，动态生成路由
        util.initRouter(this);
    }
});

//添加请求拦截器
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
// console.log('response--interceptors---',response)
    return response
}, function (error) {
    console.log('error.response--interceptors---',error.response)
    if(error && error.response){
        if(error.response.status==401){
            if(store.state.notifyShowFlag) {
                store.state.notifyShowFlag=false;
                vm.$notify({
                    type: 'info',
                    title: '提示',
                    message: '您的登录凭证已失效，请重新登录',
                    position: 'bottom-right'
                });
            }
            sessionStorage.clear();
            localStorage.clear();
            vm.$router.push({
                path:'/login'
            });
            return ;
        }
    }
    return Promise.reject(error)
});