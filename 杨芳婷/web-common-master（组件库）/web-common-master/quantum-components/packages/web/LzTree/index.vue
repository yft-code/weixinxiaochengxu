<template>
  <div class="monitorTreeWrap">
    <div
      v-if="treeData.length > 0"
      style="overflow: auto; overflow-x: hidden"
    >
      <div class="father">
        <div class="child-wrap">
          <div class="child" v-for="(item, index) in treeData" :key="index">
            <div class="treeLi">
              <div class="childHeader">
                <img
                  class="img"
                  src="../../assets/monitorCabin/deviceListIco.png"
                  alt=""
                />
                <div class="treeTitle" @click="nodeClick(item)">{{ item.name }}</div>
                <img
                  src="../../assets/monitorCabin/expand.png"
                  class="expandImg"
                  @click="expandClick(item, index)"
                  :class="[item.checked ? '' : 'expandImgToate']"
                  v-if="item.child&&item.child.length !== 0"
                />
                <div class="clear"></div>
              </div>
              <div v-if="item.checked&&item.child">
                <div
                  v-for="(item1, index1) in item.child"
                  :key="index1"
                  class="lists"
                  @click="treeClick(item1)"
                  :class="[item1.choosed ? 'treeChecked' : '']"
                >
                  <div
                    class="dot"
                    :class="[item1.choosed ? 'dotChecked' : '']"
                  ></div>
                  <div class="treeDetailTitle">{{ item1.name }}</div>
                  <div class="clear"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="noDataStyle">{{ noData }}</div>
    </div>
  </div>
</template>
<script>

export default {
  name:'LzTree',
  props:{
     treeData: {
       type:Array        
    },
    isExpand: {
      type:Boolean,
      default:false
    } 
  },
  data() {
    return {
      noData: "暂无数据",
      loading: true,
      total: 0,
    };
  },
  mounted() {
    if(this.isExpand){
      this.treeData.map(element=>{ 
        element.checked = true;
        this.$forceUpdate();
      })
    }

   

  },
  methods: {
    expandClick(item) {
      item.checked = !item.checked;
      this.$forceUpdate();
    },

    treeClick(item) {
      this.treeData.map((element) => {
        if (element.child) {
          element.child.map((val) => {
            val.choosed = false;
          });
        }
      });
      item.choosed = true;
      this.$forceUpdate();
      this.$emit('nodeClick',item)
    },
   
   nodeClick(item){
     this.$emit('nodeClick',item)
   }
  },
};
</script>
<style scoped>
.noDataStyle {
  color: #e8eeff;
  font-size: 20px;
  display: inline-block;
  width: 230px;
  text-align: center;
  line-height: 48px;

}
.monitorTreeWrap {
  width: 100%;
}
.father1{
  
}
.father {
  color: #b8c3d6;
  box-sizing: border-box;
}
.child-wrap {
  overflow: auto;
}
.lists {
  color: #b8c3d6;
  line-height: 36px;
  background:#18325a;
  border: 1px solid #29435d;
  text-align: left;
  cursor: pointer;
}
.treeLi {
  /* margin-bottom: 6px; */
}
.dot {
  background: #28c2e7;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  display: inline-block;
  margin-top: 14px;
  margin-left: 32px;
  float: left;
}
.dotChecked {
  background: #fff;
}
.treeDetailTitle {
  float: left;
  padding-left: 8px;
  width: calc(100% - 48px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.clear {
  clear: both;
}
.expandImg {
  float: right;
  width: 24px;
  height: 24px;
  margin-top: 6px;
  cursor: pointer;
}
.treeTitle {
  float: left;
  margin-left: 6px;
  width: calc(100% - 54px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.expandImgToate {
  transform: rotate(180deg);
}
.treeChecked {
  background: #25bcff;
  color: #202f5f;
}
.childHeader {
  font-size: 14px;
  color: #e8eeff;
  line-height: 36px;
  background: #18325a;
  border: 2px solid #29435d;
  border-radius: 2px;
 
} 
.img {
    width: 20px;
    height: 20px;
    margin-left: 4px;
    margin-top: 6px;
    float: left;
  }
</style>
