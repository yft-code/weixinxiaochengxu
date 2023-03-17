import Vue from 'vue'
import LzRealtime from './web/LzRealtime/index.vue'
import LzTree  from './web/LzTree/index.vue'
import LzBreadcrumb from './web/LzBreadcrumb/index.vue'
import LzBasecom from './cesium/LzBasecom/index.vue'
import LzCustomheader from "./web/LzCustomheader/index.vue";
import LzXyhandle from "./web/LzXyhandle/index.vue";
import LzBaseline from "./web/LzBaseline/index.vue";
import LzTimeselect from './web/LzTimeselect/index.vue';
import LzMap from './cesium/LzMap/index.vue';
import LzBillboard from './cesium/LzBillboard/index.vue'
import LzBillboardSecond from './cesium/LzBillboardSecond/index.vue'
import LzBubble from './cesium/LzBubble/index.vue'
import LzBubbleSecond from './cesium/LzBubbleSecond/index.vue'
import LzRoadHigh from './cesium/LzRoadHigh'
import LzBubbleThird from './cesium/LzBubbleThird/index.vue'
import LzCamera from './cesium/LzCamera/index.vue'
const components = [LzRealtime, LzTree, LzCustomheader, LzXyhandle, LzBaseline,  LzBreadcrumb, LzTimeselect,
  LzBasecom, LzMap, LzBillboard, LzBillboardSecond, LzBubble, LzBubbleSecond, LzRoadHigh,LzBubbleThird, LzCamera];
const install = function () {
  //全局注册所有组件
  components.forEach((item) => {
    Vue.component(item.name, item);
  });
};
if (typeof window != "undefined" && window.Vue) {
  install(window.Vue);
}
export default {
  install,
};
