<template>
  <div
    id="earlyWarning"
    v-show="$store.state.earlyWarnigShow"
    :class="[$store.state.earlyStyleShow ? 'early' : 'earlyWarning']"
  >
    <div class="earlyWarningTitle">
      预警清单
      <span
        v-if="$store.state.earlyStyleShow"
        @click="handleAll"
        class="earlyWarningTitleSpan"
        >一键处理</span
      >
      <span v-else class="earlyWarningTitleSpan" @click="DetailClick"
        >查看设备信息详情</span
      >
      <img
        src="~@/assets/digital/assets/img/earlyWarning/close.png"
        class="earlyWarningClose"
        @click="closeClick"
      />
    </div>
    <div>
      <div class="earlyWarningBorderCircle"></div>
      <div class="earlyWarningBorder"></div>
      <div class="earlyWarningBorderCircles"></div>
      <div class="clear"></div>
    </div>
    <el-table
      class="earlyWarningTable"
      :header-cell-style="{
        'font-size': '15PX',
        background: 'rgb(34,44,74) !important',
        color: 'rgb(188,190,199)',
        border: 'none',
        padding: '5PX 0',
      }"
      :cell-style="{
        'font-size': '14PX',
        background: 'rgb(41,48,66) !important',
        color: '#fff',
        border: 'none',
        paddingTop: '4PX !important;',
      }"
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column
        label="编号"
        prop="eventId"
        show-overflow-tooltip
        width="50"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.eventId }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="algName" label="识别算法" width="80">
      </el-table-column>
      <el-table-column prop="level" label="等级" width="50">
        <template slot-scope="scope">
          <div
            class="earlyWarningLevel"
            :class="[
              scope.row.warning.levelName === '一级' ? '' : 'earlyWarningLevels',
            ]"
          >
            {{ scope.row.warning.levelName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="datetime" show-overflow-tooltip label="预警时间">
      </el-table-column>
      <el-table-column prop="operate" label="操作" width="50">
        <template slot-scope="scope">
          <div class="earlyWarningOperate" @click="operationClick(scope.row)">
            操作
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="earlyWarningPagination">
      <div style="float: left">
        共
        <span class="earlyWarningCurrentPage">{{ total }}</span>
        页&nbsp;&nbsp;&nbsp;当前页面<span class="earlyWarningCurrentPage">
          {{ currentPage }}</span
        >
      </div>
      <img
        src="~@/assets/digital/assets/img/earlyWarning/leftpageafter.png"
        class="pageImg leftPageImg"
        @click="goLastPage()"
        v-if="beforePage"
      />
      <img
        src="~@/assets/digital/assets/img/earlyWarning/leftpage.png"
        class="pageImg leftPageImg"
        @click="goLastPage()"
        v-if="!beforePage"
      />
      <span class="earlyWarningCurrentPage">&nbsp;{{ currentPage }}</span>
      /{{ total }}&nbsp;
      <img
        src="~@/assets/digital/assets/img/earlyWarning/rightpageafter.png"
        class="pageImg rightPageImg"
        @click="goNextPage()"
        v-if="afterPage"
      />
      <img
        src="~@/assets/digital/assets/img/earlyWarning/rightpage.png"
        class="pageImg rightPageImg"
        @click="goNextPage()"
        v-if="!afterPage"
      />
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import { alarmlistBacklog } from "@/api/ai/earlyWarning";
import { setCharts } from "@/utils/digital/utils.js";
export default {
  name: "earlyWarning",
  props: {},
  data() {
    return {
      currentPage: 1,
      total: 0,
      limit: 5,
      earlyWarnigShow: true,
      afterPage: false,
      beforePage: false,
      tableData: [],
      loading: true,
    };
  },
  mounted() {
    this.$bus.$on("updateWaring", () => {
      (this.currentPage = 1), (this.limit = 5), this.initDataDetail();
    });
    this.$bus.$on("setEarlyWarnig", () => {
      (this.currentPage = 1), (this.limit = 5), console.log("摄像头刷新了XXX");
      this.initData();
    });
    this.$bus.$on("showWarning", () => {
      (this.currentPage = 1),
        (this.limit = 5),
        console.log("this,,,", this.$store.state.eventDetailShow);
      this.initDataDetail();
    });
  },
  watch: {
    "$store.state.earlyWarnigShow": {
      handler(newV, oldV) {
        if (newV == true) {
          // console.log("yes", this.$refs.eventDetail);
          // setCharts(this.$refs.eventDetail, this);
          let x = document.getElementById("earlyWarning");
          console.log("x2", x);
          setCharts(x, this);
        }
      },
      deep: true,
    },
  },
  methods: {
    handleAll() {
      this.$router.replace({ path: "/earlyWarning" });
    },
    // 处理详情
    initDataDetail() {
      this.loading = true;
      let params = {
        state: "待处理",
        limit: this.limit,
        current: this.currentPage,
      };
      let that = this;
      if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('token'))['aiHorizon']) {
        alarmlistBacklog(params)
          .then((res) => {
            console.log("res", res);
            that.loading = false;
            if (res.result && res.result.list) {
              that.tableData = res.result.list;
              that.total = res.result.pages;
              that.currentPage = res.result.current;
              that.tableData.map((element, index) => {
                element.num = (that.currentPage - 1) * that.limit + index + 1;
              });
            }
          })
          .catch((res) => {});
      }
    },
    // 分页时的loading
    initpageDetail() {
      let params = {
        state: "待处理",
        limit: this.limit,
        current: this.currentPage,
      };
      let that = this;
      if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('token'))['aiHorizon']) {
        alarmlistBacklog(params)
          .then((res) => {
            that.loading = false;
            if (res.result && res.result.list) {
              that.tableData = res.result.list;
              that.total = res.result.pages;
              that.currentPage = res.result.current;
              that.tableData.map((element, index) => {
                element.num = (that.currentPage - 1) * that.limit + index + 1;
              });
            }
          })
          .catch((res) => {});
      }
    },
    initData() {
      let params = {
        state: "待处理",
        limit: this.limit,
        current: this.currentPage,
        deviceId: this.$store.state.currentCameraId,
      };
      console.log("params", params);
      let that = this;
      if (localStorage.getItem("")) {
        alarmlistBacklog(params)
          .then((res) => {
            console.log("res", res);
            that.loading = false;
            if (res.result && res.result.list) {
              that.tableData = res.result.list;
              that.total = res.result.pages;
              that.currentPage = res.result.current;
              that.tableData.map((element, index) => {
                element.num = (that.currentPage - 1) * that.limit + index + 1;
              });
            }
          })
          .catch((res) => {});
      }
    },

    closeClick() {
      this.$store.state.eventDetailShow = false;
      this.$store.commit("setEarlyWarnigShow", false);
    },

    goLastPage() {
      if (this.currentPage > 1 && this.currentPage <= this.total) {
        this.currentPage--;
        this.beforePage = true;
        this.afterPage = false;
        if (this.$store.state.earlyStyleShow) {
          this.initpageDetail();
        } else {
          this.initData();
        }
      }
    },

    goNextPage() {
      if (this.currentPage < this.total) {
        this.currentPage++;
        this.afterPage = true;
        this.beforePage = false;
        if (this.$store.state.earlyStyleShow) {
          this.initpageDetail();
        } else {
          this.initData();
        }
      }
    },

    DetailClick() {
      this.$store.state.eventDetailShow = false;
      this.$store.commit("setDeviceDetailShow", true);
      this.$bus.$emit("deviceDetailEvent");
    },

    operationClick(item) {
      console.log("commit");
      this.$store.state.deviceDetailShow = false;
      this.$store.commit("setHandleData", item);
      this.$store.commit("setEventDetailShow", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.clear {
  clear: both;
}
@media screen and (max-width: 1480px) {
  .earlyWarning {
    width: 28vw !important;
  }
  .early {
    width: 28vw !important;
  }
}
.early {
  // 修改overflow不显示问题
  /deep/.el-table .cell,
  .el-table th div {
    padding-right: 0;
    padding-left: 10px;
  }
  position: fixed;
  z-index: 99;
  top: 35%;
  width: 24vw;
  min-height: 191px;
  left: 5%;
  background-size: 100% 100%;
  background: url("~@/assets/digital/assets/img/earlyWarning/bg.png") no-repeat
    center center;
  background-size: 100% 100%;
  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='~@/assets/digital/assets/img/earlyWarning/bg.png', sizingMethod='scale');
  .earlyWarningTitle {
    font-size: 20px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #e8eeff;
    line-height: 30px;
    padding: 8px 26px 8px 26px;
  }
  .earlyWarningLevel {
    color: #ff3426;
  }
  .earlyWarningTitleSpan {
    float: right;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #25bcff;
    line-height: 30px;
    text-decoration: underline;
    cursor: pointer;
    margin-right: 20px;
  }
  .earlyWarningClose {
    position: absolute;
    right: 16px;
    top: 12px;
    width: 25px;
    cursor: pointer;
  }
  .earlyWarningBorderCircle {
    float: left;
    height: 2px;
    width: 2px;
    background: #fff;
    border-radius: 50%;
    margin-left: 26px;
  }
  .earlyWarningBorder {
    border-bottom: 1px dashed #979797;
    width: calc(100% - 52px);
    float: left;
  }
  .earlyWarningBorderCircles {
    float: left;
    height: 2px;
    width: 2px;
    background: #fff;
    border-radius: 50%;
    margin-right: 16px;
  }
  .earlyWarningTable {
    width: calc(100% - 52px) !important;
    margin: 0 auto;
    margin-top: 16px;
  }
  .el-table::before {
    height: 0px !important;
  }
  .earlyWarningOperate {
    color: #25bcff;
    text-decoration: underline;
    cursor: pointer;
  }
  /deep/.el-table td,
  .el-table th {
    padding: 6px 0px !important;
  }
  /deep/.el-table__empty-block {
    background: rgb(41, 48, 66) !important;
  }
  .earlyWarningLevels {
    color: #fed32b;
  }
  .earlyWarningPagination {
    margin-top: 4px;
    margin-bottom: 4px;
    margin-left: 70px;
    font-size: 16px;
    color: #ccd1df;
    line-height: 32px;
    height: 32px;
    .earlyWarningCurrentPage {
      color: #25bcff;
    }
    .pageImg {
      width: 19px;
      cursor: pointer;
    }
    .leftPageImg {
      margin-left: 4px;
    }
  }
}
.earlyWarning {
  /deep/.el-table .cell,
  .el-table th div {
    padding-right: 0;
    padding-left: 10px;
  }
  position: fixed;
  z-index: 99;
  top: 10%;
  width: 24vw;
  min-height: 191px;
  right: 54%;
  background-size: 100% 100%;
  background: url("~@/assets/digital/assets/img/earlyWarning/bg.png") no-repeat
    center center;
  background-size: 100% 100%;
  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='~@/assets/digital/assets/img/earlyWarning/bg.png', sizingMethod='scale');
  .earlyWarningTitle {
    font-size: 20px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #e8eeff;
    line-height: 30px;
    padding: 8px 26px 8px 26px;
  }
  .earlyWarningLevel {
    color: #ff3426;
  }
  .earlyWarningTitleSpan {
    float: right;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #25bcff;
    line-height: 30px;
    text-decoration: underline;
    cursor: pointer;
    margin-right: 20px;
  }
  .earlyWarningClose {
    position: absolute;
    right: 16px;
    top: 12px;
    width: 25px;
    cursor: pointer;
  }
  .earlyWarningBorderCircle {
    float: left;
    height: 2px;
    width: 2px;
    background: #fff;
    border-radius: 50%;
    margin-left: 26px;
  }
  .earlyWarningBorder {
    border-bottom: 1px dashed #979797;
    width: calc(100% - 52px);
    float: left;
  }
  .earlyWarningBorderCircles {
    float: left;
    height: 2px;
    width: 2px;
    background: #fff;
    border-radius: 50%;
    margin-right: 16px;
  }
  .earlyWarningTable {
    width: calc(100% - 52px) !important;
    margin: 0 auto;
    margin-top: 16px;
  }
  .el-table::before {
    height: 0px !important;
  }
  .earlyWarningOperate {
    color: #25bcff;
    text-decoration: underline;
    cursor: pointer;
  }
  /deep/.el-table td,
  .el-table th {
    padding: 6px 0px !important;
  }
  /deep/.el-table__empty-block {
    background: rgb(41, 48, 66) !important;
  }
  .earlyWarningLevels {
    color: #fed32b;
  }
  .earlyWarningPagination {
    margin-top: 4px;
    margin-bottom: 4px;
    margin-left: 70px;
    font-size: 16px;
    color: #ccd1df;
    line-height: 32px;
    height: 32px;
    .earlyWarningCurrentPage {
      color: #25bcff;
    }
    .pageImg {
      width: 19px;
      cursor: pointer;
    }
    .leftPageImg {
      margin-left: 4px;
    }
  }
}
</style>
