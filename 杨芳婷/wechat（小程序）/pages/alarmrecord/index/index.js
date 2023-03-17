// index.js
// 引入校验规则
import WxValidate from '../../../util/WxValidate.js'
import  util from '../../../util/util.js';
import api from '../../../config/api.js';
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
  barHeight: wx.getSystemInfoSync().statusBarHeight,
  title:'告警记录',
  imgList:[ "/static/image/common/fail.png",
  "/static/image/common/success.png",
  "/static/image/common/success.png"],
  urls:['/static/image/common/fail.png'],
  records:[],
  show:true,
  urls:[],
  url:'/static/image/common/success.png',
  text:'访客信息登记完成',
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
      value:'--'
    },
    conditionVisible: false,
},
onLoad() {
  // this.getuser()
  this.initValidate()//验证规则函数
  this.initData();
  this.initDate();
},
showCondition() {
  this.setData({
      conditionVisible: !this.data.conditionVisible
  })
},
initData(){
  util.request(api.unHandleList, 
    {
    }, 'GET').then(res => {
      if(res.data){
        this.setData({
          records:res.data
        })
      }
    
    })
},
initDate(){
  util.request(api.queryDateRecord, 
    {
    }, 'GET').then(res => {
      if(res.data){
        this.setData({
          conditionList:res.data,
          choosedCondition:{
            label:res.data[0]&&res.data[0].label,
            value:res.data[0]&& res.data[0].value
          }
        })
      }
    })
},
initDataSecond(){
  util.request(api.handleList, 
    {
      date:this.data.choosedCondition.value
    }, 'GET').then(res => {
      if(res.data){
        this.setData({
          records:res.data
        })
      }
    })
    
},
// 改变查询项
onChnageCondition(e) {
  const list = this.data.conditionList
  list.forEach(item => {
      if (item.value === e.currentTarget.dataset.id) {
          item.select = true
          this.setData({
              'choosedCondition.label': item.label,
              'choosedCondition.value': item.value
          })
      } else {
          item.select = false
      }
  })
  this.setData({
      conditionList: list
  })
  this.initDataSecond();
},
preview(event) {
  console.log(event.currentTarget.dataset.src)
  let currentUrl = event.currentTarget.dataset.src
  wx.previewImage({
    current: currentUrl, // 当前显示图片的http链接
    urls: this.data.imgList // 需要预览的图片http链接列表
  })
},
// 维修
handleRepaire(e){

  wx.navigateTo({      //wx.switchTab自带API跳转到tabBar页面  
    url:'../handle/handle?id='+e.currentTarget.dataset.id
})   
},
// tab切换
changeTapApply(){
   this.setData({
     show:true
   })
   this.initData();
},
changeTapRecord(){
  this.setData({
    show:false
  })
  this.initDataSecond();
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
  // console.log(e);

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

    // 隐藏弹框
    handleHide(){
      const child = this.selectComponent('.modal-content')
      child.hideModal()
    },
   
})
