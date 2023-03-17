<template>
    <div class="workAreaTable" :id="billboard.id">
    <div class="equipmentDetails">
      <div class="equipmentHeader">
        <img
          class="icoStyle"
          src="@/assets/cesium/billboard/ico.png"
          alt=""
        />
        <span class="equipmentHeaderTitle">{{billboard.name}}</span>
        
        <span class="clear"></span>
      </div> 
      <div class="workAreaHead">
        <div class="workAreaHeadLi" v-for="(item,index) in headerList" :key="index" :style="{width:item.width}">
          {{item.title}}
        </div>
        <div class="clear"></div>
      </div>
      <div class="workAreaBody">
        <div class="workAreaBodyLi" v-for="(item,index) in billboard.data" :key="index">
           <div class="workAreaDetail" style="width:20%">
             {{item.time}}
           </div>
            <div class="workAreaDetail" style="width:10%">
             {{item.people}}
           </div>
            <div class="workAreaDetail" style="width:15%">
             {{item.area}}
           </div>
            <div class="workAreaDetail" style="width:10%">
             {{item.floor}}
           </div>
            <div class="workAreaDetail" style="width:25%">
             {{item.frequency}}
           </div>
            <div class="workAreaDetail" style="width:20%;color:#0BE6D4">
             {{item.complete}}
           </div>
            <div class="clear"></div>
        </div>
      </div> 
      <div class="workAreaImg">
        <img src="@/assets/cesium/billboard/pre.png" class="preImg"/>
        <img src="@/assets/cesium/billboard/next.png"/>
      </div>
    </div>
  </div>
</template>
<script>
import {addFeature} from '../utils/hook/hookChars'
export default {
  name: "LzBillboard",
  props: [ "billboard","viewer"],
  data() {
    return {
       headerList:[
        {
          title:'时间',
          width:'20%'
        },
        {
           title:'人员',
           width:'10%'
        },
        {
           title:'区域',
           width:'15%'
        },
        {
           title:'楼层',
           width:'10%'
        },
        {
           title:'保洁次数/天',
           width:'25%'
        },
        {
           title:'完成情况',
           width:'20%'
        }
      ]
    };
  },
  mounted() {
    this.initData();
  },
  watch:{
     viewer:{
       handler(val){
        if(Object.keys(val).length !== 0){
          addFeature(this.billboard,val);
        }
       },
       immediate:true
     }
  },
  methods: {
    initData(){
    }
  },
};
</script>
<style scoped>
.workAreaTable {
  width: 464px;
  height: 245px;
  position: absolute;
  pointer-events:all;
  top:0;
  left:-5000px;
  z-index: 9999;
}
.equipmentDetails {
  width: 464px;
  height: 256px;
  background: url("~@/assets/cesium/billboard/bg.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 12px;
  position: relative;
}

.equipmentHeader {
  height: 20px;
  margin-bottom:8px;
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
  font-weight: 500;
}
.clear{
  clear:both;
}
.workAreaHead{
  background: rgba(255,255,255,0.2);
  font-weight: 400;
  color: rgb(180,180,180);
  font-size: 14px;
  padding:0 12px;
}
.workAreaHeadLi{
  float:left;
  line-height: 24px;
}
.workAreaBodyLi{
  background: url("~@/assets/cesium/billboard/areaTable.png") no-repeat;
  height:28px;
  padding:6px 12px;
  
}
.workAreaBody{

}
.workAreaDetail{
  font-family: HelveticaNeue;
  color: #FFFFFF;
  font-size: 14px;
  float:left;
}
.workAreaImg{
  margin-top:8px;
  text-align: right;
}
.preImg{
  margin-right:8px;
  cursor: pointer;
}
</style>
