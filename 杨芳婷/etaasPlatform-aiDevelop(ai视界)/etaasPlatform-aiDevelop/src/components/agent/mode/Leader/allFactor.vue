<template>
  <div class="all" :id="tableid" v-if="leaderConcern">
    <div class="equipment-details" v-if="leaderShow">
      <div class="equipment-header">
        <img
          class="icoStyle"
          src="@/assets/digital/assets/img/mode/billboard/ico.png"
          alt=""
         
        />
         <img
          class="closeImg"
          src="@/assets/agent/img/close.svg"
          alt=""
          @click="close"
        />
        <span class="equipment-header-title">{{name}}</span>
      </div>
      <div class="equipment-content">
        <div
          class="equipment-item"
          v-for="(item, index) in componentData"
          :key="index"
        >
          <span class="left">{{ item.name }}</span>
          <span class="right">吨</span>
          <span class="center">{{ item.number }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tableid", "componentData","name","leaderConcern"],
  name: "allFactor",
  data() {
    return {
      leaderShow:true
    };
  },
    watch:{
      'leaderConcern': {
          immediate: true,
          deep:true,
          handler (val) {
              if(val){
                this.leaderShow = true
              }
          }
      }
  },
  created() {},
  mounted() {},
  methods: {
    close(){
      this.leaderShow = false
    }
  },
};
</script>

<style lang="scss"   scoped>
.closeImg{
  position: absolute;
  width:16px;
  right:0px;
  top:0px;
  cursor: pointer;
}
.equipment-item {
  width: 88%;
  margin-top: 9px;
  height: 40px;
  // background: gold;
  line-height: 40px;
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
  .center {
    margin-right: 10px;
    float: right;
    color: #ff833a;
    font-size: 20px;
    font-weight: 600;
  }
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
  height: 325px;
  background: url("~@/assets/digital/assets/img/mode/billboard/warehosebg.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 16px 0px 0px 20px;
}

.equipment-header {
  height: 20px;
}

.icoStyle {
  z-index: 999999;
  width: 20px;
  height: 20px;
}

.equipment-header-title {
  color: #25bcff;
}
</style>