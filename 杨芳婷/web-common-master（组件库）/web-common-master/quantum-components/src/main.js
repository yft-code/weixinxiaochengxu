import Vue from 'vue'
import App from './App.vue'
import webCommon from '../packages'
import router from './router'
import store from './store'
import "../public/static/css/style.css";
import "../public/static/js/SkyBoxOnGround.js";
import "../public/static/js/CesiumWallBillboard.js"
// 引入elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// import html2canvas from "html2canvas"
// Vue.use(html2canvas)
// import * as Cesium from 'cesium/Cesium'
// import * as widget from "cesium/Widgets/widgets.css";

// Vue.prototype.Cesium = Cesium
// Vue.prototype.widget = widget
Vue.prototype.store = store;
Vue.prototype.$bus = new Vue()  // 增加事件总线
// Vue.use(Cesium)
Vue.config.productionTip = false
Vue.use(webCommon)
new Vue({
  router, 
  render: h => h(App),
  
}).$mount('#app')
