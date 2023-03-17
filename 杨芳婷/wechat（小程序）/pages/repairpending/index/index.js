// index.js
const util = require('../../../util/util.js');
const api = require('../../../config/api.js');
// 引入校验规则
import WxValidate from '../../../util/WxValidate.js'
const date = new Date()
const years = []
const months = []
const days = []
const hours=[]
const minutes=[]
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
} 
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  days.push(i)
}
for (let i = 0; i <= 23; i++) {
  hours.push(i)
}
for (let i = 0; i <= 59; i++) {
  minutes.push(i)
}
const { $Toast } = require('../../../dist/base/index');
Page({
data: {
  title:'维修待办',
  imgList:[ "/static/image/common/fail.png",
  "/static/image/common/success.png",
  "/static/image/common/success.png"],
  urls:['/static/image/common/fail.png'],
  records:[],
  handledRRecords:[],
  show:true,
  urls:[],
  url:'/static/image/common/success.png',
  text:'访客信息登记完成',
  // title:'访客登记',
  isShow:false,
  visitor:'',
  // 时间选择器
  years: years,
  year: '',
  months: months,
  month: '',
  days: days,
  hours:hours,
  minutes:minutes,
  day: '',
  hour:'',
  minute:'',
  value: [9999, 9, 8],
  // 弹框
  type:'bottom',
  showModal: false, // 显示modal弹窗
  current:0,
  showTopTips: false,
  countries: ["南京园区", "智慧矿山", "宿迁"],
  formData: {
  },
  tabType: 'tab1',
  key: 'tab1',
  conditionList: [
  ],
  choosedCondition: {
  },
  conditionVisible: false,
},
onLoad() {
  this.getDateList()
  this.unHandleList()
  // this.getuser()
  this.initValidate()//验证规则函数
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
         this.handledList()
  })
},
// 获取未处理列表
unHandleList(){
  util.request(api.UnhandleList,{}).then(res=>{
    this.setData({
      recordAll:res.data,
      records:res.data
    })
  })
},
// 已处理列表
handledList(){
  util.request(api.HandledList,{date:this.data.choosedCondition.id}).then(res=>{
    this.setData({
      recordAll:res.data,
      handledRRecords:res.data
    })
  })
},
showCondition() {
  this.setData({
      conditionVisible: !this.data.conditionVisible
  })
},
// 改变查询项
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
  this.handledList()
},
preview(event) {
  let currentUrl = event.currentTarget.dataset.src
  wx.previewImage({
    current: currentUrl, // 当前显示图片的http链接
    urls: this.data.imgList // 需要预览的图片http链接列表
  })
},
// 维修
handleRepaire(e){
  wx.navigateTo({      //wx.switchTab自带API跳转到tabBar页面  
    url:`../handle/handle?id=${e.currentTarget.dataset.id}`
})   
},
// tab切换
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
// 校验
//报错 
showModal(error) {
  wx.showModal({
    content: error.msg,
    showCancel: false,
  })
},
//验证函数
initValidate() {
  const rules = {
    name: {
      required: true,
      minlength:2
    },
    phone:{
      required:true,
      tel:true
    }
  }
  const messages = {
    name: {
      required: '请填写姓名',
      minlength:'请输入正确的名称'
    },
    phone:{
      required:'请填写手机号',
      tel:'请填写正确的手机号'
    }
  }
  this.WxValidate = new WxValidate(rules, messages)
},
//调用验证函数
formSubmit: function(e) {
  const params = e.detail.value
  console.log('params',params);
  //校验表单
  if (!this.WxValidate.checkForm(params)) {
    const error = this.WxValidate.errorList[0]
    this.handleText(error)
    return false
  }
  wx.navigateTo({//wx.switchTab自带API跳转到tabBar页面  
    // url:'../mycar/index/index'      //跳转到非tabBar页面:wx.navigateTo代替wx.switchTab即可
    url:`../prompt/prompt?url=${this.data.url}&title=${this.data.title}&text=${this.data.text}`
})   
  // this.showModal({
  //   msg: '提交成功'
  // })
},
handleText (error) {
  $Toast({
      content: error.msg
  });
},
// 时间
bindChange: function (e) {
  const val = e.detail.value
  this.setData({
    year: this.data.years[val[0]],
    month: this.data.months[val[1]],
    day: this.data.days[val[2]],
    hour: this.data.days[val[3]]-1,
    minute: this.data.days[val[4]]-1,
  })
},
// 对象
bindChangeObject: function (e) {
  // console.log('e',e);
  const val = e.detail.value
  this.setData({
    visitor: this.data.countries[val[0]],
  })
},
    // 显示弹框(底部)
    showBottom(){
      this.setData({
        type:'bottom'
      })
      const child = this.selectComponent('.modal-content')
      child.showModal()
    },
    showObjectBottom(){
      this.setData({
        type:'bottom'
      })
      const child = this.selectComponent('.modal-content-object')
      child.showModal()
    },
    changeBoy(){
      this.setData({
        current:0
      })
    },
    changeGril(){
      this.setData({
        current:1
      })
    },
    handleHideObject(){
      const child = this.selectComponent('.modal-content-object')
      child.hideModal()
    },
    // 隐藏弹框
    handleHide(){
      const child = this.selectComponent('.modal-content')
      child.hideModal()
    },
    headImage(){
      let _this=this
      wx.chooseMedia({
        count: 3,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success(res) {
          console.log('res',res);
          let imgs=[]
          res.tempFiles.map(item=>{
            imgs.push(item.tempFilePath)
          })
          _this.setData({
            urls:_this.data.urls.concat(imgs)
           })
           console.log(_this.data.urls)
        }
      })
    },
})
