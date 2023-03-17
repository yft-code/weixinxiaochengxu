<template>
  <div class="importFileContainer">
    <el-dialog
      title="导入文件"
      :visible.sync="visible"
      width="32%"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div>
        <el-upload
          v-if="flag"
          class="upload-demo"
          drag
          action="#"
          accept=".xlsx,.xls"
          :http-request="submitUpload"
          ref="upload"
          :before-upload="beforeUpload"
        >
          <i class="iconfont icon-file_line text"></i>
          <div class="el-upload__text text1">
            您可以直接拖拽文件到这里或点击上传
          </div>
          <div class="el-upload__text text2">
            通过.xlsx. xls格式的文件批量上传设备清单
          </div>
        </el-upload>
        <div style="height: 10px; margin-top: 10px; margin-right: 8px">
          <el-button
            v-if="flag"
            type="primary"
            style="float: right"
            size="mini"
            @click="handleMould"
            >下载模板</el-button
          >
        </div>
      </div>
      <div v-if="flag1">
        <div style="text-align: center; font-size: 20px; color: #0a1933">
          文件正在上传，请不要关闭弹窗和浏览器
        </div>
        <div
          style="
            height: 20px;
            margin-left: 30px;
            margin-right: 50px;
            margin-top: 50px;
          "
        >
          <span style="float: left"
            ><i class="iconfont icon-file_link_line text3"></i
            >{{ this.fileName1 }}</span
          ><i
            @click.stop="handleCancel"
            style="float: right"
            class="iconfont icon-close_line"
          ></i>
        </div>
        <el-progress
          style="margin-left: 30px"
          :percentage="percentage"
        ></el-progress>
      </div>
      <div v-if="flag2" style="text-align: center">
        <div><i class="iconfont icon-confirm_fill text4"></i></div>
        <div class="el-upload__text text7">文件已经上传</div>
        总上传数:&nbsp;&nbsp;{{ this.all }}条
        <i class="iconfont icon-confirm_fill text5"></i>&nbsp;成功：{{
          this.success
        }}条 <i class="iconfont icon-close_fill text6"></i>&nbsp;失败：{{
          this.fail
        }}条

        <div></div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button v-if="flag1" size="mini" @click="handleCancel"
          >取 消</el-button
        >
        <el-button v-if="flag2" size="mini" @click="handleClose"
          >取 消</el-button
        >
        <el-button
          v-if="!flag"
          type="primary"
          size="mini"
          :disabled="downloadResult"
          @click="handleResult"
          >下载结果</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { importFile } from "../../../../api/ai/region";
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
      downloadResult: true,
      files: {},
      fileName1: "",
      flag: true,
      flag1: false,
      flag2: false,
      percentage: 0,
      success: 0,
      fail: 0,
      all: 0,
    };
  },
  methods: {
    // 上传前 文件校验
    beforeUpload(file) {
      this.files = file;
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";
      if (!extension && !extension2) {
        this.$message.warning("上传文件只能是 xls、xlsx格式!");
        return;
      }
      this.fileName = file.name;
      // 用于页面显示
      this.fileName1 = file.name;

      this.flag = false;
      this.flag1 = true;
      this.flag2 = false;
      this.percentage = 0;
    },
    // 确认上传
    submitUpload() {
      // 开启定时器
      this.handleTimer();
    },
    async handleCancel() {
      this.$confirm("你确定要取消上传吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.closeTime();
          this.percentage = 0;
          this.handleClose();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消取消",
          });
        });
    },

    // 下载结果
    handleResult() {
      const link = document.createElement("a");
      // link.style.display = 'none'
      link.href = this.resUrl;
      link.download = "下载结果.xls";
      // link.setAttribute('file','员工信息导入模板.xlsx')
      document.body.appendChild(link);
      link.click();
    },
    // 下载模板
    handleMould() {
      // 利用a标签自定义下载文件名
      const link = document.createElement("a");
      // link.style.display = 'none'
      // link.href = "http://localhost:8080/static/device_template.xlsx"
      //  let baseURL = process.env.VUE_APP_BASE_API
      link.href =
        this.$store.state.downPath +
        "ai-daemon-download/area_template.xlsx";
      link.download = "区域模板.xlsx";
      // link.setAttribute('file','员工信息导入模板.xls')
      document.body.appendChild(link);
      link.click();
    },
    // 定时器
    handleTimer() {
      const that = this;
      this.timer = setInterval(function () {
        that.countdown();
      }, 100);
    },
    countdown() {
      this.percentage += 1;
      if (this.percentage >= 100) {
        this.closeTime();
        let fileFormData = new FormData();
        fileFormData.append("file", this.files); // 上传的文件
        importFile(fileFormData)
          .then((res) => {
            // 上传请求
            this.resUrl = res.result;

            this.message = res.message;
            var arr = this.message.split("，");
            this.all = parseInt(arr[0].substring(1).substring(1));
            this.success = parseInt(arr[1].substring(1).substring(1));
            this.fail = parseInt(arr[2].substring(1).substring(1));
            this.flag = false;
            this.flag1 = false;
            this.flag2 = true;
            this.downloadResult = false;
            this.$emit("close-callback", "open");
          })
          .catch((err) => {
            this.fileName = "";
          });
      }
    },
    // 定时器关闭
    closeTime() {
      clearInterval(this.timer);
    },

    handleClose() {
      // 该方法用于关闭弹窗
      this.closeTime();
      this.percentage = 0;
      this.flag = true;
      this.flag1 = false;
      this.flag2 = false;
      this.$emit("close-callback", "close");
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-upload__input {
  display: none;
}
.importFileContainer {
  ::v-deep .el-dialog__footer {
    padding-bottom: 30px;
  }
  .text4 {
    color: #52c41a;
    font-size: 80px;
  }
  .text5 {
    margin-left: 20px;
    color: #52c41a;
  }
  .text6 {
    margin-left: 20px;
    color: #ff3a3a;
  }
  .text3 {
    font-size: 20px;
  }
  .text7 {
    color: #86b2fc;
    font-size: 25px;
     margin-bottom: 20px;
  }
  ::v-deep .el-dialog__body {
    border-top: #f7f8f9 1px solid;
    padding-top: 20px;
    // padding:31px
  }
  .text {
    color: #347fff;
    font-size: 80px;
  }
  .text1 {
    font-size: 20px;
    color: #0f1e37;
  }
  .text2 {
    margin-top: 10px;
    font-size: 16px;
    color: #969ca8;
  }

  .upload-demo {
    text-align: center;
  }
  ::v-deep .el-upload-dragger {
    width: 552px;
    height: 224px;
    background: rgba(10, 25, 51, 0.03);
    border-radius: 2px;
    border: 1px solid rgba(10, 25, 51, 0.05);
  }
}
</style>
