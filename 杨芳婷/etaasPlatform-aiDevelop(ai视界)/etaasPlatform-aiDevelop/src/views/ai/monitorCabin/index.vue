<template>
  <div class="aiMonitoringData">
    <div class="aiMonitoringDataHeader">
      <monitorCabinHeader></monitorCabinHeader>
    </div>
    <div class="aiMonitoringContent">
      <div class="aiMonitoringContentLeft">
        <div class="leftTop"></div>
        <div class="leftSecond"></div>
        <div class="rightTop"></div>
        <div class="rightSecond"></div>
        <div class="leftThird"></div>
        <div class="leftFourth"></div>
        <div class="rightThird"></div>
        <div class="rightFourth"></div>
        <monitorCabinLeft></monitorCabinLeft>
      </div>
      <div class="aiMonitoringContentCenter">
        <monitorCabinCenter ref="centerChild"></monitorCabinCenter>
      </div>
      <div class="aiMonitoringContentRight">
        <div class="leftTop"></div>
        <div class="leftSecond"></div>
        <div class="rightTop"></div>
        <div class="rightSecond"></div>
        <div class="leftThird"></div>
        <div class="leftFourth"></div>
        <div class="rightThird"></div>
        <div class="rightFourth"></div>
        <monitorCabinRight ref="rightChild"></monitorCabinRight>
      </div>
    </div>
    <!-- 弹框 -->
    <monitorCabinDialog
      :is-show="visible"
      @open="open"
      @close="close"
      :loading="loading"
      :newEvent="newEvent"
    ></monitorCabinDialog>
   <voice ref="voice"></voice>
  </div>
