<!-- 首页 -->
<template>
  <div class="main-ai">
    <!-- 头部 -->
    <a-header></a-header>
    <!-- 主页面 -->
    <div class="main-aicont">
      <!-- 侧边栏 -->
      <sider-bar />
      <!-- <div class="right-cont"> -->
      <!-- 消息通知 -->
      <!-- <noticeComponent /> -->
      <!-- 业务组件 -->
      <!-- <router-view></router-view> -->
      <!-- </div> -->
      <div :class="[isBig ? 'right-cont' : 'right-cont1',this.$route.path === '/'?'system-login':'']">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isBig: true,
      isLoginShow:false,
    };
  },
  mounted() {
    this.$bus.$on("msg", (data1) => {
      this.isBig = data1;
    });
    console.log('1.3版本 - 2022.12.13')
  },
  components: {
    aHeader: (resolve) => require(["@components/aHeader/index"], resolve),
    siderBar: (resolve) => require(["@views/ai/siderBar"], resolve),
    // noticeComponent: resolve =>
    //     require(["@components/noticeComponent"], resolve)
  },
  methods:{
  }
};
</script>

<style lang="scss" scoped>
.main-ai {
  height: 100%;
  .system-login{
    margin-left:0PX !important;
  }
//   /deep/.el-button--small {
//     font-size: 12PX;
// }
  /deep/.el-loading-mask {
    z-index: 1999;
  }
  /deep/.el-tabs__item {
    font-size: 14PX;
  }
  /deep/.el-tabs__nav-wrap::after {
    background-color: #f9f9f9;
  }
  /deep/.el-pagination.is-background .el-pager li {
    background: #fff;
    border: 1px solid #ddd;
  }
  /deep/.el-pagination.is-background .btn-next {
    background: #fff;
    border: 1px solid #ddd;
  }
  /deep/.el-pagination.is-background .btn-prev {
    background: #fff;
    border: 1px solid #ddd;
  }
  /deep/.el-table__fixed {
    height: 100% !important;
  }
  /deep/.el-table__fixed-right {
    height: 100% !important;
  }
  // /deep/.el-table--fit {
  //   border-right: 1px solid #EBEEF5;
  //   border-left: 1px solid #EBEEF5;
  // }
  /deep/ .el-pagination__total {
    margin-top: 2px;
  }
  /deep/.el-pagination__editor.el-input .el-input__inner {
    margin-top: -3px;
  }
  /deep/.el-table {
    .el-table__fixed {
      height: auto !important; // 此处的important表示优先于element.style
      bottom: 17px; // 改为自动高度后，设置与父容器的底部距离，则高度会动态改变
    }
  }
  /deep/.el-table__body-wrapper {
    //滚动条整体
    &::-webkit-scrollbar {
      width: 6px;
      height: 14px;
    }
    //滚动条小方块
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgb(199, 203, 209);
      background: rgb(199, 203, 209);
    }
    //滚动条轨道
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgb(248, 248, 248);
      border-radius: 0;
      background: rgb(248, 248, 248);
    }
  }
  /deep/.el-table__fixed-right {
    z-index: 1;
  }
  /deep/.el-table__fixed {
    z-index: 1;
  }
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #347fff;
    border-radius: 2px;
    filter: blur(0.1171875px);
  }
  /deep/.el-button--primary {
    background-color: #347fff;
    filter: blur(0.1171875px);
    border: none;
  }
  /deep/.el-button--default {
    color: rgba(10, 25, 51, 0.5);
    border: 1px solid rgba(10, 25, 51, 0.2);
  }
  /deep/.el-button--text {
    color: #347fff;
    font-size: 20px;
  }
  /deep/.el-button--default:hover {
    font-weight: 400;
    color: rgba(10, 25, 51, 0.5);
    background: #fff;
  }
  /deep/.el-button--default:focus,
  .el-button--default:hover {
    font-weight: 400;
    color: rgba(10, 25, 51, 0.5);
    background: #fff;
  }
  /deep/.el-form-item__label {
  font-weight: 400;
  font-size: 14PX !important;
  // color: red !important;
  color: #0a1933;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  }

  .el-input__inner {
      font-size: 14PX !important;
    &::placeholder {
      font-size: 14PX !important;
    }
  }
 /deep/.el-form-item--mini .el-form-item__label {
  font-weight: 400;
  font-size: 12PX !important;
  color: #0a1933;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
}
  /deep/.el-form-item--mini .el-input__inner {
      font-size: 12PX !important;
    &::placeholder {
      font-size: 12PX !important;
    }
  }
  /deep/.el-form--inline .el-form-item__content {
    font-weight: 400;
    color: #0a1933;
    font-size: 14PX !important;
  }
  /deep/.el-dialog__body {
    padding: 4px 20px 10px 20px;
  }
  /deep/.el-dialog__header {
    padding: 24px 24px;
  }
}
.main-aicont {
  display: flex;
  .right-cont {
    // width: calc(100% - 260px);
    width: calc(100% - 260px - 5PX);
    margin-left:5PX;
    background: rgba(10,25,51,0.03);
  }
  .right-cont1 {
    // width: calc(100% - 260px);
    width: calc(100% - 64px);
    background: rgba(10,25,51,0.03);
  }
}
</style>
<style lang="scss">
.el-message-box__content {
    border-top: 1px solid rgba(10, 25, 51, 0.05);
    width: 94%;
    margin: 0 auto;
    padding-top: 10PX;
    margin-top: 3PX;
    font-size: 14PX;
    /* padding: 10px 15px; */
}
.el-message--warning .el-message__content {
  color: #ffa55d !important;
}
.el-message .el-icon-warning {
  color: #ffa55d !important;
}
.main-aicont {
  .el-table th {
  font-size: 14PX !important;
  font-weight: 400;
  color: rgba(10, 25, 51, 0.5);
  font-size: 14PX !important;
  background: rgba(10, 25, 51, 0.03) !important;
  }
  .el-table td {
    padding: 10px 0px;
    height: 20px;
    font-size: 14PX !important;
    font-weight: 400;
    color: #0a1933;
    line-height: 30px;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
}
.el-button--text {
  font-size: 14PX !important;
}
</style>
