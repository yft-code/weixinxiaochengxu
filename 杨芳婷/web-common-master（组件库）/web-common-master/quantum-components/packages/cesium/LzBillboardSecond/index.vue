<template>
  <div class="water-testing-all" :id="billboard.id">
    <div class="water-testing">
      <div class="water-header">
        <img
          class="icoStyle"
          src="@/assets/cesium/billboardsecond/ico.png"
          alt=""
        />
        <span class="water-header-title">{{billboard.name}}</span>
      </div>
      <div class="water-content">
        <div class="water-item" v-for="(item, index) in billboard.data" :key="index">
          <div class="left">
            <img
              src="@/assets/cesium/billboardsecond/ico0.png"
              alt=""
            />
          </div>
          <div class="right">
            <div class="one">
              <span class="number">{{item.temp}}</span>
              <span class="wendu">℃</span>
            </div>
            <div class="two">
              <span class="wendu">温度</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { addFeature} from '../utils/hook/hookChars'
export default {
  name: "LzBillboardSecond",
  props: {
    billboard: {
      default:{},
      type: Object,
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
          addFeature(this.billboard,val);
        }
       },
       immediate:true
     }
  },
  methods: {
    initData(){
     
    },

  },
};
</script>
<style lang="scss" scoped>
.water-testing-all {
  width: 385px;
  position: absolute;
  left:-5000px;
  pointer-events: all;
}
.water-testing {
  width: 365px;
  background: url("~@/assets/cesium/billboardsecond/warehosebg.png") no-repeat;
  background-size: 100% 100%;
  padding: 16px 0px 0px 20px;
  box-sizing: border-box;
  position: relative;
  .water-header {
    height: 20px;
    font-size: 16px;
    .icoStyle {
      width: 20px;
      height: 20px;
    }
    .water-header-title {
      color: #25bcff;
    }
  }
  .water-content {
    // background: gold;
    // height: 456px;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 16px;
    .water-item {
      display: flex;
      margin-top: 16px;
      width: 50%;
      // background: red;
      height: 58px;
      .left {
        img {
          width: 58px;
          height: 58px;
        }
      }
      .right {
        width: 90px;
        margin-left: 10px;
        // background: #25bcff;
        height: 100%;
        .one{
          height: 50%;
          line-height: 29px;
          // background: red;
         .number{
          color: #fff;
          font-size: 19px;
         }
         .wendu{
          margin-left: 10px;
          color: #FFFFFF;
          font-size: 10px;
         }
                
        }
         .two{
          line-height: 29px;
          height: 50%;
          // background: red;
          .wendu{
            color: #FFFFFF;
          }
        }
      }
    }
  }
}
</style>
