<template>
  <div class="all" :id="tableid">
    <div class="equipment-details">
      <div class="equipment-header">
        <img
          class="icoStyle"
          src="@/assets/digital/assets/img/mode/billboard/ico.png"
          alt=""
        />
        <span class="equipment-header-title">仓库设备列表</span>
      </div>
      <div class="equipment-content-Title">
        <div
          class="equipment-content-Title-item"
          v-for="(item, index) in tableData"
          :key="index"
        >
          {{ item.name }}
        </div>
      </div>
       <div class="equipment-content">
        <div class="left">
           <img src="@/assets/digital/assets/img/mode/billboard/car.png" alt="">
        </div>
        <div class="right">
          <div class="right-item"><span class="left">型号</span><span class="right">斑马 DS4608SR</span> </div>
          <div class="right-item"><span class="left">用途</span> <span class="right">出库</span></div>
          <div class="right-item"><span class="left">开始使用时间</span> <span class="right">2021-12-15</span></div>
       
        </div>
      </div>
     <div class="equipment-content">
        <div class="left">
           <img src="@/assets/digital/assets/img/mode/billboard/car.png" alt="">
        </div>
        <div class="right">
          <div class="right-item"><span class="left">型号</span><span class="right">斑马 DS4608SR</span> </div>
          <div class="right-item"><span class="left">用途</span> <span class="right">出库</span></div>
          <div class="right-item"><span class="left">开始使用时间</span> <span class="right">2021-12-15</span></div>
       
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tableid"],
  name: "allwarehouse",
  data() {
    return {
      tableData: [
        { name: "二维码打印设备" },
        { name: "二维码录入设备" },
        { name: "人脸识别一体机" },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style  lang="scss"  scoped>
.equipment-content{
    height: 99px;
    margin-top: 24px;
    // background: red;
    display: flex;
    justify-content:space-between;
    .left{
      width: 47%;
      // background: gold;
    }
    .right{
      width: 53%;
      // background: green;
      .right-item{
        height: 33px;
        line-height: 33px;
        .left{
          float: left;
          color: #FFFFFF;
          img{
            width: 176px;
            height: 100px;
          }
        }
        .right{
          float:right;
          color: #25BCFF;
        }
      }
    }
}

.equipment-content-Title {
  margin-top: 22px;
  width: 100%;
  height: 28px;
  display: flex;
  justify-content: space-between;
}
.equipment-content-Title-item {
  width: 122px;
  line-height: 28px;
  text-align: center;
  color: rgba(255,255,255,0.7000);
  background: rgba(170, 170, 170, 0.16);
  border: 1px solid rgba(170, 170, 170, 0.3);
}
.equipment-content-Title-item :hover{
  background: red !important;
}
/*  */
.all {
  width: 424px;
  height: 394px;
  position: relative;
   pointer-events: all;
}
.equipment-details {
  width: 424px;
  height: 394px;
  background: url("~@/assets/digital/assets/img/mode/billboard/warehosebg.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 16px 16px 0px 16px;
}

.equipment-header {
  height: 20px;
}

.icoStyle {
  width: 20px;
  height: 20px;
}

.equipment-header-title {
  color: #25bcff;
}
</style>