// pages/parkingfee/parkingfee.js
import  util from '../../util/util.js';
import api from '../../config/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'停车缴费',
    url:'/static/image/common/fail.png',
    text:'支付失败',
    payList:{},
    payShow:false,
    url:'/static/image/common/success.png',
    failurl:'/static/image/common/fail.png',
  },
  pay(){
    util.request(api.payParkingBill, 
      {
        id: this.data.payList.id
      }, 'GET').then(res => {
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
    // 停车缴费失败/或成功，修改url，text，title的值即可
  //   wx.navigateTo({
  //     url:`../prompt/prompt?url=${this.data.url}&title=${this.data.title}&text=${this.data.text}`
  // })   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   this.initData();
  },
  initData(){
    util.request(api.getParkingBill, 
      {
      }, 'GET').then(res => {

        if(res.code === 0 && res.data){
          if(res.data){
            this.setData({
              payList:res.data,
              payShow:true
          })
          }else{
            this.setData({
              payShow:false
          })
          }
          

        }

      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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

  }
})