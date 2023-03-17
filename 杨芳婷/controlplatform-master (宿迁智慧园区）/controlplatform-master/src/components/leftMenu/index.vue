<template>
  <div>
    <div class="leftMenu" :class="[$store.state.menuShow ? 'leftMenuSide' : '']">
      <siderBar/>
      <div :class="[$store.state.menuShow ? 'toggle' : 'toggleSide']" >
          <i
          @click="menuClick"
          v-if="$store.state.menuShow"
          class="iconfont icon-Expand fn pointer"
        ></i>
          <i
          @click="menuClick"
          v-else
          class="iconfont icon-Collect fn pointer"
        ></i>
        </div>
    </div>
  </div>
</template>
<script>
import siderBar from '@/views/siderBar/index.vue'
export default {
  components:{
      siderBar
  },
  data(){
    return{
  
    }
  },
  mounted() {
  },
  methods: {
   menuClick(){
     this.$store.state.menuShow = !this.$store.state.menuShow;
   }
  },
};
</script>

<style lang="scss" scoped>
.leftMenu{
  transition: width 0.4s;
  width:256px;
  background:#292D3A;
  min-height: calc(100vh - 64px);
  overflow: auto;
  position: fixed;
  top:64px;
}
.leftMenuSide{
  transition: width 0.4s;
  width:54px;
}
.toggle{
  text-align: center;
  width: 54px;
  line-height: 53px;
  height: 53px;
  border-top: 1px solid rgba(255,255,255,0.24);
  color: rgba(255,255,255,1);
  position:fixed;
  bottom:0px;
  transition: width 0.4s;
}
.toggleSide{
  text-align: right;
  padding-right: 21px;
  width: 256px;
  line-height: 53px;
  height: 53px;
  border-top: 1px solid rgba(255,255,255,0.24);
  color: rgba(255,255,255,1);
  position:fixed;
  bottom:0px;
  transition: width 0.4s;
}
</style>