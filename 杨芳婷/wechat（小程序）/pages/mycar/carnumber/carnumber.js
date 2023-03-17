// components/CarNumber/carNumber.js
import  util from '../../../util/util.js';
import api from '../../../config/api.js';
Component({
  /**
   * 自定义样式
   */
  externalClasses: ['custom-input-class', 'custom-item-class', 'custom-energy-icon'],

  /**
   * 组件的属性列表
   */
  properties: {
    defaultNum: {
      type: String,
      default: ''
    }
  },

  /**
   * 页面展示
   */
  pageLifetimes: {
    show() {
     
      if (this.data.defaultNum) {
        // 存在默认车牌号
        // const length = this.data.defaultNum.length
        // if (length === 8) {
        //   // 新能源车牌号
        //   this.setData({
        //     newEnergy: true
        //   })
        // }
        this.setData({
          carNum: this.data.defaultNum.split('')
        }) 
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    carNum: [],
    title:"11",
    currentInput: 0,
    keyboard: false,
    keyboardType: 1,
    newEnergy: true,
    titles:'',
    url:'/static/image/common/success.png',
    failurl:'/static/image/common/fail.png',
    // 省份输入
    provinces: [
      ['京','津','渝', '沪', '冀','晋','辽','吉','黑','苏'],
      ['浙','皖', '闽', '赣', '鲁', '豫', '鄂', '湘','粤','琼'],
      [ '川','贵', '云','陕','甘','青','蒙', '桂',  '宁','新'],
      [ '藏', '使','领','警','学','港','澳'],
    ],
    // 地区输入
    areas: [
      ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"],
      ["L", "M", "N", "P", "Q", "R", "S", "T", "U", "V"],
      ["W", "X", "Y", "Z"]
    ],
    // 车牌输入
    numbers: [
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"],
      ["L", "M", "N", "P", "Q", "R", "S", "T", "U", "V"],
      ["W", "X", "Y", "Z"]
    ],
    // 最后一位输入
    last: [
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", ],
      ["N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
      ["港", "澳", "学", "挂", "警"]
    ]
  },
  ready:function(){
    if(wx.getStorageSync('type') === 'add'){
      this.setData({
        title:'添加车牌号'
      })
    }else{
      this.setData({
        title:'编辑车牌号',
        carNum:wx.getStorageSync('vehicleNumber').split('')
      })
 
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 关闭键盘
     */
    closeKeyboard() {
      this.setData({
        keyboard: false
      })
    },
    confirm(){
      if(wx.getStorageSync('type') === 'add'){
         util.request(api.saveVehicle, 
        {
          vehicleNumber:this.data.carNum.join("")
        }, 'POST').then(res => {
          this.titles = "添加车辆"
          if(res.code === 0 ){
            wx.navigateTo({//wx.switchTab自带API跳转到tabBar页面  
 
               url:`../../prompt/prompt?url=${this.data.url}&title=${this.data.titles}&text=${res.msg}&path=../mycar/index/index`
          })  
        }else{
            wx.navigateTo({//wx.switchTab自带API跳转到tabBar页面  
 
              url:`../../prompt/prompt?url=${this.data.failurl}&title=${this.data.titles}&text=${res.msg}&path=../mycar/index/index`
            }) 
        }
        
        })
      }else{
        util.request(api.updateVehicle, 
          {
            vehicleNumber:this.data.carNum.join(""),
            id:wx.getStorageSync('id')
          }, 'POST').then(res => {
            this.titles = "编辑车辆"
            if(res.code === 0 ){
              wx.navigateTo({//wx.switchTab自带API跳转到tabBar页面  
   
                 url:`../../prompt/prompt?url=${this.data.url}&title=${this.data.titles}&text=${res.msg}&path=../mycar/index/index`
            })  
          }else{
              wx.navigateTo({//wx.switchTab自带API跳转到tabBar页面  
   
                url:`../../prompt/prompt?url=${this.data.failurl}&title=${this.data.titles}&text=${res.msg}&path=../mycar/index/index`
              }) 
          }
          
          })
      }
     
    
    
    },
    /**
     * 显示省份键盘
     */
    showProvinceBoard() {
      this.setData({
        keyboard: true,
        currentInput: 0,
        keyboardType: 1
      })
    },

    /**
     * 确定选择省份
     */
    chooseProvince(event) {
      // 触发省份键盘
      const { val } = event.currentTarget.dataset
      this.setData({
        'carNum[0]': val,
        currentInput: 1,
        keyboardType: 2
      })
      // 每次都触发 change 事件，通知父组件
      this.triggerEvent('change', this.data.carNum.join(''))
    },
    
    /**
     * 删除选定省份
     */
    delProvince() {
      this.setData({
        'carNum[0]': ''
      })
      // 每次都触发 change 事件，通知父组件
      this.triggerEvent('change', this.data.carNum.join(''))
    },

    /**
     * 显示地区键盘
     */
    showAreaBoard() {
      this.setData({
        keyboard: true,
        currentInput: 1,
        keyboardType: 2
      })
    },

    /**
     * 选定地区
     */
    chooseArea(event) {
      const { val } = event.currentTarget.dataset
      this.setData({
        'carNum[1]': val,
        currentInput: 2,
        keyboardType: 3
      })
      // 每次都触发 change 事件，通知父组件
      this.triggerEvent('change', this.data.carNum.join(''))
    },

    /**
     * 删除选定区域
     */
    delArea() {
      this.setData({
        'carNum[1]': '',
        currentInput: 0,
        keyboardType: 1
      })
      // 每次都触发 change 事件，通知父组件
      this.triggerEvent('change', this.data.carNum.join(''))
    },

    /**
     * 显示普通键盘
     */
    showNumberBoard(event) {
      const { index } = event.currentTarget.dataset
      console.log('index数字',index);
      const keyboardType = index === 6? 4 : 3
      this.setData({
        keyboard: true,
        currentInput: index,
        keyboardType: keyboardType
      })
    },

    /**
     * 选定车牌
     */
    chooseNumber(event) {
      const { val } = event.currentTarget.dataset
      const name = 'carNum[' + this.data.currentInput + ']'
      this.setData({
        [name]: val,
        currentInput: this.data.currentInput + 1,
        keyboardType: 3
      })
      // 跳到最后一位时，键盘不一样
      if (this.data.currentInput === 6)
       {
        this.setData({
          [name]: val,
          currentInput: this.data.currentInput,
          keyboardType: 4
        })
      } 
      // else if (this.data.currentInput === 7 && !this.data.newEnergy) {
      //   this.setData({
      //     keyboardType: 4
      //   })
      // }
      // 每次都触发 change 事件，通知父组件
      this.triggerEvent('change', this.data.carNum.join(''))
    },

    /**
     * 删除车牌
     */
    delNumber() {
      const name = 'carNum[' + this.data.currentInput + ']'
      this.setData({
        [name]: '',
        currentInput: this.data.currentInput - 1,
        keyboardType: 3
      })
      // 如果删除到地区时，切换键盘类型
      if (this.data.currentInput === 1) {
        this.setData({
          keyboardType: 2
        })
      }
      // 每次都触发 change 事件，通知父组件
      this.triggerEvent('change', this.data.carNum.join(''))
    },

    /**
     * 显示最后一位键盘
     */
    showLastBoard() {
      console.log('选中车牌号2');
      this.setData({
        keyboard: true,
        currentInput: 7,
        keyboardType: 4
      })
      // if (this.data.newEnergy) {
      //   // 新能源
      //   this.setData({
      //     keyboard: true,
      //     currentInput: 7,
      //     keyboardType: 4
      //   })
      // } else {
      //   this.setData({
      //     keyboard: true,
      //     currentInput: 6,
      //     keyboardType: 4
      //   })
      // }
    },

    /**
     * 选定最后一位
     */
    chooseLast(event) {
        console.log('选中车牌号2');
      const { val } = event.currentTarget.dataset
      this.setData({
        'carNum[6]': val,
        currentInput: this.data.currentInput + 1,
        // keyboard: true,
        keyboardType: 3,
        newEnergy: false
      })
      // if (this.data.newEnergy) {
      //   // 新能源
      //   this.setData({
      //     'carNum[7]': val,
      //     currentInput: this.data.currentInput + 1,
      //     keyboard: false
      //   })
      // } else {
      //   this.setData({
      //     'carNum[6]': val,
      //     currentInput: this.data.currentInput + 1,
      //     keyboard: true
      //   })
      // }
      // 每次都触发 change 事件，通知父组件
      this.triggerEvent('change', this.data.carNum.join(''))
    },

    /**
     * 删除最后一位
     */
    delLast() {
      if (this.data.newEnergy) {
        this.setData({
          'carNum[7]': '',
          currentInput: this.data.currentInput - 1,
          keyboardType: 3
        })
      } else {
        this.setData({
          'carNum[6]': '',
          currentInput: this.data.currentInput - 1,
          keyboardType: 3
        })
      }
      // 每次都触发 change 事件，通知父组件
      this.triggerEvent('change', this.data.carNum.join(''))
    },

    /**
     * 切换输入新能源车牌号
     */
    changeCarToNewEnergy() {
      this.setData({
        keyboard: true,
        currentInput: 7,
        keyboardType: 3
      })
      this.setData({
        newEnergy: false
      })
    }
  }
})


