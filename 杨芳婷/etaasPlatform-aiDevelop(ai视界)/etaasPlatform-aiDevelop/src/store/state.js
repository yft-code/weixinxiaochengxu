let state = {
  refreshMrak:true,
  isRemark:true,
  isLogin:'',
  algorParameter:[],
   isLogin:false,
  // 视界中心页面
  horizonShow: true,
  // right图标
  rightEcharts: true,
  //标题默认园区
  parkName: "--",
  earlyStyleShow: false,
  listShow: false,
  singleShow: false,
  equipmentSingle: false,
  perspectiveSingle: false,
  toolbarShow: false,
  cesMenuShow: false,
  videoContainerShow: [],
  tipShow: false,
  setVideoContainerShow: false,
  cameraAndMessageTipEntityUniqueId: 1,
  parkFlag: false,
  setAreaId: '',
  delPoint: true,
  delOperation: false,
  eventDetailShow: false,
  earlyWarnigShow: false,
  deviceDetailShow: false,
  areaInfoShow: false,
  areaInfoShowNew:false,
  editModuleShow: false,
  echartWhole: false,
  echartOne: true,
  echartTwo: true,
  echartThree: true,
  echartFour: true,
  echartFive: true,
  echartSix: true,
  currentBindDeviceId: '',
  couldBeBindDeviceList: [],
  devicePageList: [],
  cameraDeviceList: [],
  pointDeviceList: [],
  handleData: {},
  areaInfo: {},
  currentCameraId: '',
  cameraVideoList: [],
  storageTanks: {
    temperature: 10,
    capacity: 62,
    pressuer: 0.2,
    remaining: 38
  },
  // 删除关联只有一个设备的
  deleteOneDevice: false,
  // 删除摄像头
  deleteCameraId: {},
  cameraInfoId: '',
  // 设备id
  deviceId: '',
  // 删除点位弹框
  deleteDeviceFlag: false,
  myLoading: false,
  // 删除已关联场景的参数
  scenceParams: {},
  // 控制删除场景方法调用
  scenceDelete: false,
  // 控制按钮样式
  deviceStyle: false,
  scenceStyle: false,
  commentStyle: false,
  // 删除关联场景的参数
  deleteScenceParams: {},
  //预警事件处理页面
  handleWarning: false,
  // 视频信息
  videoArr: [],
  arr1: [],
  arr2: [],
  // entity
  entityArr: [],
  regionFlag:false,
  regionFlagNew:false,
  // 视频查看
  videoShow: false,
  // 摄像头查看
  videoCheck: false,
  videoCheckNew: false,
  videoId:'',
  // 已经绑定的设备点位
  deviceBind: [],
  allBillboardId: [],
  warningPromptNew:false,
  oldShow: false,
  messageShow:false,
  fireShow:true,
  delete:{},
  angleViewList: [
  
    {
      title: "报表查看",
      switchShow: false,
      wait:true,
    },
    {
      title: "摄像头浏览",
      switchShow: false,
      wait:true,
    },
    {
      title: "标签展示",
      switchShow: false,
      wait:true,
    },
    {
      title: "设备维护",
      switchShow: false,
      wait:true,
    },
    {
      title: "视角维护",
      switchShow: false,
      wait:true,
    },
    
    {
      title: "领导视察",
      switchShow: false,
      wait:false,
    },
    {
      title: "卫生关注",
      switchShow: false,
      wait:true,
    },
    {
      title: "消防关注",
      switchShow: false,
      wait:true,
    },
  ],
  checkedAngleViewList: [
    {
      title: "精简模式",
      switchShow: true,
      wait:true,
    },
   
    
  ],
  angleViewList1: [
  
   
    {
      title: "摄像头浏览",
      switchShow: false,
      wait:true,
    },
    {
      title: "标签展示",
      switchShow: false,
      wait:true,
    },
    
    {
      title: "领导视察",
      switchShow: false,
      wait:false,
    },
    {
      title: "卫生关注",
      switchShow: false,
      wait:true,
    },
    {
      title: "消防关注",
      switchShow: false,
      wait:true,
    },
  ],
  checkedAngleViewList1: [
    {
      title: "精简模式",
      switchShow: true,
      wait:true,
    },
   
    
  ],
  // 
  areaRemark:true,
  setVideoContainerShowNew:false,
  regionFlag:false,
  deviceFlag:false,
  warningPrompt:false,
  videoList: '',
  videoListContainer: [],
  modelShow: true,
  iframeShow:false,
  // 公共路径
  // 徐州环境
//   downPath: 'http://10.43.64.222:8881/',
//   //跳转用户中心ip
//   publicUrl: 'http://10.43.64.222:8882/',
//   //点击事件预案路径
//   preUrl: "http://10.43.64.222:8012/",
  // 下载模板路径
  // downPath: 'http://172.20.200.10:8881/',
  // //跳转用户中心ip
  // publicUrl: 'http://172.20.200.10:8882/',
  // //点击事件预案路径
  // preUrl: "http://172.20.200.10:8884/",
  //下载模板路径
  downPath: 'http://10.22.90.2:8081/',
  //跳转用户中心ip
  publicUrl: 'http://10.22.90.2:8888/',
   //点击事件预案路径
  preUrl: "http://10.22.90.23:8012/",
  // downPath: 'http://58.213.164.118:18081/ai/',
  // publicUrl:'http://58.213.164.118:18081/',
  // preUrl:"http://58.213.164.118:18081/",
  rightinfo: {
    cubesize: "工号:22122",
    storagemode: "运作时间:1.5H",
    state: "良好",
    storage: "功率使用状态",
    productst: "搅拌机",
    value: 56
  }
};
export default state;
