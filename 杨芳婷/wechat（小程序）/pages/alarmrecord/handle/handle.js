// pages/repairpending/handle/handle.js
import  util from '../../../util/util.js';
import api from '../../../config/api.js';
const { $Toast } = require('../../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'处理',
    dataInfo:{},
    result:"",
    id:'',
    titles:"造访记录处理",
    url:'/static/image/common/success.png',
    failurl:'/static/image/common/fail.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options){
      util.request(api.handleDetail, 
        {
          id:options.id
        }, 'GET').then(res => {
         
          if(res.data){
            this.setData({
               dataInfo:res.data,
               id:options.id
            })
          }
         
        })
    }
   
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
  bindTextAreaBlur(e){
    this.setData({
      result:e.detail.value
    })
  },
  submit(){
  
  if(this.data.result ===  '' ){
    $Toast({
      content: '请输入处理结果'
  });
  }else{
    util.request(api.handleRecord, 
      {
        id:this.data.id,
        result: this.data.result
      }, 'POST').then(res => {

       if(res.code === 0 ){
           wx.navigateTo({//wx.switchTab自带API跳转到tabBar页面  

         url:`../../prompt/prompt?url=${this.data.url}&title=${this.data.titles}&text=${res.msg}&path=../alarmrecord/handle/handle`
         })  
       }else{
        wx.navigateTo({//wx.switchTab自带API跳转到tabBar页面  

          url:`../../prompt/prompt?url=${this.data.failurl}&title=${this.data.titles}&text=${res.msg}&path=../alarmrecord/handle/handle`
          }) 
       }
        
      }).catch(res=>{
        wx.navigateTo({//wx.switchTab自带API跳转到tabBar页面  

          url:`../../prompt/prompt?url=${this.data.failurl}&title=${this.data.titles}&text=${res.msg}&path=../alarmrecord/handle/handle`
          })  
      })
  }
 
  }
})