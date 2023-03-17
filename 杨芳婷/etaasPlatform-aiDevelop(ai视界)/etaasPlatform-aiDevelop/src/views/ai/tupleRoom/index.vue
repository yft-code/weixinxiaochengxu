<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <div class="content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="元组间维护" name="first">
            <maintain></maintain>
          </el-tab-pane>
          <el-tab-pane label="元组间类型" name="second">
            <species></species>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { getAlgorithm } from "@/api/ai/algorithmManage";
import * as api from "@/api/ai/earlyWarning";
import { getUserInfo, getUserList } from "@/api/ai/warningEvent";
import maintain from "@/views/ai/tupleRoom/maintain";
import species from "@/views/ai/tupleRoom/species";
import {
  buildnameList,
  floorList,
  ipList,
  parknameList,
  serialnumberList,
  stateList,
} from "@/api/ai/deviceManage";
export default {
  components: { maintain, species },
  data() {
    return {
      activeName: "first",
      flag: false,
      num: 0,
      floor: "",
      areaName: "",
      deviceName: "",
      name: "",
      parkName: "",
      buildingName: "",
      id: "",
      loading: true,
      sceneList: [],
      //算法列表
      aloList: [],
      tableData: [],
      // tableData:[{state:'待处理',scene:{name:'yier'},device:{parkName:'公园',buildingName:'也一样',floor:'123',areaName:'dddd',deviceName:'1233434'}},{state:'已处理'}],
      // 序列号列表
      serialNumberList: [],
      // 状态列表
      statusList: [],
      // 建筑列表
      buildingNameList: [],
      // 园区/厂区列表
      parkNameList: [],
      // 楼层列表
      floorList: [],
      // 场景列表
      scene: [],
      // ip列表
      ipList: [],
      // 事件列表
      eventList: [],
      form: {
        alarmStartTime: "",
        alarmEndTime: "",
      },
      value1: "",
      row: {},
      title: "",
      visible: false,
      openFlag: true,
      showAdd: false,
      showEdit: false,
      showImport: false,
      dialogFormVisible: false,
      deviceList: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      ids: [],
      userData: [],
    };
  },
  created() {
    // this.getUser()
    // this.getParkNameList()
    // this.getSerialnumberList()
    // this.getBuildingNameList()
    // this.getFloorList()
    // this.getIpList()
    // this.getStatusList()
    // this.fetchData(this.form)
    // this.getList()
    // this.getSceneList()
  },
  //   mounted(){
  //     this.$bus.$emit('monitoringRoom', '')
  //     this.$bus.$on("showDeviceDefault",(flag)=>{
  //       this.openFlag  = flag
  //     })
  //   },
  methods: {
    handleClick(tab, event) {},
    count(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    //批量处理
    handleMulti() {
      const id = [];
      this.eventList &&
        this.eventList.map((item) => {
          id.push(item.id);
        });
      this.ids = id;
      const ids = this.ids.join(",");
      const formData = new FormData();
      formData.set("ids", ids);
      api
        .handleAll(formData)
        .then(() => {
          this.$message({
            message: "批量处理成功",
            species: "success",
          });
          this.fetchData(this.form);
          this.fetchNoticeData();
        })
        .catch();
    },
    fetchNoticeData() {
      const that = this;
      if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('token'))['aiHorizon']) {
        api
          .getNoticemNum()
          .then((res) => {
            this.$bus.$emit("number", res.result);
          })
          .catch((res) => {});
      }
    },
    // 时间处理
    change(e) {
      if (e) {
        this.form.alarmStartTime = e[0];
        this.form.alarmEndTime = e[1];
      } else {
        this.form.alarmStartTime = "";
        this.form.alarmEndTime = "";
      }
    },
    // 获取算法列表
    getList() {
      const params = {
        pageNum: 1,
        pageSize: 999,
      };
      getAlgorithm(params)
        .then((res) => {
          const arr = [];
          res.result.list &&
            res.result.list.map((item) => {
              arr.push(item.name);
            });
          this.aloList = arr;
        })
        .catch();
    },
    getStatusList() {
      stateList().then((res) => {
        this.statusList = res.result;
      });
    },
    // 获取人员
    getUser() {
      let params = {
        departId: "",
      };
      getUserList(params)
        .then((res) => {
          if (res.code === 0) {
            this.userData = res.result;
          }
        })
        .catch();
    },
    // 获取场景列表
    getSceneList() {
      api.sceneList().then((res) => {
        this.scene = res.result;
      });
    },
    getIpList() {
      ipList().then((res) => {
        this.ipList = res.result;
      });
    },
    getFloorList() {
      floorList().then((res) => {
        this.floorList = res.result;
      });
    },
    getBuildingNameList() {
      buildnameList().then((res) => {
        this.buildingNameList = res.result;
      });
    },
    getParkNameList() {
      parknameList().then((res) => {
        this.parkNameList = res.result;
      });
    },
    getSerialnumberList() {
      serialnumberList().then((res) => {
        this.serialNumberList = res.result;
      });
    },

    fetchData(params) {
      this.loading = true;
      const id = this.$route.query.deviceId;
      const current = this.currentPage;
      const limit = this.pageSize;
      params.limit = limit;
      params.deviceId = id;
      params.current = current;

      api.alarmlistBacklog(params).then((res) => {
        this.tableData = res.result.list;
        this.tableData &&
          this.tableData.map((item) => {
            // 场景
            let arr = [];
            item.scene &&
              item.scene.map((j) => {
                arr.push(j.name);
                item.scene = arr.join(",");
              });
          });
        this.total = res.result.total;
        this.loading = false;
      });
    },
    fetchData1(params) {
      const id = this.$route.query.deviceId;
      const current = this.currentPage;
      const limit = this.pageSize;
      params.limit = limit;
      params.deviceId = id;
      params.current = current;
      api.alarmlistBacklog(params).then((res) => {
        this.tableData = res.result.list;
        this.total = res.result.total;
      });
    },
    handleClose() {
      this.visible = false;
      // this.fetchData1(this.form)
      // this.fetchData(this.form)
      this.$forceUpdate();
    },
    handleClose1() {
      this.visible = false;
      // this.fetchData1(this.form)
      this.fetchData(this.form);
      this.$forceUpdate();
    },
    checkEdit(val, row) {
      this.num++;
      this.id = val;
      this.title = "事件编号" + ":" + val;
      this.row = JSON.parse(JSON.stringify(row));
      this.name = this.row.scene;
      this.parkName = this.row.device.parkName;
      this.buildingName = this.row.device.buildingName;
      (this.floor = this.row.device.floor),
        (this.areaName = this.row.device.areaName),
        (this.deviceName = this.row.device.deviceName);
      this.device = JSON.parse(JSON.stringify(row.device));
      this.visible = true;
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.fetchData(this.form);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData(this.form);
    },
    handleSelectionChange(val) {
      this.eventList = val;
    },
    handleReset() {
      this.form = {};
      this.form.alarmStartTime = "";
      this.form.alarmEndTime = "";
      this.value1 = "";
      this.currentPage = 1;
      this.fetchData(this.form);
    },
    handleCheck() {
      this.currentPage = 1;
      this.fetchData(this.form);
    },
    handleAdd() {
      this.showAdd = true;
    },
    handleImport() {
      this.showImport = true;
    },
    closeCallback() {
      this.showImport = false;
      this.$message({
        message: "取消成功",
        species: "success",
      });
    },
    closeCallback1() {
      this.showEdit = false;
      this.$message({
        message: "编辑成功",
        species: "success",
      });
    },
    closeCallback2() {
      this.showAdd = false;
      this.$message({
        message: "添加成功",
        species: "success",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.deviceContainer {
  width: 100%;
  .deviceContent {
    width: 97%;
    margin: 24px auto;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    background:#fff;
    .content {
      width: 95%;
      margin: 0 auto;
      padding-top: 24px;
    }
    /deep/ .el-button--primary.is-disabled,
    .el-button--primary.is-disabled:active,
    .el-button--primary.is-disabled:focus,
    .el-button--primary.is-disabled:hover {
      color: #fff;
      background-color: darkblue;
      background-color: rgb(153, 191, 255);
      cursor: not-allowed;
      border-color: #a0cfff;
    }
    .form {
      display: flex;
      flex-wrap: wrap;
      ::v-deep .el-range-separator {
        color: rgba(33, 72, 141, 0.2);
      }
      .aa {
        width: 138px;
        display: inline-block;
        font-size: 16PX;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      }
      .bb {
        margin-left: 40px;
        width: 88px;
        display: inline-block;
        font-size: 16PX;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      }
      .btn-group {
        margin-left: 70px;
        display: inline-block;
        font-size: 18px;
      }
      ::v-deep .el-input__inner {
        // font-size: 14px;
      }
      /deep/.el-date-editor .el-range-separator {
        color: #979797 !important;
        width: 8%;
        font-size: 12px;
      }
      /deep/ .el-date-editor .el-range__icon {
        position: absolute;
        right: 5px;
        top: 1px;
        color: #c0c4cc;
      }
      /deep/.el-date-editor--daterange.el-input__inner {
        width: 338px;
      }
      /deep/.el-range-editor--small .el-range-input {
        font-size: 12px;
      }
      /deep/.el-icon-time:before {
        content: "\e78e";
      }

      ::v-deep .el-pagination {
        padding: 2px 0;
      }

      ::v-deep .el-form-item {
        margin-bottom: 10px;
        margin-right: 0;
      }
      .formInput {
        width: 242px;
      }
      .el-form-item__label {
        padding: 0;
      }
      //      /deep/ .el-form-item__label {
      //     text-align: right;
      //     vertical-align: middle;
      //     float: left;
      //     font-size: 14px;
      //     color: #606266;
      //     line-height: 40px;
      //     padding: 0 12px 0 0;
      //     -webkit-box-sizing: border-box;
      //     box-sizing: border-box;
      // }
      // label {
      //     display: inline-block;
      //     max-width: 100%;
      //     margin-bottom: 5px;
      //     font-weight: 700;
      // }
    }
    .form_bottom {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 24px;
      //::v-deep .el-button{
      //  font-size: 18px;
      //}
    }
    .form_br {
      width: 100%;
      margin-top: 16px;
      height: 1px;
      background-color: #f3f3f5;
    }
    .form_bottom1 {
      margin-top: 24px;
      margin-bottom: 16px;
      display: flex;
      flex-direction: row-reverse;
      //::v-deep .el-button{
      //  font-size: 18px;
      //}
    }
    .deviceTable {
      /deep/ .el-table__fixed::before {
        width: 0;
      }
      width: 100%;
      ::v-deep.el-table__empty-text {
        position: fixed;
        line-height: 60px;
        left: 30%;
        color: #909399;
      }
    }
    .form_pg {
      height: 45px;
      margin-top: 24px;
      padding-bottom: 24px;
      margin-right: 0;
    }
  }
}
</style>
