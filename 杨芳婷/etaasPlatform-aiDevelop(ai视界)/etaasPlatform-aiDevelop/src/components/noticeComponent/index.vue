<template>
  <div class="noticeAllContent">
    <div
      :class="showAlert && !showNoticeModal ? 'defaultContent' : noticeClass"
      v-show="isLogin && subTitle === '' && noticeNum !== '' && showAlert"
    >
      <el-alert title="" type="warning" center :closable="false" effect="dark">
        <template slot="title">
          <div @click="handleInnerNotice">
            <i class="iconfont icon-msg_fill" />
            <span class="noticeTitle">{{ noticeNum }}</span>
          </div>
        </template>
      </el-alert>
      <div>
        <i
          class="iconfont icon-close_line iconClose"
          @click="handleCloseAlert"
        />
      </div>
    </div>
    <div class="inlineTableContent" v-show="showNoticeModal">
      <el-table :data="warningData" v-loading="loading">
        <el-table-column
          width="240"
          prop="datetime"
          label="预警时间"
        ></el-table-column>
        <el-table-column width="120" prop="warning" label="预警等级">
          <template slot-scope="scope">
            <span>{{ scope.row.warning.level }}</span>
          </template>
        </el-table-column>
        <el-table-column width="130" prop="algName" label="预警事件">
        </el-table-column>
        <el-table-column width="150" prop="device" label="设备名称">
          <template slot-scope="scope">
            <span>{{ scope.row.device.deviceName }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" property="action" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handlechangeScene(scope.row)"
              >查看/处理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="form_lt">
        <el-pagination
          style="float: right"
          background
          align="center"
          :current-page="noticecurrentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="noticepageSize"
          layout="prev, pager, next, jumper"
          :total="noticetotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
        <p>
          <i class="iconfont icon-close_line" @click="handleCloseModal"></i>
        </p>
      </div>
    </div>
    <check-dialog
      :dialogVisible="visible"
      :form-data="formData"
      :parkName="formData.device.parkName"
      :name="formData.scene.name"
      :id="formData.id"
      :title="'事件编号' + `${formData.id}`"
      :floor="formData.device.floor"
      :areaName="formData.device.areaName"
      :deviceName="formData.device.deviceName"
      :building-name="formData.device.buildingName"
      @close-callback="handleClose"
    ></check-dialog>
  </div>
</template>
<script>
import checkDialog from "@components/checkDialog/index";
import * as api from "@/api/ai/earlyWarning";
export default {
  components: { checkDialog },
  data() {
    return {
      subTitle: "",
      formData: { device: {}, scene: {} }, // 从预警列表获取的详情数据
      visible: false, // 是否展示查看/处理详情页面
      isLogin: false,
      noticeClass: "defaultContent",
      showNoticeModal: false, // 是否展示下拉弹框列表
      showNoticeContent: true, // 改成从websoket实时获取
      noticeNum: "", // 预警数量
      warningData: [], // 预警列表数据
      noticecurrentPage: 1,
      noticepageSize: 10,
      noticetotal: 0,
      showAlert: true,
      loading: false,
    };
  },
  watch: {
    // 根据路由监听判断是否是登录状态
    $route: function (val) {
      this.currentRoute = val.path;
      if (val.path === "/") {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },
  },
  mounted() {
    let that = this;
    localStorage.getItem("noticeNum") &&
      (that.noticeNum =
        "您有" + localStorage.getItem("noticeNum") + "个待处理事件");
    window.addEventListener("setItemEvent", function (e) {
      if (e.key === "noticeNum") {
        const noticeNum = e.newValue;
        this.warningData = [];
        if (noticeNum) {
          that.showNoticeModal && that.fetchData(1, 10);
          that.showAlert = true;
          that.noticeNum = "您有" + noticeNum + "个待处理事件";
        } else {
          that.noticeNum = "";
        }
      }
    });
    this.subTitle = "";
    this.$bus.$on("monitoringRoom", (title) => {
      this.subTitle = title || "";
    });
    // 刷新浏览器事件判断
    if (this.$route.path === "/") {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  },
  methods: {
    handleSizeChange(val) {
      this.noticecurrentPage = 1;
      this.noticepageSize = val;
      this.fetchData(1, val);
    },
    handleCurrentChange(val) {
      this.noticecurrentPage = val;
      this.fetchData(val, this.noticepageSize);
    },
    // 处理内部显示的消息通知
    handleInnerNotice() {
      // this.warningData = localStorage.getItem("warningData")
      //   ? JSON.parse(localStorage.getItem("warningData"))
      //   : [];
      this.noticeClass = "alertContent";
      this.showNoticeModal = true;
      this.fetchData(1, 10);
    },
    // 查看/处理消息通知
    handlechangeScene(row) {
      // 消息通知消失
      // this.showNoticeContent = false;
      // this.showNoticeModal = false;
      this.formData = row;
      this.visible = true;
    },
    // 关闭查看/处理详情页面
    handleClose() {
      this.visible = false;
      this.fetchData(1, 10);
    },
    fetchData(current, limit) {
      this.warningData.length === 0 && (this.loading = true);
      const params = { state: "待处理", limit, current };
      if (localStorage.getItem("token")) {
        api
          .alarmlistBacklog(params)
          .then((res) => {
            this.loading = false;
            this.warningData = res.result && res.result.list;
            // this.noticetotal = parseInt(this.noticeNum)
            this.noticetotal = res.result && res.result.total;
          })
          .catch((res) => {
            this.loading = false;
            this.warningData = [];
          });
      }
    },
    // 关闭消息通知
    handleCloseModal() {
      this.showNoticeModal = false;
    },
    // 关闭alert警告
    handleCloseAlert() {
      this.showNoticeModal = false;
      this.showAlert = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.noticeAllContent {
  position: relative;
  .iconfont {
    font-size: 20px;
  }
  .iconClose {
    position: absolute;
    right: 35px;
    top: 16px;
    color: #fff;
  }
  .inlineTableContent {
    position: absolute;
    top: 58px;
    right: 130px;
    z-index: 2;
    box-shadow: 0px 9px 28px 8px rgba(6, 16, 48, 0.05),
      0px 6px 16px 0px rgba(6, 16, 48, 0.08),
      0px 0px 7px -3px rgba(10, 25, 51, 0.2);
    background: #fff;
    padding-bottom: 15px;
    .el-table {
      border-radius: 8px 8px 0px 0px;
    }
    .form_lt {
      padding-top: 15px;
      padding-right: 15px;
    }
    p {
      position: absolute;
      top: -15px;
      right: -15px;
      background: #ffffff;
      box-shadow: 0px 9px 28px 8px rgba(6, 16, 48, 0.05),
        0px 6px 16px 0px rgba(6, 16, 48, 0.08),
        0px 0px 7px -3px rgba(10, 25, 51, 0.2);
      border-radius: 20px;
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .defaultContent,
  .alertContent {
    margin: 24px;
    .el-alert--warning.is-dark {
      height: 64px;
      border-radius: 4px;
    }
    /deep/.el-alert__closebtn {
      font-size: 18px;
      position: absolute;
      top: 22px;
      right: 15px;
    }
    .noticeTitle {
      margin-left: 10px;
    }
  }
  .defaultContent {
    .el-alert--warning.is-dark {
      background: #ffa55d;
    }
  }
  .alertContent {
    .el-alert--warning.is-dark {
      background: #347fff;
      filter: blur(0.1171875px);
    }
  }
}
</style>
