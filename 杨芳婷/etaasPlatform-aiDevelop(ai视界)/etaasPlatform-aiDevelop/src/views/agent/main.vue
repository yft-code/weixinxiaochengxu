<template>
  <div class="main-page" id="main-page111">
    <div id="containers" v-loading="$store.state.myLoading">
      <div class="aa" v-for="item in immersionChart" :key="item.id">
        <component
          :tableid="item.id"
          :componentData="item.data ? item.data : ''"
          :is="item.componentName"
        />
      </div>

      <div class="aa" v-for="item in bubbleChart" :key="item.id">
        <component
          :tableid="item.id"
          :name="item.name"
          :componentData="item.data ? item.data : ''"
          :is="item.componentName"
          :leaderConcern="item.show"
        />
      </div>

      <div class="aa" v-for="item in workAreaBillboard" :key="item.id">
        <component
          :areaTableid="item.id"
          :detailList="item.data ? item.data : ''"
          :is="item.componentName"
          :name="item.name"
        />
      </div>
      <div v-if="dataShow">
        <div  class="aa" v-for="item in healthBubbleChart" :key="item.id">
          <component
            :healthBubbleid="item.id"
            :name="item.name"
            :healthBubbleData="item.data ? item.data : ''"
            :is="item.componentName"
            :healthConcern="healthConcern"
          />
        </div>
      </div>
      <!-- 消防器材使用详情-->
      <div class="aa" v-for="item in fireBubbleChart" :key="item.id">
        <component
          :healthBubbleid="item.id"
          :title="item.name"
          :is="item.componentName"
          :left="item.left"
          :total="item.total"
          :used="item.used"
          :fires-show="firesShow"
        />
      </div>
      <!--摄像头-->
      <!-- <div
      class="aa"
      v-for="item in immersionCameras"
      :key="item.id"
    >
        <component :tableid="item.id"  :num="item.num?item.num:'1'" :componentData="item.data?item.data:''" :is="item.componentName" />
    </div> -->

      <div id="cesiumContainer"></div>
    </div>
    <BigScreen
      :healthBubbleChart="healthBubbleChart"
      :workAreaBillboard="workAreaBillboard"
      :bubbleChart="bubbleChart"
      :immersionChart="immersionChart"
      :fireBubbleChart="fireBubbleChart"
    >
    </BigScreen>
    <AreaInfoNew></AreaInfoNew>
  </div>
</template>

<script>
// 引入获取鼠标拾取事件
import {
  modleFn,
  abbrImg,
  leftClickEntity,
  CameraFlyTo,
  bubbleChartsFn,
} from "@/utils/digital/commonFunc";
import AssetManagement from "@/components/agent/mode/Leader/assetManagement.vue";
import AllWareHouse from "@/components/agent/mode/Leader/allWareHouse.vue";
import EnvironmentTest from "@/components/agent/mode/Leader/environmentTest.vue";
import AllFactor from "@/components/agent/mode/Leader/allFactor.vue";
import HealthBubble from "@/components/agent/mode/healthConcern/healthBubble";
import FireBubble from "@/components/agent/mode/fireManage/fire.vue";
import AllCar from "@/components/agent/mode/Leader/allCar.vue";
import WorkAreaTable from "@/components/agent/mode/healthConcern/workAreaTable";
import {
  addFeature,
  addpopUp,
  addpopUpReCreated,
} from "@/utils/digital/hookChars.js";
import { parkBuildModel } from "@/api/ai/model";
import { addMapBox } from "@/utils/digital/utils.js";
import { getDevices, getDevicePageList, getPoint } from "@/api/digital/config";
import toBase64ForDefaultValue from "@/utils/digital/html2base64";
import addechartspop from "@/utils/digital/addchartspop.js";
// import billboardVideo from "@/utils/digital/billboardVideo.js";
import randerDaliyWorkshop from "@/utils/digital/daliyWorkshop.js";
import { addCamera, addPoint } from "@/utils/digital/createCameraWall";
import { addCameraNav } from "@/utils/digital/navigateCamera";
import {
  addCameras,
  addPoints,
  addFireDevices,
} from "@/utils/digital/createCameraWord";
import {
  addCameraNew,
  addPointNew,
  addPointNewShow,
} from "@/utils/digital/createCameraWall1";
import { addCamera1, addPoint1 } from "@/utils/digital/createCameraWall1";
import realTimeRander from "@/utils/digital/realTimeRander.js";
import BigScreen from "@/components/agent/bigScreen/index";
import AreaInfoNew from "@/components/agent/label/areaInfoNew/index";
// 消防数据
import { fireDatas, roadArr } from "@/utils/mode/fireData";
import { addRubbishPoint } from "@/utils/digital/hookChars.js";
window.dataSource = null;
let timer = null;
let timerofproduct = null;
let init = 30;
let initprod = 20;
let opoen = false;
let openprod = false;

