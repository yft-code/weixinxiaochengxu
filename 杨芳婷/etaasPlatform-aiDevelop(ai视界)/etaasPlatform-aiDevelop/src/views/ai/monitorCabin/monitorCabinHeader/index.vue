<template>
  <div class="cabinHeader">
    <img src="@/assets/img/ai/monitorCabin/bg.png" class="cabinHeaderImg" />
    <img src="@/assets/img/ai/monitorCabin/shadow.png" class="shadowImg" v-if="aiShow"/>
      <div class="left">
        <div class="cabinCalendar">
         <img src="@/assets/img/ai/monitorCabin/calendar.svg" class="cabinCalendarImg"/>
         {{currentDate}}
        </div>
        <div class="cabinTime">
           <img src="@/assets/img/ai/monitorCabin/time.svg" class="cabinTimeImg"/>
          {{currentTime}}
        </div>
        <div class="cabinWeather">
          <img src="@/assets/img/ai/monitorCabin/clound.svg" class="weatherImg" 
          v-if="code === '101'||code === '102'||code === '103'||code === '104'||code === '151'||code === '152'||code === '153'"/>
           <img src="@/assets/img/ai/monitorCabin/sun.svg" class="weatherImg" 
          v-if="code === '100'||code === '150'"/>
           <img src="@/assets/img/ai/monitorCabin/rain.svg" class="weatherImg" 
          v-if="Number(code)>299 && Number(code)<=399"/>
           <img src="@/assets/img/ai/monitorCabin/snow.svg" class="weatherImg" 
          v-if="Number(code)>399 && Number(code)<=499"/>
          {{temp}}°C
        </div>
        <div class="clear"></div>
      </div>
      <div class="center">
      </div>
      <div class="right">
        <div class="aiName" @click="aiClick" v-if="aiShow">
          <img src="@/assets/img/ai/monitorCabin/ai.svg" class="aiImg"/>
          视界中心</div>
        <div class="userName">
          <img src="@/assets/img/ai/monitorCabin/user.svg" class="userImg"/>
          {{userName}}</div>
        <div class="exit" @click="loginOut">退出</div> 
        <div class="clear"></div>
      </div>
     
  </div>
</template>

<script>
import { websocketclose } from "@/plugin/socket";
import { getWeather } from "@/api/ai/monitorCabin";
export default {
  name: "monitorCabinHeader",
  data() {
     return{
       currentTime:'',
       currentDate:'',
       userName:'',
       code:'100',
       temp:'20',
     } 
  },
  props: {
    aiShow: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
     if (localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo")) && JSON.parse(localStorage.getItem("userInfo"))['aiHorizon']) {
        this.userName = JSON.parse(localStorage.getItem("userInfo"))['aiHorizon'].name;
      }
     setInterval(this.getTime,1000)
     this.getTime();
     this.getDate();
     this.getData();
  },
  methods: {
    getData(){
      getWeather().then((res) => {
        if(res.result){
          this.code = res.result.code;
          this.temp = res.result.temp;
        }
      });

    },
    
    //获取时间，整理格式
    getDate() {
       let dt = new Date();
       let year = dt.getFullYear();
       let month = dt.getMonth() + 1;
       let date =  dt.getDate();
       if(month < 10){
         month = '0' + month;
       }
       if(date < 10){
         date = '0' + date;
       }
       this.currentDate = year + '/' + month + '/' + date;
    },

    getTime() {
        let dt = new Date();
        let hour = dt.getHours();//获取时
        let minute = dt.getMinutes();//获取分
        let second = dt.getSeconds();//获取秒
        if(minute<10){
          minute = '0' + minute
        }
        if(second<10){
          second = '0' + second
        }
        this.currentTime = hour + ":" + minute + ":" + second ;
    },

    // 注销 - 返回登录页面
    loginOut() {
      this.$store.state.islogin = false
      this.toPath("/");
      websocketclose();
      let token = JSON.parse(localStorage.getItem('token'))
      token.aiHorizon = ""
      localStorage.setItem("token",JSON.stringify(token));
    },

    aiClick(){
      this.$router.push({
        path:'/horizonCenter'
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.cabinHeader{
  // width:100%;
  // height: 100%;
}
.cabinHeaderImg{
   width:100%;
   position:absolute;
}
.left{
  position: absolute;
  left:25px;
  top:36px;
  color:#fff;
}
.center{
  text-align: center;
  padding-top:20px;
  color:#fff;
  position: relative;
}
.shadowImg{
  position: absolute;
  width:302px;
  left:calc(50% - 151px);
}
.centerCn{
   font-size: 24px;
   font-weight: 540;
}
.centerEn{
  font-size: 16px;
  margin-top:8px;
}
.right{
  position: absolute;
  right:40px;
  top:36px;
  color:#fff;
}
.clear{
  clear:both;
}
.aiName{
  float:left;
  margin-right:20px;
  cursor: pointer;
}
.userName{
  float:left;
  margin-right:20px;
}
.exit{
  float:left;
  cursor: pointer;
}
.cabinCalendar{
  float:left;
}
.cabinTime{
  float:left;  
  margin-left:20px;
}
.cabinCalendarImg{
  width:18px;
  margin-top:-5px;
  margin-right:5px;
}
.cabinTimeImg{
  width:18px;
  margin-top:-3px;
}
.aiImg{
  width:18px;
  margin-top:-3px; 
  margin-right:5px;
}
.weatherImg{
   width:18px;
   margin-top:-3px; 
   margin-left:20px;
   margin-right:5px;
}
.userImg{
  width:18px;
  margin-top:-3px;
  margin-right:5px;
}
.cabinWeather{
  float:left;
  color:#fff;
}
</style>