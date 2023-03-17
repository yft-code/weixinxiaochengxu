<template>
  <div class="addDevice">
    <el-dialog
      width="500px"
      :title="title1"
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
          ref="modelsList"
          :model="modelsList"
          label-width="140px"
          size="mini"
        >
          <div style="display: flex">
            <el-form-item label="模型类型" prop="isInternal">
              <el-select
                :disabled="modelType"
                @change="handleModelType"
                v-model="modelsList.isInternal"
                class="formInput"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in modelTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item v-if="floorDisable" label="应用楼层" prop="">
              <el-select
                :disabled="floorDisable"
                v-model="modelsList.floor"
                class="formInput"
                placeholder="请选择"
              >
              </el-select>
            </el-form-item>

            <el-form-item v-if="!floorDisable" label="应用楼层" prop="floor">
              <el-select
                :disabled="floorDisable"
                multiple
                v-model="modelsList.floor"
                class="formInput"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in constructionFloorList"
                  :key="item.id"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </div>

          <div style="display: flex">
            <el-form-item label="文件"> </el-form-item>
            <el-upload
              :on-remove="handleRemove"
              :on-change="onChange"
              class="upload-demo"
              action="#"
              accept=".zip"
              :file-list="fileList"
              :http-request="submitUpload"
              ref="upload"
              :before-upload="beforeUpload"
            >
              <el-button
                size="small"
                type="primary"
                :loading="loadingUploadButton"
                >{{ uploadButton }}</el-button
              >
              <div class="progressPercent">
                <el-progress
                  v-if="progressFlag"
                  :percentage="progressPercent"
                ></el-progress>
              </div>
            </el-upload>
          </div>
          <div style="margin-left: 75px">
            是否启用
            <el-switch
              :disabled="switchDisabled"
              style="margin-left: 8px"
              v-model="modelsList.state"
              active-color="#347FFF"
              inactive-color="#FF3A3A"
            >
            </el-switch>
            <el-button
              size="mini"
              type="info"
              style="margin-left: 8px"
              v-if="type1 === 'edit'"
              :disabled="noDelete"
              @click="handleModelDelete"
              >删除模型</el-button
            >
            <!-- <el-button style="margin-left:8px"   size="small" @click="handlePreview"  :disabled="switchDisabled">预览</el-button> -->
          </div>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleAddDevice"
          :disabled="loadingUploadButton"
          :loading="loading1"
        >
          确 定</el-button
        >
      </div>
    </el-dialog>
    <preview @closePreview="closePreview" :visible="PreviewFlag" />
  </div>
</template>

