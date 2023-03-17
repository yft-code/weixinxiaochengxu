<template>
  <div v-if="$store.state.messageShow">
  <div class="messageContainer">
  <div class="messageTop">
   <div class="messages">
     <div class="messagesOne">
       <img width="20" height="20" src="@/assets/img/ai/userIcon.png" alt="">
       <div class="userNames">{{userName}}</div>
       <div class="noUsers" @click="exitClick" style="margin-left:15px">我不是{{userName}}</div>
     </div>
     <div style="color:white;cursor:pointer;" @click="closeMessage">X</div>
   </div>
   <div class="commonOut">
    <div class="commonName">公司名称</div>
    <div class="commonInner">一拓有限公司</div>
   </div>
    <div class="commonOut">
    <div class="commonName">岗位</div>
    <div class="commonInner">前端</div>
   </div>
    <div class="commonOut">
    <div class="commonName">工号</div>
    <div class="commonInner">117898999</div>
   </div>
   </div>
</div>
  </div>
</template>

<script>
import { websocketclose } from "@/plugin/socket";
export default {
data(){
    return{
         userName:''
    }
},
created(){
 if (localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo")) && JSON.parse(localStorage.getItem("userInfo"))['aiHorizon']) {
        this.userName = JSON.parse(localStorage.getItem("userInfo"))['aiHorizon'].name;
      }
},
methods:{
      closeMessage(){
      this.$store.state.iframeShow=false
      this.$store.state.messageShow=false
    },
     exitClick() {
      this.$store.state.messageShow=false
      this.toPath("/");
      websocketclose();
      var token = JSON.parse(localStorage.getItem("token"));
      token.aiHorizon = "";
      localStorage.setItem("token", JSON.stringify(token));
    },
}
}
</script>

<style  lang="scss" scoped>
.messageContainer{
    width: 300PX;
    background: rgba(3,31,44, 0.64);
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
   .messages{
    display:flex;
    justify-content:space-between;
     align-items:center;
     margin-bottom:15PX;
   }
   .messagesOne{
    display:flex;
    height:30PX;
    align-items:center;
   }
   .userNames{
    font-size: 14PX;
    color:#25BCFF;
    margin-left:5PX;

   }
   .noUsers{
    cursor: pointer;
    font-size:12PX;
    color:#30F3FF;
    margin-left:15PX;
   }
   .messageTop{
    padding:5PX 10PX 13PX 5PX ;
   }
   .commonOut{
display:flex;
height:25PX;
margin-left:10PX;
   }
   .commonName{
    font-size: 12PX;
    width: 60PX;
    color:rgba(255,255,255,0.6);
    text-align: left;
   }
   .commonInner{
    color:#fff;
     font-size: 12PX;
   }
}
</style>