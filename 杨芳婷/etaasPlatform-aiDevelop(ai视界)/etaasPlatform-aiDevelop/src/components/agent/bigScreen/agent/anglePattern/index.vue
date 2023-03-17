<template>
  <div class="angleView">
    <div class="message">
      <div class="shuxian">
        <img src="@/assets/img/ai/anglePattern/dot.png" alt="">
      </div>
      <div class="zuobiao">模式推荐</div>
      <div class="parkName"></div>
      <div style="margin-right: 5px">
        <img width="20" height="20" src="@/assets/img/ai/more.png" alt="" />
      </div>
    </div>
    <div class="card_wrap" v-if="$store.state.isLogin">
      <div
        :class="['c_item', { active: index === mark }]"
        v-for="(item, index) in this.$store.state.angleViewList"
        :key="index"
      >
        <div style="display: flex">
          <img
            class="switchStyle"
            v-show="!item.switchShow"
            @click="swithClick(item)"
            src="@/assets/img/ai/anglePattern/noCheck.png"
            alt=""
          />
          <img
            class="switchStyle"
            v-show="item.switchShow"
            @click="swithClick(item)"
            src="@/assets/img/ai/anglePattern/checked.png"
            alt=""
          />
          <span :title="item.title" class="sceneName">{{ item.title }}</span>
        </div>
      </div>
    </div>
     <div class="card_wrap" v-else>
      <div
        :class="['c_item', { active: index === mark }]"
        v-for="(item, index) in this.$store.state.angleViewList1"
        :key="index"
      >
        <div style="display: flex">
          <img
            class="switchStyle"
            v-show="!item.switchShow"
            @click="swithClick(item)"
            src="@/assets/img/ai/anglePattern/noCheck.png"
            alt=""
          />
          <img
            class="switchStyle"
            v-show="item.switchShow"
            @click="swithClick(item)"
            src="@/assets/img/ai/anglePattern/checked.png"
            alt=""
          />
          <span :title="item.title" class="sceneName">{{ item.title }}</span>
        </div>
      </div>
    </div>
    <div class="checkStyle">已勾选</div>
    <div class="card_wrap" v-if="$store.state.isLogin">
      <div
        :class="['c_item', { active: index === mark }]"
        v-for="(item, index) in this.$store.state.checkedAngleViewList"
        :key="index"
      >
        <div style="display: flex">
          <img
            class="switchStyle"
            v-show="!item.switchShow"
            @click="swithClick(item)"
            src="@/assets/img/ai/anglePattern/noCheck.png"
            alt=""
          />
          <img
            class="switchStyle"
            v-show="item.switchShow"
            @click="swithClick(item)"
            src="@/assets/img/ai/anglePattern/checked.png"
            alt=""
          />
          <span :title="item.title" class="sceneName">{{ item.title }}</span>
        </div>
      </div>
    </div>
     <div class="card_wrap" v-else>
      <div
        :class="['c_item', { active: index === mark }]"
        v-for="(item, index) in this.$store.state.checkedAngleViewList1"
        :key="index"
      >
        <div style="display: flex">
          <img
            class="switchStyle"
            v-show="!item.switchShow"
            @click="swithClick(item)"
            src="@/assets/img/ai/anglePattern/noCheck.png"
            alt=""
          />
          <img
            class="switchStyle"
            v-show="item.switchShow"
            @click="swithClick(item)"
            src="@/assets/img/ai/anglePattern/checked.png"
            alt=""
          />
          <span :title="item.title" class="sceneName">{{ item.title }}</span>
        </div>
      </div>
    </div>
      <!-- <div
      class="aa"
      v-for="item in immersionCameras"
      :key="item.id"
    >
        <component :tableid="item.id"  :num="item.num?item.num:'1'" :componentData="item.data?item.data:''" :is="item.componentName" />
    </div> -->


  </div>
</template>
<script>

