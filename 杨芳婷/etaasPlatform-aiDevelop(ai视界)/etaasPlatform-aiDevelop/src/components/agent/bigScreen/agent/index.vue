<template>
  <div  class="agentContainer">
    <div class="agentExpand">
      <img
        src="@/assets/digital/assets/img/bigScreen/expand.png"
        class="agentImg agentImgs"
        @click="expandClick"
        :class="[menuShow ? '' : 'expandImgToate']"
      />
    </div>
    <div class="agentMenu" v-if="menuShow"> 
      <div class="agentLi angentLocation">
        <div @click="angentClick" class="angetTitle">
          <div>
            <img
              src="@/assets/digital/assets/img/bigScreen/zndh.png"
              class="agentImg"
            />
          </div>
          <div class="agentTitle">小复</div>
          <div>智能导航</div>
        </div>
        <div class="locationContainer" v-show="locationShow">
          <img src="@/assets/digital/assets/img/bigScreen/dhborder.png" class="locationContainerImg"/>
          <AngleView></AngleView>
          <AnglePattern :healthBubbleChart="healthBubbleChart"  :fireBubbleChart="fireBubbleChart" :workAreaBillboard="workAreaBillboard" :bubbleChart="bubbleChart" :immersionChart="immersionChart"></AnglePattern>
          <AnglePage @pageClik="pageClik"></AnglePage>
        </div>
      </div>
      <div class="agentLi">
        <div>
          <img
            src="@/assets/digital/assets/img/bigScreen/znzs.png"
            class="agentImg"
          />
        </div>
        <div class="agentTitle">小拓</div>
        <div>智能助手</div>
      </div>
      <div class="agentLi">
        <div>
          <img
            src="@/assets/digital/assets/img/bigScreen/znwl.png"
            class="agentImg"
          />
        </div>
        <div class="agentTitle">小章</div>
        <div>智能物联</div>      
      </div>
    </div>
    <tip></tip>
  </div>
</template>

