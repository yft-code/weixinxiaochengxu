<template>
  <div class="algorithm_update" v-show="dialogVisible">
    <div class="waring-list">
      <el-dialog
        title="预警列表"
        :visible.sync="dialogVisible"
        width="780PX"
        :before-close="handleClose"
        :close-on-click-modal="false"
      >
        <div style="display: flex">
          <div class="left-container">
            <div style="margin-top: 0px" v-for="item in list" :key="item">
              <div style="display: flex; padding-top: 12px">
                <div class="point" style=""></div>
                <div class="title-left">人员聚集</div>
              </div>
              <div style="font-size: 12px" class="title-time">
                2021-02-03 12:00:04
              </div>
              <div class="line"></div>
            </div>
          </div>

          <div class="right-container">
            <div style="display: flex; margin-left: 10px">
              <div class="top-left">
                <div>
                  <span class="title-big">{{
                    event && event.warning && event.warning.name
                  }}</span>
                  <span class="event-num">事件编号:SA0100101</span>
                </div>
                <div>
                  <div style="display: flex; margin-top: 16px">
                    <div class="title">监管场景</div>
                    <div class="inner-word">
                      {{ event.scene && event.scene[0].name }}
                    </div>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <div class="title">园区/厂区名称</div>
                    <div class="inner-word">
                      {{ event && event.device && event.device.deviceName }}
                    </div>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <div class="title">建筑名称</div>
                    <div class="inner-word">
                      {{ event && event.device && event.device.buildingName }}
                    </div>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <div class="title">楼层</div>
                    <div class="inner-word">
                      {{ event && event.device && event.device.floor }}
                    </div>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <div class="title">区域名称</div>
                    <div class="inner-word">
                      {{ event && event.device && event.device.areaName }}
                    </div>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <div class="title">设备名称</div>
                    <div class="inner-word">
                      {{ event && event.device && event.device.deviceName }}
                    </div>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <div class="title">预警类型</div>
                    <div class="inner-word" style="color: #ff3a3a">
                      {{ event && event.warning && event.warning.type }}
                    </div>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <div class="title">预警等级</div>
                    <div class="inner-word">
                      {{ event && event.warning && event.warning.level }}
                    </div>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <div class="title">预警时间</div>
                    <div class="inner-word">
                      {{ event && event.warning && event.datetime }}
                    </div>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <div class="title">通知对象</div>
                    <div class="inner-word">
                      {{ event && event.users && event.users[0].name }}
                    </div>
                  </div>
                  <div style="display: flex; margin-top: 10px">
                    <div class="title">事件预案</div>
                    <div
                      class="inner-word"
                      style="color: #347fff; cursor: pointer"
                    >
                      事件预案.pdf
                    </div>
                  </div>
                </div>
              </div>
              <div class="top-right">
                <div style="display: flex; flex-direction: row-reverse">
                  <div class="event-repeat" @click="repreat">重复预警</div>
                  <div class="wubao" @click="handleMistake">误报</div>
                </div>
                <div>
                  <div style="height: 220px">
                    <img
                      class="imgStyle"
                      :src="imgUrl"
                      height="100%"
                      width="100%"
                      @click="lookImg"
                    />
                  </div>
                  <div class="btn" style="margin-top: 16px">
                    <el-button type="primary" @click="lookVideo"
                      >视频留证</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div style="display: flex; width: 100%; margin-top: 20px">
                  <el-form :model="form" size="mini">
                    <el-form-item label="处理记录">
                      <el-input
                        @input="change"
                        type="textarea"
                        autosize
                        maxlength="40"
                        placeholder="已处理(默认)"
                        v-model="form.record"
                      >
                      </el-input>
                    </el-form-item>
                    <el-form-item label="上传附件">
                      <el-upload
                        class="upload-demo"
                        ref="my-upload"
                        action="#"
                        :on-change="handleChange"
                        :http-request="httpRequest"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :before-upload="beforeUpload"
                      >
                        <el-button slot="trigger" size="mini" type="primary"
                          >附件证明</el-button
                        >
                      </el-upload>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogVisible = false">取消</el-button>
          <el-button size="mini" type="primary" @click="dialogVisible = false"
            >确定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <el-dialog
      width=""
      title=""
      :visible.sync="lookImgVisible"
      :before-close="handleCloseLookImg"
    >
      <img class="imgStyle" :src="imgUrl" width="100%" />
      <div slot="footer" class="dialog-footer">
        <!-- <el-button size="mini" >取 消</el-button> -->
        <!-- <el-button size="mini" type="primary" @click="handleCloseLookVideo">关闭</el-button> -->
      </div>
    </el-dialog>
    <el-dialog
      width="800px"
      :title="title"
      :visible.sync="lookVideoVisible"
      :before-close="handleCloseLookVideo"
    >
      <video
        :src="videoUrl"
        muted
        controls
        autoplay
        class="myvideo"
        style="width: 100%; height: 400px; margin: 0 auto"
      ></video>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button size="mini" >取 消</el-button> -->
        <!-- <el-button size="mini" type="primary" @click="handleCloseLookVideo">关闭</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/ai/earlyWarning";
