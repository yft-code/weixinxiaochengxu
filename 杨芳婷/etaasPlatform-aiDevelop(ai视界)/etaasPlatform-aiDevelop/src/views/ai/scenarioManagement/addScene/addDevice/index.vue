<template>
  <div class="DeviceAddContainer">
    <el-dialog
      title="添加设备"
      :visible.sync="visible"
      width="1000px"
      :close-on-click-modal="false"
      :before-close="Close"
    >
      <div class="form_br"></div>
      <el-form
        :inline="true"
        :model="deviceList"
        class="demo-form-inline"
        size="mini"
      >
        <!-- <div style="display: flex;justify-content: space-between"> -->
        <div>
          <el-form-item label="园区/厂区名称">
            <el-select
              v-model="deviceList.parkName"
              placeholder="请选择"
              @change="parkChange"
            >
              <el-option
                v-for="item in parkNameList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="elDevice" label="建筑名称">
            <el-select
              v-model="deviceList.buildingName"
              placeholder="请选择"
              @change="buildingChange"
            >
              <el-option
                v-for="item in buildingNameList"
                :key="item.id"
                :label="item.buildingName"
                :value="item.buildingName"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="elDevice" label="楼层" style="margin-right: 0">
            <el-select v-model="deviceList.floor" placeholder="请选择">
              <el-option
                v-for="item in floorList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <!-- </div> -->
        </div>
        <div style="display: flex; justify-content: space-between">
          <div>
            <el-form-item label="区域名称">
              <el-input
                class="inputRegion"
                v-model="deviceList.areaName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备名称" class="elDevice">
              <el-input
                v-model="deviceList.deviceName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item style="margin-right: 0">
            <el-button size="mini" type="primary" @click="handleCheck"
              >搜索</el-button
            >
            <el-button size="mini" @click="handleReset">清空</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-table
        max-height="307"
        v-loading="loading"
        ref="multipleTableDeviceInner"
        :data="tableData"
        style="width: 100%"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ 'font-size': '16PX' }"
        :cell-style="{ 'font-size': '15PX' }"
      >
        <el-table-column align="center" type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="编号" width="60">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="parkName"
          label="园区/厂区名称"
          width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.parkName ? scope.row.parkName : "--" }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="buildingName"
          label="建筑名称"
        >
          <template slot-scope="scope">
            {{ scope.row.buildingName ? scope.row.buildingName : "--" }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="floor" label="楼层">
          <template slot-scope="scope">
            {{ scope.row.floor ? scope.row.floor : "--" }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="areaName" label="区域名称">
          <template slot-scope="scope">
            {{ scope.row.areaName ? scope.row.areaName : "--" }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="deviceName"
          label="设备名称"
        >
          <template slot-scope="scope">
            {{ scope.row.deviceName ? scope.row.deviceName : "--" }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="state" label="运行状态">
          <template slot-scope="scope">
            {{ scope.row.state ? scope.row.state : "--" }}
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="Close">返 回</el-button>
        <el-button size="mini" type="primary" @click="handleCloseAdd"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  buildnameList,
  floorList,
  pageList,
  parknameList,
} from "../../../../../api/ai/deviceManage";
import {
  getParknameList,
  getBuildnameList,
  getFloorList,
} from "@/api/ai/deviceManage";

export default {
  name: "index",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    editDevice: {},
    tableDataFlag: {},
    removeIndex: {
      type: String,
      default: "",
    },
  },
  watch: {
    // editDevice:{
    //   handler(val){
    //     let that = this;
    //     that.multipleSelection = val
    //   },
    //   deep:true
    // },
    removeIndex(n, o) {
      this.tableData.map((item) => {
        if (item.id === n) {
          this.$refs.multipleTableDeviceInner &&
            this.$refs.multipleTableDeviceInner.toggleRowSelection(item, false);
        }
      });
    },
    visible(n, o) {
      // if(this.type==='add'){
      //   this.buildingNameList = []
      //   this.floorList = []
      // }else{
      //    this.buildingNameList = []
      //    this.floorList = []
      // }
      if (n) {
        this.multipleSelection = this.tableDataFlag;
        this.aa = this.tableDataFlag;
        this.tableData.map((i) => {
          this.multipleSelection.map((j) => {
            if (i.id === j.id) {
              this.$nextTick(() => {
                this.$refs.multipleTableDeviceInner &&
                  this.$refs.multipleTableDeviceInner.toggleRowSelection(
                    i,
                    true
                  );
              });
            }
          });
        });
      } else if (o) {
        this.handleReset();
      }
    },
  },
  data() {
    return {
      // bb:[],
      aa: [],
      loading: false,
      parkNameList: [],
      buildingNameList: [],
      floorList: [],
      deviceList: {
        parkName: "",
        buildingName: "",
        floor: "",
        areaName: "",
        deviceName: "",
      },
      currentPage: 1,
      pageSize: 999,
      tableData: [],
      multipleSelection: [],
      deviceIds: [],
    };
  },
  created() {
    this.getParkNameList();
    this.getDeviceList(this.deviceList);
  },
  methods: {
    parkChange() {
      this.deviceList.buildingName = "";
      this.deviceList.buildingName = "";
      if (this.deviceList.floor !== undefined) {
        this.deviceList.floor = "";
      }
      this.floorList = [];
      this.getBuildingNameList();
    },
    buildingChange(val) {
      if(val==='全部'){
        this.deviceList.floor = ''
        this.floorList = []
      }else{
         let id = "";
      this.buildingNameList.map((element) => {
        if (val === element.buildingName) {
          id = element.id;
        }
      });
      if (this.deviceList.floor !== undefined) {
        this.deviceList.floor = "";
      }
      this.getFloorList(id);
      }
    },
    Close() {
      this.buildingNameList = []
      this.floorList = []
      this.$message({
        message: "取消成功!",
        type: "success",
      });
      this.multipleSelection = this.aa;
      this.handleClose();
    },
    handleCloseAdd() {
      this.$message({
        message: "添加成功!",
        type: "success",
      });
      this.handleClose();
    },
    handleCheck() {
      this.currentPage = 1;
      this.pageSize = 999;
      this.getDeviceList(this.deviceList);
    },

    handleReset() {
      this.currentPage = 1;
      this.pageSize = 999;
      this.deviceList = {
        parkName: "",
        buildingName: "",
        floor: "",
        areaName: "",
        deviceName: "",
      };
      this.getDeviceList(this.deviceList);
      this.buildingNameList = []
      this.floorList = []
    },
    // 设备列表
    getDeviceList(params) {
      this.loading = true;
      const current = this.currentPage;
      const limit = this.pageSize;
      params.limit = limit;
      params.current = current;
      pageList(params).then((res) => {
        this.loading = false;
        // this.total = res.result.total;
        this.tableData = res.result.list;
      });
    },
    getFloorList(id) {
      let params = {
        id: id,
      };
      getFloorList(params).then((res) => {
        this.floorList = res.result;
      });
    },
    getBuildingNameList() {
      let params = {
        parkName: this.deviceList.parkName,
      };
      getBuildnameList(params).then((res) => {
        this.buildingNameList = res.result;
        //  if(this.buildingNameList&&this.buildingNameList.length>0){
        //   if(this.buildingNameList[0].buildingName==='全部'){
        //   this.buildingNameList.shift()
        // }
        // }
      });
    },
    getParkNameList() {
      getParknameList().then((res) => {
        this.parkNameList = res.result;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClose() {
      this.$emit("close-callback1", this.multipleSelection);
    },
  },
};
</script>

<style scoped lang="scss">
.inputRegion {
  margin-left: 31px;
  width: 217px;
}

.elDevice {
  margin-left: 42px;
}
.DeviceAddContainer {
  ::v-deep .el-form-item__label {
    font-size: 14px;
  }
  ::v-deep .el-input__inner {
    padding-right: 52px;
  }
  .form_br {
    width: 100%;
    height: 1px;
    background-color: #f3f3f5;
    margin-bottom: 20px;
  }
}
</style>
