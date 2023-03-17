// index.js
// 获取应用实例
const app = getApp()
const util = require('../../util/util.js');
const api = require('../../config/api.js');
Page({
  data: {
    roleCode:"",
    noticeShow:false,
    isAlarmNotice:false,
    barHeight: wx.getSystemInfoSync().statusBarHeight,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') && wx.canIUse('open-data.type.userGender') // 如需尝试获取用户信息可改为false
  },

  onLoad() {
    this.getData();
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    if(wx.getStorageSync('roleCode')) {
      this.setData({
        roleCode:wx.getStorageSync('roleCode')
      })
     
    }
  },
  getData(){
    //维修待办是否有待办
    util.request(api.isNotice,{},"GET").then(res=>{
      if(res.code===0 && res.data){
        this.setData({
          isNotice:res.data.flag
        })
      }
    })
    //告警记录是否有待办
        util.request(api.isAlarmNotice,{},"GET").then(res=>{
          if(res.code===0 && res.data){
            this.setData({
              isAlarmNotice:res.data.flag
            })
          }
        })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  visitor(){
    wx.navigateTo({      //wx.switchTab自带API跳转到tabBar页面  
      url:'../visitrecord/visitrecord'   

  })   
  },
  vistorregister(){
    wx.navigateTo({      //wx.switchTab自带API跳转到tabBar页面  
      url:'../visitor/visitor'   

  })  
  },
  payrecord(){
    wx.navigateTo({      //wx.switchTab自带API跳转到tabBar页面  
      url:'../payrecord/payrecord'   

  })   
  },
  getPass(){
    wx.navigateTo({      //wx.switchTab自带API跳转到tabBar页面  
      url:'../permit/permit'   

  })   
  },
  applyRepair(){
    wx.navigateTo({      //wx.switchTab自带API跳转到tabBar页面  
      url:'../applyrepair/applyrepair'   

  })   
  },
  parkpay(){
    wx.navigateTo({      //wx.switchTab自带API跳转到tabBar页面  
      url:'../parkingfee/parkingfee'   

  }) 
  },
  parkingfee(){
    wx.navigateTo({      //wx.switchTab自带API跳转到tabBar页面  
      url:'../parkingfee/parkingfee'   

  }) 
  },
  applyrepair(){
    wx.navigateTo({      //wx.switchTab自带API跳转到tabBar页面  
      url:'../repairpending/index/index'   

  }) 
  },
  mycar(){
    wx.navigateTo({      //wx.switchTab自带API跳转到tabBar页面  
      url:'../mycar/index/index'   

  })   
  },
  alarmrecord(){
    wx.navigateTo({      //wx.switchTab自带API跳转到tabBar页面  
      url:'../alarmrecord/index/index'   

  }) 
  }
})
