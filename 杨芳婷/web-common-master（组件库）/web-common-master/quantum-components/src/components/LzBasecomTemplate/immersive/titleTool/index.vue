<template>
  <div class="title">
    <img v-show="iconPath" :src="iconPath" class="icon" />
    <div class="text">{{ title }}</div>
    <div v-if="!type" class="closeTool" @click="showEventContainer"></div>
  </div>
</template>

<script>
export default {
  props: ["title", "iconPath", "type"],
  components: {},
  data() {
    return {};
  },
  methods: {
    showEventContainer() {},
  },
};
</script>

<style scoped lang="less">
.title {
  width: 100%;
  height:2.5rem;
  line-height: 2.5rem;
  display: flex;
  position: relative;
  .icon {
    width: 20px;
    height: 20px;
    margin: 12px 8px 0px 10px;
  }
  .text {
    font-size: 20px;
    color: #38b7fd;
  }
  .closeTool {
    width: 26px;
    height: 26px;
    position: absolute;
    top: 0.7rem;
    right: 1rem;
    background: url('../../../../assets/cesium/close.png') no-repeat;
    background-size: 100% 100%;
    z-index: 210;
  }
}
</style>
