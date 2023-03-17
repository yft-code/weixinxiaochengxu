<template>
  <div class="algorithm_update">
    
    <el-dialog
      :visible.sync="visible"
      width="800px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
     <div slot="title">
          <div class="checkDialogTitle">
            <div style="display: flex; align-items: center">
              <div class="warningName">
               推送明细
              </div>
              <div class="title">事件编号:{{numberName}}</div>
            </div>
          </div>
        </div>
      <div class="edit_input">
          <div class="input_container">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="序号" width="100" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="username" label="用户名"  show-overflow-tooltip> </el-table-column>
          <el-table-column prop="mail" label="邮箱"  show-overflow-tooltip> </el-table-column>
          <el-table-column prop="time" label="送达时间" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="res" label="推送结果">
              <template slot-scope="scope">
                <div >
                   <el-tooltip v-if="scope.row.res.length<=2" class="item" :disabled="true" effect="dark" :content="scope.row.res" placement="top-start">
                     <div style="display: inline-block">
                         <span :class="{'active':scope.row.res==='成功','activeNo':scope.row.res!=='成功'}" class="overflow"> {{scope.row.res}}</span>
                     <img v-if="scope.row.res!=='成功'" class="icoImg" :src="img" alt />
                     </div>
                  </el-tooltip>
                  <el-tooltip v-if="scope.row.res.length>2" class="item" :disabled="false" effect="dark" :content="scope.row.res" placement="top-start">
                     <div style="display: inline-block">
                         <span :class="{'active':scope.row.res==='成功','activeNo':scope.row.res!=='成功'}" class="overflow"> {{scope.row.res}}</span>
                     <img v-if="scope.row.res!=='成功'" class="icoImg" :src="img" alt />
                     </div>
                  </el-tooltip>
                </div>
                     <!-- <span :class="{'active':scope.row.res==='成功','activeNo':scope.row.res!=='成功'}" class="overflow"> {{scope.row.res}}</span>
                     <img class="icoImg" :src="img" alt /> -->
                    </template>
          </el-table-column>
        </el-table>
          </div>
        
      </div>
      <div style="height: 50px; padding-top: 10px">
        <el-pagination
          style="float: right"
          background
          align="center"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: "detail",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    details: {
      type:Array,
      default:[]
    },
    detailsPage:{
      type:Array,
      default:[]
    },
    numberName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      img:require('../../../../assets/img/ai/ico.svg'),
      tableData: [],
      tableDataPage: [],
      currentPage: 1,
      pageSize: 10,
      total:0 ,
    };
  },
  created() {
     
  },
  mounted(){

  },
  watch: {
    visible(n,o) {
     if(n){
       this.tableData = this.detailsPage
       this.total = this.details.length
       this.currentPage = 1
       this.tableDataPage = this.details
     }else{
       
     }
    },
  },
  methods: {
    // 关闭弹框
    handleClose() {
      this.$emit("close-callback");
    },

    // 分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.tableData  = this.tableDataPage.slice(
        (this.currentPage-1)*this.pageSize,
        this.currentPage*this.pageSize
      )
    },
   
  },
};
</script>

<style lang="scss" scoped>
.overflow{
                width:40PX;
                display: inline-block;
                overflow:hidden;
                // background: #02D624;
                white-space: nowrap;
                text-overflow: ellipsis;
                -o-text-overflow:ellipsis;

            }
.icoImg{
  width: 20PX;
  height: 20PX;
  // background: red;
  margin-top: -15PX;
  margin-left: 5PX;
}
.active{
  color: #02D624;
}
.activeNo{
  color: #FF3A3A;
}
.warningName{
  font-size: 22px;
  font-weight: 600;
}
.title{
   margin-left: 25px;
  font-size: 18px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(10, 25, 51, 0.65);
}
/deep/ .el-upload-list__item {
  width: 300px;
}
/deep/ .el-upload__input {
  display: none;
}
/deep/.el-radio-group {
  font-size: 0;
  margin-top: 5px;
}
/deep/.el-checkbox {
  margin-top: 5px;
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  margin-right: 30px;
}
.algorithm_update {
  ::v-deep.el-dialog__body {
    // border-bottom: 1px solid  rgba(10, 25, 51, 0.05);
  }
  /deep/.el-form-item__label {
    font-weight: 400;
    font-size: 14px;
    color: #0a1933;
  }
  .edit_input {
    width: 99%;
    margin-top: 0PX;
    border-top: 1px solid rgba(10, 25, 51, 0.05);
  }
  .input_container {
    width: 100%;
    margin: 20px auto;
  }
  ::v-deep .el-dialog__title {
    color: #0a1933;
    // line-height: 60px;
    font-weight: 550;
  }
  ::v-deep.el-form-item--mini .el-form-item__content,
  .el-form-item--mini .el-form-item__label {
    line-height: 28px;
    width: 100%;
  }
  .input_border {
    width: 99%;
    border-top: 1px solid rgba(10, 25, 51, 0.05);
    // margin: -50px auto;
    margin-bottom: 20px;
  }
  .box_check {
    ::v-deep .el-radio__inner {
      border-radius: 0;
    }
  }
}
/deep/ .el-dialog__footer {
  padding-right: 23px;
}
</style>
