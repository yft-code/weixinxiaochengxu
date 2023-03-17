<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <div class="content">
          <el-form
          ref="deviceForm"
          :model="form"
         size="small"
         :rules="rules"
           label-width="105px">
      <el-row
        :gutter="-10"
      >
        <!-- 搜索框组件 -->
        <template>
          <el-col
            :sm="24"
            :md="8"
            :lg="6"
            :xl="6"
          >
       <el-form-item label="园区/厂区名称">
            <el-select
             style="width:100%"
              v-model="parkName"
              :popper-append-to-body="false"
              placeholder="请选择"
              @change="parkChange"
            >
              <el-option
                v-for="item in parkNameList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          </el-col>
           <el-col
            :sm="24"
            :md="8"
            :lg="6"
            :xl="6"
          >
        <el-form-item label="建筑名称">
            <el-select
              :popper-append-to-body="false"
              v-model="buildingName"
              placeholder="请选择"
              @change="buildingChange"
            >
              <el-option
                v-for="item in buildingNameList"
                :key="item.id"
                :label="item.buildingName"
                :value="item.buildingName"
              />
            </el-select>
          </el-form-item>
          </el-col>
           <el-col
            :sm="24"
            :md="8"
            :lg="6"
            :xl="6"
          >
          <el-form-item label="楼层">
            <el-select
              @change="floorChange"
              :popper-append-to-body="false"
              v-model="floor"
              placeholder="请选择"
            >
              <el-option
                v-for="item in floorList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          </el-col>
          
           <el-col
            :sm="24"
            :md="8"
            :lg="6"
            :xl="6"
          >
          <el-form-item label="设备名称" prop="deviceName"> 
            <el-input
              v-model="form.deviceName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          </el-col>
            <el-col
            :sm="24"
            :md="12"
            :lg="8"
            :xl="8"
          >
       <el-form-item label="监控时间">
            <el-date-picker
                style="width:100%"
              @change="change"
              class="pickerdata"
              v-model="value1"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          </el-col>
           <el-col
            :sm="24"
            :md="24"
            :lg="16"
            :xl="16"
          >
       <el-form-item style="float:right;margin-right:0"> 
         <el-button type="primary" @click="handleCheck" size="small" style="margin-left: 10px"
            >搜索</el-button
          >
           <el-button  @click="handleReset" size="small"
            >清空</el-button
          >
         
          </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
        <div class="form_br"></div>
        <div class="deviceTable">
          <el-table
            v-loading="loading"
            :header-cell-style="{ 'font-size': '16PX' }"
            :cell-style="{ 'font-size': '15PX' }"
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              prop="path"
              label="标题"
              width="145"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.path
                    ? scope.row.path.substring(
                        scope.row.path.lastIndexOf("/") + 1
                      )
                    : ""
                }}</span>
                <span @click="preview(scope.row)"
                  ><i class="icon-bofang1 iconfont icon-word"></i
                ></span>
              </template>
            </el-table-column>
            <el-table-column prop="duration" label="时长" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="deviceName"
              label="设备名称"
            >
            </el-table-column>
            <el-table-column
              prop="handler"
              label="上传者"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.handler ? scope.row.handler : "管理员"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="Categories"
              label="分类目录"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{
                  scope.row.Categories ? scope.row.Categories : "默认分类"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="state"
              label="视频状态"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.state ? scope.row.state : "运行中" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="createTime"
              label="开始时间"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="endTime"
              label="结束时间"
            >
            </el-table-column>

            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="downloadVideo(scope.row)"
                  >下载</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="form_pg">
          <el-pagination
            style="float: right"
            background
            align="center"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20]"
            :page-size="pageSize"
            layout="total,sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
      <div class="time">
        <el-dialog
          width="800px"
          :title="title"
          :visible.sync="lookVideoVisible"
          :before-close="handleCloseLookVideo"
        >
          <div slot="title">
            <div class="checkDialogTitle">{{ title }}</div>
            <div class="checkEvent">
              <div style="display: flex; justify-content: space-between">
                <div class="checkWay">录像时间:{{ time }}</div>
                <div class="closeIcon" @click="handleCloseLookVideo">X</div>
              </div>
            </div>
            <div></div>
            <div class="clear"></div>
          </div>
          <video
            :src="videoUrl"
            muted
            controls
            autoplay
            style="width: 100%; height: 400px; margin: 0 auto"
          ></video>
          <div slot="footer" class="dialog-footer">
            <el-button size="mini" @click="handleCloseLookVideo"
              >关闭</el-button
            >
            <!-- <el-button size="mini" type="primary" @click="handleCloseLookVideo">关闭</el-button> -->
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import fileDownload from "js-file-download";

