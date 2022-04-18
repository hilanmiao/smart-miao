import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

App.mpType = 'app';

// 此处为演示Vue.prototype使用，非uView的功能部分
Vue.prototype.vuePrototype = '枣红';

// 引入全局uView
import uView from 'plugin/uview-ui';
Vue.use(uView);

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store';

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

// 引入uView对小程序分享的mixin封装
let mpShare = require('plugin/uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare);

// dayjs
import dayjs from 'plugin/dayjs/dayjs.min'
Vue.prototype.$dayjs = dayjs

// 配置luchRequest
import Request from "plugin/luch-request";
Vue.prototype.$luchRequest = new Request()
import { authInterceptor } from './services'
import { serverURL } from './config'
Vue.prototype.$luchRequest.config.baseURL = serverURL
Vue.prototype.$luchRequest.interceptors.response.use(authInterceptor.response, authInterceptor.responseError)
Vue.prototype.$luchRequest.config.header.Authorization = store.state.vuex_accessToken

// 权限验证全局函数
import verifyPermission from './permission'
Vue.prototype.$verifyPermission = verifyPermission

// 颜色
Vue.prototype.$cusMaincolor = '#DC4232'

const app = new Vue({
	store,
	...App
});


app.$mount();
