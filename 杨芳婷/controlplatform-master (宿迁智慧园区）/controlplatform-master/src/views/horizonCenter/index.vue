<template>
  <div class="aiMonitor">
    <!-- 监控室 -->
    <div class="height-all monitorStyle">
      <div class="monitorTitle">实时监控</div>
      <div class="monitorContainer" >
        <ul
         v-loading="loadingOut"
          class="videos flex flex-wrap box-sizing-base"
          v-if="multipleSelectionStart.length > 0"
        >
          <li
            v-for="(item, index) in multipleSelectionStart"
            :key="index"
            :class="['video box-sizing-base', videoClass]"
          >
            <div v-show="item" class="videoContent">
              <ul>
                <li v-for="(item, index2) in multipleSelection" :key="index2">
                  <div v-if="index === index2">
                    <div class="videoTitle">
                      <div class="left">{{ item.deviceName }}</div>
                      <div class="right">
                        <span class="one">
                          <i
                            v-if="item.total"
                            class="iconfont icon-alert imgIco"
                          ></i>
                          <i v-else class="iconfont icon-alert imgIco1"></i>
                        </span>
                        <span class="totalStyle"
                          ><span v-if="item.total" class="count"
                            >{{ item.total ? item.total : 0 }}件</span
                          ></span
                        >
                        <span class="three">
                          <span
                            class="viewStatus"
                            v-if="item.total"
                            @click="handleChangeStatus(item.id)"
                          >
                            {{ item.expandStatus ? "收起" : "展开" }}
                          </span>
                        </span>
                        <div class="mask" v-if="item.deviceErr !== '设备异常'">
                          <div>
                            <span>
                              今日: {{ item.latest ? item.latest : 0 }}</span
                            >
                          </div>
                          <div>
                            <span>
                              累计: {{ item.count ? item.count : 0 }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="box">
                      <ul
                        class="warningList"
                        v-show="item.expandStatus"
                        :style="{ maxHeight: 100 + '%' }"
                      >
                        <li
                          v-for="(j, i) in item.warningData"
                          @click="handlechangeScene(j)"
                          :key="i"
                          :style="{ color: j.warning.levelColor }"
                        >
                          <div class="levelInfo">
                            <el-tooltip placement="top">
                              <div slot="content">
                                预警等级:{{ j.warning.levelName }}
                                <br />
                                预警等级说明:{{
                                  j.warning.levelComment
                                    ? j.warning.levelComment
                                    : "--"
                                }}
                              </div>
                              <span
                                class="circle1"
                                :style="{ background: j.warning.levelColor }"
                              ></span>
                            </el-tooltip>

                            <div class="level">
                              {{ j.warning.levelNickname }}
                            </div>
                            <span class="name">{{ j.algName }}</span>
                          </div>
                          <i class="icon-right_fill iconfont arrowIco"></i>
                        </li>
                        <li
                          @click="loadMore(item.id, item)"
                          v-show="
                            item.warningData &&
                            item.warningData.length > 0 &&
                            item.total > item.warningData.length
                          "
                        >
                          <a v-loading="item.ifLoadMore">点击加载更多</a>
                        </li>
                        <li
                          v-show="
                            item.warningData &&
                            item.warningData.length > 0 &&
                            item.total <= item.warningData.length
                          "
                        >
                          <a>暂无更多数据</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
              <ul>
                <li
                  v-for="(item, index1) in multipleSelectionStart"
                  :key="index1"
                >
                  <div v-if="index === index1">
                    <div v-loading="item.loading" class="deviceErrStyle">
                      <div class="deviceErr">{{ item.deviceErr }}</div>
                    </div>
                    <video class="myvideo" muted controls autoplay></video>
                  </div>
                </li>
              </ul>
              <check-dialog
                @func="handleMyEvent"
                :dialogVisible="visible"
                :form-data="formData"
                :parkName="formData.device.parkName"
                :name="name"
                :id="formData.id"
                :title="'事件编号' + `${formData.eventId}`"
                :floor="formData.device.floor"
                :areaName="formData.device.areaName"
                :deviceName="formData.device.deviceName"
                :building-name="formData.device.buildingName"
                @close-callback="handleClose"
                @getReadState="getReadState"
              ></check-dialog>
            </div>
          </li>
        </ul>
        <div v-else class="noData">{{ noData }}</div>
        <div class="form_Devicepg" v-if="multipleSelectionStart.length > 0">
          <el-pagination
            style="float: right"
            background
            align="center"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total,prev, pager, next, jumper"
            :total="total"
            @size-change="handleDeviceSizeChange"
            @current-change="handleDeviceCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="tableStyle">
      <div class="tableTitle">
        <div class="left">
          <span class="leftTitle">事件列表</span>

          <div @click="moreEvent" class="leftMore">
            <span class="more">查看全部</span>
            <i class="ico el-icon-d-arrow-right"></i>
          </div>
        </div>
        <div class="right">
          <el-form ref="form" :model="form" label-width="100px" size="mini">
            <el-form-item label="排序规则">
              <el-select
                :popper-append-to-body="false"
                v-model="value"
                placeholder="请选择"
                @change="sortChange"
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
          </el-form>
        </div>
      </div>
      <el-table
        style="width: 90; margin: 0 atuo"
        height="78%"
        :data="tableData"
        v-loading="loadingTable"
      >
        <el-table-column
          prop="deviceName"
          label="设备名称"
          show-overflow-tooltip
          @cell-mouse-enter="mouseOver"
          @cell-mouse-leave="mouseLeave"
        >
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              width="200"
              trigger="hover"
              popper-class="my-popover1"
            >
              <div>{{ `预警等级:${scope.row.warning.levelName}` }}</div>
              <div>
                {{
                  `预警说明:${
                    scope.row.warning.levelComment
                      ? scope.row.warning.levelComment
                      : "--"
                  }`
                }}
              </div>
              <el-button slot="reference" type="text">
                <span
                  class="circle"
                  :style="{ background: scope.row.warning.levelColor }"
                  @mouseover="mouseOver"
                  @mouseleave="mouseLeave"
                ></span>
              </el-button>
            </el-popover>
            <span>{{ scope.row.deviceName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="algName"
          label="识别算法"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="datetime"
          label="预警时间"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column  width="100" prop="action" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handlechangeScene(scope.row)"
              >处理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- echars -->
    <div class="reportForm">
      <div
        v-loading="loadingChart1"
        style="width: 30%; height: 100%; float: left; position: relative"
      >
        <div class="loadingChart1Container">
          <div class="loadingChart1Style">{{ currentWeekData.all_count }}</div>
          <div class="loadingChart1Line"></div>
          <div class="loadingChart1DeviceStyle">事件总数</div>
        </div>
        <div
          id="MyChart1"
          style="width: 100%; height: 90%"
          ref="MyChart1"
        ></div>
      </div>
      <div
        v-loading="loadingChart2"
        style="width: 40%; height: 100%; float: left; position: relative"
      >
        <div style="position: absolute; right: 97px; top: 0"></div>
        <div
          id="MyChart2"
          style="width: 100%; height: 90%"
          ref="MyChart2"
        ></div>
      </div>
      <div
        v-loading="loadingChart3"
        style="width: 30%; height: 100%; float: left; position: relative"
      >
        <div class="loadingChart3Container">
          <div class="loadingChart3Style">{{ deviceStatus.total }}</div>
          <div class="loadingChart3Line"></div>
          <div class="loadingChart3DeviceStyle">设备总数</div>
        </div>
        <div
          id="MyChart3"
          style="width: 100%; height: 90%"
          ref="MyChart3"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import checkDialog from "@components/checkDialog/index";
import { getVediostream } from "@/api/ai/deviceManage";
import { deviceEvent } from "@/api/ai/deviceManage";
import * as api from "@/api/ai/earlyWarning";
import {
  getData,
  getListBacklog,
  deviceEventStatistical,
  getRecordByDevice,
} from "@/api/ai/generalView";
import elementResizeDetectorMaker from "element-resize-detector";
import flvjs from "flv.js/src";
export default {
  name: "horizonCenter",
  components: { checkDialog },
  data() {
    return {
      noData: "",
      loadingOut: true,
      videoStorge: {},
      videoIndex: 0,
      videoErrIndex: 0,
      deviceErr: "",
      loadingVideo: false,
      form: {},
      formInline: {
        user: "",
        region: "周",
      },
      currentPage: 1,
      pageSize: 4,
      options: [
        { value: 0, label: "时间优先" },
        { value: 1, label: "等级优先" },
      ],
      value: 0,
      total: 0,
      loading: false,
      loadingChart1: false,
      loadingChart2: false,
      loadingChart3: false,
      tableData: [],
      loadingTable: false,
      tableHeight: null,
      currentWeekData: {},
      deviceStatus: {},
      levelData: [],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      //
      name: "",
      screenHeight: document.body.clientHeight,
      currentLoadData: false, // 告警数据是否返回完全
      formData: { device: {}, scene: {} }, // 从预警列表获取的详情数据
      lists: [], //视频流数据List
      videoClass: "four", // 监控视频class - 用于一屏显示不同数量视频
      player: null,
      playerArr: [],
      showWarningContent: false, // 是否显示 点击警告图标按钮后的右侧+下拉区域
      haveChange: false, // 通知是否已经查看/处理
      visible: false, // 是否展示查看/处理详情页面
      currentsize: 1,
      currentWarningData: this.warningData, // 告警数据
      count: 1, //起始页数值为0
      videoHeight: 300,
      showVideo: false, // 录像是否返回
      loadData: false,
      multipleSelection: [],
      multipleSelection1: [],
      multipleSelectionStart: [],
      warningData: [],
    };
  },
  watch: {
    multipleSelection(val) {
      this.multipleSelection = val;
    },

    warningData(val) {
      this.currentWarningData = val;
      this.fetchInitialData("flag");
    },

    loadData(val) {
      this.currentLoadData = val;
    },
  },
  mounted() {
    if (this.$store.state.horizonShow) {
      let that = this;
      this.$bus.$on("c22", () => {
        that.getListBacklog();
        that.getData();
        that.initData();
      });
      this.initDataStart();
      this.getData();
      this.getListBacklog();
      this.currentLoadData = this.loadData;
      this.currentWarningData = this.warningData;
      this.fetchInitialData();
      this.multipleSelection.map((item) => {
        item.expandStatus = true;
      });
      this.$forceUpdate(); // 强制刷新
    }
    if (this.$store.state.horizonShow) {
      const that = this;
      this.initData();
      window.onresize = () => {
        return (() => {
          window.screenHeight = document.body.clientHeight;
          that.screenHeight = window.screenHeight;
          that.screenHeight1 = window.screenHeight;
        })();
      };
    }
  },
  methods: {
    getReadState() {
      this.$bus.$emit("cll", "");
      this.getListBacklog();
      this.getData();
      this.initData();
    },
    mouseOver() {},
    mouseLeave() {},
    //处理异常,url为空时的视频
    createPlayers(videoEle, videoUrl, n) {
      if (flvjs.isSupported()) {
        this.player = flvjs.createPlayer(
          {
            type: "flv", // could also be mpegts, m2ts, flv
            isLive: true,
            url: videoUrl,
            hasAudio: false,
          },
          {
            enableStashBuffer: false,
          }
        );
        this.player.attachMediaElement(videoEle);
        this.player.load();
        videoEle.addEventListener("progress", function () {
          const len = this.buffered.length;
          if (len > 0) {
            const buftime = this.buffered.end(len - 1) - this.currentTime;
            if (buftime >= 3) {
              this.currentTime = this.buffered.end(len - 1);
            }
          }
        });
        // player.play();
        const playPromise = this.player.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.player.play();
              n.loading = false;
              // console.log(n, "播放成功");
              this.$forceUpdate();
            })
            .catch(() => {});
        }
      }
    },

    //flv.js 视频
    createPlayer(videoEle, videoUrl, n) {
      //配置播放器的属性
      if (flvjs.isSupported()) {
        this.player = flvjs.createPlayer(
          {
            type: "flv", // could also be mpegts, m2ts, flv
            isLive: true,
            url: videoUrl,
            hasAudio: false,
          },
          {
            enableStashBuffer: false,
          }
        );
        this.player.attachMediaElement(videoEle);
        this.player.load();
        videoEle.addEventListener("progress", function () {
          const len = this.buffered.length;
          if (len > 0) {
            const buftime = this.buffered.end(len - 1) - this.currentTime;
            if (buftime >= 3) {
              this.currentTime = this.buffered.end(len - 1);
            }
          }
        });

        const playPromise = this.player.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if(this.player){
                this.player.play();
                n.loading = false;
                this.$forceUpdate();
              }
              // console.log(n,'kkkkkkk')
            })
            .catch(() => {});
        }
        this.player.on(flvjs.Events.LOADING_COMPLETE, (res) => {
          if(this.player){
            n.loading = true;
            this.$forceUpdate();
            // console.log(res, "resresresflv111111");
           this.setVideos(videoEle, videoUrl, n);
          }
          
        });
        // this.player.on(flvjs.Events.ERROR, (errorType, errorDetail, errorInfo) => {

        // });

        this.player.on(flvjs.Events.MEDIA_SOURCE_CLOSE, () => {
          if(this.player){
            n.loading = false;
            this.setVideos(videoEle, videoUrl, n);
          }
          
        });
        this.player.on(
          flvjs.Events.ERROR,
          (errorType, errorDetail, errorInfo) => {
            if(this.player){
              n.deviceErr = "设备异常";
              n.loading = false;
              this.$forceUpdate();

              this.setVideos(videoEle, videoUrl, n);
            }
            
          }
        );
      }
    },

    handleMyEvent() {
      this.loadingTable = true;
    },

    handleDeviceSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.initDataStart();
      this.initData();
    },

    handleDeviceCurrentChange(val) {
      this.currentPage = val;
      this.initDataStart();
      this.initData();
    },

    sortChange() {
      this.getListBacklog();
    },

    moreEvent() {
      this.$router.push("/earlyWarning");
    },

    getData() {
      this.loadingChart1 = true;
      this.loadingChart2 = true;
      this.loadingChart3 = true;
      getData().then((res) => {
        this.loadingChart1 = false;
        this.loadingChart2 = false;
        this.loadingChart3 = false;
        this.currentWeekData = res.result.currentWeekData;
        this.deviceStatus = res.result.deviceStatus;
        this.levelData = res.result.levelData;
        this.levelData = this.levelData.reverse();
        let d1 = [];
        let d2 = [];
        let d3 = [];
        let d4 = [];
        let d5 = [];
        this.levelData &&
          this.levelData.map((item) => {
            // console.log(item,'ppp')

            d1.push(item.level);
            d2.push(item.sum);
            d3.push({
              value: item.percent.replace("%", ""),
              color: item.color,
            });
            d4.push(item.color);
            d5.push(100);

            this.data1 = d1;
            this.data2 = d2;
            this.data3 = d3;
            this.data4 = d4;
            this.data5 = d5;
            // this.data4.push(item.sum)
          });
        // console.log(this.data4,'data4')
        setTimeout(()=>{
        this.drawLine();
        this.drawLine2();
        this.drawLine3();
        })
        const erd1 = elementResizeDetectorMaker();
        if (erd1) {
          erd1.listenTo(this.$refs.MyChart1, (element) => {
            this.MyChart1 && this.MyChart1.resize();
            this.MyChart2 && this.MyChart2.resize();
            this.MyChart3 && this.MyChart3.resize();
          });
        }
      });
    },

    getListBacklog() {
      this.loadingTable = true;
      const params = {
        state: "待处理",
        limit: 10,
        current: 1,
        sort: this.value,
      };
      getListBacklog(params).then((res) => {
        this.loadingTable = false;
        this.tableData = res.result.list;
      });
    },

    //echars
    drawLine() {
      this.MyChart1 = this.$echarts.init(document.getElementById("MyChart1"));
      const option = {
        title: {
          text: "事件统计",
          left: "20",
          textStyle: {
            // color:'#333333',
            // fontSize:18,
            // fontWeight:'bold',
            // fontFamily:'sans-serif',
          },
        },
        tooltip: {
          extraCssText: "box-shadow:8px 8px 8px 8px rgba(0, 0, 0, 0.05)",
          trigger: "item",
          backgroundColor: "#fff",
          formatter: (params, index) => {
            let result = "";
            if (params.name === "已处理") {
              result +=
                '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#347FFF"></div>' +
                '<span style="color:#0A1933;">' +
                params.name +
                "</span>" +
                '<span style="color:#0A1933;margin-left:12px">' +
                params.value +
                "件</span></div>";
            } else if (params.name === "待处理") {
              result +=
                '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#7C8391"></div>' +
                '<span style="color:#0A1933;">' +
                params.name +
                "</span>" +
                '<span style="color:#0A1933;margin-left:12px">' +
                params.value +
                "件</span></div>";
            }
            return result;
          },
        },
        legend: {
          bottom: "bottom",
          selectedMode: false,
          icon: "circle",
          left: "center",
          data: ["已处理", "待处理"],
          formatter: function (name) {
            let data = option.series[0].data;
            var total = 0;
            var tarValue;
            for (var i = 0; i < data.length; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value;
              }
            }
            var v = tarValue;
            return `${name}  ${v}件`;
          },
          textStyle: {
            color: "#0A1933",
            fontSize: 16,
          },
        },
        color: ["#347FFF", "#F0F1F5"],
        series: [
          {
            name: "",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center",
                formatter:
                  "{total|" +
                  this.currentWeekData.all_count +
                  "}" +
                  "\n\r" +
                  "{line|}" +
                  "\n\r" +
                  "{active|事件总数}",

                textStyle: {},
                rich: {
                  line: {
                    backgroundColor: "#347FFF",
                    width: "100%",
                    align: "right",
                    height: 1,
                  },
                  total: {
                    fontSize: 24,
                    color: "#347FFF",
                  },
                  active: {
                    fontSize: 14,
                    color: "#6c7a89",
                    // lineHeight:30,
                  },
                },
              },
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },

            labelLine: {
              show: false,
            },
            data: [
              {
                value: this.currentWeekData.handled,
                name: "已处理",
                itemStyle: {
                  normal: { color: "#347FFF" },
                  emphasis: { color: "#347FFF" },
                },
              },
              {
                value: this.currentWeekData.not_handled,
                name: "待处理",
                itemStyle: {
                  normal: { color: "#F0F1F5" },
                  emphasis: { color: "#F0F1F5" },
                },
              },
            ],
          },
        ],
      };
      this.MyChart1.setOption(option);
    },

    drawLine2() {
      let that = this;
      this.MyChart2 = this.$echarts.init(document.getElementById("MyChart2"));
      this.MyChart2.setOption({
        title: {
          text: "预警等级分类",
          textStyle: {
            color: "#333333",
            fontSize: 18,
            // fontWeight:'400',
            fontFamily: "sans-serif",
          },
        },
        tooltip: {
          trigger: "axis",
          extraCssText: "box-shadow:8px 8px 8px 8px rgba(0, 0, 0, 0.05)",
          backgroundColor: "#fff",

          axisPointer: {
            // Use axis to trigger tooltip
            show: false,
            type: "none",
          },

          formatter: (params, index) => {
            let title = "";
            let result = "";
            params.forEach((element, index) => {
              result =
                '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:' +
                this.data4[element.dataIndex] +
                '"></div>' +
                '<span style="color:#0A1933;">' +
                element.axisValue +
                '<span style="color:#0A1933;margin-left:12px">' +
                this.data2[element.dataIndex] +
                "件</span></div>";
            });
            return title + result;
          },
        },
        grid: {
          // 直角坐标系内绘图网格
          left: "80", //grid 组件离容器左侧的距离,
          //left的值可以是80这样具体像素值，
          //也可以是'80%'这样相对于容器高度的百分比
          top: "80",
          right: "30%",
          bottom: "0",
          containLabel: true, //gid区域是否包含坐标轴的刻度标签。为true的时候，
          // left/right/top/bottom/width/height决定的是包括了坐标轴标签在内的
          //所有内容所形成的矩形的位置.常用于【防止标签溢出】的场景
        },
        xAxis: {
          //直角坐标系grid中的x轴,
          //一般情况下单个grid组件最多只能放上下两个x轴,
          //多于两个x轴需要通过配置offset属性防止同个位置多个x轴的重叠。
          type: "value", //坐标轴类型,分别有：
          //'value'-数值轴；'category'-类目轴;
          //'time'-时间轴;'log'-对数轴
          splitLine: { show: false }, //坐标轴在 grid 区域中的分隔线
          axisLabel: { show: false }, //坐标轴刻度标签
          axisTick: { show: false }, //坐标轴刻度
          axisLine: { show: false }, //坐标轴轴线
        },
        yAxis: {
          type: "category",
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            color: "black",
            fontSize: 20,
          },
          data: this.data1,
          // data: ['a','b','c']//类目数据，在类目轴（type: 'category'）中有效。
          //如果没有设置 type，但是设置了axis.data,则认为type 是 'category'。
        },
        series: [
          //系列列表。每个系列通过 type 决定自己的图表类型
          {
            name: "%", //系列名称
            type: "bar", //柱状、条形图
            barWidth: 19, //柱条的宽度,默认自适应
            data: this.data3, //系列中数据内容数组
            label: {
              //图形上的文本标签
              show: true,
              position: "right", //标签的位置
              // offset: [0,-40],  //标签文字的偏移，此处表示向上偏移40
              formatter: "{c}{a}", //标签内容格式器 {a}-系列名,{b}-数据名,{c}-数据值
              color: "black", //标签字体颜色
              fontSize: 20, //标签字号
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  return that.hexToRgba(params.data.color, 1.0);
                },
              },
            },
            zlevel: 1, //柱状图所有图形的 zlevel 值,
            //zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
          },
          {
            name: "进度条背景",
            type: "bar",
            barGap: "-100%", //不同系列的柱间距离，为百分比。
            // 在同一坐标系上，此属性会被多个 'bar' 系列共享。
            // 此属性应设置于此坐标系中最后一个 'bar' 系列上才会生效，
            //并且是对此坐标系中所有 'bar' 系列生效。
            barWidth: 19,
            data: this.data5,
            color: "rgba(239,240,243,1)", //柱条颜色
            itemStyle: {
              normal: {
                // barBorderRadius: 10
                color: "rgba(239,240,243,1)",
              },
              emphasis: { color: "rgba(239,240,243,1)" },
            },
          },
        ],
      });
    },
    drawLine3() {
      this.MyChart3 = this.$echarts.init(document.getElementById("MyChart3"));
      // 绘制图表
      const option3 = {
        // animation: false,
        title: {
          text: "设备状态",
          left: "20",
          textStyle: {
            // color: "#333333",
            // fontSize: 18,
            // fontWeight:'bold',
            // fontFamily:'sans-serif',
          },
        },
        tooltip: {
          extraCssText: "box-shadow:8px 8px 8px 8px rgba(0, 0, 0, 0.05)",
          trigger: "item",
          backgroundColor: "#fff",
          formatter: (params, index) => {
            let result = "";
            if (params.name === "正常") {
              result +=
                '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#17B3E7"></div>' +
                '<span style="color:#0A1933;">' +
                params.name +
                "</span>" +
                '<span style="color:#0A1933;margin-left:12px">' +
                params.value +
                "个</span></div>";
            } else if (params.name === "异常") {
              result +=
                '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#7C8391"></div>' +
                '<span style="color:#0A1933;">' +
                "异常" +
                "</span>" +
                '<span style="color:#0A1933;margin-left:12px">' +
                params.value +
                "个</span></div>";
            }
            return result;
          },
        },
        legend: {
          bottom: "bottom",
          selectedMode: false,
          icon: "circle",
          left: "center",
          data: ["正常", "异常"],
          formatter: function (name) {
            let data = option3.series[0].data;
            var total = 0;
            var tarValue;
            for (var i = 0; i < data.length; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value;
              }
            }

            var v = tarValue;
            return `${name}${v}个`;
          },
          textStyle: {
            color: "#0A1933",
            fontSize: 16,
          },
        },
        color: ["#347FFF", "#F0F1F5"],
        series: [
          {
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center",
                formatter:
                  "{total|" +
                  this.deviceStatus.total +
                  "}" +
                  "\n\r" +
                  "{line|}" +
                  "\n\r" +
                  "{active|设备总数}",
                textStyle: {},
                rich: {
                  line: {
                    backgroundColor: "#0A1933",
                    width: "100%",
                    align: "right",
                    height: 1,
                  },
                  total: {
                    fontSize: 24,
                    color: "#0A1933",
                    // lineHeight:50,
                  },
                  active: {
                    // fontFamily : "微软雅黑",
                    fontSize: 14,
                    color: "#6c7a89",
                    // lineHeight: 30,
                    // borderTop:1px saddlebrown solid
                  },
                },
              },
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: this.deviceStatus.normal,
                name: "正常",
                itemStyle: {
                  normal: { color: "#17B3E7" },
                  emphasis: { color: "#17B3E7" },
                },
              },
              {
                value: this.deviceStatus.total - this.deviceStatus.normal,
                name: "异常",
                itemStyle: {
                  normal: { color: "#EEEFF2" },
                  emphasis: { color: "#EEEFF2" },
                },
              },
            ],
          },
        ],
      };
      this.MyChart3.setOption(option3);
      this.MyChart3.on("legendselectchanged");
      let that = this;
      this.MyChart3.on("legendselectchanged", function (params) {
        var option = this.getOption();
        option.legend[0].selected[params.name] = true;
        this.setOption(option);
        that.$router.push("/deviceManage");
      });
    },

    // 16进制转为rgba
    hexToRgba(hex, opacity) {
      return (
        "rgba(" +
        parseInt("0x" + hex.slice(1, 3)) +
        "," +
        parseInt("0x" + hex.slice(3, 5)) +
        "," +
        parseInt("0x" + hex.slice(5, 7)) +
        "," +
        opacity +
        ")"
      );
    },

    // 监控室内部列表
    initData() {
      this.deviceErr = "";
      this.loadingVideo = true;
      const current = this.currentPage;
      const limit = this.pageSize;
      const params = {
        limit: limit,
        current: current,
      };
      deviceEvent(params)
        .then((response) => {
          // if (response.result && response.result.length !== 0) {
          //   this.multipleSelection = response.result.list;
          //   this.total = response.result.total;
          //   this.fetchInitialData("flag");
          // }
          if (response.result.list && response.result.list.length !== 0) {
            this.multipleSelection = response.result.list;
            this.total = response.result.total;
            this.fetchInitialData("flag");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "获取失败",
          });
        });
    },

    // 监控室列表
    initDataStart() {
      this.loadingOut = true;
      const current = this.currentPage;
      const limit = this.pageSize;
      const params = {
        limit: limit,
        current: current,
      };
      deviceEvent(params)
        .then((response) => {
          this.loadingOut = false;
          if(response.result.list===null){
            this.multipleSelectionStart = []
          }else{
           this.multipleSelectionStart =  response.result.list
          }
          this.total = response.result.total;
          if (this.multipleSelectionStart.length === 0) {
            this.noData = "暂无数据";
          } else {
            this.noData = "";
          }

          this.multipleSelectionStart &&
            this.multipleSelectionStart.map((item) => {
              item.deviceErr = "";
              item.loading = true;
            });
          // 初始化监控视频数据
          this.setVideo();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "获取失败",
          });
        });
    },

    // 首次进入查询每个设备的告警
    fetchInitialData(val) {
      const that = this;
      that.multipleSelection.map((item) => {
        const params = {
          state: "待处理",
          limit: 20,
          current: 1,
          deviceId: item.id,
        };
        const params1 = {
          deviceId: item.id,
        };
        if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('token'))['aiHorizon']) {
          deviceEventStatistical(params1).then((res) => {
            item.count = res.result.count;
            item.latest = res.result.latest;
          });
          api
            .alarmlistBacklog(params)
            .then((res) => {
              that.loading = false;
              const data = res.result && res.result.list;
              that.currentLoadData = true;
              item.total = res.result.total;
              item.current = 1;
              if (!val) {
                !item.warningData && (item.warningData = []);
                item.warningData = item.warningData.concat(data);
              } else {
                item.warningData = data;
              }
              that.$forceUpdate(); // 强制刷新
            })
            .catch((res) => {
              that.currentLoadData = true;
            });
        }
      });
    },

    // 加载更多
    loadMore(id, element) {
      element.ifLoadMore = true;
      this.$forceUpdate();
      let that = this;
      //滑到底部时进行加载
      that.loading = true;
      element.current += 1; //页数+1
      const params = {
        state: "待处理",
        limit: 20,
        current: element.current,
        deviceId: id,
      };
      if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('token'))['aiHorizon']) {
        api
          .alarmlistBacklog(params)
          .then((res) => {
            that.loading = false;
            const data = res.result && res.result.list;
            that.currentWarningData = that.currentWarningData.concat(data);
            that.currentLoadData = true;
            that.multipleSelection.map((item) => {
              !item.warningData && (item.warningData = []);
              data.map((j) => {
                if (item.id === j.device.id) {
                  item.warningData.push(j);
                }
              });
            });
            element.ifLoadMore = false;
            this.$forceUpdate(); // 强制刷新
          })
          .catch((res) => {
            that.currentLoadData = true;
          });
      }
    },

    // 获取新的监控告警信息
    fetchData() {
      const that = this;
      const params = { state: "待处理", limit: 20, current: that.count };
      if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('token'))['aiHorizon']) {
        api
          .alarmlistBacklog(params)
          .then((res) => {
            that.loading = false;
            const data = res.result && res.result.list;
            that.currentWarningData = that.currentWarningData.concat(data);
            that.currentLoadData = true;
            that.multipleSelection.map((item) => {
              !item.warningData && (item.warningData = []);
              that.currentWarningData.map((j) => {
                if (item.id === j.device.id) {
                  item.warningData.push(j);
                }
              });
            });
            this.$forceUpdate(); // 强制刷新
            // that.multipleSelection.map((item) => {
            //   //  that.$set(item, 'warningData',item.warningData )
            //    this.$forceUpdate() // 强制刷新
            // });
          })
          .catch((res) => {
            that.currentLoadData = true;
          });
      }
    },

    // 点击警告按钮
    handleWarning() {
      this.showWarningContent = !this.showWarningContent;
    },

    // 关闭警告弹框
    handleCloseModal() {
      this.showWarningContent = false;
    },

    // 查看/处理 跳转
    handlechangeScene(row) {
      this.haveChange = true;
      this.visible = true;
      this.showWarningContent = false;
      this.formData = row;
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

    // 改变展开/收起状态
    handleChangeStatus(id) {
      this.multipleSelection.map((item) => {
        if (item.id === id) {
          item.expandStatus = !item.expandStatus;
        }
      });
      this.$forceUpdate(); // 强制刷新
    },

    //出错时重建
    setVideos(videoEle, videoUrl, n) {
      // 获取设备id cameraId
      const params = {
        channel: [n.id],
      };
      getVediostream(params).then((res) => {
        let arr = [];
        if (res.result[0]) {
          for (let i in res.result[0]) {
            if (res.result[0][i]) {
              arr.push({
                val: res.result[0][i],
              });
            }
          }
        }
        if (arr.length !== 0 && arr[0]) {
          this.createPlayer(videoEle, videoUrl, n);
        } else {
          n.deviceErr = "设备连接异常";
          n.loading = false;
          this.$forceUpdate();
          this.createPlayers(videoEle, "", n);
        }
      });
    },

    // 初始化设置
    setVideo() {
      // this.showVideo = false;
      const channel = [];
      this.multipleSelectionStart.map((item) => {
        channel.push(item.id);
      });
      // 获取设备id cameraId
      const params = {
        channel: channel,
      };
      getVediostream(params).then((res) => {
        this.lists = res.result;
        this.$nextTick(() => {
          let video = document.querySelectorAll(".myvideo");
          this.lists.forEach((item, index) => {
            Object.keys(item).forEach((o) => {
              this.multipleSelectionStart &&
                this.multipleSelectionStart.map((item1) => {
                  if (item1.id === o) {
                    this.videoStorge = item1;
                  }
                });
              var videoElement = video[index],
                url = item[o];
              if (url) {
                this.createPlayer(videoElement, url, this.videoStorge);
              } else {
                this.videoStorge.loading = false;
                this.videoStorge.deviceErr = "设备连接异常";
                this.$forceUpdate();
              }
            });
          });
        });
      });
    },

    //视频流模式
    // createPlayer(videoElement, url) {
    //   var that = this;
    //   var player = new ZLMRTCClient.Endpoint({
    //     element: videoElement, // video 标签
    //     debug: false, // 是否打印日志
    //     zlmsdpUrl: url, //流地址
    //     simulcast: true,
    //     useCamera: false,
    //     audioEnable: false,
    //     videoEnable: true,
    //     recvOnly: true,
    //     resolution: { w: 1280, h: 720 }
    //   });

    //   player.on(ZLMRTCClient.Events.WEBRTC_ICE_CANDIDATE_ERROR, function(e) {
    //     // ICE 协商出错
    //     console.log("ICE 协商出错");
    //   });

    //   player.on(ZLMRTCClient.Events.WEBRTC_ON_REMOTE_STREAMS, function(e) {
    //     //获取到了远端流，可以播放
    //     videoElement.srcObject = e.streams[0];
    //     that.playerArr.push(player);
    //   });

    //   player.on(
    //     ZLMRTCClient.Events.WEBRTC_OFFER_ANSWER_EXCHANGE_FAILED,
    //     function(e) {
    //       // offer answer 交换失败
    //       console.log("offer answer 交换失败", e);
    //       stop();
    //     }
    //   );
    // }
  },

  beforeDestroy() {
    if (this.player) {
      this.player.pause();
      this.player.unload();
      this.player.detachMediaElement();
      this.player.destroy();
      this.player = "";
    }
    this.playerArr.forEach((item) => {
      item.close();
      item = null;
    });
  },
};
</script>
<style lang="scss">
.loadingChart3Container {
  position: absolute;
  width: 100px;
  height: 80px;
  // background: #2dc961;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -50px;
  text-align: center;
  .loadingChart3Style {
    padding-top: 10px;
    color: #0a1933;
    font-size: 20px;
  }
  .loadingChart3Line {
    position: absolute;
    margin-top: 10px;
    width: 50px;
    height: 1px;
    top: 50%;
    left: 50%;
    margin-left: -25px;
    margin-top: 0.5px;
    background: #0a1933;
  }
  .loadingChart3DeviceStyle {
    margin-top: 20px;
    font-size: 14px;
    color: #6c7a89;
  }
}
.monitorContainer {
  height: 700px;
 
}
.loadingChart1Container {
  position: absolute;
  width: 100px;
  height: 80px;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -50px;
  text-align: center;
  .loadingChart1Style {
    padding-top: 10px;
    color: #347fff;
    font-size: 20px;
  }
  .loadingChart1Line {
    position: absolute;
    margin-top: 10px;
    width: 50px;
    height: 1px;
    top: 50%;
    left: 50%;
    margin-left: -25px;
    margin-top: 0.5px;
    background: #347fff;
  }
  .loadingChart1DeviceStyle {
    margin-top: 20px;
    font-size: 14px;
    color: #6c7a89;
  }
}