<script>
import preview from "./preview";
import {
  modelSave,
  modelUpdate,
  getBuildingFloorList,
  uploadModel,
  modelDelete,
} from "../../../../api/ai/constructionManagement";
export default {
  name: "index",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    row1: {},
    disableFlag1: {
      type: Boolean,
      default: false,
    },
    constructionFloorList: {
      type: Array,
      default: [],
    },
    type1: {
      type: String,
      default: "",
    },
    constructionId: {
      type: String,
      default: "",
    },
    title1: {
      type: String,
      default: "",
    },
  },
  components: { preview },
  data() {
    return {
      progressFlag: false,
      progressPercent: 0,
      noDelete: false,
      loadingUploadButton: false,
      fileList: [],
      stateDisable: false,
      floorDisable: false,
      modelType: false,
      previewDisabled: true,
      switchDisabled: true,
      value: true,
      PreviewFlag: false,
      uploadButton: "点击上传",
      filename: "",
      path: "",
      buildingName: [],
      files: {},
      buildingNameList: [],
      modelsList: {
        buildingId: this.constructionId,
        floor: [],
        filename: "",
        isInternal: "",
        state: false,
        path: "",
      },

      modelTypeList: [
        { id: 0, name: "内部" },
        { id: 1, name: "外部" },
      ],
      floorList: [],
      loading1: false,
      fileList: [],
      files: {},
      loading: false,
      screenHeight1: document.body.clientHeight - 300,
      screenHeight: document.body.clientHeight - 340,
      windowWidth: document.documentElement.clientWidth,

      rules: {
        isInternal: [
          { required: true, message: "请选择模型类型", trigger: "blur" },
        ],
        floor: [{ required: true, message: "请选择应用楼层", trigger: "blur" }],
      },
    };
  },
  created() {},
  watch: {
    visible() {
      if (this.type1 === "edit") {
        this.progressFlag = false;
        this.progressPercent = 0;
        this.loadingUploadButton = false;
        this.fileList = [];
        this.modelType = true;

        if (this.row1.filename !== "") {
          this.switchDisabled = false;
          this.uploadButton = "替换文件";
        } else {
          this.switchDisabled = true;
          this.uploadButton = "上传文件";
        }
        this.modelsList = this.row1;

        if (this.modelsList.isInternal === 1) {
          this.floorDisable = true;
        } else {
          this.floorDisable = false;
        }
        if (this.modelsList.isInternal === 0) {
          var arrIntCzfaIds = [];
          for (var arrInt in this.modelsList.floor) {
            if (isNaN(parseInt(this.modelsList.floor[arrInt]))) {
            } else {
              arrIntCzfaIds.push(parseInt(this.modelsList.floor[arrInt]));
            }
          }
        }
        this.modelsList.floor = arrIntCzfaIds;
        this.modelsList.state = this.row1.state ? false : true;
        if (this.modelsList.state) {
          this.noDelete = true;
        } else {
          this.noDelete = false;
        }

        if (this.modelsList.filename !== "") {
          this.fileList.push({
            name: this.modelsList.filename,
            url: this.modelsList.path,
          });
        } else {
          this.fileList = [];
        }
      } else {
        this.progressFlag = false;
        this.progressPercent = 0;
        this.loadingUploadButton = false;
        this.fileList = [];
        this.floorDisable = false;
        this.modelType = false;
        this.stateDisable = true;
        this.switchDisabled = true;
        this.uploadButton = "点击上传";
        this.modelsList = {
          buildingId: this.constructionId,
          filename: "",
          floor: [],
          isInternal: "",
          state: false,
          path: "",
          id: "",
        };
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
    // 文件删除
    handleRemove() {
      this.$set(this.fileList, this.fileList, "");
      this.switchDisabled = true;
      this.stateDisable = true;
      this.uploadButton = "点击上传";
      (this.modelsList.filename = ""), (this.modelsList.state = false);
      this.modelsList.path = "";
    },

    // 文件覆盖
    onChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
    },

    handleModelType(e) {
      if (e === 0) {
        this.floorDisable = false;
      } else if (e === 1) {
        this.modelsList.floor = []
        this.floorDisable = true;
        // this.floor = '无'
      }
    },

    handleModelDelete() {
      this.$confirm("会删除该模型文件！", "确认要删除这条内容吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            id: this.modelsList.id,
          };
          modelDelete(params).then((res) => {
            this.$emit("close-callback1", "yes");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },

    getBuildingFloorList() {
      const params = {
        id: this.constructionId,
      };
      getBuildingFloorList(params).then((res) => {
        this.floorList = res.result.list;
      });
    },

    beforeUpload(file) {
      this.progressPercent = 0;
      this.files = file;
    },

    // 确认上传
    submitUpload() {
      this.loadingUploadButton = true;
      this.countdown();
    },

    countdown() {
      let fileFormData = new FormData();
      fileFormData.append("file", this.files); // 上传的文件
      this.progressFlag = true;
      this.handleTimer();
      uploadModel(fileFormData)
        .then((res) => {
          // 上传请求
          this.uploadButton = "替换文件";
          this.switchDisabled = false;
          this.previewDisabled = false;
          this.modelsList.filename = res.result.filename;
          this.modelsList.path = res.result.path;
          this.loadingUploadButton = false;
          this.closeTime();
          this.progressPercent = 100;
        })
        .catch((err) => {
          this.closeTime();
          this.loadingUploadButton = false;
          this.uploadButton = "上传文件";
          this.progressFlag = false;
          this.fileList = [];
          this.$message({
            message: "上传失败",
            type: "warning",
          });
        });
    },

    countdown1() {
      this.progressPercent += 1;
      if (this.progressPercent >= 99) {
        this.closeTime();
      }
    },

    closeTime() {
      clearInterval(this.timer);
    },

    handleTimer() {
      const that = this;
      this.timer = setInterval(function () {
        that.countdown1();
      }, 100);
    },

    handlePreview() {
      this.PreviewFlag = true;
    },

    closePreview() {
      this.PreviewFlag = false;
    },

    handleAddDevice() {
      this.$refs.modelsList.validate((valid) => {
        if (valid) {
          if (!this.loading1) {
            this.loading1 = true;
            setTimeout(() => {
              this.loading1 = false;
            }, 3000);
            if (this.type1 === "add") {
              let fl = [];
              this.modelsList.floor.forEach(function (item) {
                fl.push(item);
              });
              fl = fl.join(",");
              const modelsList = {
                buildingId: this.constructionId,
                filename: this.modelsList.filename,
                floor: fl,
                isInternal: this.modelsList.isInternal,
                state: this.modelsList.state ? 0 : 1,
                path: this.modelsList.path,
              };
              if (this.modelsList.isInternal === 1) {
                this.$delete(modelsList, "floor");
              }

              modelSave(modelsList).then((res) => {
                this.$message({
                  message: "添加成功",
                  type: "success",
                });

                this.loading1 = false;
                this.$emit("close-callback1", "yes");
              });
            } else if (this.type1 === "edit") {
              if (this.modelsList.isInternal === 1) {
                const modelsList = {
                  buildingId: this.constructionId,
                  filename: this.modelsList.filename,
                  isInternal: this.modelsList.isInternal,
                  state: this.modelsList.state ? 0 : 1,
                  path: this.modelsList.path,
                  id: this.modelsList.id,
                };
                modelUpdate(modelsList).then((res) => {
                  this.$message({
                    message: "编辑成功",
                    type: "success",
                  });
                  this.loading1 = false;
                  this.$emit("close-callback1", "yes");
                });
              } else {
                let fl = [];
                this.modelsList.floor.forEach(function (item) {
                  fl.push(item);
                });
                fl = fl.join(",");
                const modelsList = {
                  buildingId: this.constructionId,
                  filename: this.modelsList.filename,
                  floor: fl,
                  isInternal: this.modelsList.isInternal,
                  state: this.modelsList.state ? 0 : 1,
                  path: this.modelsList.path,
                  id: this.modelsList.id,
                };
                modelUpdate(modelsList).then((res) => {
                  this.$message({
                    message: "编辑成功",
                    type: "success",
                  });
                  this.loading1 = false;
                  this.$emit("close-callback1", "yes");
                });
              }
            }
          }
        } else {
          return false;
        }
      });
    },

    handleClose() {
      this.closeTime();
      this.loading = false;
      // 该方法用于关闭弹窗
      this.modelsList = {
        buildingId: this.constructionId,
        filename: "",
        floor: [],
        isInternal: "",
        state: "",
        path: "",
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
/deep/ .el-button--info.is-disabled {
  background: #f1f2f3;
  color: #c4c8ce;
}

/deep/ .el-button--info {
  background: #f1f2f3;
  color: #c4c8ce;
  border: 1px #f1f2f3 solid;
}
.progressPercent {
  width: 155px;
  margin-left: 10px;
  margin-top: 10px;
  display: inline-block;
  //  margin-bottom: 10px;
}
/deep/ .el-upload__input {
  display: none;
}
::v-deep .el-message-box__message p {
  width: 200px !important;
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
  }
}
</style>
