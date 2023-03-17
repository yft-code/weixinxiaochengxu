<template>
   <div>
     <div id="cesiumContainer"></div>
    </div>
</template>
<script>
import html2canvas from "html2canvas"
import { modleFn, abbrImg, leftClickEntity, CameraFlyTo, bubbleChartsFn } from '../utils/baseCom/commonFunc.js'
export default {
    name: 'LzBasecom',
    props:{
    initParams:{
      type: Object,
      default:()=>({})
    },
    baseModel:{
      type: Object,
      default:()=>({})
    },
    centeropt:{
       type: Object,
       default:()=>({})
    },
    immersionChart:{
       type: Array,
       default:()=>([])
    },
    bubble:{
       type: Array,
       default:()=>([])
    }
    },
    data(){
      return{
          viewer: {},
        }
    },
 async mounted() {
      // 初始化cesium
      this.viewer = new this.Cesium.Viewer("cesiumContainer", {
        ...this.initParams
      });
      // 隐藏logo
      this.viewer._cesiumWidget._creditContainer.style.display = "none";
      this.viewer.scene.globe.depthTestAgainstTerrain = false;
      leftClickEntity(this.viewer,this.Cesium)
      // 初始化视角
     this.centeropt.x &&  CameraFlyTo(this.viewer,this.Cesium,this.centeropt)
      // 添加模型
      this.handleModel()
      // 添加广告牌 - Html页面转换
      this.immersionChart.map(item=>{
          this.handleBillboard(item)
      })
      // 添加气泡图标
      this.bubble.map(item=>{
           bubbleChartsFn(this.viewer,this.Cesium,item.position,item.bubbleImage)
      })
    },
    methods: {
      // 广告牌
     async handleBillboard(data){
      let that = this
       await html2canvas(document.getElementById(data.id), {
              dpi: 1000,
              scale:1
              }).then(function(canvas) {
              let image = canvas.toDataURL("png");
              abbrImg(that.viewer,that.Cesium,image,data.max,data.min,data.positions)
              }).catch(()=>{})
      },
     // 模型
      handleModel(){
        if(this.baseModel.modelData){
           modleFn(this.viewer,this.Cesium,this.baseModel.modelData,"",this.baseModel.type, 1); 
        }
      }
    }
}
</script>
<style scoped>
 
</style>
