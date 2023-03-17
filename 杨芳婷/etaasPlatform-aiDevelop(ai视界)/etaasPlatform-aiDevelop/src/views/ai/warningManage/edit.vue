<template>
  <div class="algorithm_update">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="600px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="edit_input">
        <div class="input_container">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="150px"
            class="demo-ruleForm"
            size="mini"
          >
            <el-form-item label="预警名称" prop="name">
              <el-input
                :disabled="editbutton"
                style="width: 252px"
                  maxlength="100"
                placeholder="请输入预警名称"
                v-model="ruleForm.name"
              ></el-input>
            </el-form-item>
            <el-form-item label="预警类型" prop="type">
              <el-select
                :disabled="editbutton"
                style="width: 252px"
                v-model="ruleForm.type"
                placeholder="请选择预警类型"
              >
                <el-option label="实时" value="实时"></el-option>
                <el-option label="非实时" value="非实时"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预警等级" prop="level">
              <el-select
                :disabled="editbutton"
                style="width: 252px"
                v-model="ruleForm.level"
                placeholder="请选择预警等级"
              >
                <el-option
                  v-for="item in WarningListLeve"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
                <!-- <el-option label="一级" value="一级"></el-option>
               <el-option label="二级" value="二级"></el-option>
               <el-option label="三级" value="三级"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="预警通知方式">
              <!-- <el-checkbox v-model="message">短信</el-checkbox> -->
              <el-checkbox v-model="email">邮箱</el-checkbox>
              <!-- <el-checkbox v-model="phone">电话</el-checkbox> -->
            </el-form-item>
             <el-form-item label="通知模板">
              <el-select
                style="width: 252px"
                v-model="ruleForm.mailTemplateId"
                placeholder="请选择预警类型"
              >
                <el-option v-for="item in templateList" 
                :key="item.id" 
                :label="item.name" 
                :value="item.id">
                </el-option>  
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="是否需要二次确定" prop="needConfirm" >
             <el-radio-group v-model="ruleForm.needConfirm">
               <el-radio :label="1">是</el-radio>
               <el-radio :label="0">否</el-radio>
             </el-radio-group>
           </el-form-item> -->
            <el-form-item label="事件预案" prop="warning">
              <el-upload
                ref="upload"
                :on-remove="handleRemove"
                :on-change="onChange"
                class="upload-demo"
                action=""
                :file-list="fileList"
                accept=".png,.jpg,.docx,.pdf"
                :http-request="submitUpload"
                :before-upload="beforeAvatarUpload"
              >
                <div class="loadImgeStyle">
                  <el-button :loading="fileLoading" type="primary">{{
                    uploadTitle
                  }}</el-button>
                </div>
              </el-upload>
              <!-- <el-input style="width: 252px" placeholder="请输入预警名称"  v-model="ruleForm.name"></el-input> -->
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="submit('ruleForm')"
          :disabled="fileButton"
          :loading="loading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/ai/warningManage";
