import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import '@assets/css/index.scss' //公用样式
// 引入axios
import axios from "axios";
Vue.prototype.$http = axios;

// 引入elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

// 引入mixin,公共方法存储
import mixin from "./utils/mixin";
Vue.mixin(mixin);


import "../public/static/css/style.css";
import "../public/static/js/SkyBoxOnGround.js";
import "../public/static/js/CesiumWallBillboard.js"
// 全局注册
import "./components";
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// AI视界相关引用
import '@/assets/iconfont/iconfont.css' // 引入iconfont
Vue.prototype.$bus = new Vue()  // 增加事件总线

import tool from './utils/ai/tools'// 处理缓存工具

import global_ from './base.vue'
Vue.prototype.GLOBAL = global_;
Vue.use(tool)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
