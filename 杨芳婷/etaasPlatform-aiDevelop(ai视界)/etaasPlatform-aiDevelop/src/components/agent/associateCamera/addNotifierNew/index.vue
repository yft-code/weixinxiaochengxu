<template>
  <div class="regionWarp">
    <div class="regin-container">
      <!-- 标题和头部 -->
      <div class="title-close">
        <div class="title">
            <img
         class="imgIcon"
         src="@/assets/digital/assets/img/mode/billboard/ico.png" alt=""/>
          添加通知人</div>
          <img 
          class="closeImg"
          @click="closeAddNotifier()"
          src="@/assets/agent/img/close.svg" alt="">
      </div>
      <!-- 线 -->
      <!-- <div class="line"></div> -->
      <!-- 框 -->
      <div
        class="top-container"
        style="margin-top: 10px; width: 100%; height: 50px"
      >
        <el-form :model="form" class="demo-ruleForm">
          <el-row>
            <el-col :span="6">
              <el-form-item label="所属部门">
                <div class="el-cascader-style">
                  <el-cascader
                    ref="cascader"
                    v-model="form.organizationId"
                    :options="jgList"
                    :props="{
                      checkStrictly: true,
                      expandTrigger: 'hover',
                      emitPath: false,
                    }"
                    @change="changeCascader"
                  >
                    <template slot-scope="{ node, data }">
                      <div @click="cascaderClick(data)">
                        <span>{{ data.name }}</span>
                        <span v-if="!node.isLeaf">
                          ({{ data.children.length }})
                        </span>
                      </div>
                    </template>
                  </el-cascader>
                </div>
              </el-form-item>
              <!-- <el-form-item label="所属机构">
                          <el-input ></el-input>
                          </el-form-item> -->
            </el-col>

            <el-col :span="6">
              <el-form-item label="姓名">
                <el-select
                  v-model="form.name"
                  placeholder="请选择"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in userData"
                    :key="item.id"
                    :label="item.username"
                    :value="item.username"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <!-- <el-col :span="6">
                         <el-form-item label="工号">
                            <el-input></el-input>
                         </el-form-item>
                      </el-col> -->
            <el-col :span="6">
              <div class="btn-group-top">
                <div class="addStyle" @click="handleCheck">搜索</div>
                <div class="button btn-cancle" @click="handleReset">清空</div>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- table表格 -->
      <div>
        <el-table
          max-height="350"
          v-loading="loading"
          ref="multipleTableObjectInner"
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="index"
            label="编号"
            width="50"
          >
          </el-table-column>
          <el-table-column prop="organization" label="所属机构">
            <template slot-scope="scope">
              {{ scope.row.organization ? scope.row.organization : "--" }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.name ? scope.row.name : "--" }}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="address" label="工号"  show-overflow-tooltip>
            </el-table-column> -->
          <el-table-column prop="phone" label="电话" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.phone ? scope.row.phone : "--" }}
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.email ? scope.row.email : "--" }}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="btn-group">
        <div class="button" @click="handleCloseAddObject">确定</div>
        <div class="button btn-cancle" @click="closeAddNotifier">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  userPageList,
  getUserListOrg,
  listDepart,
  getUserDetailInfo,
  queryUserId,
} from "@/api/ai/scenarioManagement";
import { getUserInfo } from "@/api/ai/warningEvent";
export default {
  props: {
    toMySelectNotifier: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      toMySelectNotifierBefore: [],
      firstTime: true, //判断是不是第一次进入页面
      userData: [],
      aa: [],
      jgList: [],
      bmList: [],
      current: 1,
      size: 9999,
      loading: false,
      tableData: [],
      userIds: [],
      multipleSelection: [],
      form: {
        name: "",
      },
    };
  },
  created() {
    this.getUserListOrg();
    this.getUser();
    this.getUserPageList(this.form);
  },
  methods: {
    cascaderClick(nodeData) {
      this.form.organization = nodeData.value;
      this.$refs.cascader.checkedValue = nodeData.value;
      this.$refs.cascader.computePresentText();
      this.$refs.cascader.toggleDropDownVisible(false);
    },

    changeCascader(val) {
      this.getUser(val);
    },

    async getUser() {
      let params = {
        pageSize: 99999,
        pageNum: 1,
      };
      let arr = [];
      let id;
      if (localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))&& JSON.parse(localStorage.getItem("userInfo"))['aiHorizon']) {
        id = JSON.parse(localStorage.getItem("userInfo"))['aiHorizon'].id;
        let param = {
          id: id,
        };
        await queryUserId(param)
          .then((res) => {
            if (res.code === 0) {
              if (res.result)
                res.result.organizations.map((element) => {
                  params["id"] = element.organizationId;
                  userPageList(params)
                    .then((response) => {
                      if (response.code === 0) {
                        response.result.list.map((val2) => {
                          this.userData.push({
                            id: val2.id,
                            username: val2.name,
                          });
                        });
                        this.userData = this.deWeightThree(this.userData, "id");
                      }
                    })
                    .catch();
                });
            }
          })
          .catch();
      }
    },
    //去重数组
    deWeightThree(arr, value) {
      let map = new Map();
      for (let item of arr) {
        if (!map.has(item[value])) {
          map.set(item[value], item);
        }
      }
      return [...map.values()];
    },

    departChange() {
      this.form.name = "";
      let params = {
        departId: this.form.departId,
      };
      getUserInfo(params)
        .then((res) => {
          this.userData = res.result;
        })
        .catch();
    },
    listDepart() {
      listDepart().then((res) => {
        this.bmList = res.result;
      });
    },
    Close() {
      this.$message({
        message: "取消成功!",
        type: "success",
      });
      this.multipleSelection = this.aa;
      this.handleClose();
    },

    getUserListOrg() {
      let id;
      if (localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo")) && JSON.parse(localStorage.getItem("userInfo"))['aiHorizon']) {
        id = JSON.parse(localStorage.getItem("userInfo"))['aiHorizon'].id;
        let param = {
          id: id,
        };
        getUserDetailInfo(param).then((response) => {
          //改造数据,增加value和label
          if (
            response.result &&
            response.result &&
            response.result.length !== 0
          ) {
            response.result.map((element) => {
              element.label = element.name;
              element.value = element.id;
              if (element.children && element.children.length !== 0) {
                element.children.map((val) => {
                  val.label = val.name;
                  val.value = val.id;
                  if (val.children && val.children.length !== 0) {
                    val.children.map((val2, index2) => {
                      val2.label = val2.name;
                      val2.value = val2.id;
                      if (val2.children && val2.children.length !== 0) {
                      } else {
                        val2.children = "";
                      }
                    });
                  } else {
                    val.children = "";
                  }
                });
              } else {
                element.children = "";
              }
            });
            this.jgList = response.result;
          }
        });
      }
    },

    handleCheck() {
      this.currentPage = 1;
      this.pageSize = 999;
      this.getUserPageList(this.form);
    },
    handleReset() {
      this.current = 1;
      this.size = 999;
      this.form = {
        departId: "",
        name: "",
        workNumber: "",
        organization: "",
      };
      this.getUser("");
      this.getUserPageList(this.form);
    },
    getUserPageList(params) {
      // console.log('yyyyy')
      this.loading = true;
      const size = this.size;
      const current = this.current;
      params.pageSize = size;
      params.pageNum = current;
      userPageList(params).then((res) => {
        this.loading = false;
        let arr = [];

        res.result.list.map((element) => {
          arr.push({
            id: element.id,
            username: element.name,
          });
          element.organization = [];
          element.organizations.map((val) => {
            element.organization.push(val.organizationName);
          });
          element.organization = element.organization.join(",");
        });
        if (this.firstTime) {
          this.userData = arr;
        }
        this.firstTime = false;
        this.tableData = res.result.list;

        //
        this.multipleSelection = this.toMySelectNotifier;
        this.toMySelectNotifierBefore = this.toMySelectNotifier;
        this.tableData.map((i) => {
          this.multipleSelection.map((j) => {
            if (i.id === j.id) {
              this.$nextTick(() => {
                this.$refs.multipleTableObjectInner &&
                  this.$refs.multipleTableObjectInner.toggleRowSelection(
                    i,
                    true
                  );
              });
            }
          });
        });
        //
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCloseAddObject() {
      this.$message({
        message: "添加成功!",
        type: "success",
      });
      //  console.log('我是要添加的对象',this.multipleSelection)
      this.$emit("closeAddNotifier", this.multipleSelection);
      // this.handleClose();
    },
    handleClose() {
      this.$emit("close-callback3", this.multipleSelection);
    },
    //
    // 关闭弹框
    closeAddNotifier() {
      this.multipleSelection = this.toMySelectNotifierBefore;
      this.$emit("closeAddNotifier", this.multipleSelection);
    },
  },
};
</script>

<style lang="scss" scoped>
// ===============================================================
.regionWarp {
  width: 770px;
  // background-color: red;
  position: fixed;
  z-index: 99;
  padding-bottom: 16px;
  background: url("~@/assets/agent/img/bg.png") no-repeat
    center center;
  background-size: 100% 100%;
  .regin-container {
    width: 95%;
    height: 100%;
    margin: 10px auto;
    //  background-color: red;
  }

  .imgIcon{
    width: 25px;
    height: 25px;
  }
  .top-container {
    display: flex;
    justify-content: space-between;
  }
  .btn-group-top {
    display: flex;
    margin-left: 35px;
    margin-top: 4px;
  }
  .title-close {
    height: 45px;
    display: flex;
    line-height: 45px;
    justify-content: space-between;
  }
    .closeImg {
    margin-top: -8px;
    margin-right:-15px;
    color: #fff;
    width: 24px;
    height: 24px;
  }
  .title {
    font-size: 20px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #25BCFF;
  }
  .line {
    width: 100%;
    border-bottom: 0.5px dotted rgba(151, 151, 151, 0.5);
  }
  .addStyle {
    width: 64px;
    height: 30px;
    background: rgba(37, 188, 255, 0.2);
    border: 1px solid #25bcff;
    font-size: 16px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #25bcff;
    line-height: 30px;
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
    height: 30px;
    font-size: 14px;
    text-align: center;
    font-weight: 400;
    color: #ffffff;
    margin-left: 10px;
    line-height: 30px;
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
// 修改下拉框样式
::v-deep .el-select {
  width: 100%;
}
/deep/.el-input__icon {
  height: 100%;
  width: 22px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 38px;
}
::v-deep .el-input__inner {
  background-color: transparent;
}

::v-deep .el-select-dropdown__item {
  color: #fff;
}

::v-deep .el-scrollbar,
::v-deep .el-select-dropdown {
  background-color: transparent !important;
  color: #fff !important;
}

::v-deep .el-scrollbar__wrap,
::v-deep .el-select-dropdown__list {
  background-color: #0b1a37;
  color: #fff !important;
}

::v-deep .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
}
/deep/.el-popper[x-placement^="bottom"] .popper__arrow {
  top: -8px;
  left: 50%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
}
/deep/.el-popper .popper__arrow {
  border-width: 6px;
  -webkit-filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
}
/deep/.el-popper .popper__arrow,
.el-popper .popper__arrow::after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
//
// 修改层级选择器样式
/deep/.el-cascader-menu {
  min-width: 180px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  background-color: rgb(117, 101, 101) !important;
  border-right: solid 1px #e4e7ed;
}
/deep/.el-cascader-panel {
  max-height: 100px;
  background-color: #0b1a37;
}
</style>
    
