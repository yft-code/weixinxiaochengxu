<!-- 首页 -->
<template>
  <div class="main">
    <div class="liangziTitle">量子库
      
    <span class="liangziVersion">当前版本：{{store.state.version}}</span>
   
      <span class="demo" :class="[
                  checked ? 'currentChecked' : ''
                ]"
                @click="changeDemo('demo')">demo</span> 
      <span class="component" :class="[
                  !checked ? 'currentChecked' : ''
                ]"
                @click="changeDemo('component')">组件</span>
    </div>
    <div class="menu" v-if="!checked">
      <div v-for="(item, index) in menuTitle" :key="index"
        >
      <div class="componentTitle">{{item.title}}</div>
      <div
        class="menuLi"
         v-for="(item2, index2) in item.detail"
         :key="index2"
          :class="[item2.checked ? 'menuLiChecked' : '']"
        @click="menuClick(item2, index2)"
      >
        {{ item2.title }}
      </div>
    </div>
    </div>
       <div class="menu" v-if="checked">
      <div v-for="(item, index) in menuTitleSecond" :key="index"
        >
      <div class="componentTitle">{{item.title}}</div>
      <div
        class="menuLi"
         v-for="(item2, index2) in item.detail"
         :key="index2"
          :class="[item2.checked ? 'menuLiChecked' : '']"
        @click="menuClickDemo(item2, index2)"
      >
        {{ item2.title }}
      </div>
    </div>
    </div>
      <div class="content" v-if="checked">
      <demoMap v-if="index === 1"></demoMap>
      <demoMineMap v-if="index===2"></demoMineMap>
      <demoPop v-if="index === 3"></demoPop>
      <demoRoad v-if="index===4"></demoRoad>
      <demoBillboard v-if="index===5"></demoBillboard>
      <!-- <example v-if="index===6"></example> -->
      <!-- <div class="componentTitle" v-if="index !==1 && index !==2">例子</div> -->
      
      <!-- <Billboard v-if="index === 11"></Billboard>
      <BillboardSecond v-if="index === 12"></BillboardSecond> -->
    </div>
       <div class="content" v-if="!checked">
      <Install v-if="index === 1"></Install>
      <Quick-GO v-if="index === 2"></Quick-GO>
      <div class="componentTitle" v-if="index !==1 && index !==2">例子</div>
      <Tree v-if="index === 3"></Tree>
      <Realtime v-if="index === 4"></Realtime>
      <!-- --- lz-customheader-template 是compoents文件夹下  该组件名称：Lz-Customheader -->
      <lz-customheader-template v-if="index === 5" />
      <!-- --- lz-xyhandle-template 是compoents文件夹下  该组件名称：Lz-Xyhandle -->
      <lz-xyhandle-template v-if="index === 6" />
      <!-- 该组件名称：lz-Baseline  echarts-datazoom-->
       <Baseline
        v-if="index === 7"
      ></Baseline>
      <Breadcrumb  v-if="index === 8"></Breadcrumb>
      <!-- 时间选择器 -->
      <lz-timeselect-template  v-if="index === 9"/>
      <Map v-if="index === 10"></Map>
      <Bubble v-if="index === 11"></Bubble>
      <Bubble-Second v-if="index === 12"></Bubble-Second>
      <Bubble-Third v-if="index === 13"></Bubble-Third >
      <road v-if="index === 14"></road>
      <Billboard v-if="index === 15"></Billboard>
       <BillboardSecond v-if="index === 16"></BillboardSecond>
       <CameraCluster v-if="index === 17"></CameraCluster>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
