<template>
  <div class="all" :id="tableid">
    <div class="equipment-details">
      <div class="equipment-header">
        <img
          class="icoStyle"
          src="@/assets/digital/assets/img/mode/billboard/ico.png"
          alt=""
        />
        <span class="equipment-header-title">车辆信息</span>
      </div>
      <div class="equipment-content">
        <div class="left">
          <img src="@/assets/digital/assets/img/mode/billboard/car.png" alt="">
        </div>
        <div class="right">
          <div class="right-item"><span class="left">车辆类型</span><span class="right">运载车</span> </div>
          <div class="right-item right-item2"><span class="left">车牌号</span> <span class="right">GK88888</span></div>
          <div class="right-item right-item2"><span class="left">生产厂家</span> <span class="right">XX厂家</span></div>
          <div class="right-item right-item2"><span class="left">购买日期</span> <span class="right">2021.9.10</span></div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
    props: ["tableid"],
    name:"allcar",
  data() {
    return {
      form: {
        tableData: [
          { name: "二维码打印设备" },
          { name: "二维码录入设备" },
          { name: "人脸识别一体机" },
        ],
        img:'',

      },
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss"   scoped>
.equipment-content{
    height: 120px;
    margin-top: 30px;
    // background: red;
    display: flex;
    justify-content:space-between;
    .left{
      width: 56%;
      img{
        width: 210px;
        height: 119px;
      }
      // background: gold;
    }
    .right{
      width: 44%;
      // background: green;
      .right-item2{
        margin-top: 5px;
      }
      .right-item{
        height: 30px;
        // line-height: 30px;
        .left{
          float: left;
          color: #FFFFFF;
        }
        .right{
          float:right;
          color: #25BCFF;
        }
      }
    }
}
.equipment-content-Title {
  width: 100%;
  height: 28px;
  display: flex;
}
.equipment-content-Title-item {
  height: 28px;
  justify-content: space-between;
}
/*  */
.all {
  width: 408px;
  height: 248px;
  position: relative;
  pointer-events: all;
}
.equipment-details {
  width: 408px;
  height: 248px;
  background: url("~@/assets/digital/assets/img/mode/billboard/warehosebg.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 16px 0px 0px 16px;
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