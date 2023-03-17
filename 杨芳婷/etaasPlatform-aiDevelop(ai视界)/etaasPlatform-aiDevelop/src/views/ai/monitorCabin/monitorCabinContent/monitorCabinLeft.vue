<template>
  <div class="leftContaner">
    <div class="leftHeader">
      <img  src="@/assets/img/ai/monitorCabin/device.png" alt="">
      <span class="left">设备列表</span>
      <span class="right">{{ total }}个</span>
    </div>
    <monitor-Tree @treeClick="treeClick" @getTotal="getTotal"></monitor-Tree>
  </div>
</template>

<script>
import monitorTree from "@/components/monitorTree/index.vue";
export default {
  components: {
    monitorTree,
  },
  data() {
    return {
      total: 0,
      id:'',
    };
  },
  methods: {
    getTotal(item) {
      this.total = item;
    },

    treeClick(item) {
      if(this.id!==item.id){
         this.$bus.$emit("toBig", item);
         this.id=item.id
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.leftContaner {
  margin: 20px;
  
  position: relative;

  // background: red;
  .leftHeader {
    width: 100%;
    height: 3.51vh;
    line-height: 3.51vh;
    img{
       width: 100%;
       height: 3.51vh;
       position: absolute;
       left: 0;
       top: 0;
    }
    // background: url("~@/assets/img/ai/monitorCabin/device.png") no-repeat;
    .left {
      font-size: 18px;
      position: absolute;
      left: 20px;
      color: #ffffff;
    }
    .right {
      font-size: 18px;
      position: absolute;
      right: 20px;
      color: #ffffff;
    }
  }
  .leftContent {
    margin-top: 13px;
    width: 100%;
    // background: gold;
    max-height: 74vh;
    overflow: hidden;
    div {
      overflow: auto;
      .leftList {
        width: 100%;
        height: 16.67;
        // background: red;
        margin-top: 8px;
      }
    }
  }
}
.father {
  width: 210px;
  display: flex;
  flex-direction: column;
  max-height: 782px;
  overflow: hidden;
}
.child-wrap {
  overflow: auto;
}
.child {
  // background: #062440;
  height: 196px;
  border-bottom: 1px dashed #ffffff;
  .childHeader {
    font-size: 14px;
    color: #e8eeff;
    .img {
      width: 24px;
      height: 24px;
      margin-left: 10px;
    }
  }
  .lists {
    margin-top: 10px;
    height: 40px;
    // background: red;
  }
  .dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    // background: #28C2E7;
  }
  .childcontent {
    color: #e8eeff;
    font-size: 14px;
    margin-top: 10px;
  }
  .img {
    width: 139px;
    height: 78px;
  }
}
</style>