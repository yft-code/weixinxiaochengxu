import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import '@assets/css/reset.css' // 样式重置
import '@assets/css/style.css' //公用样式
import "amfe-flexible";

import vdr from 'vue-draggable-resizable-gorkys'

// 导入默认样式
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
Vue.component('vdr', vdr)
// 引入axios
import axios from "axios";
Vue.prototype.$http = axios;


import scroll from "vue-seamless-scroll";
Vue.use(scroll);

// 引入elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

// 引入mixin
import mixin from "./utils/mixin";
Vue.mixin(mixin);
import mixin2 from "./utils/digital/mixin";
Vue.mixin(mixin2)

// 使用swiper
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min'

import vueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(vueAwesomeSwiper);

import "../public/static/css/style.css";
import "../public/static/js/SkyBoxOnGround.js";
import "../public/static/js/CesiumWallBillboard.js"
// import html2canvas from "html2canvas"
// Vue.use(html2canvas)
// 全局注册
import "./components";
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// AI视界相关引用
import '@/assets/iconfont/iconfont.css' // 引入iconfont
Vue.prototype.$bus = new Vue()  // 增加事件总线
import { initWebSocket } from "./plugin/socket"  // websoket引入
import tool from './utils/ai/tools'// 处理缓存工具
//import 'default-passive-events'
import global_ from './base.vue'
Vue.prototype.GLOBAL = global_;
Vue.use(tool)

try {
  if(localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))){
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))['aiHorizon'];
    if (userInfo) {
      initWebSocket();
    } 
  }
 
} catch (error) {
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
