import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')


//配置网络请求

var serType = localStorage.getItem("sertype")
var serAddr = localStorage.getItem('seraddr')
var port = localStorage.getItem('port')

var baseurl = serType + "://"+serAddr+":"+port

const httpService = axios.create({
  baseURL: baseurl, // url前缀
  timeout: 3000 // 请求超时时间
});

httpService.interceptors.request.use(
  config => {
      // 根据条件加入token-安全携带
      if (true) { // 需自定义
          // 让每个请求携带token
          config.headers['Token'] = localStorage.getItem('token');
      }
      return config;
  }, 
  error => {
      // 请求错误处理
      Promise.reject(error);
  }
)