export default {
  components: {
    BigScreen,
    AssetManagement,
    EnvironmentTest,
    AreaInfoNew,
    AllFactor,
    AllWareHouse,
    AllCar,
    HealthBubble,
    WorkAreaTable,
    FireBubble,
  },
  data() {
    return {
      fireArr:[],
      leaderBubbleArr:[],
      bubbleArr: [],
      dataShow: false,
      firesShow: true,
      fireDatas,
      roadArr,
      healthConcern: true,
      fireBubbleTime: 0,
      leaderConcern: true,
      healthBubbleTime: 0,
      leaderBubbleTime: 0,
      healthPoint: [
        {
          id: "rubbishPoint1",
          longitude: 105.92952,
          latitude: 27.967297,
          height: 905.98,
          title: "垃圾桶1",
        },
        {
          id: "rubbishPoint2",
          longitude: 105.928386,
          latitude: 27.965206,
          height: 905.91,
          title: "垃圾桶2",
        },
        {
          id: "rubbishPoint3",
          longitude: 105.926466,
          latitude: 27.967911,
          height: 790.56,
          title: "垃圾桶3",
        },
        {
          id: "rubbishPoint4",
          longitude: 105.92524,
          latitude: 27.965571,
          height: 836.46,
          title: "垃圾桶4",
        },
        {
          id: "rubbishPoint5",
          longitude: 105.922901,
          latitude: 27.965025,
          height: 813.78,
          title: "垃圾桶5",
        },
        {
          id: "rubbishPoint6",
          longitude: 105.921631,
          latitude: 27.963315,
          height: 836.66,
          title: "垃圾桶6",
        },
      ],
      bubbleChart: [
        {
          id: "bubble0",
          center: {
            longitude: 105.92883,
            latitude: 27.966439,
            height: 898.21,
          },
          show: true,
          componentName: "AllFactor",
          anchor: [0, 0],
          name: "厂区三",
          data: [
            {
              name: "采剥(掘)总量",
              number: "3.2",
            },
            {
              name: "掌子出矿量",
              number: "3.2",
            },
            {
              name: "剥离量(掘进量)",
              number: "3.3",
            },
            {
              name: "开拓量",
              number: "3.2",
            },
            {
              name: "其他作业量",
              number: "3.2",
            },
          ],
        },
        {
          id: "bubble1",
          center: {
            longitude: 105.924564,
            latitude: 27.966353,
            height: 817.14,
          },
          show: true,
          componentName: "AllFactor",
          anchor: [0, 0],
          name: "厂区二",
          data: [
            {
              name: "采剥(掘)总量",
              number: "3.2",
            },
            {
              name: "掌子出矿量",
              number: "3.2",
            },
            {
              name: "剥离量(掘进量)",
              number: "3.3",
            },
            {
              name: "开拓量",
              number: "3.2",
            },
            {
              name: "其他作业量",
              number: "3.2",
            },
          ],
        },
        {
          id: "bubble2",
          center: {
            longitude: 105.922001,
            latitude: 27.965078,
            height: 812.1,
          },
          show: true,
          componentName: "AllFactor",
          anchor: [0, 0],
          name: "厂区一",
          data: [
            {
              name: "采剥(掘)总量",
              number: "3.2",
            },
            {
              name: "掌子出矿量",
              number: "3.2",
            },
            {
              name: "剥离量(掘进量)",
              number: "3.3",
            },
            {
              name: "开拓量",
              number: "3.2",
            },
            {
              name: "其他作业量",
              number: "3.2",
            },
          ],
        },
      ],
      healthBubbleChart: [
        {
          id: "healthbubble1",
          center: {
            longitude: 105.931338,
            latitude: 27.966007,
            height: 962.25,
          },
          show: true,
          anchor: [0, 0],
          componentName: "healthBubble",
          name: "垃圾桶1",
          data: [
            {
              name: "清理人员",
              detail: "张三",
            },
            {
              name: "清理时间",
              detail: "2020.06.24",
            },
            {
              name: "是否完成",
              detail: "未完成",
            },
          ],
        },
        {
          id: "healthbubble2",
          center: {
            longitude: 105.929078,
            latitude: 27.963965,
            height: 921.7,
          },
          show: true,
          anchor: [0, 0],
          componentName: "healthBubble",
          name: "垃圾桶2",
          data: [
            {
              name: "清理人员",
              detail: "张三",
            },
            {
              name: "清理时间",
              detail: "2020.06.24",
            },
            {
              name: "是否完成",
              detail: "已完成",
            },
          ],
        },
        {
          id: "healthbubble3",
          center: {
            longitude: 105.926985,
            latitude: 27.967212,
            height: 797.44,
          },
          show: true,
          anchor: [0, 0],
          componentName: "healthBubble",
          name: "垃圾桶3",
          data: [
            {
              name: "清理人员",
              detail: "张三",
            },
            {
              name: "清理时间",
              detail: "2020.06.24",
            },
            {
              name: "是否完成",
              detail: "已完成",
            },
          ],
        },
        {
          id: "healthbubble4",
          center: {
            longitude: 105.925314,
            latitude: 27.965041,
            height: 853.82,
          },
          show: true,
          anchor: [0, 0],
          componentName: "healthBubble",
          name: "垃圾桶4",
          data: [
            {
              name: "清理人员",
              detail: "张三",
            },
            {
              name: "清理时间",
              detail: "2020.06.24",
            },
            {
              name: "是否完成",
              detail: "已完成",
            },
          ],
        },
        {
          id: "healthbubble5",
          center: {
            longitude: 105.922957,
            latitude: 27.964288,
            height: 830.66,
          },
          show: true,
          anchor: [0, 0],
          componentName: "healthBubble",
          name: "垃圾桶5",
          data: [
            {
              name: "清理人员",
              detail: "张三",
            },
            {
              name: "清理时间",
              detail: "2020.06.24",
            },
            {
              name: "是否完成",
              detail: "已完成",
            },
          ],
        },
        {
          id: "healthbubble6",
          center: {
            longitude: 105.921606,
            latitude: 27.962465,
            height: 854.2,
          },
          show: true,
          anchor: [0, 0],
          componentName: "healthBubble",
          name: "垃圾桶6",
          data: [
            {
              name: "清理人员",
              detail: "张三",
            },
            {
              name: "清理时间",
              detail: "2020.06.24",
            },
            {
              name: "是否完成",
              detail: "已完成",
            },
          ],
        },
      ],
      // 消防器材使用信息气泡数据
      fireBubbleChart: [
        {
          id: "firebubble1",
          center: {
            longitude: 105.92756017664618,
            latitude: 27.966794402019875,
            height: 835.7512299075757,
          },
          show: true,
          componentName: "FireBubble",
          name: "灭火器使用情况",
          left: 10,
          total: 40,
          used: 30,
          data: [],
        },
        // {
        //   id:'firebubble2',
        //   center: {
        //          longitude: 105.92705598430366 ,
        //           latitude: 27.963722670693848,
        //           height: 876.1710773205859
        //   },
        //   show: true,
        //   componentName: 'FireBubble',
        //   name:'灭火器使用情况',
        //   left:20,
        //   total:40,
        //   used:20,
        //   data:[],
        // },
        {
          id: "firebubble3",
          center: {
            longitude: 105.92705598430366,
            latitude: 27.963722670693848,
            height: 876.1710773205859,
          },
          show: true,
          componentName: "FireBubble",
          name: "消防栓使用情况",
          left: 20,
          total: 80,
          used: 60,
          data: [],
        },
        {
          id: "firebubble4",
          center: {
            longitude: 105.92244520219958,
            latitude: 27.96399323693559,
            height: 825.6633234158993,
          },
          show: true,
          componentName: "FireBubble",
          name: "温感警报器使用情况",
          left: 20,
          total: 70,
          used: 50,
          data: [],
        },
      ],
      workAreaBillboard: [
        {
          id: "AreaBillboard1", //广告牌的id
          center: {
            longitude: 105.927818,
            latitude: 27.966254,
            height: 947.39,
          },
          show: true,
          name: "厂区一",
          componentName: "WorkAreaTable",
          anchor: [0, 0],
          width: 650,
          height: 362,
          rotate: 50,
          data: [
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
          ],
        },
        {
          id: "AreaBillboard2", //广告牌的id
          center: {
            longitude: 105.924886,
            latitude: 27.965737,
            height: 909.95,
          },
          show: true,
          name: "厂区二",
          componentName: "WorkAreaTable",
          anchor: [0, 0],
          width: 650,
          height: 362,
          rotate: 50,
          data: [
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
          ],
        },
        {
          id: "AreaBillboard3", //广告牌的id
          center: { longitude: 105.922077, latitude: 27.96483, height: 903.48 },
          show: true,
          name: "厂区三",
          componentName: "WorkAreaTable",
          anchor: [0, 0],
          width: 650,
          height: 362,
          rotate: 50,
          data: [
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
          ],
        },
      ],
      immersionChart: [
        {
          id: "report0", //广告牌的id
          center: {
            longitude: 105.922308,
            latitude: 27.965207,
            height: 850.07,
          },
          show: true,
          componentName: "AssetManagement",
          anchor: [0, 0],
          width: 248,
          height: 380,
          rotate: 50,
          data: {},
          shijiao: {
            y: 27.966117,
            x: 105.923596,
            z: 841.32,
            heading: 232.5,
            pitch: 1.2,
            roll: 0.2,
          },
        },
        {
          id: "report1", //广告牌的id
          center: {
            longitude: 105.923285,
            latitude: 27.965466,
            height: 880.07,
          },
          show: true,
          componentName: "EnvironmentTest",
          anchor: [0, 0],
          width: 365,
          height: 562,
          rotate: 50,
          data: {},
          shijiao: {
            y: 27.967418,
            x: 105.925487,
            z: 851.6,
            heading: 237,
            pitch: 0.4,
            roll: 0.6,
          },
        },
        {
          id: "report2", //广告牌的id
          center: {
            longitude: 105.927318,
            latitude: 27.964419,
            height: 922.19,
          },
          show: true,
          componentName: "AllWareHouse",
          anchor: [0, 0],
          width: 424,
          height: 394,
          rotate: 50,
          data: {},
          shijiao: {
            y: 27.965996,
            x: 105.929165,
            z: 962.27,
            heading: 229.2,
            pitch: -9,
            roll: 0.2,
          },
        },
        {
          id: "report3", //广告牌的id
          center: {
            longitude: 105.922656,
            latitude: 27.964671,
            height: 846.02,
          },
          show: true,
          componentName: "AllCar",
          anchor: [0, 0],
          width: 408,
          height: 248,
          rotate: 50,
          data: {},
          shijiao: {
            y: 27.965323,
            x: 105.923477,
            z: 861.4,
            heading: 229.2,
            pitch: -9,
            roll: 0.2,
          },
        },
      ],
      // immersionCameras:[
      //     {
      //         id:'camera0',  //广告牌的id
      //         mark:false,
      //         center:{
      //         longitude:114.2133427762207,
      //         latitude:22.274128917999413,
      //         height:60.84962996530044},
      //         show:true,
      //         componentName:'site',
      //         anchor: [0, 0],
      //         width:248,
      //         height:450,
      //         rotate:50,
      //     },
      //     {
      //         id:'camera2',  //广告牌的id
      //         mark:false,
      //         center:{longitude:114.21538557716318,latitude:22.272210821814713,height:29},
      //         show:true,
      //         componentName:'site',
      //         anchor: [0, 0],
      //         width:248,
      //         height:450,
      //         rotate:0,
      //     }
      // ] ,
      circulateRemark: true,
      cameraTimer: null,
      fiveTimer: null,
      moreFiveTimer: null,
      boardTimer: null,
      //接收定时器
      timer: null,
      temp: null,
      myView: null,
      myViews: [],
      delModels: [],
      models: [],
      modelData: [],
      nn: [],
       controlBigScreenBtnImg: require("@/assets/digital/assets/img/bigScreen/openBigScreenCharts.png"),
      controlImg: require("@/assets/digital/assets/img/bigScreen/console.png"),
      flag: true,
      userName: "Admin",
      videoShow1: true,
      videoShow2: true,
      videoShow3: true,
      intnnumber: 0,
      cameraPointNum: 4,
      value: "",
      closeShow: false,
    };
  },
  created() {
     this.$bus.$on('resetAllDevices',()=>{
       if (dataSource && dataSource.entities) {
        dataSource.entities.removeAll();
      }
        let arr = this.$store.state.angleViewList.concat(
        this.$store.state.checkedAngleViewList
      );
      arr.forEach((element) => {
        if (element.title === "视角维护" && element.switchShow) {
            this.reAll1();
        }
      });
      this.reAll2()
     })
    //  删除消防设备
    this.$bus.$on("deleteFireDevices", () => {
      if (dataSource && dataSource.entities) {
        dataSource.entities.removeAll();
      }
    });
    this.$bus.$on("cameraNavigate", () => {
   
      this.refreshModel();
    });

    // 未登录标签
     this.$bus.$on("noLoginOpenMessageAttention", () => {
      this.noLoginReAllShow();
    });
    // 未登录删除标签
     this.$bus.$on("noLoginCloseMessageAttention", () => {
      dataSource.entities.removeAll();
         var arr = this.$store.state.angleViewList1.concat(
        this.$store.state.checkedAngleViewList1
      );
      arr.forEach((element) => {
        if (element.title === "摄像头浏览" && element.switchShow) {
          this.noLoginDeviceNoFly()
        }
      });
    });
 // 未登录摄像头浏览
      this.$bus.$on("noLoginCameraNavigate", () => {
      this.noLoginRefreshModel();
    });
    // 取消摄像头浏览
    this.$bus.$on("cameraDelete", () => {
      this.circulateRemark = false;
      if (dataSource && dataSource.entities) {
        dataSource.entities.removeAll();
      }
       var arr = this.$store.state.angleViewList.concat(
        this.$store.state.checkedAngleViewList
      );
      arr.forEach((element) => {
        if (element.title === "标签展示" && element.switchShow) {
           this.reAllShow();
        }
      });
      if (this.$store.state.parkName === "南京园区") {
        $viewer.qtum.centerAt({
          y: 22.277989,
          x: 114.223356,
          z: 574.67,
          heading: 239.6,
          pitch: -21.5,
          roll: 358.9,
        });
      } else {
        $viewer.qtum.centerAt({
          y: 27.964285,
          x: 105.91934,
          z: 986.99,
          heading: 82.3,
          pitch: -18,
          roll: 0.5,
        });
      }
      //  console.log('摄像头的定时器被');
      window.clearTimeout(this.cameraTimer);
      window.clearTimeout(this.fiveTimer);
      window.clearTimeout(this.moreFiveTimer);
      window.clearTimeout(this.boardTimer);
    });
    //未登录摄像头浏览删除
    this.$bus.$on("noLoginCameraDelete", () => {
      this.circulateRemark = false;
      if (dataSource && dataSource.entities) {
        dataSource.entities.removeAll();
      }
      var arr = this.$store.state.angleViewList1.concat(
        this.$store.state.checkedAngleViewList1
      );
      arr.forEach((element) => {
        if (element.title === "标签展示" && element.switchShow) {
           this.noLoginReAllShow();
        }
      });
        $viewer.qtum.centerAt({
          y: 27.964285,
          x: 105.91934,
          z: 986.99,
          heading: 82.3,
          pitch: -18,
          roll: 0.5,
        });
      //  console.log('摄像头的定时器被');
      window.clearTimeout(this.cameraTimer);
      window.clearTimeout(this.fiveTimer);
      window.clearTimeout(this.moreFiveTimer);
      window.clearTimeout(this.boardTimer);
    });
    this.$bus.$on("deleteCamera", () => {
      if (dataSource && dataSource.entities) {
        dataSource.entities.removeAll();
      }
      // window.$viewer.entities.removeAll()
    });
    this.$bus.$on("getModules", (data, type) => {
      // console.log('type',type);
      this.modelData = [];
      this.modelData = data;
      this.$nextTick(() => {
        let cesium = document.getElementById("cesiumContainer");
        if (cesium !== null) {
          cesium.parentNode.removeChild(cesium);
        }
        let box = document.getElementById("containers");
        let div = document.createElement("div");
        div.setAttribute("id", "cesiumContainer");
        div.style.height = "100vh";
        //div.style.background="red"
        box.appendChild(div);
        // this.$store.state.myLoading = true;
        if (type === "mine") {
          this.Mineinit();
        } else {
          if (dataSource && dataSource.entities) {
            dataSource.entities.removeAll();
          }
          this.init();
        }
      });
    });
    this.$bus.$on("changeModules", (data, type) => {
      this.modelData = [];
      this.modelData = data;
      this.$nextTick(() => {
        let cesium = document.getElementById("cesiumContainer");
        if (cesium !== null) {
          cesium.parentNode.removeChild(cesium);
        }
        let box = document.getElementById("containers");
        let div = document.createElement("div");
        div.setAttribute("id", "cesiumContainer");
        div.style.height = "100vh";
        //div.style.background="red"
        box.appendChild(div);
        // this.$store.state.myLoading = true;
        if (type === "mine") {
          this.changeMineinit();
        } else {
          if (dataSource && dataSource.entities) {
            console.log("切换模型时删除所有的标签");
            dataSource.entities.removeAll();
          }
          console.log("dataSource", dataSource);
          //  dataSource.entities.removeAll();
          this.changeinit();
        }
      });
    });
    this.$bus.$on("getMineModules", (data) => {
      // console.log(data,'aaaaaaa')
      // console.log(this.myView)
      if (dataSource && dataSource.entities) {
        dataSource.entities.removeAll();
      }
      this.myViews.map((item) => {
        if (this.myView && this.myView.scene) {
          this.myView.scene.primitives.remove(item);
          this.$store.state.myLoading = false;
        }
      });
      this.mineModels(data);
    });
    this.$bus.$on("getOldModules", (data) => {
      // console.log(data,'aaaaaaa')
      // console.log(this.myView)
      if (dataSource && dataSource.entities) {
        dataSource.entities.removeAll();
      }
      this.myViews.map((item) => {
        if (this.myView && this.myView.scene) {
          this.myView.scene.primitives.remove(item);
          this.$store.state.myLoading = false;
        }
      });
      this.mineModels(data);
    });
    this.$bus.$on("cameraList", () => {
      //  this.init()
      // //console.log('设备调用了');
      // this.getDevicesList()
    });

    // 切换模式
    this.$bus.$on("changeMode", () => {
      this.$store.state.myLoading = true;
      if (dataSource && dataSource.entities) {
        dataSource.entities.removeAll();
      }
      window.clearTimeout(this.timer);
      // setTimeout(()=>{
      //  dataSource.entities.removeAll();
      // },5000)
      this.$store.state.myLoading = false;
    });
    this.$bus.$on("reportViewing", () => {
      this.clickBigScreenBtn();
    });
    this.$bus.$on("getInit", () => {
      //  this.init()
      this.getParkBuildModel();
    });
    // CesiumWallBillboard(this.$store);
    let that = this;
    this.$bus.$on("editModule", (data) => {
      that.flag = data;
      that.$store.state.areaInfoShow = false;
      that.$store.state.editModuleShow = true;
    });
    that.$bus.$on("initAllPoint", () => {
      alert(11111111);
      // let a =  dataSource.entities.getById(that.$store.state.setAreaId)
      // dataSource.entities.remove(a);
      // dataSource.entities = dataSource.entities || []
      if (dataSource && dataSource.entities) {
        dataSource.entities.removeAll();
      }
      that.reAll();
    });

    that.$bus.$on("resetAllPoint", () => {
     
      if (dataSource && dataSource.entities) {
        dataSource.entities.removeAll();
      }
      that.$store.state.angleViewList &&
        that.$store.state.angleViewList.map((item) => {
          
          if (item.title === "设备维护" && item.switchShow) {
           
            that.reDevices();
          }
        });
      that.$store.state.checkedAngleViewList &&
        that.$store.state.checkedAngleViewList.map((item) => {
          
          if (item.title === "设备维护" && item.switchShow) {
           
            that.reDevices();
          }
        });
      that.reAll1();
    });

    //设备加标签
    that.$bus.$on("deviceAttention", () => {
      that.reAll();
    });
    //删除所有的设备及标签
    that.$bus.$on("closeAllAttention", () => {
      dataSource.entities.removeAll();
    });
    that.$bus.$on("setfiresShow", (data) => {
      that.firesShow = data;
    });
    that.$bus.$on("setleaderConcern", (data) => {
      this.bubbleChart &&
        this.bubbleChart.map((val) => {
          val.show = data;
        });
    });
    that.$bus.$on("sethealthConcern", (data) => {
      that.healthConcern = data;
    });
    //标签
    that.$bus.$on("openMessageAttention", () => {
      that.reAllShow();
    });

    //视角维护打开加载标签
    that.$bus.$on("perspectiveOpenAllPoint", () => {
      that.reAll1();
    });

    //删除标签重新渲染标签
    that.$bus.$on("delPointPerspectiveOpenAllPoint", () => {
      dataSource.entities.removeAll();
        that.$store.state.angleViewList &&
        that.$store.state.angleViewList.map((item) => {
          
          if (item.title === "设备维护" && item.switchShow) {
           
            that.reDevices();
          }
        });
      that.$store.state.checkedAngleViewList &&
        that.$store.state.checkedAngleViewList.map((item) => {
          
          if (item.title === "设备维护" && item.switchShow) {
           
            that.reDevices();
          }
        });
      that.reAll1();
    });

    //设备维护打开加载设备
    that.$bus.$on("deviceOpenAlldevice", () => {
      that.reAll2();
    });
    //删除标签
    that.$bus.$on("closeMessageAttention", () => {
      dataSource.entities.removeAll();
      that.reAll3();
    });
    // 设备
    that.$bus.$on("openDeviceAttention", (obj) => {
      //选中状态
      console.log(1111111, obj.device.switchShow);
      if (obj && obj.device && obj.device.switchShow) {
        console.log(2222222);
        that.reDevices();
      } else if (obj && obj.device && !obj.device.switchShow) {
        //未选中，判断point是否存在
        dataSource.entities.removeAll();
        console.log(33333, obj);
        //point存在
        if (
          obj &&
          obj.point &&
          obj.point.length !== 0 &&
          obj.point[0].switchShow
        ) {
          that.rePoint();
        } else if (obj && obj.point && obj.point.length === 0) {
          //point不存在
          this.$store.state.myLoading = false;
        }
        //that.reDevices()
      }
    });
    // 删除设备
    that.$bus.$on("closeDeviceAttention", () => {
      if (dataSource && dataSource.entities) {
        dataSource.entities.removeAll();
      }
      this.$store.state.myLoading = false;
      that.reAll1();
    });

    // 加载单个摄像头
    that.$bus.$on("getSingleCamera", (item, index) => {
      item.num = `${index}`;
      let tmpObj = {
        id: item.id,
        title: item.title,
        num: item.num,
        center: {
          longitude: item.longitude,
          latitude: item.latitude,
          height: item.height,
        },
        tagname: "摄像头" + item.id,
        perspective: {
          y: item.latitude + 0.0014277634220078994,
          x: item.longitude + 0.000982449335353408,
          z: item.height + 35,
          heading: 220.7,
          pitch: -6.2,
          roll: 0.2,
        },
      };
      addCameras(dataSource, that, tmpObj);
    });

    // 加载标签
    that.$bus.$on("getSingleTag", (item, index) => {
      console.log("itemxx", item);
      item.num = `${index}`;
      let tmpObj = {
        id: item.id,
        title: item.title,
        num: item.num,
        center: {
          longitude: item.longitude,
          latitude: item.latitude,
          height: item.height,
          parkName: item.parkName,
          buildingName: item.buildingName,
          floor: item.floor,
          comment: item.comment,
        },
        tagname: "信息标签" + item.id,
        perspective: {
          y: item.latitude + 0.0014277634220078994,
          x: item.longitude + 0.000982449335353408,
          z: item.height + 35,
          heading: 220.7,
          pitch: -6.2,
          roll: 0.2,
        },
      };
      addPoints(dataSource, that, tmpObj);
    });
  },
  computed: {},
  mounted() {
    setTimeout(() => {
      this.dataShow = true;
    }, 3000);
    // 消防设备使用情况
    this.$bus.$on(
      "addFirePop",
      (data) => {
        console.log("data", data);
        this.fireShow = false;
        let fires = [];
        fires.push(data);
        this.fireBubbleChart = [];
        this.fireBubbleChart = fires;

        this.firesShow = true;
        setTimeout(() => {
          this.fireBubbleChart.forEach((item) => {
            addpopUp(item);
          });
        });
      },
      1000
    );
   // 消防器材的生成和删除
    this.$bus.$on("fireoncernEvent", (item) => {
      // 删除领导视察的
      this.leaderBubbleArr.map(element=>{
        element.element.style.display = 'none'
      })  
      // 删除卫生关注的
       this.bubbleArr.map(element=>{
        element.element.style.display = 'none'
      })
      if (item.switchShow) {
        window.$viewer.entities.removeAll();
        dataSource.entities.removeAll();
        this.healthConcern = false;
        this.bubbleChart &&
          this.bubbleChart.map((val) => {
            val.show = false;
          });
        if (!this.firesShow) {
          this.firesShow = true;
        }
        this.fireDevices();
        this.openRoad();
        this.fireBubbleTime++;
        if (this.fireBubbleTime === 1) {
          let fireArr=[]
          setTimeout(() => {
            this.fireBubbleChart.forEach((item) => {
              addpopUp(item);
               fireArr.push({
                element: document.getElementById(item.id),
                id: item.id,
                longitude: item.center.longitude,
                latitude: item.center.latitude,
                height: item.center.height,
                anchor: item.anchor,
              });
            });
              this.fireArr = fireArr;
          }, 100);
        } else {
           this.fireArr.map((element) => {
            element.element.style.display = "block";
          });
          this.firesShow = true;
        }
      } else {
        window.$viewer.entities.removeAll();
        dataSource.entities.removeAll();
        this.firesShow = false;
      }
    });
  
   // 卫生关注
    this.$bus.$on("healthConcernEvent", (item) => {
       this.leaderBubbleArr.map(element=>{
        element.element.style.display = 'none'
      })  
         // 关闭消防关注气泡
        this.fireArr.map(element=>{
        element.element.style.display = 'none'
      })  
      window.$viewer.entities.removeAll();
      dataSource.entities.removeAll();
      this.firesShow = false;
      this.bubbleChart &&
        this.bubbleChart.map((val) => {
          val.show = false;
        });
      if (item.switchShow) {
        this.workAreaBillboard.forEach((item) => {
          addFeature(item);
        });
        this.healthBubbleTime++;
        if (this.healthBubbleTime === 1) {
          this.healthConcern = true;
          let bubbleArr = [];
          setTimeout(() => {
            this.healthBubbleChart.forEach((item) => {
              addpopUp(item);
              bubbleArr.push({
                element: document.getElementById(item.id),
                id: item.id,
                longitude: item.center.longitude,
                latitude: item.center.latitude,
                height: item.center.height,
                anchor: item.anchor,
              });
            });
            this.bubbleArr = bubbleArr;
          }, 100);
        } else {
          this.healthConcern = true;
          this.bubbleArr.map((element) => {
            element.element.style.display = "block";
          });
        }
        this.healthPoint.forEach((element) => {
          addRubbishPoint(dataSource, element);
        });
      } else {
        window.$viewer.entities.removeAll();
        dataSource.entities.removeAll();
        this.healthConcern = false;
        this.bubbleArr.map((element) => {
          element.element.style.display = "none";
        });
      }
    });
    this.$bus.$on('leaderConcernEvent',(item)=>{
     this.bubbleArr.map(element=>{
        element.element.style.display = 'none'
      })  
      this.fireArr.map(element=>{
        element.element.style.display = 'none'
      })    
        if(item.switchShow){
           this.leaderBubbleTime++; 
           if(this.leaderBubbleTime === 1){
            this.bubbleChart&&this.bubbleChart.map(val=>{
              val.show = true
            })
            let leaderBubbleArr = []
                  //  this.leaderConcern = true
                 setTimeout(()=>{    
                   this.bubbleChart.forEach(item=>{
                    addpopUp(item)
                leaderBubbleArr.push({
                element: document.getElementById(item.id),
                id: item.id,
                longitude: item.center.longitude,
                latitude: item.center.latitude,
                height: item.center.height,
                anchor: item.anchor,
              })
               this.leaderBubbleArr = leaderBubbleArr
                      })
                 },100)
           }else{
               this.bubbleChart&&this.bubbleChart.map(val=>{
                     val.show = true
            }) 
            this.leaderBubbleArr.map(element=>{
               element.element.style.display = 'block'
             })  
           }
          
        }else{
             let cencerList=[
               {"y":27.97004,"x":105.921713,"z":1249.97,"heading":133,"pitch":-23.8,"roll":1},
               {"y":27.969263,"x":105.920325,"z":1156.3,"heading":133,"pitch":-23.8,"roll":1},
               {"y":27.967531,"x":105.919368,"z":1096.08,"heading":133,"pitch":-23.8,"roll":1}
             ]
              window.$viewer.entities.removeAll();
              this.bubbleChart.forEach((val,index)=>{
                setTimeout(()=>{
                   $viewer.qtum.centerAt(cencerList[index])
                },3000*index)
               
                setTimeout(()=>{
                  this.bubbleChart[index].show = false
                  this.leaderBubbleArr[index].element.style.display = 'none'
                },1500+3000*index)
              })
                setTimeout(()=>{
                $viewer.qtum.centerAt({
                  y: 27.964285,
                  x: 105.91934,
                  z: 986.99,
                  heading: 82.3,
                  pitch: -18,
                  roll: 0.5,
                  });
               },8000) 


            //  dataSource.entities.removeAll();  
             
        }
     })

    this.$store.state.cesMenuShow = true;
    if(this.$store.state.isLogin){
      this.initData();
    }
    
    // getDevicePageList({
    //   limit: 10,
    //   current: 1,
    // })
    //   .then((res) => {
    //     if (res.code == 0) {
    //       this.$store.state.devicePageList = res.result.list;
    //       this.$store.state.couldBeBindDeviceList = this.$store.state.devicePageList.filter(
    //         (item, index) => {
    //           return (
    //             item.altitude == 0.0 &&
    //             item.latitude == 0.0 &&
    //             item.longitude == 0.0
    //           );
    //         }
    //       );
    //     }
    //   })
    //   .catch((e) => {
    //     this.$message.warning(e || "获取设备分页列表失败!");
    //   });
    
      this.getParkBuildModel();
    
  },
  beforeDestroy() {
    if (window.$viewer) {
      window.dataSource = null;
      if (window.$viewer.dataSources) {
        window.$viewer.dataSources.removeAll(true);
      }
      window.$viewer.destroy();
    }
    window.$viewer = null;
    window.drawControl = null;
    clearInterval(timer);
    clearInterval(timerofproduct);
  },
  methods: {
    // 未登录摄像头浏览
   noLoginRefreshModel() {
             let cameraArry = [
                  {
                      "latitude": 27.965626043145793,
                      "name": "监控室",
                      "id": "36405514-a509-42f8-baba-dfb79d46ac2a",
                      "longitude": 105.92746773067974,
                      "height": 899.1859511444095
                  },
                  {
                      "latitude": 27.96417167351249,
                      "name": "办公室执行机构",
                      "id": "5b701d41-ba4a-4e0c-ae44-e2300ce9a5e8",
                      "longitude": 105.92442734082462,
                      "height": 851.9460076462658
                  }
            ]
            let devices = [];
            let deviceIds = [];
            for (let item of cameraArry) {
              this.$store.state.cameraDeviceList.push(item.id);
              if (
                item.height == 0.0 &&
                item.latitude == 0.0 &&
                item.longitude == 0.0
              ) {
                continue;
              }
              let tmpObj = {
                id: item.id,
                title: item.name,
                center: {
                  longitude: item.longitude,
                  latitude: item.latitude,
                  height: item.height,
                },
                tagname: "摄像头" + item.id,
                perspective: {
                  y: item.latitude + 0.0014277634220078994,
                  x: item.longitude + 0.000982449335353408,
                  z: item.height + 35,
                  heading: 220.7,
                  pitch: -6.2,
                  roll: 0.2,
                },
              };
              deviceIds.push(item.id);
              if (devices && devices.length < 2) {
                devices.push(tmpObj);
              }
              this.$store.state.deviceBind = deviceIds;
            }
            // 初始时只展示5个跳跃的摄像头
            if (devices && devices.length > 5) {
              for (let i = 0; i <= 4; i++) {
                if (this.circulateRemark) {
                  this.cameraTimer = setTimeout(() => {
                    addCameraNav(dataSource, this, devices[i]);
                    $viewer.qtum.centerAt(devices[i].perspective);
                  }, 3000 * i);
                }
              }
              // 超过的5个直接加载
              this.moreFiveTimer = setTimeout(() => {
                for (let i = 5; i < devices.length; i++) {
                  addCameraNav(dataSource, this, devices[i]);
                }
              }, 12000);
              // 所有摄像头加载完之后飞到主视角
              this.boardTimer = setTimeout(() => {
                if (this.$store.state.parkName === "南京园区") {
                  $viewer.qtum.centerAt({
                    y: 22.277989,
                    x: 114.223356,
                    z: 574.67,
                    heading: 239.6,
                    pitch: -21.5,
                    roll: 358.9,
                  });
                } else {
                  $viewer.qtum.centerAt({
                    y: 27.964285,
                    x: 105.91934,
                    z: 986.99,
                    heading: 82.3,
                    pitch: -18,
                    roll: 0.5,
                  });
                }
              }, 12500);
            } else {
              // 摄像头个数小与5时，直接全部飞入加载
              // console.log('小于4');
              for (let i = 0; i < devices.length; i++) {
                this.cameraTimer = setTimeout(() => {
                  addCameraNav(dataSource, this, devices[i]);
                  $viewer.qtum.centerAt(devices[i].perspective);
                }, 3000 * i);
                // 加载主视角
              }
              this.boardTimer = setTimeout(() => {
                if (this.$store.state.parkName === "南京园区") {
                  $viewer.qtum.centerAt({
                    y: 22.277989,
                    x: 114.223356,
                    z: 574.67,
                    heading: 239.6,
                    pitch: -21.5,
                    roll: 358.9,
                  });
                } else {
                  $viewer.qtum.centerAt({
                    y: 27.964285,
                    x: 105.91934,
                    z: 986.99,
                    heading: 82.3,
                    pitch: -18,
                    roll: 0.5,
                  });
                }
              }, 3000 * devices.length);
            }
    },
     noLoginReAllShow() {
      var _that = this;
        let pointArray = [
            {
                "id": "6efa68af-8f21-4fb1-9ed9-c35ce6bc60ad",
                "parkName": "泸州园区",
                "buildingId": null,
                "buildingName": "矿山",
                "floor": 2,
                "name": "区域二",
                "componentPointId": null,
                "comment": "我是区域二",
                "result": null,
                "longitude": 105.92135632700449,
                "latitude": 27.964757811061755,
                "altitude": 822.6080716227353,
                "componentId": null
            },
            {
                "id": "e438994b-eed6-4b15-bc65-8977afa18048",
                "parkName": "泸州园区",
                "buildingId": null,
                "buildingName": "矿山",
                "floor": 1,
                "name": "区域一",
                "componentPointId": null,
                "comment": "我是区域一",
                "result": null,
                "longitude": 105.92289569131815,
                "latitude": 27.963926140659,
                "altitude": 846.1617124090891,
                "componentId": null
            }
        ]
        let pointlist = [];
            //console.log('y信息标签',res.result);
            for (let item of pointArray) {
              _that.$store.state.pointDeviceList.push(item.id);
              if (
                item.altitude == 0.0 &&
                item.latitude == 0.0 &&
                item.longitude == 0.0
              ) {
                continue;
              }
              let tmpObj = {
                title: item.name,
                id: item.id,
                center: {
                  longitude: item.longitude,
                  latitude: item.latitude,
                  height: item.altitude,
                  parkName: item.parkName,
                  buildingName: item.buildingName,
                  floor: item.floor,
                  comment: item.comment,
                },
                tagname: "信息标签" + item.id,
                perspective: {
                  y: item.latitude + 0.0014277634220078994,
                  x: item.longitude + 0.000982449335353408,
                  z: item.altitude + 35,
                  heading: 220.7,
                  pitch: -6.2,
                  roll: 0.2,
                },
              };

            
              pointlist.push(tmpObj);
            }

            //console.log('yPointList',pointlist);
            for (let item of pointlist) {
              addPointNewShow(dataSource, this, item);
            }
    },
    openRoad() {
      let entity = $viewer.entities.add({
        id: "Road1",
        polygon: {
          show: true,
          hierarchy: new Cesium.Cartesian3.fromDegreesArray(this.roadArr),
          width: 10,
          material: Cesium.Color.DEEPSKYBLUE.withAlpha(0.5),
          outline: true,
          // outlineColor : Cesium.Color.BLACK
        },
      });
      // 获取不规则图形的点位
      let positions = entity.polygon.hierarchy._value.positions;
      $viewer.entities.add({
        id: "Road2",
        name: "boderLine",
        polyline: {
          positions: positions,
          width: 3,
          // material :  Cesium.Color.DEEPSKYBLUE.withAlpha(1.0),
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.9,
            color: Cesium.Color.DEEPSKYBLUE.withAlpha(1.0),
          }),
          clampToGround: true,
        },
      });
      //  $viewer.entities.add({
      //    id:'Road1',
      //     polyline: {
      //         show:true,
      //         positions: new Cesium.Cartesian3.fromDegreesArray(arr),
      //         width:90,
      //           distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 3000),
      //         // material: new Cesium.Color(255,255,1,1),
      //           material : new Cesium.PolylineGlowMaterialProperty({
      //              glowPower:0.5,
      //              color : Cesium.Color.DEEPSKYBLUE.withAlpha(1.0),
      //          }),
      //         clampToGround: true
      // },
      // })
      // 生成消防器材
    },
    // 生成消费设备
    fireDevices() {
      for (let item of this.fireDatas) {
        addFireDevices(dataSource, this, item);
      }
      // $viewer.qtum.centerAt({"y":27.971063,"x":105.917486,"z":1328.56,"heading":133,"pitch":-23.8,"roll":1});
    },
    // 生成摄像头了
    createBilloard() {
      this.immersionCameras.forEach((item) => {
        addFeature(item);
      });
    },

    // 摄像头浏览
    refreshModel() {
      const param = {
        parkName: this.$store.state.parkName,
      };
      getDevices(param)
        .then((res) => {
          if (res.success == true && res.code == 0) {
            let devices = [];
            let deviceIds = [];
            for (let item of res.result) {
              this.$store.state.cameraDeviceList.push(item.id);
              if (
                item.height == 0.0 &&
                item.latitude == 0.0 &&
                item.longitude == 0.0
              ) {
                continue;
              }
              let tmpObj = {
                id: item.id,
                title: item.name,
                center: {
                  longitude: item.longitude,
                  latitude: item.latitude,
                  height: item.height,
                },
                tagname: "摄像头" + item.id,
                perspective: {
                  y: item.latitude-0.002990932251235,
                  x: item.longitude-0.0004201375255,
                  z: item.height+367.9858856297402,
                  heading:1.2,
                  pitch: -52.6,
                  roll: 0.7,
                },
              };
              deviceIds.push(item.id);
              if (devices && devices.length < 2) {
                devices.push(tmpObj);
              }
              this.$store.state.deviceBind = deviceIds;
            }
            // 初始时只展示5个跳跃的摄像头
            if (devices && devices.length > 5) {
              for (let i = 0; i <= 4; i++) {
                if (this.circulateRemark) {
                  this.cameraTimer = setTimeout(() => {
                    addCameraNav(dataSource, this, devices[i]);
                    $viewer.qtum.centerAt(devices[i].perspective);
                  }, 3000 * i);
                }
              }
              // 超过的5个直接加载
              this.moreFiveTimer = setTimeout(() => {
                for (let i = 5; i < devices.length; i++) {
                  addCameraNav(dataSource, this, devices[i]);
                }
              }, 12000);
              // 所有摄像头加载完之后飞到主视角
              this.boardTimer = setTimeout(() => {
                if (this.$store.state.parkName === "南京园区") {
                  $viewer.qtum.centerAt({
                    y: 22.277989,
                    x: 114.223356,
                    z: 574.67,
                    heading: 239.6,
                    pitch: -21.5,
                    roll: 358.9,
                  });
                } else {
                  $viewer.qtum.centerAt({
                    y: 27.964285,
                    x: 105.91934,
                    z: 986.99,
                    heading: 82.3,
                    pitch: -18,
                    roll: 0.5,
                  });
                }
              }, 12500);
            } else {
              // 摄像头个数小与5时，直接全部飞入加载
              // console.log('小于4');
              for (let i = 0; i < devices.length; i++) {
                this.cameraTimer = setTimeout(() => {
                  addCameraNav(dataSource, this, devices[i]);
                  $viewer.qtum.centerAt(devices[i].perspective);
                }, 3000 * i);
                // 加载主视角
              }
              this.boardTimer = setTimeout(() => {
                if (this.$store.state.parkName === "南京园区") {
                  $viewer.qtum.centerAt({
                    y: 22.277989,
                    x: 114.223356,
                    z: 574.67,
                    heading: 239.6,
                    pitch: -21.5,
                    roll: 358.9,
                  });
                } else {
                  $viewer.qtum.centerAt({
                    y: 27.964285,
                    x: 105.91934,
                    z: 986.99,
                    heading: 82.3,
                    pitch: -18,
                    roll: 0.5,
                  });
                }
              }, 3000 * devices.length);
            }
          }
        })
        .catch(() => {});
    },
    mineModels(data) {
      this.modelData = data;
      this.modelData &&
        this.modelData.map((item) => {
          let factoryTileset = new Cesium.Cesium3DTileset({
            url: item,
          });
          // this.myView = viewer
          let tmp = this.myView.scene.primitives.add(factoryTileset);
          this.myViews.push(tmp);
          // delModels.push(factoryTileset)
          // this.delModels=delModels
          this.myView.scene.primitives.add(factoryTileset);
          this.myView.zoomTo(factoryTileset);
          let longitude = 114.209492,
            latitude = 22.27216499,
            height = 60;
          let heading = -20;
          factoryTileset.readyPromise.then(function (argument) {
            let position = Cesium.Cartesian3.fromDegrees(
              longitude,
              latitude,
              height
            );
            let mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
            let rotationX = Cesium.Matrix4.fromRotationTranslation(
              Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(heading))
            );
            Cesium.Matrix4.multiply(mat, rotationX, mat);

            let scale = Cesium.Matrix4.fromUniformScale(15);
            Cesium.Matrix4.multiply(mat, scale, mat);

            factoryTileset._root.transform = mat;
          });
        });
      this.reAll();
    },
    freshModels(data) {
      this.modelData = data;
      this.modelData &&
        this.modelData.map((item) => {
          let factoryTileset = new Cesium.Cesium3DTileset({
            url: item,
          });
          // this.myView = viewer
          let tmp = this.myView.scene.primitives.add(factoryTileset);
          this.myViews.push(tmp);
          // delModels.push(factoryTileset)
          // this.delModels=delModels
          this.myView.scene.primitives.add(factoryTileset);
          this.myView.zoomTo(factoryTileset);
          let longitude = 114.209492,
            latitude = 22.27216499,
            height = 60;
          let heading = -20;
          factoryTileset.readyPromise.then(function (argument) {
            let position = Cesium.Cartesian3.fromDegrees(
              longitude,
              latitude,
              height
            );
            let mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
            let rotationX = Cesium.Matrix4.fromRotationTranslation(
              Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(heading))
            );
            Cesium.Matrix4.multiply(mat, rotationX, mat);

            let scale = Cesium.Matrix4.fromUniformScale(15);
            Cesium.Matrix4.multiply(mat, scale, mat);

            factoryTileset._root.transform = mat;
          });
        });
      this.reAll();
    },
    removeModels() {
      if (window.$viewer.dataSources) {
        window.$viewer.dataSources.removeAll(true);
      }
      if (this.delModels.length > 0) {
        this.delModels.map((item) => {
          // //console.log("item", item);
          item.show = false;
        });
      }
      const viewer = window.$viewer;
      const delModel = [];
      this.modelData.forEach((item) => {
        let factoryTileset = new Cesium.Cesium3DTileset({
          url: item,
        });
        // //console.log("item-url", item);
        viewer.scene.primitives.add(factoryTileset);
        delModel.push(factoryTileset);
        viewer.zoomTo(factoryTileset);
        let longitude = 114.209492,
          latitude = 22.27216499,
          height = 60;
        let heading = -20;
        factoryTileset.readyPromise.then(function (argument) {
          let position = Cesium.Cartesian3.fromDegrees(
            longitude,
            latitude,
            height
          );
          let mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
          let rotationX = Cesium.Matrix4.fromRotationTranslation(
            Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(heading))
          );
          Cesium.Matrix4.multiply(mat, rotationX, mat);

          let scale = Cesium.Matrix4.fromUniformScale(15);
          Cesium.Matrix4.multiply(mat, scale, mat);
          factoryTileset._root.transform = mat;
        });
      });
      this.delModels = delModel;
      // //console.log("this.delModel", this.delModel);
    },
    getParkBuildModel() {
      let pathList = new Array();
      let flag = false;
 
        this.Mineinit();
        // //console.log("结果：", pathList)

        // //console.log(res,'reee')
        //   const models=[]
        //   try{
        //       res.result&&res.result.map(item=>{
        //      item.buildingList&&item.buildingList.map(item1=>{
        //         if(item1.models.length>0){
        //             item1.models&&item1.models.map(item2=>{
        //             if(item2.isInternal===1&&item2.state===0){
        //               models.push(item2.path)
        //            }
        //             this.modelData = models
        //             this.init();
        //             //console.log(item.parkName)
        //             throw new Error('jjjjjjj')
        //           })
        //         }else{

        //         }
        //      })
        //   })
        //   }catch(e){

        //   }
      
    },
    reAll() {
      var _that = this;
      let params = {
        componentId: "2",
        parkName: this.$store.state.parkName,
      };
      setTimeout(() => {
        getPoint(params).then(async (res) => {
          if (res.success == true && res.code == 0) {
            let pointlist = [];
            //console.log('y信息标签',res.result);
            for (let item of res.result) {
              _that.$store.state.pointDeviceList.push(item.id);
              if (
                item.altitude == 0.0 &&
                item.latitude == 0.0 &&
                item.longitude == 0.0
              ) {
                continue;
              }
              let tmpObj = {
                id: item.id,
                center: {
                  longitude: item.longitude,
                  latitude: item.latitude,
                  height: item.altitude,
                  parkName: item.parkName,
                  buildingName: item.buildingName,
                  floor: item.floor,
                  comment: item.comment,
                },
                tagname: "信息标签" + item.id,
                perspective: {
                  y: item.latitude + 0.0014277634220078994,
                  x: item.longitude + 0.000982449335353408,
                  z: item.altitude + 35,
                  heading: 220.7,
                  pitch: -6.2,
                  roll: 0.2,
                },
              };
              pointlist.push(tmpObj);
            }
            //console.log('yPointList',pointlist);
            for (let item of pointlist) {
              addPoint(dataSource, this, item);
            }
          }
        });
        const param = {
          parkName: this.$store.state.parkName,
        };
        getDevices(param)
          .then(async (res) => {
            if (res.success == true && res.code == 0) {
              let devices = [];
              for (let item of res.result) {
                _that.$store.state.cameraDeviceList.push(item.id);
                //  _that.$store.state.cameraDeviceList = this.uniqueArr(_that.$store.state.cameraDeviceList)
                if (
                  item.height == 0.0 &&
                  item.latitude == 0.0 &&
                  item.longitude == 0.0
                ) {
                  continue;
                }
                let tmpObj = {
                  id: item.id,
                  center: {
                    longitude: item.longitude,
                    latitude: item.latitude,
                    height: item.height,
                  },
                  tagname: "摄像头" + item.id,
                  perspective: {
                    y: item.latitude + 0.0014277634220078994,
                    x: item.longitude + 0.000982449335353408,
                    z: item.height + 35,
                    heading: 220.7,
                    pitch: -6.2,
                    roll: 0.2,
                  },
                };
                devices.push(tmpObj);
              }
              //console.log(devices,'1233333')
              // getVideoStream({
              //   channel: _that.$store.state.cameraDeviceList,
              // })
              //   .then((res) => {
              //     // //console.log("videos tream");

              //     _that.$store.state.cameraVideoList = res.result;
              //   })
              //   .catch((err) => {
              //     _that.$message.warning(err || "获取视频流失败！");
              //   });
              for (let item of devices) {
                addCamera(dataSource, this, item);
                // await billboardVideo(
                //   window.$viewer,
                //   Cesium,
                //   this,
                //   {
                //     longitude: Number(item.center.longitude),
                //     latitude: Number(item.center.latitude),
                //     height: Number(item.center.height),
                //   },
                //   item
                // );
              }
            }
          })
          .catch((e) => {
            // _that.$message.warning(e || "获取设备列表失败！");
          });
      }, 0);

      //  _that.$store.state.myLoading = false
      setTimeout(() => {
        _that.$store.state.myLoading = false;
      }, 5000);
    },
    reAll1() {
      console.log('加载标签了');
      var _that = this;
      let params = {
        componentId: "2",
        parkName: this.$store.state.parkName,
      };

      setTimeout(() => {
        getPoint(params).then(async (res) => {
          if (res.success == true && res.code == 0) {
            let pointlist = [];
            let pointlistNew = [];
            //console.log('y信息标签',res.result);
            for (let item of res.result) {
              _that.$store.state.pointDeviceList.push(item.id);
              if (
                item.altitude == 0.0 &&
                item.latitude == 0.0 &&
                item.longitude == 0.0
              ) {
                continue;
              }
              let tmpObj = {
                title: item.name,
                id: item.id,
                center: {
                  longitude: item.longitude,
                  latitude: item.latitude,
                  height: item.altitude,
                  parkName: item.parkName,
                  buildingName: item.buildingName,
                  floor: item.floor,
                  comment: item.comment,
                },
                tagname: "信息标签" + item.id,
                perspective: {
                  y: item.latitude + 0.0014277634220078994,
                  x: item.longitude + 0.000982449335353408,
                  z: item.altitude + 35,
                  heading: 220.7,
                  pitch: -6.2,
                  roll: 0.2,
                },
              };

            
              pointlist.push(tmpObj);
            }

            //console.log('yPointList',pointlist);
            for (let item of pointlist) {
              addPointNew(dataSource, this, item);
            }
          }
        });
      }, 0);

      //  _that.$store.state.myLoading = false
      setTimeout(() => {
        _that.$store.state.myLoading = false;
      }, 5000);
    },
    newReAll1() {
      console.log('mmmmm')
      var _that = this;
      let params = {
        componentId: "2",
        parkName: this.$store.state.parkName,
      };

      setTimeout(() => {
        getPoint(params).then(async (res) => {
          if (res.success == true && res.code == 0) {
            let pointlist = [];
            //console.log('y信息标签',res.result);
            for (let item of res.result) {
              _that.$store.state.pointDeviceList.push(item.id);
              if (
                item.altitude == 0.0 &&
                item.latitude == 0.0 &&
                item.longitude == 0.0
              ) {
                continue;
              }
              let tmpObj = {
                title: item.name,
                id: item.id,
                center: {
                  longitude: item.longitude,
                  latitude: item.latitude,
                  height: item.altitude,
                  parkName: item.parkName,
                  buildingName: item.buildingName,
                  floor: item.floor,
                  comment: item.comment,
                },
                tagname: "信息标签" + item.id,
                perspective: {
                  y: item.latitude + 0.0014277634220078994,
                  x: item.longitude + 0.000982449335353408,
                  z: item.altitude + 35,
                  heading: 220.7,
                  pitch: -6.2,
                  roll: 0.2,
                },
              };

             
              pointlist.push(tmpObj);
            }

            //console.log('yPointList',pointlist);
            for (let item of pointlist) {
              addPointNewShow(dataSource, this, item);
            }
          }
        });
      }, 0);

      //  _that.$store.state.myLoading = false
      setTimeout(() => {
        _that.$store.state.myLoading = false;
      }, 5000);
    },
    reAllShow() {
      var _that = this;
      let params = {
        componentId: "2",
        parkName: this.$store.state.parkName,
      };

      setTimeout(() => {
        getPoint(params).then(async (res) => {
          if (res.success == true && res.code == 0) {
            let pointlist = [];
            let pointlistNew = [];
            //console.log('y信息标签',res.result);
            for (let item of res.result) {
              _that.$store.state.pointDeviceList.push(item.id);
              if (
                item.altitude == 0.0 &&
                item.latitude == 0.0 &&
                item.longitude == 0.0
              ) {
                continue;
              }
              let tmpObj = {
                title: item.name,
                id: item.id,
                center: {
                  longitude: item.longitude,
                  latitude: item.latitude,
                  height: item.altitude,
                  parkName: item.parkName,
                  buildingName: item.buildingName,
                  floor: item.floor,
                  comment: item.comment,
                },
                tagname: "信息标签" + item.id,
                perspective: {
                  y: item.latitude + 0.0014277634220078994,
                  x: item.longitude + 0.000982449335353408,
                  z: item.altitude + 35,
                  heading: 220.7,
                  pitch: -6.2,
                  roll: 0.2,
                },
              };

              let aa = {
                MyId: "message",
                id: item.id,
                center: {
                  longitude: item.longitude,
                  latitude: item.longitude,
                  height: item.altitude,
                },
                perspective: {
                  y: item.latitude + 0.0014277634220078994,
                  x: item.longitude + 0.000982449335353408,
                  z: item.altitude + 35,
                  heading: 220.7,
                  pitch: -6.2,
                  roll: 0.2,
                },
                show: true,
                componentName: "MineMonitor",
                anchor: [0, 0],
              };
              pointlist.push(tmpObj);
              pointlistNew.push(aa);
            }

            //console.log('yPointList',pointlist);
            for (let item of pointlist) {
              addPointNewShow(dataSource, this, item);
            }
          }
        });
      }, 0);

      //  _that.$store.state.myLoading = false
      setTimeout(() => {
        _that.$store.state.myLoading = false;
      }, 5000);
    },
    rePoint() {
      var _that = this;
      let params = {
        componentId: "2",
        parkName: this.$store.state.parkName,
      };

      setTimeout(() => {
        getPoint(params).then(async (res) => {
          if (res.success == true && res.code == 0) {
            let pointlist = [];
            //console.log('y信息标签',res.result);
            for (let item of res.result) {
              _that.$store.state.pointDeviceList.push(item.id);
              if (
                item.altitude == 0.0 &&
                item.latitude == 0.0 &&
                item.longitude == 0.0
              ) {
                continue;
              }
              let tmpObj = {
                id: item.id,
                center: {
                  longitude: item.longitude,
                  latitude: item.latitude,
                  height: item.altitude,
                  parkName: item.parkName,
                  buildingName: item.buildingName,
                  floor: item.floor,
                  comment: item.comment,
                },
                tagname: "信息标签" + item.id,
                perspective: {
                  y: item.latitude + 0.0014277634220078994,
                  x: item.longitude + 0.000982449335353408,
                  z: item.altitude + 35,
                  heading: 220.7,
                  pitch: -6.2,
                  roll: 0.2,
                },
              };
              pointlist.push(tmpObj);
            }
            for (let item of pointlist) {
              addPointNew(dataSource, this, item);
            }
          }
        });
      }, 0);

      //  _that.$store.state.myLoading = false
      setTimeout(() => {
        _that.$store.state.myLoading = false;
      }, 5000);
    },
    reDevices() {
      var _that = this;
      let params = {
        componentId: "2",
        parkName: this.$store.state.parkName,
      };

      setTimeout(() => {
        const param = {
          parkName: this.$store.state.parkName,
        };
        getDevices(param)
          .then(async (res) => {
            if (res.success == true && res.code == 0) {
              let devices = [];
              for (let item of res.result) {
                _that.$store.state.cameraDeviceList.push(item.id);
                if (
                  item.height == 0.0 &&
                  item.latitude == 0.0 &&
                  item.longitude == 0.0
                ) {
                  continue;
                }
                let tmpObj = {
                  id: item.id,
                  center: {
                    longitude: item.longitude,
                    latitude: item.latitude,
                    height: item.height,
                  },
                  tagname: "摄像头" + item.id,
                  perspective: {
                    y: item.latitude + 0.0014277634220078994,
                    x: item.longitude + 0.000982449335353408,
                    z: item.height + 35,
                    heading: 220.7,
                    pitch: -6.2,
                    roll: 0.2,
                  },
                };
                devices.push(tmpObj);
              }
              for (let item of devices) {
                // addCamera(dataSource, this, item);
                addCameraNew(dataSource, this, item);
              }
            }
          })
          .catch((e) => {});
      }, 0);

      //  _that.$store.state.myLoading = false
      setTimeout(() => {
        _that.$store.state.myLoading = false;
      }, 5000);
    },
    reAll2() {
      var _that = this;
      let params = {
        componentId: "2",
        parkName: this.$store.state.parkName,
      };

      setTimeout(() => {
        const param = {
          parkName: this.$store.state.parkName,
        };
        getDevices(param)
          .then(async (res) => {
            if (res.success == true && res.code == 0) {
              //console.log('resss',res.result);
              let devices = [];
              for (let item of res.result) {
                _that.$store.state.cameraDeviceList.push(item.id);
                //  _that.$store.state.cameraDeviceList = this.uniqueArr(_that.$store.state.cameraDeviceList)
                if (
                  item.height == 0.0 &&
                  item.latitude == 0.0 &&
                  item.longitude == 0.0
                ) {
                  continue;
                }
                let tmpObj = {
                  id: item.id,
                  center: {
                    longitude: item.longitude,
                    latitude: item.latitude,
                    height: item.height,
                  },
                  title: item.name,
                  tagname: "摄像头" + item.id,
                  perspective: {
                    y: item.latitude,
                    x: item.longitude,
                    z: item.height + 25,
                    heading: 220.7,
                    pitch: -6.2,
                    roll: 0.2,
                  },
                };
                devices.push(tmpObj);
              }
              //console.log(devices,'1233333')
              // getVideoStream({
              //   channel: _that.$store.state.cameraDeviceList,
              // })
              //   .then((res) => {
              //     // //console.log("videos tream");

              //     _that.$store.state.cameraVideoList = res.result;
              //   })
              //   .catch((err) => {
              //     _that.$message.warning(err || "获取视频流失败！");
              //   });
              for (let item of devices) {
              addCameraNew(dataSource, this, item);
              }
            }
          })
          .catch((e) => {
            // _that.$message.warning(e || "获取设备列表失败！");
          });
      }, 0);

      //  _that.$store.state.myLoading = false
      setTimeout(() => {
        _that.$store.state.myLoading = false;
      }, 5000);
    },
     reAll3() {
      var _that = this;
      let params = {
        componentId: "2",
        parkName: this.$store.state.parkName,
      };

      setTimeout(() => {
        const param = {
          parkName: this.$store.state.parkName,
        };
        getDevices(param)
          .then(async (res) => {
            if (res.success == true && res.code == 0) {
              //console.log('resss',res.result);
              let devices = [];
              for (let item of res.result) {
                _that.$store.state.cameraDeviceList.push(item.id);
                //  _that.$store.state.cameraDeviceList = this.uniqueArr(_that.$store.state.cameraDeviceList)
                if (
                  item.height == 0.0 &&
                  item.latitude == 0.0 &&
                  item.longitude == 0.0
                ) {
                  continue;
                }
                let tmpObj = {
                  id: item.id,
                  center: {
                    longitude: item.longitude,
                    latitude: item.latitude,
                    height: item.height,
                  },
                  title: item.name,
                  tagname: "摄像头" + item.id,
                  perspective: {
                    y: item.latitude + 0.0014277634220078994,
                    x: item.longitude + 0.000982449335353408,
                    z: item.height + 35,
                    heading: 220.7,
                    pitch: -6.2,
                    roll: 0.2,
                  },
                };
                devices.push(tmpObj);
              }
              //console.log(devices,'1233333')
              // getVideoStream({
              //   channel: _that.$store.state.cameraDeviceList,
              // })
              //   .then((res) => {
              //     // //console.log("videos tream");

              //     _that.$store.state.cameraVideoList = res.result;
              //   })
              //   .catch((err) => {
              //     _that.$message.warning(err || "获取视频流失败！");
              //   });
              for (let item of devices) {
              addCameraNav(dataSource, this, item);
              }
            }
          })
          .catch((e) => {
            // _that.$message.warning(e || "获取设备列表失败！");
          });
      }, 0);

      //  _that.$store.state.myLoading = false
      setTimeout(() => {
        _that.$store.state.myLoading = false;
      }, 5000);
    },
    noLoginDeviceNoFly() {
      var _that = this;
       let cameraArry = [
                  {
                      "latitude": 27.965626043145793,
                      "name": "监控室",
                      "id": "36405514-a509-42f8-baba-dfb79d46ac2a",
                      "longitude": 105.92746773067974,
                      "height": 899.1859511444095
                  },
                  {
                      "latitude": 27.96417167351249,
                      "name": "办公室执行机构",
                      "id": "5b701d41-ba4a-4e0c-ae44-e2300ce9a5e8",
                      "longitude": 105.92442734082462,
                      "height": 851.9460076462658
                  }
            ]
        let devices = [];
              for (let item of cameraArry) {
                _that.$store.state.cameraDeviceList.push(item.id);
                //  _that.$store.state.cameraDeviceList = this.uniqueArr(_that.$store.state.cameraDeviceList)
                if (
                  item.height == 0.0 &&
                  item.latitude == 0.0 &&
                  item.longitude == 0.0
                ) {
                  continue;
                }
                let tmpObj = {
                  id: item.id,
                  center: {
                    longitude: item.longitude,
                    latitude: item.latitude,
                    height: item.height,
                  },
                  title: item.name,
                  tagname: "摄像头" + item.id,
                  perspective: {
                    y: item.latitude + 0.0014277634220078994,
                    x: item.longitude + 0.000982449335353408,
                    z: item.height + 35,
                    heading: 220.7,
                    pitch: -6.2,
                    roll: 0.2,
                  },
                };
                devices.push(tmpObj);
              }
             
              for (let item of devices) {
              addCameraNav(dataSource, this, item);
              }
    },
    
    uniqueArr(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].id == arr[j].id) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    },
    initData() {
      if (
        localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo")) &&
        JSON.parse(localStorage.getItem("userInfo"))["aiHorizon"]
      ) {
        this.userName = JSON.parse(localStorage.getItem("userInfo"))[
          "aiHorizon"
        ].name;
      }
      this.$store.state.earlyWarnigShow = false;
      this.$store.state.eventDetailShow = false;
      this.$store.state.areaInfoShow = false;
      this.$store.state.echartWhole = false;
    },
    // 矿山加载
    Mineinit() {
      let url = haoutil.system.getRequestByName(
        "config",
        "static/common/config/ksconfig.json"
      );
      let map = qtum3d.createMap({
        id: "cesiumContainer",
        url: url,
        success: async (viewer, i) => {
          viewer.scene.debugShowFramesPerSecond = true; //显示帧数
          viewer.scene.requestRenderMode = true;
          window.$viewer = viewer;
          $("#location_mars_jwd").hide();
          // 东经121.506377，北纬31.245105
          let center = {
            y: 27.964285,
            x: 105.91934,
            z: 986.99,
            heading: 82.3,
            pitch: -18,
            roll: 0.5,
          };
          let polyline = viewer.entities.add({
            id: "line",
            show: true,
            polyline: {
              position: [
                Cesium.Cartesian3.fromDegrees(118, 32, 0),
                Cesium.Cartesian3.fromDegrees(119, 32, 0),
                Cesium.Cartesian3.fromDegrees(117, 32, 0),
              ],
            },
            width: 2,
            material: Cesium.Color.WHITE,
          });
          this.flyTo(center);
          let _that = this;
          dataSource = new Cesium.CustomDataSource();
          this.closeShow = true;
          this.$store.state.myLoading = false;
          $viewer.dataSources.add(dataSource);
          this.drawControl = new qtum3d.Draw(window.$viewer, {}).on(
            qtum3d.draw.event.DrawCreated,
            function (o) {
              _that.drawControl.setVisible(false);
              _that.drawControl;
            }
          );
          window.drawControl = this.drawControl;
          var utc = Cesium.JulianDate.fromDate(new Date("2019/10/04 16:00:00"));
          viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(
            utc,
            9,
            new Cesium.JulianDate()
          );
          let layerWork = qtum3d.layer.createLayer(
            {
              type: "3dtiles",
              name: "矿山",
              url:
                this.$store.state.downPath +
                "/ai-daemon-download/model/luzhou/Scene/tileset.json",
              maximumScreenSpaceError: 1,
              offset: {
                z: 75,
              },
              visible: !0,
            },
            viewer
          );

          // this.fireDevices();
          viewer.scene.requestRenderMode = true;
          // viewer.dataSources.add(
          //   Cesium.CzmlDataSource.load("static/data/czml/camera.czml")
          // );
          // 加载模型文件
          // viewer.dataSources.add(
          //   Cesium.CzmlDataSource.load("static/data/czml/envMachine.czml")
          // );
          window.measureSurface = new qtum3d.Measure({
            viewer: viewer,
            removeScreenSpaceEvent: !0,
            label: {
              font_size: 20,
              border_width: 4,
              background: !1,
            },
          });
          // 控制缩放范围;
          // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 100;
          viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40000;
          // addMapBox(viewer);
          // 禁止相机进入地底
          // (function limitCameraToGround(isOpen) {
          //   if (limitCameraHandler) {
          //     limitCameraHandler();
          //     limitCameraHandler = null;
          //   }
          //   limitCameraHandler = viewer.camera.changed.addEventListener(
          //     function () {
          //       if (
          //         viewer.camera._suspendTerrainAdjustment &&
          //         viewer.scene.mode === Cesium.SceneMode.SCENE3D
          //       ) {
          //         viewer.camera._suspendTerrainAdjustment = !isOpen;
          //         viewer.camera._adjustHeightForTerrain();
          //       }
          //     }
          //   );
          // })();
          // 挂载摄像头图表
          // createCameraBillboard();
          // 监听视角高度，控制图标组件显示隐藏
          viewer.camera.changed.addEventListener(() => {
            "";
            let height = viewer.camera.positionCartographic.height;
            this.showByCamera = height >= 5000 ? false : true;
          });
          //方量分析
          viewer.scene.globe.depthTestAgainstTerrain = !0;
          let that = this;
          window.measureObj = new qtum3d.analysi.MeasureVolume(window.$viewer, {
            callBack: function () {
              document.getElementById(
                "txtHeight"
              ).value = window.measureObj.minHeight.toFixed(0);
            },
          });
          // this.fireDevices()
          viewer.scene.globe.depthTestAgainstTerrain = false;
          let helper = new Cesium.EventHelper();
          helper.add(viewer.scene.globe.tileLoadProgressEvent, function (e) {
            if (e == 0) {
              setTimeout(() => {
                that.$store.state.myLoading = false;
              }, 2000);
            }
          });
          // changeRightList();
          // 给车辆绑定对应信息
          // this.vehicleAboutApi();
        },
      });
    },

    changeMineinit() {
      let url = haoutil.system.getRequestByName(
        "config",
        "static/common/config/ksconfig.json"
      );
      let map = qtum3d.createMap({
        id: "cesiumContainer",
        url: url,
        success: async (viewer, i) => {
          viewer.scene.debugShowFramesPerSecond = true; //显示帧数
          viewer.scene.requestRenderMode = true;
          window.$viewer = viewer;
          $("#location_mars_jwd").hide();
          // 东经121.506377，北纬31.245105
          let center = {
            y: 27.964285,
            x: 105.91934,
            z: 986.99,
            heading: 82.3,
            pitch: -18,
            roll: 0.5,
          };
          let polyline = viewer.entities.add({
            id: "line",
            show: true,
            polyline: {
              position: [
                Cesium.Cartesian3.fromDegrees(118, 32, 0),
                Cesium.Cartesian3.fromDegrees(119, 32, 0),
                Cesium.Cartesian3.fromDegrees(117, 32, 0),
              ],
            },
            width: 2,
            material: Cesium.Color.WHITE,
          });
          this.flyTo(center);
          let _that = this;
          dataSource = new Cesium.CustomDataSource();
          $viewer.dataSources.add(dataSource);
          this.drawControl = new qtum3d.Draw(window.$viewer, {}).on(
            qtum3d.draw.event.DrawCreated,
            function (o) {
              _that.drawControl.setVisible(false);
              _that.drawControl;
            }
          );
          window.drawControl = this.drawControl;
          var utc = Cesium.JulianDate.fromDate(new Date("2019/10/04 16:00:00"));
          viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(
            utc,
            9,
            new Cesium.JulianDate()
          );
          let layerWork = qtum3d.layer.createLayer(
            {
              type: "3dtiles",
              name: "矿山",
              // url: "http://124.71.153.0:31080/mmodel/model/Scene/3DTiles.json",
              url:
                "http://10.22.90.2:8081/ai-daemon-download/model/luzhou/Scene/tileset.json",
              maximumScreenSpaceError: 1,
              offset: {
                z: 75,
              },
              visible: !0,
            },
            viewer
          );

          // this.renderModel();
          viewer.scene.requestRenderMode = true;
          // viewer.dataSources.add(
          //   Cesium.CzmlDataSource.load("static/data/czml/camera.czml")
          // );
          // 加载模型文件
          // viewer.dataSources.add(
          //   Cesium.CzmlDataSource.load("static/data/czml/envMachine.czml")
          // );
          window.measureSurface = new qtum3d.Measure({
            viewer: viewer,
            removeScreenSpaceEvent: !0,
            label: {
              font_size: 20,
              border_width: 4,
              background: !1,
            },
          });
          // 控制缩放范围;
          // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 100;
          viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40000;
          // addMapBox(viewer);
          // 禁止相机进入地底
          // (function limitCameraToGround(isOpen) {
          //   if (limitCameraHandler) {
          //     limitCameraHandler();
          //     limitCameraHandler = null;
          //   }
          //   limitCameraHandler = viewer.camera.changed.addEventListener(
          //     function () {
          //       if (
          //         viewer.camera._suspendTerrainAdjustment &&
          //         viewer.scene.mode === Cesium.SceneMode.SCENE3D
          //       ) {
          //         viewer.camera._suspendTerrainAdjustment = !isOpen;
          //         viewer.camera._adjustHeightForTerrain();
          //       }
          //     }
          //   );
          // })();
          // 挂载摄像头图表
          // createCameraBillboard();
          // 监听视角高度，控制图标组件显示隐藏
          viewer.camera.changed.addEventListener(() => {
            "";
            let height = viewer.camera.positionCartographic.height;
            this.showByCamera = height >= 5000 ? false : true;
          });
          //方量分析
          viewer.scene.globe.depthTestAgainstTerrain = !0;
          let that = this;
          window.measureObj = new qtum3d.analysi.MeasureVolume(window.$viewer, {
            callBack: function () {
              document.getElementById(
                "txtHeight"
              ).value = window.measureObj.minHeight.toFixed(0);
            },
          });
          viewer.scene.globe.depthTestAgainstTerrain = false;
          let helper = new Cesium.EventHelper();
          helper.add(viewer.scene.globe.tileLoadProgressEvent, function (e) {
            if (e == 0) {
              setTimeout(() => {
                that.$store.state.myLoading = false;
              }, 2000);
            }
          });
          this.bubbleArr.forEach((element) => {
            addpopUpReCreated(element);
            element.element.style.display = "none";
          });

           this.leaderBubbleArr.forEach((element) => {
            addpopUpReCreated(element);
            element.element.style.display = "none";
          });
           this.fireArr.forEach((element) => {
            addpopUpReCreated(element);
            element.element.style.display = "none";
          });
          // changeRightList();
          // 给车辆绑定对应信息
          // this.vehicleAboutApi();
        },
      });
    },

    init() {
      ////console.log(this.modelData,'1111')
      var primitives, a;
      let url = haoutil.system.getRequestByName(
        "config",
        "static/common/config/config.json"
      );
      this.map = qtum3d.createMap({
        id: "cesiumContainer",
        url: url,
        success: async (viewer, i) => {
          window.$viewer = viewer;
          viewer.scene.globe.depthTestAgainstTerrain = false;
          viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider(
            {}
          );
          $("#location_mars_jwd").hide();
          this.flyTo({
            y: 22.277989,
            x: 114.223356,
            z: 574.67,
            heading: 239.6,
            pitch: -21.5,
            roll: 358.9,
          });
          (primitives = new Cesium.PrimitiveCollection()),
            viewer.scene.primitives.add(primitives);

          var _that = this;
          dataSource = new Cesium.CustomDataSource();
          this.$store.state.myLoading = false;

          $viewer.dataSources.add(dataSource);
          this.drawControl = new qtum3d.Draw(window.$viewer, {}).on(
            qtum3d.draw.event.DrawCreated,
            function (o) {
              _that.drawControl.setVisible(false);
              _that.drawControl;
            }
          );
          window.drawControl = this.drawControl;
          // 生成摄像头
          // this.createBilloard()
          // 获取拾取点位
          // leftClickEntity(this,viewer,Cesium)
          var utc = Cesium.JulianDate.fromDate(new Date("2019/10/04 21:00:00"));
          viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(
            utc,
            9,
            new Cesium.JulianDate()
          );
          this.modelData &&
            this.modelData.map((item) => {
              let factoryTileset = new Cesium.Cesium3DTileset({
                url: item,
              });
              this.myView = viewer;
              let tmp = viewer.scene.primitives.add(factoryTileset);
              this.myViews.push(tmp);
              // delModels.push(factoryTileset)
              // this.delModels=delModels
              viewer.scene.primitives.add(factoryTileset);
              viewer.zoomTo(factoryTileset);
              let longitude = 114.209492,
                latitude = 22.27216499,
                height = 60;
              let heading = -20;
              factoryTileset.readyPromise.then(function (argument) {
                let position = Cesium.Cartesian3.fromDegrees(
                  longitude,
                  latitude,
                  height
                );
                let mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
                let rotationX = Cesium.Matrix4.fromRotationTranslation(
                  Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(heading))
                );
                Cesium.Matrix4.multiply(mat, rotationX, mat);

                let scale = Cesium.Matrix4.fromUniformScale(15);
                Cesium.Matrix4.multiply(mat, scale, mat);

                factoryTileset._root.transform = mat;
              });
            });
          addMapBox(viewer);
          viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1;
          viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40000;
          let helper = new Cesium.EventHelper();
          helper.add(viewer.scene.globe.tileLoadProgressEvent, function (e) {
            if (e == 0) {
              // console.log("矢量切片加载完成时的回调");
            }
          });
          // this.putReport()
        },
      });
    },
    changeinit() {
      ////console.log(this.modelData,'1111')
      var primitives, a;
      let url = haoutil.system.getRequestByName(
        "config",
        "static/common/config/config.json"
      );
      this.map = qtum3d.createMap({
        id: "cesiumContainer",
        url: url,
        success: async (viewer, i) => {
          window.$viewer = viewer;
          viewer.scene.globe.depthTestAgainstTerrain = false;
          viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider(
            {}
          );
          $("#location_mars_jwd").hide();
          this.flyTo({
            y: 22.277989,
            x: 114.223356,
            z: 574.67,
            heading: 239.6,
            pitch: -21.5,
            roll: 358.9,
          });
          (primitives = new Cesium.PrimitiveCollection()),
            viewer.scene.primitives.add(primitives);

          var _that = this;
          dataSource = new Cesium.CustomDataSource();
          this.$store.state.myLoading = false;

          $viewer.dataSources.add(dataSource);
          this.drawControl = new qtum3d.Draw(window.$viewer, {}).on(
            qtum3d.draw.event.DrawCreated,
            function (o) {
              _that.drawControl.setVisible(false);
              _that.drawControl;
            }
          );
          window.drawControl = this.drawControl;
          var utc = Cesium.JulianDate.fromDate(new Date("2019/10/04 21:00:00"));
          viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(
            utc,
            9,
            new Cesium.JulianDate()
          );
          this.modelData &&
            this.modelData.map((item) => {
              let factoryTileset = new Cesium.Cesium3DTileset({
                url: item,
              });
              this.myView = viewer;
              let tmp = viewer.scene.primitives.add(factoryTileset);
              this.myViews.push(tmp);
              // delModels.push(factoryTileset)
              // this.delModels=delModels
              viewer.scene.primitives.add(factoryTileset);
              viewer.zoomTo(factoryTileset);
              let longitude = 114.209492,
                latitude = 22.27216499,
                height = 60;
              let heading = -20;
              factoryTileset.readyPromise.then(function (argument) {
                let position = Cesium.Cartesian3.fromDegrees(
                  longitude,
                  latitude,
                  height
                );
                let mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
                let rotationX = Cesium.Matrix4.fromRotationTranslation(
                  Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(heading))
                );
                Cesium.Matrix4.multiply(mat, rotationX, mat);

                let scale = Cesium.Matrix4.fromUniformScale(15);
                Cesium.Matrix4.multiply(mat, scale, mat);

                factoryTileset._root.transform = mat;
              });
            });
          addMapBox(viewer);
          viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1;
          viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40000;
          let helper = new Cesium.EventHelper();
          helper.add(viewer.scene.globe.tileLoadProgressEvent, function (e) {
            if (e == 0) {
              // console.log("矢量切片加载完成时的回调");
            }
          });
          // this.putReport()
        },
      });
    },
    flyTo(center) {
      $viewer.qtum.centerAt(center);
    },
    addbounced() {
      addechartspop(this.intnnumber);
    },
    // 使图表可拖拽
    setCharts(el) {
      let _this = this;
      el.onmousedown = function (e) {
        var disx = e.pageX - el.offsetLeft;
        var disy = e.pageY - el.offsetTop;
        el.style.cursor = "Move";
        document.onmousemove = function (e) {
          e.preventDefault;
          var width = el.parentElement.clientWidth - el.offsetWidth;
          var height = el.parentElement.clientHeight - el.offsetHeight;
          var x = e.pageX - disx;
          var y = e.pageY - disy;
          // min方法保证不会超过右边界，max保证不会超过左边界
          x = Math.min(Math.max(0, x), width);
          y = Math.min(Math.max(0, y), height);
          el.style.left = x + "px";
          el.style.top = y + "px";
          _this.$emit(
            "containerReportPosition",
            el.childNodes[1].getAttribute("id"),
            { x, y }
          );
        };
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
          el.style.cursor = "Default";
        };
      };
    },
   clickBigScreenBtn() {
      // 操作vuex
      this.$store.state.echartWhole = !this.$store.state.echartWhole;
      this.controlBigScreenBtnImg = this.$store.state.echartWhole
        ? require("@/assets/digital/assets/img/bigScreen/closeBigScreenCharts.png")
        : require("@/assets/digital/assets/img/bigScreen/openBigScreenCharts.png");
      // this.$store.state.echartOne = true;
      // this.$store.state.echartTwo = true;
      // this.$store.state.echartThree = true;
      // this.$store.state.echartFour = true;
      // this.$store.state.echartFive = true;
      // this.$store.state.echartSix = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.aa {
  position: absolute;
  width: 500px;
  left: -500px;
}
/deep/ .draw-tooltip {
  display: none;
}
/deep/ .cesium-performanceDisplay {
  background-color: rgba(40, 40, 40, 0.7);
  padding: 7px;
  display: none;
  border-radius: 5px;
  border: 1px solid #444;
  font: 700 12px sans-serif;
}
.mainPageHeadParkName {
  float: left;
  display: inline-block;
  max-width: 200px;
  word-break: keep-all; // 不换行
  white-space: nowrap; // 不换行
  overflow: hidden;
  text-overflow: ellipsis;
}
.wrap {
  width: 100%;
  height: 56px;
  position: absolute;
  left: 0;
  position: absolute;
  top: 0;
  z-index: 9;
  background: #252525;
  .mainPageHeadRight1 {
    color: #fff;
    font-size: 18px;
    left: 24px;
    position: absolute;
    top: 16px;
    z-index: 9;
  }
  .editModele {
    cursor: pointer;
    width: 128px;
    height: 32px;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #25bcff;
    line-height: 32px;
    text-align: center;
    background: rgba(37, 188, 255, 0.2);
    border: 1px solid #25bcff;
    right: 24px;
    position: absolute;
    top: 12px;
    z-index: 9;
  }
}

