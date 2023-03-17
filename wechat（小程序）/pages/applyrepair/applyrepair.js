// index.js
const util = require('../../util/util.js');
const api = require('../../config/api.js');
// 引入校验规则
import WxValidate from '../../util/WxValidate.js'
const { $Toast } = require('../../dist/base/index');
Page({
data: { 
   // 房间号数据 
    dormitoryVal:'',
    totalList: [], //可选楼层以及房间的全部数据
    dormitoriesArr: [], //可选楼层（一级选项）
    dormitoriesArrId: [], //可选楼层的id（一级选项）
    roomArr: [], //可选楼层的房间号（二级选项）
    roomArrId:[],
    bedArr: [],
    multiArray: [],
    multiIndex: [0, 0], //默认选中的是第一个楼层-第一个房间
    title:'报修申请',
    recordAll:[],
    recordNotAll:[],
    records:[],
    show:true,
    urls:[],
    url:'/static/image/common/success.png',
    text:'text',
    form:{
      equipmentType:'',
      region:'',
      name:'',
      applicantContact:'',
      repairContent:''
    },
    isShow:false,
    // 设备类型
    deviceTypes: ["智能水电", "智能照明", "智能照明","其他"],
    deviceTypesId:['0','1','2','3','4'],
    deviceIndex: null,
    equipmentType:null,

    // 所属区域
    regionList: [],
    regionListId:[],
    regionListIndex: null,
    regionId:'',
    region:null,

    // 楼宇
    buildingList: [],
    buildingListId:[],
    buildingListIndex: null,
    buildingNameId:'',
    buildingId:'',
    buildingName:null,

    //时间选择列表
    conditionList: [
    ],
    choosedCondition: { 
    },
    conditionVisible: false,
    showsAll:false
  },
// 数据显示是否完全
showAll(){
     this.setData({
       showsAll:!this.data.showsAll
     })
     if(this.data.showsAll){
        this.setData({
          records:this.data.recordAll
        })
     }else{
      this.setData({
        records:this.data.recordNotAll
      })
     }
},
onLoad() {
  this.getDateList()
  //验证规则函数
  this.initValidate()
  this.getRegionList()
  this.repairRecord()
},
bindDeviceChange: function(e) {
  let equipmentType=this.data. deviceTypesId[e.detail.value]
  this.setData({
      deviceIndex: e.detail.value,
      equipmentType:equipmentType,
      ['form.equipmentType']:equipmentType,
      deviceShow:1,
  })
},
// 房间号选择
bindMultiPickerChange(event) {
  let dormitoryIndex = event.detail.value[0]; //第一列楼层下标
  let roomIndex = event.detail.value[1]; //第二列房间号下标
  let dormitoryVal = this.data.dormitoriesArr[dormitoryIndex];
  let dormitoryValId=this.data.dormitoriesArrId[dormitoryIndex];
  let roomVal = this.data.roomArr[dormitoryIndex][roomIndex];
  let roomValId = this.data.roomArrId[dormitoryIndex][roomIndex];
  this.setData({
    dormitoryVal: dormitoryVal, //楼号
    roomVal: roomVal, //房号
    dormitoryIndex: dormitoryIndex,
    roomIndex: roomIndex,
    isChoose: 1,
    ['form.roomFk']:roomValId
  })
},

bindMultiPickerColumnChange(event) {
  var that = this
  let data = {
    multiArray: that.data.multiArray,
    multiIndex: that.data.multiIndex
  }
  data.multiIndex[event.detail.column] = event.detail.value;
  switch (event.detail.column) {
    case 0: //第一列滚动时，用第一列下标，匹配第二列的值
      for (let i = 0; i < that.data.dormitoriesArr.length; i++) {
        if (data.multiIndex[0] == i) {
          data.multiArray[1] = that.data.roomArr[i];
        }
      }
      data.multiIndex[1] = 0; //每次滚动第一列时，默认第二列第一项选中
      break;

    case 1: //第二列滚动时，用第一列下标，匹配第二列的值
      for (let i = 0; i < that.data.roomArr[data.multiIndex[0]].length; i++) {
        if (data.multiIndex[1] == i) {
          // data.multiArray[2] = that.data.bedArr[data.multiIndex[0]][i];
        }
      }
      break;
  }
  that.setData(data);
},

// 报修列表
repairRecord(){
  util.request(api.RepairRRecord,{date:this.data.choosedCondition.id}).then(res=>{
    this.setData({
      recordAll:res.data,
      records:res.data.splice(0,2),
      recordNotAll:res.data.splice(0,2),
    })
  })
},
// 获取楼宇列表
buildingList(){
  util.request(api.BuildingList,{region:this.data.regionId},"GET").then(res=>{
    let regionList=[]
    let regionListId=[]
    res.data.map(item=>{
       regionList.push(item.buildingName)
       regionListId.push(item.id)
    })
    this.setData({
      buildingList:regionList,
      buildingListId:regionListId
    })
  })
  // this.getRoom()
},
bindBuildingChange: function(e) {
  let equipmentType=this.data.buildingListId[e.detail.value]
  this.setData({
      buildingListIndex: e.detail.value,
      buildingId:equipmentType,
      dormitoryVal:'',
      roomVal:'',
      ['form.buildingName']:this.data.buildingList[e.detail.value]
  })
  // 楼宇获取房间号
  this.getRoom()
},

// 获取区域列表
getRegionList(){
  util.request(api.RegionList,{},"GET").then(res=>{
    let regionList=[]
    let regionListId=[]
    res.data.map(item=>{
       regionList.push(item.label)
       regionListId.push(item.value)
    })
    this.setData({
      regionList:regionList,
      regionListId:regionListId
    })
  })
},
bindRegionChange: function(e) {
  let equipmentType=this.data.regionListId[e.detail.value]
  this.setData({
      regionListIndex: e.detail.value,
      regionId:equipmentType,
      ['form.region']:equipmentType,
      buildingListIndex:null,
      buildingList: [],
      buildingListId:[],
      buildingNameId:'',
      buildingId:'',
      buildingName:null,
      totalList: [], 
      dormitoriesArr: [], 
      dormitoriesArrId: [], 
      roomArr: [], 
      roomArrId:[],
      bedArr: [], 
      multiArray: [],
      dormitoryVal:'',
      roomVal:'',
      ['form.roomFk']:'',
      ['form.buildingName']:''
  })
  this.buildingList()
},
// 获取日期列表
getDateList(){
  util.request(api.getDateList,{},"GET").then(res=>{
       if(res.code===0){
         let conditionList=[]
         let choosedCondition={}
         res.data.map((item,index)=>{
           if(index===0){
             choosedCondition={
              title: item.label,
              id: item.value,
            }
            conditionList.push({
              title: item.label,
              id: item.value,
              select: true
            })
           }else{
            conditionList.push({
              title: item.label,
              id: item.value,
              select: false
            })
           }
         })
       this.setData({
        conditionList:conditionList,
        choosedCondition:choosedCondition
       })
       }
  })
},
// 删除图片
deleteImg: function (e) {
  let that=this
  var imgs = this.data.urls;
  var index = e.currentTarget.dataset.index;
  wx.showModal({
    title: '提示',
    content: '确定要删除此图片吗？',
    success: function (res) {
     if (res.confirm) {
       imgs.splice(index, 1);
     } else if (res.cancel) {
       return false;    
      }
      that.setData({
        urls: imgs
       });
    }
   })
 },
//  选择框是否显示
showCondition() {
  this.setData({
      conditionVisible: !this.data.conditionVisible
  })
},
// 改变时间查询项
onChnageCondition(e) {
  const list = this.data.conditionList
  list.forEach(item => {
      if (item.id === e.currentTarget.dataset.id) {
          item.select = true
          this.setData({
              'choosedCondition.title': item.title,
              'choosedCondition.id': item.id
          })
      } else {
          item.select = false
      }
  })
  this.setData({
      conditionList: list
  })
  this.repairRecord()
},
// 按钮tab切换
changeTapApply(){
   this.setData({
     show:true
   })
},
changeTapRecord(){
  this.setData({
    show:false
  })
},
// 提示框
showModal(error) {
  wx.showModal({
    content:'error.msg',
    showCancel: false,
  })
},
//验证函数
initValidate() {
  const rules = {
    equipmentType: {
      required: true,
      minlength:1
    },
    region: {
      required: true,
      minlength:1
    },
    buildingName: {
      required: true,
      minlength:1
    },
    roomFk: {
      required: true,
      minlength:1
    },
    applicant: {
      required: true,
      minlength:2
    },
    applicantContact:{
      required:true,
      tel:true
    },
    repairContent:{
      required:false,
      maxlength:50
    }
  }
  const messages = {
    equipmentType: {
      required: '请选择设备类型',
      minlength:''
    },
    region:{
      required: '请选择所属区域',
      minlength:''
    },
    buildingName: {
      required: '请选择楼宇',
      minlength:''
    },
    roomFK: {
      required: '请选择房间号',
      minlength:''
    },
    applicant: {
      required: '请填写申请人',
      minlength:''
    },
    applicantContact:{
      required:'请填写手机号',
      tel:'请填写正确的手机号'
    },
    repairContent:{
      required:'',
      maxlength:'报修内容不能超过50个字符'
    }
  }
  this.WxValidate = new WxValidate(rules, messages)
},
//提交
formSubmit: function(e) {
  const params = e.detail.value
  params.roomName=this.data.roomVal
  params.photoList=this.data.urls
  //校验表单
  if (!this.WxValidate.checkForm(params)) {
    const error = this.WxValidate.errorList[0]
    this.handleText(error)
    return false
  }else{
    util.request(api.ApplyRepair,params,"POST").then(res=>{
      if(res.code===0){
        this.setData({
          url:'/static/image/common/success.png'
        }),
        wx.navigateTo({       
          url:`../prompt/prompt?url=${this.data.url}&title=报修申请&text=提交成功`
      })
      }else{
        this.setData({
          url:'/static/image/common/fail.png'
        }),
        wx.navigateTo({
          url:`../prompt/prompt?url=${this.data.url}&title=报修申请&text=提交失败`
      })
      }
     
    })
  }
 
},
// 信息提示
handleText (error) {
  $Toast({
      content: error.msg
  });
},

// 获取房间
getRoom(){
  util.request(api.RoomList,{id:this.data.buildingId,flag:2},"GET").then(res=>{
  var that = this;
  let totalList=res.data
  let dormitoriesArr = totalList.map((item) => {
    return item.label
  })
  let dormitoriesArrId = totalList.map((item) => {
    return item.value
  })

  let roomArr = [];
  let roomArrId=[]
  totalList.forEach(items => {
    roomArr.push(items.children.map(item => {
      return item.label
    }));
    roomArrId.push(items.children.map(item => {
      return item.value
    }));
  })
  let bedArr = [];
  totalList.forEach(items => {
    var temp1 = [];
    items.children.forEach(item => {
      var temp2 = [];
      temp1.push(temp2)
    })
  })
  that.setData({
    totalList: totalList, 
    dormitoriesArr: dormitoriesArr,
    dormitoriesArrId:dormitoriesArrId,
    roomArr: roomArr, 
    roomArrId:roomArrId,
    bedArr: bedArr, 
    multiArray: [dormitoriesArr, roomArr[0]],
  })
})
},
// 上传图片
headImage(){
      let _this=this
      wx.chooseMedia({
        count: 3,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success(res) {
          let imgs=[]
          res.tempFiles.map(item=>{
            imgs.push(item.tempFilePath)
          })
          _this.setData({
            urls:_this.data.urls.concat(imgs)
           })
        }
      })
    },
})
