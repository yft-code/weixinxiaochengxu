<template>
  <div class="angleView">
   <div class="userMessage">
        <div class="commonWord">Hi!</div>
        <div class="userName" v-if="$store.state.isLogin" @click="showMessgae">{{userName}}</div>
          <div class="userName" v-else >未登录</div>
        <div class="commonWord">你好,我是小复</div>
    </div>
    <div class="message">
      <div>
        <img style="margin-bottom:3px" width="20" height="20" src="@/assets/img/ai/qiehuanshijiao.png" alt="">
      </div>
      <div class="zuobiao">坐标推荐</div>
      <div @click="getHole" class="parkName">S23 0.0.0 园区南大门鸟瞰</div>
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
          <div v-if="item.type==='cement'">
          <img style="margin-left:3px;padding-bottom:3px" width="20" height="20" src="@/assets/img/ai/door.png" alt="">
         </div>
            <div v-if="item.type==='none'">
          <img style="margin-left:3px;padding-bottom:3px" width="20" height="20" src="@/assets/img/ai/zichanbangongshi.png" alt="">
         </div>
          <div v-if="item.type==='mine'">
          <img style="margin-left:3px;padding-bottom:3px" width="20" height="20" src="@/assets/img/ai/zichanbangongshi.png" alt="">
         </div>
           <div v-if="item.type==='tag'">
          <img style="margin-left:3px;padding-bottom:3px" width="20" height="20" src="@/assets/img/ai/baoan.png" alt="">
         </div>
          <div :title="item.title" class="sceneName">{{item.title}}</div>
      </div>
   </div>
