<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <el-form
        ref="deviceList"
        :model="deviceList"
        :rules="deviceRules"
        size="small"
        label-width="110px"
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
            @change="handleChangeParkName"
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
          <!-- <el-form-item label="文件名称" prop="filename">
          <el-input
            v-model="deviceList.filename"
            placeholder="请输入"
          ></el-input>
        </el-form-item> -->
          </el-col>
                <el-col
            :sm="24"
            :md="24"
            :lg="6"
            :xl="6"
          >
     <el-form-item style="float:right;margin-right: 0px">
             <el-button type="primary" size="small" @click="handleCheck"
          >搜索</el-button
        >
        <el-button size="small" @click="handleReset">清空</el-button>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      </el-form>
      <div class="form_bottom1">
        <div></div>
        <div>
          <el-button type="primary" @click="handleAdd('创建')" size="small"
            >创建</el-button
          >
        </div>
      </div>
      <!-- 表格 -->
      <div class="deviceTable" v-loading="loading">
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          <!-- <el-table-column fixed align="center" type="selection" width="55"> -->
          <!-- </el-table-column> -->
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
          <el-table-column align="center" show-overflow-tooltip prop="floor" label="楼层范围">
            <template slot-scope="scope">
              {{
                scope.row.floorHigh && scope.row.floorLow
                  ? scope.row.floorLow + "~" + scope.row.floorHigh
                  : "--"
              }}
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="models" label="文件名称">
            <template slot-scope="scope">
              <div>
                <div v-if="scope.row.models.length > 0">
                  <ul>
                    <li
                      class="modelsStyle"
                      v-for="(item, index) in scope.row.models"
                      :key="index"
                    >
                      <el-button
                        type="text"
                        class="historyFile1"
                        @click="handleEditModel(scope.row, '编辑', item)"
                      >
                        {{
                          item.filename && item.filename ? item.filename : "--"
                        }}</el-button
                      >
                    </li>
                  </ul>
                </div>
                <div v-else>--</div>
              </div>
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <el-button
                type="text"
                class="historyFile1"
                @click="handleModel('添加模型', scope)"
                >添加模型</el-button
              > -->
              <el-button
                type="text"
                @click="handleEdit(scope.row, '编辑')"
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
      <!-- 分页 -->
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
    <!-- 添加区域 -->
    <addRegion
      :disable-flag="disableFlag"
      :visible="showAdd"
      :type="type"
      :row="row"
      :title="title"
      @close-callback1="closeCallback1"
    />
    <!-- 添加模型 -->
    <addModel
      :row1="row1"
      :constructionId="constructionId"
      :constructionFloorList="constructionFloorList"
      :disable-flag1="disableFlag1"
      :visible="showAddModel"
      :type1="type1"
      :title1="title1"
      @close-callback1="closeModelCallback1"
    />
  </div>
</template>
<script>
import addRegion from "./addConstruction";
import addModel from "./addModel";
import {
  getBuildingPageList,
  buildingDelete,
  getBuildingParkList,
  getBuildingBuildingList,
  getBuildingFloorList,
  getModelById,
} from "../../../api/ai/constructionManagement";

