<template>
  <div class="regionWarp">
    <div class="regin-container">
      <!-- 标题和头部 -->
      <div class="title-close">
        <div class="title">添加算法</div>
        <i class="closeImg el-icon-close" @click="closeAddAlogorithum()"></i>
      </div>
      <!-- 线 -->
      <div class="line"></div>
      <!-- 框 -->
      <div
        class="top-container"
        style="margin-top: 10px; width: 100%; height: 50px"
      >
        <div>
          <el-form ref="numberValidateForm" class="demo-ruleForm">
            <el-form-item label="算法名称">
              <el-input
                v-model="algorithmList.name"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn-group-top">
          <div class="addStyle" @click="handleCheck">搜索</div>
          <div class="button btn-cancle" @click="handleReset">清空</div>
        </div>
      </div>
      <!-- table表格 -->
      <div>
        <el-table
          max-height="350"
          v-loading="loading"
          ref="multipleTableAlgorithmInner"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="index"
            label="编号"
            width="50"
          >
          </el-table-column>
          <el-table-column prop="name" label="算法名称" width="80">
            <template slot-scope="scope">
              {{ scope.row.name ? scope.row.name : "--" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="scene"
            label="智能算法请求场景"
            width="180"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.scene ? scope.row.scene : "--" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="功能概述"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.description ? scope.row.description : "--" }}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="btn-group">
        <div class="button" @click="handleCloseAddAlogorithm">确定</div>
        <div class="button btn-cancle" @click="closeAddAlogorithum()">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAlgorithm } from "@/api/ai/algorithmManage";
export default {
  props: {
    toMySelectAlogorithum: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      toMySelectAlogorithumBefore: [],
      loading: false,
      currentPage: 1,
      pageSize: 999,
      tableData: [],
      multipleSelection: [],
      algorithmList: {
        name: "",
      },
    };
  },
  created() {
    this.getAlgorithmList(this.algorithmList);
  },
  methods: {
    //
    getAlgorithmList(params) {
      this.loading = true;
      const pageSize = this.pageSize;
      const pageNum = this.currentPage;
      params.pageSize = pageSize;
      params.pageNum = pageNum;
      getAlgorithm(params)
        .then((res) => {
          this.loading = false;
          this.tableData = res.result.list;

          this.multipleSelection = this.toMySelectAlogorithum;
          this.toMySelectAlogorithumBefore = this.toMySelectAlogorithum;
          console.log(this.toMySelectAlogorithum, "toMySelectAlogorithum");
          console.log(this.multipleSelection, "multipleSelection");
          this.tableData.map((i) => {
            this.multipleSelection.map((j) => {
              if (i.id === j.id) {
                this.$nextTick(() => {
                  this.$refs.multipleTableAlgorithmInner &&
                    this.$refs.multipleTableAlgorithmInner.toggleRowSelection(
                      i,
                      true
                    );
                });
              }
            });
          });
        })
        .catch();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCheck() {
      this.currentPage = 1;
      this.pageSize = 999;
      this.getAlgorithmList(this.algorithmList);
    },
    handleReset() {
      this.currentPage = 1;
      this.pageSize = 999;
      this.algorithmList = {
        name: "",
      };
      this.getAlgorithmList(this.algorithmList);
    },

    handleCloseAddAlogorithm() {
      this.$message({
        message: "添加成功!",
        type: "success",
      });
      console.log("我是要添加的算办法", this.multipleSelection);
      this.$emit("closeAddAlogorithum", this.multipleSelection);
    },
    //
    // 关闭弹框
    closeAddScence() {
      this.$emit("closeAddScence");
    },
    // 关闭
    closeAddAlogorithum() {
      this.$message({
        message: "取消成功!",
        type: "success",
      });
      this.multipleSelection = this.toMySelectAlogorithumBefore;
      console.log(this.multipleSelection, "我是取消选择的传值");
      this.$emit("closeAddAlogorithum", this.multipleSelection);
      //  this.
    },
  },
};
</script>

