<template>
  <div class="addDevice">
    <el-dialog
      width="500px"
      title="预览"
      :visible.sync="visible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <div class="form_br"></div>
      <div
        style="overflow: auto"
        :style="{ maxHeight: `${screenHeight1}px` }"
      ></div>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      screenHeight1: document.body.clientHeight - 300,
      screenHeight: document.body.clientHeight - 340,
      windowWidth: document.documentElement.clientWidth,
    };
  },
  watch: {},
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight - 300;
        that.screenHeight1 = window.screenHeight;
      })();
    };
  },
  methods: {
    handleClose() {
      this.$emit("closePreview");
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-upload__input {
  display: none;
}
.addDevice {
  .upload {
    margin-left: 14px;
    margin-top: 10px;
  }
  ::v-deep .el-form-item__label {
    font-size: 14px;
  }
  .form_br {
    width: 100%;
    height: 1px;
    margin-bottom: 20px;
    background-color: #f3f3f5;
  }
  ::v-deep .el-dialog__body {
    padding: 0px 30px;
  }
  ::v-deep .el-dialog__header {
    padding: 20px 20px;
  }
  ::v-deep .el-dialog__footer {
    padding: 30px 20px 20px;
  }
}
</style>
