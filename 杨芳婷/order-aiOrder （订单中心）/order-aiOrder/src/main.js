import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 引入axios
import axios from "axios";
Vue.prototype.$http = axios;


// 引入elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);


// 使用swiper
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min'

Vue.prototype.$bus = new Vue()  // 增加事件总线

import tool from './utils/ai/tools'// 处理缓存工具

Vue.use(tool)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