export default {
  components: { addRegion, addModel },
  data() {
    return {
      constructionId: "",
      deviceRules:{
          filename:[{
            max:50,message: "文件名称不可超过50个字符", trigger: "blur" 
          }]
      },
      constructionFloorList: [],
      disableFlag: false,
      disableFlag1: false,
      type1: "",
      title1: "",
      tableData: [],
      loading: false,
      // 新增/编辑
      showAdd: false,
      showAddModel: false,
      // 批量导入
      showImport: false,
      // 建筑列表
      buildingNameList: [],
      // 园区/厂区列表
      parkNameList: [],
      type: "",
      title: "",
      // 搜索按钮数据接受
      deviceList: {
        parkName: "",
        buildingName: "",
        filename: "",
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      row: {},
      row1: {},
      multipleSelection: [],
    };
  },
  created() {
    this.getParkNameList();
    // this.getBuildingNameList();
    this.getBuildingPageList(this.deviceList);
  },
  mounted() {},
  methods: {
    deWeight(arr) {
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].buildingName == arr[j].buildingName) {
            arr.splice(j, 1);
            //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
            j--;
          }
        }
      }
      return arr;
    },

    // 切换园区
    handleChangeParkName(e) {
      // this.buildingCheck = ''
      this.deviceList.buildingName = "";
      // this.deviceList.floor = ''
      const params = {
        parkName: e,
      };
      getBuildingBuildingList(params).then((res) => {
        this.buildingNameList = res.result;
      });
    },

    // 建筑列表
    getBuildingNameList() {
      getBuildingBuildingList().then((res) => {
        this.buildingNameList = res.result;
        // this.buildingNameList = this.deWeight(this.buildingNameList)
      });
    },

    // 园区列表
    getParkNameList() {
      getBuildingParkList().then((res) => {
        this.parkNameList = res.result;
      });
    },

    // 搜索
    handleCheck() {
        this.$refs['deviceList'].validate((valid) => {
          if (valid) {
            this.currentPage = 1;
            this.pageSize = 10;
            this.getBuildingPageList(this.deviceList);
          }
      })
      
    },

    getBuildingPageList(params) {
      this.loading = true;
      const current = this.currentPage;
      const limit = this.pageSize;
      params.limit = limit;
      params.current = current;
      getBuildingPageList(params).then((res) => {
        this.loading = false;
        this.total = res.result.total;
        this.tableData = res.result.list;
      });
    },

    // 清空
    handleReset() {
      this.buildingNameList = [];
      this.currentPage = 1;
      this.pageSize = 10;
      this.deviceList = {
        parkName: "",
        buildingName: "",
        filename: "",
      };
      this.getBuildingPageList(this.deviceList);
    },

    // 编辑
    handleEdit(row, val) {
      this.disableFlag = true;
      this.row = JSON.parse(JSON.stringify(row));
      this.type = "edit";
      this.title = val;
      this.showAdd = true;
    },

    //编辑模型
    handleEditModel(row, val, item) {
      this.constructionId = row.id;
      const params = {
        modelId: item.id,
      };

      getModelById(params).then((res) => {
        this.disableFlag1 = true;
        this.row1 = res.result;
        if (this.row1.isInternal === 0) {
          this.row1.floor = res.result.floor.split(",");
        }
        this.row1 = JSON.parse(JSON.stringify(this.row1));
        this.title1 = val;
        this.type1 = "edit";
        this.showAddModel = true;
        this.getBuildingFloorList();
      });
    },

    // 添加模型
    handleModel(val, scope) {
      this.constructionId = scope.row.id;
      this.disableFlag1 = false;
      this.title1 = val;
      this.type1 = "add";
      this.showAddModel = true;
      this.getBuildingFloorList();
    },

    getBuildingFloorList() {
      const params = {
        id: this.constructionId,
      };
      getBuildingFloorList(params).then((res) => {
        this.constructionFloorList = res.result;
      });
    },

    handleDeviceSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getBuildingPageList(this.deviceList);
    },

    handleDeviceCurrentChange(val) {
      this.currentPage = val;
      this.getBuildingPageList(this.deviceList);
    },

    // 删除
    handleDelete(row) {
      this.$confirm("会删除相关设备和点位！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          const params = { id: row.id };
          buildingDelete(params).then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.loading = false;
            this.getBuildingPageList(this.deviceList);
            this.getParkNameList();
            // this.getBuildingNameList();
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

    closeCallback(aa) {
      if (aa === "open") {
        this.getParkNameList();
        // this.getBuildingNameList();
        this.currentPage = 1;
        this.pageSize = 10;
        this.getBuildingPageList(this.deviceList);
      } else {
        this.showImport = false;
        this.$message({
          message: "取消成功",
          type: "success",
        });
      }
    },

    closeCallback1(tag) {
      if (tag === "yes") {
        this.getParkNameList();
        // this.getBuildingNameList();
        this.currentPage = 1;
        this.pageSize = 10;
        this.getBuildingPageList(this.deviceList);
        this.showAdd = false;
      } else {
        this.showAdd = false;
      }
    },

    closeModelCallback1(tag) {
      if (tag === "yes") {
        this.getParkNameList();
        // this.getBuildingNameList();
        this.currentPage = 1;
        this.pageSize = 10;
        this.getBuildingPageList(this.deviceList);
        this.showAddModel = false;
      } else {
        this.showAddModel = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-select-dropdown {
  z-index: 10 !important;
}
.modelsStyle {
  display: inline-block;
}
::v-deep .el-message-box__message p {
  width: 200px !important;
}

ul li {
  list-style: none;
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
    position: relative;
    background:#fff;
    /deep/ .el-table__fixed::before {
      width: 0;
    }
    /deep/.el-select{
      width:100% !important;
    }
    //width: 1572px;
    width: 97%;
    margin: 24px;
    padding: 24px 40px;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    .form_bottom {
      position: absolute;
      left: 1238px;
      top: 25px;
      // display:inline-block;
      // display: flex;
      // justify-content: flex-end;
      // margin-bottom: 24px;
      //::v-deep .el-button{
      //  font-size: 18px;
      //}
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
      //::v-deep .el-button{
      //  font-size: 18px;
      //}
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
      // width: 1492px;
    }
    .form_Devicepg {
      height: 40px;
      margin-top: 24px;
      margin-right: 0;
    }
  }
}
</style>
