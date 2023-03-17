// pages/repairpending/handle/handle.js
const util = require('../../../util/util.js');
const api = require('../../../config/api.js');
const { $Toast } = require('../../../dist/base/index');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    remnant:0,
    // 处理结果
    result:'',
    title:'处理',
    records:[1,2,3],
    id:null,
    deviceList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options.id){
      this.UnhandleDetail(options.id)
    }
  },
// 获取未处理列表详情
UnhandleDetail(id){
  util.request(api.UnhandleDetail,{id:id}).then(res=>{
    console.log('res',res);
    this.setData({
      deviceList:res.data
    })
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  descInput(){
    var txtVal = this.data.result.length;
    let remnant = 50 - txtVal;
    this.setData({
      remnant:remnant
    })
    },
  sumbit(){
   if(!this.data.result){
    $Toast({
      content: '处理结果不能为空'
  });
   }
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