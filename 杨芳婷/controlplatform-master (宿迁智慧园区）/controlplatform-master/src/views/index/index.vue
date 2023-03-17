<template>
  <div class="indexContainer">
     <Header></Header>
     <div class="main-container">
      <left-Menu></left-Menu>
     <div class="right-content" :class="[$store.state.menuShow ? 'right-content-side' : '']">
       <router-view/>
     </div>
     </div>
  </div>
</template>
<script>
import Header from "@/components/header/index.vue";
import leftMenu from "@/components/leftMenu/index.vue"
export default {
  components: {Header,leftMenu},
  name: "Index"
};
</script>
<style lang="scss" scoped>
.indexContainer{
  background-color:#F0F2F5;
}
.main-container{
  display: flex;
}
.right-content{
   flex: 1;
   margin:17px 20px;
   margin-left: 276px; 
   overflow: auto;
  // 上下margin(17+17)=34px,头部64px
   min-height: calc(100vh - 98px);
  //  padding: 20px;
   background-color: #fff;
  transition: margin-left 0.4s;
}
.right-content-side{
  transition: margin-left 0.4s;
  // 导航栏的宽度为56px,左边距为20px,(56+20)
  margin-left: 76px; 
}
</style>
