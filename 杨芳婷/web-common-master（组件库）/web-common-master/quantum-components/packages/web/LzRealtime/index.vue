<template>
  <div ref="realTime">
    <div v-if="nomalMode">
      <div class="cabinCalendar">
         <img src="../../assets/lzRealtime/calendar.png" class="cabinCalendarImg" v-if="imgShow"/>
         {{currentDate}}
        </div>
        <div class="cabinTime">
           <img src="../../assets/lzRealtime/time.png" class="cabinTimeImg" v-if="imgShow"/>
          {{currentTime}}
        </div>
        <div class="clear"></div>
     </div>
      <div v-if="!nomalMode">
        <div class="cabinTime">
           <img src="../../assets/lzRealtime/time.png" class="cabinTimeImg" v-if="imgShow"/>
          {{currentTime}}
        </div>
        <div class="cabinCalendar" >
         <img src="../../assets/lzRealtime/calendar.png" class="cabinCalendarImg" v-if="imgShow"/>
         {{currentDate}}
        </div>
        <div class="clear"></div>
        
     </div>
  </div>
</template>
<script>

export default {
  name:'LzRealtime',
  props:{
     color: {
       type:String,
       default:'#000'        
    },
    imgShow: {
      type:Boolean,
      default:true
    },
    nomalMode: {
      type:Boolean,
      default:true
    },  
  },
  data() {
    return {
     currentDate:'',
     currentTime:'',
     dataURL:''
    };
  },
  mounted() {
    setInterval(this.getTime,1000)
    this.getDate();
    this.getTime();
    this.initSetting();
  },
  created(){

     
  },
  methods: {
    initSetting(){
       this.$refs.realTime.style.color= this.color;
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
  },
};
</script>
<style scoped>
.cabinCalendar{
  float:left;
  margin-left:10px;
}
.cabinTime{
  float:left;  
  margin-left:10px;
}
.cabinCalendarImg{
  float:left;
  width:15px; 
  margin-right:5px;
  margin-top:3px;
}
.cabinTimeImg{
  float:left;
  width:18px;
  margin-top:2px;
}
.clear{
  clear:both
}
</style>
