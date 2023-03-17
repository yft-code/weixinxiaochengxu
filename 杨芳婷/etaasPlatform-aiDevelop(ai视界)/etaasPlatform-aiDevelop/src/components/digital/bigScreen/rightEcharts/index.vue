<template>
  <div class="right-echarts-container" v-show="$store.state.echartWhole">
    <div class="pagination">
      <div
        v-show="nexBtnShow"
        @click="next"
        :style="{
          'background-color':
            currentPage == 1 ? '' : 'rgba(83, 196, 245, 0.89)',
        }"
      ></div>
      <div
        v-show="preBtnShow"
        @click="pre"
        :style="{
          'background-color':
            currentPage == 2 ? '' : 'rgba(83, 196, 245, 0.89)',
        }"
      ></div>
    </div>

    <div v-show="currentPage === 1">
      <div
        class="early-warning-events"
        v-if="$store.state.echartTwo"
        ref="content"
      >
        <div class="titlefirst title">
          <div class="title-name"></div>
          <i @click="closeEchart(2)" class="iconfont close_line">&#xe6be;</i>
        </div>
        <div
          class="chart-con"
          ref="earlyWarning"
          v-loading="echartLoading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          id="early-warning"
        ></div>
      </div>
      <div class="recurrence-probability" v-if="$store.state.echartFour">
        <div class="titlesecond title">
          <div class="title-name"></div>
          <i @click="closeEchart(4)" class="iconfont close_line">&#xe6be;</i>
        </div>
        <div
          class="chart-con"
          ref="recurrenceProbability"
          v-loading="echartLoading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          id="recurrence-probability"
        ></div>
      </div>
      <div class="processing-time-statistics" v-if="$store.state.echartFive">
        <div class="titlethird title">
          <div class="title-name"></div>
          <i @click="closeEchart(5)" class="iconfont close_line">&#xe6be;</i>
        </div>
        <div
          class="chart-con"
          ref="processingTimeStatistics"
          id="processing-time-statistics"
          v-loading="echartLoading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        ></div>
      </div>
    </div>
    <div v-show="currentPage === 2">
      <div class="early-warning-events" v-if="$store.state.echartSix">
        <div class="titleforth title">
          <div class="title-name"></div>
          <i @click="closeEchart(6)" class="iconfont close_line">&#xe6be;</i>
        </div>
        <div
          class="chart-con"
          ref="algorithmAccuracyEvaluation"
          id="early-warning"
          v-loading="echartLoading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        ></div>
      </div>
      <div class="recurrence-probability" v-if="$store.state.echartOne">
        <div class="titlefifth title">
          <div class="title-name"></div>
          <i @click="closeEchart(1)" class="iconfont close_line">&#xe6be;</i>
        </div>
        <div
          class="chart-con"
          ref="handlingOfDivisionalEvents"
          id="recurrence-probability"
          v-loading="echartLoading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        ></div>
      </div>
      <div class="processing-time-statistics" v-if="$store.state.echartThree">
        <div class="titlesixth title">
          <div class="title-name"></div>
          <i @click="closeEchart(3)" class="iconfont close_line">&#xe6be;</i>
        </div>
        <div
          class="chart-con"
          ref="algorithmWarningStatistics"
          id="processing-time-statistics"
          v-loading="echartLoading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getChartInfo,
  getChartInfoSecond,
  getChartInfoThird,
} from "@/api/ai/warningEvent.js";
import { eventRepeat, handleTime } from "@/api/ai/treatment.js";
import { getAlgorithEvaluation } from "@/api/ai/algorithEvaluation.js";
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  mounted() {
    //引入方法，是excharts可以自适应屏幕，浏览器兼容性强
    this.initChart()
  },
  data() {
    return {
      echartLoading: true,
      currentPage: 1,
      titleName1: "事件发生趋势",
      titleName2: "重复发生率统计",
      titleName3: "处理时长统计",
      earlyWarningChart: null,
      recurrenceProbabilityChart: null,
      processingTimeStatisticsChart: null,
      algorithmAccuracyEvaluationChart: null,
      handlingOfDivisionalEventsChart: null,
      algorithmWarningStatisticsChart: null,
      earlyWarning: {
        tooltip: {
          trigger: "axis",
        },
        color: ["rgba(73, 150, 208, 1)", "rgba(144, 157, 208, 1)", "#808bc6"],
        legend: {
          data: [
            { name: "预警事件", icon: "rect" },
            { name: "待处理事件", icon: "rect" },
          ],
          textStyle: {
            color: "#AAAAAA", //字体颜色
          },
          type: "plain",
          orient: "horizontal",
          x: "right",
          y: "8%",
          padding: [0, 18, 0, 0],
          itemGap: 10,
          itemHeight: 2,
          itemWidth: 16,
        },
        grid: {
          left: "5%",
          right: "10%",
          bottom: "5%",
          top: "23%",
          containLabel: true,
        },
        xAxis: {
          name: "时间",
          nameTextStyle: {
            color: "#C4C4C5",
            padding: [0, 0, -28, -5],
          },
          type: "category",
          boundaryGap: true,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            show: true,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            lineStyle: {
              color: "#C4C4C5",
            },
            textStyle: {
              color: "#C4C4C5",
              padding: [0, 25, 0, 10],
            },
          },
          axisLine: {
            lineStyle: {
              color: "#C4C4C5",
            },
          },
        },
        yAxis: {
          name: "\n\n事件数/件",
          nameTextStyle: {
            color: "#9C9D9F",
          },
          axisTick: {
            show: false,
          },
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "#C4C4C5",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#6E6E6E",
            },
          },
        },
        series: [
          {
            name: "预警事件",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
            symbolSize: 0,
            lineStyle: {
              color: "rgb(66,132,182)",
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(144, 157, 208, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(144, 157, 208, 0)",
                },
              ]),
            },
          },
          {
            name: "待处理事件",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
            symbolSize: 0,
            lineStyle: {
              color: "rgb(108 132 189)",
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(144, 157, 208, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(144, 157, 208, 0)",
                },
              ]),
            },
          },
        ],
      },
      recurrenceProbability: {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "5%",
          right: "10%",
          bottom: "5%",
          top: "23%",
          containLabel: true,
        },
        xAxis: {
          name: "时间",
          nameTextStyle: {
            color: "#C4C4C5",
            padding: [0, 0, -28, -5],
          },
          type: "category",
          boundaryGap: true,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          axisTick: {
            show: true,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            lineStyle: {
              color: "#C4C4C5",
            },
            textStyle: {
              color: "#C4C4C5",
              padding: [0, 25, 0, 10],
            },
          },
          axisLine: {
            lineStyle: {
              color: "#C4C4C5",
            },
          },
        },
        yAxis: {
          name: "\n\n4h重复发生率/%",
          nameTextStyle: {
            color: "#9C9D9F",
            padding: [0, 0, 0, 10],
          },
          axisTick: {
            show: false,
          },
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "#C4C4C5",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#6E6E6E",
            },
          },
        },
        series: [
          {
            name: "重复发生",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
            symbolSize: 0,
            lineStyle: {
              color: "rgb(108 132 189)",
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(73, 150, 208, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(144, 157, 208, 0)",
                },
              ]),
            },
            itemStyle: {
              normal: {
                barBorderRadius: [20, 20, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(51, 114, 162, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(38, 84, 119, 0.1)",
                  },
                ]),
                label: {
                  show: false,
                  color: "rgb(253,209,90)",
                  position: "top",
                  textStyle: {
                    fontSize: 12,
                  },
                },
              },
            },
          },
        ],
      },
      processingTimeStatistics: {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "5%",
          right: "10%",
          bottom: "5%",
          top: "23%",
          containLabel: true,
        },
        xAxis: {
          name: "时间",
          nameTextStyle: {
            color: "#C4C4C5",
            padding: [5, 0, -23, -10],
          },
          type: "category",
          boundaryGap: true,
          data: ["WJ01", "WJ02", "WJ03", "WJ04", "WJ05", "WJ06"],
          axisTick: {
            show: true,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            lineStyle: {
              color: "#C4C4C5",
            },
            textStyle: {
              color: "#C4C4C5",
              padding: [0, -20, 0, 20],
            },
          },
          axisLine: {
            lineStyle: {
              color: "#C4C4C5",
            },
          },
        },
        yAxis: {
          name: "处理时长/h",
          nameTextStyle: {
            color: "#9C9D9F",
          },
          axisTick: {
            show: false,
          },
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "#C4C4C5",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#6E6E6E",
            },
          },
        },
        series: [
          {
            name: "处理时长",
            data: [29, 47, 40, 31, 48, 50],
            type: "bar",
            barWidth: 30,
            itemStyle: {
              normal: {
                barBorderRadius: [20, 20, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(51, 114, 162, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(38, 84, 119, 0.1)",
                  },
                ]),
                label: {
                  show: false,
                  color: "rgb(253,209,90)",
                  position: "top",
                  textStyle: {
                    fontSize: 12,
                  },
                },
              },
            },
          },
        ],
      },
      algorithmAccuracyEvaluation: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        color: [
          "RGBA(220, 249, 255, 1)",
          "RGBA(73, 187, 208, 1)",
          "RGBA(144, 157, 208, 1)",
        ],
        legend: {
          data: [
            { name: "正确预警", icon: "rect" },
            { name: "误报量", icon: "rect" },
            { name: "准确率", icon: "line" },
          ],
          textStyle: {
            color: "#AAAAAA", //字体颜色
          },
          type: "plain",
          orient: "horizontal",
          x: "right",
          y: "1%",
          padding: [0, 18, 0, 0],
          itemGap: 10,
          itemHeight: 12,
          itemWidth: 12,
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "28%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              show: true,
              alignWithLabel: true,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              lineStyle: {
                color: "#C4C4C5",
              },
              textStyle: {
                color: "#C4C4C5",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#C4C4C5",
              },
            },
          },
        ],
        yAxis: [
          {
            name: "\n\n事件数/件",
            nameTextStyle: {
              color: "#9C9D9F",
            },
            axisTick: {
              show: false,
            },
            type: "value",
            axisLine: {
              show: false,
              lineStyle: {
                color: "#C4C4C5",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#6E6E6E",
              },
            },
          },
          {
            axisLabel: {
              formatter: "{value} %",
            },
            name: "准确率/%",
            nameTextStyle: {
              color: "#9C9D9F",
              padding: [0, -20, 0, 0],
            },
            axisTick: {
              show: false,
            },
            type: "value",
            axisLine: {
              show: false,
              lineStyle: {
                color: "#C4C4C5",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#6E6E6E",
              },
            },
          },
        ],
        series: [
          {
            name: "正确预警",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            barWidth: 10,
            data: [120, 132, 101, 134, 90, 230, 210],
            itemStyle: {
              normal: {
                barBorderRadius: [20, 20, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(220, 249, 255, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(38, 84, 119, 0.1)",
                  },
                ]),
                label: {
                  show: false,
                  color: "rgb(253,209,90)",
                  position: "top",
                  textStyle: {
                    fontSize: 12,
                  },
                },
              },
            },
          },
          {
            name: "误报量",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            barWidth: 10,
            data: [220, 182, 191, 234, 290, 330, 310],
            itemStyle: {
              normal: {
                barBorderRadius: [20, 20, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "RGBA(73, 187, 208, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(38, 84, 119, 0.8)",
                  },
                ]),
                label: {
                  show: false,
                  color: "rgb(253,209,90)",
                  position: "top",
                  textStyle: {
                    fontSize: 12,
                  },
                },
              },
            },
          },
          {
            name: "准确率",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + "%";
              },
            },
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
            ],
          },
        ],
      },
      handlingOfDivisionalEvents: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        color: ["RGBA(220, 249, 255, 1)", "RGBA(73, 187, 208, 1)", "#808bc6"],
        legend: {
          data: [
            { name: "已处理", icon: "rect" },
            { name: "待处理", icon: "rect" },
          ],
          textStyle: {
            color: "#AAAAAA", //字体颜色
          },
          type: "plain",
          orient: "horizontal",
          x: "right",
          y: "2%",
          padding: [0, 18, 0, 0],
          itemGap: 10,
          itemHeight: 12,
          itemWidth: 12,
        },
        grid: {
          left: "5%",
          right: "15%",
          bottom: "3%",
          top: "18%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          name: "事件数/件",
          nameTextStyle: {
            color: "#C4C4C5",
            padding: [0, 0, -28, -5],
          },
          boundaryGap: true,
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            lineStyle: {
              color: "#C4C4C5",
            },
            textStyle: {
              color: "#C4C4C5",
              padding: [0, 25, 0, 10],
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#C4C4C5",
            },
          },
        },
        yAxis: {
          type: "category",
          data: ["部门6", "部门5", "部门4", "部门3", "部门2", "部门1"],
          name: "名称",
          nameTextStyle: {
            color: "#9C9D9F",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#C4C4C5",
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: "dashed",
              color: "#6E6E6E",
            },
          },
        },
        series: [
          {
            name: "已处理",
            type: "bar",
            stack: "Ad",
            barWidth: 10,
            data: [18, 33, 45, 20, 23, 53],
            itemStyle: {
              normal: {
                barBorderRadius: [0, 20, 20, 0],
                color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: "RGBA(220, 249, 255, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(38, 84, 119, 0.1)",
                  },
                ]),
                label: {
                  show: false,
                  color: "rgb(253,209,90)",
                  position: "top",
                  textStyle: {
                    fontSize: 12,
                  },
                },
              },
            },
          },
          {
            name: "待处理",
            type: "bar",
            stack: "Ad",
            barWidth: 10,
            data: [19, 63, 31, 42, 13, 68],
            itemStyle: {
              normal: {
                padding: [0, 0, 0, -50],

                barBorderRadius: [0, 20, 20, 0],
                color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: "RGBA(73, 187, 208, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(38, 84, 119, 0.1)",
                  },
                ]),
                label: {
                  show: false,
                  color: "rgb(253,209,90)",
                  position: "top",
                  textStyle: {
                    fontSize: 12,
                  },
                },
              },
            },
          },
        ],
      },
      algorithmWarningStatistics: {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [
            { name: "已处理", icon: "rect" },
            { name: "待处理", icon: "rect" },
          ],
          textStyle: {
            color: "#AAAAAA",
          },
          type: "plain",
          orient: "horizontal",
          x: "right",
          y: "2%",
          padding: [0, 18, 0, 0],
          itemGap: 10,
          itemHeight: 12,
          itemWidth: 12,
        },
        grid: {
          left: "5%",
          right: "10%",
          bottom: "5%",
          top: "23%",
          containLabel: true,
        },
        xAxis: {
          name: "时间",
          nameTextStyle: {
            color: "#C4C4C5",
            padding: [5, 0, -23, -10],
          },
          type: "category",
          boundaryGap: true,
          data: ["吸烟", "吸烟", "吸烟", "吸烟", "吸烟", "吸烟"],
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            lineStyle: {
              color: "#C4C4C5",
            },
            textStyle: {
              color: "#C4C4C5",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#C4C4C5",
            },
          },
        },
        yAxis: {
          name: "事件数/件",
          nameTextStyle: {
            color: "#9C9D9F",
          },
          axisTick: {
            show: false,
          },
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "#C4C4C5",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#6E6E6E",
            },
          },
        },
        series: [
          {
            name: "已处理",
            data: [29, 47, 40, 31, 48, 50],
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [20, 20, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(51, 114, 162, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(38, 84, 119, 0.1)",
                  },
                ]),
                label: {
                  show: false,
                  color: "rgb(253,209,90)",
                  position: "top",
                  textStyle: {
                    fontSize: 12,
                  },
                },
              },
            },
          },
          {
            name: "待处理",
            data: [13, 14, 24, 23, 36, 45],
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [20, 20, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(73, 187, 208, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(38, 84, 119, 0.1)",
                  },
                ]),
                label: {
                  show: false,
                  color: "rgb(253,209,90)",
                  position: "top",
                  textStyle: {
                    fontSize: 12,
                  },
                },
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    initChart(){
      const erd = elementResizeDetectorMaker();
    if (this.$refs.content && erd) {
      erd.listenTo(this.$refs.content, (element) => {
        if (this.earlyWarningChart) {
          this.earlyWarningChart.resize();
        }
        if (this.recurrenceProbabilityChart) {
          this.recurrenceProbabilityChart.resize();
        }
        if (this.processingTimeStatisticsChart) {
          this.processingTimeStatisticsChart.resize();
        }
        if (this.algorithmAccuracyEvaluationChart) {
          this.algorithmAccuracyEvaluationChart.resize();
        }
        if (this.handlingOfDivisionalEventsChart) {
          this.handlingOfDivisionalEventsChart.resize();
        }
        if (this.algorithmWarningStatisticsChart) {
          this.algorithmWarningStatisticsChart.resize();
        }
      });
      getChartInfoSecond()
        .then((res) => {
          if (res.success == true && res.code == 0) {
            this.earlyWarning.xAxis.data = [];
            this.earlyWarning.series[0].data = [];
            this.earlyWarning.series[1].data = [];
            res.result &&
              res.result.forEach((item, index) => {
                this.earlyWarning.xAxis.data.push(item.time);
                this.earlyWarning.series[0].data.push(item.allCount);
                this.earlyWarning.series[1].data.push(item.notHandled);
              });
            let earlyWarning = this.$echarts.init(this.$refs.earlyWarning);
            this.earlyWarningChart = earlyWarning;
            earlyWarning.setOption(this.earlyWarning);
          }
        })
        .catch((e) => {
          // this.$message.warning(e || "事件发生趋势获取数据失败！");
        });

      eventRepeat({
        interval: 4,
      })
        .then((res) => {
          if (res.success == true && res.code == 0) {
            this.recurrenceProbability.xAxis.data = [];
            this.recurrenceProbability.series[0].data = [];
            res.result.forEach((item, index) => {
              this.recurrenceProbability.xAxis.data.push(item.date);
              this.recurrenceProbability.series[0].data.push(
                item.repeat / item.sum || 0
              );
            });
            let recurrenceProbability = this.$echarts.init(
              this.$refs.recurrenceProbability
            );
            this.recurrenceProbabilityChart = recurrenceProbability;
            recurrenceProbability.setOption(this.recurrenceProbability);
          }
        })
        .catch((e) => {
          // this.$message.warning(e || "4h重复发生率获取数据失败！");
        });

      handleTime({
        interval: 4,
      })
        .then((res) => {
          if (res.success == true && res.code == 0) {
            this.processingTimeStatistics.xAxis.data = [];
            this.processingTimeStatistics.series[0].data = [];
            res.result.forEach((item, index) => {
              this.processingTimeStatistics.xAxis.data.push(
                item.date.slice(0, 10)
              );
              this.processingTimeStatistics.series[0].data.push(item.AVG);
            });
            let processingTimeStatistics = this.$echarts.init(
              this.$refs.processingTimeStatistics
            );
            this.processingTimeStatisticsChart = processingTimeStatistics;
            processingTimeStatistics.setOption(this.processingTimeStatistics);
          }
        })
        .catch((e) => {
          // this.$message.warning(e || "处理时长统计获取数据失败！");
        });

      getAlgorithEvaluation({ interval: 4 })
        .then((res) => {
          if (res.success == true && res.code == 0) {
            this.algorithmAccuracyEvaluation.xAxis[0].data = [];
            this.algorithmAccuracyEvaluation.series[0].data = [];
            this.algorithmAccuracyEvaluation.series[1].data = [];
            this.algorithmAccuracyEvaluation.series[2].data = [];
            res.result.forEach((item, index) => {
              this.algorithmAccuracyEvaluation.xAxis[0].data.push(item.date);
              this.algorithmAccuracyEvaluation.series[0].data.push(item.sure);
              this.algorithmAccuracyEvaluation.series[1].data.push(
                item.mistake
              );
              this.algorithmAccuracyEvaluation.series[2].data.push(
                (item.sure / item.sum) * 100
              );
            });
            let algorithmAccuracyEvaluation = this.$echarts.init(
              this.$refs.algorithmAccuracyEvaluation
            );
            this.algorithmAccuracyEvaluationChart = algorithmAccuracyEvaluation;
            algorithmAccuracyEvaluation.setOption(
              this.algorithmAccuracyEvaluation
            );
          }
        })
        .catch((e) => {
          // this.$message.warning(e || "算法准确率评估获取失败！")
        });

      getChartInfo()
        .then((res) => {
          if (res.success == true && res.code == 0) {
            this.handlingOfDivisionalEvents.yAxis.data = [];
            this.handlingOfDivisionalEvents.series[0].data = [];
            this.handlingOfDivisionalEvents.series[1].data = [];
            res.result.forEach((item, index) => {
              this.handlingOfDivisionalEvents.yAxis.data.push(item.depart);
              this.handlingOfDivisionalEvents.series[0].data.push(item.handled);
              this.handlingOfDivisionalEvents.series[1].data.push(
                item.not_handled
              );
            });
            let handlingOfDivisionalEvents = this.$echarts.init(
              this.$refs.handlingOfDivisionalEvents
            );
            this.handlingOfDivisionalEventsChart = handlingOfDivisionalEvents;
            handlingOfDivisionalEvents.setOption(
              this.handlingOfDivisionalEvents
            );
          }
        })
        .catch((e) => {
          // this.$message.warning(e || "分部门事件处理情况获取失败！")
        });

      getChartInfoThird()
        .then((res) => {
          if (res.success == true && res.code == 0) {
            this.algorithmWarningStatistics.xAxis.data = [];
            this.algorithmWarningStatistics.series[0].data = [];
            this.algorithmWarningStatistics.series[1].data = [];
            res.result.forEach((item, index) => {
              this.algorithmWarningStatistics.xAxis.data.push(item.algName);
              this.algorithmWarningStatistics.series[0].data.push(item.handled);
              this.algorithmWarningStatistics.series[1].data.push(
                item.not_handled
              );
            });
            let algorithmWarningStatistics = this.$echarts.init(
              this.$refs.algorithmWarningStatistics
            );
            this.algorithmWarningStatisticsChart = algorithmWarningStatistics;
            algorithmWarningStatistics.setOption(
              this.algorithmWarningStatistics
            );
          }
        })
        .catch((e) => {
          // this.$message.warning(e || "算法预警统计获取失败！")
        });
    }
    },
    closeEchart(n) {
      switch (n) {
        case 1:
          this.$store.state.echartOne = false;
          break;

        case 2:
          this.$store.state.echartTwo = false;

          break;

        case 3:
          this.$store.state.echartThree = false;

          break;
        case 4:
          this.$store.state.echartFour = false;
          break;

        case 5:
          this.$store.state.echartFive = false;

          break;

        case 6:
          this.$store.state.echartSix = false;

          break;
        default:
          break;
      }
    },
    pre() {
      this.currentPage = 1;
    },
    next() {
      this.currentPage = 2;
    },
  },
  computed: {
    // pagBtnShow(){
    //   return (()||()) ? false: true;
    // },
    preBtnShow() {
      return !this.$store.state.echartTwo &&
        !this.$store.state.echartFour &&
        !this.$store.state.echartFive
        ? false
        : true;
    },
    nexBtnShow() {
      return !this.$store.state.echartOne &&
        !this.$store.state.echartThree &&
        !this.$store.state.echartSix
        ? false
        : true;
    },
  },
};
</script>

