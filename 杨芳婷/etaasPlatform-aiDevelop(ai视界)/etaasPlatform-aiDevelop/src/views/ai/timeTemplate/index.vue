<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <div>
      <div class="content" v-if="!timeShow">
        <div class="formBorder">
          <el-button type="primary" size="small" @click="add()">创建模板</el-button>
        </div>
        <div class="deviceTable">
          <el-table
            v-loading="loading"
            :header-cell-style="{ 'font-size': '16PX' }"
            :cell-style="{ 'font-size': '15PX' }"
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            tooltip-effect="dark"
          >
            <el-table-column
              prop="name"
              label="模板名称"
              width="140"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="id"
              label="模板ID"
            >
            </el-table-column>
            <el-table-column
              prop="description"
              label="模板说明"
              show-overflow-tooltip
            >
             <template slot-scope="scope">
                 {{scope.row.description?scope.row.description:'--'}}
                </template>
            </el-table-column>
            <el-table-column
              prop="createBy"
              label="创建人"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              show-overflow-tooltip
            >
            </el-table-column>
           <el-table-column
                prop="active"
               width="150"
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
            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="check(scope.row)"
                  >查看</el-button
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
     
    <div v-if="timeShow">
      <check @back="back" :row="row" :add-show="addShow"></check>
    </div>
    </div>
  </div>
</template>
<script>
import * as tapi from "@/api/ai/timeModel";
import check from '@/views/ai/timeTemplate/check/index.vue'
export default {
    components: {
       check
  },
  data() {
    return {
      sceneNames:'',
      bind:false,
      addShow:'',
      timeShow:false,
      loading: true,
      form: {
      },
      row: {},
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  created() {
    this.fetchData(this.form);
  },
  mounted() {

  },
  methods: {
    // 检验模板是否绑定的其他的预警事件
    checkBindReports(row){
        const params={
          id:row.id
        }
        tapi.checkBind(params).then(res=>{
          this.bind=res.result&&res.result.bind
          this.sceneNames=res.result&&res.result.deviceAlgNames&&res.result.deviceAlgNames.join(',')
          if(!this.bind){
          tapi
          .updateActiveTime(params)
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
            let tips=`确认要禁用这条时间模板吗?模板已应用于"&{${this.sceneNames}}",禁用后该模板将失效,相应的算法会取消布控`
             this.$confirm(tips, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
           tapi
          .updateActiveTime(params)
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
    // 启用禁用模板
    changeStyle(row) {
      this.checkBindReports(row)
    },

    // 查看
    check(val){
      this.row=JSON.parse(JSON.stringify(val))
      //  console.log('row',this.row);
        this.addShow=false
        this.timeShow=true
    },

    //返回
    back(){
        this.timeShow=false
    },

    // 添加
    add(){
        this.addShow=true
        this.timeShow=true
    },

  //获取时间模板列表
    fetchData(params) {
      this.loading = true;
      const limit = this.pageSize;
      const current = this.currentPage;
      params.limit = limit;
      params.current = current;
      tapi
        .getTimeModel(params)
        .then((res) => {
          // console.log('时间res',res);
          this.tableData = res.result.list;
          // 对时间进行处理
          this.total = res.result.total;
          this.loading = false;
        })
        .catch();
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
<style>
.el-message-box__status+.el-message-box__message {
    padding-left: 36px;
    padding-right: 12px;
    max-height: 90PX;
    overflow: auto;
}
</style>
<style lang="scss" scoped>
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
.time {
  /deep/.el-dialog__body {
    padding: 0px 0px !important;
    padding-top: 15px !important;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
    border-top: 1px solid rgba(10, 25, 51, 0.05);
    width: 92%;
    margin: 0 auto;
    margin-top: 10px;
  }
}

/deep/ .el-select-dropdown {
  z-index: 120 !important;
}
/deep/.el-dialog__headerbtn {
  position: absolute;
  display: none;
  top: 18px;
  right: 20px;
  padding: 0;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 16px;
}
/deep/ .el-picker-panel {
  z-index: 100 !important;
}
.deviceContainer {
  .closeIcon {
    line-height: 13px;
    cursor: pointer;
    font-size: 22px;
    margin-left: 30px;
    color: lightgrey;
  }
  .checkWay {
    height: 32px;
    line-height: 13px;
    border-radius: 4px;
    color: rgba(10, 25, 51, 0.5);
    font-size: 18px;
  }
  .checkDialogTitle {
    font-size: 20px;
    font-weight: 600;
    color: #0a1933;
    line-height: 13px;
    padding-left: 16px;
    float: left;
  }
  .checkEvent {
    float: right;
    padding-left: 16px;
    padding-right: 8px;
    min-width: 115px;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    color: #347fff;
    font-size: 18px;
    margin-right: 0px;
  }
  .checkDialogWarning {
    float: left;
    padding-left: 16px;
    padding-right: 8px;
    min-width: 115px;
    height: 32px;
    line-height: 32px;
    background: #ff3a3a;
    border-radius: 4px;
    color: #fff;
    font-size: 18px;
    margin-left: 16px;
  }
  .checkDialogisWarning {
    float: left;
    padding-left: 16px;
    padding-right: 8px;
    min-width: 115px;
    height: 32px;
    line-height: 32px;
    background: lightgray;
    border-radius: 4px;
    color: #fff;
    font-size: 18px;
    margin-left: 16px;
  }
  .icon-word {
    margin-left: 6px;
    cursor: pointer;
    font-size: 18px;
    color: #347fff;
  }
  width: 100%;
  .deviceContent {
    width: 97%;
    margin: 24px auto;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
    background:#fff;
    .pickerdata {
      width: 350px;
    }
    @media screen and (max-width: 1680px) {
      .pickerdata {
        width: 420px;
      }
    }
    .content {
      padding-top: 24px;
      width: 95%;
      margin: 0 auto;
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
        color: rgba(10, 25, 51, 0.2);
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
        // font-size: 18px;
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
    .form_br {
      width: 100%;
      margin-top: 16px;
      height: 1px;
      background-color: #f3f3f5;
    }
    .formBorder {
      margin-bottom: 16px;
      justify-content: flex-end;
      display: flex;
    }
    .deviceTable {
      width: 100%;
    }
    .form_pg {
      height: 45px;
      padding-bottom: 24px;
      margin-top: 24px;
      margin-right: 0;
    }
  }
}
</style>
