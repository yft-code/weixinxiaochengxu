<template>
  <div
    ref="eventDetail"
    id="eventDetail"
    :class="[
      $store.state.earlyStyleShow ? 'event-detail' : 'event-detail-container',
    ]"
    v-show="$store.state.eventDetailShow"
  >
    <div class="title">
      <div class="event-number">
        事件编号:<span>{{ this.handleData.eventId }}</span>
      </div>
      <div class="close" @click="closeEventDetail">
        <i class="iconfont close_line">&#xe6be;</i>
      </div>
    </div>
    <div class="over-line"></div>
    <div class="middle">
      <div class="left-form">
        <ul>
          <li>
            <span>识别算法</span><span>{{ this.handleData.algName }}</span>
          </li>
          <li>
            <span>园区/厂区</span
            ><span>{{
              this.handleData.device && this.handleData.device.parkName
            }}</span>
          </li>
          <li>
            <span>设备名称</span
            ><span>{{
              this.handleData.device && this.handleData.device.deviceName
            }}</span>
          </li>
          <li>
          <span class="left-form-title">预警时间</span>
          <span class="left-form-detail">{{ this.handleData.datetime }}</span>
          <span class="clear"></span>
        </li>
        <li style="margin-top:-8px">
          <span>通知对象</span>
          <span v-if="handleData.notifiers">{{ this.handleData.notifiers }}</span>
          <span v-if="!handleData.notifiers">--</span>
        </li>
        <li>
          <span style="margin-right:8px">是否误报</span
          ><el-radio v-model="handleData.isMistake" :label="true">是</el-radio>
          <el-radio v-model="handleData.isMistake" :label="false">否</el-radio>
        </li>
        </ul>
      </div>
      <div class="right-video">
        <img width="100%" :src="this.handleData.pic" />
        <input
            class="see-video"
            @click="checkVideo()"
            type="button"
            value="查看视频"
          />
      </div>
    </div>
    <div class="bottom-form"> 
      
      <ul>
        <li >
          <span class="left-form-title">处理记录</span>
          <textarea
            v-model="handleData.handler"
            name="scription"
            id="scription"
            rows="10"
            class="left-form-textarea"
          ></textarea>
          <span class="clear"></span>
        </li>
       
          <div class="submit-upload">
            <el-upload
              class="upload-demo"
              ref="my-upload"
              action="#"
              :http-request="uploadFile"
              :on-change="handleChange"
              :on-remove="handleRemove"
              :before-upload="beforeUpload"
            >
              <el-button slot="trigger" size="mini" type="primary"
                >提交证明</el-button
              >
            </el-upload>
          </div>
    
      
        <div></div>
        <div class="wrapper_contaier" style="" v-if="arr && arr.length > 0">
          <div
            class="wrapper-content"
            v-for="(item, index) in arr"
            :key="index"
          >
            <a class="word_container">
              <div class="over-title" style="color: #347fff">
                <i class="el-icon-paperclip"></i>{{ item.name }}
              </div>
              <i
                @click="handleRemove(item)"
                class="el-icon-close word-left"
              ></i>
            </a>
          </div>
        </div>
        <li>
          <input type="button" value="取消" @click="closeEventDetail" />
          <input type="button" value="确定" @click="mulAdd" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/ai/earlyWarning";
