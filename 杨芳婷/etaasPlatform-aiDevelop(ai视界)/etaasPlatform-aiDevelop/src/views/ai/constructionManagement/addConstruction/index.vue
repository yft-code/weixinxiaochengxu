<template>
  <div class="addDevice">
    <el-dialog
      width="500px"
      :title="title"
      :visible.sync="visible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <div class="form_br"></div>
      <div style="overflow: auto" :style="{ maxHeight: `${screenHeight1}px` }">
        <el-form
          v-loading="loading"
          :rules="rules"
          ref="ruleForm"
          :model="ruleForm"
          label-width="140px"
          size="mini"
        >
          <div style="display: flex">
            <el-form-item label="园区/厂区名称" prop="parkName">
              <el-input
                style="width: 250px"
                maxlength="50"
                v-model="ruleForm.parkName"
                placeholder="请输入园区/厂区名称"
              ></el-input>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item label="建筑名称" prop="buildingName">
              <el-input
                style="width: 250px"
                maxlength="50"
                v-model="ruleForm.buildingName"
                placeholder="请输入建筑名称"
              ></el-input>
            </el-form-item>
          </div>
          <div class="tipFlag" v-if="tipFlag">该建筑名称已经存在</div>
          <!-- <div  style="display: flex">
          <el-form-item label="楼层范围" prop="floor">
             <el-input
                style="width: 200px"
                v-model="ruleForm.floor"
                placeholder="请输入建筑名称"
            ></el-input>
          </el-form-item>
        </div> -->
        </el-form>
      </div>

      <div style="display: flex">
        <el-form
        size="mini"
        :inline="true"
        ref="limitCommit"
        :rules="numberLimit()"
        :model="numLimit"
        label-width="140px"
        class="number-limit"
      >
        <el-form-item
          label="楼层范围"
          prop="limitLower"
        >
          <el-input
            :disabled="floorDisable"
            style="width: 100px"
            type="number"
            v-model.trim.number="questionCommit.limitLower"
            @input="checkNumber('lower')"
          ></el-input>
        </el-form-item>

        <span class="bTip">~</span>
        <el-form-item label="" prop="limitUpper">
          <el-input
           :disabled="floorDisable"
            style="width: 100px"
            type="number"
            v-model.trim.number="questionCommit.limitUpper"
            @input="checkNumber('upper')"
          ></el-input>
        </el-form-item>
      </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleAddDevice()"
          :disabled="checkHandle"
          :loading="loading1"
        >
          确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  buildingSave,
  buildingUpdate,
  buildingCheck,
} from "../../../../api/ai/constructionManagement";
export default {
  name: "index",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    disableFlag: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    row: {},
  },
  data() {
    return {
      floorDisable:false,
      checkHandle: false,
      numLimit: {},
      questionCommit: {
        limitLower: null,
        limitUpper: null,
      },
      tipFlag: false,
      buildingNameStorge: "",
      parkNameStorge: "",
      loading1: false,
      fileList: [],
      files: {},
      loading: false,
      screenHeight1: document.body.clientHeight - 300,
      screenHeight: document.body.clientHeight - 340,
      windowWidth: document.documentElement.clientWidth,
      ruleForm: {
        parkName: "",
        buildingName: "",
        floor: "",
      },
      rules: {
        parkName: [
          { required: true, message: "请输入园区/厂区名称", trigger: "blur" },
        ],
        buildingName: [
          { required: true, message: "请输入建筑名称", trigger: "blur" },
        ],
        // floor: [
        //    { required: true, message: "请输入建筑名称", trigger: "blur" }
        //   ],
      },
    };
  },
  watch: {
    tipFlag(n, o) {
      if (n) {
        this.checkHandle = true;
      } else {
        this.checkHandle = false;
      }
    },
    "ruleForm.buildingName": {
      handler(curVal, oldVal) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.buildingNameStorge = curVal;
          this.handleChangeBuildingName(curVal);
        }, 500);
      },
    },
    "ruleForm.parkName": {
      handler(curVal, oldVal) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.parkNameStorge = curVal;
          this.handleChangeParkName(curVal);
        }, 500);
      },
    },
    visible() {
      if (this.type === "edit") {
        this.floorDisable = true
        this.tipFlag = false;
        this.ruleForm = this.row;
        this.questionCommit.limitLower = this.row.floorLow;
        this.questionCommit.limitUpper = this.row.floorHigh;
      } else if (this.type === "add") {
        this.floorDisable = false
        this.tipFlag = false;
        (this.questionCommit.limitLower = null),
          (this.questionCommit.limitUpper = null),
          (this.parkNameStorge = ""),
          (this.buildingNameStorge = ""),
          (this.ruleForm = {
            parkName: "",
            buildingName: "",
            floor: "",
          });
      }
    },
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight - 300;
        that.screenHeight1 = window.screenHeight;
      })();
    };
  },
  methods: {
    checkNumber(type) {
      if (type === "lower") {
        this.$refs.limitCommit.validateField("limitUpper");
      } else {
        this.$refs.limitCommit.validateField("limitLower");
      }
    },

    numberLimit() {
      return {
        limitLower: [
          {
            validator: (rule, value, cb) => {
              const low = this.questionCommit.limitLower;
              if (
                (low || low === 0) &&
                (this.questionCommit.limitUpper ||
                  this.questionCommit.limitUpper === 0) &&
                low > this.questionCommit.limitUpper
              ) {
                cb(new Error("最小楼层必须小于最大楼层！"));
              } else if (low === 0) {
                cb(new Error("楼层不能选择0！"));
              }else if(low<-128){
                cb(new Error("最小楼层不能小于128！"));
              } else if (this.questionCommit.limitLower === "") {
                cb(new Error("请选择最小楼层！"));
              }
              cb();
            },
            required: true,
            trigger: ["blur", "change"],
          },
        ],
        parkName: [
          { required: true, message: "请输入园区/厂区名称1", trigger: "blur" },
        ],
        buildingName: [
          { required: true, message: "请输入建筑名称1", trigger: "blur" },
        ],
        limitUpper: [
          {
            validator: (rule, value, cb) => {
              const upp = this.questionCommit.limitUpper;
              if (
                (upp || upp === 0) &&
                (this.questionCommit.limitLower ||
                  this.questionCommit.limitLower === 0) &&
                upp < this.questionCommit.limitLower
              ) {
                cb(new Error("最大楼层必须大于最小楼层！"));
              } else if (upp === 0) {
                cb(new Error("楼层不能选择0！"));
              }else if(upp>127){
                 cb(new Error("最大楼层不能大于127！"));
              }
              else if (this.questionCommit.limitUpper === "") {
                cb(new Error("请选择最大楼层！"));
              }
              cb();
            },
            required: true,
            trigger: ["blur", "change"],
          },
        ],
      };
    },

    handleChangeParkName(value) {
      if (value === "") {
        return false;
      } else if (value !== "" && this.buildingNameStorge !== "") {
        const params = {
          parkName: this.parkNameStorge,
          buildingName: this.buildingNameStorge,
        };
        if (this.type === "add") {
          buildingCheck(params)
            .then((res) => {
              if (res.success === false) {
                this.tipFlag = true;
              } else {
                this.tipFlag = false;
              }
            })
            .catch((err) => {
              this.tipFlag = true;
            });
        } else if (this.type === "edit") {
          params.id = this.ruleForm.id;
          buildingCheck(params)
            .then((res) => {
              if (res.success === false) {
                this.tipFlag = true;
              } else {
                this.tipFlag = false;
              }
            })
            .catch((err) => {
              this.tipFlag = true;
            });
        }
      }
    },

    handleChangeBuildingName(value) {
      if (value === "") {
        this.tipFlag = false;
        return false;
      } else if (value !== "" && this.parkNameStorge !== "") {
        const params = {
          parkName: this.parkNameStorge,
          buildingName: this.buildingNameStorge,
        };
        if (this.type === "add") {
          buildingCheck(params)
            .then((res) => {
              if (res.success === false) {
                this.tipFlag = true;
              } else {
                this.tipFlag = false;
              }
            })
            .catch((err) => {
              this.tipFlag = true;
            });
        } else if (this.type === "edit") {
          params.id = this.ruleForm.id;
          buildingCheck(params)
            .then((res) => {
              if (res.success === false) {
                this.tipFlag = true;
              } else {
                this.tipFlag = false;
              }
            })
            .catch((err) => {
              this.tipFlag = true;
            });
        }
        buildingCheck(params)
          .then((res) => {})
          .catch((err) => {
            this.tipFlag = true;
          });
      }
    },

    handleAddDevice() {
      if (this.questionCommit.limitLower === "") {
        this.questionCommit.limitLower = null;
      }
      if (this.questionCommit.limitUpper === "") {
        this.questionCommit.limitUpper = null;
      }
      this.$refs.ruleForm.validate((valid) => {
        if (
          valid &&
          this.questionCommit.limitLower !== null &&
          this.questionCommit.limitUpper !== null &&
          this.questionCommit.limitLower !== 0 &&
          this.questionCommit.limitUpper !== 0 && 
          this.questionCommit.limitLower>=-128&&
          this.questionCommit.limitUpper<=127&&
          this.questionCommit.limitLower<=this.questionCommit.limitUpper
        ) {
          if (!this.loading1) {
            this.loading1 = true;
            setTimeout(() => {
              this.loading1 = false;
            }, 3000);
            if (this.type === "add") {
              const ruleForm = {
                parkName: this.ruleForm.parkName,
                buildingName: this.ruleForm.buildingName,
                floorHigh: this.questionCommit.limitUpper,
                floorLow: this.questionCommit.limitLower,
              };
              buildingSave(ruleForm).then((res) => {
                this.$message({
                  message: "添加成功",
                  type: "success",
                });

                this.loading1 = false;
                this.$emit("close-callback1", "yes");
              });
            } else if (this.type === "edit") {
              const ruleForm = {
                parkName: this.ruleForm.parkName,
                buildingName: this.ruleForm.buildingName,
                floorHigh: this.questionCommit.limitUpper,
                floorLow: this.questionCommit.limitLower,
                id: this.ruleForm.id,
              };
              buildingUpdate(ruleForm).then((res) => {
                this.$message({
                  message: "编辑成功",
                  type: "success",
                });
                this.loading1 = false;
                this.$emit("close-callback1", "yes");
              });
            }
          }
        } else {
          if (this.questionCommit.limitLower === null) {
            this.questionCommit.limitLower = "";
          }
          if (this.questionCommit.limitUpper === null) {
            this.questionCommit.limitUpper = "";
          }

          return false;
        }
      });
    },

    handleClose() {
      (this.questionCommit.limitLower = null),
        (this.questionCommit.limitUpper = null);
      this.loading = false;
      this.tipFlag = false;
      // 该方法用于关闭弹窗
      this.ruleForm = {
        parkName: "",
        buildingName: "",
        floor: "",
      };
      this.$message({
        message: "取消成功",
        type: "success",
      });
      this.$emit("close-callback1", "no");
    },
  },
};
</script>

