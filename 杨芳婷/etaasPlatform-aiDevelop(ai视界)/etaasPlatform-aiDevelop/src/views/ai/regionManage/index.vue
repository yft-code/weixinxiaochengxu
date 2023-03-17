<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <el-form
        ref="deviceList"
        :model="deviceList"
       size="small"
        label-width="110px"
       :rules="rules"
      >
       <el-row
        :gutter="10"
      >
        <!-- 搜索框组件 -->
        <template>
          <el-col
           :sm="24"
            :md="8"
            :lg="6"
            :xl="6"
          >
       <el-form-item label="园区/厂区名称" prop="parkName">
          <el-select
            :popper-append-to-body="false"
            v-model="deviceList.parkName"
            @change="handleChange1"
            placeholder="请选择"
          >
            <el-option
              v-for="item in parkNameList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
          </el-col>
           <el-col
            :sm="24"
            :md="8"
            :lg="6"
            :xl="6"
          >
            <el-form-item label="建筑名称" prop="buildingName">
          <el-select
            :popper-append-to-body="false"
            v-model="deviceList.buildingName"
            @change="handleChange"
            placeholder="请选择"
          >
            <el-option
              v-for="item in buildingNameList"
              :key="item.id"
              :label="item.buildingName"
              :value="item.buildingName"
            />
          </el-select>
        </el-form-item>
          </el-col>
           <el-col
            :sm="24"
            :md="8"
            :lg="6"
            :xl="6"
          >
         <el-form-item label="楼层" prop="floor">
          <el-select
            @change="floorChange"
            :popper-append-to-body="false"
            v-model="floor"
            placeholder="请选择"
          >
            <el-option
              v-for="item in floorList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        </el-col>
          <el-col  
            :sm="24"
            :md="8"
            :lg="6"
            :xl="6">
             <el-form-item label="区域名称" prop="areaName">
          <el-input
            v-model="deviceList.areaName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
          </el-col>
        </template>
      </el-row>
      </el-form>
      <div class="form_bottom">
        <el-button type="primary" size="small" @click="handleCheck"
          >搜索</el-button
        >
        <el-button size="small" @click="handleReset">清空</el-button>
      </div>
      <div class="form_br"></div>
      <div class="form_bottom1">
        <div></div>
        <div>
          <el-button @click.native="handleImport" size="small"
            >导入文件</el-button
          >
          <el-button
            type="primary"
            @click="handleAdd('创建区域标签')"
            size="small"
            >创建</el-button
          >
        </div>
      </div>
      <div class="deviceTable" v-loading="loading">
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            fixed
            label="编号"
            type="index"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            fixed
            show-overflow-tooltip
            prop="parName"
            label="园区/厂区名称"
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
          <el-table-column show-overflow-tooltip prop="name" label="区域名称">
            <template slot-scope="scope">
              {{ scope.row.name ? scope.row.name : "--" }}
            </template>
          </el-table-column>

          <!-- <el-table-column
            show-overflow-tooltip
            prop="componentPointId"
            label="是否关联"
          >
            <template slot-scope="scope">
              {{ scope.row.componentPointId ? "是" : "否" }}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="comment" label="备注">
            <template slot-scope="scope">
              {{ scope.row.comment ? scope.row.comment : "--" }}
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleEdit(scope.row, '编辑区域标签')"
                class="historyFile1"
                >编辑</el-button
              >
              <el-button
                type="text"
                @click="handleDelete(scope.row)"
                class="historyFile1"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="form_Devicepg">
        <el-pagination
          style="float: right"
          background
          align="center"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total,sizes,prev, pager, next, jumper"
          :total="total"
          @size-change="handleDeviceSizeChange"
          @current-change="handleDeviceCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <importFile :visible="showImport" @close-callback="closeCallback" />
    <addRegion
      :disable-flag="disableFlag"
      :visible="showAdd"
      :type="type"
      :row="row"
      :title="title"
      @close-callback1="closeCallback1"
    />
  </div>
</template>
<script>
import importFile from "./importFile";
import addRegion from "./addRegion";

import {
  getBuildingParkList,
  getBuildingBuildingList,
  getBuildingFloorList,
} from "../../../api/ai/constructionManagement";

import { getAreaPageList, areaDelete } from "../../../api/ai/region";

