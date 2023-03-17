<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <div class="generalContent" ref="content">
        <el-form
          ref="eventForm"
          :model="eventForm"
          :inline="true"
          class="form"
          size="mini"
        >
          <el-form-item label="" prop="parkName">
            <span class="titleOne">园区/厂区名称</span>
            <el-select
              v-model="eventForm.parkName"
              class="formInput"
              placeholder="请选择"
              @change="changeParkNames"
            >
              <el-option
                v-for="item in parkNameLists"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="buildingName">
            <span class="titleSecond">建筑名称</span>
            <el-select
              v-model="eventForm.buildingName"
              class="formInput"
              placeholder="请选择"
              @change="changeBuildingNames"
            >
              <el-option
                v-for="item in buildingNameDatas"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <span class="titleSecond">设备名称</span>
            <el-select
              v-model="eventForm.id"
              filterable
              placeholder="请选择"
              class="formInput"
              @change="getEventInfo"
            >
              <el-option
                v-for="item in deviceNameDatas"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <span class="titleSecond">楼层</span>
            <el-select
              @change="getEventInfo"
              v-model="eventForm.floor"
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
          <el-form-item label="">
            <span class="titleSecond">区域名称</span>
            <el-input
              v-model="eventForm.areaName"
              class="formInput"
              placeholder="请选择"
              @input="getEventInfo"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="">
            <span class="titleSecond">处理状态</span>
            <el-select
              v-model="eventForm.state"
              @change="getEventInfo"
              class="formInput"
              placeholder="请选择"
            >
              <el-option label="全部" value=""></el-option>
              <el-option label="已处理" value="已处理"></el-option>
              <el-option label="待处理" value="待处理"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div>
          <el-table
            :data="tableData"
            v-loading="loadingTable"
            :height="tableHeight"
          >
            <el-table-column width="120" label="编号">
              <template slot-scope="scope">
                <div>{{ scope.$index + 1 }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="scenelist" label="监管场景">
            </el-table-column>
            <el-table-column prop="device.deviceName" label="设备名称">
            </el-table-column>
            <el-table-column prop="algName" label="识别算法"> </el-table-column>
            <el-table-column prop="datetime" label="预警时间">
            </el-table-column>
            <el-table-column width="150" prop="action" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="lookBack(scope.row)"
                  >回溯</el-button
                >
                <el-button type="text" @click="handlechangeScene(scope.row)"
                  >查看/处理</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <video
          :src="videoUrl"
          muted
          controls
          autoplay
          class="myvideo"
          style="
            width: 100%;
            height: 500px;
            margin-top: 16px;
            margin-bottom: 16px;
          "
        ></video>
        <el-form
          ref="deviceList"
          :model="deviceList"
          :inline="true"
          class="form"
          size="mini"
          style="margin-top: 44px"
        >
          <el-form-item label="" prop="parkName">
            <span class="titleOne">园区/厂区名称</span>
            <el-select
              v-model="deviceList.parkName"
              class="formInput"
              placeholder="请选择"
              @change="changeParkName"
            >
              <el-option
                v-for="item in parkNameList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="buildingName">
            <span class="titleSecond">建筑名称</span>
            <el-select
              v-model="deviceList.buildingName"
              class="formInput"
              placeholder="请选择"
              @change="changeBuildingName"
            >
              <el-option
                v-for="item in buildingNameData"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="buildingName">
            <span class="titleSecond">设备名称</span>
            <el-select
              v-model="deviceList.deviceName"
              filterable
              placeholder="请选择"
              @change="changeDataSecond"
              class="formInput"
            >
              <el-option
                v-for="item in deviceNameData"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <span class="titleSecond">算法名称</span>
            <el-select
              v-model="deviceList.algName"
              class="formInput"
              placeholder="请选择"
              @change="changeDataSecond"
            >
              <el-option
                v-for="item in aloList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="">
            <span class="titleSecond">监管场景</span>
            <el-select
              v-model="deviceList.sceneName"
              class="formInput"
              placeholder="请选择"
              @change="changeDataSecond"
            >
              <el-option
                v-for="item in sceneList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="" prop="buildingName">
            <span class="titleSecond">所属部门</span>
            <el-select
              v-model="deviceList.departId"
              class="formInput"
              placeholder="请选择"
              @change="departChange"
            >
              <el-option
                v-for="item in departList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="buildingName">
            <span class="titleThird">人员</span>
            <el-select
              filterable
              v-model="deviceList.userId"
              class="formInput"
              placeholder="请选择"
              @change="changeDataSecond"
            >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <span class="titleSecond">预警时间</span>
            <el-date-picker
              @change="changewarnigTime"
              class="formInput"
              v-model="deviceList.warningTime"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div v-loading="loadingSecond">
          <div
            class="warningEventLine"
            id="warningEventLine"
            ref="warningEventLine"
          ></div>
        </div>

        <el-form
          ref="deviceList"
          :model="deviceList"
          :inline="true"
          class="form"
          size="mini"
          style="margin-top: 44px"
        >
          <el-form-item label="">
            <span class="titleSecond">预警时间</span>
            <el-date-picker
              @change="changeTimeLast"
              class="formInput"
              v-model="warningTimeLast"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <div style="float: right">
            <span class="titleSecond">算法数量</span>
            <el-select
              size="mini"
              v-model="algNumber"
              class="formInput"
              placeholder="请选择"
              @change="algNumberChange"
            >
              <el-option
                v-for="item in algNumberList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
        </el-form>
        <div v-loading="loadingThird">
          <div
            class="warningEventChart"
            id="warningEventChart"
            ref="warningEventChart"
          ></div>
        </div>
      </div>
    </div>
    <check-dialog
      :dialogVisible="visible"
      :form-data="formData"
      :parkName="formData.device.parkName"
      :name="name"
      :id="formData.id"
      :title="'事件编号' + `${formData.id}`"
      :floor="formData.device.floor"
      :areaName="formData.device.areaName"
      :deviceName="formData.device.deviceName"
      :building-name="formData.device.buildingName"
      @close-callback="handleClose"
    ></check-dialog>
  </div>
</template>
<script>
import {
  buildnameList,
  parknameList,
  serialnumberList,
  stateList,
  floorList,
} from "@/api/ai/deviceManage";
import {
  getChartInfo,
  getChartInfoSecond,
  getChartInfoThird,
  getUserInfo,
  getDeviceInfo,
  getDepartInfo,
} from "@/api/ai/warningEvent";
import { getEvent, getDevice } from "@/api/ai/generalView";
import { getAlgorithm } from "@/api/ai/algorithmManage";
import elementResizeDetectorMaker from "element-resize-detector";
import * as api from "@/api/ai/earlyWarning";
import checkDialog from "@components/checkDialog/index";
export default {
  name: "generalView",
  components: { checkDialog },
  data() {
    return {
      eventForm: {},
      name: "",
      videoUrl: "",
      tableHeight: null,
      visible: false,
      formData: { device: {}, scene: {} }, // 从预警列表获取的详情数据
      tableData: [],
      floorList: [],
      parkNameList: [],
      parkNameLists: [],
      buildingNameList: [],
      aloList: [],
      sceneList: [],
      departList: [],
      deviceNameList: [],
      userData: [],
      deviceNameData: [],
      deviceNameDatas: [],
      buildingNameData: [],
      buildingNameDatas: [],
      loadingTable: false,
      loadingSecond: true,
      loadingThird: true,
      resultData: [],
      resultDataSecond: [],
      resultDataThird: [],
      warningEventLine: null,
      warningEventChart: null,
      algorithmStatistics: null,
      pickerOptions: {
        disabledDate: (time) => {},
      },
      algNumber: 10,
      warningTimeLast: [
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          0,
          0
        ),
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          23,
          59
        ),
      ],
      algNumberList: ["5", "10"],
      userList: [],
      form: {
        alarmStartTime: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ),
        alarmEndTime: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ),
        alarmStartTimeLast: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ),
        alarmEndTimeLast: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ),
      },
      deviceList: {
        warningTime: [],
        alarmStartTime: "",
        alarmEndTime: "",
      },
    };
  },
  created() {},
  mounted() {
    //初始化数据,传入公有数据
    this.getSceneList();
    this.getBuildingNameList();
    this.getParkNameList();
    this.getList();
    this.getdepart();
    this.getDevice();
    this.getUser();
    this.getFloorList();
    this.getEventInfo();
    //时间
    this.getTimeFn();
    this.changeDataSecond();
    this.initDataThird();
    //引入方法，是excharts可以自适应屏幕，浏览器兼容性强
    const erd = elementResizeDetectorMaker();
    if (erd) {
      erd.listenTo(this.$refs.content, (element) => {
        if (this.warningEventLine) {
          this.warningEventLine.resize();
        }
        if (this.warningEventChart) {
          this.warningEventChart.resize();
        }
        if (this.algorithmStatistics) {
          this.algorithmStatistics.resize();
        }
      });
    }
  },
  methods: {
    lookBack(row) {
      let params = {
        time: row.datetime,
        id: row.device.id,
      };
      getDevice(params)
        .then((res) => {
          if (res.code === 0) {
            this.videoUrl = res.result;
          }
        })
        .catch();
    },
    getEventInfo() {
      let parkName;
      if (this.eventForm.parkName === "全部") {
        parkName = "";
      } else {
        parkName = this.eventForm.parkName;
      }
      let params = {
        id: this.eventForm.id,
        parkName: parkName,
        buildingName: this.eventForm.buildingName,
        floor: this.eventForm.floor,
        areaName: this.eventForm.areaName,
        state: this.eventForm.state,
      };
      getEvent(params)
        .then((res) => {
          if (res.code === 0) {
            res.result &&
              res.result.map((element) => {
                element.scenelist = [];
                if (element.scene) {
                  element.scene.map((val) => {
                    element.scenelist.push(val.name);
                  });
                }
              });
            res.result.map((element) => {
              element.scenelist = this.uniqueArr(element.scenelist);
              element.scenelist = element.scenelist.join(",");
            });
            this.tableData = res.result;
            if (this.tableData.length > 3) {
              this.tableHeight = 250;
            }
          }
        })
        .catch();
    },
    //去重
    uniqueArr(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i] == arr[j]) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    },
    getFloorList() {
      floorList().then((res) => {
        this.floorList = res.result;
      });
    },
    getUser() {
      let params = {
        departId: "",
      };
      getUserInfo(params)
        .then((res) => {
          if (res.code === 0) {
            this.userData = res.result;
          }
        })
        .catch();
    },
    //获取设备名称
    getDevice() {
      getDeviceInfo()
        .then((res) => {
          if (res.code === 0) {
            this.deviceNameList = res.result;
          }
        })
        .catch();
    },
    getdepart() {
      getDepartInfo()
        .then((res) => {
          if (res.code === 0) {
            res.result.unshift({
              name: "全部",
              id: "",
            });
            this.departList = res.result;
          }
        })
        .catch();
    },
    // 获取场景列表
    getSceneList() {
      api.sceneList().then((res) => {
        this.sceneList = res.result;
        this.sceneList.unshift({
          name: "全部",
          id: "",
        });
      });
    },
    getBuildingNameList() {
      buildnameList().then((res) => {
        this.buildingNameList = res.result;
      });
    },
    getParkNameList() {
      parknameList().then((res) => {
        res.result.unshift("全部");
        this.parkNameList = res.result;
        this.parkNameLists = res.result;
      });
    },
    // 获取算法列表
    getList() {
      const params = {
        pageNum: 1,
        pageSize: 999,
      };
      getAlgorithm(params)
        .then((res) => {
          const arr = [];
          res.result.list &&
            res.result.list.map((item) => {
              arr.push(item.name);
            });
          arr.unshift("全部");
          this.aloList = arr;
        })
        .catch();
    },
    changeParkNames() {
      let parkName = "";
      if (this.eventForm.parkName === "全部") {
        parkName = "";
      } else {
        parkName = this.eventForm.parkName;
      }
      let params = { parkName: parkName };
      buildnameList(params).then((res) => {
        this.buildingNameDatas = res.result;
        if (this.eventForm.buildingName) {
          this.eventForm.buildingName = "";
        }
        if (this.eventForm.id) {
          this.eventForm.id = "";
        }
        setTimeout(() => {
          this.changeBuildingNames(false);
          this.getEventInfo();
        });
      });
    },

    changeBuildingNames(time) {
      let parkName = "";
      let buildingName = "";
      if (this.eventForm.parkName === "全部") {
        parkName = "";
      } else {
        parkName = this.eventForm.parkName;
      }
      if (this.eventForm.buildingName === "全部") {
        buildingName = "";
      } else {
        buildingName = this.eventForm.buildingName;
      }
      let params = { parkName: parkName, buildingName: buildingName };
      getDeviceInfo(params)
        .then((res) => {
          if (res.code === 0) {
            this.deviceNameDatas = res.result;
            if (this.eventForm.id) {
              this.eventForm.id = "";
            }
            setTimeout(() => {
              if (time) {
                this.getEventInfo();
              }
            });
          }
        })
        .catch();
    },
    changeParkName() {
      let parkName = "";
      if (this.deviceList.parkName === "全部") {
        parkName = "";
      } else {
        parkName = this.deviceList.parkName;
      }
      let params = { parkName: parkName };
      buildnameList(params).then((res) => {
        this.buildingNameData = res.result;
        if (this.deviceList.buildingName) {
          this.deviceList.buildingName = "";
        }
        if (this.deviceList.deviceName) {
          this.deviceList.deviceName = "";
        }
        setTimeout(() => {
          this.changeBuildingName(false);
          this.changeDataSecond();
        });
      });
    },

    changeBuildingName(time) {
      let parkName = "";
      let buildingName = "";
      if (this.deviceList.parkName === "全部") {
        parkName = "";
      } else {
        parkName = this.deviceList.parkName;
      }
      if (this.deviceList.buildingName === "全部") {
        buildingName = "";
      } else {
        buildingName = this.deviceList.buildingName;
      }
      let params = { parkName: parkName, buildingName: buildingName };
      getDeviceInfo(params)
        .then((res) => {
          if (res.code === 0) {
            this.deviceNameData = res.result;
            if (this.deviceList.deviceName) {
              this.deviceList.deviceName = "";
            }
            setTimeout(() => {
              if (time) {
                this.changeDataSecond();
              }
            });
          }
        })
        .catch();
    },

    algNumberChange(val) {
      let arr = [];
      arr = this.resultData.slice(0, val);
      this.initEventChart(arr);
    },

    // 获取前一周的时间
    getTimeFn() {
      let that = this;
      let end = new Date();
      let start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
      that.deviceList.alarmStartTime = that.formatDate(start);
      that.deviceList.alarmEndTime = that.formatDate(end);
      that.deviceList.warningTime.push(start);
      that.deviceList.warningTime.push(end);
    },

    //第三幅图
    initDataThird() {
      this.loadingThird = true;
      let data = [];
      let that = this;
      let params = {
        startWith: that.formatDate(new Date(this.form.alarmStartTimeLast)),
        endWith: that.formatDate(new Date(this.form.alarmEndTimeLast)),
      };
      getChartInfoThird(params).then((res) => {
        if (res.code === 0 && res.result) {
          that.resultData = res.result;
          that.loadingThird = false;
          data = this.resultData.slice(0, this.algNumber);
          that.initEventChart(data);
        }else{
           that.loadingThird = false;
           data = [];
           that.initEventChart(data);
        }
      });
    },

    //第二幅图
    changeDataSecond() {
      let startWith;
      let endWith;
      let that = this;
      let buildingName;
      let algName;
      let parkName;
      let sceneName;
      let deviceName;
      this.loadingSecond = true;
      if (!this.deviceList.alarmStartTime || !this.deviceList.alarmEndTime) {
        let end = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
        startWith = that.formatDate(start);
        endWith = that.formatDate(end);
      } else {
        startWith = this.formatDate(new Date(this.deviceList.alarmStartTime));
        endWith = this.formatDate(new Date(this.deviceList.alarmEndTime));
      }
      if (this.deviceList.buildingName === "全部") {
        buildingName = "";
      } else {
        buildingName = this.deviceList.buildingName;
      }
      if (this.deviceList.algName === "全部") {
        algName = "";
      } else {
        algName = this.deviceList.algName;
      }
      if (this.deviceList.parkName === "全部") {
        parkName = "";
      } else {
        parkName = this.deviceList.parkName;
      }
      if (this.deviceList.sceneName === "全部") {
        sceneName = "";
      } else {
        sceneName = this.deviceList.sceneName;
      }
      if (this.deviceList.deviceName === "全部") {
        deviceName = "";
      } else {
        deviceName = this.deviceList.deviceName;
      }
      let params = {
        departId: this.deviceList.departId,
        userId: this.deviceList.userId,
        algName: algName,
        sceneName: sceneName,
        parkName: parkName,
        buildingName: buildingName,
        deviceName: deviceName,
        startWith: startWith,
        endWith: endWith,
      };
      getChartInfoSecond(params).then((res) => {
        if (res.code === 0 && res.result) {
          this.resultDataSecond = res.result;
          this.loadingSecond = false;
          this.initEventLine();
        }
      });
    },
    //格式化时间
    formatDate(time) {
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let date = time.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }

      return year + "-" + month + "-" + date;
    },

    //时间变化第二幅图数据变化
    changewarnigTime(e) {
      let that = this;
      if (e) {
        //接收开始时间和结束时间
        if (e[0] && e[1]) {
          if (
            new Date(e[1]).getTime() - new Date(e[0]).getTime() >
            30 * 24 * 60 * 60 * 1000
          ) {
            that.$message.error("间隔不能超过31天！");
            let startTime = new Date();
            startTime.setTime(new Date(e[1]).getTime() - 3600 * 1000 * 24 * 30);
            that.deviceList.alarmStartTime = this.formatDate(startTime);
            that.deviceList.alarmEndTime = e[1];
            that.deviceList.warningTime = [
              that.deviceList.alarmStartTime,
              e[1],
            ];
            that.changeDataSecond();
          } else {
            that.deviceList.alarmStartTime = e[0];
            that.deviceList.alarmEndTime = e[1];
            that.changeDataSecond();
          }
        }
      } else {
        let end = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
        that.deviceList.alarmStartTime = that.formatDate(start);
        that.deviceList.alarmEndTime = that.formatDate(end);
        that.changeDataSecond();
      }
    },

    //时间变化第三幅图数据变化
    changeTimeLast(e) {
      let that = this;
      if (e) {
        //接收开始时间和结束时间
        if (e[0] && e[1]) {
          if (
            new Date(e[1]).getTime() - new Date(e[0]).getTime() >
            30 * 24 * 60 * 60 * 1000
          ) {
            that.$message.error("间隔不能超过31天！");
            let startTime = new Date();
            startTime.setTime(new Date(e[1]).getTime() - 3600 * 1000 * 24 * 30);
            that.form.alarmStartTimeLast = this.formatDate(startTime);
            that.form.alarmEndTimeLast = e[1];
            that.warningTimeLast = [this.form.alarmStartTimeLast, e[1]];
            that.initDataThird();
          } else {
            that.form.alarmStartTimeLast = e[0];
            that.form.alarmEndTimeLast = e[1];
            that.initDataThird();
          }
        }
      } else {
        let end = new Date();
        let start = new Date();
        that.form.alarmStartTimeLast = that.formatDate(start);
        that.form.alarmEndTimeLast = that.formatDate(end);
        that.initDataThird();
      }
    },

    departChange() {
      let that = this;
      let params = {
        departId: this.deviceList.departId,
      };
      getUserInfo(params)
        .then((res) => {
          if (res.code === 0) {
            that.userList = res.result;
            if (that.deviceList.userId) {
              that.deviceList.userId = "";
            }

            that.changeDataSecond();
          }
        })
        .catch();
    },
    // 查看/处理消息通知
    handlechangeScene(row) {
      this.formData = row;
      this.visible = true;
      let arr = [];
      this.formData.scene &&
        this.formData.scene.map((item) => {
          arr.push(item.name);
        });
      this.name = arr.join(",");
    },

    // 关闭查看/处理详情页面
    handleClose() {
      this.visible = false;
    },
    initEventLine() {
      let datax = [];
      let datayfirst = [];
      let dataysecond = [];
      this.resultDataSecond.forEach((element) => {
        datax.push(element.time);
        datayfirst.push(element.allCount);
        dataysecond.push(element.notHandled);
      });

      this.warningEventLine = this.$echarts.init(
        document.getElementById("warningEventLine")
      );
      let option = {
        color: ["#958BCB", "#97E5F4"],
        title: {
          text: "事件数(件)",
          //textAlign:'center',
          textStyle: {
            color: "#BBBBBD",
            fontSize: 14,
            align: "center",
          },
        },
        tooltip: {
          trigger: "axis",
          extraCssText: "box-shadow:0px 0px 8px #ddd",
          backgroundColor: "#FFF",
          textStyle: {
            color: "#959595",
          },
          //动态改变tooltip里面样式
          formatter: (params, index) => {
            let title =
              '<div style="line-height:32px;margin-left:8px;margin-right:8px">' +
              params[0].axisValue +
              '</div><div style="width:90%; margin:0 auto;border-top:1px solid #F1F1F1"></div>';
            let result = "";
            params.forEach((element, index) => {
              if (element.seriesName === "预警事件") {
                result +=
                  '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#958BCB"></div>' +
                  element.seriesName +
                  '<span style="color:#0A1933;margin-left:12px">' +
                  element.value +
                  "件</span></div>";
              } else {
                result +=
                  '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#97E5F4"></div>' +
                  element.seriesName +
                  '<span style="color:#0A1933;margin-left:12px">' +
                  element.value +
                  "件</span></div>";
              }
            });
            return title + result;
          },
          axisPointer: {
            // Use axis to trigger tooltip
            type: "line",
            lineStyle: {
              color: "#CD661D",
              type: "dashed",
            },
          },
        },
        legend: {
          data: ["预警事件", "待处理事件"],
          x: "right",
          y: "top",
        },
        grid: {
          top: "10%",
          left: "1%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: datax,
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#BBBBBD",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#F1F1F1",
            },
          },
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#F1F1F1",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#BBBBBD",
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#F1F1F1",
            },
          },
        },
        series: [
          {
            name: "预警事件",
            type: "line",
            stack: "Total",
            data: datayfirst,
            barWidth: 40,
            symbol: "circle", //折线点设置为实心点
          },
          {
            name: "待处理事件",
            type: "line",
            stack: "Total",
            data: dataysecond,
            barWidth: 40,
            symbol: "circle", //折线点设置为实心点
          },
        ],
      };
      this.warningEventLine.setOption(option);
    },

    initEventChart(resultData) {
      let data = [];
      for (let i in resultData) {
        let arr = [];
        for (let j in resultData[i]) {
          if (j === "algName") {
            arr.unshift(resultData[i][j]);
          } else if (j === "handled") {
            arr.unshift(resultData[i][j]);
          } else if (j === "not_handled") {
            arr.push(resultData[i][j]);
          }
        }
        data.push(arr);
      }
      this.warningEventChart = this.$echarts.init(
        document.getElementById("warningEventChart")
      );
      let option = {
        color: ["#337DFC", "#5DE1FB"],
        legend: {
          x: "right",
          y: "top",
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "#FFF",
          extraCssText: "box-shadow:0px 0px 8px #ddd",
          textStyle: {
            color: "#959595",
          },
          formatter: (params, index) => {
            let title =
              '<div style="line-height:32px;margin-left:8px;margin-right:8px">' +
              params[0].axisValue +
              '</div><div style="width:90%; margin:0 auto;border-top:1px solid #F1F1F1"></div>';
            let result = "";
            params.forEach((element, index) => {
              if (element.seriesName === "已处理") {
                result +=
                  '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#337DFC"></div>' +
                  element.seriesName +
                  '<span style="color:#0A1933;margin-left:12px">' +
                  element.value[1] +
                  "件</span></div>";
              } else {
                result +=
                  '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#5DE1FB"></div>' +
                  element.seriesName +
                  '<span style="color:#0A1933;margin-left:12px">' +
                  element.value[2] +
                  "件</span></div>";
              }
            });
            return title + result;
          },
          axisPointer: {
            // Use axis to trigger tooltip
            type: "line",
            lineStyle: {
              color: "#CD661D",
              type: "dashed",
            },
          },
        },
        dataset: {
          source: data,
        },
        grid: {
          top: "5%",
          left: "1%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#BBBBBD",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#F1F1F1",
            },
          },
        },
        yAxis: {
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#F1F1F1",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#BBBBBD",
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#F1F1F1",
            },
          },
        },
        series: [
          { name: "已处理", type: "bar", barWidth: 40 },
          { name: "待处理", type: "bar", barWidth: 40 },
        ],
      };
      this.warningEventChart.setOption(option);
    },

    initAlgorithm() {
      let datax = [];
      let datahandled = [];
      let datanothandled = [];
      this.resultDataThird.forEach((element) => {
        datax.push(element.depart);
        datahandled.push(element.handled);
        datanothandled.push(element.not_handled);
      });
      this.algorithmStatistics = this.$echarts.init(
        document.getElementById("algorithmStatistics")
      );
      let option = {
        color: ["#337DFC", "#5DE1FB"],
        title: {
          text: "事件数(件)",
          x: "right",
          y: "bottom",
          textStyle: {
            color: "#BBBBBD",
            fontSize: 14,
            align: "center",
          },
        },
        tooltip: {
          trigger: "axis",
          extraCssText: "box-shadow:0px 0px 8px #ddd",
          backgroundColor: "#FFF",
          textStyle: {
            color: "#959595",
          },
          formatter: (params, index) => {
            let title =
              '<div style="line-height:32px;margin-left:8px;margin-right:8px">' +
              params[0].axisValue +
              '</div><div style="width:90%; margin:0 auto;border-top:1px solid #F1F1F1"></div>';
            let result = "";
            params.forEach((element, index) => {
              if (element.seriesName === "已处理") {
                result +=
                  '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#347FFF"></div>' +
                  element.seriesName +
                  '<span style="color:#0A1933;margin-left:12px">' +
                  element.value +
                  "件</span></div>";
              } else {
                result +=
                  '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#5DE1FB"></div>' +
                  element.seriesName +
                  '<span style="color:#0A1933;margin-left:12px">' +
                  element.value +
                  "件</span></div>";
              }
            });
            return title + result;
          },
          axisPointer: {
            // Use axis to trigger tooltip
            type: "line",
            lineStyle: {
              color: "#CD661D",
              type: "dashed",
            },
          },
        },
        legend: {
          x: "right",
          y: "top",
          x2: "10",
        },
        grid: {
          left: "3%",
          right: "10%",
          bottom: "2%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#BBBBBD",
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#F1F1F1",
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#F1F1F1",
            },
          },
        },
        yAxis: {
          type: "category",
          data: datax,
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#BBBBBD",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#F1F1F1",
            },
          },
        },
        series: [
          {
            name: "已处理",
            type: "bar",
            stack: "total",
            data: datahandled,
            barWidth: 30,
          },
          {
            name: "待处理",
            type: "bar",
            stack: "total",
            emphasis: {
              focus: "series",
            },
            data: datanothandled,
            barWidth: 30,
          },
        ],
      };

      this.algorithmStatistics.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
