<template>
  <div class="angleView">
   <div class="userMessage">
        <div class="commonWord">Hi!</div>
        <div class="userName" @click="showMessgae">{{userName}}</div>
        <div class="commonWord">你好,我是小复</div>
    </div>
    <div class="message">
      <div>
        <img style="margin-bottom:3px" width="20" height="20" src="@/assets/img/ai/qiehuanshijiao.png" alt="">
      </div>
      <div class="zuobiao">坐标推荐</div>
      <div @click="getHole" :class="['parkName',{bigCamrea:mark===-1}]">S23 0.0.0 园区南大门鸟瞰</div>
      <div style="margin-right:5px">
        <img width="20" height="20" src="@/assets/img/ai/more.png" alt="">
      </div>
    </div>
  <div class="card_wrap">
	 <div @click="flyTo(item,index)"  :class="['c_item',{active:index===mark}]"  v-for="(item,index) in arr" :key="index">
      <div style="display:flex">
        {{index + 1}}
         <div v-if="item.type==='camera'">
          <img style="margin-left:3px;padding-bottom:3px" width="20" height="20" src="@/assets/img/ai/eyeCamera.png" alt="">
         </div>
          <div v-if="item.type==='door'">
          <img style="margin-left:3px;padding-bottom:3px" width="20" height="20" src="@/assets/img/ai/door.png" alt="">
         </div>
            <div v-if="item.type==='none'">
          <img style="margin-left:3px;padding-bottom:3px" width="20" height="20" src="@/assets/img/ai/zichanbangongshi.png" alt="">
         </div>
           <div v-if="item.type==='tag'">
          <img style="margin-left:3px;padding-bottom:3px" width="20" height="20" src="@/assets/img/ai/baoan.png" alt="">
         </div>
          <div :title="item.title" class="sceneName">{{item.title}}</div>
      </div>
   </div>
</div>
<!-- 信息弹框 -->
<!-- <div class="messageContainer" v-if="messageShow">
  <div class="messageTop">
   <div class="messages">
     <div class="messagesOne">
       <img width="20" height="20" src="@/assets/img/ai/userIcon.png" alt="">
       <div class="userNames">{{userName}}</div>
       <div class="noUsers" @click="exitClick" style="margin-left:15px">我不是{{userName}}</div>
     </div>
     <div @click="closeMessage">X</div>
   </div>
   <div class="commonOut">
    <div class="commonName">公司名称</div>
    <div class="commonInner">一拓有限公司</div>
   </div>
    <div class="commonOut">
    <div class="commonName">岗位</div>
    <div>前端</div>
   </div>
    <div class="commonOut">
    <div class="commonName">工号</div>
    <div>117898999</div>
   </div>
   </div>
</div> -->
  </div>
