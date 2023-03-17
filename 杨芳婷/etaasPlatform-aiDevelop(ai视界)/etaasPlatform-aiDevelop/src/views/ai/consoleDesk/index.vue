<template>
  <div class="controlContainer"> 
     <div class="aiMonitoringDataHeader">
      <monitorCabinHeader :aiShow="aiShow"></monitorCabinHeader>
    </div>
    <div class="imgContainer">
       <div class="containerUp">
           <div :class="[deviceRemark==='active'?'imgDeviceActive':deviceRemark==='top'?'imgDeviceBack':'imgBack','deviceWord']" @mousemove="mousemove" @mouseleave="mouseleave">
                 数字孪生平台
           </div>
       </div>
      <div class="containerDown"  @click="toAi()">
           <div :class="[aiRemark==='active'?'imgAiActive':aiRemark==='top'?'imgAiBack':'imgAi','titleDown']" @mousemove="moveAi" @mouseleave="leaveAi">
                AI视界
           </div>
       </div>
       <div class="containerUp" @click="toAgent()">
           <div :class="[deliverRemark==='active'?'imgDeliverActive':deliverRemark==='top'?'imgDeliverBack':'imgDeliver','deviceWord']" @mousemove="moveDeliver" @mouseleave="leaveDeliver">
                事件流转平台
           </div>
       </div>
     <div class="containerDown" @click="toData()"  
          >
              <div :class="[dataRemark==='active'?'imgDataActive':dataRemark==='top'?'imgDataBack':'imgData','titleDown']" @mousemove="moveData" @mouseleave="leaveData">
                AI音界
           </div>
       </div>
     <div class="containerUp" @click="toUser()">
            <div :class="[userRemark==='active'?'imgUserActive':userRemark==='top'?'imgUserBack':'imgUser','deviceWord']" @mousemove="moveUser" @mouseleave="leaveUser">
              用户中心
           </div>
       </div>
    </div>
  </div>
</template>
<script>
import monitorCabinHeader from "@/views/ai/monitorCabin/monitorCabinHeader/index";
import * as api from "@/api/ai/menu"
import { getUserInfo } from '@/api/ai/warningEvent';
export default {
  components: { monitorCabinHeader },
  data() {
    return {
      time:null,
      aiShow:false,
      deviceRemark:'unActive',
      userRemark:'unActive',
      deliverRemark:'unActive',
      dataRemark:'unActive',
      aiRemark:'unActive',
    };
  },
  watch: {

  },
  created() {
      
  },
  mounted() {

  },
  methods: {
    mousemove(){
        this.deviceRemark='active'
    },
    mouseleave(){
      this.deviceRemark='top'
      setTimeout(()=>{
        this.deviceRemark='others'
      },1000)
    },
    moveDeliver(){
        this.deliverRemark='active'
    },
    leaveDeliver(){
      this.deliverRemark='top'
     setTimeout(()=>{
        this.deliverRemark='others'

      },1000)
    },
     moveData(){
        this.dataRemark='active'
    },
    leaveData(){
      this.dataRemark='top'
     setTimeout(()=>{
        this.dataRemark='others'

      },1000)
    },
     moveAi(){
        this.aiRemark='active'
    },
    leaveAi(){
      this.aiRemark='top'
     setTimeout(()=>{
        this.aiRemark='others'
      },1000)
    },
     moveUser(){
        this.userRemark='active'
    },
    leaveUser(){
      this.userRemark='top'
     setTimeout(()=>{
        this.userRemark='others'
      },1000)
    },
    toAgent(){
  
    },
    // 跳转到ai世界
    toAi(){
      api.getMenu().then(res=>{
        if(res.result&&res.result.length>0){
          this.$router.replace({ path: "/horizonCenter" });
        }else{
           this.$message({
          message: '暂无访问权限，请联系管理员开通',
          type: 'warning'
        });
        }
      }).catch()
      //  this.$router.replace({ path: "/horizonCenter" });
    },

    // 跳转到用户中心
    toUser(){
       api.getMenuByUser().then(res=>{
        if(res.result&&res.result.length>0){
        let token = JSON.parse(localStorage.getItem('token'))
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if(userInfo){
          userInfo['userCenter'] = userInfo['aiHorizon']
        }
        localStorage.setItem("userInfo",JSON.stringify(userInfo));
        if(token){
          token['userCenter'] =  token['aiHorizon'];
        }         
        localStorage.setItem("token",JSON.stringify(token));
         window.open(`${this.$store.state.publicUrl}usercenter/#/user_center/user?type=2`)
        }else{
           this.$message({
          message: '暂无访问权限，请联系管理员开通',
          type: 'warning'
        });
        }
      }).catch()
     
    },

    //跳转到数字孪生 
    toData(){
      window.location.href="http://10.20.200.19:9100/dashboard.html"
      //  api.getMenu().then(res=>{
      //   if(res.result&&res.result.length>0){
      //      this.$router.replace({ path: "/index" });
      //   }else{
      //      this.$message({
      //     message: '暂无访问权限，请联系管理员开通',
      //     type: 'warning'
      //   });
      //   }
      // }).catch() 
    }
  },
};
</script>

