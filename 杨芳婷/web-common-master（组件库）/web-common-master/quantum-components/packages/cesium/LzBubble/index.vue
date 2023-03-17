<template>
  <div>
    <div class="bubbleStyle" v-for="item in bubbleChart" :key="item.id">
      <div class="all" :id="item.id">
        <div class="equipmentDetails" v-if="item.show">
          <div class="equipmentHeader">
            <img
              class="icoStyle"
              src="@/assets/cesium/bubble/ico.jpg"
              alt=""
            />
            <span class="equipmentHeaderTitle">{{ item.name }}</span>
            <img
              class="closeImg"
              src="@/assets/cesium/close.png"
              alt=""
              @click="closeClick(item)"
            />
            <span class="clear"></span>
          </div>
          <div class="equipmentContent">
            <div
              class="equipmentItem"
              v-for="(item2, index2) in item.data"
              :key="index2"
            >
              <span class="left">{{ item2.name }}</span>
              <span
                class="center"
                :class="[
                  item.detail === '未完成' ? 'equipmentDetail' : '',
                  item.detail === '已完成' ? 'equipmentDone' : '',
                ]"
                >{{ item2.detail }}</span
              >
              <span class="clear"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {addpopUp} from '../utils/hook/hookChars'
export default {
  name: "LzBubble",
  props: {
    bubbleChart: {
      default:[],
      type: Array,
    },
      viewer:{
        default:{},
        type: Object,
      }
  },
  data() {
    return {

    };
  },
  mounted() {
    this.initData();
  },
  watch:{
     viewer:{
       handler(val){
        if(Object.keys(val).length !== 0){
          this.bubbleChart.forEach((item) => {
                  addpopUp(item,val);
                });
        }
       },
       immediate:true
     }
  },
  methods: {
    initData(){

    },
    closeClick(item){
       item.show = false;
       this.$forceUpdate();
    }
  },
};
</script>
<style scoped>
.bubbleStyle {
  position: absolute;
  width: 500px;
  top:0px;
  left:0px;
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
    color:  #25bcff;
    font-size: 12px;
    text-align: left;
  }
/*  */
.all {
  width: 230px;
  height: 174px;
  pointer-events:all;
  position: absolute;
  left:0px;
}
.equipmentDetails {
  width: 230px;
  height: 174px;
  background: url("~@/assets/cesium/bubble/bg.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 12px 0px 0px 12px;
  position: relative;
}

.equipmentHeader {
  height: 20px;
}

.icoStyle {
  width: 16px;
  height: 16px;
  float:left;
  margin-top:-1px;
}

.equipmentHeaderTitle {
  margin-left:4px;
  color: #25bcff;
  float:left;
  font-size: 14px;
}
.clear{
  clear:both;
}
.equipmentDetail{
  color:#FF833A !important;
}
.closeImg{
  position: absolute;
  width:12px;
  right:0px;
  top:0px;
  cursor: pointer;
}
.equipmentDone{
  color:#0BE6D4 !important;
}
</style>
