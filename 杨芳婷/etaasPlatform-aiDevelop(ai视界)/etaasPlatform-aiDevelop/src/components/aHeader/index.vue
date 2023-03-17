<!-- 头部 -->
<template>
  <div>
     <!-- <div>
        <audio class="audio"
           src="@/assets/voice/warnings.mp3"
           controls
           muted="muted"
           id="warningAudio"
           hidden="true">
    </audio>
    </div> -->
    <div v-if="isLogin" class="a-header-div">
      <div class="a-header flex align-items-center">
        <!-- 标题 -->
        <div class="a-header-title cursor-pointer">
          <img class="logoImg" :src="imgs" alt />
        </div>
        <!-- 登录账号、退出 -->
        <div class="a-header-lr flex-all">
          <span
            class="subtitle"
            v-if="currentRoute.indexOf('deviceManage') > -1"
            @click="handleToBack"
          >
            <i class="iconfont icon-left_line" v-if="subTitle"></i>
            <p>{{ subTitle }}</p>
          </span>
          <span v-else> </span>
          <ul>
            <li class="a-header-login flex-all">
              <div
                v-if="$store.state.videoList > 0"
                style="
                  line-height: 50px;
                  margin-right: 5px;
                  color: #347fff;
                  display: flex;
                  align-items: center;
                  font-size: 16px;
                "
              >
                <div class="pic">
                  <div class="pic-jiantou">
                    <i class="el-icon-bottom icon-word"></i>
                  </div>
                </div>
                <!-- <div>{{$store.state.videoList}}个视频正在下载中...</div> -->
              </div>
              <div class="monitorRoom" @click="monitorRoomClick">
                 <img src="@/assets/img/ai/device.png" class="monitorRoomImg"/>
                 <span class="monitorRoomSpan">监控室</span>
              </div>
                 <!-- <div class="monitorRoom" @click="consoleClick">
                 <img src="@/assets/img/ai/consoledesk.png" class="monitorRoomImg"/>
                 <span class="monitorRoomSpan">控制台</span>
              </div> -->
               <!-- <div class="lookButton" @click="goThreeD">3D查看</div> -->
              <div class="lookButton" @click="toUser">查看用户中心</div> 
              <div class="cursor-pointer uhlr-item-b flex align-content-center">
                <div
                  :class="
                    noticeNum
                      ? showAlert && !showNoticeModal
                        ? 'newNotice'
                        : noticeClass
                      : 'havenoNotice'
                  "
                  @click="handleNotice"
                >
                  <i class="icon iconfont icon-msg_fill" />
                  <span>{{ noticeNum }}</span>
                </div>
                <div class="inlineTableContent" v-show="showNoticeModal">
                  <el-table
                    :data="warningData"
                    v-loading="loading"
                    height="500"
                    :header-cell-style="{ 'font-size': '16PX' }"
                    :cell-style="{ 'font-size': '15PX' }"
                  >
                    <el-table-column
                      width="180"
                      prop="datetime"
                      label="预警时间"
                    ></el-table-column>
                    <el-table-column
                      width="150"
                      prop="warning"
                      label="预警等级"
                      @cell-mouse-enter="mouseOver"
                      @cell-mouse-leave="mouseLeave"
                    >
                      <template slot-scope="scope">
                        <el-popover
                          placement="top-start"
                          width="200"
                          trigger="hover"
                          popper-class="my-popover1"
                        >
                          <div>
                            {{ `预警等级:${scope.row.warning.levelName}` }}
                          </div>
                          <div>
                            {{
                              `预警说明:${
                                scope.row.warning.levelComment
                                  ? scope.row.warning.levelComment
                                  : "--"
                              }`
                            }}
                          </div>
                          <el-button slot="reference" type="text">
                            <span
                              class="circle"
                              :style="{
                                background: scope.row.warning.levelColor,
                              }"
                            ></span>
                          </el-button>
                        </el-popover>
                        <span>{{ scope.row.warning.name }}</span>
                      </template>
                      <!-- <template slot-scope="scope">
                      <div class="points">
                        <div class="point"  :style="{'background':scope.row.warning.levelColor}"></div>
                        <div style="margin-left:5PX">{{scope.row.warning.name}}</div>
                     </div>
                    </template> -->
                    </el-table-column>
                    <el-table-column
                      width="120"
                      prop="algName"
                      label="预警事件"
                    >
                    </el-table-column>
                    <el-table-column width="150" prop="device" label="设备名称">
                      <template slot-scope="scope">
                        <span>{{ scope.row.deviceName }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column width="110" prop="action" label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          @click="handlechangeScene(scope.row)"
                          >查看/处理</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="form_pg">
                    <el-pagination
                      style="float: right"
                      background
                      align="center"
                      :current-page="currentPage"
                      :page-sizes="[5, 10, 20]"
                      :page-size="pageSize"
                      layout="prev, pager, next, jumper"
                      :total="total"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                    >
                    </el-pagination>
                    <p>
                      <i
                        class="iconfont icon-close_line"
                        @click="handleCloseModal"
                      ></i>
                    </p>
                  </div>
                </div>
                <el-dropdown>
                  <div class="avatar-container">
                    <img
                      src="@/assets/img/ai/avatar.png"
                      class="imgAvatar"
                      alt=""
                    />
                    <div class="user">
                      <span class="username">{{ userName }}</span>
                    </div>
                  </div>
                  <el-dropdown-menu slot="dropdown">
                     <!-- <el-dropdown-item @click.native="toUser">
                      <span class="loginOutForm">用户中心</span>
                    </el-dropdown-item> -->
                    <el-dropdown-item @click.native="loginOut">
                      <span class="loginOutForm">退出登录</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else></div>
    <check-dialog
      @func="handleMyEvent"
      :dialogVisible="visible"
      :form-data="formData"
      :parkName="formData.device.parkName"
      :name="name"
      :id="formData.id"
      :title="'事件编号' + `${formData.eventId}`"
      :floor="formData.device.floor"
      :areaName="formData.device.areaName"
      :deviceName="formData.device.deviceName"
      :building-name="formData.device.buildingName"
      @close-callback="handleClose"
      @getReadState="getReadState"
    ></check-dialog>
    <voice ref="voice"></voice>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
import checkDialog from "@components/checkDialog/index";
import * as api from "@/api/ai/earlyWarning";
import { websocketclose } from "@/plugin/socket";
import { getMenuByUser } from "@/api/ai/menu";
import voice from '@components/voice/voice.vue';
export default {
  name: "aHeader",
  components: { checkDialog,voice},
  data() {
    return {
      userName: "admin",
      name: "",
      imgs: require("../../assets/img/ai/logo.svg"),
      imgsWai: require("../../assets/img/ai/wai.svg"),
      imgsNei: require("../../assets/img/ai/jiantou.svg"),
      formData: { device: {}, scene: {} }, // 从预警列表获取的详情数据
      isLogin: false, // 是否登录
      showMonitoringTitle: false, // 是否显示 监控室标题
      visible: false, // 是否展示查看/处理详情页面
      subTitle: "", // 子标题
      currentRoute: "", // 当前路由
      noticeClass: "newNotice", // 消息通知图标class
      showNoticeModal: false, // 显示通知下拉框表格
      haveShowNotice: false, // 是否点击查看/处理,
      noticeNum: "", // 预警数量
      noticeNumBefore: "", //记录上一次值，刷新无效
      noticeNumArr: [],
      warningData: [], // 预警列表数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      showAlert: true,
      loading: false,
      noticeShow: true,
      messageShow: null,
      Sencond: 3,
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
  created() {
    let that = this;
    that.$bus.$on("cll", () => {
  
      that.fetchData();
    });
    this.fetchNoticeData();
  },
  beforeDestroy() {
    // 在组件生命周期结束的时候销毁。
    const that = this;
    window.removeEventListener("setItemEvent", that.showWarning);
  },
  mounted() {
    let that = this;
    if (localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo")) && JSON.parse(localStorage.getItem("userInfo"))['aiHorizon']) {
      this.userName = JSON.parse(localStorage.getItem("userInfo"))['aiHorizon'].name;
    }
    this.$bus.$on("loginSucess", () => {
      if (localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo")) && JSON.parse(localStorage.getItem("userInfo"))['aiHorizon']) {
        this.userName = JSON.parse(localStorage.getItem("userInfo"))['aiHorizon'].name;
      }
    });
    //that.noticeNum = localStorage.getItem('noticeNum');
    window.addEventListener("setItemEvent", this.showWarning);
    this.$bus.$on("number", (number) => {
      this.noticeNum = number;
      this.noticeNumArr.push({ value: this.noticeNum });
      if (this.noticeNumArr.length > 1) {
        this.noticeNumBefore =
          this.noticeNumArr[this.noticeNumArr.length - 2].value;
      }
    });
    this.$bus.$on("monitoringRoom", (title) => {
      this.subTitle = title;
    });
    this.currentRoute = this.$route.path;
    // 刷新浏览器事件判断
    if (this.$route.path === "/") {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  },
  methods: {
     // 跳转到用户中心
    toUser(){
        getMenuByUser().then(res=>{
        if(res.result&&res.result.length>0){
        let token = JSON.parse(localStorage.getItem('token'))
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if(userInfo){
          userInfo['userCenter'] = userInfo['aiHorizon']
        }
        localStorage.setItem("userInfo",JSON.stringify(userInfo));
        if(token){
          token['userCenter'] =  token['aiHorizon'];
        }         
        localStorage.setItem("token",JSON.stringify(token));
         window.open(`${this.$store.state.publicUrl}usercenter/#/user_center/user?type=2`)
        }else{
           this.$message({
          message: '暂无访问权限，请联系管理员开通',
          type: 'warning'
        });
        }
      }).catch()
     
    },
    // goUserCenter() {
    //   //    var toToken =
    //   //     localStorage.getItem("token") || sessionStorage.getItem("token");
    //   //   // 加密
    //   //   let tokenUser = CryptoJS.AES.encrypt(toToken, "myToken").toString();
    //   //   // 解密
    //   // //   var b = CryptoJS.AES.decrypt(tokenUser, "myToken");
    //   // //   var c = b.toString(CryptoJS.enc.Utf8);
    //   //   let toUrl = this.GLOBAL.BASE_URL+tokenUser
    //   // window.location.href = toUrl;
    //   // window.location.href =
    //   //   "http://58.213.164.118:18081/usercenter/#/user_center/user?type=2";
    //   window.open('http://58.213.164.118:18081/usercenter/#/user_center/user?type=2')
    // },
    monitorRoomClick(){
       this.$router.push({
         path:'/monitorCabin'
       })
    },
    
    consoleClick(){ 
      this.$router.push({
         path:'/consoleDesk'
       })
    },

    // 已读未读
    getReadState() {
      console.log("已读未读刷新");
      this.$bus.$emit("c22", "");
      this.fetchNoticeData();
      this.fetchData();
    },
    mouseOver() {},
    mouseLeave() {},
    // 显示预警事件
    showWarning(e) {
      const that = this;
      const newValues = JSON.parse(e.newValue);
      if(!newValues.cameraid){
      if (e.key === "noticeNum") {
        this.warningData = [];
        // console.log('number',typeof e.newValue === "number");
        // console.log('string',typeof e.newValue === "string");
        console.log('预警事件',e);
        let newValues = JSON.parse(e.newValue);
        console.log('newValues',newValues);
        if (
          typeof JSON.parse(e.newValue) === "number" ||
          typeof JSON.parse(e.newValue) === "string"
        ) {
          that.noticeNum = e.newValue;
        } else {
          const newValue = JSON.parse(e.newValue);
          if(newValue.sum){
            that.noticeNum = newValue.sum;
          }
        }
        that.noticeNumArr.push({ value: that.noticeNum });
        if (that.noticeNumArr.length > 1) {
          that.noticeNumBefore =
            that.noticeNumArr[that.noticeNumArr.length - 2].value;
        }
        that.showNoticeModal && that.fetchData();
        if (
          that.isLogin &&
          that.noticeShow &&
          that.noticeNumArr.length > 1 &&
          that.noticeNumBefore < that.noticeNum
        ) {
           this.$refs.voice.getVoices()
          that.Sencond = 3;
          that.messageShow = that.$message.warning({
            dangerouslyUseHTMLString: true,
            message: "有待处理事件!  " + that.Sencond + "s结束",
            duration: that.Sencond + "000",
          });
          that.noticeShow = false;
          that.countTime();
        } else if (
          that.isLogin &&
          that.noticeShow &&
          that.noticeNumArr.length <= 1
        ) {
          this.$refs.voice.getVoices()
          that.Sencond = 3;
          that.messageShow = that.$message.warning({
            dangerouslyUseHTMLString: true,
            message: "有待处理事件!  " + that.Sencond + "s结束",
            duration: that.Sencond + "000",
          });
          that.noticeShow = false;
          that.countTime();
        }
      }
    }
    },
    goThreeD() {
      this.$router.replace({ path: "/index" });
      this.$store.state.horizonShow = false;
    },
    handleMyEvent() {
      this.loading = true;
    },
    countTime() {
      let that = this;
      const interl = setInterval(() => {
        that.Sencond--;
        if (that.Sencond === 0) {
          that.noticeShow = true;
          window.clearInterval(interl);
        } else {
          that.messageShow.message = "有待处理事件!  " + that.Sencond + "s结束";
          this.$bus.$emit("c22", "");
          this.$bus.$emit("cll", "");
        }
      }, 1000);
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    // 注销 - 返回登录页面
    loginOut() {
      this.$store.state.isLogin = false
      this.toPath("/");
      this.isLogin = false;
      websocketclose();
      localStorage.getItem("token") && localStorage.removeItem("token");
    },
    // 跳转到首页
    toIndex() {
      this.toPath("/index");
    },
    // 返回设备管理首页
    handleToBack() {
      this.$bus.$emit("showDeviceDefault", true);
      this.subTitle = "";
      this.$bus.$emit("resetSelection", true);
      this.$bus.$emit("monitoringRoom", "");
    },
    // 处理消息通知
    handleNotice() {
      this.showNoticeModal = true;
      this.noticeClass = "haveReadNotice";
      // this.currentPage = 1;
      // this.warningData = localStorage.getItem("warningData")? JSON.parse(localStorage.getItem("warningData")): []
      this.fetchData();
    },
    // 查看/处理消息通知
    handlechangeScene(row) {
      this.haveShowNotice = true;
      this.formData = row;
      this.visible = true;
      let arr = [];
      if (this.formData.scene && this.formData.scene.length > 0) {
        this.formData.scene.map((item) => {
          arr.push(item.name);
        });
        this.name = arr.join(",");
      } else {
        this.name = "--";
      }
    },
    // 关闭查看/处理详情页面
    handleClose() {
      this.visible = false;
      let totalPage = Math.ceil((this.total - 1) / this.pageSize);
      let currentPage =
        this.currentPage > totalPage ? totalPage : this.currentPage;
      this.currentPage = currentPage < 1 ? 1 : currentPage;
      this.fetchData();
    },
    fetchNoticeData() {
      // console.log('fetchNoticeData')
      const that = this;
      if (localStorage.getItem("token")) {
        api
          .getNoticemNum()
          .then((res) => {
            that.noticeNumBefore = res.result;
            that.noticeNumArr.push({
              value: that.noticeNumBefore,
            });
            that.noticeNum = res.result;
            that.noticeNumArr.push({
              value: that.noticeNum,
            });
          })
          .catch((res) => {});
      }
    },
    fetchData() {
      this.warningData.length === 0 && (this.loading = true);
      const params = {
        state: "待处理",
        limit: this.pageSize,
        current: this.currentPage,
      };
      if (localStorage.getItem("token")) {
        api
          .alarmlistBacklog(params)
          .then((res) => {
            this.loading = false;
            this.warningData = res.result && res.result.list;
            this.total = res.result && res.result.total;
            // this.total = this.noticeNum
          })
          .catch((res) => {
            this.loading = false;
            this.warningData = [];
          });
      }
    },
    // 关闭消息通知
    handleCloseModal() {
      this.fetchData();
      this.showNoticeModal = false;
    },
  },
  destroyed() {
    // 销毁监听
    // this.websock.onclose = this.close
  },
};
</script>

<style lang="scss" scoped>
.circle {
  display: inline-block;
  border-radius: 50%;
  height: 18px;
  width: 18px;
  margin: 0;
  margin-right: 5px;
}
.a-header {
  @keyframes externalHalo {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  // 定义内部头像旋转动画
  @keyframes internalAvatar {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-90deg);
    }
    50% {
      transform: rotate(-180deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
  .an {
    width: 25px;
    height: 25px;
  }
  .point {
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }
  .points {
    display: flex;
    align-items: center;
  }
  .pic {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border-top: 1px solid #347fff;
    animation: externalHalo 2s linear;
    // 动画无限循环
    animation-iteration-count: infinite;
  }
  .pic-jiantou {
    line-height: 30px;
    text-align: center;
    animation: internalAvatar 2s linear;
    // 动画无限循环
    animation-iteration-count: infinite;
  }
  .icon-word {
    font-size: 12px;
  }
  .monitorRoom{
    font-size: 16px;
    color:#0A1933;
    margin-right: 20px;
    cursor: pointer;
  }
  .monitorRoomImg{
    width:20px;
    margin-top:-3px;
  }
  .monitorRoomSpan{
    margin-left:5px;
  }
  .lookButton {
    border-radius: 4px;
    border: 1px solid rgba(10, 25, 51, 0.4);
    color: rgba(10, 25, 51, 0.4);
    padding: 8px 12px;
    font-size: 16px;
    margin-right: 20px;
    cursor: pointer;
  }
  .inlineTableContent {
    position: absolute;
    top: 68px;
    right: 140px;
    box-shadow: 0px 9px 28px 8px rgba(6, 16, 48, 0.05),
      0px 6px 16px 0px rgba(6, 16, 48, 0.08),
      0px 0px 7px -3px rgba(10, 25, 51, 0.2);
    background: #fff;
    padding-bottom: 15px;
    .el-table {
      border-radius: 8px 8px 0px 0px;
    }
    .form_pg {
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
  .newNotice,
  .haveReadNotice,
  .havenoNotice {
    color: #ffa55d;
    font-size: 24px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    .iconfont {
      font-size: 24px;
      margin-right: 4px;
    }
  }
  .haveReadNotice {
    color: #347fff;
  }
  .havenoNotice {
    color: #b5c4dc;
  }
  .subtitle {
    display: inline-flex;
    margin-left: 15px;
    .iconfont {
      margin-right: 15px;
      font-size: 24px;
      color: rgba(10, 25, 51, 0.5);
    }
    p {
      font-weight: 400;
      color: #0a1933;
      font-size: 24px;
    }
  }
  position: fixed;
  background: #fff;
  width: 100%;
  top: 0;
  justify-content: space-between;
  z-index: 2000;
  height: 64px;
  // padding: 0 74px 0 22px;
  // background: #347FFF;
  // logo
  .a-header-logo {
    width: 126px;
  }

  // 导航标题
  .a-header-title {
    width: 310px;
    height: 64px;
    line-height: 64px !important;
    font: 18px/1 bold;
    color: #fff;
    background: #347fff;
    display: flex;
    align-items: center;
    .logoImg {
      width: 120px;
      margin: 0 auto;
    }
    // span {
    //   margin-left: 20px;
    // }
  }
  .flex-all {
    justify-content: space-between;
  }
  // 登录注册
  .a-header-lr {
    background: #fff;
    padding-right: 26px;
    width: 100%;
    font-size: 19px;
    height: 64px;
    line-height: 1;
    color: #0a1933;
    box-shadow: 0px 9px 28px 8px rgba(6, 16, 48, 0.05),
      0px 6px 16px 0px rgba(6, 16, 48, 0.08),
      0px 0px 7px -3px rgba(10, 25, 51, 0.2);
    .user {
      font-size: 16px;
      margin-left: 8px;
      .username {
        color: #0a1933;
      }
    }
    .avatar-container {
      display: inline-flex;
      align-items: center;
    }
    .imgAvatar {
      width: 30px;
      height: 30px;
    }
    // .a-header-login {
    // 	&:hover {
    // 		.login-icon {
    // 			background: url('~@/assets/img/uHeader/icon_dlhover.png') no-repeat;
    // 			background-size: cover;
    // 		}
    // 		.control-icon {
    // 			background: url('~@/assets/img/uHeader/icon_kzt_hover.png') no-repeat;
    // 			background-size: cover;
    // 		}
    // 	}
    // }
    .loginOutForm {
      margin-left: 15px;
    }
  }
}
.a-header-div {
  height: 64px;
}
@media screen and (max-width: 1680px) {
  .a-header-div {
    height: 76px !important;
  }
}
@media screen and (max-width: 1680px) {
  /deep/.a-header-title {
    height: 76px !important;
    line-height: 76px !important;
  }
  /deep/.a-header-lr {
    height: 76px !important;
  }
}
</style>

