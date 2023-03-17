// pages/payrecord/payrecord.js
const util = require('../../util/util.js');
const api = require('../../config/api.js');
Page({
  data: {
    title:'造访记录',
    records:[],
    tabType: 'tab1',
    key: 'tab1',
    conditionList: [],
    choosedCondition: {
        title: '2022年10月15日',
        id: '1'
    },
    conditionVisible: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDateList()
  },
  // 获取日期列表
getDateList(){
  util.request(api.getDateList,{},"GET").then(res=>{
       if(res.code===0){
         let conditionList=[]
         let choosedCondition={}
         res.data.map((item,index)=>{
           if(index===0){
             choosedCondition={
              title: item.label,
              id: item.value,
            }
            conditionList.push({
              title: item.label,
              id: item.value,
              select: true
            })
           }else{
            conditionList.push({
              title: item.label,
              id: item.value,
              select: false
            })
           }
         })
       this.setData({
        conditionList:conditionList,
        choosedCondition:choosedCondition
       })
       this.handledList()
       }  
  })
},
  handledList(){
    util.request(api.visitorRecordList,{date:this.data.choosedCondition.id}).then(res=>{
      res.data.map(item=>{
        item.show=false
      })
      this.setData({
        records:res.data
      })
    })
  },
  // 数据显示是否完全
showAll(e){
   this.data.records.map((item,index)=>{
       if(index===e.currentTarget.dataset.id){
         item.show=!item.show
       }
   })
   this.setData({
    records:this.data.records
   })
},
  showCondition() {
    this.setData({
        conditionVisible: !this.data.conditionVisible
    })
  },
// 改变时间查询项
onChnageCondition(e) {
  const list = this.data.conditionList
  list.forEach(item => {
      if (item.id === e.currentTarget.dataset.id) {
          item.select = true
          this.setData({
              'choosedCondition.title': item.title,
              'choosedCondition.id': item.id
          })
      } else {
          item.select = false
      }
  })
  this.setData({
      conditionList: list
  })
  this.handledList()
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