<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <div class="content">
        <div class="form_bottom1">
          <div>
            <el-button type="primary" size="small" @click="add()"
              >创建模板</el-button>
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
            <el-table-column   min-width="150" label="模板编号" prop="num">
              <template slot-scope="scope">
                <div>{{ scope.row.num }}</div>
              </template>
            </el-table-column>
            <el-table-column  prop="name"     min-width="150" label="模板名称" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="content"  min-width="150" label="模板内容" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="createBy" min-width="150" label="创建人" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="createTime"  min-width="150" label="模板时间" show-overflow-tooltip>
            </el-table-column>
             <el-table-column
                prop="active"
                min-width="130"
                label="是否启用"
              >
                <template slot-scope="scope">
                  <div
                    :class="{
                      isActive: scope.row.active ===0,
                      isUnActive: scope.row.active === 1,
                    }"
                    @click="changeStyle(scope.row)"
                  ></div>
                </template>
              </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="checkEdit('编辑', scope.row)"
                  >编辑</el-button
                >
                <el-button type="text" @click="checkBindEmail(scope.row)"
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
  </div>
</template>
<script>
import * as eapi from "@/api/ai/emailModel"
export default {
  data() {
    return {
      bind:false,
      warningNames:'',
      isActive:0,
      tip:'',
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
    // 禁用时检验绑定的其他的样式
     checkBindReports(row){
        const params={
          id:row.id
        }
        eapi.checkBind(params).then(res=>{
          this.bind=res.result&&res.result.bind
          this.warningNames=res.result&&res.result.warningNames&&res.result.warningNames.join(',')
          if(!this.bind){
          eapi
          .updateActiveEmail(params)
          .then(() => {
            this.loading = false;
            this.$message({
              type: "success",
              message: "设置成功",
            });
            this.fetchData(this.form);
          })
          .catch(() => {
            this.loading = false;
            this.$message({
                    type: 'warning',
                    message: '设置失败'
                  });
            // row.isActive = 0;
          });
          }else{
            // 绑定时的
        let tips=`确认要禁用这条邮件模板吗?模板已应用于"&{${this.warningNames}}",禁用后该模板将失效`
        this.$confirm(tips, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
           eapi
          .updateActiveEmail(params)
          .then(() => {
            this.loading = false;
            this.$message({
              type: "success",
              message: "设置成功",
            });
            this.fetchData(this.form);
          })
          .catch(() => {
            this.loading = false;
            this.$message({
                    type: 'warning',
                    message: '设置失败'
                  });
            // row.isActive = 0;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消设置",
          });
        });
          }
        }).catch()
    },

    // 渲染数据
    fetchData(params) {
      this.loading = true;
      const current = this.currentPage;
      const limit = this.pageSize;
      params.limit = limit;
      params.current = current;
      eapi.getEmailModel(params).then((res) => {
        this.tableData = res.result && res.result.list;
        this.tableData.map((element, index) => {
          element.num = (this.currentPage - 1) * this.pageSize + index + 1;
        });
        this.total = res.result.total;
        this.loading = false;
      });
    },
    // change
  changeStyle(row) {
     this.checkBindReports(row)
    },
    // 编辑
    checkEdit(val, row) {
     this.row = JSON.parse(JSON.stringify(row));
      this.$emit('edit','editEmail',this.row)
      // console.log('编辑row',row);
    },
    // 添加
    add() {
       this.$emit('addEmail','eamil')
      //  console.log('1312312');
    //    this.$bus.$emit('addEvent','email')
    },
    // 刷新页面
    getNewData() {
      this.$bus.$emit("getNewData");
    },

    // 检查邮件模版是否已经和预警关联，关联则返回所有的预警名称
    checkBindEmail(row){
        const params={
          id:row.id
        }
        eapi.checkBind(params).then(res=>{
          // console.log('删除res',res);
          this.bind=res.result&&res.result.bind
          this.warningNames=res.result&&res.result.warningNames&&res.result.warningNames.join(',')
          if(this.bind){
                 this.tip=`确认要删除这条消息模板吗?模板已应用于"&{${this.warningNames}}",删除后推送即将失效`
          }else{
           this.tip='确认要删除这条消息模板吗?'
          }
          this.handleDelete(row)
        }).catch()
    },
    // 删除
    handleDelete(row) {
      this.$confirm(this.tip, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            id: row.id,
          };
          eapi
            .deleteEmailModel(params)
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
 .isActive {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #fff;
    border: royalblue 8px solid;
  }
  .isUnActive {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #fff;
    border: #dfe1e4 4px solid;
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
    background:#fff;
    .content {
      margin: 0 auto;
      padding-top: 12px;
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
      height: 1px;
      background-color: #f3f3f5;
    }
    .form_bottom1 {
      margin-bottom: 20px;
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