//嵌套最多三到四层
.deviceContainer {
  width: 100%;
  .deviceContent {
    width: 100%;
    height: 100%;
    background:#fff;
    box-sizing: border-box;
    .generalContent {
      width: 97%;
      margin: 24px auto;
      height: 100%;
      box-sizing: border-box;
      border-radius: 8px;
      padding: 8px 24px;
      box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    }
    .myvideo {
      box-shadow: 0px 9px 28px 8px rgba(6, 16, 48, 0.05),
        0px 6px 16px 0px rgba(6, 16, 48, 0.08),
        0px 0px 7px -3px rgba(10, 25, 51, 0.2);
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
    }
    .formInput {
      width: 242px;
    }
    .titleOne {
      width: 128px;
      display: inline-block;
      font-size: 14px;
    }
    .titleSecond {
      margin-left: 40px;
      width: 88px;
      display: inline-block;
      font-size: 14px;
    }
    .titleThird {
      margin-left: 60px;
      width: 68px;
      display: inline-block;
      font-size: 14px;
    }
    .echartsContent {
      height: 382px;
    }
    .algorithmStatistics {
      height: 400px;
    }
    .warningEventChart {
      width: 100%;
      margin: 0 auto;
      height: 400px;
    }
    .warningEventLine {
      height: 400px;
      width: 100%;
    }
  }
}
</style>
