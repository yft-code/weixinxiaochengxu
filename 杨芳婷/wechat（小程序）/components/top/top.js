// components/top/top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type: String,
      value: 'fdsfdsf'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    barHeight: wx.getSystemInfoSync().statusBarHeight,
    
  },
  ready:function(){
    
  },


  /**
   * 组件的方法列表
   */
  methods: {
   back(){
      wx.navigateBack({
        delta: 1 //返回上一级页面
      })
    }
  }
})
