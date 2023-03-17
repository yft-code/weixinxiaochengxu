// pages/payrecord/payrecord.js
const util = require('../../util/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'缴费记录',
    records:[],
    tabType: 'tab1',
    key: 'tab1',
    conditionList: [
    ],
    choosedCondition: {
    },
    conditionVisible: false,
  },
  showCondition() {
    this.setData({
        conditionVisible: !this.data.conditionVisible
    })
},
getDate(){
  util.request(api.queryDateRecord,{},"GET").then(res=>{
    if(res.code===0){
      this.setData({
        conditionList: res.data,
        choosedCondition:res.data[0]
      })
      this.getData(res.data[0]);
    }
  })
},
getData(date){

  util.request(api.getVehicleBill,{
    date:date.value
  },"GET").then(res=>{
    if(res.code===0){
      this.setData({
        records: res.data
      })
     
    }
  })
  
},
// 改变查询项
onChnageCondition(e) {
    const list = this.data.conditionList;
    list.forEach(item => {
        if (item.value === e.currentTarget.dataset.value) {
            item.select = true  
            this.getData(item);
            this.setData({
              choosedCondition:item
            })          
        } else {
            item.select = false
        }
    })
    this.setData({
        conditionList: list
    })
 
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   this.getDate();
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