<template>
  <div class="algorithm_update" v-show="dialogVisible">
    <div class="close-btn">
      <el-dialog
        :class="{ show: formData.state === '已处理' }"
        :title="title"
        :visible.sync="dialogVisible"
        width="780px"
        :before-close="handleClose"
        :close-on-click-modal="false"
      >
        <div slot="title">
          <div class="checkDialogTitle">
            <div style="display: flex; align-items: center">
              <div
                :style="{
                  background:
                    formData && formData.warning && formData.warning.levelColor,
                }"
                class="points"
              ></div>
              <div class="warningName">
                {{ formData && formData.algName }}
              </div>
              <div class="title">{{ title }}</div>
            </div>
          </div>
          <!-- <div class="checkDialogWarning" v-if="formData&&formData.warning&&formData.warning.level" :style="{'background':formData.warning.levelColor}">
          {{formData.warning.levelName}}&nbsp;&nbsp;
          {{formData.warning.name}}</div> -->
          <!-- <div v-if="formData&&formData.warning&&formData.warning.type" :class="[formData.warning.type==='实时'?'checkDialogWarning':'checkDialogisWarning']">{{formData.warning.type}}预警</div> -->
          <div class="checkEvent">
            <div style="display: flex; justify-content: space-between">
              <div class="checkWay" @click="handleMistake">误报</div>
              <div class="event-repeat" @click="repreat">重复预警</div>
              <div class="closeIcon" @click="handleClose">X</div>
            </div>
          </div>
          <div></div>
          <div class="clear"></div>
        </div>
        <div>
          <div class="edit_input">
            <div class="input_container">
              <div class="list-group">
                <el-form
                  :model="formData"
                  label-width="140px"
                  label-position="right"
                >
                  <!-- <el-form-item label="监管场景">
                    <span class="checkDidalogSpan" :title="name">{{
                      name
                    }}</span>
                  </el-form-item> -->
                  <el-form-item label="园区/厂区名称">
                    {{ parkName }}
                  </el-form-item>
                  <!-- <el-form-item label="建筑名称">
                    {{ buildingName }}
                  </el-form-item> 
                  <el-form-item label="楼层">
                    {{ floor }}
                  </el-form-item>
                  <el-form-item label="区域名称">
                    {{ areaName }}
                  </el-form-item>-->
                  <el-form-item label="设备名称">
                    {{ deviceName }}
                  </el-form-item>
                  <el-form-item label="预警类型">
                    <span
                      v-if="
                        formData && formData.warning && formData.warning.type
                      "
                      :class="[
                        formData.warning.type === '实时' ? 'check-type' : '',
                      ]"
                    >
                      {{
                        formData && formData.warning && formData.warning.type
                      }}
                    </span>
                  </el-form-item>
                  <el-form-item label="告警算法">
                    <span>{{ formData && formData.algName }}</span>
                  </el-form-item>
                   <el-form-item v-if="formData && formData.algName && formData.algName==='人脸识别'" label="识别结果">
                    <span>{{ formData && formData.faceName?(formData.faceName==='Unkowned'?'未识别':formData.faceName):'未识别'}}</span>
                  </el-form-item>
                  <el-form-item label="预警等级">
                    <span>{{
                      formData && formData.warning && formData.warning.levelName
                    }}</span>
                  </el-form-item>
                  <el-form-item label="预警时间">
                    {{ formData.datetime ? formData.datetime : "--" }}
                  </el-form-item>
                  <el-form-item label="通知对象">
                    <span
                      class="checkDidalogSpan"
                      :title="formData.notifiers"
                      >{{
                        formData.notifiers ? formData.notifiers : "--"
                      }}</span
                    >
                  </el-form-item>
                </el-form>
              </div>
              <div class="phone_container">
                <div v-loading="imgLoading" style="height: 220px">
                  <img
                    class="imgStyle"
                    :src="imgUrl"
                    height="220px"
                    @click="lookImg"
                    v-show="!imgLoading"
                  />
                </div>
                <div style="margin-top: 16px;float:right;margin-bottom:16px">
                  <el-button size="mini" type="primary" @click="lookVideo"
                    >视频留证</el-button
                  >
                </div>
                <div class="clear"></div>
              </div>
            </div>
          </div>
           <!-- <el-form-item label="地址">
                    <span>{{
                      formData && formData.device && formData.device.address
                    }}</span>
            </el-form-item> -->
          <div style="margin-top: -56px;width:80%">
            <el-form :model="form" label-width="140px" size="mini"  id="checkdialog-formstyle">
              <el-form-item
                label="详细地址"
                style="margin-bottom: 0px !important;"
              >
                <div
                  v-if="
                    formData && formData.device && formData.device.address
                  "
                  style="color:#0a1933"
                 
                >
                   {{
                     formData && formData.device && formData.device.address
                  }}
        
                </div>
                <div  style="color:#0a1933" v-else>--</div>
              </el-form-item>
            </el-form>
          </div>
          <div >
            <el-form :model="form" label-width="140px" size="mini" id="checkdialog-formstyle">
              <el-form-item
                label="事件预案"
                style="margin-bottom: 0px !important"
              >
                <div
                  v-if="
                    formData && formData.warning && formData.warning.fileName
                  "
                  class="pre-file"
                 
                >
                 <span @click="preView(formData.warning.file)" class="pre-file-span"> {{
                    formData && formData.warning && formData.warning.fileName
                  }}
                  </span>
                </div>
                <div v-else>--</div>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="this.formData.state === '待处理'" class="bottom_container">
            <el-form :model="form" label-width="140px" size="mini" id="checkdialog-formstyle">
              <!-- <el-form-item label="是否误报">
              <el-select
                v-model="form.state"
                class="formInput"
                placeholder="请选择"
              >
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item> -->
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
              <div></div>
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
                  <el-button
                    style="
                      border: 1px solid rgba(10, 25, 51, 0.2);
                      background: #fff;
                      color: rgba(10, 25, 51, 0.5);
                    "
                    slot="trigger"
                    size="mini"
                    type="primary"
                    >附件证明</el-button
                  >
                </el-upload>
              </el-form-item>
            </el-form>

            <div
              style="margin-left: 148px; margin-top: -20px"
              v-if="
                formData && formData.fileList && formData.fileList.length > 0
              "
            >
              <div
                class="container_list"
                v-for="item in formData.fileList"
                :key="item.id"
              >
                <a>
                  <i class="el-icon-paperclip"></i>
                  <span style="color: #347fff; margin-left: 10px">{{
                    item.filename
                  }}</span>
                  <i
                    style="margin-left: 10px"
                    class="el-icon-close show"
                    @click="DeleteFiles(item.id)"
                  ></i>
                </a>
              </div>
            </div>
          </div>
          <div v-if="this.formData.state === '已处理'" class="detail_container_checkdialog">
            <el-form
              :model="formData"
              status-icon
              ref="ruleForm2"
              label-width="140px"
              label-position="right"
              size="mini"
            >
              <el-form-item label="处理记录">
                <span>{{ formData.record ? formData.record : "--" }}</span>
              </el-form-item>
              <el-form-item label="处理人">
                {{ formData.handler ? formData.handler : "--" }}
              </el-form-item>
              <el-form-item label="处理时间">
                {{ formData.handleTime ? formData.handleTime : "--" }}
              </el-form-item>
              <el-form-item label="证明文件">
                <div
                  v-if="
                    formData &&
                    formData.fileList &&
                    formData.fileList.length <= 0
                  "
                >
                  --
                </div>
              </el-form-item>
            </el-form>
            <div
              style="margin-left: 140px"
              v-if="this.formData.state === '待处理'"
            >
              <div
                class="wrapper_contaier"
                style=""
                v-if="
                  formData && formData.fileList && formData.fileList.length > 0
                "
              >
                <div
                  class="wrapper-content"
                  v-for="(item, index) in formData.fileList"
                  :key="index"
                >
                  <a @click="DeleteFiles(item.id)" class="word_container">
                    <i class="el-icon-paperclip"></i>
                    <span style="color: #347fff">{{ item.filename }}</span>
                    <i style="margin-left: 4px" class="el-icon-close show"></i>
                  </a>
                </div>
              </div>
            </div>

            <div
              style="margin-left: 155px"
              v-if="this.formData.state === '已处理'"
            >
              <div
                class="wrapper_contaier"
                style=""
                v-if="
                  formData && formData.fileList && formData.fileList.length > 0
                "
              >
                <div
                  class="wrapper-content"
                  v-for="(item, index) in formData.fileList"
                  :key="index"
                >
                  <a class="word_container">
                    <el-popover
                      placement="top-start"
                      width="200"
                      trigger="hover"
                    >
                      <div>{{ item.filename }}</div>
                      <div slot="reference">
                        <div>
                          <div class="over-title" style="color: #347fff">
                            <i class="el-icon-paperclip"></i>{{ item.filename }}
                          </div>
                        </div>
                      </div>
                    </el-popover>
                    <span
                      style="
                        position: absolute;
                        margin-top: -13px;
                        margin-left: 78px;
                        color: #347fff;
                      "
                      @click="previewFile(item.localPath)"
                      >预览</span
                    >
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" v-loading="closeLoading" @click="handleClose">
            取消
          </el-button>
          <el-button
            size="mini"
            v-if="this.formData.state === '待处理'"
            type="primary"
            @click="mulAdd()"
            :loading="loading"
            >提交处理结果</el-button
          >
          <el-button
            size="mini"
            v-if="this.formData.state === '已处理'"
            type="primary"
            @click="rehash"
            >重新处理</el-button
          >
        </span>
      </el-dialog>
    </div>
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
    <el-dialog
      width="600px"
      title=""
      :visible.sync="lookImgVisible"
      :before-close="handleCloseLookImg"
    >
      <img class="imgStyle" :src="imgUrl" />
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
      closeLoading: false,
      isReads: false,
      isRepreat: false,
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
  mounted() {
   
    // formData.faceName
  },
  watch: {
    "formData.pic": {
      handler(val) {
        this.imgLoading = true;
        this.imgUrl = "";
        if(localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))){
          const userInfo = JSON.parse(localStorage.getItem("userInfo"))['aiHorizon'];
                  if (userInfo) {
                    this.getImgUrl({
                      url: val,
                      content: userInfo.userAccount,
                      cb: (base64Url) => {
                        // 使用两种方法设置显示img的src都可以
                        // document.getElementById('myimg').src = base64Url
                        this.imgUrl = base64Url;
                        setTimeout(() => {
                          this.imgLoading = false;
                        });
                      },
                    });
           }
        } 
       
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handleMistake() {
      this.$confirm("确认将事件标记为误报事件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.formData && this.formData.isRepeat) {
            if (this.formData.isRepreat === "是") {
              this.isRepreat = true;
            } else {
              this.isRepreat = false;
            }
          }
          const params = {
            id: this.id,
            state: "已处理",
            record: "--",
            isMistake: true,
            isRepeat: false,
          };
          api
            .alarmlisthandleEvent(params)
            .then(() => {
              this.handleClose1();
              this.handleClose();
              this.isMistake = params.isMistake;
              this.$message({
                message: "修改成功",
                type: "success",
              });
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
          if (res.code === 0) {
            this.$emit("getReadState");
          }
        })
        .catch(() => {
          this.closeLoading = false;
        });
    },
    repreat() {
      this.$confirm("确认将事件标记为重复预警?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.formData && this.formData.isMistake) {
            if (this.formData.isMistake === "是") {
              this.isMistake = true;
            } else {
              this.isMistake = false;
            }
          }
          const params = {
            id: this.id,
            state: "已处理",
            record: "--",
            isMistake: false,
            isRepeat: true,
          };
          api
            .alarmlisthandleEvent(params)
            .then(() => {
              this.handleClose1();
              this.handleClose();
              this.$message({
                message: "修改成功",
                type: "success",
              });
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

    preView(val) {
      window.open(
        this.$store.state.preUrl + 'filePreview/onlinePreview?url='+
          encodeURIComponent(Base64.encode(val))
      );
    },

    previewFile(val) {
      window.open(
       this.$store.state.preUrl + 'filePreview/onlinePreview?url='+
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
        id: this.formData.device.id,
        time: this.formData.datetime,
      };
      //this.lookVideoVisible = true
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
        this.noLength1(this.arr);
        this.noMax1(this.arr);
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
      this.$emit("close-callback");
      this.$emit("func", "");
      this.clearFiles();
      this.form = {
        state: "否",
      };
      this.arr = [];
      this.ids = [];
      this.readRemark();
      this.loading = false;
    },

    handleClose1() {
      this.$emit("close-callback1");
      this.$emit("func", "");
      this.clearFiles();
      this.form = {
        state: "否",
      };
      this.readRemark();
      this.arr = [];
      this.ids = [];
      this.loading = false;
    },

    getImgUrl({
      url = "",
      textAlign = "left",
      textBaseline = "top",
      font = "108px Microsoft Yahei",
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
      const params = {
        id: this.id,
        state: "已处理",
        record: this.form.record,
        isMistake: false,
        isRepeat: false,
      };
      api
        .alarmlisthandleEvent(params)
        .then(() => {
          this.$message({
            message: "处理成功",
            type: "success",
          });
          this.handleClose1();
          this.handleClose();
        })
        .catch();
    },
  },
};
</script>

<style lang="scss" scoped>
.algorithm_update .container_list .show[data-v-79e5ddda] {
  margin-left: 157px !important;
  margin-top: -14px !important;
}
#checkdialog-formstyle{
 /deep/ .el-form-item--mini .el-form-item__label {
      font-size: 14PX !important;
    }
}
/deep/ .el-upload__input {
  display: none;
}
/deep/.el-loading-spinner .circular {
  height: 28px;
  width: 28px;
  -webkit-animation: loading-rotate 2s linear infinite;
  animation: loading-rotate 2s linear infinite;
}
/deep/.el-loading-spinner {
  top: 91%;
  margin-top: -22px;
  width: 30px;
  text-align: center;
  position: absolute;
}
.close-btn {
  /deep/.el-dialog__headerbtn {
    position: absolute;
    top: 18px;
    display: none;
    right: 20px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 16px;
  }
}
.imgStyle{
  width: 100%;
  max-height: 500px;
}
.points {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.title {
  margin-left: 25px;
  font-size: 18px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(10, 25, 51, 0.65);
}
.checkDialogTitle {
  font-size: 20px;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-weight: 600;
  color: #0a1933;
  line-height: 32px;
  padding-left: 0px;
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
.event-repeat {
  cursor: pointer;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  color: #347fff;
  font-size: 18px;
  margin-left: 10px;
}
.closeIcon {
  cursor: pointer;
  font-size: 22px;
  margin-left: 15px;
  color: lightgrey;
  &:hover {
    color: #347fff;
  }
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
.check-type {
  color: #ff3a3a;
}
.pre-file {
  color: #347fff;
}
.pre-file-span {
  cursor: pointer;
}
.algorithm_update {
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
  .detail_container_checkdialog {
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
        // height: 220px;
      }
    }
  }
  ::v-deep .el-dialog__title {
    color: #0a1933;
    line-height: 60px;
    font-weight: 550;
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
.clear{
  clear:both;
}
</style>