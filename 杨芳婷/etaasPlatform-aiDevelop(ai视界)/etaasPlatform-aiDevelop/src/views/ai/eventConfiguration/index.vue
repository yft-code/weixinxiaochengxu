<template>
  <div class="mailContainer">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="200px"
      class="mailForm"
      v-loading="cancelLoading"
    >
      <el-form-item label="单个视频录制时间(分钟)" prop="videoRecordTime">
        <el-input
          v-model="form.videoRecordTime"
          size="small"
          v-if="!editShow"
          placeholder="请输入"
          oninput="value=value.replace(/^0|[^0-9]/g, '')"
        ></el-input>
        <div v-if="editShow" class="mailContent">{{ form.videoRecordTime }}</div>
      </el-form-item>
      <el-form-item label="录制视频保存时间(天)" prop="videoSaveTime">
        <el-input
          v-model="form.videoSaveTime"
          size="small"
          v-if="!editShow"
          placeholder="请输入"
          oninput="value=value.replace(/^0|[^0-9]/g, '')"
        ></el-input>
        <div v-if="editShow" class="mailContent">{{ form.videoSaveTime }}</div>
      </el-form-item>
     
      <el-form-item label="图片保存时间(天)" prop="picSaveTime">
        <el-input
          v-model="form.picSaveTime"
          size="small"
          v-if="!editShow"
          placeholder="请输入"
          oninput="value=value.replace(/^0|[^0-9]/g, '')"
        ></el-input>
        <div v-if="editShow" class="mailContent">{{ form.picSaveTime }}</div>
      </el-form-item> 
      <el-form-item label="是否开启视频录制" prop="isRecord">
        <el-switch v-model="form.enableVideoRecord" :disabled="editShow" active-value="0" inactive-value="1"></el-switch>
      </el-form-item>
      <!-- <el-form-item label="视频视频保存时间(前一天定时清理任务时)" prop="oldPicSaveTime">
        <el-input
          v-model="form.oldPicSaveTime"
          size="small"
          v-if="!editShow"
          placeholder="请输入"
        ></el-input>
        <div v-if="editShow" class="mailContent">{{ form.oldPicSaveTime }}</div>
      </el-form-item> -->

      <!-- <el-form-item label="图片保存时间(前一天定时清理任务时)" prop="oldPicSaveTime">
        <el-input
          v-model="form.oldPicSaveTime"
          size="small"
          v-if="!editShow"
          placeholder="请输入"
        ></el-input>
        <div v-if="editShow" class="mailContent">{{ form.oldPicSaveTime }}</div>
      </el-form-item> -->
       
      <el-form-item>
        <el-button
          size="small"
          v-if="!editShow"
          @click="CancelClick"
          :loading="cancelLoading"
          >取消</el-button
        >
        <el-button size="small" v-if="editShow" @click="EditClick"
          >编辑</el-button
        >
        <el-button
          type="primary"
          size="small"
          v-if="!editShow"
          @click="SaveClick"
          :loading="loading"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  
  </div>
</template>

<script>
import * as api from "@/api/ai/eventConfiguration";
export default {
  name: "eventConfiguration",
  data() {
    var checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
    };
    return {
      editShow: true,
      loading: false,
      cancelLoading: false,
      sureLoading: false,
      form: {

      },
      rules: {
        enableVideoRecord: [
          { required: true, message: "请选择是否开启", trigger: "blur"},
        ],
        videoSaveTime:[
          { required: true, message: "单个视频录制时间(分钟)不能为空", trigger: "blur" },
        ],
        picSaveTime:[
           { required: true, message: "图片保存时间(天)不能为空", trigger: "blur" },
        ],
        videoRecordTime:[
           { required: true, message: "录制视频保存时间(天)不能为空", trigger: "blur" },
        ]
 
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      api
        .getRecordConfig()
        .then((res) => { 
          if (res.result) {
           
            this.form = res.result;
             
            for (let i in this.form) {
              //非空提示
              if (this.form[i] === null || this.form[i] === "") {
                this.form[i] = "暂无";
                //number转string
              } else if (typeof this.form[i] === "number") {
                this.form[i] = this.form[i] + "";
              }
            }
          }
        })
        .catch(() => {});
    },

    EditClick() {
      this.editShow = !this.editShow;
    },

    //取消
    CancelClick() {
      this.$refs["form"].resetFields();
      this.cancelLoading = true;
      api
        .getRecordConfig()
        .then((res) => {
          if (res.result) {
            this.form = res.result;
            this.editShow = true;
            this.cancelLoading = false;
            for (let i in this.form) {
              //非空提示
              if (this.form[i] === null || this.form[i] === "") {
                this.form[i] = "暂无";
                //number转string
              } else if (typeof this.form[i] === "number") {
                this.form[i] = this.form[i] + "";
              }
            }
          }
        })
        .catch(() => {});
    },

    //保存
    SaveClick() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loading = true;
          let form = this.form;
          api
            .updateRecordConfig(form)
            .then((res) => {
              this.loading = false;
              this.editShow = !this.editShow;
              this.getData();
              this.$message({
                message: res.message,
                type: "success",
              });
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },


    SureClick() {
      let form = this.ruleForm;
      // this.$refs["ruleForm"].validate((valid) => {
      //   if (valid) {
      //     this.sureLoading = true;
      //     api
      //       .sendTest(form)
      //       .then((res) => {
      //         this.sureLoading = false;
      //         this.$message({
      //           message: res.message,
      //           type: "success",
      //         });
      //       })
      //       .catch(() => {
      //         this.sureLoading = false;
      //       });
      //   }
      // });
    },
  },
};
</script>
<style lang="scss" scoped>
.mailContainer {
  width: 97%;
  margin: 24px auto;
  height: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 80px 24px;
  box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
  background:#fff;
  .mailForm {
    width: 600px;
    margin: 0 auto;
  }
  .mailContent {
    color: #0a1933;
    opacity: 0.65;
    font-size: 18px;
  }
  .clear {
    clear: both;
  }
  .dialogTitle {
    font-size: 20px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 16px;
    font-weight: 550;
  }
  .mailOperate {
    float: right;
  }
}
</style>