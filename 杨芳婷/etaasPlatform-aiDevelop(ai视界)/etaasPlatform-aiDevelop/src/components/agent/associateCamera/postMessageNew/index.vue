<template>
  <div class="regionWarp">
    <img
      class="bgImg"
      src="@/assets/agent/img/bg.png"
      alt=""
    />
    <img
      class="closeImg"
      src="@/assets/agent/img/close.svg"
      alt=""
      @click="closePostMessage"
    />
     
    <div class="title">
      <img
         class="imgIcon"
         src="@/assets/digital/assets/img/mode/billboard/ico.png" alt=""/>
      备注信息</div>
    <!-- <div class="line"></div> -->
    <div class="content">
      <div class="device-has">
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm">
          <el-row :gutter="0">
            <el-col :span="24">
              <el-form-item prop="email" label="备注">
                <el-input
                  type="textarea"
                  v-model="dynamicValidateForm.comment"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="confirmButton" @click="commentSumbit">确认</div>
    <div class="cancelButton" @click="cancel()">取消</div>
  </div>
</template>

<script>
import * as deviceApi from "@/api/digital/device";
export default {
  data() {
    return {
      activeName: "first",
      dynamicValidateForm: {},
    };
  },
  created() {
    this.$store.state.scenceStyle = false;
    this.$store.state.deviceStyle = false;
    this.$store.state.commentStyle = false;
  },
  methods: {
    // 添加备注
    commentSumbit() {
      const params = {
        comment: this.dynamicValidateForm.comment,
        id: this.$store.state.deviceId,
      };
      deviceApi
        .comment(params)
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("添加成功");
            this.closePostMessage();
            this.dynamicValidateForm.comment = "";
          }
        })
        .catch();
    },
    // 关闭信息弹框
    closePostMessage() {
      this.$store.state.scenceStyle = false;
      this.$store.state.deviceStyle = false;
      this.$store.state.commentStyle = false;
      this.$emit("closePostMessage");
    },
    //  确定按钮
    confirm() {
      this.$emit("confirm", true);
    },
    //  取消按钮
    cancel() {
      this.closePostMessage();
    },
  },
};
</script>

<style lang="scss" scoped>
.regionWarp {
  width: 500px;
  height: 210px;
  position: relative;
  .bgImg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .closeImg {
    width: 18px;
    height: 18px;
    position: absolute;
    right:0px;
    top: 0px;
  }
  .title {
    position: absolute;
    left: 26px;
    top: 18px;
    font-size: 20px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color:#25BCFF;
    line-height: 30px;
  } 
  .imgIcon{
    width:24px;
    height:24px;
    top: 18px;
   }
  .line {
    width: 452px;
    height: 1px;
    border-bottom: 0.5px dotted rgba(151, 151, 151, 0.5);
    position: absolute;
    left: 27px;
    top: 55px;
  }
  .content {
    //   position: relative;
    //  background-color: blue;
    width: 500px;
    height: 210;
    position: absolute;
    left: 26px;
    top: 72px;
    // background: chartreuse;
  }
}

.device-has {
  //  background-color: antiquewhite;
  width: 450px;
  margin-bottom: 20px;
  height: 320px;
  position: relative;
  .common {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ccd1df;
    line-height: 22px;
    position: absolute;
    display: inline-block;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
// ==========================
// 按钮
.confirmButton {
  position: absolute;
  bottom: 20px;
  width: 64px;
  right: 26px;
  height: 32px;
  display: inline-block;
  background: rgba(37, 188, 255, 0.2);
  border: 1px solid #25bcff;
  font-size: 16px;
  text-align: center;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #25bcff;
  line-height: 32px;
}
.confirmButton:hover {
  background: rgba(37, 188, 255, 0.2);
}
.cancelButton {
  position: absolute;
  bottom: 20px;
  right: 102px;
  display: inline-block;
  width: 64px;
  height: 32px;
  background: rgba(170, 170, 170, 0.16);
  border: 1px solid rgba(170, 170, 170, 0.75);
  font-size: 16px;
  text-align: center;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #ffffff;
  line-height: 32px;
  margin-left: 8px;
}
/deep/.el-form {
  margin-bottom: 20px;
  height: 400px;
  // background-color: brown;
}
/deep/.el-textarea__inner {
  display: block;
  resize: vertical;
  font-size: 14px;
  padding: 5px 15px;
  line-height: 1.5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  color: #fff;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
/deep/.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
/deep/label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: -15px;
  font-weight: 700;
}
/deep/.el-form-item {
  margin-bottom: -15px;
}
.item-last {
  /deep/ label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 0px;
    font-weight: 700;
  }
  /deep/.el-form-item {
    margin-bottom: 0px;
  }
}
.input-item {
  margin-bottom: 1px;
}
/deep/.el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  margin-left: 50px !important;
}
/deep/.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  width: 50px !important;
  font-size: 12px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
/deep/.el-input__inner {
  -webkit-appearance: none;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  display: inline-block;
  font-size: 14px;
  height: 30px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
// =============================
/deep/ .el-tabs__nav {
  margin-left: 24px;
}
/deep/ .el-tabs__header {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px 2px 0px 0px;
  opacity: 0.8;
}
/deep/ .el-tabs__nav-wrap::after {
  display: none;
}
/deep/ .el-tabs__active-bar {
  background: #25bcff;
  width: 60px;
  // margin-left: 24px;
}

/deep/ .el-tabs__item {
  font-size: 16px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #ffffff;
  // margin-left: 24px;
}
/deep/ .el-tabs__item.is-active {
  color: #25bcff;
}

/deep/ .el-form-item__label {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ccd1df;
}
/deep/ .el-textarea__inner,
.el-input__inner {
  background: transparent;
}
/deep/ input {
  background-color: transparent;
}

/deep/input::-webkit-input-placeholder {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #e8eeff;
}

/deep/input::-moz-input-placeholder {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #e8eeff;
}

/deep/input::-ms-input-placeholder {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #e8eeff;
}
</style>