<template>
  <div class="water-testing-all" :id="tableid">
    <div class="water-testing">
      <div class="water-header">
        <img
          class="icoStyle"
          src="@/assets/digital/assets/img/mode/billboard/ico.png"
          alt=""
        />
        <span class="water-header-title">环保检测</span>
      </div>
      <div class="water-content">
        <div class="water-item" v-for="(item, index) in tableData" :key="index">
          <div class="left">
            <img
              src="@/assets/digital/assets/img/mode/billboard/ico0.png"
              alt=""
            />
          </div>
          <div class="right">
            <div class="one">
              <span class="number">50</span>
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
export default {
  props: ["tableid", "componentData"],
  data() {
    return {
      tableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    };
  },
};
</script>

<style lang="scss" scoped>
.water-testing-all {
  width: 365px;
  height: 562px;
  position: relative;
  pointer-events: all;
}
.water-testing {
  width: 365px;
  height: 562px;
   background: url("~@/assets/digital/assets/img/mode/billboard/warehosebg.png") no-repeat;
  background-size: 100% 100%;
  padding: 16px 0px 0px 20px;
  box-sizing: border-box;
  position: relative;
  .water-header {
    height: 20px;
    .icoStyle {
      width: 20px;
      height: 20px;
    }
    .water-header-title {
      color: #25bcff;
    }
    margin-bottom: 7px;
  }
  .water-content {
    // background: gold;
    // height: 456px;
    display: flex;
    flex-wrap: wrap;
    .water-item {
      display: flex;
      margin-top: 22px;
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