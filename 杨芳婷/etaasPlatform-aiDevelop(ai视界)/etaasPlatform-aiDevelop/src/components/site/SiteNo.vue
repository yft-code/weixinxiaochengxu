<template>
    <div :id="tableid" class="site-container">
      <div style="margin:0 auto;width:120px">
       <div class="c-imgs">
        <img width="100%" height="100%" src="../../assets/digital/assets/img/camera/newCamera.png" alt="">
        <div class="c-words">{{num}}</div>
       </div>
       </div>
    </div>
</template>
<script>
// import titleToolVue from "./titleTool/index.vue";
export default {
  props: ["tableid",'title','mark','num'],
  data() {
    return {
      // iconPath: require("../../../assets/cesium/exhaust.svg"),
    };
  },
  components: {
    // titleToolVue,
  },
  methods:{
changeClick(){
      
}
  }
}
</script>
<style scoped>
.active{
  display: none;
}
.c-imgs{
  position:relative;
  width: 56px;
  margin: 0 auto;
  height: 69px;
}
.c-words{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: red;
      font-size: 30px;
      opacity:1;
}
.site-container{
     width: 180px;
     height: 110px;
     background-color: transparent;
     /* opacity:0; */
     /* background: rgba(200, 54, 54, 0.5); */
}
 .warning-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #ffffff;
      font-size: 30px;
    }
.device{
  display: flex;
  justify-content: center;
  align-items: center;
  color: aqua;
}
</style>