<script>
import AngleView from "./angleView/index";
import AnglePattern from "./anglePattern/index";
import AnglePage from "./anglePage/index";
import tip from "../tip/index.vue";
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
  components: {
    AngleView,
    AnglePattern,
    AnglePage,
    tip,
  },
  data() {
    return {
      arr1:[],
      arr2:[],
      locationShow: false,
      menuShow: true,
    };
  },
  watch: {
    locationShow(n, o) {
      if (n === false) {
        if(this.$store.state.isLogin){
        this.arr1 = []
        this.arr2 = []
        this.$store.state.angleViewList = this.$store.state.angleViewList.concat(this.$store.state.checkedAngleViewList)
        this.$store.state.angleViewList&&this.$store.state.angleViewList.map(item=>{
          if(item.switchShow){
            this.arr1.push(item)
          }else{
            this.arr2.push(item)
          }
        })
      
        this.$store.state.checkedAngleViewList = this.arr1
        this.$store.state.angleViewList = this.arr2
        }else{
        this.arr1 = []
        this.arr2 = []
        this.$store.state.angleViewList1 = this.$store.state.angleViewList1.concat(this.$store.state.checkedAngleViewList1)
        this.$store.state.angleViewList1&&this.$store.state.angleViewList1.map(item=>{
          if(item.switchShow){
            this.arr1.push(item)
          }else{
            this.arr2.push(item)
          }
        })
      
        this.$store.state.checkedAngleViewList1 = this.arr1
        this.$store.state.angleViewList1 = this.arr2
        }

       
      }
    },
    menuShow(n, o) {
      if (n === false) {
        if(this.$store.state.isLogin){
            this.arr1 = []
        this.arr2 = []
        this.$store.state.angleViewList = this.$store.state.angleViewList.concat(this.$store.state.checkedAngleViewList)
        this.$store.state.angleViewList&&this.$store.state.angleViewList.map(item=>{
          if(item.switchShow){
            this.arr1.push(item)
          }else{
            this.arr2.push(item)
          }
        })
      
        this.$store.state.checkedAngleViewList = this.arr1
        this.$store.state.angleViewList = this.arr2
        }else{
        this.arr1 = []
        this.arr2 = []
        this.$store.state.angleViewList1 = this.$store.state.angleViewList1.concat(this.$store.state.checkedAngleViewList1)
        this.$store.state.angleViewList1&&this.$store.state.angleViewList1.map(item=>{
          if(item.switchShow){
            this.arr1.push(item)
          }else{
            this.arr2.push(item)
          }
        })
      
        this.$store.state.checkedAngleViewList1 = this.arr1
        this.$store.state.angleViewList1 = this.arr2
        }

      }
    },
    
  },
  mounted() {
        this.$bus.$on("closeLocationShow", (data) => {
          this.locationShow = false
    });
  },
  beforeDestroy() {
    // 在组件生命周期结束的时候销毁。
  },
  created() {
    
  },
  methods: {
    // 矿山关注移除部分关注
    remove(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].title !== '矿山关注'&&arr[i].title!=='精简模式') {
          //从i出开始删除1个元素
          arr[i].switchShow = true
          this.$store.state.angleViewList.push(arr[i])
          arr.splice(i, 1);
          i--;
        }
      }
      return arr;
    },
    remove1(arr, item) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].switchShow == true) {
          //从i出开始删除1个元素
          arr.splice(i, 1);
          i--;
        }
      }
      return arr;
    },
    uniqueArr1(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].title === arr[j].title) {
            arr.splice(j, 1);
            // this.$message.warning('设备id重复')
            j--;
          }
        }
      }
      return arr;
    },
    angentClick() {
      console.log(this.locationShow,'111111111111111')
      this.locationShow = !this.locationShow;
    },

    pageClik(item) {
      this.locationShow = false;
      this.$store.state.deviceDetailShow = false;
      this.$store.state.earlyWarnigShow = false;
      this.$store.state.areaInfoShow = false;
      this.$emit("pageClik", item);
    },

    expandClick() {
    
      this.menuShow = !this.menuShow;
      
      if(this.menuShow){
        
      }else{
          this.$store.state.tipShow = false
          // 精简模式
          if(this.$store.state.isLogin){
            console.log('111111111111111111111')
              this.$store.state.checkedAngleViewList&&this.$store.state.checkedAngleViewList.map(item=>{
            if(item.title==='精简模式'){
              item.switchShow = true
            }
          })

           this.$store.state.angleViewList&&this.$store.state.angleViewList.map(item=>{
            if(item.title==='精简模式'){
              item.switchShow = true
            }
          })
          }else{
            console.log('222222222222222222222222')
              this.$store.state.checkedAngleViewList1&&this.$store.state.checkedAngleViewList1.map(item=>{
            if(item.title==='精简模式'){
              item.switchShow = true
            }
          })

           this.$store.state.angleViewList1&&this.$store.state.angleViewList1.map(item=>{
            if(item.title==='精简模式'){
              item.switchShow = true
            }
          })
          }

      }
      
    },
  },
};
</script>

<style lang="scss" scoped>
.agentContainer {
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
  height: 100vh;
  background: linear-gradient(
    270deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.18) 62%,
    rgba(0, 0, 0, 0.39) 100%
  );
  // background: rgba(216,216,216,0.19);
  width: 80PX;
  color: #fff;
}
.agentMenu {
  width: 80PX;
  margin-top: 6PX;
  // background: rgba(3, 31, 44, 0.64);
  font-size: 12PX;
}
.agentLi {
  height: 106PX;
  text-align: center;
}
.angentLocation {
  position: relative;
}
.locationContainer {
  position: absolute;
  width: 400PX;
  background: rgba(3, 31, 44, 0.64);
  top: -15Px;
  left: 105PX;
}
.locationContainerImg{
  position: absolute; 
  top: 10PX;
  left: -52PX;
}
.agentImg {
  margin: 0 auto;
  display: block;
  cursor: pointer;
  margin-bottom: 4PX;
}
.agentImgs {
  display: block;
  cursor: pointer;
  margin-bottom: 4PX;
  margin-left:15PX;
}
.agentTitle{
  margin-bottom:8PX;
}
.agentExpand {
  width: 100%;
  height: 100PX;
  padding-top: 40PX;
}
.expandImgToate {
  transform: rotate(180deg);
}
.angetTitle {
  cursor: pointer;
}
</style>