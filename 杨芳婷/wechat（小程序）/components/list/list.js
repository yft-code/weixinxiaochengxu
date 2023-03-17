// components/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    listData: [
      '1、我是滑动可删除元素', 
      '2、我是滑动可删除元素', 
      '3、我是滑动可删除元素', 
      '4、我是滑动可删除元素', 
      '5、我是滑动可删除元素'
     ],
     startX: 0, // 开始坐标
     delIndex: -1 // 当前滑动的元素下标位置
  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 删除事件
      delItem (e){
        this.data.listData.splice(e.currentTarget.dataset.index, 1)
        this.setData({
          listData: this.data.listData
        })
      },
      //手指触摸动作开始 记录起点X坐标
      touchstart (e) {
        //开始触摸时 重置所有删除
        this.setData({
          startX: e.changedTouches[0].clientX,
          delIndex: -1
        })
      },
      //滑动事件处理
      touchmove: function (e) {
        let self = this,
        index = e.currentTarget.dataset.index, //当前索引
        startX = self.data.startX, //开始X坐标
        touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
        delIndex = self.data.delIndex;
        if (touchMoveX > startX) {
          //右滑
          delIndex = -1
        } else {
          //左滑
        delIndex = index
        }
        self.setData({
          delIndex
        })
      }
  }
})
