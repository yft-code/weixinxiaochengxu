<template>
  <div id="app" class="height-all">
    <router-view />
  </div>
</template>
<script>
export default{
    created(){
      if (localStorage.getItem("token")) {
        this.$store.state.isLogin=true
      }else{
       this.$store.state.isLogin=false
    }
    }
}
</script>
<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
  line-height: 1;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
