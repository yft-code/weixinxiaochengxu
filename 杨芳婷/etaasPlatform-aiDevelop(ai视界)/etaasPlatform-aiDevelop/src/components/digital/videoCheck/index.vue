<template>
  <div class="operationWarp">
    <img
      class="bgImg"
      src="@/assets/digital/assets/img/operation/operation.png"
      alt=""
    />
    <img
      class="closeImg"
      src="@/assets/digital/assets/img/region/close.png"
      alt=""
      @click="closeAll"
    />
    <el-popover placement="top-start" width="300" trigger="hover">
      <div>摄像头:{{ cameraId }}</div>
      <div slot="reference">
        <div class="title">摄像头:{{ cameraId }}</div>
      </div>
    </el-popover>
    <div class="checkViews" @click="checkEvents">查看预警清单</div>
    <div class="word-line"></div>
    <div class="line"></div>
    <div class="videoContainer">
      <!-- <div v-if="this.deviceErr">{{this.deviceErr}}</div> -->
      <div class="videoMain">
        <video
          v-show="url"
          muted
          controls
          autoplay
          class="myvideo"
          style="width: 100%; height: 60%; margin: 0 auto; margin-left: -10px"
        ></video>
      </div>
    </div>
  </div>
</template>
<script>
import { getVediostream } from "@/api/ai/deviceManage";
import { deviceEvent } from "@/api/ai/deviceManage";
import * as api from "@/api/ai/earlyWarning";
import {
  getData,
  getListBacklog,
  getRecordByDevice,
} from "@/api/ai/generalView";
import flvjs from "flv.js/src";
export default {
  name: "horizonCenter",
  data() {
    return {
      leaveRouter:false,
      cameraId: "",
      url: "",
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
      loading: false,
      videoHeight: 300,
      showVideo: false, // 录像是否返回
      loadData: false,
      multipleSelection: [],
      warningData: [],
    };
  },
  created(){
      this.cameraId=this.$store.state.videoId
      this.setVideo();
  },
  methods: {
    // 查看预警清单
    checkEvents() {
      this.$store.state.currentCameraId = this.cameraId;
      this.$store.commit("setEarlyWarnigShow", true);
      this.$store.state.earlyStyleShow = false;
      this.$bus.$emit("setEarlyWarnig");
    },
    closeAll() {
      this.$store.state.videoCheck = false;
    },
    createPlayer(videoEle, videoUrl) {
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
        // console.log(flvjs.Events.LOADING_COMPLETE,'')
        // player.play();
        const playPromise = this.player.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.player.play();
              this.$forceUpdate();
            })
            .catch(() => {});
        }
        this.player.on(flvjs.Events.LOADING_COMPLETE, (res) => {
          this.$forceUpdate();
        });
        this.player.on(flvjs.Events.ERROR, (errType, errDetail) => {
          this.deviceErr = "设备异常";
          // console.log(this.deviceErr);
          // n.loading = false
          // console.log(n,'nnnnnnnn')
          // console.log('222EventsError', errType, errDetail)
          this.$forceUpdate();
        });

        this.player.on(flvjs.Events.MEDIA_SOURCE_CLOSE, () => {
          // console.log('222MEDIA_SOURCE_CLOSE')
        });
         // 【重要事件监听】http请求建立好后，该事件会一直监听flvjs实例
        this.player.on(flvjs.Events.STATISTICS_INFO, () => {
            if (this.leaveRouter && this.player) { // 离开路由或切换设备
              this.player.pause();
              this.player.unload();
              this.player.detachMediaElement();
              this.player.destroy();
              this.player= null;
            }
        })
      }
    },
    // getListBacklog() {
    //   this.loadingTable = true;
    //   const params = {
    //     state: "待处理",
    //     limit: 10,
    //     current: 1,
    //     sort: this.value,
    //   };
    //   getListBacklog(params).then((res) => {
    //     this.loadingTable = false;
    //     this.tableData = res.result.list;
    //   });
    // },
    //echars
    // drawLine() {
    //   this.MyChart1 = this.$echarts.init(document.getElementById("MyChart1"));
    //   const option = {
    //     title: {
    //       text: "事件统计",
    //       left: "20",
    //       textStyle: {
    //         // color:'#333333',
    //         // fontSize:18,
    //         // fontWeight:'bold',
    //         // fontFamily:'sans-serif',
    //       },
    //     },
    //     tooltip: {
    //       extraCssText: "box-shadow:8px 8px 8px 8px rgba(0, 0, 0, 0.05)",
    //       trigger: "item",
    //       backgroundColor: "#fff",
    //       formatter: (params, index) => {
    //         let result = "";
    //         if (params.name === "已处理") {
    //           result +=
    //             '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#347FFF"></div>' +
    //             '<span style="color:#0A1933;">' +
    //             params.name +
    //             "</span>" +
    //             '<span style="color:#0A1933;margin-left:12px">' +
    //             params.value +
    //             "件</span></div>";
    //         } else if (params.name === "待处理") {
    //           result +=
    //             '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#7C8391"></div>' +
    //             '<span style="color:#0A1933;">' +
    //             params.name +
    //             "</span>" +
    //             '<span style="color:#0A1933;margin-left:12px">' +
    //             params.value +
    //             "件</span></div>";
    //         }
    //         return result;
    //       },
    //     },
    //     legend: {
    //       bottom: "bottom",
    //       selectedMode: false,
    //       icon: "circle",
    //       left: "center",
    //       data: ["已处理", "待处理"],
    //       formatter: function (name) {
    //         let data = option.series[0].data;
    //         var total = 0;
    //         var tarValue;
    //         for (var i = 0; i < data.length; i++) {
    //           total += data[i].value;
    //           if (data[i].name == name) {
    //             tarValue = data[i].value;
    //           }
    //         }
    //         var v = tarValue;
    //         return `${name}  ${v}件`;
    //       },
    //       textStyle: {
    //         color: "#0A1933",
    //         fontSize: 16,
    //       },
    //     },
    //     color: ["#347FFF", "#F0F1F5"],
    //     series: [
    //       {
    //         name: "",
    //         type: "pie",
    //         radius: ["40%", "70%"],
    //         avoidLabelOverlap: false,
    //         label: {
    //           normal: {
    //             position: "center",
    //             formatter:
    //               "{total|" +
    //               this.currentWeekData.all_count +
    //               "}" +
    //               "\n\r" +
    //               "{line|}" +
    //               "\n\r" +
    //               "{active|事件总数}",

    //             textStyle: {},
    //             rich: {
    //               line: {
    //                 backgroundColor: "#347FFF",
    //                 width: "100%",
    //                 align: "right",
    //                 height: 1,
    //               },
    //               total: {
    //                 fontSize: 24,
    //                 color: "#347FFF",
    //               },
    //               active: {
    //                 fontSize: 14,
    //                 color: "#6c7a89",
    //                 // lineHeight:30,
    //               },
    //             },
    //           },
    //         },
    //         emphasis: {
    //           label: {
    //             show: false,
    //             fontSize: "40",
    //             fontWeight: "bold",
    //           },
    //         },

    //         labelLine: {
    //           show: false,
    //         },
    //         data: [
    //           {
    //             value: this.currentWeekData.handled,
    //             name: "已处理",
    //             itemStyle: {
    //               normal: { color: "#347FFF" },
    //               emphasis: { color: "#347FFF" },
    //             },
    //           },
    //           {
    //             value: this.currentWeekData.not_handled,
    //             name: "待处理",
    //             itemStyle: {
    //               normal: { color: "#F0F1F5" },
    //               emphasis: { color: "#F0F1F5" },
    //             },
    //           },
    //         ],
    //       },
    //     ],
    //   };
    //   this.MyChart1.setOption(option);
    // },
    // drawLine2() {
    //   this.MyChart2 = this.$echarts.init(document.getElementById("MyChart2"));
    //   this.MyChart2.setOption({
    //     title: {
    //       text: "预警等级分类",
    //       textStyle: {
    //         color: "#333333",
    //         fontSize: 18,
    //         // fontWeight:'400',
    //         fontFamily: "sans-serif",
    //       },
    //     },
    //     tooltip: {
    //       trigger: "axis",
    //       extraCssText: "box-shadow:8px 8px 8px 8px rgba(0, 0, 0, 0.05)",
    //       backgroundColor: "#fff",

    //       axisPointer: {
    //         // Use axis to trigger tooltip
    //         show: false,
    //         type: "none",
    //       },

    //       formatter: (params, index) => {
    //         let title = "";
    //         let result = "";
    //         params.forEach((element, index) => {
    //           if (element.axisValue === "一级" && index === 0) {
    //             result +=
    //               '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#FFA55D"></div>' +
    //               '<span style="color:#0A1933;">' +
    //               element.axisValue +
    //               '<span style="color:#0A1933;margin-left:12px">' +
    //               this.data2[0] +
    //               "件</span></div>";
    //           } else if (element.axisValue === "二级" && index === 0) {
    //             result +=
    //               '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#FF3731"></div>' +
    //               '<span style="color:#0A1933;">' +
    //               element.axisValue +
    //               '<span style="color:#0A1933;margin-left:12px">' +
    //               this.data2[1] +
    //               "件</span></div>";
    //           } else if (element.axisValue === "三级" && index === 0) {
    //             result +=
    //               '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#0A1933"></div>' +
    //               '<span style="color:#0A1933;">' +
    //               element.axisValue +
    //               '<span style="color:#0A1933;margin-left:12px">' +
    //               this.data2[2] +
    //               "件</span></div>";
    //           }
    //         });
    //         return title + result;
    //       },
    //     },
    //     grid: {
    //       // 直角坐标系内绘图网格
    //       left: "80", //grid 组件离容器左侧的距离,
    //       //left的值可以是80这样具体像素值，
    //       //也可以是'80%'这样相对于容器高度的百分比
    //       top: "80",
    //       right: "30%",
    //       bottom: "0",
    //       containLabel: true, //gid区域是否包含坐标轴的刻度标签。为true的时候，
    //       // left/right/top/bottom/width/height决定的是包括了坐标轴标签在内的
    //       //所有内容所形成的矩形的位置.常用于【防止标签溢出】的场景
    //     },
    //     xAxis: {
    //       //直角坐标系grid中的x轴,
    //       //一般情况下单个grid组件最多只能放上下两个x轴,
    //       //多于两个x轴需要通过配置offset属性防止同个位置多个x轴的重叠。
    //       type: "value", //坐标轴类型,分别有：
    //       //'value'-数值轴；'category'-类目轴;
    //       //'time'-时间轴;'log'-对数轴
    //       splitLine: { show: false }, //坐标轴在 grid 区域中的分隔线
    //       axisLabel: { show: false }, //坐标轴刻度标签
    //       axisTick: { show: false }, //坐标轴刻度
    //       axisLine: { show: false }, //坐标轴轴线
    //     },
    //     yAxis: {
    //       type: "category",
    //       axisTick: { show: false },
    //       axisLine: { show: false },
    //       axisLabel: {
    //         color: "black",
    //         fontSize: 20,
    //       },
    //       data: this.data1,
    //       // data: ['a','b','c']//类目数据，在类目轴（type: 'category'）中有效。
    //       //如果没有设置 type，但是设置了axis.data,则认为type 是 'category'。
    //     },
    //     series: [
    //       //系列列表。每个系列通过 type 决定自己的图表类型
    //       {
    //         name: "%", //系列名称
    //         type: "bar", //柱状、条形图
    //         barWidth: 19, //柱条的宽度,默认自适应
    //         data: this.data3, //系列中数据内容数组
    //         label: {
    //           //图形上的文本标签
    //           show: true,
    //           position: "right", //标签的位置
    //           // offset: [0,-40],  //标签文字的偏移，此处表示向上偏移40
    //           formatter: "{c}{a}", //标签内容格式器 {a}-系列名,{b}-数据名,{c}-数据值
    //           color: "black", //标签字体颜色
    //           fontSize: 20, //标签字号
    //         },
    //         itemStyle: {
    //           normal: {
    //             color: function (params) {
    //               var colorList = ["#FF3731", "#FFA55D", "#7C8492"];
    //               return colorList[params.dataIndex];
    //             },
    //           },
    //         },
    //         zlevel: 1, //柱状图所有图形的 zlevel 值,
    //         //zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
    //       },
    //       {
    //         name: "进度条背景",
    //         type: "bar",
    //         barGap: "-100%", //不同系列的柱间距离，为百分比。
    //         // 在同一坐标系上，此属性会被多个 'bar' 系列共享。
    //         // 此属性应设置于此坐标系中最后一个 'bar' 系列上才会生效，
    //         //并且是对此坐标系中所有 'bar' 系列生效。
    //         barWidth: 19,
    //         data: [100, 100, 100],
    //         color: "#EFF0F3", //柱条颜色
    //         itemStyle: {
    //           normal: {
    //             // barBorderRadius: 10
    //           },
    //         },
    //       },
    //     ],
    //   });
    // },
    // drawLine3() {
    //   this.MyChart3 = this.$echarts.init(document.getElementById("MyChart3"));
    //   // 绘制图表
    //   let option3 = {
    //     // animation: false,
    //     title: {
    //       text: "设备状态",
    //       textStyle: {
    //         color: "#333333",
    //         fontSize: 18,
    //         // fontWeight:'bold',
    //         // fontFamily:'sans-serif',
    //       },
    //     },
    //     tooltip: {
    //       trigger: "item",
    //       extraCssText: "box-shadow:8px 8px 8px 8px rgba(0, 0, 0, 0.05)",
    //       backgroundColor: "#fff",
    //       formatter: (params, index) => {
    //         let result = "";
    //         if (params.name === "正常") {
    //           result +=
    //             '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#17B3E7"></div>' +
    //             '<span style="color:#0A1933;">' +
    //             params.name +
    //             '<span style="color:#0A1933;margin-left:12px">' +
    //             params.value +
    //             "个</span></div>";
    //         } else {
    //           result +=
    //             '<div style="line-height:28px;margin-left:8px;margin-right:8px"><div style="margin-right:6px;float:left;margin-top:10px;display:inline-block;border-radius:8px;width:8px;height:8px;background-color:#7C8391"></div>' +
    //             '<span style="color:#0A1933;">' +
    //             "异常" +
    //             '<span style="color:#0A1933;margin-left:12px">' +
    //             this.deviceStatus.total -
    //             this.deviceStatus.normal +
    //             "个</span></div>";
    //         }
    //         return result;
    //       },
    //     },
    //     legend: {
    //       bottom: "bottom",
    //       // selectedMode:false,
    //       icon: "circle",
    //       left: "center",
    //       data: ["正常", "异常"],
    //       formatter: function (name) {
    //         let data = option3.series[0].data;
    //         var total = 0;
    //         var tarValue;
    //         for (var i = 0; i < data.length; i++) {
    //           total += data[i].value;
    //           if (data[i].name == name) {
    //             tarValue = data[i].value;
    //           }
    //         }

    //         var v = tarValue;

    //         return `${name}  ${v}个`;
    //       },
    //       textStyle: {
    //         color: "#0A1933",
    //         fontSize: 16,
    //       },
    //     },
    //     color: ["#347FFF", "#F0F1F5"],
    //     series: [
    //       {
    //         type: "pie",
    //         radius: ["40%", "70%"],
    //         avoidLabelOverlap: false,
    //         label: {
    //           normal: {
    //             show: true,
    //             position: "center",
    //             // formatter:this.echarsBLable,
    //             formatter:
    //               "{total|" +
    //               this.deviceStatus.total +
    //               "}" +
    //               "\n\r" +
    //               "{line|}" +
    //               "\n\r" +
    //               "{active|设备总数}",
    //             textStyle: {
    //               // color:red
    //             },
    //             rich: {
    //               line: {
    //                 backgroundColor: "#0A1933",
    //                 width: "100%",
    //                 align: "right",
    //                 height: 1,
    //               },
    //               total: {
    //                 fontSize: 24,
    //                 color: "#0A1933",
    //                 // lineHeight:50,
    //               },
    //               active: {
    //                 // fontFamily : "微软雅黑",
    //                 fontSize: 14,
    //                 color: "#6c7a89",
    //                 lineHeight: 30,
    //                 // borderTop:1px saddlebrown solid
    //               },
    //             },
    //           },
    //         },
    //         emphasis: {
    //           label: {
    //             show: false,
    //             fontSize: "40",
    //             fontWeight: "bold",
    //           },
    //         },
    //         labelLine: {
    //           show: false,
    //         },
    //         data: [
    //           {
    //             value: this.deviceStatus.normal,
    //             name: "正常",
    //             itemStyle: {
    //               normal: { color: "#17B3E7" },
    //               emphasis: { color: "#17B3E7" },
    //             },
    //           },
    //           {
    //             value: this.deviceStatus.total - this.deviceStatus.normal,
    //             name: "异常",
    //             itemStyle: {
    //               normal: { color: "#EEEFF2" },
    //               emphasis: { color: "#EEEFF2" },
    //             },
    //           },
    //         ],
    //       },
    //     ],
    //   };
    //   this.MyChart3.setOption(option3);
    //   this.MyChart3.on("legendselectchanged");
    //   let that = this;
    //   this.MyChart3.on("legendselectchanged", function (params) {
    //     var option = this.getOption();
    //     option.legend[0].selected[params.name] = true;
    //     this.setOption(option);
    //     that.$router.push("/deviceManage");
    //   });
    // },
    // initData() {
    //   this.deviceErr = "";
    //   this.loadingVideo = true;
    //   const current = this.currentPage;
    //   const limit = this.pageSize;
    //   const params = {
    //     limit: limit,
    //     current: current,
    //   };
    //   deviceEvent(params)
    //     .then((response) => {
    //       if (response.result && response.result.length !== 0) {
    //         this.multipleSelection = response.result.list;
    //         this.total = response.result.total;
    //         this.fetchInitialData("flag");
    //         //this.fetchData(1, 100);
    //         // 初始化监控视频数据
    //         this.setVideo();
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "获取失败",
    //       });
    //     });
    // },
    // 首次进入查询每个设备的告警
    // fetchInitialData(val) {
    //   // console.log(val,'val')
    //   const that = this;
    //   // console.log(that.multipleSelection,'mul')
    //   // console.log(that.multipleSelection,'multipleSelection')
    //   that.multipleSelection.map((item) => {
    //     // console.log(item,'item')
    //     const params = {
    //       state: "待处理",
    //       limit: 20,
    //       current: 1,
    //       deviceId: item.id,
    //     };
    //     if (localStorage.getItem("token")) {
    //       api
    //         .alarmlistBacklog(params)
    //         .then((res) => {
    //           that.loading = false;
    //           const data = res.result && res.result.list;
    //           // console.log(params.deviceId,data,'data111')
    //           that.currentLoadData = true;
    //           item.total = res.result.total;
    //           item.current = 1;
    //           if (!val) {
    //             !item.warningData && (item.warningData = []);
    //             item.warningData = item.warningData.concat(data);
    //           } else {
    //             item.warningData = data;
    //           }
    //           that.$forceUpdate(); // 强制刷新
    //         })
    //         .catch((res) => {
    //           that.currentLoadData = true;
    //         });
    //     }
    //   });
    // },
    // 加载更多
    // loadMore(id, element) {
    //   element.ifLoadMore = true;
    //   this.$forceUpdate();
    //   let that = this;
    //   //滑到底部时进行加载
    //   that.loading = true;
    //   element.current += 1; //页数+1
    //   const params = {
    //     state: "待处理",
    //     limit: 20,
    //     current: element.current,
    //     deviceId: id,
    //   };
    //   if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('token'))['aiHorizon']) {
    //     api
    //       .alarmlistBacklog(params)
    //       .then((res) => {
    //         that.loading = false;
    //         const data = res.result && res.result.list;
    //         that.currentWarningData = that.currentWarningData.concat(data);
    //         that.currentLoadData = true;
    //         that.multipleSelection.map((item) => {
    //           !item.warningData && (item.warningData = []);
    //           data.map((j) => {
    //             if (item.id === j.device.id) {
    //               item.warningData.push(j);
    //             }
    //           });
    //         });
    //         element.ifLoadMore = false;
    //         this.$forceUpdate(); // 强制刷新
    //       })
    //       .catch((res) => {
    //         that.currentLoadData = true;
    //       });
    //   }
    // },
    // 获取新的监控告警信息
    // fetchData() {
    //   const that = this;
    //   const params = { state: "待处理", limit: 20, current: that.count };
    //   if (localStorage.getItem("token")) {
    //     api
    //       .alarmlistBacklog(params)
    //       .then((res) => {
    //         that.loading = false;
    //         const data = res.result && res.result.list;
    //         that.currentWarningData = that.currentWarningData.concat(data);
    //         that.currentLoadData = true;
    //         that.multipleSelection.map((item) => {
    //           !item.warningData && (item.warningData = []);
    //           that.currentWarningData.map((j) => {
    //             if (item.id === j.device.id) {
    //               item.warningData.push(j);
    //             }
    //           });
    //         });
    //         this.$forceUpdate(); // 强制刷新
    //         // that.multipleSelection.map((item) => {
    //         //   //  that.$set(item, 'warningData',item.warningData )
    //         //    this.$forceUpdate() // 强制刷新
    //         // });
    //       })
    //       .catch((res) => {
    //         that.currentLoadData = true;
    //       });
    //   }
    // },
    // 点击警告按钮
    // handleWarning() {
    //   this.showWarningContent = !this.showWarningContent;
    // },
    // 关闭警告弹框
    // handleCloseModal() {
    //   this.showWarningContent = false;
    // },
    // 查看/处理 跳转
    // handlechangeScene(row) {
    //   this.haveChange = true;
    //   this.visible = true;

    //   this.showWarningContent = false;
    //   this.formData = row;

    //   let arr = [];
    //   this.formData.scene &&
    //     this.formData.scene.map((item) => {
    //       arr.push(item.name);
    //     });
    //   this.name = arr.join(",");
    // },
    // 关闭查看/处理详情页面
    // handleClose() {
    //   this.visible = false;
    // },
    // 改变展开/收起状态
    // handleChangeStatus(id) {
    //   this.multipleSelection.map((item) => {
    //     if (item.id === id) {
    //       item.expandStatus = !item.expandStatus;
    //     }
    //   });
    //   this.$forceUpdate(); // 强制刷新
    // },
    // 初始化设置
    setVideo() {
      this.showVideo = false;
      const channel = [];
      const deviceId = this.cameraId;
      channel.push(deviceId);
      // 获取设备id cameraId
      const params = {
        channel: channel,
      };
      getVediostream(params).then((res) => {
        this.showVideo = true;
        this.lists = res.result;
        // this.videoClass =
        //   this.lists.length == -1
        //     ? "four"
        //     : this.lists.length >= 1
        //     ? "four"
        //     : "";
        this.$nextTick(() => {
          let video = document.querySelectorAll(".myvideo");
          this.videoIndex = this.lists.length;
          this.videoErrIndex = 0;
          this.lists.forEach((item, index) => {
            Object.keys(item).forEach((o) => {
              var videoElement = video[index],
                url = item[o];
              url && this.createPlayer(videoElement, url);
              this.url = url;
              console.log('url',url);
            });
          });
          //  console.log(331,video)
        });
      });
    },
  },
  beforeDestroy() {
     this.leaveRouter = true; 
  },
};
</script>
<style lang="scss" scoped>
.operationWarp {
  width: 400px;
  height: 300px;
  position: relative;
  .bgImg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .videoContainer {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 75px;
    // background-color: red;
    .videoMain {
      width: 80%;
      height: 100%;
      // background-color: aqua;
      margin: 0 auto;
    }
  }
  .closeImg {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 33px;
    top: 33px;
  }
  .checkViews {
    position: absolute;
    right: 60px;
    top: 32px;
    font-size: 10px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #25bcff;
    line-height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -icab-text-overflow: ellipsis;
    -khtml-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
  }
  .title {
    width: 55%;
    position: absolute;
    left: 27px;
    top: 32px;
    font-size: 10px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #e8eeff;
    line-height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -icab-text-overflow: ellipsis;
    -khtml-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
  }
  .line {
    width: 80%;
    height: 1px;
    border: 1px dotted #979797;
    position: absolute;
    left: 29px;
    top: 69px;
  }
  .button {
    position: absolute;
    left: 47px;
    top: 98px;
    width: 128px;
    height: 32px;
    background: rgba(37, 188, 255, 0.2);
    border: 1px solid #25bcff;
    line-height: 32px;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #25bcff;
    text-align: center;
  }
  .delete {
    position: absolute;
    left: 163px;
    top: 32px;
    width: 64px;
    height: 22px;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #25bcff;
    line-height: 22px;
    text-align: center;
    border-bottom: 1px #25bcff solid;
  }
}
</style>

  