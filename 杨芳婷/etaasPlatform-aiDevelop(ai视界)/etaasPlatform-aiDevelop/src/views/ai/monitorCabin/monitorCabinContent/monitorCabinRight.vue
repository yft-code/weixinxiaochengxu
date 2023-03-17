<template>
  <div class="leftContaner">
    <div class="leftHeader">
      <img src="@/assets/img/ai/monitorCabin/device.png" alt="">
      <span class="left">告警记录</span>
    </div>
    <div class="header">
      <div class="deviceDetailLiSelect">
        <div @click="openValue" class="left">
          <input
            v-model="warningType"
            type="text"
            :disabled="true"
            placeholder="请选择"
            class="deviceDetailLiSelectInput"
          />
          <img
            src="@/assets/img/ai/monitorCabin/arrow.png"
            alt=""
            class="ico"
          />
        </div>
        <div class="right">
        <span class="dayStyle">今日事件</span>
        <span class="warningDayStyle">{{ initWarningDay }}起</span>
        </div>
        <div class="deviceDetailList" v-show="show">
          <ul>
            <li
              @click="getValue(item)"
              v-for="(item, index) in list"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        
      </div>
      
    </div>
    <!-- 告警列表 -->
    <div v-loading="myloading" class="fatherWrap1">
      <!-- 有数据 -->
      <div
        v-if="tableData.length > 0"
        class="fatherWrap"
        style="overflow: auto"
      >
        <div
          class="father"
          v-infinite-scroll="load"
          infinite-scroll-throttle-delay="200"
          infinite-scroll-disabled="disabled"
          immediate-check="false"
          infinite-scroll-distance="50"
        >
          <div class="child" v-for="(item, index) in tableData" :key="index">
            <div class="childHeader">
              <span
                class="circle"
                :style="{ background: item.warning.levelColor }"
              ></span>
              <span class="levelNameStyle">{{ item.warning.levelName }}</span>
              <span class="typeStyle">{{ item.warning.type }}</span>
              <span class="stateStyle">{{ item.state }}</span>
            </div>
            <div>
              <img class="img" :src="item.pic" alt="" @click="imgClick(item)"/>
            </div>
            <div class="childcontent">
              <span class="childcontentTitle">设备 </span>
              <span>{{ item.deviceName }}</span>
            </div>
            <div class="childcontent">
              <span class="childcontentTitle">算法 </span>
              <span>{{ item.algName }}</span>
            </div>
            <div class="childcontent">
              <span class="childcontentTitle">时间 </span>
              <span>{{ item.datetime }}</span>
            </div>
          </div>
        </div>
        <p v-if="loading" class="loadingStyle">加载中...</p>
        <p v-if="noMore" class="loadingStyle">没有更多了</p>
      </div>
      <!-- 无数据 -->
      <div v-else class="fatherWrap2">
        <div class="noDataStyle">{{ noData }}</div>
      </div>
    </div>
     <el-dialog
      :visible.sync="imgVisible"
      :destroy-on-close="true"
      width="600px"
      :show-close	="false"
    >
      <div slot="title">
        
        
           <img  @click="handleClose" :src="imgs" alt="" class="dialogClose">
           <div class="clear"></div>
        </div>
      <img :src="imgUrl" class="imgDialog"/>
    </el-dialog>
  </div>
</template>

