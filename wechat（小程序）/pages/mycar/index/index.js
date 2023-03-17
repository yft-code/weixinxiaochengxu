// pages/mycar/mycar.js
import  util from '../../../util/util.js';
import api from '../../../config/api.js';
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    title:'车辆服务',
    barHeight: wx.getSystemInfoSync().statusBarHeight,
    data:[

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.initData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  initData:function(){
    util.request(api.vehicleList, 
      {
      }, 'GET').then(res => {
        if(res.data){
          this.setData({
            data:res.data
          })
        
        }
      
      })
  },
  doClick:function(e){ 
    wx.navigateTo({      //wx.switchTab自带API跳转到tabBar页面  

      url:'../monthfee/monthfee?id=' + e.currentTarget.dataset.id

  })   
  },
  addCar:function(){
    wx.setStorageSync('type', 'add')
    wx.navigateTo({      //wx.switchTab自带API跳转到tabBar页面  

      url:'../carnumber/carnumber'

  })   
  },
  payrecord(){
    wx.navigateTo({      //wx.switchTab自带API跳转到tabBar页面  
      url:'../../payrecord/payrecord'   

  })   
  },
  editClick:function(e){
    wx.setStorageSync('type', 'edit')
    wx.setStorageSync('vehicleNumber', e.currentTarget.dataset.name)
    wx.setStorageSync('id', e.currentTarget.dataset.id)
    wx.navigateTo({      //wx.switchTab自带API跳转到tabBar页面  

      url:'../carnumber/carnumber'

  })   
  }
})