import streamSaver from "streamsaver";

import {
  buildnameList,
  floorList,
  parknameList,
} from "../../../api/ai/deviceManage";
import {
  getParknameList,
  getBuildnameList,
  getFloorList,
} from "@/api/ai/deviceManage";
import * as api from "@/api/ai/monitoringData.js";
export default {
  data() {
    return {
       rules: {
        deviceName: [
          { max:50, message: "设备名称不能超过50个字符", trigger: "blur" },
        ],
      },
      remark: "",
      time: "",
      title: "",
      lookVideoVisible: false,
      videoUrl: "",
      warning: "",
      videoLoading: false,
      length: "",
      loading: true,
      // 建筑列表
      buildingNameList: [],
      // 园区/厂区列表
      parkNameList: [],
      // 楼层列表
      floorList: [],
      form: {
        videoStartTime: "",
        videoEndTime: "",
      },
      floor: "",
      buildingName: "",
      parkName: "",
      value1: "",
      eventList: [],
      events: [1, 2, 3, 4, 5],
      row: {},
      visible: false,
      openFlag: true,
      showAdd: false,
      showEdit: false,
      showImport: false,
      dialogFormVisible: false,
      tableData: [],
      deviceList: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  watch: {
    value1(n, o) {
      if (n === null) {
        this.value1 = ""
        this.form.videoStartTime = ''
        this.form.videoEndTime = ''
      }
    },
  },
  created() {
    this.getParkNameList();
    this.fetchData(this.form);
  },
  mounted() {
    this.$bus.$emit("monitoringRoom", "");
    this.$bus.$on("showDeviceDefault", (flag) => {
      this.openFlag = flag;
    });
  },
  methods: {
    floorChange(val) {
      if (val === "全部") {
        this.form.floor = "";
      } else {
        this.form.floor = val;
      }
    },
    downloadfile(url, strFileName, strMimeType) {
      var xmlHttp = null;
      if (window.ActiveXObject) {
        // IE6, IE5 浏览器执行代码
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      } else if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlHttp = new XMLHttpRequest();
      }
      //2.如果实例化成功，就调用open（）方法：
      if (xmlHttp != null) {
        xmlHttp.open("get", url, true);
        xmlHttp.responseType = "blob"; //关键
        xmlHttp.send("xmlHttp.responseType");
        xmlHttp.onreadystatechange = () => {
          // console.log('this.lenth',this.length);
          if (xmlHttp.readyState == 4) {
            //4表示执行完成
            if (xmlHttp.status == 200) {
              //200表示执行成功
              fileDownload(xmlHttp.response, strFileName, strMimeType);
              this.$store.state.videoList--;
            } else {
              this.$store.state.videoList--;
              //  this.$message.warning("标题为"+strFileName+"视频下载失败,请重新下载")
              this.videoLoading = false;
            }
          }
        }; //设置回调函数
      }
    },
    // 单个下载视频
    downloadVideo(row) {
      const name = row.path.substring(row.path.lastIndexOf("/") + 1);
      fetch(row.path, {
        method: "GET",
        cache: "no-cache",
      }).then((res) => {
        const fileStream = streamSaver.createWriteStream(name, {
          size: res.headers.get("content-length"),
        });
        const readableStream = res.body;
        // more optimized
        if (window.WritableStream && readableStream.pipeTo) {
          return readableStream
            .pipeTo(fileStream)
            .then(() => console.log("done writing"));
        }
        window.writer = fileStream.getWriter();

        const reader = res.body.getReader();
        const pump = () =>
          reader
            .read()
            .then((res) =>
              res.done
                ? window.writer.close()
                : window.writer.write(res.value).then(pump)
            );

        // pump()
      });
    },

    // 批量下载视频（有问题）
    handleDown() {
      for (let i = 0; i < this.eventList.length; i++) {
        const name = this.eventList[i].path.substring(
          this.eventList[i].path.lastIndexOf("/") + 1
        );
        fetch(this.eventList[i].path, {
          method: "GET",
          cache: "no-cache",
        }).then((res) => {
          const fileStream = streamSaver.createWriteStream(name, {
            size: res.headers.get("content-length"),
          });
          const readableStream = res.body;
          // more optimized
          if (window.WritableStream && readableStream.pipeTo) {
            return readableStream
              .pipeTo(fileStream)
              .then(() => console.log("done writing"));
          }
          window.writer = fileStream.getWriter();

          const reader = res.body.getReader();
          const pump = () =>
            reader
              .read()
              .then((res) =>
                res.done
                  ? window.writer.close()
                  : window.writer.write(res.value).then(pump)
              );

          // pump()
        });
      }
    },
    // 在线预览
    preview(row) {
      console.log("row", row);
      this.lookVideoVisible = true;
      this.videoUrl = row.path;
      this.time = row.createTime + " - " + row.endTime.trim().split(" ")[1];
      this.title = "设备名称:" + row.deviceName;
    },
    handleCloseLookVideo() {
      this.lookVideoVisible = false;
      this.videoUrl = "";
    },
    parkChange(val) {
      if (val === "全部") {
        this.form.parkName = "";
        this.form.buildingName = "";
        this.buildingName = "";
        this.floor = "";
        this.floorList = [];
        // this.buildnameList = [];
        this.buildingNameList = [];
      } else {
        this.form.parkName = val;
        this.form.buildingName = "";
        this.buildingName = "";
        this.floor = "";
        this.floorList = [];
        this.buildingNameList = [];
        this.form.buildingName = "";
        if (this.form.floor !== undefined) {
          this.form.floor = "";
        }
        this.floorList = [];
        this.getBuildingNameList();
      }
    },
    getBuildingNameList() {
      let params = {
        parkName: this.form.parkName,
      };
      getBuildnameList(params).then((res) => {
        this.buildingNameList = res.result;
      });
    },
    getFloorList(id) {
      let params = {
        id: id,
      };
      getFloorList(params).then((res) => {
        res.result.unshift("全部");
        this.floorList = res.result;
      });
    },
    buildingChange(val) {
      if (val === "全部") {
        this.form.buildingName = "";
        this.floor = "";
        this.form.floor = "";
        this.floorList = [];
      } else {
        this.form.buildingName = val;
        let id = "";
        this.floor = "";
        this.buildingNameList.map((element) => {
          if (val === element.buildingName) {
            id = element.id;
          }
        });
        if (this.form.floor !== undefined) {
          this.form.floor = "";
        }
        this.getFloorList(id);
      }
    },
    // 多选的数据
    handleSelectionChange(val) {
      this.eventList = val;
    },
    // 下载模板

    // 将秒数转换为hh：mm：ss
    timeFilter(seconds) {
      let ss = parseInt(seconds); // 秒
      let mm = 0; // 分
      let hh = 0; // 小时
      if (ss > 60) {
        mm = parseInt(ss / 60);
        ss = parseInt(ss % 60);
      }
      if (mm > 60) {
        hh = parseInt(mm / 60);
        mm = parseInt(mm % 60);
      }
      let result = ("00" + parseInt(ss)).slice(-2);
      if (mm > 0) {
        result = ("00" + parseInt(mm)).slice(-2) + ":" + result;
      } else {
        result = "00:" + result;
      }
      if (hh > 0) {
        result = ("00" + parseInt(hh)).slice(-2) + ":" + result;
      }
      return result;
    },
    //获取视频列表
    fetchData(params) {
      this.loading = true;
      const id = this.$route.query.deviceId;
      const limit = this.pageSize;
      const current = this.currentPage;
      params.limit = limit;
      params.deviceId = id;
      params.current = current;
      api
        .getMonitoring(params)
        .then((res) => {
          this.tableData = res.result.list;
          // 对时间进行处理
          this.tableData &&
            this.tableData.map((item) => {
              item.duration = this.timeFilter(item.duration);
            });
          this.total = res.result.total;
          this.loading = false;
        })
        .catch();
    },
    // 时间处理
    change(e) {
      if (e) {
        this.form.videoStartTime = e[0];
        this.form.videoEndTime = e[1];
      }
    },

    // 园区
    getParkNameList() {
      getParknameList().then((res) => {
        this.parkNameList = res.result;
      });
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.fetchData(this.form);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData(this.form);
    },
    handleReset() {
      this.form = {};
      this.parkName = "";
      this.buildingName = "";
      this.floor = "";
      this.form.alarmStartTime = "";
      this.form.alarmEndTime = "";
      this.value1 = "";
      this.buildingNameList = [];
      this.floorList = [];
      this.currentPage = 1;
      this.fetchData(this.form);
    },
    handleCheck() {
       this.$refs['deviceForm'].validate((valid) => {
       if(valid){
          this.currentPage = 1;
          this.fetchData(this.form);
       }
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.time {
  /deep/.el-dialog__body {
    padding: 0px 0px !important;
    padding-top: 15px !important;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
    border-top: 1px solid rgba(10, 25, 51, 0.05);
    width: 92%;
    margin: 0 auto;
    margin-top: 10px;
  }
}

/deep/ .el-select-dropdown {
  z-index: 120 !important;
}
/deep/.el-dialog__headerbtn {
  position: absolute;
  display: none;
  top: 18px;
  right: 20px;
  padding: 0;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 16px;
}
/deep/ .el-picker-panel {
  z-index: 100 !important;
}
.deviceContainer {
  .closeIcon {
    line-height: 13px;
    cursor: pointer;
    font-size: 22px;
    margin-left: 30px;
    color: lightgrey;
  }
  .checkWay {
    height: 32px;
    line-height: 13px;
    border-radius: 4px;
    color: rgba(10, 25, 51, 0.5);
    font-size: 18px;
  }
  .checkDialogTitle {
    font-size: 20px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 600;
    color: #0a1933;
    line-height: 13px;
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
  .icon-word {
    margin-left: 3PX;
    cursor: pointer;
    font-size: 18px;
    color: #347fff;
  }
  width: 100%;
  .deviceContent {
    width: 97%;
    margin: 24px auto;
    border-radius: 8px;
    box-sizing: border-box;
    background:#fff;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    @media screen and (max-width: 1680px) {
      .pickerdata {
        width: 420px;
      }
    }
    .content {
      padding-top: 24px;
      width: 95%;
      margin: 0 auto;
        /deep/.el-select{
      width:100% !important;
    }
    }
    /deep/.el-date-editor .el-range-separator {
      color: #979797 !important;
      width: 8%;
      font-size: 12px;
    }
    /deep/ .el-date-editor .el-range__icon {
      position: absolute;
      right: 5px;
      top: 1px;
      color: #c0c4cc;
    }
    /deep/.el-date-editor--daterange.el-input__inner {
      width: 338px;
    }
    /deep/.el-range-editor--small .el-range-input {
      font-size: 12px;
    }
    /deep/.el-icon-time:before {
      content: "\e78e";
    }
    /deep/ .el-button--primary.is-disabled,
    .el-button--primary.is-disabled:active,
    .el-button--primary.is-disabled:focus,
    .el-button--primary.is-disabled:hover {
      color: #fff;
      background-color: darkblue;
      background-color: rgb(153, 191, 255);
      cursor: not-allowed;
      border-color: #a0cfff;
    }
   
    .form_br {
      width: 100%;
      margin-top: 16px;
      height: 1px;
      background-color: #f3f3f5;
    }
    .deviceTable {
      width: 100%;
    }
    .form_pg {
      height: 45px;
      padding-bottom: 24px;
      margin-top: 24px;
      margin-right: 0;
    }
  }
}
</style>
