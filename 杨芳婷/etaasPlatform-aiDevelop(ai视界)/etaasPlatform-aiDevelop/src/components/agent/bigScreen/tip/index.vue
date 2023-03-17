<template>
  <div  v-if="$store.state.tipShow">
      <!-- <div class="agentExpand">
         <img src="@/assets/digital/assets/img/bigScreen/expand.png" class="agentImg" 
         @click="expandClick"  :class="[menuShow ? '' : 'expandImgToate']"/>
      </div> -->
      <div class="agentMenu" v-if="menuShow">
      <div class="agentLi angentLocation" >
        <div  class="angetTitle">
        <div>
          <img src="@/assets/img/ai/tip/ico0.png" class="agentImg"/>
        </div>
        交通
        </div>
        <div class="locationContainer" v-show="locationShow">
          <!-- <AngleView></AngleView>
          <AnglePattern></AnglePattern>
          <AnglePage @pageClik="pageClik"></AnglePage> -->
        </div>
      </div>
      <div class="agentLi">
        <div>
           <img src="@/assets/img/ai/tip/ico1.png" class="agentImg"/>
        </div>
      消防演练
      </div>
      <div class="agentLi">
        <div>
            <img src="@/assets/img/ai/tip/ico2.png" class="agentImg"/>
        </div>
        数据报表
      </div>
       <div class="agentLi">
        <div>
           <img src="@/assets/img/ai/tip/ico3.png" class="agentImg"/>
        </div>
        供水
      </div>
     </div>
  </div>
</template>

<script>
// import AngleView from './angleView/index';
// import AnglePattern from  './anglePattern/index';
// import AnglePage  from './anglePage/index';
export default {
  components: {
    // AngleView,
    // AnglePattern,
    // AnglePage,
  },
  data() {
    return {
      locationShow:false,
      menuShow:true
    };
  },
  mounted() {
  
  },
  beforeDestroy() {
    // 在组件生命周期结束的时候销毁。
  
  },
  created() {
    
  },
  methods: {
     angentClick(){
     this.locationShow = !this.locationShow
     },

     pageClik(item){
       this.$emit('pageClik',item)
     },

     expandClick(){
        this.menuShow = !this.menuShow;
      if (this.menuShow === false) {
        this.$store.state.tipShow = true;
      } else {
        this.$store.state.tipShow = false;
      }
     }
  },
};
</script>

<style lang="scss" scoped>

.agentMenu{
 width:80PX;
 margin-top:50px;
//  background: rgba(216,216,216,0.19);
}
.agentLi{
  height:70PX;
  // background: red;
  text-align: center;
  padding-top: 16PX;
}
.angentLocation{
  position: relative;
}
.locationContainer{
  position: absolute;
  width:400PX;
  background: rgba(255, 255, 255, 0.2);
  top:0PX;
  left:135PX;
}
.agentImg{
  width: 32PX;
  height: 32PX;
  margin:0 auto;
  display: block;
  margin-bottom: 5PX;
  cursor: pointer;
}
.agentExpand{
  width:100%;
  height:100PX;
  padding-top:40PX;
}
.expandImgToate {
  transform: rotate(180deg);
}
.angetTitle{
  cursor: pointer;
}
</style>