</template>
<script>
import {
  bingDevice,
  getDevices,
  getDevicePageList,
  getVideoStream,
  getPoint,
} from "@/api/digital/config";
export default {
  data() {
    return {
      userName:'',
      mark:-1,
      remark:false,
      arr:[
          {
          height: 18.624982405659,
          type:'camera',
          id: "65a6cfdc-2912-495d-bb3d-9f4b048c9740",
          latitude: 22.275157862859437,
          longitude: 114.21271130368005,
          name: "东区走廊视频",
          num:'1',
          },
          {
          type:'camera',
          height: -0.0023283910855144353,
          id: "2103656c-37f0-43c1-8acf-28a54fca314b",
          latitude: 22.256422366816732,
          longitude: 114.2029205341959,
          name: "厂区东",
          num:'2'
          },
          {
             altitude: 41.25376634082043,
             buildingName: "新城总部大厦B座",
             comment: "333",
             componentId: null,
             componentPointId: null,
             floor: 2,
             id: "1f02e83a-9370-4e07-8390-2c45b5606657",
             latitude: 22.276278453110177,
             longitude: 114.20623515733804,
            name: "AI实验室",
             parkName: "南京园区",
             type:'tag',
               num:'3'
          },
          {
altitude: -0.0020824699169103354,
buildingId: null,
buildingName: "新城总部大厦B座",
comment: null,
componentId: null,
componentPointId: null,
floor: 6,
id: "9a7773bc-709f-4f70-97b4-06abe5cab891",
latitude: 22.265728854929247,
longitude: 114.18870950786044,
name: "厂区南",
parkName: "南京园区",
type:'tag',
  num:'4'
          },
           {
            name:'大门-主视角',
            type:'door',
            num:'5'
          },
           {
            type:'none',
            name:'物业部',
             y: 22.268669,
            x: 114.214293,
            z: 54.27,
            heading: 246.6,
            pitch: -8.5,
            roll: 357.9,
              num:'6'
          }
          ],
    };
  },
  mounted() {
  },
  beforeDestroy() {
    // 在组件生命周期结束的时候销毁
  },
  created() {
     if (localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo")) && JSON.parse(localStorage.getItem("userInfo"))['aiHorizon']) {
        this.userName = JSON.parse(localStorage.getItem("userInfo"))['aiHorizon'].name;
      }
      // console.log('用户信息',JSON.parse(localStorage.getItem("userInfo"))['aiHorizon']);
      this.getDevices()
  },
  methods: {
      getDevices(){
        const param={
          parkName:this.$store.state.parkName
        }
         
          let devices = [];
          let deviceIds = [];
          let pointlist = [];
          let _this=this
          _this.arr=[]
          getDevices(param)
              .then((res) => {
                if (res.success == true && res.code == 0) {
                  for (let item of res.result) {
                    _this.$store.state.cameraDeviceList.push(item.id);
                    if (
                      item.height == 0.0 &&
                      item.latitude == 0.0 &&
                      item.longitude == 0.0
                    ) {
                      continue;
                    }
                    let tmpObj = {
                      id: item.id,
                      title:item.name,
                      type:'camera',
                      latitude:item.latitude,
                      longitude:item.longitude,
                      height:item.height
                    };
                    deviceIds.push(item.id);
    
                    if(devices&&devices.length<2){
                         devices.push(tmpObj);
                         _this.arr.push(tmpObj)
                    }
                    // console.log('devices',devices,_this.arr);
                    _this.$store.state.deviceBind = deviceIds;
                  }
                }
        })
          .catch(() => {
      }); 

      let params = {
              componentId: "2",
              parkName: this.$store.state.parkName,
            };
            getPoint(params).then(async (res) => {
              if (res.success == true && res.code == 0) {
                // console.log('yyyres',res.result);
             
                for (let item of res.result) {
                  if (
                    item.altitude == 0.0 &&
                    item.latitude == 0.0 &&
                    item.longitude == 0.0
                  ) {
                    continue;
                  }
                  let tmpObj = {
                      id: item.id,
                      title:item.name,
                      type:'tag',
                      latitude:item.latitude,
                      longitude:item.longitude,
                      height:item.altitude,
                      parkName: item.parkName,
                      buildingName: item.buildingName,
                      floor: item.floor,
                      comment: item.comment,
                  };
                  if(pointlist&&pointlist.length<2){
                    pointlist.push(tmpObj);
                    _this.arr.push(tmpObj)
                  }
                  // console.log('pointlist',_this.arr);
                }
              }
            });
           if(_this.$store.state.parkName==='南京园区'){
            _this.arr.push({  
            title:'大门-主视角',
            type:'door',
            num:'5',
            persmitive:{
            y: 22.277989,
            x: 114.223356,
            z: 574.67,
            heading: 239.6,
            pitch: -21.5,
            roll: 358.9,
            }   
          },
          {
            type:'none',
            title:'物业部',
             y: 22.268669,
            x: 114.214293,
            z: 54.27,
            heading: 246.6,
            pitch: -8.5,
            roll: 357.9,
              num:'6'
          }
          )
     }else{
      _this.arr.push({  
            title:'大门-主视角',
            type:'door',
            num:'5',
            persmitive:{
           y: 27.964285,
            x: 105.91934,
            z: 986.99,
            heading: 82.3,
            pitch: -18,
            roll: 0.5,
            }
      },
        {
            type:'none',
            title:'物业部',
             y: 27.96519925309207,
            x: 105.92930218843422 ,
            z: 946.9325665038579,
            heading: 246.6,
            pitch: -8.5,
            roll: 357.9,
              num:'6'
          })
     }
   },
    getHole(){
       this.$store.state.singleShow=false
       this.$store.state.equipmentSingle=false
       this.$store.state.messageShow=false
       this.$store.state.perspectiveSingle=false
       this.$bus.$emit('closeDevice')
    this.mark=-1
     this.$store.state.angleViewList.forEach(element=>{
     if(element.title === '摄像头浏览'&&element.switchShow||
        element.title === '标签展示'&&element.switchShow){
            this.remark=true
        }
 })
        this.$store.state.checkedAngleViewList.forEach(element=>{
         if(element.title === '摄像头浏览'&&element.switchShow||
        element.title === '标签展示'&&element.switchShow){
            this.remark=true
        }
        })
    if(!this.remark){
       this.$bus.$emit('deleteCamera')
       this.$store.state.videoCheckNew = false
    }
      this.$store.state.videoCheckNew = false
      this.$store.state.areaInfoShowNew =false;
       this.$store.state.messageShow=false
    if(this.$store.state.parkName==='南京园区'){
 $viewer.qtum.centerAt({
           y: 22.277989,
            x: 114.223356,
            z: 574.67,
            heading: 239.6,
            pitch: -21.5,
            roll: 358.9,
          });
    }else{
      $viewer.qtum.centerAt({
            y: 27.964285,
            x: 105.91934,
            z: 986.99,
            heading: 82.3,
            pitch: -18,
            roll: 0.5,
          });
    }    
    },
    showMessgae(){
    this.$store.state.videoCheck = false
    this.$store.state.areaInfoShow = false
    this.$store.state.iframeShow=false
    this.$store.state.messageShow=true
    },
  flyTo(item,index){
     this.$store.state.singleShow=false
       this.$store.state.equipmentSingle=false
       this.$store.state.messageShow=false
       this.$store.state.perspectiveSingle=false
    this.$bus.$emit('closeDevice')
     this.$store.state.angleViewList.forEach(element=>{
     if(element.title === '摄像头浏览'&&element.switchShow||
        element.title === '标签展示'&&element.switchShow){
            this.remark=true
        }
 })
        this.$store.state.checkedAngleViewList.forEach(element=>{
         if(element.title === '摄像头浏览'&&element.switchShow||
        element.title === '标签展示'&&element.switchShow){
            this.remark=true
        }
        })
    if(!this.remark){
       this.$bus.$emit('deleteCamera')
    }   
       this.$store.state.videoCheckNew = false
        this.$store.state.areaInfoShowNew =false;
       this.$store.state.messageShow=false
       this.$store.state.iframeShow=false
  this.mark=index
  // console.log('window',window.$viewer);
      if(item.type==='camera'){
        $viewer.qtum.centerAt({
            y: item.latitude + 0.0014277634220078994,
            x: item.longitude + 0.000982449335353408,
            z: item.height + 35,
            heading: 220.7,
           pitch: -6.2,
           roll: 0.2,
          });
          setTimeout(()=>{
             this.$bus.$emit('getSingleCamera',item,index+1)
             this.$store.state.videoCheckNew = true
             this.$store.state.areaInfoNewShow = false
            this.$bus.$emit('setNewCameraId', item.id)
          },3000)
  }else if(item.type==='door'){
      this.$store.state.videoCheckNew = false
     this.$store.state.areaInfoNewShow = false
    // 加载大门视角
     $viewer.qtum.centerAt(item.persmitive);
  }else if(item.type==='tag'){
    // console.log('itemTag',item);
          $viewer.qtum.centerAt({
           y: item.latitude + 0.0014277634220078994,
           x: item.longitude + 0.000982449335353408,
           z: item.height + 35,
           heading: 220.7,
           pitch: -6.2,
           roll: 0.2,
          });
           this.$store.state.areaInfo.parkName=item.parkName
           this.$store.state.areaInfo.buildingName=item.buildingName
           this.$store.state.areaInfo.floor =item.floor
           this.$store.state.areaInfo.comment=item.comment
          setTimeout(()=>{
            this.$bus.$emit('getSingleTag',item,index+1)
            this.$store.state.videoCheckNew = false
            this.$store.state.areaInfoShowNew = true;
            // this.$bus.$emit('setCameraId', item.id)
          },3000)
  } else {
    $viewer.qtum.centerAt({
           y: item.y,
           x: item.x,
           z: item.z,
           heading: item.heading,
           pitch: item.pitch,
           roll: item.roll,
          });
  }
//公共方法加载摄像头   
//   let rectangle =window.$viewer.camera.computeViewRectangle();
// // 弧度转为经纬度，west为左（西）侧边界的经度，以下类推
// let west =rectangle.west / Math.PI * 180;
// let north = rectangle.north / Math.PI * 180;
// let east = rectangle.east / Math.PI * 180;
// let south = rectangle.south / Math.PI * 180;
// console.log('东西南北',west,north,east,south);
}
},
};
</script>

