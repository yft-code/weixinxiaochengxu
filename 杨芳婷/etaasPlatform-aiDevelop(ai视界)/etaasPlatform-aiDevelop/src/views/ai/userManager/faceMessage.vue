<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <div class="content">
        <div class="form_bottom1">
          <div>
            <el-button type="primary" size="small" @click="add('新增脸库')">新增脸库</el-button>
          </div>
        </div>
        <div class="deviceTable">
          <el-table
            v-loading="loading"
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            tooltip-effect="dark"
          >
            <el-table-column label="序号" prop="serial">
            </el-table-column>
            <el-table-column prop="number" label="脸库编号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="name" label="脸库名称" show-overflow-tooltip>
            </el-table-column>
              <el-table-column prop="num" label="人员数量" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="checkEdit('编辑脸库', scope.row)"
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
      width="450px"
      :before-close="close"
    >
      <div class="addContainer">
        <el-form
          :model="componentForm"
          ref="componentForm"
          label-width="100px"
          size="mini"
          class="demo-ruleForm"
        >
          <el-form-item
            label="脸库编号"
            prop="number"
            :rules="[{required:true,validator: validateNum,trigger: ['blur']}]"
          >
            <el-input
              maxlength="100"
              style="width: 75%"
              v-model="componentForm.number"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="脸库名称"
            prop="name"
            :rules="[{required:true,validator: validateName,trigger: ['blur']}]"
          >
            <el-input
              maxlength="100"
              style="width: 75%"
              v-model="componentForm.name"
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
import * as fapi from "@/api/ai/userManager.js"
export default {
  data() {
    return {
      id:'',
      componentForm: {
        number: "",
        name:""
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
    // 校验编号
       validateNum(rule, value, callback) {
     if (!value) {
        callback(new Error("脸库编号不能为空"));
      } 
      // else if(!/^([1-9]s|[1-9]\d|1[0-7][0-9]|180)$/.test(value)) {
      //   callback("只能填1-180之间的正整数")
      // }s
      callback();
    },
    // 校验名称
     validateName(rule, value, callback) {
     if (!value) {
        callback(new Error("脸库名称不能为空"));
      } 
      callback();
    },
    // 渲染数据
    fetchData(params) {
      this.loading = true;
      const current = this.currentPage;
      const limit = this.pageSize;
      params.limit = limit;
      params.current = current;
      fapi.faceList(params).then((res) => {
        this.tableData = res.result && res.result.list;
        this.tableData.map((element, index) => {
          element.serial = (this.currentPage - 1) * this.pageSize + index + 1;
        })
        this.total = res.result.total;
        this.loading = false;
      });
    },
    // 编辑
    checkEdit(val, row) {
      this.title = val
      this.dialogVisible = true
      this.componentForm.name = JSON.parse(JSON.stringify(row)).name
      this.componentForm.number=JSON.parse(JSON.stringify(row)).number
      this.id=JSON.parse(JSON.stringify(row)).id
    },
    // 添加
    add(val) {
      this.title = val;
      this.dialogVisible = true;
      this.componentForm = {};
      this.resetForm("componentForm");
    },

    // 删除
    handleDelete(id) {
      this.$confirm("删除脸库及人员信息，删除后不可恢复，确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            id: id,
          };
          fapi
            .deleteFace(params)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.fetchData(this.form);
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

    // 关闭弹框
    close() {
      this.dialogVisible = false;
      this.resetForm("componentForm");
    },

    //添加元组件类型
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === "新增脸库") {
            const params = {
              name: this.componentForm.name,
              number:this.componentForm.number
            };
            fapi
              .addFace(params)
              .then(() => {
                this.$message.success("添加成功");
                this.fetchData(this.form);
                this.close();
              })
              .catch();
          } else {
              const params = {
              id:this.id,
              name: this.componentForm.name,
              number:this.componentForm.number
            };
            fapi
              .editFace(params)
              .then((res) => {
                if(res.code===0){
                 this.$message.success("编辑成功");
                this.fetchData(this.form);
                this.close();
                }
              })
              .catch();
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
/deep/.el-dialog__body{
 padding:8PX 0PX !important;
 color: #606266;
 width: 92%;
 margin:auto;
 border-top: 1px solid rgba(10,25,51,0.0500);
 font-size: 14px;
 word-break: break-all;
}
.deviceContainer {
   .addContainer{
      width: 85%;
      margin:20px auto -19px auto;
    } 
/deep/ .el-dialog {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0px !important;
}
/deep/.el-dialog__title {
    font-weight: 550;
    color: #303133;
}

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
    .content {
      margin: 0px auto;
   // padding-top: 16px;
   padding:0px 24px;
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
      .btn-group {
        margin-left: 70px;
        display: inline-block;
        font-size: 18px;
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
      // margin-top: 24px;
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
