<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="预警管理" name="first">
          <div class="content">
            <div class="deviceTop">
              <el-form
                :model="form"
                size="small"
                label-width="80px"
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
          <el-form-item label="预警类型">
                  <el-select
                    @change="changeType"
                    :popper-append-to-body="false"
                    v-model="warningType"
                    placeholder="请选择"
                  >
                    <el-option label="全部" value="全部"></el-option>
                    <el-option label="实时" value="实时"></el-option>
                    <el-option label="非实时" value="非实时"></el-option>
                  </el-select>
                </el-form-item>
          </el-col>
           <el-col
            :sm="24"
            :md="8"
            :lg="6"
            :xl="6"
          >
         <el-form-item label="预警等级">
                  <el-select
                    @change="changeLevel"
                    :popper-append-to-body="false"
                    v-model="level"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in WarningListLeve"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
          </el-col>
          <el-col 
            :sm="24"
            :md="8"
            :lg="12"
            :xl="12">
             <el-form-item style="float:right;margin-right:0px;">
         <el-button size="small" @click="handleCheck" type="primary"
                    >搜索</el-button
                  >
                  <el-button size="small" @click="handleReset">清空</el-button>
        </el-form-item>
          </el-col>
        </template>
      </el-row> 
    </el-form>
            </div>
            <div class="deviceTable">
              <div style="float: right; margin-right: 0px; margin-bottom: 16px">
                <el-button
                  size="small"
                  @click="handleAdd('创建预警')"
                  type="primary"
                  >创建</el-button
                >
              </div>
              <div class="id_style">
                <el-table
                  v-loading="loading"
                  :data="tableData"
                  :cell-style="cellstyle"
                  style="width: 100%"
                >
                  <el-table-column
                    label="编号"
                    :index="count"
                    type="index"
                    width="120"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    min-width="150"
                    label="预警名称"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    min-width="150"
                    label="预警类型"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="levelName"
                    min-width="150"
                    show-overflow-tooltip
                    label="预警等级"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="fileName"
                    min-width="200"
                    show-overflow-tooltip
                    label="事件预案"
                  >
                    <template slot-scope="scope">
                      <span
                        class="fileNameWarning"
                        @click="fileClick(scope.row)"
                        >{{
                          scope.row.fileName ? scope.row.fileName : "--"
                        }}</span
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="needConfirm"
                    show-overflow-tooltip
                    min-width="150"
                    label="是否人工二次确认"
                  >
                    <template slot-scope="scope">
                      <span>{{
                        scope.row.needConfirm === 1 ? "是" : "否"
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="notificationType"
                    show-overflow-tooltip
                    min-width="150"
                    label="预警通知方式"
                  >
                    <template slot-scope="scope">
                      <span>{{
                        scope.row.notificationType
                          ? scope.row.notificationType
                          : "无"
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="templateName"
                    width="150"
                    label="通知模板"
                  >
                    <template slot-scope="scope">
                      <span>{{
                        scope.row.templateName ? scope.row.templateName : "--"
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="mini"
                        @click="editForm(scope.row.id, scope.row, '编辑预警')"
                        >编辑</el-button
                      >
                      <el-button
                        type="text"
                        size="mini"
                        @click="handleDelete(scope.row.id)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!--分页器-->
            </div>
            <div class="alogrithm_page">
              <el-pagination
                style="float: right"
                background
                align="center"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20]"
                :page-size="pageSize"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="预警等级" name="second">
          <div class="content">
            <div class="deviceTable">
              <div style="float: right; margin-right: 0px; margin-bottom: 16px">
                <el-button
                  size="small"
                  @click="handleAddGrade('创建预警等级')"
                  type="primary"
                  >创建</el-button
                >
              </div>
              <div class="id_style">
                <el-table
                  v-loading="gradeLoading"
                  :data="gradeTableData"
                  :cell-style="cellstyle"
                  style="width: 100%"
                >
                  <el-table-column
                    label="编号"
                    :index="count"
                    type="index"
                    width="120"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="order"
                    label="权重"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="等级名称"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="color"
                    show-overflow-tooltip
                    label="预警色"
                  >
                    <template slot-scope="scope">
                      <span
                        class="circle"
                        :style="{ background: scope.row.color }"
                      ></span>
                      <span>{{
                        scope.row.color ? scope.row.color : "--"
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="comment"
                    show-overflow-tooltip
                    min-width="150"
                    label="预警等级说明"
                  >
                    <template slot-scope="scope">
                      <span>{{
                        scope.row.comment ? scope.row.comment : "--"
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="mini"
                        @click="
                          editGradeForm(scope.row.id, scope.row, '编辑预警等级')
                        "
                        >编辑</el-button
                      >
                      <el-button
                        type="text"
                        size="mini"
                        @click="handleGradeDelete(scope.row.id)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!--分页器-->
            </div>
            <div class="alogrithm_page">
              <el-pagination
                style="float: right"
                background
                align="center"
                :current-page="currentPageGrade"
                :page-sizes="[5, 10, 20]"
                :page-size="pageSizeGrade"
                layout="total,sizes, prev, pager, next, jumper"
                :total="totalGrade"
                @size-change="handleSizeChangeGrade"
                @current-change="handleCurrentChangeGrade"
              >
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <edit
      :visible="visible"
      :id="id"
      :row="row"
      :type="type"
      @close-callback="handleClose"
      :editbutton="editbutton"
      :primary="primary"
      @close-callback1="handleClose1"
      :title="title"
      :control="control"
    ></edit>
    <edit1
      :visible="visibleGrade"
      :id="idGrade"
      :row="rowGrade"
      :type="typeGrade"
      @close-callback="handleCloseGrade"
      :editbutton="editbuttonGrade"
      :primary="primaryGrade"
      @close-callback1="handleCloseGrade1"
      :title="titleGrade"
      :control="controlGrade"
    ></edit1>
  </div>
</template>
<script>
import * as api from "@/api/ai/warningManage";
import {
  getWarningListLeve,
  getLevelPageList,
  levelDelete,
} from "@/api/ai/warningManage";
import edit from "./edit";
import edit1 from "./edit1";
const Base64 = require("js-base64").Base64;
export default {
  components: {
    edit,
    edit1,
  },
  data() {
    return {
      WarningListLeve: [],
      LevelList: [],
      activeName: "first",
      gradeLoading: false,
      gradeTableData: [],
      formGrade: {},
      visibleGrade: false,
      warningType: "",
      type: "",
      typeGrade: "",
      level: "",
      primary: "primary",
      primaryGrade: "primaryGrade",
      editbutton: false,
      editbuttonGrade: false,
      control: {
        flag: true,
      },
      controlGrade: {
        flag: true,
      },
      loading: true,
      id: "",
      idGrade: "",
      form: {
        type: "",
        level: "",
      },
      row: "",
      rowGrade: "",
      type: "",
      total: 0,
      totalGrade: 0,
      page: {
        beginPageIndex: 1,
        pageCurrent: 1,
        endPageIndex: 8,
        pageSize: 10,
        totalCount: 100,
        totalPage: 0,
      },
      currentPage: 1,
      currentPageGrade: 1,
      pageSize: 10,
      pageSizeGrade: 10,
      title: "",
      titleGrade: "",
      showAdd: false,
      showImport: false,
      visible: false,
      tableData: [],
      value: "",
      level: "",
    };
  },
  created() {
    this.fetchData(this.form);
    this.getWarningListLeve();
    this.fetchDataGrade(this.formGrade);
  },
  methods: {
    fileClick(item) {
      if (item.file) {
        window.open(
          this.$store.state.preUrl + 'filePreview/onlinePreview?url='+
            encodeURIComponent(Base64.encode(item.file))
        );
      }
    },

    handleClick(tab, event) {
      if (this.activeName === "first") {
        this.currentPage = 1;
        this.pageSize = 10;
        this.fetchData(this.form);
        this.getWarningListLeve();
      } else {
        (this.currentPageGrade = 1), (this.pageSizeGrade = 10);
        this.fetchDataGrade(this.formGrade);
      }
    },
    getWarningListLeve() {
      getWarningListLeve().then((res) => {
        this.WarningListLeve = res.result;
        this.WarningListLeve.unshift({ id: "-1000", name: "全部" });
      });
    },
    changeType(val) {
      let type = "";
      if (val === "全部") {
        this.form.type = "";
      } else {
        this.form.type = val;
      }
    },
    changeLevel(val) {
      let type = "";
      if (val === "-1000") {
        this.form.level = "";
      } else {
        this.form.level = val;
      }
    },
    count(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    cellstyle({ columnIndex }) {
      if (columnIndex === 0) {
        return "padding-left:24px;font-size:15PX";
      } else {
        return "font-size:15PX";
      }
    },
    // 获取数据
    fetchData(params) {
      this.loading = true;
      const pageSize = this.pageSize;
      const pageNum = this.currentPage;
      params.pageSize = pageSize;
      params.pageNum = pageNum;
      api
        .getWarning(params)
        .then((res) => {
          this.tableData = res.result.list;
          this.total = res.result.total;
          this.loading = false;
        })
        .catch();
    },
    fetchDataGrade(params) {
      this.gradeLoading = true;
      const pageSize = this.pageSizeGrade;
      const pageNum = this.currentPageGrade;
      params.limit = pageSize;
      params.current = pageNum;
      console.log(params);
      getLevelPageList(params).then((res) => {
        this.gradeLoading = false;
        this.gradeTableData = res.result.list;
        this.totalGrade = res.result.total;
      });
    },
    //添加
    handleAdd(val) {
      this.primary = "primary";
      this.editbutton = false;
      this.row = {};
      this.title = val;
      this.type = "add";
      this.visible = true;
    },
    handleAddGrade(val) {
      this.primaryGrade = "primary";
      this.editbuttonGrade = false;
      this.rowGrade = {};
      this.titleGrade = val;
      this.typeGrade = "add";
      this.visibleGrade = true;
    },
    // 编辑
    editForm(id, row, val) {
      const params = {
        id: id,
      };
      api.isEditable(params).then((res) => {
        if (res.result) {
          this.primary = "primary";
          this.editbutton = false;
          this.visible = true;
        } else {
          //   this.$message({
          //   type: 'warning',
          //   message: '有场景使用该预警，不能编辑'
          // });
          this.primary = "info";
          this.editbutton = true;
          this.visible = true;
        }
        this.row = JSON.parse(JSON.stringify(row));
        this.id = id;
        this.type = "edit";
        this.control.flag = true;
        this.title = val;
      });
    },
    editGradeForm(id, row, val) {
      const params = {
        id: id,
      };
      this.rowGrade = JSON.parse(JSON.stringify(row));
      this.primaryGrade = "primary";
      this.typeGrade = "edit";
      this.idGrade = id;
      this.controlGrade.flag = true;
      this.titleGrade = val;
      this.visibleGrade = true;
    },
    // 删除
    handleDelete(id) {
      this.$confirm("确定删除后当前内容将无法找回,请谨慎操作", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            id: id,
          };
          api.isEditable(params).then((res) => {
            // console.log(res)
            if (res.result) {
              api
                .deleteWarning(params)
                .then(() => {
                  this.fetchData(this.form);
                  this.$message({
                    type: "success",
                    message: "删除成功!",
                  });
                })
                .catch();
            } else {
              this.$message({
                type: "warning",
                message: "有场景使用该预警，不能删除",
              });
            }
          });

          // const params={
          //   id:id
          // }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
    handleGradeDelete(id) {
      this.$confirm("确定删除后当前内容将无法找回,请谨慎操作", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            id: id,
          };
          levelDelete(params).then((res) => {
            this.fetchDataGrade(this.formGrade);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
    handleClose() {
      this.visible = false;
      // this.fetchData(this.form)
    },
    handleCloseGrade() {
      this.visibleGrade = false;
    },
    handleClose1() {
      this.visible = false;
      this.fetchData(this.form);
    },
    handleCloseGrade1() {
      this.visibleGrade = false;
      this.fetchDataGrade(this.formGrade);
    },
    handleReset() {
      this.form = {};
      this.warningType = "";
      this.level = "";
      this.currentPage = 1;
      this.fetchData(this.form);
    },
    handleResetGrade() {
      this.formGrade = {};
      this.currentPageGrade = 1;
      this.fetchDataGrade(this.formGrade);
    },
    handleCheck() {
      this.currentPage = 1;
      this.fetchData(this.form);
    },
    handleCheckGrade() {
      this.currentPageGrade = 1;
      this.fetchDataGrade(this.formGrade);
    },
    handleImport() {
      this.showImport = true;
    },
    closeCallback() {
      this.showImport = false;
      this.showAdd = false;
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.fetchData(this.form);
    },
    handleSizeChangeGrade(val) {
      this.currentPageGrade = 1;
      this.pageSizeGrade = val;
      this.fetchDataGrade(this.formGrade);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData(this.form);
    },
    handleCurrentChangeGrade(val) {
      this.currentPageGrade = val;
      this.fetchDataGrade(this.formGrade);
    },
  },
};
</script>
<style lang="scss" scoped>
.circle {
  display: inline-block;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  margin: 0;
  margin-right: 5px;
}
.fileNameWarning {
  cursor: pointer;
}
/deep/ .el-tabs__nav {
  margin-left: 40px;
}
/deep/ .el-select-dropdown {
  z-index: 10 !important;
}
.deviceContainer {
  /deep/.el-button--primary .el-button--primary {
    background: #347fff;
    border-color: #347fff;
    color: #fff;
  }
  width: 100%;
  .id_style {
    /deep/.el-table th:first-child {
      padding-left: 24px;
    }
  }
  .deviceContent {
    width: 97%;
    margin: 24px auto;
    box-sizing: border-box;
    border-radius: 8px;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    background:#fff;
  }
  .content {
    width: 95%;
    margin: 0 auto;
    padding-top: 24px;
    //background: #0E6DB7;
  }
  .deviceTop {
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(10, 25, 51, 0.05);
    /deep/.el-select{
      width: 100% !important;
    }
  }
  .deviceCenter {
    height: 40px;
    margin-bottom: 16px;
    //background: #0A1933;
  }
  .deviceTable {
    margin-top: 24px;
  }
  .alogrithm_page {
    margin-top: 24px;
    padding-bottom: 24px;
    height: 45px;
  }
}
</style>