import Install from "@/views/install/index"
import QuickGO from "@/views/quickGo/index"
import Tree from '@/views/tree/index'
import Realtime from '@/views/realtime/index'
import LzXyhandleTemplate from "@/components/LzXyhandleTemplate";
import LzCustomheaderTemplate from "@/components/LzCustomHeaderTemplate";
import Breadcrumb from "@/views/breadcrumb/index"
import Baseline from "@/views/baseline/index"
// import Site from "@/components/LzBasecomTemplate/immersive/Site.vue";
// import Site2 from "@/components/LzBasecomTemplate/immersive/Site2.vue";
// import LzBubbletemplate from "@/components/LzBubbletemplate/index.vue";
import LzTimeselectTemplate from '../components/LzTimeSelectTemplate/index.vue'
import Map from '@/views/map/index'
import Billboard from '@/views/billboard/index'
import BillboardSecond from '@/views/billboardsecond/index'
import Bubble from '@/views/bubble/index'
import BubbleSecond from '@/views/bubblesecond/index'
import BubbleThird from '@/views/bubblethird/index'
import road from '@/views/road/index'
import demoMap from '@/views/demo/map/index.vue'
import demoPop from '@/views/demo/pop/index.vue'
import demoMineMap from '@/views/demo/map/mineIndex.vue'
import demoRoad from '@/views/demo/road/index.vue'
import CameraCluster from '@/views/camera/index'
// import example from '../views/demo/example.vue'
import demoBillboard from '@/views/demo/billboard/index.vue'
export default {
  components: {
    LzXyhandleTemplate,
    LzCustomheaderTemplate,
    // Site,
    // Site2,
    // LzBubbletemplate,
    LzTimeselectTemplate,
    Install,
    QuickGO,
    Tree,
    Realtime,
    Breadcrumb,
    Baseline,
    Map,
    Billboard,
    BillboardSecond,
    Bubble,
    BubbleSecond,
    BubbleThird,
    road,
    demoMap,
    demoPop,
    demoMineMap,
    demoRoad,
    // example,
    demoBillboard,
    CameraCluster
    // example
  },
  data() {
    return {
      //默认初始组件为第一个
      index: 1,
      checked:false,
      //菜单项配置
      menuTitle: [
        {
          title:'开发指南',
          detail:[
            {
              title:'安装',
              checked:true,
              index:1,
            },
            {
              title:'快速上手',
              index:2,
            }
          ]
        },
        {
         title:'简单组件',
         detail:[
           {
           title: "二级树形组件(数字孪生)",
           index:3
          },
          {
            title: "当前时间显示",
            index:4
          },
          {
            title: "自定义表格表头",
            index:5
          },
          {
            title: "自定义拖拽布局",
            index:6
          },
          {
            title: "echarts-datazoom",
            index:7
          },
          {
            title: "面包屑导航",
            index:8
          },
          // {
          //   title: "cesiumDemo",
          //   index:9
          // },
          {
            title: "时间选择器",
            index:9
          }
         ] 
        },
        {
          title:'cesium 组件',
          detail:[
            {
              title:'地图加载',
              index:10
            },
            {
              title:'气泡1',
              index:11
            },
            {
              title:'气泡2',
              index:12
            },
            {
              title:'气泡3',
              index:13
            },
            {
              title:'道路高亮',
              index:14
            },
            {
              title:'广告牌1',
              index:15
            },
             {
              title:'广告牌2',
              index:16
            },
             {
              title:'摄像头打点',
              index:17
            }
          ]
        }
        
      ],
      menuTitleSecond:[
         {
          title:'demo使用',
          detail:[
            {
              title:'地图加载(矿山)',
              checked:true,
              index:1,
            },
            {
              title:'地图加载(水泥厂)',
              checked:true,
              index:2,
            },
            {
              title:'气泡1',
              index:3,
            },
             {
              title:'道路高亮',
              index:4,
            },
            {
              title:'广告牌',
              index:5,
            },
            // {
            //   title:'测试',
            //   index:6,
            // }
          ]
        }
      ],
      viewer: {},
     

    };
  },
  methods: {
    changeDemo(){
      this.index = 1
      this.menuTitle.map(element=>{
        if(element.detail){
          element.detail.map((element2)=>{
            element2.checked = false;
          })
        }
      })
       this.menuTitleSecond.map(element=>{
        if(element.detail){
          element.detail.map(element2=>{
            element2.checked = false;
          })
        }
      })
      this.menuTitle[0].detail[0].checked=true
      this.menuTitleSecond[0].detail[0].checked=true
      this.checked = !this.checked;
    },
    menuClick(item) {
      this.index = item.index;
      this.menuTitle.map(element=>{
        if(element.detail){
          element.detail.map(element2=>{
            element2.checked = false;
          })
        }
      })
      item.checked = true;
      this.$forceUpdate();
    },
    menuClickDemo(item) {
      this.index = item.index;
      this.menuTitleSecond.map(element=>{
        if(element.detail){
          element.detail.map(element2=>{
            element2.checked = false;
          })
        }
      })
      item.checked = true;
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped>
.main{
  width: 1200px;
  margin:0 auto;
  height: 100%;
}
.map-box {
  height: calc(100vh - 90px);
  overflow: hidden;
}
.clear {
  clear: both;
}
.menu {
  float: left;
  width: 200px;
  min-height: 80vh;
  margin-top:32px;
}
.componentTitle {
  font-weight: 600;
  font-size: 18px;
  color: #333;
  line-height: 48px;
  margin-bottom:8px;
}
.menuLi {
  cursor: pointer;
  line-height: 32px;
  margin-bottom: 16px;
}
.menuLi:hover {
  color:#409eff
}
.menuLiChecked{
  color:#409eff
}

.content {
  float: left;
  width: calc(100% - 264px);
  padding: 32px 16px;
}
#cesiumContainer {
  width: 600px;
  height: 300px;
}
.liangziTitle{
  font-size: 20px;
  font-weight: 600;
  color:#1989fa;
  border-bottom:1px solid #dcdfe6;
  line-height: 48px;
}
.liangziVersion{
  color:#606266;
  font-size: 14px;
  float:right;
  font-weight: 400;
}
.component{
    color: #1989fa;
    opacity: 0.5;
    display: block;
    float:right;
    cursor: pointer;
    margin-right:25px;
    line-height: 46px;
}
.demo{
    color: #1989fa;
    opacity: 0.5;
    display: block;
    float:right;
    cursor: pointer;
    line-height: 46px;
    margin-right:55px;
}
.component:hover,.demo:hover{
  opacity: 1;
  border-bottom:3px solid #1989fa;
}
.currentChecked{
  opacity: 1;
  border-bottom:3px solid #1989fa; 
}
</style>
