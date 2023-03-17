<template>
  <div class="algorithEvaluationContainer">
    <div class="algorithEvaluationContent">
      <div class="content">
        <el-form   
         :model="algorithEvaluation"
          size="small"
          label-width="110px">
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
              @change="handleChangeParkName"
              v-model="algorithEvaluation.parkName"
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
      <el-form-item label="算法名称" prop="algName">
            <el-select
              :popper-append-to-body="false"
              @change="handleChangeAlgorithName"
              v-model="algorithEvaluation.algName"
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
          <el-form-item label="设备名称" prop="buildingName">
            <el-select
              :popper-append-to-body="false"
              v-model="algorithEvaluation.deviceName"
              @change="handleChangeDeviceName"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in deviceNameList1"
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
    <el-form-item label="预警时间">
            <el-date-picker
              style="width:100%"
              @change="changeTime"
              v-model="warningTime"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
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
          算法准确率估评
          <!-- <div class="echartsSwitch">
              <span class="echartsSwitchTitle">是否前端显示</span>
              <el-switch
                v-model="$store.state.echartSix"
                active-text=""
                inactive-text="">
              </el-switch>
              <div class="clear"></div>
            </div> -->
        </div>
        <div v-loading="loading">
          <div
            id="algorithEvaluationMyChart"
            style="width: 100%; height: 688px"
            ref="algorithEvaluationMyChart"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getAlgorithEvaluation,
  getDeviceBuildnameList,
  getDeviceNameList,
} from "@/api/ai/algorithEvaluation";
import { getBuildnameList } from "@/api/ai/deviceManage";
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "algorithEvaluation",
  props: {
    aloList: {
      type: Array,
      default: [],
    },
    parkNameList: {
      type: Array,
      default: [],
    },
    deviceNameList: {
      type: Array,
      default: [],
    },
    buildingNameList: {
      type: Array,
      default: [],
    },
  },
  components: {},
  data() {
    return {
      deviceNameList1: [],
      buildingNameList1: [],
      loading: false,
      changeTimeFlag: false,
      systemNowTime: "",
      systemBeforeTime: "",

      // buildingNameList1:this.buildingNameList,
      // deviceNameList1:this.deviceNameList,
      sum: [],
      percent: [],
      mistake: [],
      date: [],
      sure: [],

      warningTime: [],
      // deviceName:'',
      algorithEvaluation: {
        deviceName: "",
        sceneName: "",
        algName: "",
        parkName: "",
        buildingName: "",
        startTime: "",
        endTime: "",
      },

      activeName: "first",
    };
  },
  created() {
    this.getTimeFn();
  },
  // watch: {
  //   deviceName(curVal, oldVal) {
  // // 实现input连续输入，只发一次请求
  //   clearTimeout(this.timeout)
  //   this.timeout = setTimeout(() => {
  //     this.handleChangeName(curVal)
  //   }, 500)
  // }
  watch: {
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
    // },
  },
  mounted() {
    // this.getTimeFn()
    this.getAlgorithEvaluation(this.algorithEvaluation);
    this.drawLine();
    const erd = elementResizeDetectorMaker();
    erd.listenTo(this.$refs.algorithEvaluationMyChart, (element) => {
      this.algorithEvaluationMyChart.resize();
    });
  },
  methods: {
    getTimeFn() {
      const that = this;
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
      this.systemBeforeTime = that.formatDate(start);
      this.systemNowTime = that.formatDate(end);
      this.warningTime.push(start);
      this.warningTime.push(end);
    },
    // 格式化时间
    formatDate(date) {
      var myyear = date.getFullYear();
      var mymonth = date.getMonth() + 1;
      var myweekday = date.getDate();
      if (mymonth < 10) {
        mymonth = "0" + mymonth;
      }
      if (myweekday < 10) {
        myweekday = "0" + myweekday;
      }
      return myyear + "-" + mymonth + "-" + myweekday;
    },
    addDate() {
      var tempDate = new Date(); // 获取今天的日期
      var tempDate1 = new Date(); // 获取今天的日期
      tempDate.setDate(tempDate.getDate() - 6); // 今天的前N天的日期，N自定义
      tempDate1.setDate(tempDate1.getDate() - 0); // 今天的前N天的日期，N自定义
      var beforeDate =
        tempDate.getFullYear() +
        "-" +
        (tempDate.getMonth() + 1) +
        "-" +
        tempDate.getDate();
      var nowDate =
        tempDate1.getFullYear() +
        "-" +
        (tempDate1.getMonth() + 1) +
        "-" +
        tempDate1.getDate();

      this.systemNowTime = nowDate;
      this.systemBeforeTime = beforeDate;

      this.warningTime = [this.systemBeforeTime, this.systemNowTime];
    },
    getAlgorithEvaluation(params) {
      this.loading = true;
      // if(!this.changeTimeFlag){
      //    this.getTimeFn()
      // }
      let algName = "";
      let parkName = "";
      let buildingName = "";
      let deviceName = "";

      if (params.algName === "全部") {
        algName = "";
      } else {
        algName = params.algName;
      }
      if (params.parkName === "全部") {
        parkName = "";
      } else {
        parkName = params.parkName;
      }
      if (params.buildingName === "全部") {
        buildingName = "";
      } else {
        buildingName = params.buildingName;
      }
      if (params.deviceName === "全部") {
        deviceName = "";
      } else {
        deviceName = params.deviceName;
      }

      // params.deviceName = this.deviceName
      params.endTime = this.systemNowTime;
      params.startTime = this.systemBeforeTime;

      let params1 = {
        algName: algName,
        parkName: parkName,
        buildingName: buildingName,
        sceneName: params.sceneName,
        deviceName: deviceName,
        endTime: params.endTime,
        startTime: params.startTime,
      };

      getAlgorithEvaluation(params1).then((res) => {
        this.date = [];
        this.percent = [];
        this.sum = [];
        this.sure = [];
        this.mistake = [];
        res.result.map((item) => {
          this.date.push(item.date.substring(0, 10));
          this.mistake.push(item.mistake);
          this.percent.push(item.percent.replace("%", ""));
          this.sum.push(item.sum);
          this.sure.push(item.sure);
        });
        this.loading = false;
        this.drawLine();
      });
    },
    handleChangeDeviceName(e) {
      this.algorithEvaluation.deviceName = e;
      this.getAlgorithEvaluation(this.algorithEvaluation);
    },
    handleChangeAlgorithName(e) {
      this.algorithEvaluation.algName = e;
      this.getAlgorithEvaluation(this.algorithEvaluation);
    },

    handleChangeBuildingName(e) {
      this.algorithEvaluation.buildingName = e;
      this.getAlgorithEvaluation(this.algorithEvaluation);
      this.getDeviceNameList(e);
    },
    handleChangeParkName(e) {
      this.algorithEvaluation.parkName = e;
      this.getAlgorithEvaluation(this.algorithEvaluation);
      this.getDeviceBuildnameList(e);
      this.getDeviceNameList1();
    },
    getDeviceNameList1(e) {
      let parkName = "";
      if (e === "全部") {
        e = "";
      }
      if (this.algorithEvaluation.parkName === "全部") {
        parkName = "";
      } else {
        parkName = this.algorithEvaluation.parkName;
      }
      let params = {
        parkName: parkName,
        buildingName: "",
      };
      getDeviceNameList(params).then((res) => {
        this.deviceNameList1 = res.result;
      });
    },
    getDeviceBuildnameList(e) {
      this.algorithEvaluation.buildingName = "";
      this.algorithEvaluation.deviceName = "";
      if (e === "全部") {
        e = "";
      }
      let params = {
        parkName: e,
      };

      getBuildnameList(params).then((res) => {
        this.buildingNameList1 = res.result;
      });
    },
    getDeviceNameList(e) {
      //  this.algorithEvaluation.buildingName = ''
      this.algorithEvaluation.deviceName = "";
      let parkName = "";
      if (e === "全部") {
        e = "";
      }
      if (this.algorithEvaluation.parkName === "全部") {
        parkName = "";
      } else {
        parkName = this.algorithEvaluation.parkName;
      }
      let params = {
        parkName: parkName,
        buildingName: e,
      };
      getDeviceNameList(params).then((res) => {
        this.deviceNameList1 = res.result;
      });
    },

    getNextDate(date, day) {
      let dd = new Date(date);
      dd.setDate(dd.getDate() + day);
      let y = dd.getFullYear();
      let m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      let d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      return y + "-" + m + "-" + d;
    },
    changeTime(e) {
      this.changeTimeFlag = true;
      if (e) {
        if (e[0] && e[1]) {
          if (
            new Date(e[1]).getTime() - new Date(e[0]).getTime() >
            30 * 24 * 60 * 60 * 1000
          ) {
            this.$message.error("间隔不能超过31天！");
            e[0] = this.getNextDate(e[1], -30);

            this.systemBeforeTime = e[0];
            this.systemNowTime = e[1];

            this.warningTime = [this.systemBeforeTime, this.systemNowTime];
            this.getAlgorithEvaluation(this.algorithEvaluation);
          } else {
            this.systemNowTime = e[1];
            this.systemBeforeTime = e[0];
            this.warningTime = [e[0], e[1]];
            this.getAlgorithEvaluation(this.algorithEvaluation);
          }
        }
      }
    },
    handleClick(tab, event) {},
    drawLine() {
      this.algorithEvaluationMyChart = this.$echarts.init(
        document.getElementById("algorithEvaluationMyChart")
      );
      // 绘制图表
      this.algorithEvaluationMyChart.setOption({
        // backgroundColor: '#1b1b1b',//背景色
        grid: {
          top: "12%",
          left: "1%",
          right: "4%",
          bottom: "5%",
          containLabel: true,
        },
        legend: {
          selectedMode: true, //可点击
          data: ["正确预警", "误报量", "准确率(%)"],
          x: "right",
          padding: [0, 50, 0, 0],
        },
        tooltip: {
          trigger: "axis",
          extraCssText: "box-shadow:0px 0px 8px #ddd",
          backgroundColor: "#FFF",
          textStyle: {
            color: "#959595",
          },
          axisPointer: {
            // Use axis to trigger tooltip
            type: "line",
            lineStyle: {
              color: "#CD661D",
              type: "dashed",
            },
          },
          formatter: (params, index) => {
            let title =
              '<div style="line-height:32px;margin-left:8px;margin-right:8px">' +
              params[0].axisValue +
              '</div><div style="width:90%; margin:0 auto;border-top:1px solid #F1F1F1"></div>';
            let result = "";
            params.forEach((element, index) => {
              if (element.seriesName === "正确预警") {
                result +=
                  '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#347FFF"></div>' +
                  element.seriesName +
                  '<span style="color:#0A1933;margin-left:12px">' +
                  element.value +
                  "</span></div>";
              } else if (element.seriesName === "误报量") {
                result +=
                  '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#F27918"></div>' +
                  element.seriesName +
                  '<span style="color:#0A1933;margin-left:12px">' +
                  element.value +
                  "</span></div>";
              } else {
                result +=
                  '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#97CE7C"></div>' +
                  element.seriesName +
                  '<span style="color:#0A1933;margin-left:12px">' +
                  element.value +
                  "%</span></div>";
              }
            });
            return title + result;
          },
        },

        xAxis: [
          {
            type: "category", //类目轴
            data: this.date,
            axisLabel: {
              rotate: 60,
              show: true,
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
        ],
        yAxis: [
          {
            scale: true,
            min: 0,
            minInterval: 1,
            splitLine: {
              //网格线
              lineStyle: {
                type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
                color: "#F1F1F1",
              },
              show: true, //隐藏或显示
            },
            axisLine: { show: false },
            axisTick: { show: false },
            type: "value", //数值轴
            name: "事件数(件)",
            nameTextStyle: {
              fontWeight: "bold",
              fontSize: 14,
              color: "#A7ADB6",
            },
            min: 0,
            axisLabel: {
              textStyle: {
                color: "#BBBBBD",
              },
            },
          },
          {
            scale: true,
            splitLine: {
              show: false, //网格线
              lineStyle: {
                color: "#F1F1F1",
                type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
              },
            },
            min: 0,
            max: 100,
            show: true, //隐藏或显示
            nameTextStyle: {
              color: "#A7ADB6",
            },

            axisLine: { show: false },
            axisTick: { show: false },
            type: "value",
            name: "准确率(%)",
            nameTextStyle: {
              fontSize: 14,
              fontWeight: "bold",
              color: "#A7ADB6",
              align: "center",
            },
            axisLabel: {
              textStyle: {
                color: "#A7ACB5",
              },
              formatter: function (value, index) {
                return value.toFixed(2);
              },
            },
          },
        ],
        series: [
          {
            name: "正确预警",
            type: "bar",
            stack: "one",
            barWidth: 25,
            // yAxisIndex:0,
            // emphasis: this.emphasisStyle,
            data: this.sure,
            itemStyle: {
              normal: {
                color: "#347FFF",
              },
            },
          },
          {
            name: "误报量",
            // yAxisIndex:0,
            type: "bar",
            stack: "one",
            barWidth: 25,
            // emphasis: this.emphasisStyle,
            data: this.mistake,
            itemStyle: {
              normal: {
                color: "#F27918",
              },
            },
          },
          {
            symbol: "circle",
            name: "准确率(%)",
            type: "line",
            yAxisIndex: 1,
            showSymbol: true,
            Symbol: "circle",
            itemStyle: {
              normal: {
                color: "#91CB75", //改变折线点的颜色
                lineStyle: {
                  color: "#ABD696", //改变折线颜色
                },
              },
            },
            data: this.percent,
            // label:{
            //   show:true,
            //   formatter:function(data){
            //     return data.value+'%'
            //   }
            // }
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-select-dropdown {
  z-index: 120 !important;
}
.algorithEvaluationContainer {
  width: 100%;
  //  background: red;
  .algorithEvaluationContent {
    .echartsTitle {
      color: #0a1933;
      font-size: 20px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 600;
      color: #0a1933;
      line-height: 36px;
      margin-bottom: 12px;
    }
    .clear {
      clear: both;
    }
    .echartsSwitch {
      float: right;
    }
    .echartsSwitchTitle {
      color: rgba(10,25,51,0.6);
      font-size: 14px;
      margin-right: 8px;
    }
    .content {
      width: 100%;
      margin: 0 auto;
      padding-top: 24px;
     /deep/.el-select{
      width: 100% !important;
     }
      /deep/ .el-date-editor .el-range-separator {
        padding: 0;
      }
    }
  }
}
</style>
