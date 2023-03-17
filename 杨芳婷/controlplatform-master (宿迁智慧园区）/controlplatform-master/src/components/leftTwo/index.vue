<template>
<div class="common">
  <!--标题-->
  <div class="title"></div>
  <!--内容区-->
  <div class="msg-content">
    <div class="msg-item" v-for="msg in msgData" :key="msg.id">
      <div class="msg">
        <span class="msg-category">{{ msg.category }}</span>
        <span class="msg-number">{{ msg.number }}</span>
        <span class="msg-percentage">{{ msg.percentage + '%' }}</span>
      </div>
      <el-progress
          :show-text="false"
          :stroke-width="7"
          :percentage="msg.percentage"
      ></el-progress>
    </div>
  </div>
</div>
         
</template>

<script>
export default {
  name: "leftTwo",
  data() {
    return {
      // 信息数据
      msgData: [
        {
          id: 1,
          category: '101工作面',
          number: 2506,
          percentage: 75
        },
        {
          id: 2,
          category: '102工作面',
          number: 1492,
          percentage: 48
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.common {
  width: 100%;
  height: 25.21vh;
  background-image: url("~@/assets/img/left/left-two-bg.png");
  background-size: 100% 100%;
  background-color: transparent !important;
  /* 标题样式 */
  .title {
    height: 20%;
    width: 100%;
  }
  /* 内容区样式 */
  .msg-content {
    width: 100%;
    height: 80%;
    padding: 7% 6% 0;
    .msg-item {
      margin-bottom: 5%;
      .msg {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 2%;
        &-category {
          font-size: 0.95vw;
          color: rgba(195,222,255,0.65);
          margin-right: 2%;
          font-weight: 500;
        }
        &-number {
          color: rgba(255,255,255,1);
          font-size: 1.25vw;
          flex: 1;
          font-weight: 400;
        }
        &-percentage {
          font-size: 1vw;
          font-weight: 600;
          color: rgba(195,222,255,0.8);
        }
      }
      /* 进度条样式 */
      ::v-deep .el-progress-bar__outer {
        background-color: rgba(94, 150, 221, .45);
      }
      ::v-deep .el-progress-bar__inner {
        background-color: unset;
        background-image: linear-gradient(to right, #2283FF, #4597FF, #ACD1FF);
      }
    }
  }
}

</style>