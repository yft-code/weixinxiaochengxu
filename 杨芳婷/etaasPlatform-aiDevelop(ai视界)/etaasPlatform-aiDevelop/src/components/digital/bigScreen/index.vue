<template>
  <div>
    <!-- 智能体组件 -->
    <div class="angent-slide">
      <Agent @pageClik="pageClik" 
      :healthBubbleChart="healthBubbleChart" 
      :fireBubbleChart="fireBubbleChart"
      :workAreaBillboard="workAreaBillboard" 
      :bubbleChart="bubbleChart" 

      :immersionChart="immersionChart"></Agent>
    </div>
  <div class="big-screen-container">
    <div class="menu-slide">
      
    </div>
    <!-- 工具栏组件 -->
    <div class="menu-slide">
      <Control
        @showList="showList"
        @handleEdit="handleEdit"
        @parkEdit="parkEdit"
      ></Control>
    </div>
    <RightEcharts></RightEcharts>
    <!-- 原件库列表 -->
    <div class="component-list" v-if="this.$store.state.listShow">
      <componentList
        @getPointPostion="getPointPostion"
        @showListOne="showListOne"
        @showListTwo="showListTwo"
      ></componentList>
    </div>
     <!-- 新原件库列表 -->
      <div class="component-list" v-if="this.$store.state.singleShow">
      <componentSingle
        @getPointPostion="getPointPostion"
        @showListOne="showListOne"
        @showListTwo="showListTwo"
      ></componentSingle>
    </div>
    <!-- 区域编辑 -->
    <div class="operation" v-if="$store.state.setVideoContainerShow">
      <Operation
        :myMessageCenter="myMessageCenter"
        @closeOperation="closeOperation"
        @editOperation="editOperation"
        @delOperation="delOperation"
      ></Operation>
    </div>

     <!-- 区域编辑 -->
    <div class="operation" v-if="$store.state.setVideoContainerShowNew">
      <OperationNew
        :myMessageCenter="myMessageCenter"
        @closeOperation="closeOperationNew"
        @editOperationNew="editOperationNew"
        @delOperationNew="delOperationNew"
      ></OperationNew>
    </div>
    
    <!-- 区域编辑 -->
    <div class="region" v-if="$store.state.regionFlag">
      <Region
        :myMessageCenter="myMessageCenter"
        :myMessagePostion="myMessagePostion"
        @closeRegion="closeRegion"
        @confirm="confirm"
        @cancel="cancel"
      ></Region>
    </div>
    
     <!-- 区域编辑新 -->
    <div class="region" v-if="$store.state.regionFlagNew">
      <RegionNew
        :myMessageCenter="myMessageCenter"
        :myMessagePostion="myMessagePostion"
        @closeRegion="closeRegionNew"
        @confirm="confirm"
        @cancel="cancelNew"
      ></RegionNew>
    </div>

    <div class="warningPrompt" v-if="$store.state.warningPrompt">
      <WarningPrompt
        :warningTitle="warningTitle"
        @closeDel="closeDel"
        :warningTips="warningTips"
        @closeWarningPrompt="closeWarningPrompt"
      ></WarningPrompt>
    </div>

     <div class="warningPrompt" v-if="$store.state.warningPromptNew">
      <WarningPromptNew
        :warningTitle="warningTitle"
        @closeDelNew="closeDelNew"
        :warningTips="warningTips"
        @closeWarningPromptNew="closeWarningPromptNew"
      ></WarningPromptNew>
    </div>
    <!--  园区编辑:点击某个园区显示 -->
    <div class="park-operation" v-if="$store.state.parkFlag">
      <park-operation
        @delOperation="deleteDevice"
        @addMessage="addMessage"
        @associateDevice="associateDevice"
        @closeParkOperation="closeParkOperation"
        @associateScence="associateScence"
      >
      </park-operation>
    </div>
    <!-- 园区：添加备注 -->
    <div class="park-right" v-if="postFlag">
      <post-message @closePostMessage="closePostMessage"></post-message>
    </div>
    <!-- 关联设备 -->
    <div class="associate-device" v-if="deviceFlag">
      <associate-device
        @closeDevice="closeDevice"
        :altitude="altitude"
        :longitude="longitude"
        :latitude="latitude"
      ></associate-device>
    </div>
    <!-- 关联场景 -->
    <div class="associate-scence" v-if="scenceFlag">
      <associate-scene
        @closeScence="closeScence"
        @deleteScence="deleteScence"
        @addScence="addScence"
      >
      </associate-scene>
    </div>
    <!-- 添加场景 -->
    <div class="add-scence" v-if="scenceAddFlag">
      <add-screen
        :mySelectNotifier="mySelectNotifier"
        :mySelectAlogorithum="mySelectAlogorithum"
        @closeAddScence="closeAddScence"
        @addNotifier="openAddNotifier"
        @addAlgorithum="openAddAlgorithum"
      >
      </add-screen>
    </div>
    <!-- 添加通知人 -->
    <div class="add-notifier" v-if="addNotifier">
      <add-notifier
        :toMySelectNotifier="toMySelectNotifier"
        @closeAddNotifier="closeAddNotifier"
      ></add-notifier>
    </div>
    <!-- 添加算法 -->
    <div class="algorithum" v-if="addAlgorithum">
      <add-algorithum
        :toMySelectAlogorithum="toMySelectAlogorithum"
        @closeAddAlogorithum="closeAddAlogorithum"
        @AddAlogorithmMul="AddAlogorithmMul"
      ></add-algorithum>
    </div>
    <!-- 删除设备 -->
    <div class="scenceDelete" v-if="deleteScenceFlag">
      <WarningPrompt
        @closeAll="closeAllDevice"
        :warningTitle="warningTitle"
        :warningTips="warningTips"
        @closeWarningPrompt="closeWarningPrompt"
      ></WarningPrompt>
    </div>
    <!-- 删除点位 -->
    <div class="scenceDelete" v-if="$store.state.deleteDeviceFlag">
      <WarningPrompt
        @closeAll="closeAllDevice"
        :warningTitle="warningTitle"
        :warningTips="warningTips"
        @closeWarningPrompt="closeWarningPrompt"
      ></WarningPrompt>
    </div>
    <!-- 场景只关联一个设备删除功能-->
    <div class="scenceDelete" v-if="$store.state.deleteOneDevice">
      <WarningPrompt
        @closeAll="closeAllDevice"
        :warningTitle="warningTitle"
        :warningTips="warningTips"
        @closeWarningPrompt="closeWarningPrompt"
      ></WarningPrompt>
    </div>
    <div v-if="$store.state.modelShow" class="warning-message" @click="showEvent()" v-show="messageFlag">
      <span
        :class="[
          { 'warning-number-low': this.noticeNum < 100 },
          {
            'warning-number-middle':
              this.noticeNum >= 100 && this.noticeNum < 1000,
          },
          { 'warning-number-high': this.noticeNum >= 1000 },
        ]"
      >
        {{ noticeNum }}
      </span>
      <i class="iconfont icon-ai_line warning-icon"></i>
    </div>

    <!-- 新模型下的查看视频 -->
    <!-- <div class="videoShow" v-if="$store.state.videoShow">
      <videoShow></videoShow>
    </div> -->
    <!-- 添加点位视频查看 -->
    <div class="videoShow" v-if="$store.state.videoCheck">
      <videoCheck></videoCheck>
    </div>

    <div class="videoShow" v-if="$store.state.videoCheckNew">
      <videoCheckNew></videoCheckNew>
    </div>
     <!-- 点击查看用户中心 -->
     <div class="bigScreenIframe" v-if="!$store.state.modelShow && iframeSrc && $store.state.iframeShow" v-loading="iframeShow">
       <img src="@/assets/digital/assets/img/bigScreen/close.png" @click="closeClick" class="bigScreenIframeImg"/>
      <span class="clear"></span>
      <iframe :src="iframeSrc"  class="bigScreenIframes" ref="iframeOk"/>
    </div>
  </div>
  <div class="messageContainer">
     <userMessage></userMessage>
  </div>
   <voice ref="voice"></voice>
