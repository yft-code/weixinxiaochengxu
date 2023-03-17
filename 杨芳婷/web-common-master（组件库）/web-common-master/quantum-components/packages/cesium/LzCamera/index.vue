<template>
  <div>
  
  </div>
</template>
<script>
import {addCamera} from '../utils/camera/camera'
export default {
  name: "LzCamera",
  props: {
    cameraData: {
      default:[],
      type: Array,
    },
      viewer:{
        default:{},
        type: Object,
      },
      dataSource:{
        default:null,
      },
  },
  data() {
    return {

    };
  },
  mounted() {
    this.initData();
  },
  watch:{
     dataSource:{
       handler(val){
        if(val){
           let devices = [];
           for (let item of this.cameraData) {
              let tmpObj = {
                id: item.id,
                title: item.name,
                center: {
                  longitude: item.longitude,
                  latitude: item.latitude,
                  height: item.height,
                },
                tagname: "摄像头" + item.id,
                perspective: {
                  y: item.latitude + 0.0014277634220078994,
                  x: item.longitude + 0.000982449335353408,
                  z: item.height + 35,
                  heading: 220.7,
                  pitch: -6.2,
                  roll: 0.2,
                },
              };
                devices.push(tmpObj);
            }
            devices.map(element=>{
              addCamera(val, element);
            })
        }
       },
       immediate:true
     }
  },
  methods: {
    initData(){

    },
  },
};
</script>
<style scoped>
.bubbleStyle {
  position: absolute;
  width: 500px;
  top:0px;
  left:0px;
}
.equipmentItem {
  width: 88%;
  margin-top: 9px;
  height: 30px;
  line-height: 30px;
 
}
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
/*  */
.all {
  width: 230px;
  height: 174px;
  pointer-events:all;
  position: absolute;
  left:0px;
}
.equipmentDetails {
  width: 230px;
  height: 174px;
  background: url("~@/assets/cesium/bubble/bg.png") no-repeat;
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
  width:12px;
  right:0px;
  top:0px;
  cursor: pointer;
}
.equipmentDone{
  color:#0BE6D4 !important;
}
</style>
