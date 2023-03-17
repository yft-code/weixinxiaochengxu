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
              <el-select
                v-model="ruleForm.parkName"
                @change="handleChange1"
                class="formInput"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in parkNameList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item label="建筑名称" prop="buildingName">
              <el-select
                v-model="ruleForm.buildingName"
                @change="handleChange"
                class="formInput"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in buildingNameList"
                  :key="item.id"
                  :label="item.buildingName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item v-if="type === 'add'" label="楼层" prop="floor1">
              <el-select
                v-model="ruleForm.floor"
                class="formInput"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in floorList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="type === 'edit'" label="楼层" prop="floor">
              <el-select
                v-model="ruleForm.floor"
                class="formInput"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in floorList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item label="区域名称" prop="name">
              <el-input
                style="width: 200px"
                maxlength="36"
                v-model="ruleForm.name"
                placeholder="请输入区域名称"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleAddDevice()"
          :loading="loading1"
        >
          确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { areaSave, areaUpdate } from "../../../../api/ai/region";
import {
  getBuildingParkList,
  getBuildingBuildingList,
  getBuildingFloorList,
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
      floorStorge: "",
      buildingNameStorge: "",
      buildingNameId: "",
      editBeforeId: this.row,
      parkNameList: [],
      buildingNameList: [],
      floorList: [],
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
        floor: null,
        name: "",
      },
      rules: {
        parkName: [
          { required: true, message: "请选择园区/厂区名称", trigger: "blur" },
        ],
        buildingName: [
          { required: true, message: "请选择建筑名称", trigger: "blur" },
        ],
        floor: [{ required: false, message: "请选择楼层", trigger: "blur" }],
        floor1: [{ required: false, message: "请选择楼层", trigger: "blur" }],
        name: [{ required: true, message: "请选择区域名称", trigger: "blur" }],
      },
    };
  },
  watch: {
    visible() {
      if (this.type === "edit") {
        this.ruleForm = this.row;
        if (this.ruleForm.floor === 0) {
          this.ruleForm.floor = null;
        }
        this.buildingNameList = [];
        this.floorList = [];
        // 园区列表
        this.getParkNameList();
        // 根据当前园区查询该园区的建筑列表
        this.handleChange2(this.ruleForm.parkName);
        // 区域的id
        this.editBeforeId = this.row.id;
      } else {
        this.buildingNameList = [];
        this.floorList = [];
        this.ruleForm = {
          parkName: "",
          buildingName: "",
          floor: "",
          areaName: "",
        };
      }
    },
  },
  created() {
    this.getParkNameList();
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
    handleChange1(e) {
       this.floorList=[]
      this.ruleForm.floor = "";
      this.ruleForm.buildingName = "";
      const params = {
        parkName: e,
      };
      getBuildingBuildingList(params).then((res) => {
        this.buildingNameList = res.result;
        if(this.buildingNameList&&this.buildingNameList.length>0){
          if(this.buildingNameList[0].buildingName==='全部'){
          this.buildingNameList.shift()
        }
        }
      });
    },
    handleChange2(e) {
      const params = {
        parkName: e,
      };
      getBuildingBuildingList(params).then((res) => {
        this.buildingNameList = res.result;
        if(this.buildingNameList&&this.buildingNameList.length>0){
           if(this.buildingNameList[0].buildingName==='全部'){
              this.buildingNameList.shift()
        }
        }
        this.buildingNameList &&
          this.buildingNameList.map((item) => {
            if (item.buildingName === this.ruleForm.buildingName) {
              // 保存建筑id
              this.buildingNameId = item.id;
              this.handleChange3(this.buildingNameId);
            } else {
            }
          });
      });
    },
    handleChange(e) {
      this.buildingNameId = this.ruleForm.buildingName;
      this.ruleForm.floor = ''
      this.getFloorList(e);
    },

    handleChange3(e) {
      this.getFloorList(e);
    },
    getFloorList(e) {
      const params = {
        id: e,
      };
      getBuildingFloorList(params).then((res) => {
        this.floorList = res.result;
      });
    },
    getBuildingNameList() {
      getBuildingBuildingList().then((res) => {
        this.buildingNameList = res.result;
      });
    },
    getParkNameList() {
      getBuildingParkList().then((res) => {
        this.parkNameList = res.result;
        if(this.parkNameList&&this.parkNameList.length>0){
          if(this.parkNameList[0]==='全部'){
            this.parkNameList.shift()
          }
        }
      });
    },
    handleAddDevice() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.loading1) {
            this.loading1 = true;
            setTimeout(() => {
              this.loading1 = false;
            }, 3000);
            if (this.type === "add") {
              const params = {
                buildingId: this.buildingNameId,
                name: this.ruleForm.name,
                floor: this.ruleForm.floor,
              };
              areaSave(params).then((res) => {
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
                this.loading1 = false;
                this.$emit("close-callback1", "yes");
              });
            } else if (this.type === "edit") {
              if (this.ruleForm.floor === null) {
                this.ruleForm.floor = "";
              }
              const params = {
                buildingId: this.buildingNameId,
                name: this.ruleForm.name,
                floor: this.ruleForm.floor,
                id: this.editBeforeId,
              };
              areaUpdate(params).then((res) => {
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
          return false;
        }
      });
    },
    handleClose() {
      this.loading = false;
      // 该方法用于关闭弹窗
      this.ruleForm = {
        parkName: "",
        buildingName: "",
        floor: "",
        name: "",
      };
      // parkNameList:[],
      (this.buildingNameList = []),
        (this.floorList = []),
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
  }
  ::v-deep .el-dialog__header {
    padding: 20px 20px;
  }
  ::v-deep .el-dialog__footer {
    padding: 30px 20px 20px;
  }
}
</style>
