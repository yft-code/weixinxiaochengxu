// pages/permit/permit.js
const util = require('../../util/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      title:'临时通行证',
      userInfo:{},
      imgurl:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   this.getData();
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

  },
  getData(){
    util.request(api.passCheck,{},"GET").then(res=>{
      if(res.code===0){
        this.setData({
          userInfo: res.data
        })
      }
    })

    let that = this;
    util.request(api.qrcode,{},"GET","arraybuffer").then(res=>{
        const url ='data:image/png;base64,'+wx.arrayBufferToBase64(res)
        that.setData({
          imgurl : url,     //设置data里面的图片url
          show:true
        })

    })
   
  }
})