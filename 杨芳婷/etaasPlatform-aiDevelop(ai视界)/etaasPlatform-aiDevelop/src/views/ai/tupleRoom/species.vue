<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <div class="content">
        <div class="form_bottom1">
          <div>
            <el-button type="primary" size="small" @click="add('添加')"
              >添加</el-button
            >
          </div>
        </div>
        <div class="deviceTable">
          <el-table
            v-loading="loading"
            ref="multipleTable"
            :data="tableData"
            :header-cell-style="{ 'font-size': '16PX' }"
            :cell-style="{ 'font-size': '15PX' }"
            style="width: 100%"
            tooltip-effect="dark"
          >
            <el-table-column label="编号" prop="num">
              <template slot-scope="scope">
                <div>{{ scope.row.num }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="组件类型" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  disabled
                  @click="checkEdit('编辑', scope.row)"
                  >编辑</el-button
                >
                <el-button type="text" @click="handleDelete(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="form_pg">
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
    </div>
    <el-dialog
      :title="this.title"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="close"
    >
      <div class="addContainer">
        <el-form
          :model="componentForm"
          ref="componentForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="组件类型"
            prop="type"
            :rules="[{ required: true, message: '组件类型不能为空' }]"
          >
            <el-input
              maxlength="100"
              style="width: 75%"
              v-model="componentForm.type"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close()">取消</el-button>
        <el-button size="mini" type="primary" @click="submit('componentForm')"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as capi from "@/api/ai/tuple.js";
export default {
  data() {
    return {
      componentForm: {
        type: "",
      },
      form: {},
      dialogVisible: false,
      flag: false,
      loading: false,
      tableData: [],
      row: {},
      title: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  created() {
    this.fetchData(this.form);
  },
  methods: {
    // 渲染数据
    fetchData(params) {
      this.loading = true;
      const current = this.currentPage;
      const limit = this.pageSize;
      params.limit = limit;
      params.current = current;
      capi.getList(params).then((res) => {
        this.tableData = res.result && res.result.list;
        this.tableData.map((element, index) => {
          element.num = (this.currentPage - 1) * this.pageSize + index + 1;
        });
        this.total = res.result.total;
        this.loading = false;
      });
    },

    // 编辑
    checkEdit(val, row) {
      this.title = "编辑";
      this.dialogVisible = true;
      this.row = JSON.parse(JSON.stringify(row));
      this.componentForm = this.row;
    },
    // 添加
    add(val) {
      this.title = val;
      this.dialogVisible = true;
      this.componentForm = {};
      this.resetForm("componentForm");
    },
    // 刷新页面
    getNewData() {
      this.$bus.$emit("getNewData");
    },
    // 删除
    handleDelete(id) {
      this.$confirm("确认要删除这条内容吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            id: id,
          };
          capi
            .deleteType(params)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.fetchData(this.form);
              this.getNewData();
            })
            .catch(() => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },

    // 关闭元组件弹框
    close() {
      this.dialogVisible = false;
      this.componentForm.type = "";
      this.resetForm("componentForm");
    },

    //添加元组件类型
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === "添加") {
            const params = {
              name: this.componentForm.type,
            };
            capi
              .addType(params)
              .then(() => {
                this.$message.success("添加成功");
                this.fetchData(this.form);
                this.getNewData();
                this.close();
              })
              .catch();
          } else {
            // console.log('编辑区域')
          }
        }
      });
    },

    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
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
  },
};
</script>
<style lang="scss" scoped>
.deviceContainer {
  width: 100%;
  /deep/.el-form-item__label {
    font-weight: 400;
    font-size: 14px;
    color: #0a1933;
  }
  .deviceContent {
    margin: 0 auto;
    border-radius: 8px;
    box-sizing: border-box;
    background:#fff;
    .content {
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
    .form_bottom {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 24px;
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
