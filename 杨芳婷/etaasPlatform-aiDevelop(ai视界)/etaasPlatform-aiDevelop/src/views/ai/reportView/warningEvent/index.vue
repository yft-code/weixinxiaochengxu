<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <div class="content" ref="content">
        <el-form
         :model="form" 
         size="small"
         label-width="80px">
         <el-row
        :gutter="20"
      >
        <!-- 搜索框组件 -->
        <template>
           <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
         <el-form-item label="预警时间">
            <el-date-picker
              style="width:100%"
              :append-to-body="false"
              @change="changeTime"
              v-model="warningTime"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              popper-class="pickerPopper"
              ref="pickerPopper"
            >
            </el-date-picker>
          </el-form-item>
          </el-col>
        </template>
      </el-row>
          <div class="echartsTitle">
            分部门事件处理情况
            <!-- <div class="echartsSwitch">
              <span class="echartsSwitchTitle">是否前端显示</span>
              <el-switch
                v-model="$store.state.echartOne">
              </el-switch>
              <div class="clear"></div>
            </div> -->
          </div>
          <div class="echartsContent" v-loading="loadingFirst">
            <div
              id="algorithmStatistics"
              class="algorithmStatistics"
              ref="algorithmStatistics"
            ></div>
          </div>
        </el-form>
        <el-form
          ref="deviceList"
          :model="deviceList"
         size="small"
          style="margin-top: 44px"
          label-width="105px"
        >
          <el-row
        :gutter="0"
      >
        <!-- 搜索框组件 -->
        <template>
          <el-col
           :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
        <el-form-item label="园区/厂区名称" prop="parkName">
            <el-select
               style="width:100%"
              :popper-append-to-body="false"
              v-model="deviceList.parkName"
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
          </el-col>
           <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
       <el-form-item label="设备名称" prop="deviceName">
            <el-select
              style="width:100%"
              :popper-append-to-body="false"
              v-model="deviceList.deviceName"
              filterable
              placeholder="请选择"
              @change="changeDataSecond"
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
          </el-col>
           <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
          <el-form-item label="算法名称">
            <el-select
               style="width:100%"
              :popper-append-to-body="false"
              v-model="deviceList.algName"
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
          </el-col>
          <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
         <el-form-item label="预警时间">
            <el-date-picker
              style="width:100%"
              @change="changewarnigTime"
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
          </el-col>
        </template>
      </el-row>
    </el-form>
        <div class="echartsTitle">
          事件发生趋势
          <!-- <div class="echartsSwitch">
              <span class="echartsSwitchTitle">是否前端显示</span>
              <el-switch
                v-model="$store.state.echartTwo"
                active-text=""
                inactive-text="">
              </el-switch>
              <div class="clear"></div>
            </div> -->
        </div>
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
          size="small"
          style="margin-top: 44px"
         label-width="80px">
         <el-row
        :gutter="20"
      >
        <!-- 搜索框组件 -->
        <template>
           <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
         <el-form-item label="预警时间">
            <el-date-picker
            style="width:100%"
              :append-to-body="false"
              @change="changeTimeLast"
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
          </el-col>
            <el-col
            :sm="8"
            :md="8"
            :lg="12"
            :xl="12"
          >
          <div class="grid-content"></div>
          </el-col>
           <el-col
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
          >
         <el-form-item label="算法数量">
           <el-select
              style="width:100%"
              :popper-append-to-body="false"
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
          </el-form-item>
          </el-col>
        </template>
      </el-row>
        </el-form>
        <div class="echartsTitle">
          算法预警统计
          <!-- <div class="echartsSwitch">
              <span class="echartsSwitchTitle">是否前端显示</span>
              <el-switch
                v-model="$store.state.echartThree"
                active-text=""
                inactive-text="">
              </el-switch>
              <div class="clear"></div>
            </div> -->
        </div>
        <div v-loading="loadingThird">
          <div
            class="warningEventChart"
            id="warningEventChart"
            ref="warningEventChart"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  buildnameList,
  serialnumberList,
  stateList,
  getBuildnameList,
} from "@/api/ai/deviceManage";
import { userPageList, getUserDetailInfo } from "@/api/ai/scenarioManagement";
import {
  getChartInfo,
  getChartInfoSecond,
  getChartInfoThird,
  getUserInfo,
  getDeviceInfo,
} from "@/api/ai/warningEvent";
import { getAlgorithm } from "@/api/ai/algorithmManage";
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  name: "warningEvent",
  props: {
    parkNameList: {
      type: Array,
      default: [],
    },
    buildingNameList: {
      type: Array,
      default: [],
    },
    aloList: {
      type: Array,
      default: [],
    },
    sceneList: {
      type: Array,
      default: [],
    },
    departList: {
      type: Array,
      default: [],
    },
    deviceNameList: {
      type: Array,
      default: [],
    },
    userData: {
      type: Array,
      default: [],
    },
  },
  components: {},
  data() {
    return {
      userId: "",
      deviceNameData: [],
      buildingNameData: [],
      loadingFirst: true,
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
      warningTime: [
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
      algNumberList: ["5", "10","15"],
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
    this.getTimeFn();
    this.initData();
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
  //监听值变化，根据下拉框改变动态改变联动关系
  watch: {
    userData: {
      handler(newVal, oldVal) {
        this.userList = newVal;
      },
      immediate: true,
      deep: true,
    },
    buildingNameList: {
      handler(newVal, oldVal) {
        this.buildingNameData = newVal;
      },
      immediate: true,
      deep: true,
    },
    deviceNameList: {
      handler(newVal, oldVal) {
        this.deviceNameData = newVal;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    cascaderClick(nodeData) {
      this.deviceList.departId = nodeData.value;
      this.$refs.cascader.checkedValue = nodeData.value;
      this.$refs.cascader.computePresentText();
      this.$refs.cascader.toggleDropDownVisible(false);
    },

    changeParkName() {
      let parkName = "";
      if (this.deviceList.parkName === "全部") {
        parkName = "";
      } else {
        parkName = this.deviceList.parkName;
      }
      let params = { parkName: parkName };
      getBuildnameList(params).then((res) => {
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
    //
    changeUser(val) {
      if (val === "全部") {
        this.deviceList.userId = "";
      } else {
        this.deviceList.userId = val;
      }
      let params = { userId: this.deviceList.userId };
      getBuildnameList(params).then((res) => {
        this.buildingNameData = res.result;
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

    //第一幅图
    initData() {
      this.loadingFirst = true;
      let params = {
        startWith: this.formatDate(new Date(this.form.alarmStartTime)),
        endWith: this.formatDate(new Date(this.form.alarmEndTime)),
      };
      getChartInfo(params).then((res) => {
        if (res.code === 0 && res.result) {
          this.resultDataThird = res.result;
          this.loadingFirst = false;
          this.initAlgorithm();
        }
      });
    },

    // 时间变化第一幅图数据变化
    changeTime(e) {
      if (e) {
        //接收开始时间和结束时间
        if (e[0] && e[1]) {
          if (
            new Date(e[1]).getTime() - new Date(e[0]).getTime() >
            30 * 24 * 60 * 60 * 1000
          ) {
            this.$message.error("间隔不能超过31天！");
            let startTime = new Date();
            startTime.setTime(new Date(e[1]).getTime() - 3600 * 1000 * 24 * 30);
            this.form.alarmStartTime = this.formatDate(startTime);
            this.form.alarmEndTime = e[1];
            this.warningTime = [this.form.alarmStartTime, e[1]];
            this.initData();
          } else {
            this.form.alarmStartTime = e[0];
            this.form.alarmEndTime = e[1];
            this.initData();
          }
        }
      } else {
        let that = this;
        let end = new Date();
        let start = new Date();
        that.form.alarmStartTime = that.formatDate(start);
        that.form.alarmEndTime = that.formatDate(end);
        that.initData();
      }
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
        organizationId: this.deviceList.departId,
        pageSize: 99999,
        pageNum: 1,
      };
      userPageList(params)
        .then((res) => {
          if (res.code === 0) { 
            let arr = [];
           
              that.deviceList.userId = "";
            
            res.result.list.map((element) => {
              arr.push({
                id: element.id,
                username: element.name,
              });
            });
            that.userList = arr;
            that.changeDataSecond();
          }
        })
        .catch();
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
              color: "#999FAA",
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
          min: 0,
          minInterval: 1,
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
              color: "#999FAA",
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
              color: "#999FAA",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#F1F1F1",
            },
          },
        },
        yAxis: {
          min: 0,
          minInterval: 1,
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
              color: "#999FAA",
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
              color: "#999FAA",
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
              color: "#999FAA",
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
 .grid-content {
    border-radius: 4px;
    min-height:0.1PX;
  }
/deep/ .el-select-dropdown {
  z-index: 120 !important;
}
/deep/ .el-picker-panel {
  z-index: 100 !important;
}
/deep/ .el-cascader__dropdown {
  z-index: 100 !important;
}
//嵌套最多三到四层
.deviceContainer {
  width: 100%;
  .clear {
    clear: both;
  }

  .deviceContent {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .content {
      width: 100%;
      margin: 0 auto;
      padding-top: 12px;
    }
    .echartsContent {
      height: 382px;
    }
    .echartsTitle {
      color: #0a1933;
      font-size: 20px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 600;
      color: #0a1933;
      line-height: 36px;
      margin-bottom: 12px;
    }
    .echartsSwitch {
      float: right;
    }
    .echartsSwitchTitle {
      color: rgba(10,25,51,0.6000);
      font-size: 14px;
      margin-right: 8px;
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
<style >
.pickerPopper.el-picker-panel {
  z-index: 100 !important;
  /* !important设置权重为最高，否则会被原生的样式进行修改*/
}
</style>