.el-popover.my-popover1 {
  width: 480px !important;
  background: #0a1933;
  color: #fff;
  opacity: 0.8;
  .popper__arrow {
    display: none;
  }
}
</style>
<style lang="scss" scoped>
::v-deep .el-button--text{
  padding-top: 8PX;
}
.noData {
  // background: #2dc961;
  width: 200px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
  // padding-top: 300px;
  font-size: 20px;
}
.arrowIco {
  margin-right: 5px;
}

.mask {
  // width: 70px;
  padding-left: 10px;
  padding-right: 10px;
  background: rgba(0, 0, 0, 0.45);
  border-radius: 2px;
  position: absolute;
  padding-bottom: 5px;
  top: 52px;
  right: 0;
  z-index: 1;
  div {
    height: 20px;
    line-height: 20px;
    text-align: center;
    span {
      color: #fff;
      font-size: 12px;
    }
  }
}
.boxbox {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  width: 100px;
  height: 100px;
  // background: #2dc961;
}
.circle {
  display: inline-block;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  margin: 0;
  margin-right: 5px;
}
.circle1 {
  display: inline-block;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  margin: 0;
  margin-top: 13px;
}
/deep/ .el-select-dropdown {
  z-index: 120 !important;
}
::v-deep .el-loading-mask {
  z-index: 5 !important;
  background: white;
}