</div>
</template>

<script>
import voice from '@components/voice/voice.vue';
import videoCheck from "@/components/digital/videoCheck/index";
// import videoShow from "@/components/digital/videoShow/index";
import videoCheckNew from "@/components/digital/videoCheckNew/index";
import { websocketclose } from "@/plugin/socket";
import Control from "./control/index.vue";
import Agent from './agent/index.vue'
import RightEcharts from "./rightEcharts/index.vue";
import Operation from "../../digital/operation/index.vue";
import OperationNew from '@/components/agent/label/operationNew/index.vue'
import Region from "../../digital/region/index.vue";
import RegionNew from '@/components/agent/label/regionNew/index.vue'
import componentList from "./componentList/index.vue";
import componentSingle from "@/components/agent/componentSingle/index.vue";
// import parkArea from '../../digital/parkArea/index.vue'
import parkOperation from "../../digital/parkOperation/index.vue";
import postMessage from "../../digital/postMessage/index.vue";
import WarningPrompt from "../../digital/warningPrompt/index.vue";
import WarningPromptNew from "@/components/agent/common/warningPromptNew/index.vue";
import associateDevice from "../../digital/associateDevice/index.vue";
import associateScene from "../../digital/associateScene/index.vue";
import addScreen from "../../digital/addScence/index.vue";
import addNotifier from "../../digital/addNotifier/index.vue";
import addAlgorithum from "../../digital/addAlgorithum/index.vue";
import * as api from "@/api/ai/earlyWarning";
import Iframe from '../../../views/etass/iframe.vue';
import tip from './tip/index.vue'
import userMessage from '../userMessage'
export default {
   props: {
    healthBubbleChart: {
      type: Array,
      
    },
      fireBubbleChart: {
      type: Array,
      
    },
    workAreaBillboard: {
      type: Array,
    },
    immersionChart:{
      type:Array,
    },
    bubbleChart:{
      type:Array
    }
  },
  components: {
    voice,
    userMessage,
    componentSingle,
    tip,
    Control,
    RightEcharts,
    Operation,
    OperationNew,
    Region,
    parkOperation,
    postMessage,
    WarningPrompt,
    associateDevice,
    associateScene,
    addScreen,
    addNotifier,
    addAlgorithum,
    componentList,
    // videoShow,
    videoCheck,
    videoCheckNew,
    Agent,
    Iframe,
    RegionNew,
    WarningPromptNew
  },
  data() {
    return {
      myMessagePostion: {},
      myMessageCenter: {},
      mySelectAlogorithum: [],
      mySelectNotifier: [],
      toMySelectNotifier: [],
      toMySelectAlogorithum: [],
      myAlogorith: [],
      flag: true,
      warningNum: "",
      operationFlag: false,
      regionFlag: false,
      // 点击园区展示
      parkFlag: false,
      // 添加园区备注
      postFlag: false,
      // 关联设备
      deviceFlag: false,
      // 关联场景
      scenceFlag: false,
      // 添加场景
      scenceAddFlag: false,
      // 删除场景
      deleteScenceFlag: false,
      // 删除点位（设备）
      deleteDeviceFlag: false,
      // 添加通知人
      addNotifier: false,
      // 添加算法
      addAlgorithum: false,
      listShowFlag: false,
      warningPrompt: false,
      messageFlag: false,
      //工具栏显示
      toolFlag: false,
      warningTitle: "",
      warningTips: "",
      isLogin: false, // 是否登录
      showMonitoringTitle: false, // 是否显示 监控室标题
      visible: false, // 是否展示查看/处理详情页面
      currentRoute: "", // 当前路由
      noticeClass: "newNotice", // 消息通知图标class
      showNoticeModal: false, // 显示通知下拉框表格
      haveShowNotice: false, // 是否点击查看/处理,
      noticeNum: "", // 预警数量
      noticeNumBefore: "", //记录上一次值，刷新无效
      noticeNumArr: [],
      warningData: [], // 预警列表数据
      showAlert: true,
      noticeShow: true,
      messageShow: null,
      Sencond: 3,
      // 获取点位的位置
      longitude: "",
      latitude: "",
      altitude: "",
      iframeSrc: "",
      iframeShow:true
    };
  },
  mounted() {
    // console.log('parkFlag',this.$store.state.parkFlag);
    const that = this;
    window.addEventListener("setItemEvent", that.showWarningEvent);
    this.$bus.$on("number", (number) => {
      this.noticeNum = number;
      this.noticeNumArr.push({ value: this.noticeNum });
      if (this.noticeNumArr.length > 1) {
        this.noticeNumBefore =
          this.noticeNumArr[this.noticeNumArr.length - 2].value;
      }
    });
  },
  beforeDestroy() {
    // 在组件生命周期结束的时候销毁。
    const that = this;
    window.removeEventListener("setItemEvent", that.showWarningEvent);
  },
  created() {
    let that = this;
    this.$store.state.modelShow=true
    this.$store.state.videoCheck = false;
    this.$store.state.videoShow = false;
    that.fetchNoticeData();
    that.$bus.$on('delOperationNew',(data)=>{
      that.delOperationNew(data)
    })
    that.$bus.$on("cll", () => {
      //  console.log('aHeaderc11')
      that.fetchNoticeData();
      // that.fetchData(1, 10);
    });
    //  setTimeout(()=>{
    //         // console.log('toolbarShow',this.$store.state.toolbarShow);
    //         this.$store.state.toolbarShow=true
    //          this.fetchNoticeData()
    //           },50000)
    this.$bus.$on("editModule", (data) => {
      //  this.flag = false
      this.$store.state.echartWhole = false;
      // this.closeAll()
      //  this.parkFlag=false
      //  this.operationFlag=false
      //  this.$store.state.echartOne = false;
      // this.$store.state.echartTwo = false;
      // this.$store.state.echartThree = false;
      // this.$store.state.echartFour = false;
      // this.$store.state.echartFive = false;
      // this.$store.state.echartSix = false;
    });
    this.$bus.$on("closeModule", (data) => {
      //  this.flag = true
      this.closeAll();
      //  this.parkFlag=false
      //  this.operationFlag=false
      this.$store.state.earlyWarnigShow = false;
      this.$store.state.parkFlag = false;
      this.$store.state.setVideoContainerShow = false;
      this.$store.state.listShow = false;
      this.$store.state.editModuleShow = false;
      // this.$store.state.areaInfoShow = true
    });

    // 关闭区域查看框
    this.$bus.$on("closeArea", () => {
      this.$store.state.setVideoContainerShow = false;
      this.$store.state.regionFlag = false;
    });
    // 关闭设备场景关联

    this.$bus.$on("closeDevice", () => {
      this.$store.state.parkFlag = false;
      this.postFlag = false;
      this.deviceFlag = false;
      this.scenceFlag = false;
      this.scenceAddFlag = false;
      this.addNotifier = false;
      this.addAlgorithum = false;
      this.deleteScenceFlag = false;
    });
    that.$bus.$on("sendMyPointPostion", (data1, data2) => {
      this.getPointPostion(data1, data2);
    });

     this.$bus.$on("editOperationNew", (data) => {
      that.editOperationNew(data)
     })
  },
  methods: {
     pageClik(item){
       const that = this;          
       let token = JSON.parse(localStorage.getItem("token"));
       if(item.type === 'user'){
          token['userCenter'] =  token['aiHorizon'];
          localStorage.setItem("token", JSON.stringify(token));
          let userInfo = JSON.parse(localStorage.getItem('userInfo'))
            if(userInfo){
              userInfo['userCenter'] = userInfo['aiHorizon']
            }
            localStorage.setItem("userInfo",JSON.stringify(userInfo));
            that.$store.state.iframeShow = true;
            that.iframeSrc = that.$store.state.publicUrl + 'usercenter/#/user_center'+ item.path;
       }else if(item.type === 'etass'){
          token['etass'] =  token['aiHorizon'];
          localStorage.setItem("token", JSON.stringify(token));
          let userInfo = JSON.parse(localStorage.getItem('userInfo'))
            if(userInfo){
              userInfo['etass'] = userInfo['aiHorizon']
            }
            localStorage.setItem("userInfo",JSON.stringify(userInfo));
            that.$store.state.iframeShow = true;
            that.iframeSrc = that.$store.state.publicUrl + 'etaasPlatform/#'+ item.path;
       }
      
        setTimeout(()=>{
          let iframe = this.$refs['iframeOk'];
            // 处理兼容行问题
            if(iframe){
                  if (iframe.attachEvent) {
                  iframe.attachEvent('onload', function () {
                    that.iframeShow = false
                  })
                } else {
                  iframe.onload = function () {
                    that.iframeShow = false
                  }
                }
            }
        })
     
     },
    closeAllDevice() {
      this.$store.state.deleteDeviceFlag = false;
      this.$store.state.parkFlag = false;
      this.postFlag = false;
      this.deviceFlag = false;
      this.scenceFlag = false;
      this.scenceAddFlag = false;
      this.addNotifier = false;
      this.addAlgorithum = false;
      this.deleteScenceFlag = false;
      this.$store.state.scenceStyle = false;
      this.$store.state.deviceStyle = false;
      this.$store.state.commentStyle = false;
    },
    closeDel() {
      this.$store.state.warningPrompt = false;
      this.$store.state.regionFlag = false;
      this.$store.state.setVideoContainerShow = false;
      // this.$store.state.deleteDeviceFlag = false
    },
      closeDelNew() {
      this.$store.state.warningPromptNew = false;
      this.$store.state.regionFlagNew = false;
      this.$store.state.setVideoContainerShowNew = false;
      // this.$store.state.deleteDeviceFlag = false
    },
    // 预警事件
    showWarningEvent(e) {
      const that = this;
      if (e.key === "noticeNum") {
        that.fetchNoticeData();
        this.warningData = [];
           if (
          typeof JSON.parse(e.newValue) === "number" ||
          typeof JSON.parse(e.newValue) === "string"
        ) {
          that.noticeNum = e.newValue;
        } else {
          const newValue = JSON.parse(e.newValue);
          that.noticeNum = newValue.sum;
        }
        // const newValue = JSON.parse(e.newValue);
        // this.warningData = [];
        // that.noticeNum = newValue.sum;
        that.noticeNumArr.push({ value: that.noticeNum });
        if (that.noticeNumArr.length > 1) {
          that.noticeNumBefore =
            that.noticeNumArr[that.noticeNumArr.length - 2].value;
        }
        // that.showNoticeModal && that.fetchData(1,10)
        if (
          that.noticeShow &&
          that.noticeNumArr.length > 1 &&
          that.noticeNumBefore < that.noticeNum
        ) {
          this.$refs.voice.getVoices()
          that.Sencond = 3;
          that.messageShow = that.$message.warning({
            dangerouslyUseHTMLString: true,
            message: "有待处理事件!  " + that.Sencond + "s结束",
            duration: that.Sencond + "000",
          });
          that.noticeShow = false;
          that.countTime();
        } else if (that.noticeShow && that.noticeNumArr.length <= 1) {
           this.$refs.voice.getVoices()
          that.Sencond = 3;
          that.messageShow = that.$message.warning({
            dangerouslyUseHTMLString: true,
            message: "有待处理事件!  " + that.Sencond + "s结束",
            duration: that.Sencond + "000",
          });
          that.noticeShow = false;
          that.countTime();
        }
        that.fetchNoticeData();
      }
    },
    countTime() {
      let that = this;
      const interl = setInterval(() => {
        that.Sencond--;
        if (that.Sencond === 0) {
          that.noticeShow = true;
          window.clearInterval(interl);
        } else {
          that.messageShow.message = "有待处理事件!  " + that.Sencond + "s结束";
          this.$bus.$emit("c22", "");
          this.$bus.$emit("cll", "");
        }
      }, 1000);
    },

    getPointPostion(data1, data2) {
      this.myMessagePostion = data1;
      this.myMessageCenter = data2;
    },
    // ================
    // 获取事件数量
    fetchNoticeData() {
      // console.log('fetchNoticeData')
      const that = this;
      if (JSON.parse(localStorage.getItem('token'))['aiHorizon']) {
        api
          .getNoticemNum()
          .then((res) => {
            this.messageFlag = true;
            that.noticeNumBefore = res.result;
            that.noticeNumArr.push({
              value: that.noticeNumBefore,
            });
            that.noticeNum = res.result;
            that.noticeNumArr.push({
              value: that.noticeNum,
            });
          })
          .catch((res) => {});
      }
    },
    // ================
    //  // 获取事件数量
    //  fetchNoticeData(){
    //    console.log('123');
    //   if (localStorage.getItem("token")) {
    //     api
    //       .getNoticemNum()
    //       .then(res => {
    //         this.warningNum=res.result
    //          this.messageFlag=true
    //         this.$bus.$emit("number",res.result)
    //        })
    //       .catch(res => {
    //     });
    //   }
    // },
    // 显示预警事件弹框
    showEvent() {
      this.$store.state.eventDetailShow = false;
      this.$store.state.earlyStyleShow = true;
      this.$store.state.earlyWarnigShow = true;
      this.$bus.$emit("showWarning");
      this.closeAll();
      this.parkFlag = false;
      this.operationFlag = false;
    },

    // 关闭列表
    showListOne(longitude, latitude, altitude) {
      //  传值
      this.longitude = longitude;
      this.latitude = latitude;
      this.altitude = altitude;
      // console.log('a',longitude,'b',latitude,'c',altitude);
      this.closeAll();
      // this.$store.state.parkFlag=true
      this.$store.state.setVideoContainerShow = false;
    },
    showListTwo() {
      //  this.$store.state.setVideoContainerShow=true
      this.$store.state.parkFlag = false;
      this.closeAll();
    },
    // showList
    showList() {
      this.listShowFlag = true;
    },
    // 使用定时器
    toolShow() {
      setTimeout(() => {
        this.toolFlag = true;
      }, 3000);
    },
    AddAlogorithmMul(data) {
      // this.myAlogorith = data
      // console.log(data,'wwww')
    },
    // 编辑区域
    handleEdit(data) {
      this.$store.state.setVideoContainerShow = data;
    },
    editOperation(data) {
      this.$store.state.regionFlag = data;
    },
     editOperationNew(data) {
      this.$store.state.regionFlagNew = data;
    },
    closeOperation() {
      this.$store.state.setVideoContainerShow = false;
      this.$store.state.regionFlag = false;
    },
     closeOperationNew() {
      this.$store.state.setVideoContainerShowNew = false;
      this.$store.state.regionFlagNew = false;
    },
    closeRegion() {
      this.$store.state.regionFlag = false;
      this.$store.state.setVideoContainerShow = false;
    },
     closeRegionNew() {
      this.$store.state.regionFlagNew = false;
      this.$store.state.setVideoContainerShowNew = false;
    },
    // 园区编辑
    parkEdit(data) {
      this.$store.state.parkFlag = data;
      this.scenceFlag = false;
      this.deviceFlag = false;
      this.$store.state.warningPrompt = false;
      this.postFlag = false;
    },

    // 添加备注信息
    addMessage(data) {
      this.postFlag = data;
      this.deviceFlag = false;
      this.scenceFlag = false;
    },

    // 弹出关联设备
    associateDevice(data) {
      this.deviceFlag = data;
      this.scenceFlag = false;
      this.postFlag = false;
    },
    // 删除场景
    deleteScence() {
      (this.warningTitle = "删除"),
        (this.warningTips = "确认要删除该关联场景吗?"),
        (this.deleteScenceFlag = true);
    },
    //
    deleteDevice() {
      (this.warningTitle = "删除"),
        (this.warningTips = "确认要删除该设备吗?"),
        (this.$store.state.deleteDeviceFlag = true);
      //  console.log('deleteDeviceFlag',this.$store.state.deleteDeviceFlag);
    },
    // 关闭关联设备弹框
    closeDevice() {
      this.deviceFlag = false;
    },
    // 关闭园区操作框的所有页面
    closeAll() {
      this.$store.state.regionFlag = false;
      this.$store.state.warningPrompt = false;
      this.postFlag = false;
      this.deviceFlag = false;
      this.scenceFlag = false;
      this.scenceAddFlag = false;
      this.addNotifier = false;
      this.addAlgorithum = false;
      this.deleteScenceFlag = false;
      this.deleteDeviceFlag = false;
      this.$store.state.deleteDeviceFlag = false;
    },
    //关闭所以区域信息
    closeAllArea() {
      this.$store.state.warningPrompt = false;
    },
    // 关闭园区操作框
    closeParkOperation() {
      this.$store.state.parkFlag = false;
    },

    // 关闭备注信息框
    closePostMessage() {
      this.postFlag = false;
    },

    // 弹出监管场景页面
    associateScence(data) {
      this.scenceFlag = data;
      this.deviceFlag = false;
      this.postFlag = false;
    },
    // 关闭添加场景弹框
    closeAddScence() {
      this.scenceAddFlag = false;
      this.closeAddAlogorithum();
      this.closeAddNotifier();
    },
    // 添加监管场景页面
    addScence() {
      this.scenceAddFlag = true;
    },
    // 关闭监管场景页面
    closeScence() {
      this.scenceFlag = false;
      this.closeAddScence();
      this.closeWarningPrompt();
      this.closeAddAlogorithum();
      this.closeAddNotifier();
    },
    // 关闭通知人
    closeAddNotifier(data) {
      this.mySelectNotifier = data;
      this.addNotifier = false;
    },
    // 打开通知人弹框
    openAddNotifier(data) {
      this.toMySelectNotifier = data;
      this.addNotifier = true;
      this.addAlgorithum = false;
    },
    // 打开添加算法弹框发
    openAddAlgorithum(data) {
      this.toMySelectAlogorithum = data;
      this.addAlgorithum = true;
      this.addNotifier = false;
    },
    // 关闭算法弹框
    closeAddAlogorithum(data) {
      this.mySelectAlogorithum = data;
      this.addAlgorithum = false;
    },
    delOperationNew(data){
       (this.warningTitle = "删除"),
        (this.warningTips = "确认要删除该信息吗?"),
        (this.$store.state.warningPromptNew = data);
    },
    // 删除设备
    delOperation(data) {
      (this.warningTitle = "删除"),
        (this.warningTips = "确认要删除该信息吗?"),
        (this.$store.state.warningPrompt = data);
    },
    closeWarningPrompt() {
      this.$store.state.warningPrompt = false;
      this.deleteScenceFlag = false;
      this.$store.state.deleteDeviceFlag = false;
    },
     closeWarningPromptNew() {
      this.$store.state.warningPromptNew = false;
      this.deleteScenceFlag = false;
      this.$store.state.deleteDeviceFlag = false;
    },
    confirm(data) {
      (this.warningTitle = "编辑"),
        (this.warningTips = "不可重复关联!"),
        (this.$store.state.warningPromptNew = data);
    },
    cancel() {
      this.closeWarningPrompt();
      this.closeRegion();
    },
     cancelNew() {
      this.closeWarningPrompt();
      this.closeRegionNew();
    },
    closeClick(){
      this.$store.state.iframeShow = false
    }
  },
};
</script>
<style lang="scss" scoped>
.bigScreenIframeImg{
  float:right;
  cursor: pointer;
  pointer-events:all;
}
.messageContainer{
    background: rgba(255, 255, 255, 0.2);
    position: absolute;
    left:50%;
    top:50%;
    z-index:100;
    transform: translate(-50%, -50%);
    }