export default {
  components: { importFile, addRegion },
  data() {
    return {
      disableFlag: false,
      tableData: [],
      rules:{
        areaName:[
          {
             max:36, message: "区域名称不能超过36个字符", trigger: "blur"
          }
        ]
      },
      loading: false,
      // 新增/编辑
      showAdd: false,
      // 批量导入
      showImport: false,

      // 建筑列表
      buildingNameList: [],
      // 园区/厂区列表
      parkNameList: [],
      // 楼层列表
      floorList: [],

      type: "",
      title: "",
      // 搜索按钮数据接受
      deviceList: {
        parkName: "",
        buildingName: "",
        floor: "",
        areaName: "",
      },
      floor: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      row: {},
      buildingCheck: "",
      multipleSelection: [],
    };
  },
  created() {
    this.getParkNameList();
    this.getRegionManageList(this.deviceList);
  },
  mounted() {},
  methods: {
    // 切换楼层
    floorChange(val) {
      if (val === "全部") {
        this.deviceList.floor = "";
      } else {
        this.deviceList.floor = val;
      }
    },
    handleChange1() {
      this.deviceList.buildingName = "";
      if (this.deviceList.floor !== undefined) {
        this.deviceList.floor = "";
      }
      this.floorList = [];
      this.floor = "";
      this.getBuildingNameList();
    },
    getBuildingNameList() {
      let params = {
        parkName: this.deviceList.parkName,
      };
      getBuildingBuildingList(params).then((res) => {
        this.buildingNameList = res.result;
      });
    },
    handleChange(val) {
      if (val === "全部") {
        this.floorList = [];
        this.deviceList.floor = "";
        this.floor = "";
      } else {
        let id = "";
        this.floor = "";
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
    // 楼层列表
    getFloorList(id) {
      const params = {
        id: id,
      };
      getBuildingFloorList(params).then((res) => {
        const floorList = [];
        floorList.push("全部");
        this.floorList = res.result.map((val) => {
          floorList.push(val);
        });
        this.floorList = floorList;
      });
    },

    getParkNameList() {
      getBuildingParkList().then((res) => {
        this.parkNameList = res.result;
      });
    },
    // 搜索
    handleCheck() {
      this.$refs['deviceList'].validate((valid) => {
       if(valid){
          this.currentPage = 1;
          this.pageSize = 10;
          this.getRegionManageList(this.deviceList);
       } 
      })
     
    },
    // 区域列表
    getRegionManageList(params) {
      this.loading = true;
      const current = this.currentPage;
      const limit = this.pageSize;
      params.limit = limit;
      params.current = current;
      getAreaPageList(params).then((res) => {
        this.loading = false;
        this.total = res.result.total;
        this.tableData = res.result.list;
      });
    },
    // 清空
    handleReset() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.deviceList = {
        parkName: "",
        buildingName: "",
        floor: "",
        areaName: "",
      };
      this.floor = "";
      this.floorList = [];
      this.buildingNameList = [];
      this.getRegionManageList(this.deviceList);
    },
    // 编辑
    handleEdit(row, val) {
      this.disableFlag = true;
      this.row = JSON.parse(JSON.stringify(row));
      // this.row = row
      this.type = "edit";
      this.title = val;
      this.showAdd = true;
    },

    handleDeviceSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getRegionManageList(this.deviceList);
    },
    handleDeviceCurrentChange(val) {
      this.currentPage = val;
      this.getRegionManageList(this.deviceList);
    },
    // 删除
    handleDelete(row) {
      this.$confirm("会删除相关区域和设备!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = { id: row.id };
          areaDelete(params).then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getRegionManageList(this.deviceList);
            this.getParkNameList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.resetSelection = false;
    },
    // 新增
    handleAdd(val) {
      this.disableFlag = false;
      this.title = val;
      this.type = "add";
      this.showAdd = true;
    },
    // 批量导入
    handleImport() {
      this.showImport = true;
    },
    // 取消
    closeCallback(data) {
      if (data === "open") {
        this.getParkNameList();
        this.currentPage = 1;
        this.pageSize = 10;
        this.getRegionManageList(this.deviceList);
      } else {
        this.showImport = false;
        // this.$message({
        //   message: "取消成功",
        //   type: "success",
        // });
      }
    },
    closeCallback1(tag) {
      if (tag === "yes") {
        this.getParkNameList();
        this.currentPage = 1;
        this.pageSize = 10;
        this.getRegionManageList(this.deviceList);
        this.showAdd = false;
      } else {
        this.showAdd = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-select-dropdown {
  z-index: 10 !important;
}
::v-deep .el-message-box__message p {
  width: 200px !important;
}
.el-message-box {
  .el-message-box__header {
    font-size: 24px;
    font-weight: 500;
    color: #0a1933;
    line-height: 36px;
  }
  .el-message-box__message {
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    color: #0a1933;
    line-height: 36px;
  }
  .el-message-box__content {
    padding: 30px 15px;
  }
}
.el-message-box__message p {
  font-size: 16px;
}
</style>
<style lang="scss" scoped>
.deviceContainer {
  .buttonDisable {
    color: #aaa;
  }
  .deviceContent {
    /deep/ .el-table__fixed::before {
      width: 0;
    }
    /deep/.el-select{
      width: 100%;
    }
    width: 97%;
    margin: 24px;
    padding: 24px 40px;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    background:#fff;
    .form_bottom {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 24px;
    }
    .form_br {
      width: 100%;
      height: 1px;
      background-color: #f3f3f5;
    }
    .form_bottom1 {
      margin-top: 24px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
    }
    .deviceTable {
      .historyFile {
        font-size: 14px;
      }
      .historyFile1 {
        font-size: 14px;
        margin-left: 8px;
      }
      width: 100%;
    }
    .form_Devicepg {
      height: 40px;
      margin-top: 24px;
      margin-right: 0;
    }
  }
}
</style>