import { mapState } from "vuex";
import { setCharts } from "@/utils/digital/utils.js";
export default {
  data() {
    return {
      radio: "1",
      scription: "",
      imgLoading: true,
      lookVideoVisible: false,
      videoUrl: "",
      loading: false,
      mulFlag: true,
      a: true,
      b: true,
      c: true,
      d: true,
      e: false,
      f: false,
      flag: false,
      // 修改处理记录
      form: {
        state: "否",
      },
      form1: {},
      fileList: {},
      files: [],
      arr: [],
      ids: [],
      isMistake: false,
      imgUrl: "",
    };
  },
  watch: {
    "$store.state.eventDetailShow": {
      handler(newV, oldV) {
        if (newV == true) {
          let x = document.getElementById("eventDetail");
          setCharts(x, this);
        }
      },
      deep: true,
    },
    
  },
  mounted() {},
  computed: {
    ...mapState(["handleData"]),
    videoSrc() {
      let id = this.handleData.device && this.handleData.device.id;
      let ansObj = this.$store.state.cameraVideoList.filter((item) => {
        return item.hasOwnProperty(id);
      });
      return ansObj[0] && ansObj[0][id];
    },
  },
  methods: {
    clearFiles() {
      if (this.$refs["my-upload"] !== undefined) {
        this.$refs["my-upload"].clearFiles();
      }
    },

    // ==============================================
    closeEventDetail() {
      // console.log('this.',this.handleData);
      this.clearFiles();
      this.arr = [];
      this.$store.commit("setEventDetailShow", false);
    },
    noLength(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name.length > 15) {
          this.$message.warning("文件名过长不支持上传");
          arr.splice(i, 1);
          i--;
        }
      }
      return arr;
    },

    noMax(arr) {
      for (var i = 0; i < arr.length; i++) {
        const size = arr[i].size / 1024 / 1024;
        if (size > 1) {
          this.$message.warning("文件最大不能超过1M");
          arr.splice(i, 1);
          i--;
        }
      }
      return arr;
    },

    // 数组去重
    uniqueArr1(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].name == arr[j].name) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    },
    // ==================================
    // 文件上传时候或者改变时候的勾子
    handleChange(file, fileList) {
      fileList = this.noMax(fileList);
      this.files = fileList;
    },
    // 去除文件名过长的文件
    noLength1(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name.length > 15) {
          arr.splice(i, 1);
          i--;
        }
      }
      return arr;
    },

    uploadFile() {},
    // 批量上传数据
    mulAdd() {
      if (this.arr && this.arr.length > 0) {
        // this.uniqueArr1(this.arr)
        this.noLength1(this.arr);
        // this.noMax1(this.arr);
        // this.noName1(this.arr)
        // console.log('批量上传');
        for (let i = 0; i < this.arr.length; i++) {
          const num = i;
          // console.log('idd',this.handleData.id);
          let formData = new FormData();
          formData.set("file", this.arr[i]);
          formData.set("id", this.handleData.id);
          const length = this.arr.length - 1;
          api
            .uploadFile(formData)
            .then((res) => {
              if (num === length) {
                // console.log('res',res);
                // console.log('length',length);
                // console.log('里面的长度',res);
                // this.$parent.fetchData(1,10);
                this.sumbit();
              }
            })
            .catch(() => {});
        }
      } else {
        this.sumbit();
      }

      // this.handleClose1();
    },

    // 查看视频
    checkVideo() {
      if (this.videoSrc === "") {
        this.$message.warning("暂无视频资源");
      } else {
        this.$bus.$emit("sendVideoSrc", this.videoSrc);
        this.$store.state.videoShow = true;
      }

      // console.log('视频查看',this.$store.state.videoShow=true);
      //  this.$store.state.videoShow=true
    },
    //
    sumbit() {
      //  console.log('videoSrc',this.videoSrc);
      //  console.log('handleData',this.handleData);
      //  console.log('id',this.handleData.id);
      const params = {
        id: this.handleData.id,
        state: "已处理",
        record: this.handleData.handler,
        isMistake: this.handleData.isMistake,
      };
      // console.log('params',params);
      api
        .alarmlisthandleEvent(params)
        .then(() => {
          if (this.$store.state.earlyStyleShow) {
            this.$bus.$emit("updateWaring");
            this.$bus.$emit("updateEvents");
            // console.log('处理成功了');
          } else {
            this.$bus.$emit("setEarlyWarnig");
          }

          this.$message({
            message: "处理成功",
            type: "success",
          });
          this.closeEventDetail();
        })
        .catch();
    },
    // 自定义方法上传
    httpRequest() {},
    //删除文件
    beforeRemove() {
      return new Promise((res, rej) => {
        this.$confirm(
          `确定删除后当前内容将无法找回,请谨慎操作`,
          "确认要删除这条内容吗",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            return res();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除",
            });
            return rej();
          });
      });
    },
    beforeUpload(file, fileList) {
      (this.fileList = file), this.arr.push(this.fileList);
      this.noLength(this.arr);
      this.noMax(this.arr);
      // console.log('fileArr',this.arr);
    },
    handleRemove(file) {
      //  console.log('file',file);
      if (file) {
        for (let i = 0; i < this.arr.length; i++) {
          if (file.uid === this.arr[i].uid) {
            this.arr.splice(i, 1);
          }
        }
      }
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style lang="scss" scoped>
.left-form-title{
  float:left;
  width: 145px;
  display: inline-block;
}
.submit-upload{
  margin-top:50px;
}
.left-form-detail{
 float:left;
 width:calc(100% - 145px);
 font-family: PingFangSC-Regular, PingFang SC;
 font-weight: 400;
 color: #e8eeff;
 text-align: left;
 font-size: 16px;
 margin-left:8px;
}
.left-form-textarea{
  float:left;
  width:calc(100% - 80px) !important;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #fff;
  text-align: left;
  font-size: 16px;
  height:55px;
  background-color: rgba(255, 255, 255, 0.1);
  width:calc(100% - 145px);
}
.clear{
  clear:both;
} 
.see-video {
    width: 96px;
    height: 32px;
    position: absolute;
    background: rgba(170, 170, 170, 0.16);
    border: 1px solid rgba(170, 170, 170, 0.75);
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #e8eeff;
    right:0px;
    bottom:-40px
}
.event-detail {
  ::v-deep .el-upload__input {
    display: none;
  }
  ::v-deep .el-icon-document:before {
    content: "\e77d";
  }
  /deep/.el-upload-list__item-name {
    display: none;
  }

  .wrapper_contaier {
    width: 90%;
    margin-top: -10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .wrapper-content {
      width: 166px;
      margin-top: -5px;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      -icab-text-overflow: ellipsis;
      -khtml-text-overflow: ellipsis;
      -moz-text-overflow: ellipsis;
      -webkit-text-overflow: ellipsis;
      a:hover {
        background-color: rgba(37, 188, 255, 0.2);
      }
    }
    .word_container {
      .word-left {
        position: absolute;
        margin-top: -13px;
        margin-left: 130px;
        color: #347fff;
      }
      text-decoration: none;
      margin-left: 5px;
      .over-title {
        position: relative;
        width: 120px;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        -icab-text-overflow: ellipsis;
        -khtml-text-overflow: ellipsis;
        -moz-text-overflow: ellipsis;
        -webkit-text-overflow: ellipsis;
      }

      a:hover {
        background-color: red;
        .show {
          display: inline-block;
        }
      }
    }
  }
  position: fixed;
  top: 35%;
  left: 32%;
  z-index: 101;
  width: 614px;
  background: url("../../../assets/digital/assets/img/camera/detailBackgroundPic.png")
    no-repeat;
  background-size: 100% 100%;
  padding: 26px;
  /deep/.el-button--primary {
    color: #fff;
    background-color: rgba(37, 188, 255, 0.2);
    border-color: #409eff;
  }
  .title {
    height: 55px;
    display: flex;
    justify-content: space-between;
    .event-number {
      font-size: 20px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #e8eeff;
      line-height: 20px;
    }
    .close {
      width: 24px;
      height: 24px;
      color: #ccd1df;
      i {
        font-size: 24px;
      }
    }
  }
  .over-line {
    width: 557px;
    height: 1px;
    border-top: 1px dashed #979797;
    margin-top: -10px;
  }
  .middle {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    .left-form {
      ul {
        li {
          &:last-of-type {
            span {
              display: inline-block;
              &:last-child {
                width: 145px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                vertical-align: top;
              }
            }
          }
          span {
            display: inline-block;
            line-height: 33px;
            &:first-child {
              width: 72px;
              text-align: right;
              font-size: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #ccd1df;
            }
            &:last-child {
              font-size: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #e8eeff;
              margin-left: 7px;
              text-align: left;
            }
          }
        }
      }
    }
    .right-video {
      width: 336px;
      height: 189px;
      position: relative;
    }
  }
  .bottom-form {
    margin-top:10px;
    position: relative;
    ul {
      li {
        height: 22px;
        margin-bottom: 12px;
        ::v-deep .el-radio {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #e8eeff;
        }
       
        &:last-child {
          height: 32px;
          text-align: right;
          input {
            width: 64px;
            height: 32px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #ffffff;
            &:first-of-type {
              background: rgba(170, 170, 170, 0.16);
              border: 1px solid rgba(170, 170, 170, 0.75);
              margin-right: 8px;
            }
            &:last-of-type {
              background: rgba(37, 188, 255, 0.2);
              border: 1px solid #25bcff;
            }
          }
        }
        span {
          &:first-of-type {
            width: 72px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ccd1df;
            margin-left: 8px;
          }
          &:nth-of-type(2) {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #e8eeff;
          }
        }
        ::v-deep .el-upload__input {
          display: none;
        }
        .file-container {
          width: 90%;
          background-color: #25bcff;
          flex-direction: row;
          //  flex-wrap: wrap;
        }
      }
    }
  }
}
.event-detail-container {
  ::v-deep .el-upload__input {
    display: none;
  }
  ::v-deep .el-icon-document:before {
    content: "\e77d";
  }
  /deep/.el-upload-list__item-name {
    display: none;
  }

  .wrapper_contaier {
    width: 90%;
    margin-top: -10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .wrapper-content {
      width: 166px;
      margin-top: -5px;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      -icab-text-overflow: ellipsis;
      -khtml-text-overflow: ellipsis;
      -moz-text-overflow: ellipsis;
      -webkit-text-overflow: ellipsis;
      a:hover {
        background-color: rgba(37, 188, 255, 0.2);
      }
    }
    .word_container {
      .word-left {
        position: absolute;
        margin-top: -13px;
        margin-left: 130px;
        color: #347fff;
      }
      text-decoration: none;
      margin-left: 5px;
      .over-title {
        position: relative;
        width: 120px;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        -icab-text-overflow: ellipsis;
        -khtml-text-overflow: ellipsis;
        -moz-text-overflow: ellipsis;
        -webkit-text-overflow: ellipsis;
      }

      a:hover {
        background-color: red;
        .show {
          display: inline-block;
        }
      }
    }
  }
  position: fixed;
  top: 20%;
  left: 50%;
  z-index: 101;
  width: 614px;
  background: url("../../../assets/digital/assets/img/camera/detailBackgroundPic.png")
    no-repeat;
  background-size: 100% 100%;
  padding: 26px;
  /deep/.el-button--primary {
    color: #fff;
    background-color: rgba(37, 188, 255, 0.2);
    border-color: #409eff;
  }
  .title {
    height: 55px;
    display: flex;
    justify-content: space-between;
    .event-number {
      font-size: 20px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #e8eeff;
      line-height: 20px;
    }
    .close {
      width: 24px;
      height: 24px;
      color: #ccd1df;
      i {
        font-size: 24px;
      }
    }
  }
  .over-line {
    width: 557px;
    height: 1px;
    border-top: 1px dashed #979797;
    margin-top: -10px;
  }
  .middle {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    .left-form {
      height: 179px;
      ul {
        li {
          &:last-of-type {
            span {
              display: inline-block;
              &:last-child {
                width: 145px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                vertical-align: top;
              }
            }
          }
          span {
            display: inline-block;
            line-height: 33px;
            &:first-child {
              width: 72px;
              text-align: right;
              font-size: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #ccd1df;
            }
            &:last-child {
              font-size: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #e8eeff;
              margin-left: 7px;
              text-align: left;
            }
          }
        }
      }
    }
    .right-video {
      width: 336px;
      height: 189px;
    }
  }
  .bottom-form {
    margin-top: 12px;
    ul {
      li {
        height: 22px;
        margin-bottom: 12px;
        ::v-deep .el-radio {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #e8eeff;
        }
        &:nth-of-type(1) {
          height: 32px;
          .see-video {
            width: 96px;
            height: 32px;
            background: rgba(170, 170, 170, 0.16);
            border: 1px solid rgba(170, 170, 170, 0.75);
            font-size: 16px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #e8eeff;
            margin-left: 4px;
          }
        }
        &:nth-of-type(4) {
          height: 55px;
          span {
            width: 75px !important;
          }
        }
        &:nth-of-type(5) {
          height: 44px;
          span {
            &:first-of-type {
              width: 68px;
            }
          }
        }
        &:last-child {
          height: 32px;
          text-align: right;
          input {
            width: 64px;
            height: 32px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #ffffff;
            &:first-of-type {
              background: rgba(170, 170, 170, 0.16);
              border: 1px solid rgba(170, 170, 170, 0.75);
              margin-right: 8px;
            }
            &:last-of-type {
              background: rgba(37, 188, 255, 0.2);
              border: 1px solid #25bcff;
            }
          }
        }
        span {
          &:first-of-type {
            width: 72px;
            margin-right: 8px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ccd1df;
            margin-left: 8px;
          }
          &:nth-of-type(2) {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #e8eeff;
          }
        }
        ::v-deep .el-upload__input {
          display: none;
        }
        .file-container {
          width: 90%;
          background-color: #25bcff;
          flex-direction: row;
          //  flex-wrap: wrap;
        }
      }
    }
  }
}
</style>