.main-page {
  position: relative;
  .big-screen-btn {
    position: absolute;
    z-index: 9;
    width: 107px;
    height: 32px;
    margin-left: 24px;
    margin-top: 20px;
    cursor: pointer;
  }
  .big-screen-btns {
    position: absolute;
    z-index: 9;
    width: 92px;
    height: 32px;
    margin-left: 150px;
    margin-top: 20px;
    cursor: pointer;
  }
  .mainPageHeadImg {
    position: absolute;
    z-index: 9;
    top: 0;
    width: 100%;
  }

  .mainPageHead {
    font-size: 36px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #ffffff;
    line-height: 54px;
    width: 368px;
    top: 20px;
    left: calc(50% - 179px);
    position: absolute;
    z-index: 9;
  }
  .mainPageHeadRight {
    color: #fff;
    font-size: 18px;
    right: 20px;
    position: absolute;
    top: 12px;
    z-index: 9;
  }

  .exitImg {
    width: 24px;
    cursor: pointer;
  }
  .userImg {
    width: 20px;
  }
  .click-create-point {
    cursor: pointer;
    position: fixed;
    bottom: 50px;
    left: 50%;
    width: 200px;
    height: 40px;
    transform: translateX(-50%);
    background-color: skyblue;
    font-size: 20px;
    line-height: 30px;
    border: 5px solid yellowgreen;
    text-align: center;
    border-radius: 5px;
  }
  .pick-device {
    position: fixed;
    bottom: 50px;
    left: 33%;
    width: 200px;
    height: 40px;
  }
  #cesiumContainer {
    height: 100vh;
  }
  .main {
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
  @keyframes fade-scale {
    0% {
      opacity: 0;
      transform: scale(0.2);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  ::v-deep.draw-tooltip {
    display: none;
  }
}
</style>