<style lang="scss" scoped>
.bTip {
  // background: red;
  height: 10px;
  display: inline-block;
  margin-right: 23PX;
  margin-left: 9PX;
  margin-top: 7PX;
}
/deep/ .el-input {
  width: 30%;
}
// .tip1{
//   background: royalblue;
//   padding-top: 10px;
// }
.tipFlag {
  color: red;
  text-align: center;
  margin-top: -20px;
  margin-bottom: 10px;
}
/deep/ .el-upload__input {
  display: none;
}
.addDevice {
  .upload {
    margin-left: 14px;
    margin-top: 10px;
  }
  ::v-deep .el-form-item__label {
    font-size: 14px;
  }
  .form_br {
    width: 100%;
    height: 1px;
    margin-bottom: 20px;
    background-color: #f3f3f5;
  }
  ::v-deep .el-dialog__body {
    padding: 0px 30px;
    //padding: 0px;
  }
  ::v-deep .el-dialog__header {
    padding: 20px 20px;
  }
  ::v-deep .el-dialog__footer {
    padding: 30px 20px 20px;
    //  box-shadow: 0px 9px 28px 8px rgba(6, 16, 48, 0.05),
    //    0px 6px 16px 0px rgba(6, 16, 48, 0.08),
    //    0px 0px 7px -3px rgba(10, 25, 51, 0.2);
  }
}
</style>
