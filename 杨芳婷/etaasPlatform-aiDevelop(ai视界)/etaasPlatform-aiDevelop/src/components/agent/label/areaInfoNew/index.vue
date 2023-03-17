<template>
  <div class="areaInfo" id="areaInfo" v-show="$store.state.areaInfoShowNew">
    <div class="earlyWarningTitle">
      <img class="icoStyle" src="~@/assets/digital/assets/img/earlyWarning/ico.png" alt="">
       <span style="color:#25BCFF"> 机房</span>
         <img
          class="closeImg"
          src="@/assets/agent/img/close.svg"
          alt=""
          @click="closeClick"
        />
       <!-- <span  class="earlyWarningClose" style="color:#000"  @click="closeClick">X</span> -->
      <!-- <img
        src="~@/assets/digital/assets/img/earlyWarning/close.png"
        class="earlyWarningClose"
       
      /> -->
    </div>
    <!-- <div>
      <div class="earlyWarningBorderCircle"></div>
      <div class="earlyWarningBorder"></div>
      <div class="earlyWarningBorderCircles"></div>
      <div class="clear"></div>
    </div> -->
    <div class="areaInfoContent">
      <div class="areaInfoLi">
        <div class="areaInfoLiTitle">园区/厂区</div>
        <div class="areaInfoLiInfo">
          {{
            $store.state.areaInfo.parkName
              ? $store.state.areaInfo.parkName
              : "--"
          }}
        </div>
        <div class="clear"></div>
      </div>
      <div class="areaInfoLi">
        <div class="areaInfoLiTitle">建筑名称</div>
        <div class="areaInfoLiInfo">
          {{
            $store.state.areaInfo.buildingName
              ? $store.state.areaInfo.buildingName
              : "--"
          }}
        </div>
        <div class="clear"></div>
      </div>
      <div class="areaInfoLi1">
        <div class="areaInfoLiTitle">楼层</div>
        <div class="areaInfoLiInfo">
          {{
            $store.state.areaInfo.floor !== undefined
              ? $store.state.areaInfo.floor
              : "--"
          }}
        </div>
        <div class="clear"></div>
      </div>
      <div class="areaInfoLi1">
        <div class="areaInfoLiTitle">备注</div>
        <div class="areaInfoLiInfo areaInfoNote">
          {{
            $store.state.areaInfo.comment ? $store.state.areaInfo.comment : "--"
          }}
        </div>
        <div class="clear"></div>
      </div>

      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import { pageList } from "@/api/ai/deviceManage";
import { setCharts } from "@/utils/digital/utils.js";
export default {
  name: "areaInfo",
  props: {},
  data() {
    return {
      areaInfoShowNew: false,
      currentData: {},
      seceneValue: "",
      currentInfo: {},
      show: false,
    };
  },
  mounted() {},
  watch: {
    "$store.state.areaInfoShowNew": {
      handler(newV, oldV) {
        if (newV == true) {
          let x = document.getElementById("areaInfo");
          //拖拽事件
          setCharts(x, this);
        }
      },
      deep: true,
    },
  },
  methods: {
    //关闭事件
    closeClick() {
      this.$store.state.areaInfoShowNew = false;
    },

    openValue() {
      this.show = !this.show;
    },

    getValue(index, item) {
      this.seceneValue = item.sceName;
      this.show = false;
      this.currentData.scenes.map((element) => {
        if (element.sceName === item.sceName) {
          this.currentInfo = element;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
 .closeImg {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 0px;
    top: 0px;
  }
.icoStyle{
  width: 20px;
  height: 20px;
}
.clear {
  clear: both;
}
.areaInfo {
  position: fixed;
  left: 28%;
  z-index: 99;
  top: 20%;
  min-height: 238px;
  width: 18vw;
  padding-bottom: 16px;
  background: url("~@/assets/digital/assets/img/areaInfo/bgNew.png") no-repeat
    center center;
  background-size: 100% 100%;
  .areaInfoLiSelect {
    float: left;
    position: relative;
  }
  .areaInfoNoData {
    width: 100%;
    overflow: hidden;
    color: #fff;
    font-size: 20px;
    text-align: center;
  }
  .areaInfoList {
    position: absolute;
    top: 33px;
    width: 100%;
    border: 1px solid #979797;
    overflow: hidden;
  }
  .areaInfoList ul li {
    width: 100%;
    height: 30px;
    cursor: pointer;
    line-height: 30px;
    padding-left: 10px;
    color: #fff;
  }
  .areaInfoList ul li:hover {
    background: #46527c;
  }
  .areaInfoLiSelectInput {
    background: #46527c;
    border: 1px solid #979797;
    height: 28px;
    color: #fff;
    cursor: pointer;
    padding-left: 8px;
  }
  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='~@/assets/digital/assets/img/areaInfo/bg.png', sizingMethod='scale');
  .earlyWarningTitle {
    font-size: 20px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #e8eeff;
    line-height: 30px;
    padding: 24px 26px 8px 26px;
  }

  .earlyWarningClose {
    position: absolute;
    right: -10px;
    top: -5px;
    width: 25px;
    cursor: pointer;
  }
  .earlyWarningBorderCircle {
    float: left;
    height: 2px;
    width: 2px;
    background: #fff;
    border-radius: 50%;
    margin-left: 26px;
  }
  .earlyWarningBorder {
    border-bottom: 1px dashed #979797;
    width: calc(100% - 52px);
    float: left;
  }
  .earlyWarningBorderCircles {
    float: left;
    height: 2px;
    width: 2px;
    background: #fff;
    border-radius: 50%;
    margin-right: 16px;
  }
  .earlyWarningTable {
    width: calc(100% - 52px) !important;
    margin: 0 auto;
    margin-top: 16px;
  }
  .areaInfoContent {
    padding: 0px 26px 8px 26px;
  }
  .areaInfoLi {
    line-height: 36px;
    font-size: 16px;
  }
   .areaInfoLi1 {
    line-height: 36px;
    font-size: 16px;
    margin-left: 30px;
  }
  .areaInfoLiTitle {
    float: left;
    color: #ccd1df;
    margin-right: 6px;
  }
  .areaInfoLiInfo {
    color: #e8eeff;
  }
  .areaInfoLiLeft {
    float: left;
    width: 50%;
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
  }
  .areaInfoLiRight {
    float: left;
    width: 50%;
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
  }
  .areaInfoNote {
    font-size: 12px;
  }
}
</style>