<style lang="scss" scoped>
// ===============================================================
.regionWarp {
  width: 730px;
  // background-color: red;
  position: fixed;
  z-index: 99;
  padding-bottom: 16px;
  background: url("~@/assets/digital/assets/img/deviceDetail/bg.png") no-repeat
    center center;
  background-size: 100% 100%;
  .regin-container {
    width: 95%;
    height: 100%;
    margin: 10px auto;
    //  background-color: red;
  }
  .top-container {
    display: flex;
    justify-content: space-between;
  }
  .btn-group-top {
    display: flex;
  }
  .title-close {
    height: 45px;
    display: flex;
    line-height: 45px;
    justify-content: space-between;
  }
  .closeImg {
    margin-top: 10px;
    color: #fff;
    font-size: 20px;
  }
  .title {
    font-size: 20px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #e8eeff;
  }
  .line {
    width: 100%;
    border-bottom: 0.5px dotted rgba(151, 151, 151, 0.5);
  }
  .addStyle {
    width: 64px;
    height: 32px;
    background: rgba(37, 188, 255, 0.2);
    border: 1px solid #25bcff;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #25bcff;
    line-height: 32px;
    text-align: center;
  }
  .warning-time {
    margin-left: 11px;
    color: #ccd1df;
    margin-top: 15px;
    margin-bottom: 20px;
    font-size: 14px;
  }
  .btn-group {
    display: flex;
    margin-top: 20px;
    flex-direction: row-reverse;
  }
  .button {
    background: rgba(37, 188, 255, 0.2);
    border: 1px solid #25bcff;
    width: 64px;
    height: 32px;
    font-size: 14px;
    text-align: center;
    font-weight: 400;
    color: #ffffff;
    margin-left: 10px;
    line-height: 32px;
  }
  .btn-cancle {
    background: rgba(170, 170, 170, 0.16);
    border: 1px solid rgba(170, 170, 170, 0.75);
  }
  //  ========================================================================
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
// ==========================
// 按钮
.confirmButton {
  position: absolute;
  top: 35px;
  width: 64px;
  right: 26px;
  height: 32px;
  display: inline-block;
  background: rgba(170, 170, 170, 0.16);
  border: 1px solid rgba(170, 170, 170, 0.75);
  font-size: 16px;
  text-align: center;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #ffffff;
  line-height: 32px;
}
.cancelButton {
  position: absolute;
  bottom: 20px;
  right: 102px;
  display: inline-block;
  width: 64px;
  height: 32px;
  background: rgba(37, 188, 255, 0.2);
  border: 1px solid #25bcff;
  font-size: 16px;
  text-align: center;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #ffffff;
  line-height: 32px;
  margin-left: 8px;
}
/deep/.el-form {
  margin-bottom: 20px;
  max-height: 400px;
  // background-color: brown;
}
/deep/.el-textarea__inner {
  display: block;
  resize: vertical;
  font-size: 14px;
  padding: 5px 15px;
  line-height: 1.5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  color: #fff;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
/deep/.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
/deep/label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: -15px;
  font-weight: 700;
}
/deep/.el-form-item {
  margin-bottom: -15px;
}
/deep/.el-col[data-v-6386ea48] {
  height: 30px;
  border-radius: 4px;
}
.item-time {
  margin-top: 25px;
  // 修改placeholder的字体样式
  /deep/.el-input input::-webkit-input-placeholder {
    color: #aeabab;
    font-size: 12px;
  }
  /deep/.el-input input::-moz-input-placeholder {
    color: #aeabab;
    font-size: 12px;
  }
  /deep/.el-input input::-ms-input-placeholder {
    color: #aeabab;
    // color: #fff;
    font-size: 12px;
  }
  // 修改日期的字体
  /deep/.el-date-editor .el-range-input,
  .el-date-editor .el-range-separator {
    height: 100%;
    line-height: 40px;
    color: #fff !important;
    text-align: center;
    margin-top: -10px;
    font-size: 12px;
  }
  .text {
    color: red;
    font-size: 14px;
  }
  // 删除图标去点
  /deep/.el-date-editor .el-range__close-icon {
    display: none;
  }
  // 修改图标
  /deep/.el-date-editor .el-range__icon {
    font-size: 12px;
    margin-left: -5px;
    color: #c0c4cc;
    float: left;
    line-height: 30px;
  }
  /deep/.el-date-editor .el-range-separator {
    // padding-top:5px;
    // line-height: 15px;
    padding: 0px 0px;
    line-height: 32px;
    width: 3%;
    color: #fff;
  }
  /deep/.el-input__icon {
    height: 100%;
    width: 25px;
    text-align: center;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    line-height: 30px;
  }
  /deep/ label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 10px;
    font-weight: 700;
  }
  /deep/.el-form-item {
    margin-bottom: 10px;
  }
  /deep/.el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    margin-left: 0px !important;
  }
  /deep/.el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    width: 0px !important;
    font-size: 12px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}

