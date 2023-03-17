<template>
    <div :id="tableid" class="site-container">
        <titleToolVue :title="title" :iconPath="iconPath"></titleToolVue>
        <div class="device">厂房设备</div>
    </div>
</template>
<script>
import titleToolVue from "./titleTool/index.vue";
export default {
  props: ["tableid"],
  data() {
    return {
      title: "广告牌1",
      iconPath: require("../../../assets/cesium/exhaust.svg"),
    };
  },
  components: {
    titleToolVue,
  },
}
</script>
<style scoped>
.site-container{
    width: 600px;
    height: 300px;
    background-image: url('../../../assets/cesium/bg.png');
    background-size: 100% 100%;
}
.device{
  display: flex;
  justify-content: center;
  align-items: center;
  color: aqua;
}
</style>
