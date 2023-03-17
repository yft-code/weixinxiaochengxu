<template>
  <div class="algorithm_update">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :before-close="handleClose"
      width="600px"
      :close-on-click-modal="false"
    >
      <div class="edit_input">
        <div class="input_container">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="79px"
            class="demo-ruleForm"
            size="mini"
          >
            <el-form-item
              label="照片"
              ref="photo"
              class="word_photo"
              prop="path"
            >
              <!-- <el-input v-show="false" style="width: 252px" placeholder="请输入"  v-model="ruleForm.photo"></el-input> -->
              <el-upload
                accept="image/png,image/jpg,image/jpeg"
                ref="rebateUpload"
                class="avatar-uploader"
                :limit="1"
                :before-upload="beforeUpload"
                :file-list="fileList"
                :on-change="getLocalImg"
                :on-exceed="uploadExceed"
                :show-file-list="false"
                action="#"
              >
                <div class="edit_tip" v-if="this.type === 'edit'">
                  <p style="font-size: 12px">更换照片</p>
                </div>
                <div class="show_img" v-if="isHidden">
                  <i
                    class="el-icon-plus"
                    style="color: #d9d9d9; margin-top: 15px"
                  ></i>
                  <p style="font-size: 12px; color: #d9d9d9">上传照片</p>
                </div>
                <img
                  class="show_img"
                  v-if="!isHidden"
                  :src="ruleForm.path"
                  width="100%"
                  height="100%"
                />
              </el-upload>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input
                placeholder="请输入"
                v-model="ruleForm.name"
              ></el-input>
            </el-form-item>
            <el-form-item label="身份ID" prop="identityId">
              <el-input
                placeholder="请输入"
                v-model="ruleForm.identityId"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="联系方式" prop="number">
              <el-input
                style="width: 252px"
                placeholder="请输入"
                v-model="ruleForm.number"
              ></el-input>
            </el-form-item> -->
            <el-form-item label="脸库名称" prop="faceDbName">
               <el-select
               style="width:100%"
               v-model="ruleForm.faceDbName"
               :popper-append-to-body="false"
               class="formInput"
               placeholder="请选择"
               @change="changeFace"
            >
              <el-option
                v-for="item in faceLists"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input
                placeholder="请输入"
                v-model="ruleForm.remark"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          :loading="loading"
          @click="submit('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/ai/userManager.js";
