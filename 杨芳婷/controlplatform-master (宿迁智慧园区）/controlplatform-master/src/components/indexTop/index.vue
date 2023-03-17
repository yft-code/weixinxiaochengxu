<template>
  <div>
     <div class="indexTop">
       <img class="headerTop"  src="@/assets/img/index/headertop.png" alt="">
       <div class="headerContainer">
        <div class="containers">
               <div class="lefts">
                 <img class="timeImg" src="@/assets/img/index/time.png" alt="">
                 <div class="time">{{week}}&nbsp;&nbsp;{{currentDate}} {{currentTime}}</div>
               </div>
               <div class="centers"></div>
               <div class="rights">
                <div class="input">
               <el-input
                  @input.native="inputValue($event, value)"
                  placeholder="请输入内容"
                  v-model="value">
                <i slot="suffix" class="el-input__icon el-icon-search icon" @click="search"></i>
              </el-input>
              <div class="dialog" @click="showSearchs" v-show="showSearch">弹框</div>
                </div>
                <div class="bgContainer">
                <img class="notify" src="@/assets/img/index/notify.png"/>
                <div class="number">12</div>
                </div>
              
                <img class="managePhoto" src="@/assets/img/index/tools.png"/>
                <div class="managerWord">管理员</div>
                <img class="imgControl" src="@/assets/img/index/control.png" alt="">
               </div>
        </div>
       </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      showSearch:false,
      value:'',
        currentTime:'',
       currentDate:'',
       userName:'',
       code:'100',
       temp:'20',
       week:'',
    }
  },
    mounted() {
     setInterval(this.getTime,1000)
     this.getTime();
     this.getDate();
     this.week=this.getWeekDate()
   
  },
   methods:{
    inputValue($event, value){
      console.log('e23eee',value);
      this.showSearch=true
    },
    showSearchs(){
    this.showSearch=false
    },
    search(){
       this.showSearch=false
       console.log('搜索');
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
       this.currentDate = year + '-' + month + '-' + date;
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
    // 获取当前是周几
    getWeekDate() {
	   var now = new Date();
	   var day = now.getDay();
	   var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
	   var week = weeks[day];
	   return week;
	}
   }
}
</script>

<style lang="scss" scoped>
.indexTop{
  height: 7.8vh;
    background: radial-gradient(rgba(0,0,0,0.20), rgba(0,0,0,0.85), rgba(0,0,0,0.45));
  // background-color: cadetblue;
}
.headerTop{
    margin: 0 4.73vw;
    width: calc(100vw - 9.46vw);
    height: 100%;
}
.headerContainer{
   position: absolute;
   top:0;
   left:0;
   width: 100%;
   height: 7.8vh;
}
.containers{
  width: 100%;
  height: 7.8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 7.8vh;
  // background: #000;
}
.centers{
flex: 1;
}
.lefts,.rights{
  color: #539DFC;
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 0.16rem;
}
.timeImg{
  margin-left: 0.83vw;
  // height: 2.5vh;
  width: 1.6vw;
}
.time{
  font-size: 0.2rem;
  margin-left: 0.625vw;

}
.imgControl{
  margin-right: 0.625vw;
  width: 3.4vw;
  // height: 7.23vh;
}
.managerWord{ 
  font-size:0.2rem;
  margin-right:3.33vw;
}
.bgContainer{
  height: 100%;
  position: relative;
}
.notify{
   margin-right:1.3vw;
   width:1.35vw;
  //  height: 2.76vh;
   border-radius:50%;
}
.number{
  border-radius:50%;
  top:1.3vh;
  left:0.65vw;
  position: absolute;
  min-width: 1.04vw;
  height: 2.12vh;
  background:red;
  color: #fff;
  font-size: 0.07rem;
  z-index: 100;
  line-height: 2.12vh;
  text-align: center;
}
.managePhoto{
  margin-right: 0.625vw;
  width:1.35vw;
  // height: 2.76vh;
  border-radius:50%;
}
.input{
   position: relative;
   width:12vw;
   margin-right: 1.25vw;
   .dialog{
    transform: all;
    top:6.2vh;
    // left:-2.34vw;
    position: absolute;
    width: 12vw;
    min-height:15vh;
   background: radial-gradient(rgba(0,0,0,0.20), rgba(0,0,0,0.85), rgba(0,0,0,0.45));
   }
  .icon{
    color: #539DFC;
  }
  /deep/.el-input {
    margin: 0 auto;
    font-size: 0.16rem;
    display: inline-block;
    width: 95%;
}
  /deep/.el-input__inner {
    color: rgba(198, 189, 189, 0.9);
    border-radius: 0px;
    border: 1px solid #549FFF;
    font-size: 0.14rem;
    height: 3.19vh;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
   background: rgba(0,0,0,0.30);
}
}
</style>