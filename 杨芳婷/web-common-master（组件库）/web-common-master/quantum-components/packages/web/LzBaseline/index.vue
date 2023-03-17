<template>
  <div class="main">
    <div class="container" id="baseline"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import moment from "moment";
export default {
  name: "LzBaseline",
  props: {
    nowDate: {
      type: Object,
      default: () => {
        return {
          date: moment().format('YYYY/MM/DD'),
          name: "Now",
          imgUrl: "",
          color: "#333",
        };
      },
    },
    maxDate: {
      type: String,
      default: "2025/02/23",
    },
    minDate: {
      type: String,
      default: "2018/12/12",
    },
    format: {
      type: String,
      default: "YY/MM/DD",
    },
  },
  data() {
    return {
      myChart: "",
    };
  },
  mounted() {
    let that = this;
    // 基于准备好的dom，初始化echarts实例
    that.myChart = echarts.init(document.getElementById("baseline"));
    // 指定图表的配置项和数据
    const option = {
      xAxis: {
        splitLine: { show: false },
        axisLabel: {
          show: true,
          inside: true,
          margin: 15,
          showMinLabel: true,
          showMaxLabel: true,
          hideOverlap: true,
          formatter: function (value) {
            return moment(value).format(that.format);
          },
        },
        axisTick: {
          show: true,
          inside: true,
        },
        type: "time",
        min: this.minDate,
        max: this.maxDate,
      },
      yAxis: {
        show: false,
        splitLine: { show: false },
        axisLine: {
          onZero: true,
        },
      },
      dataZoom: [
        {
          start: 0,
          end: 100,
          height: 15,
          realtime: false,
          labelFormatter: (value) => {
            return moment(value).format(that.format);
          },
        },
        {
          type: "inside",
        },
      ],
      series: [
        {
          name: "base",
          data: [],
          type: "scatter",
          symbolSize: 10,
          label: {
            show: true,
            formatter: function (param) {
              return param.data[2];
            },
            position: "top",
          },
        },
        {
          name: "base",
          data: [
            [
              this.nowDate.date,
              0,
              this.nowDate.name,
              this.nowDate.imgUrl
            ],
          ],
          type: "scatter",
          symbolSize: [30, 17],
          symbol: function (param) {
            return "image://" + param[3];
          },
          symbolOffset: [0, 17],
          label: {
            show: false,
          },
          markLine: {
            silent: true,
            symbol: "none",
            label: {
              show: false,
            },
            lineStyle: {
              color: this.nowDate.color,
            },
            data: [
              {
                xAxis: this.nowDate.date,
              },
            ],
          },
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    that.myChart.setOption(option);
    that.myChart.on("dataZoom", function () {
      that.getAreaDate();
    });

    window.onresize = () => {
      that.myChart = echarts.init(document.getElementById("baseline"));
      that.myChart.resize();
    };
  },
  methods: {
    getAreaDate() {
      let actualStartDate = moment(
        new Date(this.myChart.getModel().option.dataZoom[0].startValue)
      ).format("YYYY-MM-DD");
      let actualEndDate = moment(
        new Date(this.myChart.getModel().option.dataZoom[0].endValue)
      ).format("YYYY-MM-DD");
      this.$emit("getAreaDate", { actualStartDate, actualEndDate });
    },
  },
};
</script>

<style scoped>
.main {
  width: 500px;
  height: 150px;
}
.container {
  margin-left: -60px;
  width: calc(100vw - 470px);
  height: 90px;
  margin-top: -30px;
}
.baseLine {
  height: 2px;
  background-color: #c0c4cc;
}
.label_container {
  display: flex;
  text-align: center;
  margin-bottom: -10px;
}
.baselineLabel {
  width: 60px;
  font-size: 10px;
  height: 10px;
  line-height: 10px;
}
</style>
