<template>
  <div class="regionWarp">
    <div class="regin-container">
      <!-- 标题和头部 -->
      <div class="title-close">
        <div class="title">
          <img
         class="imgIcon"
         src="@/assets/digital/assets/img/mode/billboard/ico.png" alt=""/>
          新增监管场景
          </div>
        <img 
         class="closeImg"
         src="@/assets/agent/img/close.svg"
         @click="closeAddScence()"
         alt="">
      </div>
      <!-- 线 -->
      <!-- 框 -->
      <div style="margin-top: 10px; width: 50%; height: 50px">
        <el-form
          :rules="rules"
          :model="rulesForm"
          ref="rulesForm"
          class="demo-ruleForm"
        >
          <el-form-item label="监管场景">
            <el-input
              maxlength="50"
              v-model="rulesForm.name"
              placeholder="涂漆车间防火"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- tab -->
      <div style="width: 100%; max-height: 400px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="添加算法" name="first">
            <div class="add-algorith">
              <div class="addStyle" @click="addAlgorithum()">添加</div>
              <div style="margin-top: 20px">
                <el-table
                  ref="multipleTableAlgorithmOuter"
                  :data="mySelectAlogorithum"
                  style="width: 100%"
                >
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
                  <el-table-column label="操作" width="50">
                    <template slot-scope="scope">
                      <el-button type="text" @click="handleDelete1(scope)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="预警信息" name="second">
            <div style="width: 100%; height: 30px">
              <el-row>
                <el-col :span="10">
                  <el-form
                    :rules="rules1"
                    :model="formList"
                    ref="rules1"
                    class="demo-ruleForm"
                  >
                    <el-form-item label="预警名称">
                      <el-select
                        v-model="formList.n"
                        placeholder="请选择"
                        @change="handleChange"
                        :popper-append-to-body="false"
                      >
                        <el-option
                          v-for="item in warningList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="12">
                  <div class="detail-message">
                    {{ this.content }}
                    <!-- 实时<p class="separator">|</p>一级<p class="separator">|</p>短信<p class="separator">|</p>人工二次确认 -->
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="warning-time">添加预警时间</div>

            <div class="addStyle" @click="handleTime">添加</div>
            <!-- 预警时间表格 -->
            <div class="waring-time-container">
              <el-form
                ref="form"
                :model="form"
                :rules="formRules"
                :inline="true"
                class="demo-ruleForm"
              >
                <div v-for="(item, index) in form.dynamicItem" :key="index">
                  <el-form-item label="" class="item-time">
                    <el-row>
                      <el-col :span="11">
                        <el-form-item>
                          <el-date-picker
                            v-model="item.time1"
                            type="daterange"
                            range-separator="~"
                            style="color: #878f9c"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          >
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="1">
                        <span style="color: #dcdcde"> ~ </span>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item
                          :prop="'dynamicItem.' + index + '.time2'"
                          :rules="{
                            type: 'array',
                            required: true,
                            message: '请选择时间区间',
                            fields: {
                              0: {
                                type: 'string',
                                required: true,
                                message: '请选择开始时间',
                              },
                              1: {
                                type: 'string',
                                required: true,
                                message: '请选择结束时间',
                              },
                            },
                          }"
                        >
                          <el-time-picker
                            is-range
                            format="HH:mm"
                            value-format="HH:mm"
                            v-model="item.time2"
                            range-separator="~"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围"
                          >
                          </el-time-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="1">
                        <i
                          class="iconfont icon-delete_fill text"
                          @click="deleteItem(item, index)"
                        ></i>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="添加通知对象" name="third">
            <div class="add-algorith">
              <div class="addStyle" @click="addNotifier">添加</div>
              <div style="margin-top: 20px">
                <el-table
                  :data="mySelectNotifier"
                  ref="multipleTableObjectOuter"
                  style="width: 100%"
                >
                  <el-table-column
                    show-overflow-tooltip
                    prop="index"
                    label="编号"
                    width="50"
                  >
                  </el-table-column>
                  <el-table-column prop="organization" label="所属机构">
                    <template slot-scope="scope">
                      {{
                        scope.row.organization ? scope.row.organization : "--"
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{ scope.row.name ? scope.row.name : "--" }}
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="address" label="工号"  show-overflow-tooltip>
 </el-table-column> -->
                  <el-table-column
                    prop="phone"
                    label="电话"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{ scope.row.phone ? scope.row.phone : "--" }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="email"
                    label="邮箱"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      {{ scope.row.email ? scope.row.email : "--" }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="操作" width="50">
                    <template slot-scope="scope">
                      <el-button type="text" @click="handleDelete2(scope)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 按钮 -->
      <div class="btn-group">
        <div class="button" @click="submitScence">完成</div>
        <div v-if="this.activeName !== 'third'" class="button" @click="next()">
          下一步
        </div>
        <div
          v-if="this.activeName !== 'first'"
          class="button"
          @click="previous()"
        >
          上一步
        </div>
        <div class="button btn-cancle" @click="cancle()">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as deviceApi from "@/api/digital/device";
import { warningList } from "@/api/ai/warningManage";
export default {
  props: {
    mySelectAlogorithum: {
      type: Array,
      default() {
        return [];
      },
    },
    mySelectNotifier: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // buttonConfirm:false,
      loading1: false,
      screenHeight1: document.body.clientHeight - 300,
      screenHeight: document.body.clientHeight - 340,
      windowWidth: document.documentElement.clientWidth,
      currentPage: 1,
      pageSize: 999,
      deviceList: {
        parkName: "",
        buildingName: "",
        floor: "",
        areaName: "",
        deviceName: "",
      },
      editDevice: [],
      editAlgorithm: [],
      editObject: [],
      rules: {
        // name: [
        //   { required: true, message: "请输入监管场景", trigger: "blur" }
        // ],
      },
      rules1: {
        // n: [
        //   { required: true, message: "请选择预警名称", trigger: "blur" }
        // ],
      },
      rulesForm: {
        name: "",
        time: "",
        warningId: "",
        algIds: "",
        userIds: "",
        deviceIds: "",
        offlineNotification: 0,
        isActive: 0,
        state: "",
      },
      content: "",
      form: {
        dynamicItem: [
          // {
          //   time1:'',
          //   time2:''
          // }
        ],
      },
      formList: {},
      formRules: {},
      id: "",
      a: "",
      removeIndex: "",
      removeIndex1: "",
      removeIndex2: "",
      loading: false,
      repoList: [],
      // activeName: 'first',
      tableData: [],
      tableData1: [],
      tableData2: [],
      time: [],
      showAddDevice: false,
      showAddAlgorithm: false,
      showAddWaring: false,
      showAddObject: false,
      warningList: [],
      deviceIds: [],
      algIds: [],
      userIds: [],
      deviceIdsFirst: [],
      algNameFlag: [],
      offlineNotification: false,
      isActive: false,
      activeName: "first",
    };
  },
  created() {
    deviceApi.getWarningList().then((res) => {
      this.warningList = res.result;
      // console.log(this.warningList,'warningList')
    });
  },
  methods: {
    // 保存场景
    submitScence() {
      // userId
      const userIds = [];
      this.mySelectNotifier &&
        this.mySelectNotifier.map((item) => {
          userIds.push(item.id);
        });
      this.userIds = userIds;
      // algIds
      const algIds = [];
      this.mySelectAlogorithum &&
        this.mySelectAlogorithum.map((item) => {
          algIds.push(item.id);
        });
      this.algIds = algIds;
      // deviceId
      const deviceId = [];
      deviceId.push(this.$store.state.deviceId);
      this.deviceIds = deviceId;
      //  时间
      let timeData = [];
      timeData = this.form.dynamicItem;
      timeData.map((item) => {
        this.time.push({
          yearMonthDayStart: item.time1[0],
          yearMonthDayEnd: item.time1[1],
          hourMinuteStart: item.time2[0],
          hourMinuteEnd: item.time2[1],
        });
      });
      const params = {
        name: this.rulesForm.name,
        deviceIds: this.deviceIds,
        userIds: this.userIds,
        algIds: this.algIds,
        warningId: this.formList.n,
        time: this.time,
      };
      //  console.log('params',params);
      if (params.name === "") {
        this.$message({
          message: "监管场景不能为空!",
          type: "warning",
        });
      } else {
        if (params.algIds.length <= 0) {
          this.$message({
            message: "算法不能为空!",
            type: "warning",
          });
        } else {
          if (params.warningId === undefined) {
            this.$message({
              message: "预警名称不能为空!",
              type: "warning",
            });
          } else {
            if (params.time.length <= 0) {
              this.$message({
                message: "预警时间不能为空!",
                type: "warning",
              });
            } else {
              if (params.userIds.length <= 0) {
                this.$message({
                  message: "通知对象不能为空!",
                  type: "warning",
                });
              }
            }
          }
        }
      }
      if (
        this.rulesForm.name &&
        this.deviceIds &&
        this.deviceIds.length > 0 &&
        this.userIds &&
        this.userIds.length > 0 &&
        this.algIds &&
        this.algIds.length > 0 &&
        this.time &&
        this.time.length > 0 &&
        this.formList.n
      ) {
        deviceApi.sceneSave(params).then((res) => {
          //  console.log('res',res);
          this.$bus.$emit("getScenceUpdate");
          this.$message.success("添加成功");
          this.closeAddScence();
        });
      }
    },
    // 算法-删除
    handleDelete1(scope) {
      this.$confirm(
        "确定删除后当前内容将无法找回，请谨慎操作！",
        "确认要删除这条内容吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.mySelectAlogorithum.splice(scope.$index, 1);
          for (var i = 0; i < this.algIds.length; i++) {
            if (this.algIds[i] === scope.row.id) {
              this.algIds.splice(i, 1);
            }
          }
          // this.removeIndex1 = scope.row.id
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消成功！",
          });
        });
    },

    // 通知-删除
    handleDelete2(scope) {
      this.$confirm(
        "确定删除后当前内容将无法找回，请谨慎操作！",
        "确认要删除这条内容吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.mySelectNotifier.splice(scope.$index, 1);
          for (var i = 0; i < this.userIds.length; i++) {
            if (this.userIds[i] === scope.row.id) {
              this.userIds.splice(i, 1);
            }
          }
          // this.removeIndex2 = scope.row.id
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消成功！",
          });
        });
    },
    // 切换tab栏
    handleClick(tab, event) {},
    // 关闭弹框
    closeAddScence() {
      this.$emit("closeAddScence");
    },
    // 取消
    cancle() {
      this.closeAddScence();
    },
    //
    openAdd() {
      //  console.log('dakia');
    },
    // 打开通知人
    addNotifier() {
      this.$emit("addNotifier", this.mySelectNotifier);
    },
    // 打开算法
    addAlgorithum() {
      this.$emit("addAlgorithum", this.mySelectAlogorithum);
    },
    // 添加预警时间
    handleTime() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.dynamicItem.push({
            time1: "",
            time2: "",
          });
        } else {
          return false;
        }
      });
    },
    // 删除预警时间
    deleteItem(item, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.form.dynamicItem.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 预警时间切换
    handleChange(e) {
      this.warningList.map((item) => {
        if (item.id === e) {
          if (item.notificationType === "") {
            if (item.needConfirm === 1) {
              this.a = "人工二次确认";
              this.content = item.type + "|" + item.level + "|" + this.a;
            } else if (item.needConfirm === 0) {
              this.a = "";
              this.content = item.type + "|" + item.level;
            }
          } else {
            if (item.needConfirm === 1) {
              this.a = "人工二次确认";
              this.content =
                item.type +
                "|" +
                item.level +
                "|" +
                item.notificationType +
                "|" +
                this.a;
            } else if (item.needConfirm === 0) {
              this.a = "";
              this.content =
                item.type + "|" + item.level + "|" + item.notificationType;
            }
          }
        }
      });
    },

    // 下一步
    next() {
      if (this.activeName === "first") {
        this.activeName = "second";
      } else if (this.activeName === "second") {
        this.activeName = "third";
      }
    },
    // 上一步
    previous() {
      if (this.activeName === "second") {
        this.activeName = "first";
      } else if (this.activeName === "third") {
        this.activeName = "second";
      }
    },
    closeRegion() {
      this.$emit("closeRegion", true);
    },
    confirm() {
      this.$emit("confirm", true);
    },
    cancel() {
      this.$emit("cancel");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.regionWarp {
  width: 730px;
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
    color:#25BCFF;
  }

  .imgIcon{
    width: 30px;
    height: 30px;
  }
  .line {
    width: 100%;
    border-bottom: 0.5px dotted rgba(151, 151, 151, 0.5);
  }
  .detail-message {
    margin-left: 10px;
    margin-top: 10px;
    font-size: 14px;
    color: #c0c4cc;
    display: flex;
  }
  .separator {
    color: #c0c4cc;
    margin: 0 5px;
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

// // 修改下拉框的样式
::v-deep .el-select {
  width: 100%;
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
/deep/.el-input__icon {
  height: 100%;
  width: 22px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 38px;
}
</style>