<template>
  <div class="all" :id="healthBubbleid" v-if="healthConcern">
    <div class="equipmentDetails" v-if="bubbleShow">
      <div class="equipmentHeader">
        <img
          class="icoStyle"
          src="@/assets/digital/assets/img/mode/healthConcern/ico.png"
          alt=""
        />
        <span class="equipmentHeaderTitle" >{{name}}</span>
        <img
          class="closeImg"
          src="@/assets/digital/assets/img/mode/healthConcern/close.png"
          alt=""
          @click="closeClick"
        />
        <span class="clear"></span>
      </div>
      <div class="equipmentContent">
        <div
          class="equipmentItem"
          v-for="(item, index) in healthBubbleData"
          :key="index"
        >
          <span class="left">{{ item.name }}</span>
          <span class="center"  :class="[item.detail === '未完成' ? 'equipmentDetail' : '',item.detail === '已完成' ? 'equipmentDone' : '']">{{ item.detail }}</span>
          <span class="clear"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["healthBubbleid", "healthBubbleData","name","healthConcern"],
  name: "HealthBubble",
  data() {
    return {
      bubbleShow:true
    };
  },
  created() {},
  mounted() {
    
  },
  watch:{
      'healthConcern': {
          immediate: true,
          deep:true,
          handler (val) {
              if(val){
                this.bubbleShow = true
              }else{
                this.bubbleShow = false
              }
          }
      }
  },
  methods: {
    closeClick(){
      this.bubbleShow = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.equipmentItem {
  width: 88%;
  margin-top: 9px;
  height: 30px;
  // background: gold;
  line-height: 30px;
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
  background: url("~@/assets/digital/assets/img/mode/healthConcern/bg.png") no-repeat;
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