</div>
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
      mark:0,
      remark:false,
      arr:[],
    };
  },
 mounted() {
//      let agentToken="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImRmYTNjMGFiLWY1ZDAtNDczNi04YzM0LWQ3MGFiODU3YTVhMiIsInVzZXJuYW1lIjoic3VwZXJBZG1pbiIsInRpbWVzdGFtcCI6MTY1ODEwNjQxNH0.lB02awV38tG52JHFSI1Zpmkys9d2lM780GL1n2KTh40"
//      let object={agent:agentToken}
//      agentToken && localStorage.setItem("token", JSON.stringify(object));
  },
  beforeDestroy() {
    // 在组件生命周期结束的时候销毁
  },
  created() {
     this.$store.state.parkName='泸州园区'
     if (JSON.parse(localStorage.getItem("userInfo")) && JSON.parse(localStorage.getItem("userInfo"))['aiHorizon']) {
        this.userName = JSON.parse(localStorage.getItem("userInfo"))['aiHorizon'].name;
      }
      if(this.$store.state.isLogin){
        this.$store.state.parkName='泸州园区'
        this.getDevices()
      }else{
       this.getDatas()
      }
  },
  methods: {
      // 静态写死数据
    getDatas(){
      let arr=[]
      if(this.$store.state.parkName==='泸州园区'){
       arr.push(
    {
        "type": "mine",
        "title": "矿山",
        "num": "6"
    },
    {
        "type": "cement",
        "title": "水泥厂",
        "num": "7"
    },
    {
        "type": "none",
        "title": "hhh",
        "y": 27.96519925309207,
        "x": 105.92930218843422,
        "z": 946.9325665038579,
        "heading": 246.6,
        "pitch": -8.5,
        "roll": 357.9,
        "num": "6"
    },
    {
        "id": "1809e075-d3ea-4409-bff4-0f4e74e52284",
        "title": "大陆",
        "type": "tag",
        "latitude": 27.964767162033105,
        "longitude": 105.92306037567866,
        "height": 816.9742132138755,
        "parkName": "泸州园区",
        "buildingName": "矿山",
        "floor": 4,
        "comment": ""
    },
    {
        "id": "36405514-a509-42f8-baba-dfb79d46ac2a",
        "title": "监控室",
        "type": "camera",
        "latitude": 27.965626043145793,
        "longitude": 105.92746773067974,
        "height": 899.1859511444095
    },
    {
        "id": "5b701d41-ba4a-4e0c-ae44-e2300ce9a5e8",
        "title": "办公室执行机构",
        "type": "camera",
        "latitude": 27.96417167351249,
        "longitude": 105.92442734082462,
        "height": 851.9460076462658
    }
       )
      }else{
      arr.push(
    {
        "type": "mine",
        "title": "矿山",
        "num": "6"
    },
    {
        "type": "cement",
        "title": "水泥厂",
        "num": "7"
    },
    {
        "type": "none",
        "title": "办公室",
        "y": 22.268669,
        "x": 114.214293,
        "z": 54.27,
        "heading": 246.6,
        "pitch": -8.5,
        "roll": 357.9,
        "num": "6"
    },
    {
        "id": "0a1fddec-35a8-4e4d-bd49-89029051baca",
        "title": "12",
        "type": "tag",
        "latitude": 22.274826620098878,
        "longitude": 114.21298098726291,
        "height": 18.52750466032259,
        "parkName": "财务部",
        "buildingName": "新城总部大厦B座",
        "floor": 2,
        "comment": ""
    },
    {
        "id": "0478a0e1-0cf6-4783-a8f7-b5c5c45f41c3",
        "title": "园区",
        "type": "camera",
        "latitude": 27.96542936350851,
        "longitude": 105.92851832164466,
        "height": 909.8319812797674
    },
    {
        "id": "08638fb6-3a75-4f46-82eb-06fb638d51cb",
        "title": "消防部门",
        "type": "camera",
        "latitude": 22.274128917999413,
        "longitude": 114.2133427762207,
        "height": 28.84962996530044
    }
    )
  }
      this.arr=arr
    },
      getDevices(){
        // console.log('获取新的设备的');
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
                  if(pointlist&&pointlist.length<1){
                    pointlist.push(tmpObj);
                    _this.arr.push(tmpObj)
                  }
                }
              }
            });
           _this.arr.push(
          {
            type:'mine',
            title:'矿山',
            num:'6'
          },
           {
            type:'cement',
            title:'水泥厂',
            num:'7'
          }
          )
           if(_this.$store.state.parkName==='南京园区'){
            _this.arr.push(
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
      _this.arr.push(
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
  if(this.$store.state.isLogin){
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
             this.$store.state.videoId=item.id
          },3000)    
  }else if(item.type==='cement'){
    if(this.$store.state.parkName !=='南京园区'){
   // 加载水泥厂
      this.$store.state.parkName = '南京园区'
       this.$bus.$emit("deleteModeDatas")
      this.getDevices()
        this.$bus.$emit("changeModules",
         ['http://10.22.90.2:8081/ai-daemon-download/model/model-1650012447473/tileset.json'
         ],'others');
    }
  }else if(item.type==='mine'){
    if( this.$store.state.parkName !== '泸州园区'){
this.$store.state.parkName = '泸州园区'
         //加载新模型
          this.getDevices()
           this.$bus.$emit("deleteModeDatas")
          // this.$store.state.myLoading = true;
          this.$bus.$emit("changeModules",[],'mine');
    }
     
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
  }else{
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
            //  this.$store.state.videoCheckNew = true
             this.$store.state.areaInfoNewShow = false
            //  this.$store.state.videoId=item.id
          },3000)    
  }else if(item.type==='cement'){
    // 加载水泥厂
    if(this.$store.state.parkName !== '南京园区'){
      this.$store.state.parkName = '南京园区'
      let arr=[]
      this.arr=arr
      this.getDatas()
      this.$bus.$emit("deleteModeDatas")
     this.$bus.$emit("changeModules",
      ['http://10.22.90.2:8081/ai-daemon-download/model/model-1650012311842/tileset.json'],
      'others');
    } 
  }else if(item.type==='mine'){
    if(this.$store.state.parkName !== '泸州园区'){
        this.$store.state.parkName = '泸州园区'
         //加载新模型
         this.arr=[]
         this.getDatas()
         this.$bus.$emit("deleteModeDatas")
         this.$bus.$emit("changeModules",[],'mine');
    }
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
            // this.$store.state.areaInfoShowNew = true;
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
  }
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
    color:#25BCFF;
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