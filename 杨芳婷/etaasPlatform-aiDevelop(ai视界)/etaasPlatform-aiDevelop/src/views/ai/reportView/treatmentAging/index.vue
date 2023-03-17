<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <div class="content">
         <el-form   
          ref="form"
          :model="form"
         size="small"
          label-width="105px">
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
              :popper-append-to-body="false"
              filterable
              @change="changePark"
              v-model="parkName"
              placeholder="请选择"
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
         <el-form-item label="设备名称">
            <el-select
              :popper-append-to-body="false"
              filterable
              @change="handleChange"
              v-model="deviceName"
              placeholder="请选择"
            >
              <el-option
                v-for="item in deviceNameList1"
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
         <el-form-item label="算法名称">
            <el-select
              :popper-append-to-body="false"
              @change="handleChange"
              v-model="algName"
              placeholder="请选择"
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
              class="formInput"
              v-model="warningTime"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="~"
              start-placeholder="预警时间"
              end-placeholder="结束日期"
              popper-class="pickerPopper"
            >
            </el-date-picker>
          </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
        <div class="echartsTitle">
          事件重复发生率统计
          <!-- <div class="echartsSwitch">
              <span class="echartsSwitchTitle">是否前端显示</span>
              <el-switch
                v-model="$store.state.echartFour"
                active-text=""
                inactive-text="">
              </el-switch>
              <div class="clear"></div>
            </div> -->
        </div>
          <div style="margin-top:10px">
          <el-form   
          ref="form"
          :model="form"
          size="small"
          label-width="105px">
      <el-row
        :gutter="20"
      >
        <!-- 搜索框组件 -->
        <template>
            <el-col
          :sm="16"
           :md="16"
           :lg="18"
           :xl="18"
          >
    <div class="grid-content bg-purple"></div>
        </el-col>
          <el-col
           :sm="8"
           :md="8"
           :lg="6"
           :xl="6"
          >
     <el-form-item label="时间间隔">
           <el-select
              :popper-append-to-body="false"
              size="mini"
              v-model="form.interval"
              class="formInput"
              placeholder="请选择"
              @change="selectChange"
             >
             <el-option
             v-for="item in options"
             :key="item.value"
             :label="item.label"
             :value="item.value"
 >
 </el-option>
</el-select>
          </el-form-item>
        </el-col>
        </template>
      </el-row>
    </el-form>
          </div>
      </div>
      <!--图标-->
      <div class="echars_container" ref="box">
        <div v-loading="loading">
          <div id="line" style="width: 100%; height: 500px" ref="line"></div>
        </div>
        <div class="echartsTitle">
          事件处理时长统计
          <!-- <div class="echartsSwitch">
              <span class="echartsSwitchTitle">是否前端显示</span>
              <el-switch
                v-model="$store.state.echartFive"
                active-text=""
                inactive-text="">
              </el-switch>
              <div class="clear"></div>
            </div> -->
        </div>
        <div v-loading="loadingSecond">
          <div
            id="bar"
            style="width: 100%; height: 500px; margin-top: 40px"
            ref="bar"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/ai/treatment";
