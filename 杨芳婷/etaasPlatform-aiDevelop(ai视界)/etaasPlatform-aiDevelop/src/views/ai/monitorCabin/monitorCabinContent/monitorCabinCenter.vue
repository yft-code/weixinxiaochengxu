<template>
  <div>
    <!-- 头 -->
    <div class="deviceCenterHeader">
      <!-- 累计监测 今日事件 -->
      <div class="deviceCenterHeaderLeft">
        <img class="img" src="@/assets/img/ai/monitorCabin/ico2.png" alt="" />
        <span>累计监测</span>
        <span class="warningAllStyle">{{ warningAll }}起</span>
        <img class="img" src="@/assets/img/ai/monitorCabin/ico1.png" alt="" />
        <span>今日事件</span>
        <span style="color: #ff3a3a; padding-left: 10px"
          >{{ warningDay }}起</span
        >
      </div>
      <!-- 事件弹框 -->
      <div class="deviceCenterHeaderRight">
        <span class="warningButton">事件弹框</span>
        <img
          class="switchStyle"
          v-show="switchShow"
          @click="swithClick"
          src="@/assets/img/ai/monitorCabin/switch.png"
          alt=""
        />
        <img
          @click="swithClick"
          v-show="!switchShow"
          class="switchStyle"
          src="@/assets/img/ai/monitorCabin/close.svg"
          alt=""
        />
      </div>
    </div>
    <!-- 监控室 -->
    <div v-loading="loading" class="myDeviceWrap">
      <!-- 有数据 -->
      <div v-if="tableData.length > 0">
        <!-- 监控室 -->
        <div v-if="magnifyFlag" class="scrollview" ref="scrollview">
          <div class="box">
            <div style="height: 100%" @mousewheel="rollScroll($event)">
              <el-carousel
                direction="vertical"
                :autoplay="false"
                trigger="click"
                ref="carousel"
                v-if="sceenCount!==null"
                @mousewheel="rollScroll($event)"
              >
                <el-carousel-item
                  class="item"
                  v-for="index in sceenCount"
                  :key="index"
                >
                  <div class="deviceWrap" v-if="index === indexPage">
                    <div
                      v-for="(item, index) in tableData"
                      :key="index"
                      class="deviceList"
                    >
                      <img
                        class="img1"
                        src="@/assets/img/ai/monitorCabin/bg1.png"
                        alt=""
                      />
                      <div
                        v-for="(item1, index1) in tableDataStart"
                        :key="index1 + '1'"
                      >
                        <div class="deviceListHeader" v-if="index === index1">
                          <div class="left">
                            <img
                              class="img"
                              src="@/assets/img/ai/monitorCabin/ico.png"
                              alt=""
                            />
                            <span>{{ item.deviceName }}</span>
                          </div>
                          <div class="right">
                            <span>今日告警数</span>
                            <span style="color: #ff3a3a; padding-left: 10px"
                              >{{ item1.latest }}起</span
                            >
                          </div>
                        </div>
                      </div>

                      <div
                        v-for="(item2, index2) in tableData"
                        :key="index2 + '2'"
                      >
                        <div
                          v-if="index === index2"
                          class="deviceListContent"
                          @click="deviceMagnify(item2)"
                          v-loading="item2.loading"
                        >
                          <video
                            class="myvideo"
                            :id="item2.id"
                            muted
                            controls
                            autoplay
                          ></video>
                          <div class="deviceErr">
                <div>{{ item2.deviceErr }}</div>
              </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
        <!-- 监控室大屏幕 -->
        <div v-else class="bgDevice">
          <img class="img" src="@/assets/img/ai/monitorCabin/bg1.png" alt="" />
          <div class="bgVideo">
            <div class="bgVideoTitle">
              <div class="left">
                <i class="el-icon-arrow-left ico" @click="back"></i>
                <img
                  class="bgImg"
                  src="@/assets/img/ai/monitorCabin/ico.png"
                  alt=""
                />
                <span class="bgTitle">{{ onetableData[0].deviceName }}</span>
              </div>
              <div class="right">
                <span class="dayTitle">今日告警数</span>
                <span class="daycount">{{ onetableData[0].latest }}起</span>
              </div>
            </div>
            <div v-for="(item3, index3) in onetableData" :key="index3 + '3'">
              <div v-loading="item3.loading">
                <video class="myvideo1" muted controls autoplay></video>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 无数据 -->
      <div v-else class="myDeviceWrap">
        <span class="noDataStyle">{{ noData }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { deviceEvent, getVediostream } from "@/api/ai/deviceManage";
import { deviceEventStatistical } from "@/api/ai/generalView";
import { sumAndDay, getCurrent } from "@/api/ai/monitorCabin";
import flvjs from "flv.js/src";
export default {
  data() {
    return {
      timeMark:null,
      isClick:true,
      timeOut: null,
      leaveRouter: false,
      switchShow: true,
      onetableData: [],
      lists1: [],
      videoStorge1: {},
      noData: "",
      warningAll: 0,
      warningDay: 0,
      loading: true,
      magnifyFlag: true,
      lists: [],
      playerArr: [],
      videoStorge: {},
      player: null,
      sceenCount: 0,
      indexPage: 1,
      videoClass: "four",
      frontIndex: 0,
      tableData: [],
      tableDataStart: [],
      tableDataStartAll: [],
      flvPlayerList: []
    };
  },
  created() {
   if(this.$store.state.isLogin){
     // 监控室列表
    this.initData();
    // 事件列表
    this.initDataStart();
    // 累计监测和今日事件
    this.getSumAndDay();
   }
  },
  mounted() {
    // 左侧点击大屏
    this.$bus.$on("toBig", (item) => {
      if (this.player) {
        this.player.pause();
        this.player.unload();
        this.player.detachMediaElement();
        this.player.destroy();
        this.player = null;
      }
      this.deviceMagnify1(item);
    });
  },
  beforeDestroy() {
    this.leaveRouter = true;
  },
  methods: {
    rollScroll(event) {
      let _that = this;
      // chrome、ie使用的wheelDelta,火狐使用detail
      let scrollVal = event.wheelDelta || event.detail;
      if (this.isClick) {
          window.clearTimeout(this.timeMark) 
        this.timeMark = setTimeout(()=>{
        this.isClick=true
        },500)
          this.isClick = false;
          if (scrollVal > 0) {
            if (this.indexPage > 1) {
              if (this.player) {
                this.player.pause();
                this.player.unload();
                this.player.detachMediaElement();
                this.player.destroy();
                this.player = null;
              }
              this.indexPage--;
              this.frontIndex -= 1;
              this.tableData = this.tableDataAll.slice(
                this.frontIndex * 2,
                this.frontIndex * 2 + 4
              )
              this.tableDataStart = this.tableDataStartAll.slice(
                this.frontIndex * 2,
                this.frontIndex * 2 + 4
              );
              this.tableData &&
                this.tableData.map((item) => {
                  item.deviceErr = "";
                  item.loading = true;
                });
              this.$forceUpdate();
              _that.$refs.carousel.prev();
              this.setVideo();
              this.fetchInitialData();
            } else {
            }
          } else {
            if (this.indexPage <= Math.ceil((this.tableDataAll.length-2)/2)) {
              if (this.player) {
                this.player.pause();
                this.player.unload();
                this.player.detachMediaElement();
                this.player.destroy();
                this.player = null;
              }
              this.indexPage++;
              this.frontIndex += 1;
              this.tableData = this.tableDataAll.slice(
                this.frontIndex * 2,
                this.frontIndex * 2 + 4
              );
              this.tableDataStart = this.tableDataStartAll.slice(
                this.frontIndex * 2,
                this.frontIndex * 2 + 4
              );
              this.tableData &&
                this.tableData.map((item) => {
                  item.deviceErr = "";
                  item.loading = true;
                });
              this.$forceUpdate();
              _that.$refs.carousel.next();
              this.setVideo();
              this.fetchInitialData();
            } else {
            }
          }
        }else{
        //  console.log('加载太过频繁,请稍后再试');
        }
    },
    // 返回
    back() {
      this.frontIndex = 0;
      this.indexPage = 1;
      if (this.player) {
        this.player.pause();
        this.player.unload();
        this.player.detachMediaElement();
        this.player.destroy();
        this.player = null;
      }
      this.initDataStart();
      this.initData();
      this.getSumAndDay();
      this.magnifyFlag = true;
    },
    // 单个监控室事件
    fetchInitialDataOne() {
      const that = this;
      that.onetableData.map((item) => {
        const params1 = {
          deviceId: item.id,
        };
        getCurrent(params1).then((res) => {
          if (res.result === null) {
            item.latest = 0;
          } else {
            item.latest = res.result;
          }
        });
      });
    },
    // 监控室点击大屏
    deviceMagnify(item) {
      if (this.player) {
        this.player.pause();
        this.player.unload();
        this.player.detachMediaElement();
        this.player.destroy();
        this.player = null;
      }
      this.magnifyFlag = false;
      this.onetableData = [];
      this.onetableData.push(item);
      this.onetableData &&
        this.onetableData.map((item) => {
          item.deviceErr = "";
          item.loading = true;
        });
      this.fetchInitialDataOne();
      this.setVideoOne();
    },
    // 侧边点击监控室屏
    deviceMagnify1(item) {
      this.magnifyFlag = false;
      this.onetableData = [];
      this.onetableData.push(item);
      this.onetableData &&
        this.onetableData.map((item) => {
          item.deviceErr = "";
          item.loading = true;
          item.deviceName = item.name;
        });
      this.fetchInitialDataOne();
      this.setVideoOne();
    },
    setVideoOne() {
      const channel = [];

      this.onetableData.map((item) => {
        channel.push(item.id);
      });
      // 获取设备id cameraId
      const params = {
        channel: channel,
      };
      getVediostream(params).then((res) => {
        this.lists1 = res.result;
        this.videoClass =
          this.lists.length == 1
            ? "full"
            : this.lists.length >= 2
            ? "four"
            : "";
        this.$nextTick(() => {
          let video = document.querySelectorAll(".myvideo1");
          this.lists1.forEach((item, index) => {
            Object.keys(item).forEach((o) => {
              this.onetableData &&
                this.onetableData.map((item1) => {
                  if (item1.id === o) {
                    this.videoStorge1 = item1;
                  }
                });
              var videoElement = video[index],
                url = item[o];

              if (url) {
                this.createPlayer(videoElement, url, this.videoStorge1);
              } else {
                console.log('12321312');
                this.videoStorge1.loading = false;
                this.videoStorge1.deviceErr = "设备连接异常";
                this.$forceUpdate();
              }
            });
          });
        });
      });
    },
    // 事件弹框
    swithClick() {
      this.switchShow = !this.switchShow;
      this.$bus.$emit("dialogEmit", this.switchShow);
    },
    // 累计监测和今日事件数量
    getSumAndDay() {
      sumAndDay().then((res) => {
        this.warningAll = res.result.sum;
        this.warningDay = res.result.day;
      });
    },
    // 首次进入查询每个设备的告警
    fetchInitialData() {
      const that = this;
      that.tableDataStart.map((item) => {
        const params1 = {
          deviceId: item.id,
        };
        if (localStorage.getItem("token")) {
          getCurrent(params1).then((res) => {
            if (res.result === null) {
              item.latest = 0;
            } else {
              item.latest = res.result;
            }
          });
        }
      });
    },
    // 监控室列表
    initData() {
      this.loading = true;
      const params = {
        limit: 999,
        current: 1,
      };
      deviceEvent(params)
        .then((response) => {
          this.loading = false;

          if (response.result.total === 0) {
            this.sceenCount = 1;
          } else if (response.result.total <= 2) {
            this.sceenCount = 1;
          } else {
            this.sceenCount = Math.floor((response.result.total - 1) / 2);
          }

          if (response.result.list === null) {
            this.tableDataAll = [];
          } else {
            this.tableDataAll = response.result.list;
          }

          this.tableData = this.tableDataAll.slice(
            this.frontIndex * 2,
            this.frontIndex * 2 + 4
          );
          // this.tableData = this.tableDataAll;
          if (this.tableData.length === 0) {
            this.noData = "暂无数据";
          } else {
            this.noData = "";
            this.tableData &&
              this.tableData.map((item) => {
                item.deviceErr = "";
                item.loading = true;
              });
            // 初始化监控视频数据
            this.setVideo();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "获取失败",
          });
        });
    },
    // 每个监控室列表
    initDataStart() {
      const params = {
        limit: 9999,
        current: 1,
      };
      deviceEvent(params)
        .then((response) => {
          this.tableDataStartAll = response.result.list;
          this.tableDataStart = this.tableDataStartAll.slice(
            this.frontIndex * 2,
            this.frontIndex * 2 + 4
          );
          this.fetchInitialData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "3333333",
          });
        });
    },
    // 初始化设置
    setVideo() {
      // this.showVideo = false
      const channel = [];

      this.tableData.map((item) => {
        channel.push(item.id);
      });
      // 获取设备id cameraId
      const params = {
        channel: channel,
      };
      getVediostream(params).then((res) => {
        this.lists = res.result;
        this.videoClass =
          this.lists.length == 1
            ? "full"
            : this.lists.length >= 2
            ? "four"
            : "";
        this.$nextTick(() => {
          let video = document.querySelectorAll(".myvideo");
          this.lists.forEach((item, index) => {
            Object.keys(item).forEach((o) => {
              this.tableData &&
                this.tableData.map((item1) => {
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
    //flv
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
            fixAudioTimestampGap: false,
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
        if (playPromise) {
          playPromise
            .then(() => {
              this.player.play();
              n.loading = false;
              // console.log(n, "播放成功");
              this.$forceUpdate();
            })
            .catch(() => {});
        }
        this.player.on(flvjs.Events.LOADING_COMPLETE, (res) => {
          if (this.player) {
            n.loading = true;
            this.$forceUpdate();
            this.setVideos(videoEle, videoUrl, n);
          }
        });
        this.player.on(
          flvjs.Events.ERROR,
          (errorType, errorDetail, errorInfo) => {
            if (this.player) {
              n.loading = false;
              n.deviceErr = "设备异常";
              this.$forceUpdate();
              this.setVideos(videoEle, videoUrl, n);
            }
          }
        );
        this.player.on(flvjs.Events.MEDIA_SOURCE_CLOSE, () => {
          if (this.player) {
            this.setVideos(videoEle, videoUrl, n);
          }
        });
        // 【重要事件监听】http请求建立好后，该事件会一直监听flvjs实例
        this.player.on(flvjs.Events.STATISTICS_INFO, () => {
          if (this.leaveRouter && this.player) {
            // 离开路由或切换设备
            this.player.pause();
            this.player.unload();
            this.player.detachMediaElement();
            this.player.destroy();
            this.player = null;
          }
        });
      }
    },
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
          n.deviceErr = "";
        } else {
          n.deviceErr = "设备连接异常";
          n.loading = false;
          this.$forceUpdate();
          this.createPlayers(videoEle, "", n);
        }
      });
    },
    //处理异常
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
            fixAudioTimestampGap: false,
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
        if (playPromise) {
          playPromise
            .then(() => {
              this.player.play();
              n.loading = false;
              // console.log(n, "播放成功");
              this.$forceUpdate();
            })
            .catch(() => {});
        }

        // 【重要事件监听】http请求建立好后，该事件会一直监听flvjs实例
        this.player.on(flvjs.Events.STATISTICS_INFO, () => {
          if (this.leaveRouter && this.player) {
            // 离开路由或切换设备
            this.player.pause();
            this.player.unload();
            this.player.detachMediaElement();
            this.player.destroy();
            this.player = null;
          }
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .deviceErr {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    // background: #3ad1ff;
    div {
      // width: 100px;
      // height: 100px;
      // background: #347fff;
      // margin-left: -50px;
      // margin-top: -50px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%); //水平垂直都居中
    }
  }
/deep/.el-carousel__indicators--vertical {
  display: none;
}
/deep/ .el-carousel__container {
  height: 76.4vh;
}
.box {
  height: 76.4vh;
  // background-color: #ccc;
}
.el-carousel-item {
  width: 100%;
  height: 76.4vh;
  background-color: skyblue;
}

.myDeviceWrap {
  width: 100%;
  height: 76.4vh;
}
/deep/ .el-loading-mask {
  background: #062440;
}
.bgDevice {
  width: 100%;
  height: 76.4vh;
  position: relative;
  .img {
    width: 100%;
    height: 76.4vh;
    position: absolute;
    left: 0;
    top: 0;
  }
  .bgVideo {
    .bgVideoTitle {
      width: 100%;
      // background: red;
      padding: 10px 0 10px 0;
      display: flex;
      justify-content: space-between;
      .left {
        // background: #25bcff;
        .ico {
          width: 12px;
          height: 16px;
          color: #e8eeff;
        }
        .bgImg {
          margin-left: 5px;
          width: 20px;
          height: 20px;
        }
        .bgTitle {
          color: #e8eeff;
          padding-left: 10px;
        }
      }
      .right {
        // background: darkgoldenrod;
        .dayTitle {
          color: #e8eeff;
        }
        .daycount {
          color: #ff3a3a;
          padding-left: 10px;
        }
      }
    }
  }
  .myvideo1 {
    max-height: 70vh;
    margin: 0 auto;
  }
  video::-webkit-media-controls-fullscreen-button {
    display: none;
  }
  //播放按钮
  video::-webkit-media-controls-play-button {
    display: none;
  }
  //进度条
  video::-webkit-media-controls-timeline {
    display: none;
  }
  //观看的当前时间
  video::-webkit-media-controls-current-time-display {
    display: none;
  }
  //剩余时间
  video::-webkit-media-controls-time-remaining-display {
    display: none;
  }
  //音量按钮
  video::-webkit-media-controls-mute-button {
    display: none;
  }
  video::-webkit-media-controls-toggle-closed-captions-button {
    display: none;
  }
  //音量的控制条
  video::-webkit-media-controls-volume-slider {
    display: none;
  }
  //所有控件
  video::-webkit-media-controls-enclosure {
    display: none;
  }
  video::-webkit-media-controls {
    opacity: 0 !important;
  }
  .bgVideo {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 76.4vh;
    padding: 0 30px;

    .myvideo1 {
      width: 100%;
    }
  }
}
.warningButton {
  padding-right: 20px;
}
.switchStyle {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.deviceCenterHeader {
  width: 100%;
  height: 4vh;
  display: inline-flex;
  justify-content: justify-content;
  color: #e8eeff;
  .deviceCenterHeaderLeft {
    width: 50%;
    height: 4vh;
    line-height: 4vh;
    .warningAllStyle {
      color: #ff3a3a;
      padding: 0 10px;
      margin-right: 20px;
    }
    .img {
      width: 24px;
      height: 24px;
      margin-top: -2px;
      margin-right: 10px;
    }
  }
  .deviceCenterHeaderRight {
    text-align: right;
    width: 50%;
    height: 4vh;
    line-height: 4vh;
  }
}
.scrollview {
  width: 100%;
  height: 76.4vh;
  overflow-y: auto;
  .deviceWrap {
    width: 100%;
    height: 76.4vh;
    display: inline-flex;
    justify-content: space-between;
    // align-items: center;
    flex-wrap: wrap;
    .deviceList {
      width: 630px;
      height: 39.12vh;
      padding: 0 16px 0 16px;
      position: relative;
      .img1 {
        left: 0;
        top: 0;
        width: 630px;
        height: 37.12vh;
        position: absolute;
      }
      // background: rgba(101, 137, 195, 0.18);
      // border: 2px solid #25bcff;
      .deviceListHeader {
        height: 4.44vh;
        width: 598px;
        display: inline-flex;
        justify-content: space-between;
        color: #e8eeff;
        .left {
          height: 4.44vh;
          line-height: 4.44vh;
          .img {
            width: 24px;
            height: 24px;
          }
        }
        .right {
          height: 4.44vh;
          line-height: 4.44vh;
        }
      }
      .deviceListContent {
        width: 598px;
        height: 31.2vh;
        // background: darkgoldenrod;
        //全屏按钮
        video::-webkit-media-controls-fullscreen-button {
          display: none;
        }
        //播放按钮
        video::-webkit-media-controls-play-button {
          display: none;
        }
        //进度条
        video::-webkit-media-controls-timeline {
          display: none;
        }
        //观看的当前时间
        video::-webkit-media-controls-current-time-display {
          display: none;
        }
        //剩余时间
        video::-webkit-media-controls-time-remaining-display {
          display: none;
        }
        //音量按钮
        video::-webkit-media-controls-mute-button {
          display: none;
        }
        video::-webkit-media-controls-toggle-closed-captions-button {
          display: none;
        }
        //音量的控制条
        video::-webkit-media-controls-volume-slider {
          display: none;
        }
        //所有控件
        video::-webkit-media-controls-enclosure {
          display: none;
        }
        video::-webkit-media-controls {
          opacity: 0 !important;
        }
        .myvideo {
          width: 598px;
          height: 31.2vh;
        }
      }
    }
  }
}
.noDataStyle {
  color: #e8eeff;
  font-size: 20px;
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 70vh;
}
</style>
