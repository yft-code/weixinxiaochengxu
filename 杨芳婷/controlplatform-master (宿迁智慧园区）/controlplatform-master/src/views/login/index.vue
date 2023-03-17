<template>
  <div class="login-container">
    <div class="logoImg">
      <img :src="imgs" alt />
      <span class="text">|</span>
      <span class="text">AI视界</span>
    </div>
    <div>
      <div class="login-form">
        <div class="login_word">登 录</div>
        <div class="login_input">
          <el-alert
            v-if="isShowErrorMessage"
            :title="errorMessage"
            type="warning"
            show-icon
            :closable="false"
          />
          <el-form
            :model="loginForm"
            :rules="loginRules"
            ref="loginForm"
            class="input_ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model.trim="loginForm.username"
                placeholder="请输入用户名"
                maxlength="20"
                @keyup.enter.native="handleLogin"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model.trim="loginForm.password"
                placeholder="请输入密码"
                autocomplete="off"
                @keyup.enter.native="handleLogin"
              ></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                type="code"
                v-model.trim="loginForm.code"
                placeholder="请输入验证码"
                @keyup.enter.native="handleLogin"
                class="codeInput"
              ></el-input>
              <img :src="imgSrc" class="codeImg" />
              <div class="clear"></div>
            </el-form-item>
            <el-button
              type="primary"
              class="loginButton"
              @click="handleLogin"
              :loading="loading"
              >登 录</el-button
            >
          </el-form>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>

import * as api from "@/api/login";
export default {
  components: {  },
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error("请输入用户名！"));
      } else if (value.indexOf(" ") != -1) {
        callback(new Error("用户名不能包含空格"));
      } else if (value.trim().length >= 16) {
        callback(new Error("用户名最大长度为16！"));
      } else {
        callback();
      }
    };
    // 密码校验
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码！"));
      } else if (!value) {
        callback(new Error("密码输入错误！"));
      } else {
        callback();
      }
    };
    return {
      id: "",
      imgSrc: "",
      loginForm: {
        password: "",
        username: "",
        id: "",
        rememberMe: true,
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
          {
            pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,16}$/,
            message: "密码必须包含大小写字母和数字且长度在6-16之间",
          },
        ],
        code: [{ required: true, trigger: "blur", message: "请输入验证码!" }],
      },
      loading: false,
      isShowErrorMessage: false,
      errorMessage: "",
      imgs: "",
    };
  },
  mounted() {
    localStorage.getItem("token") && localStorage.removeItem("token");
    localStorage.getItem("userInfo") && localStorage.removeItem("userInfo");
   // this.getCode();
  },
  methods: {
    // getCode() {
    //   api
    //     .code()
    //     .then((res) => {
    //       if (res.result) {
    //         if (res.result.kaptcha) {
    //           this.imgSrc = res.result.kaptcha;
    //         }
    //         if (res.result.id) {
    //           this.id = res.result.id;
    //         }
    //       }
    //     })
    //     .catch((res) => {});
    // },

    // 跳转到首页第一个显示菜单
    handleToPage() {
      this.$router.replace({ path: "/deviceManage" });
    },

    // 登录功能
    handleLogin() {
      this.handleToPage()
      // localStorage.getItem("token") && localStorage.removeItem("token");
      // localStorage.getItem("noticeNum") && localStorage.removeItem("noticeNum");
      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     let param = {
      //       id: this.id,
      //       code: this.loginForm.code,
      //     };
      //     api.checkCode(param).then((res) => {
   
      //         this.loading = true;
      //         const username = this.loginForm.username;
      //         const password = this.loginForm.password;
      //     //     // 登录以form-data形式传参
      //         let params = {
      //           username: username,
      //           password: password,
      //         };
      //         const formData = new FormData();
      //         formData.set("username", username);
      //         formData.set("password", password);
      //         api
      //           .login(params)
      //           .then((res) => {
      //             const userInfo = {aiHorizon: res.result.userInfo};
      //             const token = (res.result && res.result.token) || "";
      //             localStorage.setItem("userInfo", JSON.stringify(userInfo));
      //             this.$bus.$emit("loginSucess");
      //             this.handleToPage();
      //             this.loading = false;
      //             this.$message({
      //               type: "success",
      //               message: "登录成功",
      //             });
      //             this.$store.state.isLogin=true
      //             let object = {
      //               aiHorizon : token
      //             }
      //             token && localStorage.setItem("token", JSON.stringify(object));
      //             // if (this.loginForm.rememberMe === true) {
      //             //   token && localStorage.setItem("token", token);
      //             // } else {
      //             //   token && sessionStorage.setItem("token", token);
      //             // }
      //             this.$bus.$emit("getMenuEvent");
          
        
      //           })
      //           .catch((res) => {
      //             this.isShowErrorMessage = true;
      //             this.errorMessage = res.message;
      //             this.loading = false;
      //             this.getCode();
      //           });
           
      //     }).catch(()=>{
      //       this.isShowErrorMessage = false;
      //      this.getCode();
      //     })
      //   }
      // });
    },

  },
};
</script>
<style lang="scss" scoped>
.login-container {
  .codeInput {
    width: 50%;
    float: left;
  }
  .clear {
    clear: both;
  }
  .codeImg {
    width: 40%;
    float: right;
    height: 5vh;
    min-height: 40px;
    text-align: right;
    cursor: pointer;
  }
  .logoImg {
    img {
      width: 160px;
      height: 40px;
    }
    .text {
      font-size: 33px;
      color: white;
      margin-left: 20px;
    }
    margin-left: 20px;
    margin-top: 20px;
  }
  font-size: 30px;
  height: 100%;
  width: 100%;
  //background-image: url("~@/assets/img/ai/login.jpg");
  background-size: 100% 100%;
  position: fixed;
  .login-form {
    background-color: white;
    // height:55vh;
    width: 28vw;
    position: fixed;
    border-radius: 20px;
    right: 9%;
    top: 22%;
  }
  /deep/.el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    padding: 0.6vh 0.6vw;
    font-size: 25px;
    border-radius: 4px;
  }
  .login_word {
    width: 100%;
    height: 18vh;
    text-align: center;
    font-weight: bold;
    line-height: 18vh;
    color: #0a1933;
    font-size: 40px;
    // background-color: #ff3a3a;
  }
  /deep/.el-alert__title {
    font-size: 18px;
    line-height: 18px;
  }
  /deep/.el-form-item__error {
    font-size: 18px;
  }
  /deep/.el-input__inner {
    height: 5vh;
    line-height: 5vh;
    padding: 0.2vh 1vh;
    width: 100%;
    font-size: 20px;
  }
  /deep/.el-form-item {
    margin-bottom: 2.5vh;
  }
  .login_input {
    width: 78%;
    margin: 0 auto;
  }
  .input_ruleForm {
    width: 100%;
    // margin-top: -2vh;
  }
  .input_word {
    width: 100%;
  }
  .loginButton {
    width: 100%;
    border-radius: 6px;
    height: 6.3vh;
    margin-top: 2vh;
    margin-bottom: 11vh;
    font-size: 28px;
  }
  .el-alert--warning.is-light {
    color: #ff3a3a;
    background: #fff;
    padding-top: 0px;
    padding-left: 0px;
    display: flex;
    align-items: center;
  }
  /deep/.el-alert__content {
    display: flex;
  }
}
</style>
