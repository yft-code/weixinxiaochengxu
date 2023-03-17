<template>
  <div class="all" :id="healthBubbleid" v-if="firesShow">
    <div class="equipmentDetails" v-if="fireShow">
      <div class="equipmentHeader">
        <span class="equipmentHeaderTitle">{{title}}</span>
        <img
          class="closeImg"
          src="@/assets/agent/img/close.svg"
          alt=""
          @click="closeClick"
        />
        <span class="clear"></span>
      </div>
      <div class="equipmentContent">
         <div style="display:flex;justify-content:space-around;align-items:center;">
           <div class="roll">
               <div class="circles">
                <p class="word">已使用</p>
                <p class="word">{{used}}</p>
               </div>
           </div>
            <div class="rollTotal">
               <div class="circlesTotal">
                <p class="word">总数</p>
                <p class="word">{{total}}</p>
               </div>
           </div>
            <div class="rollLeft">
               <div class="circlesLeft">
                <p class="word">未使用</p>
                <p class="word">{{left}}</p>
               </div>
           </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["healthBubbleid","title","total","left","used",'firesShow'],
  name: "fire",
  data() {
    return {
      fireShow:true
    };
  },
  created() {},
  mounted() {},
   watch:{
      'firesShow': {
          immediate: true,
          deep:true,
          handler (val) {
              if(val){
                this.fireShow = true
              }else{
                this.fireShow = false
              }
          }
      }
  },
  methods: {
    closeClick(){
        this.fireShow=false
        console.log('num',this.title);
        this.$bus.$emit('close')
    // this.$store.state.fireShow= true;
    // this.$store.state.fireShow= false;
    }
  },
};
</script>

<style lang="scss" scoped>
.equipmentItem {
  width: 88%;
  margin-top: 9px;
  height: 30px;
  // background: gold;
  line-height: 30px;
  .left {
    float: left;
    color: #ffffff;
    font-size: 12px;
  }
  .center {
    margin-left: 10px;
    float: left;
    color:  #25bcff;
    font-size: 12px;
    text-align: left;
  }
}
.equipmentContent{
   margin-top: 35px;
}
.roll{
     background:rgba(255,122,68,0.4);
     width: 90px;
     height: 90px;
     border-radius:50%;
     display: flex;
     justify-content:center;
     align-items: center;
    .circles{
    display: flex;
    flex-direction:column;
     justify-content:center;
     align-items: center;
    // background:red;
   border: 1px solid transparent; 
  border-radius: 50%;
    //border-top-color: red;
           border-left-color:#FF7A44;
           border-bottom-color:#FF7A44;
        border-right-color:#FF7A44;
     width: 75px;
     height: 75px;
     border-radius:50%;
     color: #fff;
    } 
    .word{
      color: #fff;
      font-size: 8px;
    }    
}


.rollTotal{
     background:rgba(56,183,253,0.4);
     width: 90px;
     height: 90px;
     border-radius:50%;
     display: flex;
     justify-content:center;
     align-items: center;
    .circlesTotal{
    display: flex;
    flex-direction:column;
     justify-content:center;
     align-items: center;
    // background:red;
   border: 1px solid #38B7FD; 
           border-radius: 50%;
          //  border-top-color: red;
          //  border-right-color: red;
          //  border-bottom-color: red
     width: 75px;
     height: 75px;
     border-radius:50%;
     color: #fff;
    } 
    .word{
      color: #fff;
      font-size: 8px;
    }    
}

.rollLeft{
     background:rgba(2,214,196,0.2);
     width: 90px;
     height: 90px;
     border-radius:50%;
     display: flex; 
     justify-content:center;
     align-items: center;
    .circlesLeft{
    display: flex;
    flex-direction:column;
     justify-content:center;
     align-items: center;
    // background:red;
     border: 1px solid transparent; 
     border-radius: 50%;
          //  border-top-color: red;
          //  border-right-color: red;
          //  border-bottom-color: red;
    border-top-color: #02D6C4;
    border-right-color:#02D6C4;
     width: 75px;
     height: 75px;
     border-radius:50%;
     color: #fff;
    } 
    .word{
      color: #fff;
      font-size: 8px;
    }    
}
/*  */
.all {
  width: 230px;
  height: 174px;
  position: relative;
  pointer-events:all;
}
.equipmentDetails {
  width: 360px;
  height: 200px;
  background: url("~@/assets/digital/assets/img/mode/healthConcern/bg.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 12px 0px 0px 12px;
  position: relative;
}

.equipmentHeader {
  height: 20px;
}

.icoStyle {
  width: 16px;
  height: 16px;
  float:left;
  margin-top:-1px;
}

.equipmentHeaderTitle {
  margin-left:4px;
  color: #25bcff;
  float:left;
  font-size: 14px;
}
.clear{
  clear:both;
}
.equipmentDetail{
  color:#FF833A !important;
}
.closeImg{
  position: absolute;
  width:14px;
  right:0px;
  top:0px;
  cursor: pointer;
}
.equipmentDone{
  color:#0BE6D4 !important;
}
</style>