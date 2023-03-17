<template>
  <div></div>
</template>

<script>
export default {
    name:'LzRoadHigh',
    props: {
      roadArr: {
      default:[],
      type: Array,
    },
      viewer:{
        default:{},
        type: Object,
      },
      // width:{
      //   default:40,
      //   type:Number,
      // },
      colorRgba:{
        default:function(){
          return [105,105,105,1]
        },
        type: Array,
      },
      outLineColor:{
        default:function(){
          return [105,105,105,1]
        },
        type: Array,
      },
  },
  watch:{
     viewer:{
       handler(val){
        if(Object.keys(val).length !== 0){
             this.getRoad()
        }
       },
       immediate:true
     }
  },
  data(){
       return{
        rgba:[138,43,226,1],
       }
  },
  created(){
    console.log('88888888');
    // this.flyTo()
  },
  methods:{
    //   flyTo() {
    //   this.viewer.qtum.centerAt({
    //     y:27.963888,
    //     x:105.919102,
    //     z:860.93,
    //     heading:82.3,
    //     pitch:-18,
    //     roll:0.5
    //   });
    // },
    getRoad(){
      this.viewer.entities.getById("Road1")&& this.viewer.entities.remove({id:'Road1'})
      this.viewer.entities.getById("Road2")&& this.viewer.entities.remove({id:'Road2'})
       let entity =  this.viewer.entities.add({
              id:'Road1',
              polygon: {
                show:true,
                hierarchy: new Cesium.Cartesian3.fromDegreesArray(this.roadArr),
                width:10,
                material : new Cesium.Color.fromCssColorString(
                // "rgba(138,43,226,1)"
                `rgba(${this.colorRgba[0]},${this.colorRgba[1]},${this.colorRgba[2]},${this.colorRgba[3]})`
               ),
                outline : false,
              // outlineColor : Cesium.Color.BLACK
        }
      })
      // 获取不规则图形的点位
       let positions = entity.polygon.hierarchy._value.positions;
       this.viewer.entities.add({
       id:'Road2',
        name: 'boderLine',
        polyline: {
            positions: positions,
            width:3,
            // material:Cesium.Color.DEEPSKYBLUE.withAlpha(1.0),
            material:new Cesium.PolylineGlowMaterialProperty({
                      glowPower:1,
                      color:new Cesium.Color.fromCssColorString(
                  `rgba(${this.outLineColor[0]},${this.outLineColor[1]},${this.outLineColor[2]},${this.outLineColor[3]})`
                  ),
                 }),
            clampToGround: true
        }
    })
    },
  }
}
</script>

<style>

</style>