<style lang="scss" scoped>
.controlContainer{
    .aiMonitoringDataHeader {
    width: 100%;
    height: 120px;
  }
  height: 100%;
  width: 100%;
  background-image: url("~@/assets/img/ai/control.png");
  background-size: 100% 100%;
  position: fixed;
  .deviceWord{
    font-size: 16px;
    text-align: center;
    padding-top: 260px;
  }
  .imgBack{
    width: 159px;
    height: 400px;
    //background-color: red;
    background-image: url("~@/assets/img/ai/bottomActive.png"),
    url("~@/assets/img/ai/devices.png");
    background-position: center 100px,center 60px;
    background-repeat: no-repeat,no-repeat;
    background-size: 100% 60%,72% 30%;
  }
  .imgDeviceBack{
     width: 159px;
    height: 400px;
    // background-color: red;
    background-image: url("~@/assets/img/ai/bottomActive.png"),
    url("~@/assets/img/ai/devices.png");
    background-position: center 100px,center 60px;
    background-repeat: no-repeat,no-repeat;
    background-size: 100% 60%,72% 30%;
    transition:background-position 1s;
    -ms-transition:background-position 1s;
    -moz-transition:background-position 1s;
    -webkit-transition:background-position 1s;
    -o-transition:background-position 1s;
  }
  .imgDeviceActive{
     width: 159px;
    height: 400px;
    // background-color: red;
    background-image: url("~@/assets/img/ai/bottomActive.png"),
    url("~@/assets/img/ai/devices.png");
   background-position: center 100px,center 60px;
    background-repeat: no-repeat,no-repeat;
    background-size: 100% 60%,72% 30%;
    transition:background-position 1s;
    -ms-transition:background-position 1s;
    -moz-transition:background-position 1s;
    -webkit-transition:background-position 1s;
    -o-transition:background-position 1s;
    &:hover{
       background-image: url("~@/assets/img/ai/bottomNo.png"),
                    url("~@/assets/img/ai/deviceActive.png");
                    color:#96DBF9;
                    background-position: center 100px,center 40px;
    }
  }


  .imgDeliver{
     width: 159px;
    height: 400px;
    background-image: url("~@/assets/img/ai/bottomActive.png"),
    url("~@/assets/img/ai/deliver.png");
    background-position: center 100px,center 60px;
    background-repeat: no-repeat,no-repeat;
    background-size: 100% 60%,72% 30%;
  }
  .imgDeliverBack{
     width: 159px;
    height: 400px;
    background-image: url("~@/assets/img/ai/bottomActive.png"),
    url("~@/assets/img/ai/deliver.png");
   background-position: center 100px,center 60px;
    background-repeat: no-repeat,no-repeat;
    background-size: 100% 60%,72% 30%;
    transition:background-position 1s;
    -ms-transition:background-position 1s;
    -moz-transition:background-position 1s;
    -webkit-transition:background-position 1s;
    -o-transition:background-position 1s;
  }
  .imgDeliverActive{
    width: 159px;
    height: 400px;
    background-image: url("~@/assets/img/ai/bottomActive.png"),
   url("~@/assets/img/ai/deliver.png");
    background-position: center 100px,center 60px;
    background-repeat: no-repeat,no-repeat;
    background-size: 100% 60%,72% 30%;
    transition:background-position 1s;
    -ms-transition:background-position 1s;
    -moz-transition:background-position 1s;
    -webkit-transition:background-position 1s;
    -o-transition:background-position 1s;
    &:hover{
       background-image: url("~@/assets/img/ai/bottomNo.png"),
                    url("~@/assets/img/ai/deliverActive.png");
                    color:#96DBF9;
                    background-position: center 100px,center 35px;
    }
  }


  .imgUser{
    width: 159px;
    height: 400px;
    background-image: url("~@/assets/img/ai/bottomActive.png"),
    url("~@/assets/img/ai/user.png");
    background-position: center 100px,center 60px;
    background-repeat: no-repeat,no-repeat;
    background-size: 100% 60%,72% 30%;
  }
  .imgUserBack{
     width: 159px;
    height: 400px;
    background-image: url("~@/assets/img/ai/bottomActive.png"),
    url("~@/assets/img/ai/user.png");
    background-position: center 100px,center 60px;
    background-repeat: no-repeat,no-repeat;
    background-size: 100% 60%,72% 30%;
    transition:background-position 1s;
    -ms-transition:background-position 1s;
    -moz-transition:background-position 1s;
    -webkit-transition:background-position 1s;
    -o-transition:background-position 1s;
  }
  .imgUserActive{
    width: 159px;
    height: 400px;
    background-image: url("~@/assets/img/ai/bottomActive.png"),
   url("~@/assets/img/ai/user.png");
    background-position: center 100px,center 60px;
    background-repeat: no-repeat,no-repeat;
    background-size: 100% 60%,72% 30%;
    transition:background-position 1s;
    -ms-transition:background-position 1s;
    -moz-transition:background-position 1s;
    -webkit-transition:background-position 1s;
    -o-transition:background-position 1s;
    &:hover{
       background-image: url("~@/assets/img/ai/bottomNo.png"),
                    url("~@/assets/img/ai/userActive.png");
                    color:#96DBF9;
                    background-position: center 100px,center 35px;
    }
  }


  .imgData{
    width: 238px;
    height: 478px;
    background-image: url("~@/assets/img/ai/bigBottomActive.png"),
    url("~@/assets/img/ai/data.png");
      background-position: center 100px,center 40px;
    background-repeat: no-repeat,no-repeat;
    background-size:100% 75%,73.5% 37.8%;
  }
  .imgDataBack{
    width: 238px;
    height: 478px;
    background-image: url("~@/assets/img/ai/bigBottomActive.png"),
    url("~@/assets/img/ai/data.png");
     background-position: center 100px,center 40px;
    background-repeat: no-repeat,no-repeat;
    background-size:100% 75%,73.5% 37.8%;
    transition:background-position 1s;
    -ms-transition:background-position 1s;
    -moz-transition:background-position 1s;
    -webkit-transition:background-position 1s;
    -o-transition:background-position 1s;
  }
  .imgDataActive{
     width: 238px;
    height: 478px;
    background-image: url("~@/assets/img/ai/bigBottomActive.png"),
   url("~@/assets/img/ai/data.png");
      background-position: center 100px,center 40px;
    background-repeat: no-repeat,no-repeat;
    background-size:100% 75%,73.5% 37.8%;
    transition:background-position 1s;
    -ms-transition:background-position 1s;
    -moz-transition:background-position 1s;
    -webkit-transition:background-position 1s;
    -o-transition:background-position 1s;
    &:hover{
       background-image: url("~@/assets/img/ai/bigBottomNo.png"),
                    url("~@/assets/img/ai/dataActive.png");
                    color:#96DBF9;
                    background-position: center 100px,center 20px;
    }
  }

  .imgAi{
    width: 238px;
    height: 478px;
    background-image: url("~@/assets/img/ai/bigBottomActive.png"),
    url("~@/assets/img/ai/ai.png");
    background-position: center 100px,center 40px;
    background-repeat: no-repeat,no-repeat;
    background-size:100% 75%,73.5% 37.8%;
  }
  .imgAiBack{
    width: 238px;
    height: 478px;
    background-image: url("~@/assets/img/ai/bigBottomActive.png"),
    url("~@/assets/img/ai/ai.png");
    background-position: center 100px,center 40px;
    background-repeat: no-repeat,no-repeat;
    background-size:100% 75%,73.5% 37.8%;
    transition:background-position 1s;
    -ms-transition:background-position 1s;
    -moz-transition:background-position 1s;
    -webkit-transition:background-position 1s;
    -o-transition:background-position 1s;
  }
  .imgAiActive{
    width: 238px;
    height: 478px;
    background-image: url("~@/assets/img/ai/bigBottomActive.png"),
   url("~@/assets/img/ai/ai.png");
    background-position: center 100px,center 40px;
    background-repeat: no-repeat,no-repeat;
    background-size:100% 75%,73.5% 37.8%;
    transition:background-position 1s;
    -ms-transition:background-position 1s;
    -moz-transition:background-position 1s;
    -webkit-transition:background-position 1s;
    -o-transition:background-position 1s;
    &:hover{
       background-image: url("~@/assets/img/ai/bigBottomNo.png"),
                    url("~@/assets/img/ai/aiActive.png");
                    color:#96DBF9;
                    background-position: center 100px,center 20px;
    }
  }

  .imgContainer{
    height: 100%;
    // background-color: red;
    width: 90%;
    margin: 0 auto;
    padding: auto;
    display: flex;
    align-items: center;   // 垂直居中，针对的是mycontainer类下面的子元素，不包含“孙子”元素
    justify-content: space-between; 
  }

  .containerUp{
    cursor: pointer;
    color: #93CFFE;
    margin-bottom: 270px;
  }
   
  .containerDown{
      color: #93CFFE;
     cursor: pointer;
    margin-top: 10px;
  }
  .titleDown{
      font-size: 16px;
    text-align: center;
    padding-top: 340px;
  }
}
</style>
