Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示modal弹窗
    // show: {
    //   type: Boolean,
    //   value: false
    // },
    //控制底部是一个按钮还是两个按钮，默认两个
    type: {
      type: String,
      value: 'bottom'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false,
    showModalStatus:false,
  },
 // 具名插槽需要添加这个属性
 options: {
  multipleSlots: true // 在组件定义时的选项中启用多 slot 支持
},
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击modal的回调函数
    clickMask() {
      // 点击modal背景关闭遮罩层，如果不需要注释掉即可
      this.setData({show: false})
    },
   // 点击取消按钮的回调函数
    cancel() {
      this.setData({ show: false })
    },
    // 点击确定按钮的回调函数
    confirm() {
      this.setData({ show: true })
    },
      //显示对话框
  showModal: function () {
    if(this.data.type==='bottom'){
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: true
      })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  }
  if(this.data.type==='middle'){
    this.setData({ show: true })
  }
  },
  //隐藏对话框
  hideModal: function () {
    if(this.data.type==='bottom'){
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        show: false
      })
    }.bind(this), 200)
  }
  if(this.data.type==='middle'){
    this.setData({ show: false })
  }
}
  }
})
