// login.js
const user = require('../../services/user.js');

Page({
  data:{
    barHeight: wx.getSystemInfoSync().statusBarHeight,
    title:'登录',
     url:'/static/image/logo.png',
     text:'中国宿迁电子产业园区'
  },
  login:function(){
    user.loginByWeixin();
  //   wx.navigateTo({//wx.switchTab自带API跳转到tabBar页面  
  //     //跳转到非tabBar页面:wx.navigateTo代替wx.switchTab即可
  //     url:'../index/index',
  //     // url:'../visitrecord/visitrecord'
  // })   
  }
})