import { getWarningListLeve, warningUpload,getTemplate } from "@/api/ai/warningManage";
export default {
  name: "edit",
  props: {
    primary: {},
    editbutton: {},
    row: {},
    control: {},
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    id: {},
    type: {
      type: String,
      default: "add",
    },
  },
  data() {
    return {
      templateList:[],
      fileLoading: false,
      fileButton: false,
      fileList: [],
      uploadTitle: "上传文件",
      // primary:'primary',
      // editButton: this.editbutton,
      WarningListLeve: [],
      file: null,
      loading: false,
      flag: true,
      phone: false,
      phones: "",
      message: false,
      messages: "",
      email: false,
      emails: "",
      ruleForm: {
        name: "",
        type: "",
        needConfirm: "",
        level: "",
        notificationType: null,
        file: "",
        fileName: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入预警名称", trigger: "blur" },
          { max: 50, message: "预警名称最多输入50个字符", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/,
            message: "预警名称不能包含特殊字符",
          },
        ],
        region: [
          { required: true, message: "请选择预警类型", trigger: "change" },
        ],
        level: [
          { required: true, message: "请选择预警等级", trigger: "change" },
        ],
        type: [
          {
            required: true,
            message: "请选择预警类型",
            trigger: "change",
          },
        ],
        warning: [
          { required: false, message: "请选择预案", trigger: "change" },
        ],
      },
    };
  },
  // created(){
  //     this.loading=false
  //     console.log('loadingXXXX',this.loading);
  // },
  mounted(){
     this.getData();
  },
  watch: {
    visible() {
      this.getWarningListLeve();
      if (this.type === "edit") {
        const params = {
          id: this.id,
        };

        if (this.control.flag === true) {
          this.getDetail(params);
        }
      } else {
        this.ruleForm = {
          name: "",
          type: "",
          needConfirm: "",
          level: "",
          notificationType: "",
          file: "",
          fileName: "",
        };
        this.fileList = [];
        this.file = null;
        this.email = false;
        this.message = false;
        this.phone = false;
        this.uploadTitle = "上传文件";
        this.resetForm("ruleForm");
      }
    },
  },
  methods: {
    getData(){
       getTemplate().then(res=>{
         if(res.result){
           this.templateList = res.result 
         }
          console.log(236,res)
       }).catch((error)=>{

       })
    },

    handleRemove() {
      // this.$set(this.fileList, this.fileList, "");
      this.$refs.upload.clearFiles();
      this.uploadTitle = "点击上传";
      this.file = "";
      this.ruleForm.file = "";
      this.ruleForm.fileName = "";
    },
    /**
     * 文件覆盖
     */
    onChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
    },
    submitUpload() {
      this.fileButton = true
      if (!this.fileLoading) {
        this.fileLoading = true;
        setTimeout(() => {
          this.fileLoading = false;
        }, 3000);
        let fileFormData = new FormData();
        fileFormData.append("file", this.file);
        warningUpload(fileFormData).then((res) => {
          this.ruleForm.file = res.message;
          this.ruleForm.fileName = this.file.name;
          this.uploadTitle = "替换文件";
          this.fileButton = false;
        });
      }
    },
    beforeAvatarUpload(file) {
      this.file = file;
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension =
        testmsg === "jpg" ||
        testmsg === "JPG" ||
        testmsg === "png" ||
        testmsg === "PNG" ||
        testmsg === "docx" ||
        testmsg === "DOCX" ||
        testmsg === "pdf" ||
        testmsg === "PDF";
      if (!extension) {
        this.$message({
          message: "上传预案只能是jpg、png、word、pdf",
          type: "error",
        });
        return false; //必须加上return false; 才能阻止
      }
    },
    getWarningListLeve() {
      getWarningListLeve().then((res) => {
        this.WarningListLeve = res.result;
        // console.log(this.WarningListLeve)
      });
    },
    // 通过id获取详情信息
    getDetail(id) {
      api
        .AlgorithmDetail(id)
        .then((res) => {
          console.log(res, "reeee");
          this.ruleForm = res.result;
          this.fileList = [];
          if (this.ruleForm.fileName && this.ruleForm.fileName !== "") {
            this.uploadTitle = "替换文件";
            this.fileList.push({
              name: this.ruleForm.fileName,
              url: this.ruleForm.file,
            });
          } else {
            this.uploadTitle = "上传文件";
            this.fileList = [];
            this.ruleForm.fileName = "";
            this.file = "";
          }
          const str = this.ruleForm.notificationType;
          if (str.indexOf("邮箱") != -1) {
            this.email = true;
          } else {
            this.email = false;
          }
          if (str.indexOf("短信") != -1) {
            this.message = true;
          } else {
            this.message = false;
          }
          if (str.indexOf("电话") != -1) {
            this.phone = true;
          } else {
            this.phone = false;
          }
        })
        .catch();
    },
    // 重置数据
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    // 关闭弹框
    handleClose() {
      // this.primary = 'primary'
      // this.editbutton = false
      this.message = false;
      this.email = false;
      this.control.flag = false;
      this.loading = false;
      this.$emit("close-callback");
    },
    handleClose1() {
      // this.primary = 'primary'
      // this.editbutton = false
      this.message = false;
      this.email = false;
      this.loading = false;
      this.$emit("close-callback1");
    },
    // 确定
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.loading) {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
            }, 3000);
            if (this.type === "add") {
              if (this.email) {
                this.emails = "邮箱,";
              } else {
                this.emails = "";
              }
              if (this.phone) {
                this.phones = "电话,";
              } else {
                this.phones = "";
              }
              if (this.message) {
                this.messages = "短信,";
              } else {
                this.messages = "";
              }
              let str = this.emails + this.phones + this.messages;
              this.ruleForm.notificationType = str.slice(0, -1);
              api
                .addWarning(this.ruleForm)
                .then(() => {
                  this.$message({
                    message: "添加成功",
                    type: "success",
                  });
                  this.ruleForm = {};
                  this.handleClose1();
                })
                .catch();
            } else if (this.type === "edit") {
              this.control.flag = false;
              if (this.email) {
                this.emails = "邮箱,";
              } else {
                this.emails = "";
              }
              if (this.phone) {
                this.phones = "电话,";
              } else {
                this.phones = "";
              }
              if (this.message) {
                this.messages = "短信,";
              } else {
                this.messages = "";
              }
              let str = this.emails + this.phones + this.messages;
              this.ruleForm.notificationType = str.slice(0, -1);
              api
                .warningUpdate(this.ruleForm)
                .then(() => {
                  this.handleClose1();
                  this.$message({
                    message: "修改成功",
                    type: "success",
                  });
                })
                .catch();
            }
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-upload-list__item {
  width: 300px;
}
/deep/ .el-upload__input {
  display: none;
}
/deep/.el-radio-group {
    font-size: 0;
    margin-top: 5PX;
}
/deep/.el-checkbox {
    margin-top: 5PX;
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
    // margin-top: -30px;
    border-top: 1px solid rgba(10, 25, 51, 0.05);
  }
  .input_container {
    width: 66%;
    margin: 10px auto;
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
</style>
