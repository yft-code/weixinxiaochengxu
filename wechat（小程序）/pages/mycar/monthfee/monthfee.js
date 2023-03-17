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
   // 车牌号的
   id:"",
   val:"",
   carNum: [],
   tenantFk:'',
   currentInput: 0,
   keyboard: false,
   keyboardType: 1,
   newEnergy: true,
   currentMonth:0,
   // 省份输入
   provinces: [
     ['京','津','渝', '沪', '冀','晋','辽','吉','黑','苏'],
     ['浙','皖', '闽', '赣', '鲁', '豫', '鄂', '湘','粤','琼'],
     [ '川','贵', '云','陕','甘','青','蒙', '桂',  '宁','新'],
     [   '藏', '使','领','警','学','港','澳'],
   ],
  title:'月费办理',
  wapper:[
    {
    number:'300',
    detail:'1个月'
  },
  {
    number:'300',
    detail:'2个月'
  },
  {
    number:'300',
    detail:'3个月'
  },
  {
    number:'300',
    detail:'6个月'
  },
  {
    number:'300',
    detail:'12个月'
  },
  {
    number:'300',
    detail:'其他'
  }],
  url:'/static/image/common/success.png',
  failurl:'/static/image/common/fail.png',
  text:'月费办理登记完成',
  form:{
    ownerName:'',

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
},
onLoad(options) {
    this.setData({
      id : options.id
    })

  // this.getuser()
  this.initValidate()//验证规则函数
  this.getTantentInfo();
  this.getInfo();
},
getInfo(){
  util.request(api.getOwnerInfo, 
    {
    }, 'GET').then(res => {
     if(res.data){
       this.setData({
         form: res.data
       })
       if(res.data.sex){
         //1女0男
         if(res.data.sex === '1'){
            this.setData({
             current:1
           })
         }else{
          this.setData({
            current:0
          })
         }
        

       }
     }
    })

},
getTantentInfo(){
  util.request(api.getTenantList, 
    {
    }, 'GET').then(res => {
     if(res.data){
       this.setData({
        countries:res.data
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
  console.log('触发省份键盘');
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
    ownerName: {
      required: true,
      minlength:2
    },

  }
  const messages = {
    ownerName: {
      required: '请填写姓名',
      minlength:'请输入正确的名称'
    },

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
  }else{
    util.request(api.feeHandling, 
      {
        id:this.data.id,
        ownerName:params.ownerName,
        sex:this.data.current,
        tenantFk:this.data.tenantFk,
        payFee:this.data.wapper[this.data.current].number
      }, 'POST').then(res => {
        if(res.code === 0 ){
          wx.navigateTo({//wx.switchTab自带API跳转到tabBar页面  
             url:`../../prompt/prompt?url=${this.data.url}&title=${this.data.title}&text=${res.msg}&path=../mycar/index/index`
        })  
      }else{
          wx.navigateTo({//wx.switchTab自带API跳转到tabBar页面  

            url:`../../prompt/prompt?url=${this.data.failurl}&title=${this.data.title}&text=${res.msg}&path=../mycar/index/index`
          }) 
      }
      })
    
  }
  
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
  // console.log('e',e);
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
  const val = e.detail.value
   this.setData({
    val: this.data.countries[val[0]],
  })
  // this.setData({
  //   visitor: this.data.countries[val[0]].tenantName,
  //   tenantFk: this.data.countries[val[0]].id,
  // })
},

    // 显示弹框(底部)
    showBottom(){
      this.setData({
        type:'bottom'
      })
      const child = this.selectComponent('.modal-content')
      child.showModal();
   
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
       if(this.data.val){
         this.setData({
            visitor: this.data.val.tenantName,
            tenantFk: this.data.val.id,
          })
       }else{
        this.setData({
          visitor: this.data.countries[0].tenantName,
          tenantFk: this.data.countries[0].id,
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
    },
    wapperChildClick(e){

          this.setData({
            currentMonth:e.currentTarget.dataset.id
          })
        
    }
})
