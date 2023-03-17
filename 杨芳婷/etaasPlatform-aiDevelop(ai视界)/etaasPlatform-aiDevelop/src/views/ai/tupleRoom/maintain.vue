<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <div class="content">
        <el-form
          ref="deviceForm"
          :model="form"
          :rules="deviceRules"
          :inline="true"
          class="form"
           size="small"
        >
          <el-form-item label="元组件名称" prop="name">
            <el-input
              v-model="form.name"
              class="formInput"
              placeholder="请输入"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="btn-group">
            <el-button type="primary" @click="handleCheck" size="small"
              >搜索</el-button
            >
            <el-button @click="handleReset" size="small">清空</el-button>
          </el-form-item>
        </el-form>
        <div class="form_br"></div>
        <div class="form_bottom1">
          <div>
            <el-button type="primary" size="small" @click="add('添加')"
              >添加</el-button
            >
          </div>
        </div>
        <div class="deviceTable">
          <el-table
            v-loading="loading"
            ref="multipleTable"
            :data="tableData"
            :header-cell-style="{ 'font-size': '16PX' }"
            :cell-style="{ 'font-size': '15PX' }"
            style="width: 100%"
            tooltip-effect="dark"
          >
            <el-table-column label="编号" prop="num" width="100">
              <template slot-scope="scope">
                <div>{{ scope.row.num }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="组件名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="size"
              label="组件size_mm"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="filename"
              label="IFC文件"
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" @click="checkEdit('编辑', scope.row)"
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
    <div class="word_photo">
      <el-dialog
        :title="this.title"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose"
      >
        <div class="addContainer">
          <el-form
            :model="componentForm"
            :rules="rules"
            ref="componentForm"
            label-width="120px"
          >
            <el-form-item label="组件类型" prop="type">
              <el-select
                style="width: 75%"
                v-model="componentForm.type"
                class="formInput"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in typeLists"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="组件size_mm" prop="size">
              <el-input
                maxlength="36"
                style="width: 75%"
                v-model="componentForm.size"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="组件名称" prop="name">
              <el-input
                style="width: 75%"
                v-model="componentForm.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="文件" prop="filename" ref="filename">
              <el-upload
                class="upload-demo"
                ref="rebateUpload"
                accept="image/png,image/gif,image/jpg,image/jpeg"
                action="#"
                :on-exceed="uploadExceed"
                :on-change="getLocalImg"
                :limit="1"
                :before-upload="beforeUpload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :show-file-list="false"
              >
                <el-button v-if="this.src === ''" size="small" type="primary"
                  >上传文件</el-button
                >
                <el-button v-else size="small" type="primary"
                  >替换文件</el-button
                >
              </el-upload>
            </el-form-item>

            <el-form-item label="">
              <div v-if="this.src !== ''" style="height: 110px">
                <div class="img-container">
                  <img class="img-self" :src="src" width="100" height="100" />
                  <!-- <i class="iconfont icon-close_fill icon-close" @click="deleteImg()"></i> -->
                  <p class="pic-name">{{ componentForm.filename }}</p>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="handleClose()">取消</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="httpRequest('componentForm')"
            >确定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/ai/earlyWarning";
import * as capi from "@/api/ai/tuple.js";
export default {
  data() {
    const validatePhoto = (rule, value, callback) => {
      if (!this.componentForm.filename) {
        callback(new Error("文件不能为空"));
      } else {
        callback();
      }
    };
    return {
      deviceRules:{
        name:[{
           max:50,message: "元组件名称不可超过16个字符", trigger: "blur" 
        }]
      },
      rules: {
        type: [{ required: true, message: "类型不能为空", trigger: "change" }],
        size: [
          { required: true, message: "大小不能为空", trigger: "blur" },
          {
            pattern: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
            message: "只能输入正数",
            trigger: "blur",
          },
        ],
        filename: [
          { required: true, trigger: "blur", validator: validatePhoto },
        ],
        name: [
          { required: true, message: "名字不能为空", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "名字长度在 2 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
      src: "",
      // 组件类型列表
      typeLists: [],
      //  图片文件
      fileList: [],
      file: {},
      componentForm: {
        src: "",
        size: "",
        name: "",
        path: "",
        type: "",
        filename: "",
        picName: "",
      },
      dialogVisible: false,
      flag: false,
      num: 0,
      floor: "",
      areaName: "",
      deviceName: "",
      name: "",
      parkName: "",
      buildingName: "",
      id: "",
      loading: false,
      sceneList: [],
      //算法列表
      aloList: [],
      tableData: [
        //   {
        //   id:'1212',
        //   size: '22222',
        //     name:'22222',
        //     path:'22222',
        //     type:'2222',
        //     filename:'2222'
        // }
      ],
      form: {},
      value1: "",
      row: {},
      title: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "fetchData",
  },
  created() {
    this.$bus.$on("getNewData", () => {
      this.typeList();
    });
    this.fetchData(this.form);
    this.typeList();
  },
  methods: {
    // 编辑
    checkEdit(val, row) {
      this.title = "编辑";
      this.dialogVisible = true;
      this.row = JSON.parse(JSON.stringify(row));
      this.componentForm = this.row;
      this.componentForm.filename = this.row.filename;
      this.src = "";
      this.src = this.row.path;
    },
    // 删除元组件
    handleDelete(id) {
      this.$confirm("确认要删除这条内容吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            id: id,
          };
          capi
            .deleteCompoment(params)
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
    // 删除预览得图片
    deleteImg() {
      this.src = "";
    },
    // 获取本地的图片
    getLocalImg(event, fileList) {
      // 去除文件名过长的文件
      // 获取上传图片的本地url，用于上传前的本地预览
      let url = "";
      if (window.createObjectURL !== undefined) {
        url = window.createObjectURL(event.raw);
      } else if (window.URL !== undefined) {
        url = window.URL.createObjectURL(event.raw);
      } else if (window.webkitURL !== undefined) {
        url = window.webkitURL.createObjectURL(event.raw);
      }
      this.src = url;
      let self = this;
      //强制刷新，嵌套太深
      self.$forceUpdate();
      this.$refs.filename.clearValidate();
    },
    //将超出得文件删除
    uploadExceed(files, fileList) {
      this.componentForm.filename = files[0].name;
      this.$set(fileList[0], "raw", files[0]);
      this.$set(fileList[0], "name", files[0].name);
      this.$refs["rebateUpload"].clearFiles(); // 清除文件
      this.$refs["rebateUpload"].handleStart(files[0]); // 选择文件后的赋值方法
    },
    beforeUpload(file) {
      this.file = file;
      this.componentForm.filename = file.name;
      const promise = new Promise((resolve) => {
        this.$nextTick(function () {
          resolve(true);
        });
      });
      return promise;
    },
    // 保存和编辑
    httpRequest(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === "添加") {
            let formData = new FormData();
            formData.set("file", this.file);
            formData.set("id", this.id);
            api
              .uploadFile(formData)
              .then((res) => {
                this.componentForm.path = res.result;
                this.submit("componentForm");
                this.fetchData(this.form);
                this.handleClose();
              })
              .catch((err) => {
                if (err) {
                  this.file = {};
                }
              });
          } else {
            if (this.file.name) {
              let formData = new FormData();
              formData.set("file", this.file);
              formData.set("id", this.id);
              api
                .uploadFile(formData)
                .then((res) => {
                  this.componentForm.path = res.result;
                  this.editComponent("componentForm");
                })
                .catch((err) => {
                  if (err) {
                    this.file = {};
                  }
                });
            } else {
              this.editComponent("componentForm");
              this.fetchData(this.form);
              this.handleClose();
            }
          }
        }
      });
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    //  添加元组件
    handleClose() {
      this.dialogVisible = false;
      this.resetForm("componentForm");
    },
    //  获取元组件列表
    typeList() {
      capi
        .getTypeList()
        .then((res) => {
          this.typeLists = res && res.result;
        })
        .catch();
    },

    add(val) {
      this.title = val;
      this.dialogVisible = true;
      this.componentForm = {};
      this.src = "";
      this.resetForm("componentForm");
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            size: this.componentForm.size,
            name: this.componentForm.name,
            filename: this.componentForm.filename,
            path: this.componentForm.path,
            type: this.componentForm.type,
          };
          capi
            .addComponent(params)
            .then(() => {
              this.$message.success("添加成功");
              this.fetchData(this.form);
              this.handleClose();
            })
            .catch();
        }
      });
    },
    // 编辑
    editComponent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          capi
            .updateCompoment(this.row)
            .then(() => {
              this.$message.success("编辑成功");
              this.fetchData(this.form);
              this.handleClose();
            })
            .catch();
        }
      });
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },

    fetchData(params) {
      this.loading = true;
      const current = this.currentPage;
      const limit = this.pageSize;
      params.limit = limit;
      params.current = current;
      capi
        .getComponent(params)
        .then((res) => {
          this.tableData = res.result && res.result.list;
          this.tableData.map((element, index) => {
            element.num = (this.currentPage - 1) * this.pageSize + index + 1;
          });
          this.total = res.result.total;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
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
    handleSelectionChange(val) {
      this.eventList = val;
    },
    handleReset() {
      this.form = {};
      this.form.alarmStartTime = "";
      this.form.alarmEndTime = "";
      this.value1 = "";
      this.currentPage = 1;
      this.fetchData(this.form);
    },
    handleCheck() {
        this.$refs['deviceForm'].validate((valid) => {
          if (valid) {
           this.currentPage = 1;
           this.fetchData(this.form);
          }
        })
     
    },
    handleAdd() {
      this.showAdd = true;
    },
    handleImport() {
      this.showImport = true;
    },
    closeCallback() {
      this.showImport = false;
      this.$message({
        message: "取消成功",
        type: "success",
      });
    },
    closeCallback1() {
      this.showEdit = false;
      this.$message({
        message: "编辑成功",
        type: "success",
      });
    },
    closeCallback2() {
      this.showAdd = false;
      this.$message({
        message: "添加成功",
        type: "success",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-upload__input {
  display: none;
}
.img-container {
  position: relative;
  width: 300px;
  background-color: red;
}
.img-self {
  position: absolute;
  top: 0px;
  left: 0px;
}
.icon-close {
  position: absolute;
  top: -15px;
  left: 90px;
  font-size: 20px;
  opacity: 0;
  color: rgb(105, 102, 105);
}
.icon-close:hover {
  position: absolute;
  top: -15px;
  left: 90px;
  font-size: 20px;
  opacity: 1;
  color: rgb(105, 102, 105);
}
.pic-name {
  position: absolute;
  top: 105px;
}
// /deep/.el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name {
//     display: none;
// }
.deviceContainer {
  width: 100%;
  .deviceContent {
    margin: 0 auto;
    border-radius: 8px;
    box-sizing: border-box;
    background:#fff;
    .content {
      margin: 0 auto;
      padding-top: 24px;
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
      .bb {
        width: 110px;
        display: inline-block;
        font-size: 14px;
      }
      .btn-group {
        margin-left: 40PX;
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
      margin-top: 24px;
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
