<template>
  <div class="operationWarp">
    <img
      class="bgImg"
      src="@/assets/digital/assets/img/operation/operation.png"
      alt=""
    />
    <img
      class="closeImg"
      src="@/assets/digital/assets/img/region/close.png"
      alt=""
      @click="closeParkOperation"
    />
    <div class="title">操作</div>
    ,

    <div v-if="this.$store.state.deviceId" class="delete" @click="delOperation">
      删除点位
    </div>
    <div v-else class="noDelete" @click="deleteWarning">删除点位</div>
    <div class="line"></div>
    <div class="buttonGroup">
      <div
        :class="[
          this.$store.state.deviceStyle ? 'buttonClick' : 'button',
          'buttonHover',
        ]"
        @click="associateDevice()"
      >
        关联设备
      </div>
      <div
        v-if="this.$store.state.deviceId"
        :class="[
          this.$store.state.scenceStyle ? 'clickscence' : '',
          'connectScence',
          'buttonHover',
        ]"
        @click="associateScence()"
      >
        关联监管场景
      </div>
      <div v-else class="noconnectScence" @click="deleteWarning()">
        关联监管场景
      </div>
      <div>
        <div
          v-if="this.$store.state.deviceId"
          :class="[
            this.$store.state.commentStyle ? 'clickcommon' : '',
            'connectScence',
            'buttonHover',
          ]"
          @click="postScript()"
        >
          备注信息
        </div>
      </div>
      <div
        v-if="this.$store.state.deviceId === ''"
        class="noconnectScence"
        @click="deleteWarning()"
      >
        备注信息
      </div>
    </div>
    <!-- <div class="button" @click="editOperation">
        编辑区域信息
      </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      editFlag: false,
    };
  },
  methods: {
    //格式化标题颜色
    deleteWarning() {
      this.$message.warning("设备还未绑定不可点击");
    },
    // 关闭小弹框
    closeParkOperation() {
      this.$store.state.deviceId = "";
      this.$store.state.scenceStyle = false;
      this.$store.state.deviceStyle = false;
      this.$store.state.commentStyle = false;
      this.$emit("closeParkOperation");
    },
    //  删除点位
    delOperation() {
      this.$emit("delOperation", true);
    },
    //弹出备注信息
    postScript() {
      this.$store.state.scenceStyle = false;
      this.$store.state.deviceStyle = false;
      this.$store.state.commentStyle = true;
      this.$emit("addMessage", true);
    },
    // 关联设备
    associateDevice() {
      this.$store.state.scenceStyle = false;
      this.$store.state.commentStyle = false;
      this.$store.state.deviceStyle = true;
      this.$emit("associateDevice", true);
    },

    // 打开关联监管场景页面
    associateScence() {
      this.$store.state.commentStyle = false;
      this.$store.state.scenceStyle = true;
      this.$store.state.deviceStyle = false;
      this.$emit("associateScence", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.operationWarp {
  width: 465px;
  height: 194px;
  position: relative;
  .bgImg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .closeImg {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 30px;
    top: 35px;
  }
  .title {
    position: absolute;
    left: 27px;
    top: 32px;
    font-size: 20px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #e8eeff;
    line-height: 30px;
  }
  .line {
    width: 400px;
    height: 1px;
    border-bottom: 0.5px dotted rgba(151, 151, 151, 0.5);
    position: absolute;
    left: 24px;
    top: 69px;
  }
  .buttonGroup {
    position: absolute;
    left: 24px;
    top: 98px;
    width: 80%;
    height: 32px;
    // background: rgba(37, 188, 255, 0.2);
    // border: 1px solid #25BCFF;
    line-height: 32px;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #25bcff;
    text-align: center;
    display: flex;
  }
  .button {
    flex: 1;
    color: #ccd1df;
    background: rgba(170, 170, 170, 0.16);
    border: 1px solid rgba(37, 188, 255, 0.2);
  }
  .buttonClick {
    flex: 1;
    color: #25bcff;
    border: 1px solid #25bcff;
    background: rgba(37, 188, 255, 0.2) !important;
  }
  .buttonHover:hover {
    color: #25bcff;
    border: 1px solid #25bcff;
    background: rgba(37, 188, 255, 0.2) !important;
  }
  .connectScence {
    flex: 1.5;
    margin: 0 5px;
    width: 100px;
    color: #ccd1df;
    background: rgba(170, 170, 170, 0.16);
    border: 1px solid rgba(37, 188, 255, 0.2);
  }
  .noconnectScence {
    flex: 1.5;
    margin: 0 5px;
    color: #ccd1df;
    background: rgba(170, 170, 170, 0.16);
    border: 1px solid rgba(170, 170, 170, 0.75);
  }
  .delete {
    color: #25bcff;
    position: absolute;
    right: 55px;
    top: 32px;
    width: 80px;
    height: 32px;
    // background: rgba(170, 170, 170, 0.16);
    border-bottom: 1px solid rgba(37, 188, 255, 0.2);
    font-size: 16px;
    line-height: 32px;
    // font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    // color: #FFFFFF;
    text-align: center;
  }
  .noDelete {
    color: rgba(170, 170, 170, 0.75);
    position: absolute;
    right: 55px;
    top: 32px;
    width: 80px;
    height: 32px;
    // background: rgba(170, 170, 170, 0.16);
    border-bottom: 1px solid rgba(37, 188, 255, 0.2);
    font-size: 16px;
    line-height: 32px;
    // font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    // color: #FFFFFF;
    text-align: center;
  }
  .clickscence {
    flex: 1.5;
    margin: 0 5px;
    width: 100px;
    color: #25bcff;
    border: 1px solid #25bcff;
    background: rgba(37, 188, 255, 0.2);
  }
  .clickcommon {
    flex: 1.5;
    margin: 0 5px;
    width: 100px;
    color: #25bcff;
    border: 1px solid #25bcff;
    background: rgba(37, 188, 255, 0.2);
  }
}
</style>