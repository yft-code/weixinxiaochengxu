<template>
  <div>
    <largeScreen/>
     <img class="bg" src="@/assets/img/index/bg.png"/>
  </div>
</template>

<script>
import remway from '@/utils/mixin.js'
import largeScreen from "@/components/largeScreen/index.vue"
export default {
 mixins:[remway],//混入 common对象
 mounted(){
      this.rem()
       window.onresize = ()=> {
      this.rem()
     }

 },
 components:{
    largeScreen
 },
}
</script>

<style>
.bg{
    width: 100vw;
    height: 100vh;
}
</style>