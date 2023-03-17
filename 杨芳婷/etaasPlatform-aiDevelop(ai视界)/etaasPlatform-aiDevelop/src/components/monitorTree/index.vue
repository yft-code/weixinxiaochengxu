<template>
  <div class="monitorTreeWrap" v-loading="loading">
    <div
      class="father1"
      v-if="tableData.length > 0"
      style="overflow: auto; overflow-x: hidden"
      :style="{ maxHeight: `${69.2}vh` }"
    >
      <div class="father">
        <div class="child-wrap">
          <div class="child" v-for="(item, index) in tableData" :key="index">
            <div class="treeLi">
              <div class="childHeader">
                <img
                  class="img"
                  src="@/assets/img/ai/monitorCabin/deviceListIco.png"
                  alt=""
                />
                <div class="treeTitle">{{ item.name }}</div>
                <img
                  src="@/assets/img/ai/monitorCabin/expand.png"
                  class="expandImg"
                  @click="expandClick(item, index)"
                  :class="[item.checked ? '' : 'expandImgToate']"
                  v-if="item.child.length !== 0"
                />
                <div class="clear"></div>
              </div>
              <div v-if="item.checked">
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
import { getDevice } from "@/api/ai/monitorCabin";
export default {
  components: {},
  data() {
    return {
      noData: "",
      tableData: [],
      loading: true,
      total: 0,
    };
  },
  watch: {},
  mounted() {
    this.getData();
  },
  methods: {
    expandClick(item) {
      item.checked = !item.checked;
      this.$forceUpdate();
    },

    treeClick(item) {
      this.tableData.map((element) => {
        if (element.child) {
          element.child.map((val) => {
            val.choosed = false;
          });
        }
      });
      item.choosed = true;
      this.$forceUpdate();
      this.$emit("treeClick", item);
    },

    getData() {
      this.loading = true;
      getDevice().then((res) => {
        this.total = 0;
        this.loading = false;
        if (res.result) {
          this.tableData = res.result;
          if (this.tableData.length === 0) {
            this.noData = "暂无设备";
          } else {
            this.noData = "";
          }
          // this.total = res.result.length
          this.tableData &&
            this.tableData.map((item) => {
              if (item.child && item.child.length > 0) {
                this.total += item.child.length;
              }
            });
          this.$emit("getTotal", this.total);
          this.tableData.map((element) => {
            element.checked = true;
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-loading-mask {
  background: #062440;
}
.noDataStyle {
  color: #e8eeff;
  font-size: 20px;
  display: inline-block;
  width: 230px;
  height: 70vh;
  text-align: center;
  line-height: 70vh;
  //  background: #0a84c0;
}
.monitorTreeWrap {
  width: 100%;
  height: 76vh;
}
.father1 {
  padding-top: 10px;
  width: 230px;
  color: #b8c3d6;
  box-sizing: border-box;
  z-index: 1000;
  &::-webkit-scrollbar {
    width: 6px;
    height: 14px;
  }
  //滚动条小方块
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px #36627e;
    background: #36627e;
  }
  //滚动条轨道
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px #061a32;
    border-radius: 0;
    background: #061a32;
  }
}
.father {
  padding-top: 10px;
  width: 210px;
  color: #b8c3d6;
  box-sizing: border-box;
  z-index: 1000;
}
.child-wrap {
  overflow: auto;
}
.lists {
  color: #b8c3d6;
  line-height: 36px;

  border: 1px solid #29435d;
  margin-top: 6px;
  text-align: left;
  cursor: pointer;
}
.treeLi {
  margin-bottom: 6px;
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
  .img {
    width: 20px;
    height: 20px;
    margin-left: 4px;
    margin-top: 6px;
    float: left;
  }
}
</style>