import { log } from 'mathjs';
export default {
  name: "edit",
  props: {
    row: {},
    faceLists:{},
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
    const validatePhone = (rule, value, callback) => {
      const phone = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
      const tel = /\d{7,8}/;
      if (value) {
        if (/^1/.test(value)) {
          if (/^1\d{10}$/.test(value)) {
            callback();
          } else {
            callback(new Error("请输入11位的手机号"));
          }
        } else if (/^0/.test(value)) {
          if (/^0\d{2,4}-?\d{6,9}$/.test(value)) {
            callback();
          } else {
            callback(new Error("请用0xxx-xxxxxxx格式"));
          }
        } else {
          callback(new Error("请输入11位手机号或0xxx-xxxxxxx格式座机号"));
        }
      } else {
        callback();
      }
    };
    const validatePhoto = (rule, value, callback) => {
      if (!this.ruleForm.path) {
        callback(new Error("照片不能为空"));
      } else {
        callback();
      }
    };
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("名字不能为空"));
      } else if(!/^(?!_)/.test(value)) {
         callback(new Error("名字不能以下划线开头"));
        }else{
       callback();
      }
    };
    const validateId = (rule, value, callback) => {
      let id = /^[a-z0-9A-Z]+$/;
      let idNumber =
        /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
      if (!value) {
        callback(new Error("无身份证号时请输入身份代码(数字或字母组成)"));
      } else if (!id.test(value) && value.length <= 23) {
        callback(new Error("身份代码只能由数字或者字母组成，且不超过24位"));
      } else if (!idNumber.test(value) && value.length >= 24) {
        callback(new Error("请输入正确的身份证号或身份代码"));
      } else {
        callback();
      }
    };
    return {
      showPhoto:false,
      face:{},
      loading: false,
      form: {},
      blackId: "",
      pic: "",
      flag: false,
      active: "",
      isHidden: true,
      photo: "",
      ruleForm: {},
      rules: {
        path: [{ required: true, trigger: "blur", validator:validatePhoto }],
        name: [
          {required: true, trigger: "blur",validator:validateName},
          {
            min: 2,
            max: 16,
            message: "姓名长度在 2 到 16 个字符",
            trigger: "blur",
          },
        ],
        identityId: [
          { required: true, trigger: "blur", validator: validateId},
        ],
        faceDbName: [
            { required: true, message: '请选择脸库名称', trigger: 'change' }
          ],
        remark: [
          { max: 200, message: "备注最多只能输入200 个字符", trigger: "blur" },
        ],
      },
      fileList: [],
      file: "",
    };
  },
  watch: {
    visible() {
      if (this.type === "edit") {
        this.flag = false;
        this.isHidden = false;
        this.ruleForm = this.row;
         this.faceLists.map(val=>{
        if(this.row.faceDbName===val.name){
         this.face=val
        }
      })
        this.ruleForm.id = this.row.id;
        // 获取编辑时图片
        this.blackId = this.ruleForm.id;
        // this.ruleForm.path = this.ruleForm.path;
      } else {
        this.ruleForm = {};
        this.active = "";
        this.resetForm("ruleForm");
        this.isHidden = true;
      }
    },
  },
  methods: {
    changeFace(e){
      this.faceLists.map(val=>{
        if(e===val.name){
         this.face=val
        }
      })
    },
    uploadImg(id) {
      if (this.flag === true) {
        let formData = new FormData();
        formData.set("file", this.file);
        formData.set("blackId", id);
        api
          .addImg(formData)
          .then((res) => {
            // this.ruleForm.photo=res.photo
            this.ruleForm.path = res.photo;
            this.handleClose1();
          })
          .catch(() => {});
      }
    },
    // 重置数据
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    // 图片上传
    submit(formName) {
      let formData = new FormData();
      if(this.file){
        formData.append("file", this.file);
      }
      formData.append("name",this.ruleForm.name)
      formData.append("identityId",this.ruleForm.identityId)
      formData.append("faceDbName",this.ruleForm.faceDbName)
      formData.append("number",this.face.number)
      formData.append("faceDbId",this.face.id)
      formData.append("remark",this.ruleForm.remark?this.ruleForm.remark:'')
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.loading = true;
            if (this.type === "add") {
              // this.ruleForm.isActive = false;
              api
                .AddUser(formData)
                .then((res) => {
                  if(res.code===0){
                    this.$message({
                    message: "添加成功",
                    type: "success",
                  });
                  this.handleClose1();
                  this.handleClose();
                  }
                  if(res.code===1024){
                    this.$message({
                    message: "人脸注册失败，请重新上传人脸照片",
                    type: "warning",
                  });
                  }
                  // const blackId = res.result;s
                  // this.uploadImg(blackId);
                 
                })
                .catch(()=>{
                  this.loading=false
                });
            } else {
              formData.append('id',this.ruleForm.id)
              api
                  .updateUser(formData)
                  .then((res) => {
                    if(res.code===0){
                      this.$message({
                        message: "编辑成功",
                        type: "success",
                      });
                      this.handleClose1();
                      this.handleClose();
                    }
                      
                    if(res.code===1024){
                    this.$message({
                    message: "人脸注册失败，请重新上传人脸照片",
                    type: "warning",
                    });
                  }
                  })
                  .catch(()=>{
                    this.loading=false
                  });
            }
          
        }
      });
    },
    //关闭用
    handleClose() {
      this.$emit("close-callback");
      this.loading = false;
    },
    handleClose1() {
      this.$emit("close-callback1");
    },
    //文件的大小
    noMax(arr) {
      for (var i = 0; i < arr.length; i++) {
        const size = arr[i].size / 1024 / 1024;
        if (size > 1) {
          this.b = false;
          this.$message.warning("图片最大不能超过1MB");
          arr.splice(i, 1);
          i--;
        } else {
          this.b = true;
        }
      }
      return arr;
    },
    // 去除文件名过长的图片
    noLength(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name.length > 20) {
          this.a = false;
          this.$message.warning("图片名过长不支持上传");
          arr.splice(i, 1);
          i--;
        } else {
          this.a = true;
        }
      }
      return arr;
    },
    // 获取本地的图片
    getLocalImg(event, fileList) {
      if(this.showPhoto){
          // // 去除文件名过长的文件
      // 获取上传图片的本地url，用于上传前的本地预览
      let url = "";
      if (window.createObjectURL !== undefined) {
        url = window.createObjectURL(event.raw);
      } else if (window.URL !== undefined) {
        url = window.URL.createObjectURL(event.raw);
      } else if (window.webkitURL !== undefined) {
        url = window.webkitURL.createObjectURL(event.raw);
      }
      this.ruleForm.path = url;
      this.isHidden = false;
      let self = this;
      //强制刷新，嵌套太深
      self.$forceUpdate();
      this.showPhoto=false
      this.$refs.photo.clearValidate();
    }
  },
    beforeUpload(file) {
      let types = ['image/jpeg', 'image/jpg', 'image/png'];
          const isImage = types.includes(file.type)
          const isLtSize = file.size / 1024 /1024<1
          if(!isImage){
            this.$message.warning('上传图片只能是 JPG、JPEG、PNG 格式!')
            this.showPhoto=false
          }else{
            this.file=file
            this.showPhoto=true
          }
    },
    uploadExceed(files, fileList) {
      this.$set(fileList[0], "raw", files[0]);
      this.$set(fileList[0], "name", files[0].name);
      this.$refs["rebateUpload"].clearFiles(); // 清除文件
      this.$refs["rebateUpload"].handleStart(files[0]); // 选择文件后的赋值方法
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-upload__input {
  display: none;
}
.algorithm_update {
  /deep/.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/ .avatar-uploader .el-upload:hover {
    .edit_tip {
      opacity: 0.8;
    }
  }
  .edit_input {
    width: 99%;
    margin-top:-10px;
    border-top: 1px solid rgba(10, 25, 51, 0.05);
  }
  .input_container {
    width: 80%;
    margin: 20PX auto;
  }
  ::v-deep .el-dialog__title {
    color: #0a1933;
    // line-height: 60px;
    font-weight: 550;
  }
  .input_border {
    width: 99%;
    border-top: 1px solid rgba(10, 25, 51, 0.05);
    // margin: -50px auto;
    margin-bottom: 20px;
  }
  /deep/.el-form-item__label {
    font-weight: 400;
    font-size: 14px;
  }
  .word_photo {
    /deep/.el-form-item__label {
      font-weight: 400;
      font-size: 14px;
      margin-top: 32px;
    }
  }
  .show_img {
    width: 80PX;
    height: 80PX;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
  }
  .edit_tip {
    width: 80PX;
    height: 80PX;
    position: absolute;
    background-color: rgba(10, 25, 51, 0.5);
    opacity: 0;
    color: #fff;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
  }
}
</style>