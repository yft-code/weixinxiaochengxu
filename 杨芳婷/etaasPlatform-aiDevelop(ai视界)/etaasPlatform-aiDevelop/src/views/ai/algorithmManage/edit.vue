<template>
  <div class="algorithm_update">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :before-close="handleClose"
      :destroy-on-close="true"
      width="600px"
      :close-on-click-modal="false"
    >
      <div class="input_border">
        <div
          class="input_container"
          style="overflow: auto"
          :style="{ maxHeight: `${screenHeight}px` }"
        >
          <el-form v-model="formData" label-width="150px" size="mini">
            <el-form-item label="算法ID" prop="id">
              <el-input disabled v-model="formData.id"></el-input>
            </el-form-item>
            <el-form-item label="算法名称" prop="name">
              <el-input disabled v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="算法版本" prop="version">
              <el-input disabled v-model="formData.version"></el-input>
            </el-form-item>
            <el-form-item label="更新日志" prop="log">
              <el-input
                disabled
                @input="change"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6 }"
                placeholder="请输入内容"
                v-model="formData.log"
                maxlength="500"
              ></el-input>
            </el-form-item>
            <el-form-item label="算法请求场景" prop="scene">
              <el-input
                @input="change"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6 }"
                placeholder="请输入内容"
                v-model="formData.scene"
                maxlength="500"
              ></el-input>
            </el-form-item>
            <el-form-item label="功能概述" prop="description">
              <el-input
                @input="change"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6 }"
                placeholder="请输入内容"
                v-model="formData.description"
                maxlength="500"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="confirm"
          :loading="loading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/ai/algorithmManage";
export default {
  name: "edit",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    id: {},
    formData: {},
  },
  data() {
    return {
      // 初始值高度
      screenHeight: document.body.clientHeight - 220,
      loading: false,
    };
  },
  // 只有页面动了才会获取到数据
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        that.screenHeight = window.screenHeight - 150;
      })();
    };
  },
  methods: {
    change(e) {
      if (e.length >= 500) {
        this.$message({
          message: "最多只能输入500字",
          type: "warning",
        });
      }
    },
    handleClose() {
      this.loading = false;
      this.$emit("close-callback");
    },
    handleClose1() {
      this.loading = false;
      this.$emit("close-callback1");
    },
    confirm() {
      if (!this.loading) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 3000);
        api
          .algorithmUpdate(this.formData)
          .then(() => {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.handleClose1();
          })
          .catch();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.algorithm_update {
  .input_container {
    width: 65%;
    margin: 24px auto;
  }
  ::v-deep .el-dialog__title {
    color: #0a1933;
    // line-height: 60px;
    font-weight: 550;
  }
  .input_border {
    width: 99%;
    overflow: auto;
    border-top: 1px solid rgba(10, 25, 51, 0.05);
    // margin: -50px auto;
    margin-bottom: 20px;
  }
}
</style>