import qs from "qs";
import { userPageList, getUserDetailInfo } from "@/api/ai/scenarioManagement";
import { getBuildnameList } from "@/api/ai/deviceManage";
import { getUserListOrg } from "../../../../api/ai/scenarioManagement";
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  name: "treatmentAging",
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
  data() {
    return {
      userId: "",
      options: [
        {
          value: 1,
          label: "1h",
        },
        {
          value: 4,
          label: "4h",
        },
        {
          value: 12,
          label: "12h",
        },
        {
          value: 24,
          label: "24h",
        },
      ],
      loading: true,
      loadingSecond: true,
      departName: "",
      deviceName: "",
      buildingNameList1: [],
      userList: [],
      algNumberList: [],
      myChart: null,
      myChartBar: null,
      parkName: "",
      algName: "",
      buildingName: "",
      sceneName: "",
      form: {
        departmentId: "",
        interval: 4,
        userId: "",
        buildingName: "",
        deviceName: "",
      },
      deviceNameList1: [],
      warningTime: [],
      // 标题
      title: "4",
      textStyle: {
        // 标题文字样式设置
        color: "#BBBBBD",
        fontSize: 14,
      },
      grid: {
        top: "10%",
        left: "1%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      // 处理时长柱状表
      xtime: [],
      ytime: [],
      // 重复率
      xAxis: [],
      yAxis: [],
    };
  },
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
        this.buildingNameList1 = newVal;
      },
      immediate: true,
      deep: true,
    },
    deviceNameList: {
      handler(newVal, oldVal) {
        this.deviceNameList1 = newVal;
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
  },
  mounted() {
    this.getTimeFn();
    this.fetchDataLong(this.form);
    this.fetchDataTime(this.form);
    const erd = elementResizeDetectorMaker();
    if (erd) {
      erd.listenTo(this.$refs.box, (element) => {
        if (this.myChart) {
          this.myChart.resize();
        }
        if (this.myChartBar) {
          this.myChartBar.resize();
        }
      });
    }
  },
  methods: {
    cascaderClick(nodeData) {
      this.departName = nodeData.value;
      this.$refs.cascader.checkedValue = nodeData.value;
      this.$refs.cascader.computePresentText();
      this.$refs.cascader.toggleDropDownVisible(false);
    },

    // 园区改动
    changePark(e) {
      this.buildingName = "";
      this.deviceName = "";
      this.form.buildingName = "";
      this.form.deviceName = "";
      if (this.parkName === "全部") {
        this.form.parkName = "";
      } else {
        this.form.parkName = this.parkName;
      }
      const params = {
        parkName: this.form.parkName,
      };
      getBuildnameList(params)
        .then((res) => {
          this.buildingNameList1 = res.result;
        })
        .catch();
      const params1 = {
        parkName: this.form.parkName,
        buildingName: this.form.buildingName,
      };
      //  console.log('params1',params1);
      api
        .getDevice(params1)
        .then((res) => {
          this.deviceNameList1 = res.result;
        })
        .catch();
      this.fetchDataTime(this.form);
      this.fetchDataLong(this.form);
    },
    //  建筑改变
    handleBuilding(e) {
      this.deviceName = "";
      this.form.deviceName = "";
      if (this.buildingName === "全部") {
        this.form.buildingName = "";
      } else {
        this.form.buildingName = this.buildingName;
      }
      const params1 = {
        parkName: this.form.parkName,
        buildingName: this.form.buildingName,
      };
      api
        .getDevice(params1)
        .then((res) => {
          this.deviceNameList1 = res.result;
        })
        .catch();
      this.fetchDataTime(this.form);
      this.fetchDataLong(this.form);
    },
    handleUser(e) {
      if (e === "全部") {
        console.log("val", e);
        console.log("lim", e);
        this.form.userId = "";
      } else {
        this.form.userId = e;
      }
      this.fetchDataTime(this.form);
      this.fetchDataLong(this.form);
    },
    handleChange(e) {
      if (this.algName === "全部") {
        this.form.algName = "";
      } else {
        this.form.algName = this.algName;
      }
      if (this.buildingName === "全部") {
        this.form.buildingName = "";
      } else {
        this.form.buildingName = this.buildingName;
      }
      if (this.sceneName === "全部") {
        this.form.sceneName = "";
      } else {
        this.form.sceneName = this.sceneName;
      }
      if (this.deviceName === "全部") {
        this.form.deviceName = "";
      } else {
        this.form.deviceName = this.deviceName;
      }
      this.fetchDataTime(this.form);
      this.fetchDataLong(this.form);
    },
    // 通过部门获取人员
    selectDepart(data) {
      const value = data;
      let arr = [];
      this.userId = "";
      this.fetchDataTime(this.form);
      this.fetchDataLong(this.form);
      const params = {
        organizationId: value,
      };
      userPageList(params)
        .then((res) => {
          res.result.list.map((element) => {
            arr.push({
              id: element.id,
              username: element.name,
            });
          });
          this.userList = arr;
        })
        .catch();
    },

    // 获取前一周的时间
    getTimeFn() {
      const that = this;
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
      that.form.startTime = that.formatDate(start);
      that.form.endTime = that.formatDate(end);
      this.warningTime.push(start);
      this.warningTime.push(end);
    },
    // 格式化时间
    formatDate(date) {
      let myyear = date.getFullYear();
      let mymonth = date.getMonth() + 1;
      let myweekday = date.getDate();
      if (mymonth < 10) {
        mymonth = "0" + mymonth;
      }
      if (myweekday < 10) {
        myweekday = "0" + myweekday;
      }
      return myyear + "-" + mymonth + "-" + myweekday;
    },
    // 获取指定日期的前几天
    getNextDate(date, day) {
      let dd = new Date(date);
      dd.setDate(dd.getDate() + day);
      let y = dd.getFullYear();
      let m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      let d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      return y + "-" + m + "-" + d;
    },
    // 对时间的处理
    changewarnigTime(e) {
      if (e) {
        if (e[0] && e[1]) {
          if (
            new Date(e[1]).getTime() - new Date(e[0]).getTime() >
            30 * 24 * 60 * 60 * 1000
          ) {
            this.$message.error("间隔不能超过31天！");
            e[0] = this.getNextDate(e[1], -30);
            // console.log('start',e[0]);
            this.form.startTime = e[0];
            this.form.endTime = e[1];
            this.warningTime = [e[0], e[1]];
            this.fetchDataTime(this.form);
            this.fetchDataLong(this.form);
          } else {
            delete this.form.endTime;
            delete this.form.startTime;
            this.form.startTime = e[0];
            this.form.endTime = e[1];
            this.fetchDataTime(this.form);
            this.fetchDataLong(this.form);
          }
        }
      }
      // console.log('form',this.form);
    },
    selectChange(value) {
      this.title = value;
      this.fetchDataTime(this.form);
      this.fetchDataLong(this.form);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 折线图
    init1() {
      this.myChart = this.$echarts.init(document.getElementById("line"));
      let option = {
        grid: this.grid,
        tooltip: {
          trigger: "axis",
          //  设置边框阴影
          extraCssText: "box-shadow:0px 0px 8px #ddd",
          backgroundColor: "rgba(255,255,255)", //设置背景图片 rgba格式
          shadowBlur: 10,
          textStyle: {
            color: "#959595", //设置文字颜色
          },
          borderColor: "#fff", //设置边框颜色
          axisPointer: {
            // Use axis to trigger tooltip
            type: "line",
            lineStyle: {
              color: "#CD661D",
              type: "dashed",
            },
          },
          //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
          formatter:
            '{b}<br/><div style="width:95%; margin:0 auto;border-top:1px solid #F1F1F1"></div><div style="margin-right:3px;line-height:8px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#347FFF"></div>' +
            this.title +
            'h重复发生率<span style="color:#0A1933;margin-left:5px">{c}%</span>',
        },
        title: {
          text: this.title + "时重复发生率_%",
          textAlign: "left",
          textStyle: this.textStyle,
          left: "0.8%",
        },
        xAxis: {
          type: "category",
          data: this.xAxis,
          scale: true /*按比例显示*/,
          axisTick: {
            alignWithLabel: true,
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
          min: (value) => {
            return Math.floor(value.min);
          },
          max: (value) => {
            return Math.ceil(value.max);
          },
          scale: true /*按比例显示*/,
          interval: 5,
          axisLabel: {
            formatter: "{value} %",
            textStyle: {
              color: "#BBBBBD",
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
          axisLine: {
            show: false,
            lineStyle: {
              color: "#F1F1F1",
            },
          },
        },
        series: [
          {
            symbolSize: 0,
            // 图的值 data
            data: this.yAxis,
            // data:[0.3,50,4,2,7,10,99.6,30,50,50,40,50,60,50,40,50,60,50,40,50,60,50,40,50,60,50,40,7.7,7.9,40,39],
            // 图的类型，type:'line/bar'
            type: "line",
            lineStyle: {
              normal: {
                width: 2,
                color: "#347FFF", //设置实线的颜色
              },
            },
            itemStyle: {
              normal: {
                color: "#347FFF",
                borderColor: "#347FFF", //拐点边框颜色
              },
            },
            symbol: "circle", //折线点设置为实心点
            symbolSize: 1, //折线点的大小
          },
        ],
      };
      this.myChart.setOption(option);
    },
    // 柱状图
    init() {
      this.myChartBar = this.$echarts.init(document.getElementById("bar"));
      let option = {
        tooltip: {
          trigger: "axis",
          //  设置边框阴影
          extraCssText: "box-shadow:0px 0px 8px #ddd",
          backgroundColor: "rgb(255,255,255)", //设置背景rgb格式
          shadowBlur: 10,
          textStyle: {
            color: "#959595", //设置文字颜色
          },
          borderColor: "#fff", //设置边框颜色
          axisPointer: {
            // Use axis to trigger tooltip
            type: "line",
            lineStyle: {
              color: "#CD661D",
              type: "dashed",
            },
          },
          //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
          formatter:
            '{b}<br/><div style="width:95%; margin:0 auto;border-top:1px solid #F1F1F1"></div><div style="margin-right:3px;line-height:8px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#347FFF"></div>处理时长<span style="color:#0A1933;margin-left:5px">{c}h</span>',
        },
        title: {
          // 标题设置
          text: "处理时长(h)", // 标题文字
          textStyle: this.textStyle,
          left: "1%", // 标题距离左边的距离
          // top: 10 // 标题距离顶部的距离
        },
        grid: this.grid,
        xAxis: {
          type: "category",
          data: this.xtime,
          /*按比例显示*/
          scale: true,
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
          min: 0,
          minInterval: 1,
          min: (value) => {
            return Math.floor(value.min);
          },
          max: (value) => {
            return Math.ceil(value.max);
          },
          // 每次增加几个
          scale: true /*按比例显示*/,
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
            barWidth: 30,
            // symbolSize:0,
            // 图的值 data
            data: this.ytime,
            // data:[0.3,50,4,2,7,10,8.6,30,50,50,40,50,60,50,40,50,60.9,50,40,50,60,50,40,50,60,50,40,7.7,7.9,40,39],
            // 图的类型，type:'line/bar'
            type: "bar",
            lineStyle: {
              normal: {
                width: 2,
                color: "#6259DD", //设置实线的颜色
              },
            },
            // 柱状体的颜色
            itemStyle: {
              normal: {
                color: "#347FFF",
              },
            },
          },
        ],
      };
      this.myChartBar.setOption(option);
    },
    // 4h重复率
    fetchDataTime(params) {
      this.loading = true;
      // console.log('查询params',params);
      api.eventRepeat(params).then((res) => {
        // console.log('返回结果',res);
        let arrX = [];
        let arrY = [];
        res.result &&
          res.result.map((item) => {
            arrX.push(item.date);
            item.percent = item.percent.replace("%", "");
            arrY.push(item.percent);
          });
        this.xAxis = arrX.reverse();
        this.yAxis = arrY.reverse();
        this.loading = false;
        this.init1();
      });
    },
    fetchDataLong(params) {
      this.loadingSecond = true;
      api.handleTime(params).then((res) => {
        // console.log('时长数据',res);
        let arrX = [];
        let arrY = [];
        res.result &&
          res.result.map((item) => {
            arrX.push(item.date);
            arrY.push(item.AVG);
          });
        this.xtime = arrX;
        this.ytime = arrY;
        this.loadingSecond = false;
        this.init();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
 .grid-content {
    border-radius: 4px;
    min-height: 36px;
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
.deviceContainer {
  width: 100%;
  .echartsTitle {
    color: #0a1933;
    font-size: 20px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 600;
    color: #0a1933;
    line-height: 36px;
  }
  .clear {
    clear: both;
  }
  .echartsSwitch {
    float: right;
  }
  .echartsSwitchTitle {
    color: rgba(10,25,51,0.6000);
    font-size: 14px;
    margin-right: 8px;
  }
  .deviceContent {
     background:#fff;
    .content {
      width: 100%;
      margin: 0 auto;
      padding-top: 12px;
       /deep/.el-select{
      width:100% !important;
    }
    }
    .echars_container {
      margin: 0 auto;
      margin-top: 38px;
    }
    /deep/.el-date-editor--datetimerange.el-input,
    .el-date-editor--datetimerange.el-input__inner {
      width: 300px;
    }
    .form_bottom {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 24px;

    }
    .form_br {
      width: 100%;
      margin-top: 16px;
      height: 1px;
      background-color: #f3f3f5;
    }
    .form_bottom1 {
      margin-top: 12px;
      margin-bottom: 16px;
      display: flex;
      flex-direction: row-reverse;
    }
    .deviceTable {
      width: 100%;
      ::v-deep.el-table__empty-text {
        position: fixed;
        line-height: 60px;
        left: 30%;
        color: #909399;
      }
    }
    .form_pg {
      height: 45px;
      margin-top: 24px;
      padding-bottom: 24px;
      margin-right: 0;
    }
  }
}
</style>