.waring-time-container {
  // max-height:400px;
  // background-color: bisque;
}
.input-item {
  margin-bottom: 1px;
}
// =================================================
/deep/.el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  margin-left: 90px !important;
}
/deep/.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  width: 90px !important;
  font-size: 12px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
// ====================================================
/deep/.el-input__inner {
  -webkit-appearance: none;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  display: inline-block;
  font-size: 14px;
  height: 30px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
// =============================
// 修改表格样式
// 修改overflow不显示问题
/deep/.el-table .cell,
.el-table th div {
  padding-right: 0;
  padding-left: 10px;
}
// 修改表格头样式
/deep/ .el-table th {
  font-weight: 400;
  color: rgb(188, 190, 199);
  font-size: 16px;
  height: 30px;
  border: none;
  background: rgb(34, 44, 74) !important;
  padding: 12px 0;
}
/deep/.el-table td {
  padding: 10px 0px;
  height: 20px;
  font-size: 15px;
  font-weight: 400;
  background-color: rgb(2, 13, 22) !important;
  color: #fff;
  border: none;
  line-height: 30px;
}
/deep/.el-table th,
.el-table tr {
  background-color: #fff;
  height: 30px !important;
}
/deep/.el-table {
  position: relative;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 100%;
  max-width: 100%;
  font-size: 14px;
  color: #606266;
}
/deep/.el-table__body,
.el-table__footer,
.el-table__header {
  table-layout: fixed;
  border-collapse: separate;
  width: 100% !important;
}
// /deep/.el-table .cell {
//     -webkit-box-sizing: border-box;
//     box-sizing: border-box;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: normal;
//     word-break: break-all;
//     line-height: 23px;
//     padding-right: 10px;
// }
//   /deep/.el-table td, .el-table th{
//     padding:6px 0px !important;
//   }
/deep/.el-table__empty-block {
  // background:rgba(41,48,66,) !important;
  background: rgb(2, 13, 22) !important;
}
// 去除边框
/deep/.el-table--border::after,
.el-table--group::after,
.el-table::before {
  content: "";
  position: absolute;
  background-color: #ebeef5;
  z-index: 1;
  display: none;
}
// tab栏样式修改
/deep/ .el-tabs__nav {
  margin-left: 24px;
}
/deep/ .el-tabs__header {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px 2px 0px 0px;
  opacity: 0.8;
}
/deep/ .el-tabs__nav-wrap::after {
  display: none;
}
/deep/ .el-tabs__active-bar {
  background: #25bcff;
  width: 60px;
  // margin-left: 24px;
}

/deep/ .el-tabs__item {
  font-size: 16px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #ffffff;
  // margin-left: 24px;
}
/deep/ .el-tabs__item.is-active {
  color: #25bcff;
}
/deep/ .el-form-item__label {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ccd1df;
}
/deep/ .el-textarea__inner,
.el-input__inner {
  background: transparent;
}
/deep/ input {
  background-color: transparent;
}

/deep/input::-webkit-input-placeholder {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #e8eeff;
}

/deep/input::-moz-input-placeholder {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #e8eeff;
}

/deep/input::-ms-input-placeholder {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #e8eeff;
}
</style>