<script>
import { getSimpleEventList } from "@/api/ai/monitorCabin";
export default {
  data() {
    return {
      loading: false,
      initWarningDay: 0,
      tableData: [],
      total: 0,
      pages: 0,
      noData: "",
      list: ["全部", "非实时", "实时"],
      warningType: "实时",
      show: false,
      myloading: false,
      warningAll: 0,
      warningDay: 0,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      form: {},
      imgUrl:'',
      imgVisible:false,
      imgs: require("@/assets/img/ai/monitorCabin/close_line.svg"),
    };
  },
  computed: {
    noMore() {
      return this.tableData.length >= this.total;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  mounted() {},
  created() {
    // 告警事件列表
     if(this.$store.state.isLogin){
      this.initGetAlarmlistBacklog(this.form);
   }
   
  },
  methods: {
    handleClose(){
       this.imgVisible = false;
    },
    imgClick(item){
      this.imgUrl = item.pic;
      this.imgVisible = true;
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        if (this.currentPage <= this.pages) {
          this.getAlarmlistBacklog(this.form);
        } else {
        }

        // this.busy = false;
      }, 1000);
    },
    initGetAlarmlistBacklog(params) {
      // this.loading = false;
      var day = this.getDate();
      var tom = this.dealTime(9);
      params.alarmStartTime = day;
      params.alarmEndTime = tom;
      this.myloading = true;
      this.noData = "";
      this.currentPage = 1;
      const current = this.currentPage;
      const limit = this.pageSize;
      if (this.warningType === "全部") {
        params.warningType = "";
      } else {
        params.warningType = this.warningType;
      }
      params.limit = limit;
      params.current = current;
      getSimpleEventList(params).then((res) => {
        this.myloading = false;
        this.total = res.result.total;
        this.pages = res.result.pages;
        this.tableData = res.result.list;
        this.initWarningDay = res.result.total;
        if (this.tableData.length === 0) {
          this.noData = "暂无" + this.warningType + "事件告警";
        } else {
          this.noData = "";
        }
      });
    },
    //  今天昨天明天时间处理 v==3为昨天。v==6为今天。v==9为明天
    dealTime(v) {
      let b = 24 * 60 * 60 * 1000; //一天的时间
      let day = new Date(); //当天的时间

      v == 3
        ? day.setTime(day.getTime() - b)
        : v == 6
        ? day.setTime(day.getTime())
        : day.setTime(day.getTime() + b);

      let dayMon =
        day.getMonth() + 1 >= 10
          ? day.getMonth() + 1
          : "0" + (day.getMonth() + 1);
      let dayDat =
        day.getDate() + 1 >= 10 ? day.getDate() : "0" + day.getDate();

      let s = day.getFullYear() + "-" + dayMon + "-" + dayDat + " 00:00:00";
      return s;
    },
    // 获取今天的时间
    getDate() {
      let dt = new Date();
      let year = dt.getFullYear();
      let month = dt.getMonth() + 1;
      let date = dt.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      return year + "-" + month + "-" + date + " 00:00:00";
    },
    // 下拉框显示和隐藏
    openValue() {
      this.show = !this.show;
    },
    // 实时非实时下拉框
    getValue(item) {
      this.warningDay = "";
      this.warningType = item;
      this.show = false;
      this.currentPage = 0;
      this.tableData = [];
      this.initGetAlarmlistBacklog(this.form);
    },
    // 告警列表
    getAlarmlistBacklog(params) {
      // this.loading = false;
      var day = this.getDate();
      var tom = this.dealTime(9);
      params.alarmStartTime = day;
      params.alarmEndTime = tom;
      // this.myloading = true;
      this.noData = "";
      // this.pageSize += 10;
      this.currentPage++;
      const current = this.currentPage;
      const limit = this.pageSize;
      if (this.warningType === "全部") {
        params.warningType = "";
      } else {
        params.warningType = this.warningType;
      }
      params.limit = limit;
      params.current = current;
      getSimpleEventList(params).then((res) => {
        // this.myloading = false;
        this.total = res.result.total;
        this.pages = res.result.pages;
        this.tableData = this.tableData.concat(res.result.list);
        // this.tableData = res.result.list;

        this.loading = false;

        console.log(this.tableData, "tttt", this.busy);
        this.warningDay = res.result.total;
        if (this.tableData.length === 0) {
          this.noData = "暂无" + this.warningType + "事件告警";
        } else {
          this.noData = "";
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.clear{
  clear:both;
}
.imgDialog{
  width:90%;
  display: block;
  margin:0 auto;
}
.warp{
  margin-top: 10px;
  width: 80px;
  position: relative;
  background: red;
}
.loadingStyle {
  height: 5vh;
  // background: #1ffadb;
  line-height: 5vh;
  text-align: center;
  color: white;
}
.levelNameStyle {
  padding-left: 5px;
  padding-right: 10px;
}
.typeStyle {
  width: 52px;
  height: 18px;

  display: inline-block;
  background: linear-gradient(90deg, #454b5e 0%, rgba(216, 216, 216, 0) 100%);
  border-radius: 11px;
  color: #1ffadb;
  // margin-left: 20px;
  text-align: center;
}
.stateStyle {
  color: #0a84c0;
  // margin-left: 20px;
}
.circle {
  display: inline-block;
  border-radius: 50%;
  height: 8px;
  width: 8px;
  margin: 0;
}
.dayStyle {
  display: inline-block;
  height: 28px;
  padding-left: 5px;
  padding-right: 5px;
}
.warningDayStyle {
  display: inline-block;
  height: 28px;
  color: #ff3a3a;
}

.leftContaner {
  width: 210px;
  height: 76vh;
  margin: 0 auto;
  margin-top: 20px;
  /deep/.el-dialog__header{
    background:rgba(6,26,50,0.9)
  }
  /deep/.el-dialog__body{
     background:rgba(6,26,50,0.9);
     padding-top:20px;
  }
  .dialogClose{
    float:right;
    cursor: pointer;
  }
  .leftHeader {
    width: 100%;
    height: 3.51vh;
    line-height: 3.51vh;
    position: relative;
     img{
       width: 100%;
       height: 3.51vh;
       position: absolute;
       left: 0;
       top: 0;
    }
    .left {
      
      font-size: 18px;
      position: absolute;
      left: 20px;
      color: #ffffff;
    }
  }
  .header {
    height: 4vh;
    font-size: 14px;
    color: #e8eeff;
    line-height: 4.62vh;
    .deviceDetailLiSelect {
      display: flex;
      .left{
        margin-top: 10px;
        width: 80px;
        position: relative;
      }
       .right{
        line-height: 28px;
         height: 28px;
        margin-top: 10px;
        position: relative;
      }
      position: relative;
      .deviceDetailList {
        position: absolute;
        top: 33px;
        width: 100%;
        border: 1px solid #979797;
        overflow: hidden;
        z-index: 9999;
        background: #06223c;
      }
      .deviceDetailList ul li {
        width: 100%;
        height: 30px;
        cursor: pointer;
        line-height: 30px;
        padding-left: 10px;
        color: #fff;
      }
      .deviceDetailList ul li:hover {
        background: #104576;
      }
      .deviceDetailLiSelectInput {
        padding-left: 18px;
        width: 80px;
        background: #06223c;
        border: 1px solid #324b62;
        height: 28px;
        color: #fff;
        cursor: pointer;
        position: absolute;
      }
      .ico{
        width: 16px; 
        position: absolute; 
        right: 3px; 
        top: 6px
      }
      .deviceDetailLiSelectInput::-webkit-input-placeholder {
        color: #fff;
        font-size: 16px;
        text-align: left;
        padding-left: 8px;
      }
      .deviceDetailLiSelectInput::-moz-placeholder {
        color: #fff;
        font-size: 16px;
        text-align: left;
        padding-left: 8px;
      }
      .deviceDetailLiSelectInput:-moz-placeholder {
        color: #fff;
        font-size: 16px;
        text-align: left;
        padding-left: 8px;
      }
      .deviceDetailLiSelectInput:-ms-input-placeholder {
        color: #fff;
        font-size: 16px;
        text-align: left;
        padding-left: 8px;
      }
    }
  }
  .fatherWrap1 {
    width: 230px;
    height: 70vh;
    /deep/.el-loading-mask {
      background: #062440;
    }
  }
  .fatherWrap2 {
    width: 230px;
    height: 70vh;

    margin: 0 auto;
    .noDataStyle {
      color: #e8eeff;
      font-size: 20px;
      display: inline-block;
      width: 230px;
      height: 70vh;
      text-align: center;
      line-height: 70vh;
    }
  }
  .fatherWrap {
    width: 100%;
    height: 70vh;
  }
  .father {
    padding: 0;
    margin: 0;
  }
  .child {
    height: 21vh;
    background: #062440;
    border-bottom: 1px dashed #aebace;
    .childHeader {
      font-size: 14px;
      color: #e8eeff;
      padding: 8px 0 8px 0;
    }
    .childcontent {
      color: #e8eeff;
      font-size: 14px;
      line-height: 32px;
    }
    .childcontentTitle {
      color: #aebace;
      padding-right: 5px;
    }
    .img {
      width: 139px;
      height: 7.2vh;
    }
  }
}
</style>