<style lang="scss" scoped>
.messageContainer{
    background: rgba(3,31,44, 0.64);
    position: absolute;
    left:600px;
    top:700px;
    // transform: translate(-50%, -50%);
   .messages{
    display:flex;
    justify-content:space-between;
     align-items:center;
     margin-bottom:15PX;
   }
   .messagesOne{
    display:flex;
    height:30PX;
    align-items:center;
   }
   .userNames{
    font-size: 14PX;
    color:#25BCFF;
    margin-left:5PX;

   }
   .noUsers{
    font-size:12PX;
    color:#30F3FF;
    margin-left:15PX;
   }
   .messageTop{
    padding:5PX 10PX 13PX 5PX ;
   }
   .commonOut{
display:flex;
height:25PX;
margin-left:10PX;
   }
   .commonName{
    font-size: 12PX;
    width: 60PX;
    color:rgba(255,255,255,0.6);
    text-align: left;
   }
   .commonInner{
    color:#fff;
     font-size: 12PX;
   }
}
.angleView{
  cursor: pointer;
  width: 90%;
  margin: 0 auto;
  .card_wrap { // 大盒子
color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; // 替代原先的space-between布局方式
  padding:10PX 0 10PX 0PX;
}
.c_item { // 每个item
    flex: 1;
    display: flex;
    color: #fff;
    font-size: 13PX;
    height: 30PX;
    line-height: 30PX;
    text-align: left;
    margin: 0PX 10PX 0PX 0; // 间隙为5px
    // background-color: #999;
    width: calc((100% - 20PX) / 3); // 这里的20px = (分布个数3-1)*间隙10px, 可以根据实际的分布个数和间隙区调整
    min-width: calc((100% - 20PX) / 3); // 加入这两个后每个item的宽度就生效了
    max-width: calc((100% - 20PX) / 3); // 加入这两个后每个item的宽度就生效了
     display: block;//块状显示
     overflow: hidden;//隐藏文字
      text-overflow: ellipsis;//显示...
    white-space: nowrap; //不换行
    //  width:100px;//超过100px就截取
    &:nth-child(3n) { // 去除第3n个的margin-right
      margin-right: 0;
    }
    &:hover{
      color:#25BCFF;
    }
 }
 .sceneName{
   display: block;//块状显示
     overflow: hidden;//隐藏文字
      text-overflow: ellipsis;//显示...
    white-space: nowrap; //不换行
    //  width:100px;//超过100px就截取
 }
 .message{
  margin-top:20PX;
  height: 30PX;
  line-height: 30PX;
  // background-color: #25BCFF;
  display:flex;
  align-items:center;
  justify-content:space-between;
  border-bottom: 2px solid rgba(255,255,255,0.25);
 }
 .shuxian{
  vertical-align:center;
  width: 4PX;
  height: 16PX;
background: #25BCFF;
 }
 .zuobiao{
   margin-left:-15%;
   color:#25BCFF;
   font-size: 14PX;
 }
 .parkName{
    color:rgba(255,255,255,0.5);
      font-size: 10PX;
   }
 .userMessage{
    font-size: 16PX;
  height: 20PX;
  line-height: 20PX;
  // background-color: red;
  margin-top: 20PX;
  align-items:center;
   display:flex;
   .commonWord{
    color:#25BCFF;
   }
   .userName{
  font-size: 16PX;
  height: 100%;
  color:#30F3FF;
  margin:0 10PX 0 10PX;
  border-bottom:1px solid #30F3FF;
 }
   
 }
 
 .active{
  color:#25BCFF;
 }
 .bigCamrea{
  color: #25BCFF;
 }
}
</style>