import { getListBacklog, getRecordByDevice } from "@/api/ai/generalView";
const Base64 = require("js-base64").Base64;
export default {
  name: "checkDialog",
  props: {
    event: {},
    id: {},
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    floor: {},
    areaName: {},
    deviceName: {},
    buildingName: {},
    name: {},
    parkName: {},
    device: {},
    formData: {},
    state: {},
    isRead: {},
    type: {
      type: String,
      default: "add",
    },
  },
  data() {
    return {
      isRepreat: false,
      list: [1, 2, 3, 4, 5],
      imgLoading: true,
      lookImgVisible: false,
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
        record: "",
      },
      form1: {},
      fileList: {},
      files: [],
      arr: [],
      ids: [],
      isMistake: false,
      imgUrl:
        "http://10.22.90.3:81/pic_5/6c11763f-236b-4fd6-9edf-c894fb0981cd.jpg",
    };
  },
  created() {
    // console.log('eventxxxxx',this.event);
  },
  mounted() {
    // console.log('eventxxxxx',this.event);
  },
  //   watch: {
  //    "event.pic": {
  //       handler(val) {
  //         this.imgLoading = true;
  //         this.imgUrl = '';
  //         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //         if(userInfo){
  //           this.getImgUrl({
  //           url: val,
  //           content: userInfo.userAccount,
  //           cb: (base64Url) => {
  //             // 使用两种方法设置显示img的src都可以
  //             // document.getElementById('myimg').src = base64Url
  //             this.imgUrl = base64Url;
  //             setTimeout(()=>{
  //                this.imgLoading = false;
  //             })

  //           },
  //          });
  //         }

  //       },
  //       immediate: true,
  //       deep: true,
  //    },
  //   },
  methods: {
    handleMistake() {
      this.$confirm("确认将事件标记为误报事件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            id: this.event && this.event.id,
            state: "未处理",
            record: this.form.record ? this.form.record : "--",
            isMistake: true,
            isRepeat: this.isRepreat,
            creator: "zhangsan",
          };
          api
            .alarmlisthandleEvent(params)
            .then(() => {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.$emit("func", "");
              this.handleClose1();
              this.handleClose();
            })
            .catch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消",
          });
        });
    },
    // 标记是否已读
    readRemark() {
      const params = {
        id: this.id,
        isRead: "已读",
      };
      api
        .handleRead(params)
        .then((res) => {
          console.log("res", res);
        })
        .catch();
    },
    // 重复报警
    repreat() {
      this.$confirm("确认将事件标记为重复事件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "修改成功",
          });
          const params = {
            id: this.event && this.event.id,
            isRepeat: true,
          };
          api
            .handleRepeat(params)
            .then((res) => {
              console.log("res", res);
              this.isRepreat = params.isRepeat;
              console.log("重复报警");
            })
            .catch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消",
          });
        });
    },
    lookImg() {
      this.lookImgVisible = true;
    },
    previewFile(val) {
      window.open(
       this.$store.state.prePath + 'filePreview/onlinePreview?url='+
          encodeURIComponent(Base64.encode(val))
      );
    },
    handleCloseLookVideo() {
      this.lookVideoVisible = false;
    },
    handleCloseLookImg() {
      this.lookImgVisible = false;
    },
    lookVideo() {
      const params = {
        id: this.event && this.event.id,
        time: this.event && this.event.datetime,
      };
      //  this.lookVideoVisible = true
      getRecordByDevice(params).then((res) => {
        this.videoUrl = res.result;
        if (this.videoUrl) {
          this.lookVideoVisible = true;
        } else {
          this.$message({
            message: "暂无视频记录",
            type: "warning",
          });
        }
      });
    },
    clearFiles() {
      if (this.$refs["my-upload"] !== undefined) {
        this.$refs["my-upload"].clearFiles();
      }
    },

    // 字数的最大长度
    change(e) {
      if (e.length >= 40) {
        this.$message({
          message: "最多只能输入40字",
          type: "warning",
        });
      }
    },

    // // 数据库里面的数据去重
    // noName(arr){
    //   const files=this.formData.fileList
    //   for (var i = 0; i < arr.length; i++) {
    //     for (var j = 0; j < files.length; j++) {
    //       if (arr[i].name == files[j].filename) {
    //         this.d=false
    //         this.$message.warning("不支持同名文件上传");
    //         arr.splice(i, 1);
    //         i--;
    //       } else {
    //         this.d=true
    //       }
    //     }
    //   }
    //   return arr;
    // },
    // 数组去重
    // uniqueArr(arr) {
    //   for (var i = 0; i < arr.length; i++) {
    //     for (var j = i + 1; j < arr.length; j++) {
    //       if (arr[i].name == arr[j].name) {
    //         this.$message.warning("不支持同名文件上传");
    //         arr.splice(j, 1);
    //         j--;
    //       }else {
    //       }
    //     }
    //   }
    //   return arr;
    // },

    //文件的大小
    noMax(arr) {
      for (var i = 0; i < arr.length; i++) {
        const size = arr[i].size / 1024 / 1024;
        if (size > 1) {
          this.c = false;
          this.$message.warning("文件最大不能超过1M");
          arr.splice(i, 1);
          i--;
        } else {
          this.c = true;
        }
      }
      return arr;
    },

    // 去除文件名过长的文件
    noLength(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name.length > 15) {
          this.b = false;
          this.$message.warning("文件名过长不支持上传");
          arr.splice(i, 1);
          i--;
        } else {
          this.b = true;
        }
      }
      return arr;
    },

    // // 数据库里面的数据去重
    noName1(arr) {
      const files = this.formData.fileList;
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < files.length; j++) {
          if (arr[i].name == files[j].filename) {
            arr.splice(i, 1);
            i--;
          } else {
          }
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
          } else {
          }
        }
      }
      return arr;
    },

    //文件的大小
    noMax1(arr) {
      for (var i = 0; i < arr.length; i++) {
        const size = arr[i].size / 1024 / 1024;
        if (size > 1) {
          arr.splice(i, 1);
          i--;
        } else {
          this.c = true;
        }
      }
      return arr;
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

    // 文件上传时候或者改变时候的勾子
    handleChange(file, fileList) {
      // fileList = this.uniqueArr(fileList);
      fileList = this.noMax(fileList);
      fileList = this.noLength(fileList);
      // fileList=this.noName(fileList)
      this.files = fileList;
    },

    beforeUpload(file, fileList) {
      this.fileList = file;
      this.arr.push(this.fileList);
    },

    // 单个删除文件
    DeleteFiles(id) {
      this.$confirm(
        "确定删除后当前内容将无法找回,请谨慎操作",
        "确认要删除这条内容吗",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          const files = this.formData.fileList;
          this.ids.push(id);
          for (var i = 0; i < files.length; i++) {
            if (files[i].id == id) {
              files.splice(i, 1);
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },

    // 批量删除文件
    mulDelete() {
      if (this.ids.length > 0) {
        for (var j = 0; j < this.ids.length; j++) {
          var params = { id: this.ids[j] };
          const i = j;
          const length = this.ids.length - 1;
          api
            .deleteFile(params)
            .then(() => {
              if (i === length) {
                this.submit();
              }
            })
            .catch();
        }
      } else {
        this.submit();
      }
    },

    // 自定义方法上传
    httpRequest() {
      // let formData = new FormData();
      // console.log('fileList自定义123444',this.fileList);
      //   formData.set('file', this.fileList);
      //   formData.set('id',this.id)
      //   api.uploadFile(formData).then(()=>{
      //    }).catch((err)=>{
      //      if(err){
      //        this.fileList={}
      //      }
      //    })
    },

    // 批量上传数据
    mulAdd() {
      if (this.arr && this.arr.length > 0) {
        // this.uniqueArr1(this.arr)
        this.noLength1(this.arr);
        this.noMax1(this.arr);
        // this.noName1(this.arr)
        for (let i = 0; i < this.arr.length; i++) {
          const num = i;
          let formData = new FormData();
          formData.set("file", this.arr[i]);
          formData.set("id", this.id);
          const length = this.arr.length - 1;
          api
            .uploadFile(formData)
            .then((res) => {
              if (num === length) {
                // console.log('里面的长度',res);
                // this.$parent.fetchData(1,10);
                this.mulDelete();
              }
            })
            .catch(() => {});
        }
      } else {
        this.mulDelete();
      }

      // this.handleClose1();
    },

    // 重新处理
    rehash() {
      this.formData.state = "待处理";
    },
    handleRemove(file) {
      if (file) {
        for (let i = 0; i < this.arr.length; i++) {
          if (file.uid === this.arr[i].uid) {
            this.arr.splice(i, 1);
          }
        }
      }
    },

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

    // 关闭弹框
    handleClose() {
      this.clearFiles();
      this.form = {
        state: "否",
      };
      this.arr = [];
      this.ids = [];
      this.readRemark();
      this.loading = false;
      this.$emit("real-callback");
    },
    getImgUrl({
      url = "",
      textAlign = "left",
      textBaseline = "top",
      font = "108PX Microsoft Yahei",
      fillStyle = "rgba(255, 255, 255, 0.5)",
      content = "我是默认的水印参数",
      cb = null,
      textX = 100,
      textY = 30,
    } = {}) {
      // 创建所需要添加水印的img图片
      const img = new Image();
      img.src = url;
      img.crossOrigin = "anonymous";

      img.onload = () => {
        // 创建canvas，并将创建的img绘制成canvas
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0);
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.font = font;
        ctx.fillStyle = fillStyle;
        // ctx.rotate((Math.PI / 180) * 15)
        // 循环绘制水印
        // for (let i = 0; i < img.height / 120; i++) {
        //   for (let j = 0; j < img.width / 50; j++) {
        //     ctx.fillText(content, i * 200, j * 100, img.width)
        //   }
        // }
        ctx.fillText(content, 200, 880, img.width);
        // 将绘制完成的canvas转换为base64的地址
        const base64Url = canvas.toDataURL();
        cb && cb(base64Url);
      };
    },

    // 确定
    submit() {
      if (this.form.state === "是") {
        this.isMistake = true;
      } else {
        this.isMistake = false;
      }
      const params = {
        id: this.id,
        state: "已处理",
        record: this.form.record,
        isMistake: this.isMistake,
      };
      api
        .alarmlisthandleEvent(params)
        .then(() => {
          this.$message({
            message: "处理成功",
            type: "success",
          });
          this.$emit("func", "");
          this.handleClose1();
          this.handleClose();
        })
        .catch();
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-form {
  margin: 0;
  padding: 0;
  width: 100%;
}
.btn {
  /deep/.el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #347fff;
    border: 1px solid #dcdfe6;
    color: #fff;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    padding: 7px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
}

/deep/.el-form-item__label {
  font-weight: 400;
  font-size: 16px !important;
  color: #0a1933;
  text-align: right;
  width: 90px !important;
}
/deep/.el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  margin-left: 90px !important;
}
/deep/.el-textarea__inner {
  display: block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.algorithm_update .container_list .show[data-v-79e5ddda] {
  margin-left: 157px !important;
  margin-top: -14px !important;
}
/deep/ .el-upload__input {
  display: none;
}
/deep/.el-dialog__body {
  padding: 0px !important;
  border-top: 1px solid #0a1933;
  padding-top: 0px !important;

  color: #606266;
  margin: -10px auto !important;
  font-size: 14px !important;
  word-break: break-all;
  width: 97%;
}

.top-left {
  width: 40%;
  margin-top: 10px;
}
.top-right {
  width: 60%;
  margin-top: 10px;
}
.wubao {
  cursor: pointer;
  color: #347fff;
  font-size: 14px;
}
.event-repeat {
  margin-left: 5px;
  color: #347fff;
  font-size: 14px;
  cursor: pointer;
}
.title {
  color: #0a1933;
  width: 90px;
  font-size: 14px;
  text-align: right;
}
.inner-word {
  color: #0a1933;
  margin-left: 5px;
  font-size: 12px;
}
// ===============
/deep/.el-dialog__header {
  padding: 0px 10px 0px !important;
}
/deep/.el-dialog__headerbtn {
  position: absolute;
  top: 18px;
  right: 11px;
  padding: 0;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 16px;
}
.checkDialogTitle {
  font-size: 20px;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-weight: 600;
  color: #0a1933;
  line-height: 32px;
  padding-left: 16px;
  float: left;
}
.checkEvent {
  float: right;
  padding-left: 16px;
  padding-right: 8px;
  min-width: 115px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  color: #347fff;
  font-size: 18px;
  margin-right: 0px;
}
.checkDialogWarning {
  float: left;
  padding-left: 16px;
  padding-right: 8px;
  min-width: 115px;
  height: 32px;
  line-height: 32px;
  background: #ff3a3a;
  border-radius: 4px;
  color: #fff;
  font-size: 18px;
  margin-left: 16px;
}
.checkDialogisWarning {
  float: left;
  padding-left: 16px;
  padding-right: 8px;
  min-width: 115px;
  height: 32px;
  line-height: 32px;
  background: lightgray;
  border-radius: 4px;
  color: #fff;
  font-size: 18px;
  margin-left: 16px;
}
.checkWay {
  cursor: pointer;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  color: #347fff;
  font-size: 18px;
}
.closeIcon {
  cursor: pointer;
  font-size: 22px;
  margin-left: 15px;
  color: lightgrey;
}
.warningLevelSecond {
  background: #fa9c50;
}
.warningLevelThird {
  background: #848c99;
}
.clear {
  clear: both;
}
.algorithm_update {
  .left-container {
    width: 160px;
  }
  .point {
    background: #ff3a3a;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .title-left {
    font-size: 14px;
    color: #0a1933;
  }
  .line {
    border-bottom: 1px solid bisque;
  }
  .title-time {
    margin-left: 10px;
    color: #aaafb8;
    font-size: 12px;
    margin-top: 12px;
    padding-right: 10px;
    margin-bottom: 12px;
  }
  .event-num {
    margin-left: 10px;
    font-size: 14px;
    color: #0a1933;
  }
  .title-big {
    font-size: 18px;
    color: #0a1933;
  }
  .right-container {
    width: 100%;
    border-left: 1px solid yellow;
  }

  .checkDidalogSpan {
    float: left;
    width: 100%;
    margin-top: -12px;
    line-height: 24px;
    height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .edit_input {
    width: 99%;
    margin-top: -15px;
    border-top: 1px solid rgba(10, 25, 51, 0.05);
  }
  .bottom_container {
    width: 100%;
    margin: 5px auto;
    ::v-deep .el-icon-document:before {
      content: "\e77d";
    }
    ::v-deep .el-upload-list__item:first-child {
      margin-top: 3px;
    }
    .upload-demo {
      display: flex;
      ::v-deep .el-upload-list__item-name {
        color: #347fff;
      }
    }
  }
  .detail_container {
    width: 100%;
    margin: 5px auto;
    ::v-deep .el-form-item__content {
      line-height: 0px;
      color: #0a1933;
      margin-top: 8px;
    }
    ::v-deep.el-form-item__label {
      line-height: 0px;
      color: #0a1933;
      margin-top: 8px;
    }
    .wrapper_contaier {
      margin-top: -32px;
      width: 90%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .wrapper-content {
        width: 33%;
        margin-top: 5px;

        .show {
          display: none;
        }
        a:hover {
          background-color: rgb(245, 247, 250);
          .show {
            display: inline-block;
          }
        }
      }
      .word_container {
        margin-left: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .over-title {
    position: relative;
    width: 70px;
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
  .list_view {
    padding-top: 10px;
    margin-top: -6px;
    width: 300px;
    margin-left: 168px;
  }
  .container_list {
    margin-top: 6px;
    .show {
      display: none;
    }
    a:hover {
      background-color: rgb(245, 247, 250);
      .show {
        display: inline-block;
      }
    }
    /deep/.el-upload-list {
      margin-left: 20px;
    }
  }
  .input_container {
    width: 100%;
    margin: 20px auto;
    display: flex;
    .list-group {
      width: 40%;
      ::v-deep .el-form-item__content {
        line-height: 0px;
        color: #0a1933;
        margin-top: 8px;
      }
      ::v-deep.el-form-item__label {
        line-height: 0px;
        color: #0a1933;
        margin-top: 8px;
      }
    }
    .detail_list {
      margin-bottom: 20px;
    }
    .phone_container {
      width: 60%;
      img {
        width: 100%;
        // height: 220PX;
      }
    }
  }
  ::v-deep .el-dialog__title {
    color: #0a1933;
    line-height: 60px;
    font-weight: 550;
    font-size: 18px;
  }
  .input_border {
    width: 99%;
    border-top: 1px solid rgba(10, 25, 51, 0.05);
    margin: -50px auto;
    margin-bottom: 20px;
  }
  .box_check {
    ::v-deep .el-radio__inner {
      border-radius: 0;
    }
  }
}
</style>