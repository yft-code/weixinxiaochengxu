<template>
  <div>
    <div class="bubbleStyle" v-for="item in bubbleChart" :key="item.id">
      <div class="all" :id="item.id">
        <div class="equipmentDetails" v-if="item.show">
          <div class="equipmentHeader">
            <div class="equipmentHeaderTitle">{{ item.name }}</div>
            <img
              class="closeImg"
              src="@/assets/cesium/bubble/close.svg"
              alt=""
              @click="closeClick(item)"
            />
            <span class="clear"></span>
          </div>
          <div class="equipmentContent">
            <div
              style="
                display: flex;
                justify-content: space-around;
                align-items: center;
              "
            >
              <div class="roll">
                <div class="circles">
                  <p class="word">已使用</p>
                  <p class="word">{{ item.used }}</p>
                </div>
              </div>
              <div class="rollTotal">
                <div class="circlesTotal">
                  <p class="word">总数</p>
                  <p class="word">{{ item.total }}</p>
                </div>
              </div>
              <div class="rollLeft">
                <div class="circlesLeft">
                  <p class="word">未使用</p>
                  <p class="word">{{ item.left }}</p>
                </div>
              </div>
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
  name: "LzBubbleSecond",
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
/*  */
.all {
  width: 230px;
  height: 174px;
  pointer-events: all;
  position: absolute;
  left: 0px;
}
.equipmentDetails {
  width: 280px;
  background: url("~@/assets/cesium/bubble/bg.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 12px 0px 16px 12px;
  position: relative;
}

.equipmentHeader {
  height: 20px;
  margin-bottom:8px;
}

.icoStyle {
  width: 16px;
  height: 16px;
  float: left;
  margin-top: -1px;
}

.equipmentHeaderTitle {
  margin-left: 4px;
  color: #25bcff;
  font-size: 14px;
}
.clear {
  clear: both;
}
.equipmentDetail {
  color: #ff833a !important;
}
.closeImg {
  position: absolute;
  width: 12px;
  right: 0px;
  top: 0px;
  cursor: pointer;
}
.equipmentDone {
  color: #0be6d4 !important;
}
equipmentContent {
  margin-top: 35px;
}
.roll {
  background: rgba(255, 122, 68, 0.4);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.circles {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid transparent;
  border-radius: 50%;

  border-left-color: #ff7a44;
  border-bottom-color: #ff7a44;
  border-right-color: #ff7a44;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  color: #fff;
}
.word {
  color: #fff;
  font-size: 8px;
}
.circlesTotal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid #38b7fd;

  width: 75px;
  height: 75px;
  border-radius: 50%;
  color: #fff;
}
.rollTotal {
  background: rgba(56, 183, 253, 0.4);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.word {
  color: #fff;
  font-size: 8px;
}
.circlesLeft {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 50%;
  border-top-color: #02d6c4;
  border-right-color: #02d6c4;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  color: #fff;
}
.rollLeft {
  background: rgba(2, 214, 196, 0.2);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.word {
  color: #fff;
  font-size: 8px;
}
</style>
