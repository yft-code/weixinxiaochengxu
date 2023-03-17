<template>
  <div class="mailContainer">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="150px"
      class="mailForm"
      v-loading="cancelLoading"
    >
      <el-form-item label="邮箱账号名" prop="from">
        <el-input
          v-model="form.from"
          size="small"
          v-if="!editShow"
          placeholder="示例：2567725521@qq.com"
        ></el-input>
        <div v-if="editShow" class="mailContent">{{ form.from }}</div>
      </el-form-item>
      <el-form-item label="授权码" prop="pass">
        <el-input
          v-model="form.pass"
          size="small"
          v-if="!editShow"
          placeholder="请填写邮件平台授权码信息"
        ></el-input>
        <div v-if="editShow" class="mailContent">{{ form.pass }}</div>
      </el-form-item>
      <el-form-item label="用户账号" prop="user">
        <el-input
          v-model="form.user"
          size="small"
          v-if="!editShow"
          placeholder="示例：2567725521"
        ></el-input>
        <div v-if="editShow" class="mailContent">{{ form.user }}</div>
      </el-form-item>

      <el-form-item label="邮箱服务器地址" prop="host">
        <el-input
          v-model="form.host"
          size="small"
          v-if="!editShow"
          placeholder="示例：smtp.qq.com"
        ></el-input>
        <div v-if="editShow" class="mailContent">{{ form.host }}</div>
      </el-form-item>
      <el-form-item label="邮箱服务器端口" prop="port">
        <el-input
          v-model="form.port"
          size="small"
          v-if="!editShow"
          placeholder="请输入邮箱服务器端口"
        ></el-input>
        <div v-if="editShow" class="mailContent">{{ form.port }}</div>
      </el-form-item>
      <el-form-item label="SSL安全加密" prop="delivery">
        <el-switch v-model="form.sslEnable" :disabled="editShow"></el-switch>
      </el-form-item>
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
        <el-button type="primary" size="small" v-if="editShow" @click="sendMail"
          >发送测试邮箱</el-button
        >
      </el-form-item>
    </el-form>
    <el-dialog title="发送测试邮件" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <div slot="title" class="dialogTitle">发送测试邮件</div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="140px"
        :rules="mailrules"
      >
        <el-form-item label="收件人邮箱" prop="to">
          <el-input
            v-model="ruleForm.to"
            size="small"
            class="mailInput"
            placeholder="请输入邮箱地址"
          ></el-input>
        </el-form-item>

        <el-form-item class="mailOperate">
          <el-button size="mini" @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="SureClick"
            :loading="sureLoading"
            >确定</el-button
          >
        </el-form-item>
        <div class="clear"></div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "@/api/ai/mailConfiguration";
export default {
  name: "mailConfiguration",
  data() {
    const validatePort = (rule, value, callback) => {
      let reg = /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))$/;
      if (value == "") {
        return callback(new Error("请输入端口号"));
      } else if (reg.test(value) == false) {
        callback(new Error("请输入0-65535之间的端口号"));
      } else {
        callback();
      }
    };

    const validateemail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("收件人邮箱不能为空"));
      } else if (
        !/^[A-Za-z0-9.\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          value
        )
      ) {
        callback(new Error("收件人邮箱格式错误"));
      } else if (value.length > 30) {
        callback(new Error("收件人邮箱不能超过30个字符"));
      } else {
        callback();
      }
    };
    const validemail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("邮箱账号名不能为空"));
      } else if (
        !/^[A-Za-z0-9.\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          value
        )
      ) {
        callback(new Error("邮箱账号名格式错误"));
      } else if (value.length > 30) {
        callback(new Error("邮箱账号名不能超过30个字符"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      editShow: true,
      loading: false,
      cancelLoading: false,
      sureLoading: false,
      form: {
        mail: "",
        ssl: false,
        port: "",
      },
      ruleForm: {
        to:''
      },
      mailrules: {
        to: [{ required: true, trigger: "blur", validator: validateemail }],
      },
      rules: {
        from: [{ required: true, trigger: "blur", validator: validemail }],
        pass: [
          { required: true, message: "请输入授权码", trigger: "blur" },
          { max: 30, message: "授权码不能超过30个字符", trigger: "blur" },
        ],
        port: [
          { required: true, trigger: "blur", validator: validatePort },
          //  { max: 30, message: '邮箱服务器端口不能超过30个字符', trigger: 'blur' }
        ],
        host: [
          { required: true, message: "请输入邮箱服务器地址", trigger: "blur" },
          {
            max: 30,
            message: "邮箱服务器地址不能超过30个字符",
            trigger: "blur",
          },
        ],
        user: [
          {
            max: 30,
            message: "用户账号不能超过30个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getDate();
  },
  methods: {
    getDate() {
      api
        .getConfig()
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
      this.form.pass = "";
    },

    //取消
    CancelClick() {
      this.$refs["form"].resetFields();
      this.cancelLoading = true;
      api
        .getConfig()
        .then((res) => {
          if (res.result) {
            this.form = res.result;
            this.editShow = true;
            this.cancelLoading = false;
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
          form.starttlsEnable = form.sslEnable;
          api
            .saveConfig(form)
            .then((res) => {
              this.loading = false;
              this.editShow = !this.editShow;
              this.getDate();
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

    //发邮件
    sendMail() {
      this.dialogVisible = true;
      if (this.$refs["ruleForm"]) {
        this.$refs["ruleForm"].resetFields();
      }
    },

    SureClick() {
      let form = this.ruleForm;
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.sureLoading = true;
          api
            .sendTest(form)
            .then((res) => {
              this.dialogVisible = false;
              this.sureLoading = false;
              this.$message({
                message: res.message,
                type: "success",
              });
            })
            .catch(() => {
              this.dialogVisible = false;
              this.sureLoading = false;
            });
        }
      });
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
  .mailInput {
    width: 60%;
  }
  .mailOperate {
    float: right;
  }
}
</style>