</template>
<script>
import monitorCabinHeader from "./monitorCabinHeader/index.vue";
import monitorCabinLeft from "./monitorCabinContent/monitorCabinLeft.vue";
import monitorCabinCenter from "./monitorCabinContent/monitorCabinCenter.vue";
import monitorCabinRight from "./monitorCabinContent/monitorCabinRight.vue";
import monitorCabinDialog from "./monitorCabinDialog/index.vue";
import voice from '@components/voice/voice.vue';
export default {
  components: {
    monitorCabinHeader,
    monitorCabinLeft,
    monitorCabinCenter,
    monitorCabinRight,
    monitorCabinDialog,
    voice
  },
  data() {
    return {
      loading:false,
      newEvent: {},
      openRemark: false,
      //接收定时器
      timer: null,
      // 从子组件传过来的数组
      arrShow: [],
      // 关闭弹框让其不出现
      switchRemark: true,
      // 弹框dialogVisible
      visible: false,
      //webScoket变量
      form: {},
    };
  },
  created() {},
  mounted() {
    window.addEventListener("setItemEvent", this.showWarningEvent);
    //事件提示
    this.$bus.$on("dialogEmit", (switchRemark) => {
      this.switchRemark = switchRemark;
    });
  },
  methods: {
    // 预警事件webScoket
    showWarningEvent(e) {
      const newValue = JSON.parse(e.newValue);
      if(!newValue.dateTime){
      if(this.$store.state.isLogin){
      this.$nextTick(()=>{
        if(this.$refs.centerChild){
          this.$refs.centerChild.initDataStart()
          this.$refs.centerChild.getSumAndDay()
        }   
      this.$refs.rightChild.initGetAlarmlistBacklog(this.form)
        })
      if (!this.visible && this.switchRemark) {
        this.newEvent={}
        this.visible = true;
        this.loading=true
        // 将上一次的定时器销毁，否则手动关闭时对时长有影响
        window.clearTimeout(this.timer);
        if (e.newValue) {
           this.$refs.voice.getVoices()
          const newValue = JSON.parse(e.newValue);
          this.newEvent = newValue;
          console.log('this.newEvent',this.newEvent);
          this.loading=false
          this.timer = setTimeout(() => {
            this.visible = false;
          }, 15000);
        }
      }
    }
      }
    },
    //打开弹框
    open() {},
    close() {
      this.visible = false;
    },
    //开启预警事件通知弹框
    // showDialog(){
    //   this.switchRemark=!this.switchRemark
    //   console.log('switch',this.switchRemark);
    //  if(this.switchRemark){
    //    if(this.arrShow&&this.arrShow.length>0){
    //      this.visible = true
    //      this.arrShow=this.curtail(this.arrShow)
    //      console.log('第一次弹框启动时手动删除的元素',this.arrShow);
    //    }
    //   }else{
    //     // 当取消弹框时需要把上一个定时器还没有删除的元素给删除
    //    this.visible = false
    //    console.log('手动关闭的数组',this.arrShow);
    //    this.arrShow=this.curtail(this.arrShow)
    //    console.log('手动关闭的数组11',this.arrShow);
    //  }
    // },
    // 删除数组的第一项
    // 删除数组的第一个元素
    close() {
      this.visible = false;
      this.switchRemark = true;
      //  this.switchRemark=false
      //  this.timer=setTimeout(()=>{
      //    this.switchRemark=true
      //  },5000)
    },
    // 打开或关闭弹框
    // close(arr){
    //   this.arrShow=arr
    //   console.log('传过来的arr',arr);
    //   // console.log('删除之前的',this.arrShow);
    //  if(this.switchRemark){
    //   //如果为true就运行
    // // this.arrShow=this.curtail(this.arrShow)
    //  console.log('删除之后的元素',this.arrShow);
    //   if(this.visible){
    //      this.visible=false
    //   }else{

    //     console.log('删除之后的arrShow',this.arrShow);
    //     if(this.arrShow&&this.arrShow.length>0){
    //       console.log('true');
    //        this.visible=true
    //       this.arrShow=this.curtail(this.arrShow)

    //     }
    //   }
    //   }
    // }
  },
};
</script>
<style lang="scss" scoped>
.show {
  position: fixed;
  z-index: 10000;
}
.aiMonitoringData {
  background: #061a32;
  width: 100%;
  height: 100%;

  .aiMonitoringDataHeader {
    width: 100%;
    height: 11.1vh;
  }
  .aiMonitoringContent {
    background: #061a32;
    width: 100%;
    display: inline-flex;
    justify-content: space-around;
    .aiMonitoringContentLeft {
      width: 258px;
      height: 80.4vh;
      background: #062440;
      position: relative;
      // background: url('~@/assets/img/ai/monitorCabin/bottom.svg') no-repeat top center;
      // background-size: 100%;
    }
    .leftTop {
      position: absolute;
      left: 0px;
      top: 0px;
      height: 1px;
      width: 12px;
      background: #1aacf3;
    }
    .leftSecond {
      position: absolute;
      left: 0px;
      top: 0px;
      height: 12px;
      width: 2px;
      background: #1aacf3;
    }
    .rightTop {
      position: absolute;
      right: 0px;
      top: 0px;
      height: 1px;
      width: 12px;
      background: #1aacf3;
    }
    .rightSecond {
      position: absolute;
      right: 0px;
      top: 0px;
      height: 12px;
      width: 2px;
      background: #1aacf3;
    }
    .leftThird {
      position: absolute;
      left: 0px;
      bottom: 0px;
      height: 1px;
      width: 12px;
      background: #1aacf3;
    }
    .leftFourth {
      position: absolute;
      left: 0px;
      bottom: 0px;
      height: 12px;
      width: 2px;
      background: #1aacf3;
    }
    .rightThird {
      position: absolute;
      right: 0px;
      bottom: 0px;
      height: 1px;
      width: 12px;
      background: #1aacf3;
    }
    .rightFourth {
      position: absolute;
      right: 0px;
      bottom: 0px;
      height: 12px;
      width: 2px;
      background: #1aacf3;
    }
    .aiMonitoringContentCenter {
      width: 1276px;
      height: 80.4vh;
      // background: red;
    }
    .aiMonitoringContentRight {
      width: 273px;
      height: 80.4vh;
      background: #062440;
      position: relative;
      // opacity: 0.1;
    }
  }
}
</style>