.deviceErrStyle {
  position: absolute;
  width: 100%;
  height: 100% !important;
  text-align: center;
  box-shadow: 0px 9px 28px 8px rgba(6, 16, 48, 0.05),
    0px 6px 16px 0px rgba(6, 16, 48, 0.08),
    0px 0px 7px -3px rgba(10, 25, 51, 0.2);
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  .deviceErr {
    margin-top: 80px;
    font-size: 20px;
    color: rgb(164, 164, 167);
  }
}
/deep/ .el-form-item__label {
  font-size: 16px !important;
  padding-top: 2px;
}
.form_Devicepg {
  height: 15%;
  margin-top: 18px;
  margin-right: 50px;
}
.dot {
  width: 12px;
  height: 12px;
  display: inline-block;
  border-radius: 50%;
  background: #f0f1f5;
}
.dot1 {
  width: 12px;
  height: 12px;
  display: inline-block;
  border-radius: 50%;
  background: #347fff;
}
.reportForm {
  width: 100%;
  height: 350px;
  float: left;
}
.tableStyle {
  width: 40%;
  height: 750px;

  float: right;
  .tableTitle {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    .left {
      // display: inline-block;
      width: 50%;
      height: 50px;
      margin-top: 8px;
      .leftTitle {
        width: 96px;
        height: 50px;
        font-size: 18px;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: #333333;
      }
      .leftMore {
        cursor: pointer;
        margin-left: 10px;
        line-height: 24px;
        display: inline-block;
        .ico {
          color: #347fff;
          font-size: 16px;
        }
        .more {
          font-size: 16px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #347fff;
        }
      }
    }
    .right {
      // display: inline-block;
      width: 35%;
      // height: 50px;
    }
    @media screen and (max-width: 1680px) {
      .left {
        width: 60%;
        margin-top: 10px;
      }
      .right {
        width: 40%;
      }
      height: 50px;
      display: flex;
      justify-content: flex-end;
      .rightTitle {
        width: 80px;
        height: 20px;
        font-size: 16px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        color: #0a1933;
        line-height: 30px;
      }
    }
  }
}
.monitorStyle {
  width: 60%;
  height: 800px;
  padding-bottom: 30px;
  position: relative;
  float: left;
  .monitorTitle {
    height: 40px;
    font-size: 18px;
    font-weight: bold;
    margin-left: 20px;
  }
}
.box {
  width: 100%;
  margin: 0 auto;
}
.inlineTableContent {
  position: absolute;
  top: 75px;
  left: 10px;
  .el-table {
    box-shadow: 0px 9px 28px 8px rgba(6, 16, 48, 0.05),
      0px 6px 16px 0px rgba(6, 16, 48, 0.08),
      0px 0px 7px -3px rgba(10, 25, 51, 0.2);
    border-radius: 8px 8px 0px 0px;
  }
  p {
    position: absolute;
    top: -19px;
    right: -19px;
    background: #ffffff;
    box-shadow: 0px 9px 28px 8px rgba(6, 16, 48, 0.05),
      0px 6px 16px 0px rgba(6, 16, 48, 0.08),
      0px 0px 7px -3px rgba(10, 25, 51, 0.2);
    border-radius: 20px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.aiMonitor {
  padding: 30px 30px 20px 10px;
  height: 100%;
  overflow-y: auto;
  background: #ffffff;
  &::-webkit-scrollbar {
    display: none;
  }
  .videoContent {
    position: relative;
    height: calc((100% - 52px));
    .singlechoice {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      .imgWarning {
        height: 16px;
      }
      .viewWarning {
        color: #ff3a3a;
        font-weight: 400;
        font-size: 16px;
        margin-left: 12px;
      }
      .viewStatus {
        font-size: 16px;
        font-weight: 400;
        color: #347fff;
        margin-left: 14px;
      }
      .iconfont {
        margin-top: 5px;
        padding-left: 16px;
      }
    }
    .warningList {
      a {
        margin-left: 25px;
      }
      width: 137px;
      z-index: 20;
      max-height: 490px;
      overflow-y: auto;
      background: #fff;
      position: absolute;
      top: 52px;
      right: 0px;
      box-shadow: 0px 9px 28px 8px rgba(6, 16, 48, 0.05),
        0px 6px 16px 0px rgba(6, 16, 48, 0.08),
        0px 0px 7px -3px rgba(10, 25, 51, 0.2);
      li {
        height: 40px;
        line-height: 40px;
        margin-bottom: 2px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px #d9dadd solid;
      }
      .level1 {
        background: #ff3a3a;
        color: #fff;
      }
      .level2 {
        color: #ffa55d;
      }
      .level3 {
        color: rgba(10, 25, 51, 0.5);
      }
      .levelInfo {
        margin-left: 10px;
        display: inline-flex;
        .level {
          width: 17px;
        }
      }
      .iconArrow {
        padding-right: 10px;
      }
    }
  }
  .videoTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    background: #fff;
    line-height: 52px;
    box-shadow: 0px 9px 28px 8px rgba(6, 16, 48, 0.05),
      0px 6px 16px 0px rgba(6, 16, 48, 0.08),
      0px 0px 7px -3px rgba(10, 25, 51, 0.2);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    .left {
      display: inline-block;
      // width: 60%;
      margin-left: 24px;
      font-size: 18px;
    }
    .right {
      display: inline-block;
      // width: 40%;
      .one {
        display: inline-block;
        // width: 30%;
        text-align: right;
        .imgIco {
          color: #ff3a3a;
        }
        .imgIco1 {
          padding-right: 30px;
        }
      }

      .totalStyle {
        display: inline-block;
        // width: 40%;
        text-align: center;
        .count {
          color: #ff3a3a;
          padding-top: 5px;
          padding-left: 10px;
          padding-right: 10px;
        }
      }
      .three {
        display: inline-block;
        // width: 30%;
        text-align: left;
        .viewStatus {
          padding-right: 20px;
          color: #347fff;
        }
      }
    }
  }
  .videos {
    height: 80%;
    width: 100%;
    align-items: flex-start;
    .video {
      width: 45%;
      height: 45%;
      float: left;
      margin-left: 20px;
      //&.four {
      // width: calc((100% - 0.3rem) / 2);
      // height: 20Vh;
      // // height: 50Vh;
      // &:nth-of-type(2n) {
      //   margin-right: 0;
      // }
      // }
      .myvideo {
        position: absolute;
        margin-top: 53px;
        top: 0;
        width: 100%;
        height: 100% !important;
        box-shadow: 0px 9px 28px 8px rgba(6, 16, 48, 0.05),
          0px 6px 16px 0px rgba(6, 16, 48, 0.08),
          0px 0px 7px -3px rgba(10, 25, 51, 0.2);
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
      }
      video {
        width: 100% !important;
        // height: calc(100vh - 95px) !important;
        border: none;
        object-fit: fill; //消除留白
      }
      video::-webkit-media-controls {
        opacity: 0 !important;
      }
    }
  }
}
</style>

