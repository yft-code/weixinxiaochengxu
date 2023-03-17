<template>
<div>
  <div class="my-base-info">
 <el-dialog
  :visible.sync="isShow"
  width="600px"
  :close-on-click-modal="false"
  :before-close="handleClose"
  >
  <div slot="title">
        <div style="display:flex;justify-content: space-between;align-items: center;font-size:18px">
          <div>{{newEvent&&newEvent.alarmData&&newEvent.alarmData.warning&&newEvent.alarmData.warning.levelName}}</div>
           <img style="padding-bottom:5px;cursor: pointer;" @click="handleClose" :src="imgs" alt="">
        </div>
  </div>
 <div class="containerDialog">
      <div class="body">
      <div class="title">{{newEvent&&newEvent.alarmData&&newEvent.alarmData.algName}}</div>
      <div class="imgTitle">
        <div class="img" v-loading="loading">
         <img width="100%"  height="100%" :src="newEvent&&newEvent.alarmData&&newEvent.alarmData.pic" alt="">
        </div>
        <div class="detail">
           <div>
             <div class="detailTitle" style="width:79PX">设备名称</div>
             <div class="detailWord">{{newEvent&&newEvent.alarmData&&newEvent.alarmData.deviceName}}</div>
           </div>
           <div>
             <div class="detailTitle">预警时间</div>
             <div class="detailWord">{{newEvent&&newEvent.alarmData&&newEvent.alarmData.datetime}}</div>
           </div>
            <!-- <div>
             <div class="detailTitle" style="width:79PX">监管场景</div>
             <div class="detailWord">{{this.getScence(newEvent&&newEvent.alarmData&&newEvent.alarmData.scene)}}</div>
           </div> -->
        </div>
      </div>
      </div>
 </div>
  <!-- <span slot="footer" class="dialog-footer">
  </span> -->
</el-dialog>
  </div>
</div>
</template>
<script>
import * as api from "@/api/ai/earlyWarning";
export default {
   props: {
    loading:{},
     row: {},
    isShow: {
      type: Boolean,
      default:false,
    },
    newEvent:{
      type: Object,
      default:{}
    }
  },
  data () {
    return {
      myAlogorith: [],
      flag: true,
      operationFlag: false,
      regionFlag: false,
      //工具栏显示
      showMonitoringTitle: false, // 是否显示 监控室标题
      visible: false, // 是否展示查看/处理详情页面
      currentRoute: "", // 当前路由
      noticeClass: "newNotice", // 消息通知图标class
      showNoticeModal: false, // 显示通知下拉框表格
      warningData: [], // 预警列表数据
      showAlert: true,
      // 定时器变量
      remarkTrue:null,
      remarkFalse:null,
      arr:[],
      title:'zhangsan',
      imgs: require("@/assets/img/ai/monitorCabin/close_line.svg"),
      // isShown: false
    }
  },
  watch:{
    
  },
  mounted(){


  },
  methods: {
    // 对数组进行处理
    getScence(arr){
      let scences=[]
        arr&&arr.length>0&&arr.map(item=>{
               scences.push(item.name)
        })
        return scences.join(',')
    },
  
    handleOpne(){
      console.log('弹框出现了');
        this.$emit('open')
    },
    // 将true变为false
    handleClose(){
      // this.arr从子组件传过来的
        this.$emit('close')
        console.log('子组件关闭事件被调用了');
    },
   // 删除数组的第一个元素
     curtail(arr) {
       if(arr&&arr.length>0){
       let m = arr.slice(0);
       m.splice(0,1);
      return m;
       }

},
    changeStatus() {
      if (this.isShown) {
        this.isShown = false
      } else {
        if(this.arr&&this.arr.length>0) {
           this.isShown = true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-base-info{
  .containerDialog{
  width: 100%;
  .titleOne{
     font-size: 18PX;
  }
  .title{
    margin-top: 14PX;
    padding: 10PX;
    font-size: 18PX;
    background-color:RGBA(54, 69, 89, 1);
    color:rgba(232, 238, 255, 0.8);
  }
  .imgTitle{
    display:flex;
    height:230PX;
    // background-color: greenyellow;
    margin-bottom: 20PX;
  }
  .detail{
    margin-left: 20PX;
  }
  .detailTitle{
     margin-top: 20PX;
    color: #697789;
    font-size: 18PX;
  }
  .detailWord{
    margin-top: 20PX;
    color:#E8EEFF;
    font-size: 18PX;
  }
  .img{
     margin-top: 20PX;
    width: 60%;
  }
}
.dialog-fade-enter-active {
  animation: my-dialog-fade-in 0.6s;
}
.dialog-fade-leave-active {
  animation: my-dialog-fade-out 0.6s;
}
/deep/ .el-dialog {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0px !important;
}
/deep/.el-icon-close:before {
  display: none;
    content: "\e6db";
}
/deep/.el-dialog__header {
     background:RGBA(208, 53, 58, 1)
    //  border-radius:3%;
      //  border: 1px solid gold;
}
/deep/.el-dialog__title {
    line-height: 24PX;
  
    font-size: 18PX;
    color:#FFFFFF;
}
/deep/.el-dialog__body {
    color: #606266;
    font-size: 14PX;
    // height: 300PX;
    padding: 10PX 20PX;
    word-break: break-all;
    background:rgba(6,26,50,0.9);
}
/deep/.el-dialog__footer {
    padding: 10PX 20PX 20PX;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: black;
}
} 
@keyframes my-dialog-fade-in {
  0% {
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes my-dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }
}
</style>