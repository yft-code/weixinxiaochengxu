<template>
  <div class="aiMonitor" v-loading="!currentLoadData && !showVideo">
    <div class="height-all">
      <ul class="videos flex flex-wrap box-sizing-base">
        <li
          v-for="(item, index) in multipleSelection1"
          :key="index"
          :class="['video box-sizing-base', videoClass,{'video1':index===multipleSelection1.length-1||index===multipleSelection1.length-2}]"
        >
          <div
            v-show="item" 
            class="videoContent"
            element-loading-background="rgb(22 21 21)"
          >
            <div class="videoTitle">
              <div class="left">{{ item.deviceName }}</div>
              <div class="right">
                <span class="one">
                  <i v-if="item.total" class="iconfont icon-alert imgIco"></i>
                  <i v-else class="iconfont icon-alert imgIco1"></i>
                </span>
                <span class="totalStyle">
                  <span v-show="item.total" class="count"
                    >{{ item.total ? item.total : 0 }}件</span
                  >
                </span>
                <span class="three">
                  <span
                    class="viewStatus"
                    v-show="item.total"
                    @click="handleChangeStatus(item.id)"
                  >
                    {{ item.expandStatus ? "收起" : "展开" }}
                  </span>
                </span>
                <div class="mask">
                  <div>
                    <span> 今日: {{ item.latest ? item.latest : 0 }}</span>
                  </div>
                  <div>
                    <span> 累计: {{ item.count ? item.count : 0 }}</span>
                  </div>
                </div>
              </div>
              <!-- <div
                class="singlechoice"
                v-show="item.warningData && item.warningData.length > 0"
                slot="reference"
                @click="handleWarning"
              >
                 <i v-if="item.total!==0" class="iconfont icon-alert imgIco"></i>
                 <i  v-if="item.total===0" class="iconfont icon-alert imgIco1"></i>
                <p class="viewWarning">{{item.total}}件</p>
                  <div class="mask">
                        <span>今日:  {{item.latest}}</span>
                        <span>累计:  {{item.count}}</span>
                      </div>
                <p class="viewStatus" @click="handleChangeStatus(item.id)">
                  {{ item.expandStatus ? "收起" : "展开" }}
                </p>
              </div> -->
            </div>
            <div class="videoErrContainer" v-loading="item.loading">
              <video
                class="myvideo"
                muted
                controls
                autoplay
                v-show="item"
              ></video>
              <div class="deviceErr">
                <div>{{ item.deviceErr }}</div>
              </div>
            </div>
            <div class="box">
              <ul
                class="warningList"
                v-show="item.expandStatus"
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
                    <!-- <span
                      class="circle1"
                      :style="{ background: j.warning.levelColor }"
                    ></span> -->
                    <div class="level">{{ j.warning.levelNickname }}</div>
                    <span class="name">{{ j.algName }}</span>
                  </div>
                  <i class="icon-right_fill iconfont arrowIco"></i>
                  <!-- <span class="iconArrow"><i>></i></span> -->
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
            <check-dialog
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
            ></check-dialog>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import checkDialog from "@components/checkDialog/index";
