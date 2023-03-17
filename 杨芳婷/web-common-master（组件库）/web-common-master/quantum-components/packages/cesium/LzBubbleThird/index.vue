<template>
  <div>
    <div class="bubbleStyle" v-for="item in bubbleChart" :key="item.id">
      <div class="all" :id="item.id">
      <div class="equipment-details" v-if="item.show">
      <div class="equipment-header">
        <img
          class="icoStyle"
          src="@/assets/cesium/bubble/ico.jpg"
          alt=""
         
        />
         <img
          class="closeImg"
          src="@/assets/cesium/close.png"
          alt=""
          @click="closeClick(item)"
        />
        <span class="equipment-header-title">{{item.name}}</span>
      </div>
      <div class="equipment-content">
        <div
          class="equipment-item"
          v-for="(item2, index2) in item.data"
          :key="index2"
        >
          <span class="left">{{ item2.name }}</span>
          <span class="right">吨</span>
          <span class="center">{{ item2.number }}</span>
        </div>
      </div>
      </div>
    </div> 
  </div>
  </div>
</template>
<script>
import { addpopUp } from "../utils/hook/hookChars";
export default {
  name: "LzBubbleThird",
  props: {
    bubbleChart: {
      default: [],
      type: Array,
    },
    viewer: {
      default: {},
      type: Object,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.initData();
  },
  watch: {
    viewer: {
      handler(val) {
        if (Object.keys(val).length !== 0) {
          this.bubbleChart.forEach((item) => {
            addpopUp(item, val);
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    initData() {},
    closeClick(item) {
      item.show = false;
      this.$forceUpdate();
    },
  },
};
</script>
<style scoped>
.bubbleStyle {
  position: absolute;
  width: 500px;
}
.equipmentItem {
  width: 88%;
  margin-top: 9px;
  height: 30px;
  line-height: 30px;
}
.left {
  float: left;
  color: #ffffff;
  font-size: 12px;
}
.center {
  margin-left: 10px;
  float: left;
  color: #25bcff;
  font-size: 12px;
  text-align: left;
}
.closeImg {
  position: absolute;
  width: 16px;
  right: 0px;
  top: 0px;
  cursor: pointer;
}
.left {
  float: left;
  color: #ffffff;
  font-size: 16px;
}
.right {
  float: right;
  color: #25bcff;
  font-size: 16px;
}
.equipment-item {
  width: 88%;
  margin-top: 9px;
  height: 40px;
  line-height: 40px;
}
.center {
  margin-right: 10px;
  float: right;
  color: #ff833a;
  font-size: 20px;
  font-weight: 600;
}
/*  */
.all {
  width: 277px;
  height: 325px;
  position: relative;
  pointer-events: all;
}
.equipment-details {
  width: 277px;
  background: url("~@/assets/cesium/bubble/warehosebg.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 16px 0px 20px 20px;
}

.equipment-header {
  height: 20px;
}

.icoStyle {
  z-index: 999999;
  width: 20px;
  height: 20px;
  margin-top:-4px;
}

.equipment-header-title {
  color: #25bcff;
  font-size: 16px;
}
</style>