import billboardVideo from "@/utils/digital/billboardVideo.js";
import {addFeature,addpopUp} from "@/utils/digital/hookChars.js"
export default {
   props: {
    healthBubbleChart: {
      type: Array,
    },
  fireBubbleChart: {
      type: Array,
    },
    workAreaBillboard: {
      type: Array,
    },
    immersionChart:{
      type:Array,
    },
    bubbleChart:{
      type:Array,
    }

  },
  components: {},
  data() {
    return {
      cameraTimer:null,
      allChars:[],
      mark: -1,
      switchShow: true,
      
    };
  },
  mounted() {

  },
  beforeDestroy() {
    // 在组件生命周期结束的时候销毁。
  },
  created() {
    // 切换矿山和南京园区时,修改模式数据,只有精简模式勾选
  this.$bus.$on('deleteModeDatas',()=>{
  let arr = this.$store.state.angleViewList.concat(this.$store.state.checkedAngleViewList)
  arr.forEach(val=>{
    if(val.title==='精简模式'){
     val.switchShow= true 
     val.wait=true
    }else{
      val.switchShow=false
    }
     this.$forceUpdate();
  })
   })
  },
  methods: {
      closeRoad(){
          $viewer.entities.remove({id:'Road1'})
          $viewer.entities.remove({id:'Road2'})
          this.$bus.$emit('deleteFireDevices')
       },
     openRoad(){
         var arrRoad = [105.922163,27.963835,105.922128,27.963871,105.922108,27.963897,105.922081,27.963951,105.92205,27.963984,105.922016,27.964021,105.921987,27.964077,
         105.921934,27.96414,105.921836,27.964201,105.921775,27.964221,105.921837,27.964266,105.921959,27.964248,
         105.922177,27.964093
         ]
        var arr = [105.92093776618779,27.96418037471613,
        105.92128899250447,
        27.964271721512407,
        105.92193783307387,
        27.96469739793321,105.92206870977154,27.964805130010344,105.92242653413673,27.964966398100056,105.9224111450438,27.96503791415552,105.92194250100263,27.964776825751052,105.92178870381605,27.96467148642854,105.92133560367137,27.96434362118882,105.92115234052467,27.96426057850015,105.92108923961896,27.964232667912178,105.92100013621511,27.964217600511727,105.9209267034066,27.964210374015128,105.9209126176535,27.964204763652067,105.92093776618779,27.96418037471613]
       let entity =  $viewer.entities.add({
              id:'Road1',
              polygon: {
                show:true,
                hierarchy: new Cesium.Cartesian3.fromDegreesArray(arr),
                width: 10,
                material :  Cesium.Color.DEEPSKYBLUE.withAlpha(.5),
                outline : true,
            // outlineColor : Cesium.Color.BLACK

        }
      })
    let positions = entity.polygon.hierarchy._value.positions;
    $viewer.entities.add({
       id:'Road2',
        name: 'boderLine',
        polyline: {
            positions: positions,
            width:3,
            // material :  Cesium.Color.DEEPSKYBLUE.withAlpha(1.0),
           material : new Cesium.PolylineGlowMaterialProperty({
                     glowPower:0.9,
                     color : Cesium.Color.DEEPSKYBLUE.withAlpha(1.0),
                 }),
            clampToGround: true
        }
    })
        //  $viewer.entities.add({
        //    id:'Road1',
        //     polyline: {
        //         show:true,
        //         positions: new Cesium.Cartesian3.fromDegreesArray(arr),
        //         width:90,
        //           distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 3000),
        //         // material: new Cesium.Color(255,255,1,1),
        //           material : new Cesium.PolylineGlowMaterialProperty({
        //              glowPower:0.5,
        //              color : Cesium.Color.DEEPSKYBLUE.withAlpha(1.0),
        //          }),
        //         clampToGround: true
        // },
      // })
          // 生成消防器材
          this.$bus.$emit('fireDevices')
      // var arr = [[105.922058,27.964863,105.922103,27.964886],[105.922127,27.964896,105.922187,27.964926],[105.922223,27.964941,105.92226,27.964958],
      // [105.922313,27.964924,105.92227,27.964906],[105.922237,27.964892,105.922179,27.964871],[105.922165,27.964863,105.922112,27.964837]
      //            ]
      // arr.forEach(item=>{
      //    $viewer.entities.add({
      //    polyline: {
      //           show:true,
      //           positions: new Cesium.Cartesian3.fromDegreesArray(item),
      //           width: 2,
      //           material: new Cesium.Color(0,0,1,1),
      //           // material : new Cesium.PolylineGlowMaterialProperty({
      //           //      glowPower : 0.3,
      //           //      color : Cesium.Color.BLUE.withAlpha(0.9),
                    
      //           //  }),
      //           // clampToGround: true
      //   }
      // })
      // })
    },
    //生成广告牌
    putReport(){
      this.immersionChart.forEach(item=>{
         addFeature(item)
      })
    },
    swithClick(item) {
      this.$store.state.messageShow=false
      this.$store.state.videoCheckNew = false
      this.$bus.$emit('closeDevice')
      // 关闭页面推荐
     if(item.title === '领导视察'){
        setTimeout(()=>{
        item.wait = false
        this.$forceUpdate();
        },10000)
      }
        let arr = this.$store.state.angleViewList.concat(this.$store.state.checkedAngleViewList);
        arr.map(element=>{
          if(element.title === '领导视察'){
            if(!element.wait){
                item.wait = true;
                this.$store.state.iframeShow = false
                item.switchShow = !item.switchShow;
                this.pageClick(item);
                this.$forceUpdate()
            }else{
               this.$message('请勿短时间重复点击');
            }
          }
        })
    },
    pageClick(item) {
      // 删除其他弹框
      this.$store.state.messageShow=false
      this.$store.state.videoCheckNew = false
      this.$bus.$emit('closeDevice')
      if (item.title === "传统切换") {
        this.openOldMode();
      } else if (item.title === "摄像头浏览") {
       if(item.switchShow){
         this.cameraNavigate()
        }else{
          this.cameraDelete()
        }
          
      } else if (item.title === "设备维护") {
        //  进入编辑模式
        //  this.$store.state.listShow = true
        this.$store.state.areaInfoShowNew = false
         this.$store.state.singleShow = true;
        if(item.switchShow){
          this.$bus.$emit('closeLocationShow')
          this.equipmentMaintenance();
        }else{
          console.log('设备维护关闭')
          this.closeEquipmentMaintenance();
        }    
      } else if (item.title === "视角维护") {
        
         this.$store.state.singleShow = true;
        if(item.switchShow){
          this.$bus.$emit('closeLocationShow')
          this.perspectiveMaintenance();
        }else{
          this.closePerspectiveMaintenance();
        }    
      } else if (item.title === "报表查看") {
        if(item.switchShow){
          this.reportViewing();
        }else{
          this.closeReportViewing();
        }    
      } else if (item.title === "精简模式") {
        if(item.switchShow){
          this.compactMode();
        }else{
          this.closeCompactMode();
        }    
      } else if (item.title === "广告牌展示") {
        if(item.switchShow){
          this.openAllBillboard();
        }else{
          this.closeAllBillboard();
        }    
      } else if (item.title === "矿山关注") {

          this.openMine(item);
        

      }else if(item.title==='标签展示'){
        if(item.switchShow){
          this.openMessage();
        }else{
          this.closeMessage();
        }    

      }else if(item.title === '水泥厂关注'){
        this.sncAttention(item);
      }else if(item.title==='消防关注'){
        if(item.switchShow){
           this.$bus.$emit('closeLocationShow')
         }
        this.fireConcern(item)
       
      }else if(item.title==='领导视察'){
        if(item.switchShow){
           this.$bus.$emit('closeLocationShow')
         }
         this.lookAllFactor(item)
      }else if(item.title==='卫生关注'){
         if(item.switchShow){
           this.$bus.$emit('closeLocationShow')
         }
         this.healthConcern(item)
      }
    },

    fireConcern(val){
       if(val.switchShow){
          this.$store.state.areaInfoShowNew = false
          this.$store.state.regionFlagNew = false
          this.$store.state.setVideoContainerShowNew = false
          this.$store.state.warningPrompt = false
          this.$store.state.singleShow= false
          this.openRoad()
          $viewer.qtum.centerAt({"y":27.971063,"x":105.917486,"z":1328.56,"heading":133,"pitch":-23.8,"roll":1});
        }else{
          this.closeRoad()
           $viewer.qtum.centerAt({
             y: 27.964285,
            x: 105.91934,
            z: 986.99,
            heading: 82.3,
            pitch: -18,
            roll: 0.5,
          });
        }
         this.$bus.$emit('fireoncernEvent',val)
         if(this.$store.state.isLogin){
                 this.$store.state.angleViewList.forEach(element=>{
               if(element.title === '卫生关注'||element.title === '领导视察'||
                element.title === '摄像头浏览'||element.title === '标签展示'||
                element.title === '设备维护'||element.title === '视角维护'){
                 element.switchShow = false;
                 this.$forceUpdate();
               }
        }) 
        this.$store.state.checkedAngleViewList.forEach(element=>{
          if(element.title === '卫生关注'||element.title === '领导视察'||
                element.title === '摄像头浏览'||element.title === '标签展示'||
                element.title === '设备维护'||element.title === '视角维护'){
                  element.switchShow = false;
                  this.$forceUpdate();
          }
        })
         }else{
                 this.$store.state.angleViewList1.forEach(element=>{
               if(element.title === '卫生关注'||element.title === '领导视察'||
                element.title === '摄像头浏览'||element.title === '标签展示'||
                element.title === '设备维护'||element.title === '视角维护'){
                 element.switchShow = false;
                 this.$forceUpdate();
               }
        }) 
        this.$store.state.checkedAngleViewList1.forEach(element=>{
          if(element.title === '卫生关注'||element.title === '领导视察'||
                element.title === '摄像头浏览'||element.title === '标签展示'||
                element.title === '设备维护'||element.title === '视角维护'){
                 element.switchShow = false;
                 this.$forceUpdate();
               }
        })
         }
    },
    healthConcern(val){
      if(val.switchShow){
          this.$store.state.areaInfoShowNew = false
          this.$store.state.regionFlagNew = false
          this.$store.state.setVideoContainerShowNew = false
          this.$store.state.warningPrompt = false
          this.$store.state.singleShow= false
       $viewer.qtum.centerAt({"y":27.971063,"x":105.917486,"z":1328.56,"heading":133,"pitch":-23.8,"roll":1});
       if(this.$store.state.isLogin){
            this.$store.state.angleViewList.forEach(element=>{
              if(element.title === '消防关注'||element.title === '领导视察'||
                element.title === '摄像头浏览'||element.title === '标签展示'||
                element.title === '设备维护'||element.title === '视角维护'){
                element.switchShow = false;
                this.$forceUpdate();
              }
        })
        this.$store.state.checkedAngleViewList.forEach(element=>{
          if(element.title === '消防关注'||element.title === '领导视察'||
                element.title === '摄像头浏览'||element.title === '标签展示'||
                element.title === '设备维护'||element.title === '视角维护'){
                  element.switchShow = false;
                  
                  this.$forceUpdate();
          }
        })
       }else{
            this.$store.state.angleViewList1.forEach(element=>{
              if(element.title === '消防关注'||element.title === '领导视察'||
                element.title === '摄像头浏览'||element.title === '标签展示'||
                element.title === '设备维护'||element.title === '视角维护'){
                element.switchShow = false;
                this.$forceUpdate();
              }
        })
        this.$store.state.checkedAngleViewList1.forEach(element=>{
          if(element.title === '消防关注'||element.title === '领导视察'||
                element.title === '摄像头浏览'||element.title === '标签展示'||
                element.title === '设备维护'||element.title === '视角维护'){
                  element.switchShow = false;
                  
                  this.$forceUpdate();
          }
        })
       }
       
      }
      this.$store.state.equipmentSingle = false;
      this.$store.state.perspectiveSingle = false;
      this.$store.state.parkFlag = false;
      this.$store.state.setVideoContainerShowNew = false;
      this.$store.state.regionFlagNew = false;
      this.$store.state.videoCheckNew = false
      this.$store.state.areaInfoShow = false;
       this.$bus.$emit('healthConcernEvent',val)
    
      
    },
    lookAllFactor(val){
     if(val.switchShow){
            
            window.$viewer.entities.removeAll();
            dataSource.entities.removeAll();
          if(this.$store.state.isLogin){
             var arr = this.$store.state.angleViewList.concat(this.$store.state.checkedAngleViewList)
          }else{
             var arr = this.$store.state.angleViewList1.concat(this.$store.state.checkedAngleViewList1)
          }
           arr.forEach(element=>{
              if(element.title!== '精简模式'&&element.title !== '水泥厂关注'&&element.title!=='矿山关注'&&element.title!=='报表查看'&&element.title!=='领导视察'){
                this.$forceUpdate();
                if(element.title==='摄像头浏览'&&element.switchShow){
                  element.switchShow = false;
                  this.cameraDelete()
                }else if(element.title==='标签展示'&&element.switchShow){
                  element.switchShow = false;
                  this.closeMessage();
                }else if(element.title==='设备维护'&&element.switchShow){
                  element.switchShow = false;
                  this.closeEquipmentMaintenance()
                }else if(element.title==='视角维护'&&element.switchShow){
                  element.switchShow = false;
                  this.closePerspectiveMaintenance()
                }else if(element.title==='卫生关注'&&element.switchShow){
                  element.switchShow = false;
                  this.$bus.$emit("sethealthConcern",false);
                  // this.healthConcern(element)
                }else if(element.title==='消防关注'&&element.switchShow){
                  element.switchShow = false;
                  // this.$bus.$emit("setfiresShow",false);
                  this.$bus.$emit('fireoncernEvent',element)
                  this.closeRoad()
                }
              }
            })
           
            for (let i=0;i<this.immersionChart.length;i++) {

                   this.leaderTimer=setTimeout(()=>{
                       addFeature(this.immersionChart[i]);
                      $viewer.qtum.centerAt(this.immersionChart[i].shijiao);
                    },2500*i)
               
                      
            }
            this.leaderTimer1=setTimeout(()=>{    
            $viewer.qtum.centerAt({"y":27.971063,"x":105.917486,"z":1328.56,"heading":133,"pitch":-23.8,"roll":1});
            this.$bus.$emit('leaderConcernEvent',val)
            },10000)
     }else{
        
       this.$bus.$emit('leaderConcernEvent',val)
     }
    },
    //标签展示打开
    openMessage(){
       console.log('标签打开')
          if(this.$store.state.isLogin){
             var arr = this.$store.state.angleViewList.concat(this.$store.state.checkedAngleViewList)
          }else{
             var arr = this.$store.state.angleViewList1.concat(this.$store.state.checkedAngleViewList1)
          }
           arr.forEach(element=>{
              if(element.title!=='精简模式'&&element.title !== '水泥厂关注'&&element.title!=='矿山关注'&&element.title!=='标签展示'&&element.title!=='摄像头浏览'&&element.title!=='报表查看'){
                if(element.title==='领导视察'&&element.switchShow){
                  element.switchShow = false;
                  this.lookAllFactor(element)
                }else if(element.title==='设备维护'&&element.switchShow){
                  element.switchShow = false;
                  this.closeEquipmentMaintenance()
                }else if(element.title==='视角维护'&&element.switchShow){
                  element.switchShow = false;
                  this.closePerspectiveMaintenance()
                }else if(element.title==='卫生关注'&&element.switchShow){
                  element.switchShow = false;
                  this.healthConcern(element)
                }else if(element.title==='消防关注'&&element.switchShow){
                   element.switchShow = false;
                  this.$bus.$emit('fireoncernEvent',element)
                  this.closeRoad()
                }
              }
            })
         if(this.$store.state.isLogin){
        this.$bus.$emit("openMessageAttention");
       }else{
        this.$bus.$emit("noLoginOpenMessageAttention");
       }
    },
      // 摄像头浏览关闭
      cameraDelete(){
         if(this.$store.state.isLogin){
          this.$bus.$emit("cameraDelete");
         }else{
           this.$bus.$emit("noLoginCameraDelete");
         }
      },
  
    // 摄像头浏览
     cameraNavigate(){
          this.$store.state.areaInfoShowNew = false
          this.$store.state.regionFlagNew = false
          this.$store.state.setVideoContainerShowNew = false
          this.$store.state.warningPrompt = false
          if(this.$store.state.isLogin){
             var arr = this.$store.state.angleViewList.concat(this.$store.state.checkedAngleViewList)
          }else{
             var arr = this.$store.state.angleViewList1.concat(this.$store.state.checkedAngleViewList1)
          }
           arr.forEach(element=>{
              if(element.title!=='精简模式'&&element.title !== '水泥厂关注'&&element.title!=='矿山关注'&&element.title!=='标签展示'&&element.title!=='摄像头浏览'&&element.title!=='报表查看'){
                if(element.title==='领导视察'&&element.switchShow){
                  element.switchShow = false;
                  this.lookAllFactor(element)
                }else if(element.title==='设备维护'&&element.switchShow){
                  element.switchShow = false;
                  this.closeEquipmentMaintenance()
                }else if(element.title==='视角维护'&&element.switchShow){
                  element.switchShow = false;
                  this.closePerspectiveMaintenance()
                }else if(element.title==='卫生关注'&&element.switchShow){
                  element.switchShow = false;
                  this.healthConcern(element)
                }else if(element.title==='消防关注'&&element.switchShow){
                   element.switchShow = false;
                  this.$bus.$emit('fireoncernEvent',element)
                  this.closeRoad()
                }
              }
            })
        if(this.$store.state.isLogin){
        this.$bus.$emit("cameraNavigate");
      }else{
        this.$bus.$emit("noLoginCameraNavigate");
      }
    },
    //视角关注打开
    // openMessage(){
    //    this.$bus.$emit("openMessageAttention");
    // },
    sncAttention(item){
      let arr=[]
      let ksarr = []
      if(item.switchShow){
        //选中
            this.$store.state.angleViewList.forEach(element=>{
              if(element.title !== '精简模式'&&element.title !== '水泥厂关注'){
                element.switchShow = false;
                this.$forceUpdate();
              }
            })
            this.$store.state.checkedAngleViewList.forEach(element=>{
              if(element.title !== '精简模式'&&element.title !== '水泥厂关注'){
                element.switchShow = false;
                this.$forceUpdate();
              }
            })
        this.$store.state.parkName = '南京园区'
        //  this.$store.state.myLoading = true;
        this.$bus.$emit("changeModules", ['http://10.22.90.2:8081/ai-daemon-download/model/model-1650012447473/tileset.json', 'http://10.22.90.2:8081/ai-daemon-download/model/model-1650012311842/tileset.json'],'others');
     
      }else{
           arr =  this.$store.state.angleViewList.concat(this.$store.state.checkedAngleViewList)
          arr.map(element=>{
            if(element.title==='矿山关注' && element.switchShow){
              ksarr.push({
                title:element.title,
              })
            }
          }) 
          //判断矿山是否选中
          if(ksarr.length === 0){
            //没有选中
            this.$store.state.angleViewList.forEach(element=>{
              if(element.title === '水泥厂关注'){
                element.switchShow = true;
                this.$forceUpdate();
              }
            })
            this.$store.state.checkedAngleViewList.forEach(element=>{
              if(element.title === '水泥厂关注'){
                element.switchShow = true;
                this.$forceUpdate();
              }
            })
            this.$message.error('请选中一个关注')
          }else{
          //已选中
          this.$store.state.angleViewList.forEach(element=>{
              if(element.title === '水泥厂关注'){
                element.switchShow = false;
                this.$forceUpdate();
              }
            })
            this.$store.state.checkedAngleViewList.forEach(element=>{
              if(element.title === '水泥厂关注'){
                element.switchShow = false;
                this.$forceUpdate();
              }
            })
          }

      }
     //未选中
         
    },
    //视角关注关闭
    closeMessage(){
       this.$store.state.areaInfoShowNew = false
      //  this.$store.state.myLoading = true;
      if(this.$store.state.isLogin){
         var arr = []
      arr =  this.$store.state.angleViewList.concat(this.$store.state.checkedAngleViewList)
      arr.map(item1=>{
        if(item1.title==='摄像头浏览'){
          if(item1.switchShow===false){
            this.$bus.$emit('closeAllAttention');
          }else{
             this.$bus.$emit("closeMessageAttention");
          }
        }
      })
      }else{
         var arr = []
      arr =  this.$store.state.angleViewList1.concat(this.$store.state.checkedAngleViewList1)
      arr.map(item1=>{
        if(item1.title==='摄像头浏览'){
          if(item1.switchShow===false){
            this.$bus.$emit('closeAllAttention');
          }else{
            this.$bus.$emit("noLoginCloseMessageAttention");
          }
        }
      })
      }
     
    },
    // 传统切换打开
    openOldMode() {
      this.$store.state.myLoading = true;
      this.closeRoad()
      // 删除点位及切换模型
      this.$bus.$emit("initAllPoint");
      this.$bus.$emit("changeModules",[],'mine');

      this.$store.state.modelShow = true;
      // 原件
      this.$store.state.singleShow = false;
      // 精简
      this.$store.state.tipShow = false;
      // 标签
      this.$store.state.perspectiveSingle = false;
      // 设备
      this.$store.state.equipmentSingle = false;
      
      //删除标签点位生成的弹框
         this.$store.state.areaInfoShowNew = false
          this.$store.state.regionFlagNew = false
          this.$store.state.setVideoContainerShowNew = false
          this.$store.state.warningPrompt = false
      // 删除失败得生成的弹框
      this.$store.state.parkFlag = false
      
      //关闭报表
      this.closeReportViewing()
      // 列表数据重置
      this.resetData()
      //关闭广告牌
      this.closeAllBillboard();
     
    },
    // 列表数据重置
    resetData(){
      this.$store.state.angleViewList= [
    {
      title: "报表查看",
      switchShow: false,
    },
    {
      title: "摄像头浏览",
      switchShow: false,
    },
    {
      title: "标签展示",
      switchShow: false,
    },
    {
      title: "设备维护",
      switchShow: false,
    },
    {
      title: "视角维护",
      switchShow: false,
    },
  
    {
      title: "领导视察",
      switchShow: false,
    },
    {
      title: "卫生关注",
      switchShow: false,
    },
    {
      title: "消防关注",
      switchShow: false,
    },

  ]
     this.$store.state.checkedAngleViewList=[
    {
      title: "精简模式",
      switchShow: true,
    },
   
    
  ]
     
    },
    // 设备关注打开
    deviceAttention(item) {  
      // this.$store.state.myLoading = true;
      let arr = []
      let attention = []
      let obj={
        device : item,
        point: attention
      }
      arr =  this.$store.state.angleViewList.concat(this.$store.state.checkedAngleViewList)
      arr.map(element=>{
        if(element.title==='标签展示' && element.switchShow){
          attention.push({
            title:element.title,
            switchShow:element.switchShow
          })
        }
      }) 
  
      this.$bus.$emit("openDeviceAttention",obj);
    
    },
    // 设备关注关闭
    closeDeviceAttention(item) {
      // this.$store.state.myLoading = true;
       var arr = []
      arr =  this.$store.state.angleViewList.concat(this.$store.state.checkedAngleViewList)
      // arr.map(item1=>{
      //   if(item1.title==='视角关注'){
      //     if(item1.switchShow===false){
      //       console.log('删除所有')
      //       this.$bus.$emit('closeAllAttention');
      //     }else{
      //       console.log('删除设备')
      //        this.$bus.$emit("closeDeviceAttention");
      //     }
      //   }
      // })
     
    },

    // 设备维护打开
    equipmentMaintenance() {
            this.$store.state.areaInfoShowNew = false
            this.$store.state.regionFlagNew = false
            this.$store.state.setVideoContainerShowNew = false
            this.$store.state.warningPrompt = false
           this.$bus.$emit('deviceOpenAlldevice')
            if(this.$store.state.isLogin){
             var arr = this.$store.state.angleViewList.concat(this.$store.state.checkedAngleViewList)
          }else{
             var arr = this.$store.state.angleViewList1.concat(this.$store.state.checkedAngleViewList1)
          }
           arr.forEach(element=>{
              if(element.title!== '精简模式'&&element.title !== '水泥厂关注'&&element.title!=='矿山关注'&&element.title!=='视角维护'&&element.title!=='设备维护'){
                this.$forceUpdate();
                if(element.title==='摄像头浏览'&&element.switchShow){
                  element.switchShow = false;
                  this.cameraDelete()
                }else if(element.title==='标签展示'&&element.switchShow){
                  element.switchShow = false;
                  this.closeMessage();
                }else if(element.title==='领导视察'&&element.switchShow){
                   element.switchShow = false;
                    this.lookAllFactor(element)
                }else if(element.title==='卫生关注'&&element.switchShow){
                  element.switchShow = false;
                  this.healthConcern(element)
                }else if(element.title==='消防关注'&&element.switchShow){
                    element.switchShow = false;
                  this.$bus.$emit('fireoncernEvent',element)
                  this.closeRoad()
                }else if(element.title==='视角维护'){
                   this.$bus.$emit('closeLocationShow')
                   this.perspectiveMaintenance();
                }
              }
            })
       if(this.$store.state.echartWhole){
         this.$message('关注冲突,已为你取消冲突!');
          this.$store.state.echartWhole = false;
         this.$store.state.angleViewList.forEach(element=>{
              if(element.title === '报表查看'){
                element.switchShow = false;
                this.$forceUpdate();
              }
            })
            this.$store.state.checkedAngleViewList.forEach(element=>{
              if(element.title === '报表查看'){
                element.switchShow = false;
                this.$forceUpdate();
              }
            })
      }
      this.$store.state.singleShow = true;
      this.$store.state.equipmentSingle = true;
    },
    // 设备维护关闭
    closeEquipmentMaintenance() {
       dataSource.entities.removeAll();
       
        var arr = this.$store.state.angleViewList.concat(this.$store.state.checkedAngleViewList)
           arr.forEach(element=>{
            if(element.title==='视角维护'&&element.switchShow){
               this.$bus.$emit('perspectiveOpenAllPoint')
            }
           })
      if (this.$store.state.perspectiveSingle === false) {
          this.$store.state.singleShow = false;
      }else{
         this.$store.state.singleShow = true
      }
      this.$store.state.equipmentSingle = false;
    },
    // 视角维护打开
     perspectiveMaintenance() {
         
         this.$bus.$emit('perspectiveOpenAllPoint')
          // this.openMessage()
             if(this.$store.state.isLogin){
             var arr = this.$store.state.angleViewList.concat(this.$store.state.checkedAngleViewList)
          }else{
             var arr = this.$store.state.angleViewList1.concat(this.$store.state.checkedAngleViewList1)
          }
           arr.forEach(element=>{
              if(element.title!== '精简模式'&&element.title !== '水泥厂关注'&&element.title!=='矿山关注'&&element.title!=='视角维护'&&element.title!=='设备维护'){
                
                this.$forceUpdate();
                if(element.title==='摄像头浏览'&&element.switchShow){
                  element.switchShow = false;
                  this.cameraDelete()
                }else if(element.title==='标签展示'&&element.switchShow){
                  element.switchShow = false;
                  this.closeMessage();
                }else if(element.title==='领导视察'&&element.switchShow){
                   element.switchShow = false;
                    this.lookAllFactor(element)
                }else if(element.title==='卫生关注'&&element.switchShow){
                  element.switchShow = false;
                  this.healthConcern(element)
                }else if(element.title==='消防关注'&&element.switchShow){
                   element.switchShow = false;
                  this.$bus.$emit('fireoncernEvent',element)
                  this.closeRoad()
                }
              }
            })
            //
       if(this.$store.state.echartWhole){
         this.$message('关注冲突,已为你取消冲突!');
          this.$store.state.echartWhole = false;
         this.$store.state.angleViewList.forEach(element=>{
              if(element.title === '报表查看'){
                element.switchShow = false;
                this.$forceUpdate();
              }
            })
            this.$store.state.checkedAngleViewList.forEach(element=>{
              if(element.title === '报表查看'){
                element.switchShow = false;
                this.$forceUpdate();
              }
            })
      }
      this.$store.state.singleShow = true;
      this.$store.state.perspectiveSingle = true;
    },
    // 视角维护关闭
    closePerspectiveMaintenance() {
        if(dataSource&&dataSource.entities){
         dataSource.entities.removeAll();
       }
         var arr = this.$store.state.angleViewList.concat(this.$store.state.checkedAngleViewList)
           arr.forEach(element=>{
            if(element.title==='设备维护'&&element.switchShow){
               this.$bus.$emit('deviceOpenAlldevice')
            }
           })
         this.$store.state.areaInfoShowNew = false
         this.$store.state.regionFlagNew = false
        this.$store.state.setVideoContainerShowNew = false
        this.$store.state.warningPrompt = false
      if (this.$store.state.equipmentSingle === false) {
        this.$store.state.singleShow = false;
      }else{
        this.$store.state.singleShow = true
      }
      this.$store.state.perspectiveSingle = false;

    },
    // 报表查看打开
    reportViewing() {
      if(this.$store.state.singleShow){
        this.$message('关注冲突,已为你取消冲突!');
        this.$store.state.singleShow = false;
        this.$store.state.perspectiveSingle = false;
        this.$store.state.equipmentSingle = false;
         this.$store.state.angleViewList.forEach(element=>{
              if(element.title === '设备维护'||element.title==='视角维护'){
                element.switchShow = false;
                this.$forceUpdate();
              }
            })
            this.$store.state.checkedAngleViewList.forEach(element=>{
              if(element.title === '设备维护'||element.title==='视角维护'){
                element.switchShow = false;
                this.$forceUpdate();
              }
            })
      }
      this.$store.state.echartWhole = true;
    },
    // 报表查看关闭
    closeReportViewing() {
      this.$store.state.echartWhole = false;
    },
    // 精简模式打开
    compactMode() {
      this.$store.state.tipShow = false;
    },
    // 精简模式关闭
    closeCompactMode() {
      this.$store.state.tipShow = true;
    },
    closeMine() {
    
    },
    openMine(item) {
      if(item.switchShow){
        //将水泥厂制空
        this.$store.state.angleViewList.forEach(element=>{
              if(element.title !== '精简模式'&&element.title !== '矿山关注'){
                element.switchShow = false;
                this.$forceUpdate();
              }
            })
            this.$store.state.checkedAngleViewList.forEach(element=>{
              if(element.title !== '精简模式'&&element.title !== '矿山关注'){
                element.switchShow = false;
                this.$forceUpdate();
              }
            })
          this.$store.state.parkName = '1泸州园区'
         //加载新模型
          // this.$store.state.myLoading = true;
          this.$bus.$emit("changeModules",[],'mine');
          // 关闭左侧框
          // this.$bus.$emit('closeLocationShow')
          // 关闭报表
          this.closeReportViewing()
          // 关闭广告牌
          this.closeAllBillboard()
          this.$store.state.singleShow = false;
          this.$store.state.tipShow = false;
          this.$store.state.perspectiveSingle = false;
          this.$store.state.equipmentSingle = false;
          
      }else{
        let arr=[]
         let sncarr = []
          arr =  this.$store.state.angleViewList.concat(this.$store.state.checkedAngleViewList)
          arr.map(element=>{
            if(element.title==='矿山关注' && element.switchShow){
              sncarr.push({
                title:element.title,
              })
            }
          }) 

          //判断水泥厂是否选中
          if(sncarr.length === 0){
            this.$store.state.angleViewList.forEach(element=>{
              if(element.title === '矿山关注'){
                element.switchShow = true;
                this.$forceUpdate();
              }
            })
            this.$store.state.checkedAngleViewList.forEach(element=>{
              if(element.title === '矿山关注'){
                element.switchShow = true;
                this.$forceUpdate();
              }
            })
            this.$message.error('请选中一个关注')
          }else{
            this.$store.state.angleViewList.forEach(element=>{
              if(element.title === '矿山关注'){
                element.switchShow = false;
                this.$forceUpdate();
              }
            })
            this.$store.state.checkedAngleViewList.forEach(element=>{
              if(element.title === '矿山关注'){
                element.switchShow = false;
                this.$forceUpdate();
              }
            })
           
          }
         
      }
     
        
    },
    // 广告牌模式打开
    openAllBillboard() {
      this.putReport()
     },
    // 广告牌模式关闭
     closeAllBillboard() {
       var arr = ['report0Tab','report1Tab','report2Tab','report3Tab']
       arr.map(item=>{

      })
    },
  },
};
</script>

<style lang="scss" scoped>

.checkStyle{
 
  width: 100PX;
  font-size: 10PX;
  // background: red;
  margin-left: -30PX !important;
}
.switchStyle {
  width: 20PX;
  height: 20PX;
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
  margin-top: -5PX;
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
  margin-top: -15PX;
  margin-left: -4PX;
  width: 4PX;
  height: 16PX;
 }
 .zuobiao{
   margin-left:-29%;
   color: #25BCFF;
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
 
//  .active{
//   background-color:#999;
//  }
}
</style>