import { getVediostream } from "@/api/ai/deviceManage";
import * as api from "@/api/ai/earlyWarning";
import { deviceEventStatistical } from "@/api/ai/generalView";
import flvjs from "flv.js/src";
export default {
  name: "monitoringRoom",
  components: { checkDialog },
  props: {
    warningData: {
      type: Array,
      default: () => [],
    },
    multipleSelection: {
      type: Array,
      default: () => [],
    },
    loadData: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      leaveRouter:false,
      multipleSelection1: this.multipleSelection,
      videoStorge: {},
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
      number:0,
    };
  },
  watch: {
    multipleSelection(val) {
      this.multipleSelection = val;
      this.multipleSelection1 = val;
    },
    warningData(val) {
      this.currentWarningData = val;
      this.fetchInitialData("flag");
    },
    loadData(val) {
      this.currentLoadData = val;
    },
  },
  created() {
    this.multipleSelection1 &&
      this.multipleSelection1.map((item) => {
        item.deviceErr = "";
        item.loading = true;
      });
    this.currentLoadData = this.loadData;
    this.currentWarningData = this.warningData;
    this.fetchInitialData();
    this.multipleSelection1.map((item) => {
      item.expandStatus = true;
    });
    this.$forceUpdate(); // 强制刷新
  },
  mounted() {
    let that = this;
    that.$bus.$on("c22", () => {
        that.fetchInitialData("flag");
    });
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        that.screenHeight = window.screenHeight;
      })();
    };
    this.setVideo();   
  },
  methods: {
    // 首次进入查询每个设备的告警
    fetchInitialData(val) {
      const that = this;
      that.multipleSelection1.map((item) => {
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
      if (localStorage.getItem('token') && localStorage.getItem("token").aiHorizon) {
        api
          .alarmlistBacklog(params)
          .then((res) => {
            that.loading = false;
            const data = res.result && res.result.list;
            that.currentWarningData = that.currentWarningData.concat(data);
            that.currentLoadData = true;
            that.multipleSelection1.map((item) => {
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
      if (localStorage.getItem('token') && localStorage.getItem("token").aiHorizon) {
        api
          .alarmlistBacklog(params)
          .then((res) => {
            that.loading = false;
            const data = res.result && res.result.list;
            that.currentWarningData = that.currentWarningData.concat(data);
            that.currentLoadData = true;
            that.multipleSelection1.map((item) => {
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
      this.multipleSelection1.map((item) => {
        if (item.id === id) {
          item.expandStatus = !item.expandStatus;
        }
      });
      this.$forceUpdate(); // 强制刷新
    },
    setVideos(videoEle, videoUrl, n) {      
      // 获取设备id cameraId
      const params = {
        channel: [n.id],
      };
      getVediostream(params).then((res) => {
        let arr = []
        if(res.result[0]){
          for(let i in res.result[0]){
            if(res.result[0][i]){
              arr.push({
                val: res.result[0][i]
              })
              
            }
          }
        }
         if(arr.length !==0 && arr[0]){
           this.createPlayer(videoEle, videoUrl, n);
           n.deviceErr = "";
         }else{
            n.deviceErr = "设备连接异常";
            n.loading = false;
            this.$forceUpdate();
            this.createPlayers(videoEle, '', n);
         }
     
      })
    },
    // 初始化设置
    setVideo(videoEle, videoUrl, n) {
      this.number++;
      const channel = [];
      this.multipleSelection1.map((item) => {
        channel.push(item.id);
      });
      // 获取设备id cameraId
      const params = {
        channel: channel,
      };
      getVediostream(params).then((res) => {
        this.showVideo = true;
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
              this.multipleSelection1 &&
                this.multipleSelection1.map((item1) => {
                  if (item1.id === o) {
                    this.videoStorge = item1;
                  }
                });
              var videoElement = video[index],
                url = item[o];
              if(url){
                this.createPlayer(videoElement, url, this.videoStorge);
              }else{
                //拉流失败，再拉一次
                 if(this.number === 1){
                    this.setVideo();
                 }else{
                  if(url){
                    this.videoStorge.loading = false;
                  this.videoStorge.deviceErr = "设备连接异常";
                  this.$forceUpdate();
                  }else{
                    this.videoStorge.loading = false;
                        this.videoStorge.deviceErr = "暂无视频流,请稍后再试"
                        this.$forceUpdate();
                  }
                   
                 }
                            
              }
             
            });
          });
        });
      });
    },
    //处理异常
    createPlayers(videoEle, videoUrl, n){
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
              if(this.player){
                this.player.play();
                n.loading = false;
                // console.log(n, "播放成功");
                this.$forceUpdate();
              }
              
            })
            .catch(() => {});
        }
        this.player.on(flvjs.Events.LOADING_COMPLETE, (res) => { 
          if(this.player){
            // console.log(res, "resresresflv");
            n.loading = true;
            this.$forceUpdate();
            this.setVideos(videoEle, videoUrl, n);  
          }
         
         
        });
        this.player.on(flvjs.Events.ERROR, (errorType, errorDetail, errorInfo) => {
          if(this.player){
            // console.log("errorType", errorType);
            n.loading = false;
            n.deviceErr = "设备异常";
            this.$forceUpdate();
             this.setVideos(videoEle, videoUrl, n);
          } 
          
        });
        this.player.on(flvjs.Events.MEDIA_SOURCE_CLOSE, () => {
          if(this.player){
            this.setVideos(videoEle, videoUrl, n);
          }
          
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

    //webrtc
    //   createPlayer(videoElement, url) {
    //     var that = this;
    //     var player = new ZLMRTCClient.Endpoint({
    //       element: videoElement, // video 标签
    //       debug: false, // 是否打印日志
    //       zlmsdpUrl: url, //流地址
    //       simulcast: true,
    //       useCamera: false,
    //       audioEnable: false,
    //       videoEnable: true,
    //       recvOnly: true,
    //       resolution: { w: 1280, h: 720 }
    //     });

    //     player.on(ZLMRTCClient.Events.WEBRTC_ICE_CANDIDATE_ERROR, function(e) {
    //       // ICE 协商出错
    //       console.log("ICE 协商出错");
    //     });

    //     player.on(ZLMRTCClient.Events.WEBRTC_ON_REMOTE_STREAMS, function(e) {
    //       //获取到了远端流，可以播放
    //       videoElement.srcObject = e.streams[0];
    //       that.playerArr.push(player);
    //     });

    //     player.on(
    //       ZLMRTCClient.Events.WEBRTC_OFFER_ANSWER_EXCHANGE_FAILED,
    //       function(e) {
    //         // offer answer 交换失败
    //         console.log("offer answer 交换失败", e);
    //         stop();
    //       }
    //     );
    //   }
  },
  beforeDestroy() {
     this.leaveRouter = true;
  },
};
</script>

<style lang="scss" scoped>
.arrowIco {
  margin-right: 5px;
}
.imgIco {
  margin-top: -5px !important;
  color: red;
}
// .imgIco1 {
//   margin-top: -5px !important;
//   color: #0a330d;
// }
.mask {
  // width: 90px;
  // height: 64px;
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
    height: 30px;
    line-height: 30px;
    span {
      color: #fff;
    }
  }
}
.circle1 {
  display: inline-block;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  margin: 0;
  margin-top: 13px;
  // margin-right: 5px;
}
::v-deep .el-loading-mask {
  z-index: 5 !important;
  background: white;
}
.videoErrContainer {
  position: relative;
  .deviceErr {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    // background: #3ad1ff;
    div {
      min-width: 100PX;
      height: 100px;
      // background: #347fff;
      margin-left: -50px;
      margin-top: -50px;
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }
}
.errStyle {
  position: absolute;
  color: #3ad1ff;
  // background: #3ad1ff;
}
.errVideoStyle {
  display: none;
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
  padding: 30px 20px 20px 40px;
  height: 100%;
  overflow-y: auto;
  background: rgba(10, 25, 51, 0.03);
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
        width: 24px;
      }
      .viewWarning {
        color: #ff3a3a;
        font-weight: 400;
        font-size: 20px;
        margin-left: 12px;
      }
      .viewStatus {
        font-size: 20px;
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
      z-index: 20;
      a {
        margin-left: 25px;
      }
      width: 192px;
      max-height: 490px; // TODO
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
      .name {
        // margin-left: 10px;
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
    // width: 437px;
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
      // width: 70%;
      margin-left: 24px;
      font-size: 18px;
      // background: rebeccapurple;
    }
    .right {
      display: inline-block;
      // width: 30%;
      // background: #2dc961;
      .one {
        display: inline-block;
        // width: 30%;
        text-align: right;

        //  background: #347fff;
        .imgIco {
          color: #ff3a3a;
          font-size: 20px;
        }
        .imgIco1 {
          padding-right: 50px;
          font-size: 20px;
        }
      }

      .totalStyle {
        display: inline-block;
        // width: 40%;
        text-align: center;
        .count {
          color: #ff3a3a;
          font-size: 20px;
          padding-left: 20px;
          padding-right: 20px;
        }
        // background: #3ae1ff;
      }
      .three {
        display: inline-block;
        // width: 30%;
        text-align: left;
        //  background: #ffa55d;
        .viewStatus {
          color: #347fff;
          font-size: 20px;
          padding-right: 30px;
        }
      }
    }
    // span {
    //   font-size: 18px;
    //   // font-weight: 400;
    //   color: #0a1933;
    //   margin-left: 16px;
    // }
  }
  .videos {
    height: 100%;
    align-items: flex-start;
    .video {
      width: calc((100% - 0.02rem * 3) / 4);
      // height: calc((100% - 0.02rem * 3) / 4);
      margin-bottom: 48px;
      margin-right: 40px;
      &:nth-of-type(4n) {
        margin-right: 0;
      }
      &.full {
        width: 100%;
        height: 100%;
        margin: 0;
        &.warningList{
          max-height: 490px;
        }
      }
      &.four {
        width: calc((100% - 1rem) / 2);
        margin-left: 0.3rem;
        .warningList{
          max-height: 250px;
        }
        &:nth-of-type(2n) {
          margin-right: 0;
        }
      }
      .myvideo {
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
        height: calc(100vh - 95px) !important;
        border: none;
        object-fit: fill; //消除留白
      }
      video::-webkit-media-controls {
        opacity: 0 !important;
      }
    }
    .video1{
       margin-bottom: 0px
    }
  }
}
</style>
