// index.js
// 引入校验规则
import WxValidate from '../../util/WxValidate.js'
import  util from '../../util/util.js';
import api from '../../config/api.js';
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
const { $Toast } = require('../../dist/base/index');
Page({
data: {
  // 车牌号的
  carNum: [],
    valtime:"",
    valTenantFk:"",
    currentInput: 0,
    keyboard: false,
    keyboardType: 1,
    newEnergy: true,
    // 省份输入
    provinces: [
      ['京','津','渝', '沪', '冀','晋','辽','吉','黑','苏'],
      ['浙','皖', '闽', '赣', '鲁', '豫', '鄂', '湘','粤','琼'],
      [ '川','贵', '云','陕','甘','青','蒙', '桂',  '宁','新'],
      [   '藏', '使','领','警','学','港','澳'],
    ],
    url:'/static/image/common/success.png',
    failurl:'/static/image/common/fail.png',
  text:'访客信息登记完成',
  title:'访客登记',
  form:{
    visitorName	:'',
    visitorContact:'',
    sex:0,
    startTime:"",
    visitorType:'1',
    tenantFk:""
  },
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
  countries: [],
  formData: {
  },
  barHeight: wx.getSystemInfoSync().statusBarHeight,
},
onLoad() {

  // this.getuser()
  this.initValidate()//验证规则函数
  this.initData()
},
initData(){
  util.request(api.getTenantList, 
    {
    }, 'GET').then(res => {
     if(res.data){
       this.setData({
        countries: res.data
       })

     }
    })
  
},
// 显示省份的虚拟键盘
showProvinceBoard() {
  this.setData({
    keyboard: true,
    currentInput: 0,
    keyboardType: 1
  })
},

chooseProvince(event) {
  // 触发省份键盘
  const { val } = event.currentTarget.dataset
  this.setData({
    'carNum[0]': val,
    currentInput: 1,
    keyboardType: 2
  })
  // 每次都触发 change 事件，通知父组件
  this.triggerEvent('change', this.data.carNum.join(''))
},

    /**
     * 删除选定省份
     */
    delProvince() {
      this.setData({
        'carNum[0]': ''
      })
      // 每次都触发 change 事件，通知父组件
      this.triggerEvent('change', this.data.carNum.join(''))
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
    visitorName: {
      required: true,
      minlength:2
    },
    visitReason: {
      required: true,
      minlength:2
    },
    visitorContact:{
      required:true,
      tel:true
    }
  }
  const messages = {
    visitorName: {
      required: '请填写访客姓名',
      minlength:'请输入正确的访客姓名'
    },
    visitorContact:{
      required:'请填写联系方式',
      tel:'请填写正确的联系方式'
    },
    visitReason: {
      required: '请填写造访理由',
      minlength:'请输入正确的造访理由'
    },
  }
  this.WxValidate = new WxValidate(rules, messages)
},
//调用验证函数
formSubmit: function(e) {

   const params = e.detail.value

  // //校验表单
  if (!this.WxValidate.checkForm(params)) {
 
    const error = this.WxValidate.errorList[0]
    this.handleText(error)   
    return false
  }else{
    if(this.data.form.startTime){
      let driveFlag = 0
      if(params.vehicleNumber){
        driveFlag = 1
      }
      util.request(api.saveVisitorRecord, 
        {
          driveFlag:driveFlag,
          visitorName: params.visitorName,
          visitorContact: params.visitorContact,
          sex:this.data.current,
          tenantFk:this.data.form.tenantFk,
          startTime: this.data.form.startTime,
          visitorType:'1',
          vehicleNumber: params.vehicleNumber,
          visitReason: params.visitReason
        }, 'POST').then(res => {
          if(res.code === 0 ){
            wx.navigateTo({//wx.switchTab自带API跳转到tabBar页面  
 
               url:`../prompt/prompt?url=${this.data.url}&title=${this.data.title}&text=${res.msg}&path=../index/index`
          })  
        }else{
            wx.navigateTo({//wx.switchTab自带API跳转到tabBar页面  
 
              url:`../prompt/prompt?url=${this.data.failurl}&title=${this.data.title}&text=${res.msg}&path=../index/index`
            }) 
        }
        })
    }else{
      $Toast({
        content: '请选择造访时间'
      });
      return false;
    }
    //saveVisitorRecord
  }

},
handleText (error) {
  $Toast({
      content: error.msg
  });
},
// 时间
bindChange: function (e) {
  
  this.setData({
    valtime:e.detail.value
  })
 console.log(233,this.data.valtime)

},
// 对象
bindChangeObject: function (e) {

  const val = e.detail.value
  this.setData({
    valTenantFk:this.data.countries[val[0]]
  })
 
  
},
    // 显示弹框(底部)
    showBottom(e){
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
      child.showModal();

      
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
      if(!this.data.valTenantFk){
        this.setData({
          visitor: this.data.countries[0].tenantName,
          "form.tenantFk": this.data.countries[0].id
        })
      }else{
        this.setData({
          visitor: this.data.valTenantFk.tenantName,
          "form.tenantFk": this.data.valTenantFk.id
        })
      }
    },
    handleCancelObject(){
      const child = this.selectComponent('.modal-content-object')
      child.hideModal()
    },
    // 隐藏弹框
    handleHide(){
      const child = this.selectComponent('.modal-content')
      child.hideModal()
      if(!this.data.valtime){
        this.setData({
           'form.startTime': '2022-10-09 00:00:00',
           year: 2022,
           month: 10,
           day: 9,
           hour: '00',
           minute: '00',
       })
     }else{
  
        this.setData({
          year: this.data.years[this.data.valtime[0]],
          month: this.data.months[this.data.valtime[1]],
          day: this.data.days[this.data.valtime[2]],
          hour: this.data.days[this.data.valtime[3]]-1,
          minute: this.data.days[this.data.valtime[4]]-1,
        })
        if(this.data.hour<10){
          this.setData({
            hour: "0"+this.data.hour
          })
        }
        if(this.data.minute<10){
          this.setData({
            minute: "0"+this.data.minute
          })
        }
        let day = this.data.day;
        if(day < 10){
          day = "0" + day
        }
        this.setData({
          'form.startTime': this.data.year + '-' + this.data.month  + '-' + day + " " + this.data.hour+":"+this.data.minute+":00"
        })
     }
    },
    // 隐藏弹框
    handleCancel(){
      const child = this.selectComponent('.modal-content')
      child.hideModal()
  },
})