<style lang="scss" scoped>
.right-echarts-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 458px;
  height: 100%;
  .pagination {
    width: 100%;
    height: 24px;
    margin: 0;
    margin-bottom: 5px;
    div {
      pointer-events: all;
      width: 24px;
      height: 24px;
      float: right;
      margin-left: 12px;
      border-radius: 5px;
      cursor: pointer;
      &:first-of-type {
        background: url("~@/assets/digital/assets/img/bigScreen/next.png")
          no-repeat;
        background-size: 100% 100%;
      }
      &:last-of-type {
        background: url("~@/assets/digital/assets/img/bigScreen/pre.png")
          no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .early-warning-events,
  .recurrence-probability,
  .processing-time-statistics {
    margin-bottom: 12px;
    pointer-events: all;
    background: url("~@/assets/digital/assets/img/bigScreen/bigScreenBCK.png")
      no-repeat;
    background-size: 100% 100%;
    .titlefirst {
      background-size: 100% 100%;
      background: url("~@/assets/digital/assets/img/bigScreen/eventTitle.png")
        no-repeat center center;
      background-size: 100% 100%;
      filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='~@/assets/digital/assets/img/bigScreen/eventTitle.png', sizingMethod='scale');
    }
    .titlesecond {
      background-size: 100% 100%;
      background: url("~@/assets/digital/assets/img/bigScreen/eventTitle2.png")
        no-repeat center center;
      background-size: 100% 100%;
      filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='~@/assets/digital/assets/img/bigScreen/eventTitle.png', sizingMethod='scale');
    }
    .titlethird {
      background-size: 100% 100%;
      background: url("~@/assets/digital/assets/img/bigScreen/eventTitle3.png")
        no-repeat center center;
      background-size: 100% 100%;
      filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='~@/assets/digital/assets/img/bigScreen/eventTitle.png', sizingMethod='scale');
    }
    .titleforth {
      background-size: 100% 100%;
      background: url("~@/assets/digital/assets/img/bigScreen/algorithmAccuracyEvaluation.png")
        no-repeat center center;
      background-size: 100% 100%;
      filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='~@/assets/digital/assets/img/bigScreen/eventTitle.png', sizingMethod='scale');
    }
    .titlefifth {
      background-size: 100% 100%;
      background: url("~@/assets/digital/assets/img/bigScreen/handlingOfDivisionalEvents.png")
        no-repeat center center;
      background-size: 100% 100%;
      filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='~@/assets/digital/assets/img/bigScreen/eventTitle.png', sizingMethod='scale');
    }
    .titlesixth {
      background-size: 100% 100%;
      background: url("~@/assets/digital/assets/img/bigScreen/algorithmWarningStatistics.png")
        no-repeat center center;
      background-size: 100% 100%;
      filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='~@/assets/digital/assets/img/bigScreen/eventTitle.png', sizingMethod='scale');
    }
    .title {
      display: flex;
      justify-content: space-between;
      width: 458px;
      height: 36px;
      padding: 8px;

      > div {
        i {
          display: inline-block;
          width: 4px;
          height: 20px;
          background-color: rgb(173, 178, 192);
          &:first-of-type {
            margin-right: 1px;
          }
        }
      }
      .title-name {
        width: 380px;
        height: 28px;
        font-size: 20px;
        font-weight: 700;
        color: #fff;
      }
      i {
        font-size: 24px;
        color: #ccd1df;
        cursor: pointer;
      }
    }
    .chart-con {
      width: 458px;
      height: 200px;
      margin-top: 16px;
      margin-bottom: 8px;
    }
  }
}
</style>