.warningPrompt {
  pointer-events: all;
  cursor: pointer;
  width: 378px;
  height: 224px;
  position: absolute;
  z-index: 10;
  left: 500px;
  top: 150px;
  // background: red;
}
.scenceDelete {
  pointer-events: all;
  cursor: pointer;
  width: 378px;
  height: 224px;
  position: absolute;
  z-index: 10;
  left: 700px;
  top: 150px;
}
.videoShow {
  pointer-events: all;
  cursor: pointer;
  width: 500px;
  height: 500px;
  position: absolute;
  z-index: 1;
  left: 30%;
  top: 15%;
}
.bigScreenIframe{
   width: 1200PX;
   height: 600PX;
   position: absolute;
   z-index: 99999;
   left: calc(50% - 600PX);
   top: 10%;
}
.bigScreenIframes{
  width:100%;
  height:100%;
  border:0;
  vertical-align: bottom;
  pointer-events: all;
}
.videoCheck {
  pointer-events: all;
  cursor: pointer;
  width: 378px;
  height: 224px;
  position: absolute;
  z-index: 10;
  left: 66%;
  top: 30%;
}
.operation {
  pointer-events: all;
  cursor: pointer;
  width: 288px;
  height: 194px;
  position: absolute;
  z-index: 10;
  left: 131px;
  top: 288px;
}
.park-operation {
  pointer-events: all;
  cursor: pointer;
  width: 288px;
  height: 194px;
  position: absolute;
  z-index: 10;
  left: 100px;
  top: 200px;
}
.region {
  pointer-events: all;
  cursor: pointer;
  width: 504px;
  height: 378px;
  position: absolute;
  top: 298px;
  left: 439px;
  z-index: 10;
}
// 备注信息
.park-right {
  pointer-events: all;
  cursor: pointer;
  width: 504px;
  height: 378px;
  position: absolute;
  top: 230px;
  left: 600px;
  z-index: 10;
}
// 关联设备
.associate-device {
  pointer-events: all;
  cursor: pointer;
  // width: 504px;
  // height: 378px;
  position: absolute;
  left: 600px;
  top: 200px;
  z-index: 10;
}
// 关联场景
.associate-scence {
  pointer-events: all;
  cursor: pointer;
  width: 504px;
  height: 378px;
  position: absolute;
  top: 200px;
  left: 600px;
  z-index: 10;
}
// 添加场景
.add-scence {
  pointer-events: all;
  cursor: pointer;
  // width: 504px;
  // height: 378px;
  position: absolute;
  top: 25%;
  left: 61%;
  z-index: 10;
}
// 添加通知人
.add-notifier {
  pointer-events: all;
  cursor: pointer;
  // width: 504px;
  // height: 378px;
  position: absolute;
  top: 25%;
  // top: -3000px;
  left: 30%;
  z-index: 10;
}
.algorithum {
  pointer-events: all;
  cursor: pointer;
  // width: 504px;
  // height: 378px;
  position: absolute;
  top: 25%;
  left: 30%;
  z-index: 10;
}
.angent-slide{
  pointer-events: all;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 9999999;
}
.big-screen-container {
  pointer-events: none;
  position: absolute;
  top: 102px;
  left: 16px;
  right: 16px;
  bottom: 18px;
  z-index: 9;
  .menu-slide {
    pointer-events: all;
    position: absolute;
    z-index: 1000000;
    cursor: pointer;
  }
  .component-list {
    pointer-events: all;
    position: absolute;
    z-index: 1000000;
    cursor: pointer;
    right: 0px;
  }
  .warning-message {
    pointer-events: all;
    position: absolute;
    z-index: 10;
    bottom: 172px;
    left: -14px;
    min-width: 64px;
    min-height: 64px;
    cursor: pointer;
    border-radius: 50%;
    background-color: #01081c;
    .warning-number-low {
      position: absolute;
      right: 0;
      top: -5px;
      display: inline-block;
      width: 24px;
      height: 24px;
      background-color: #ff3a3a;
      text-align: center;
      font-size: 12px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      border-radius: 50%;
      line-height: 24px;
      color: #ffffff;
    }
    .warning-number-middle {
      position: absolute;
      right: 0;
      top: -5px;
      display: inline-block;
      min-width: 30px;
      height: 30px;
      background-color: #ff3a3a;
      text-align: center;
      font-size: 12px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      border-radius: 50%;
      line-height: 30px;
      color: #ffffff;
    }
    .warning-number-high {
      position: absolute;
      right: -14px;
      top: -9px;
      display: inline-block;
      min-width: 38px;
      height: 38px;
      background-color: #ff3a3a;
      text-align: center;
      font-size: 12px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      border-radius: 50%;
      line-height: 38px;
      color: #ffffff;
    }
    .warning-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #ffffff;
      font-size: 30px;
    }
  }
}
</style>