<template>
  <div>
       <el-dialog
       :visible.sync="dialogVisible"
        width="524px"
        style="margin-top:-6vh"
        :before-close="handleClose">
        <template slot="title">
            <div class="logo"></div>
        </template>    
        <div>
            <div v-if="loginType.type==='login'">
               <div :class="['login-container']">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="账号登录" name="first">
                       <div style="margin-top:15px">
                         <el-alert
          v-if="isShowErrorMessage"
          :title="errorMessage"
          type="warning"
          show-icon
          :closable="false"
        />
                          <el-form label-position="left" :model="loginForm"
                                   :rules="loginRules"
                                   ref="loginForm" 
                                   label-width="70px">
                             <el-form-item label="账户" prop="username">
                                <el-input  @keyup.enter.native="handleLogin" v-model.trim="loginForm.username" placeholder="请输入用户名或手机号" maxlength="20"></el-input>
                            </el-form-item>
                            
                            <el-form-item label="密码" prop="password">
                                <el-input  @keyup.enter.native="handleLogin" type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                            </el-form-item>

                            <div style="display:flex;justify-content:space-between">
                               <el-checkbox v-model="loginForm.autoLogin">自动登录</el-checkbox>
                              <div class="register-user" @click="registerUser">注册账户</div>
                            </div>
                            <div class="login-button">
                           <el-button type="primary" @click="handleLogin">登录</el-button>
                            </div>
                             
                        </el-form>
                       </div>
                     </el-tab-pane>
                    <el-tab-pane label="短信登录" name="second">
                     <div style="margin-top:15px">
                          <el-form label-position="left" :rules="messageRules" ref="messageForm" label-width="80px" :model="messageForm">
                             <el-form-item label="手机号" prop="phone">
                                <el-input   @keyup.enter.native="loginMessage"    v-model="messageForm.phone" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码" prop="verificationCode">
                                <el-input @keyup.enter.native="loginMessage" ref="code" v-model="messageForm.verificationCode" placeholder="请输入验证码" class="verificationCodeStyle"></el-input>
                                <div class="verificationCodeButton" :class="{disabled: !this.codeClick}" @click="getCode">{{code}}</div>
                            </el-form-item>

                            <div style="display:flex;justify-content:space-between">
                               <el-checkbox v-model="messageForm.autoLogin">自动登录</el-checkbox>
                              <div class="register-user" @click="registerUser">注册账户</div>
                            </div>
                            <div class="login-button">
                           <el-button type="primary" @click="loginMessage">登录</el-button>
                            </div>
                             </el-form>
                       </div>
                    </el-tab-pane>
                 </el-tabs>
            </div>
            </div>
            <div v-if="loginType.type==='submit'" class="submitStyle">
                  <div class="register-header">
                  <div class="register-left">注册</div>
                  <div class="register-right" @click="loginUser">使用已有帐户登录</div>
                 </div>
                 <div class="register-form">
                            <el-form label-position="right" :rules="rules" ref="ruleForm" label-width="100px" :model="ruleForm">
                            <el-form-item label="公司名称">
                                <el-input v-model="ruleForm.companyName" placeholder="请输入公司名称"></el-input>
                            </el-form-item>
                            <el-form-item label="用户名" prop="userName">
                                <el-input v-model="ruleForm.userName" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="checkPassword">
                                <el-input type="password" v-model="ruleForm.checkPassword" placeholder="请确认密码"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号" prop="phone">
                                <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                             <el-form-item label="验证码" prop="verificationCode">
                                <el-input v-model="ruleForm.verificationCode" placeholder="请输入验证码" class="verificationCodeStyle"></el-input>
                                <div class="verificationCodeButton" :class="{disabled: !this.canClick}" @click="countDown">{{content}}</div>
                            </el-form-item>
                        </el-form>
                 </div>
                <div>
                     <div class="register-sub" v-loading="loading" @click="submit">注册</div>
                </div>
            </div>
        </div>
      </el-dialog>

  </div>
</template>

<script>
import *  as api from "@/api/login"
import {register,sendMsg,isAccountConflict,isPhoneConflict} from '../../api/login'
export default {
  name: "index",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
   loginType:{
    },
  },
  watch:{
    "ruleForm.verificationCode":{
      handler(curVal,oldVal){
        if(curVal===this.contenttext){
           window.clearInterval(this.clock)
           this.content = '获取验证码'
           this.totalTime = 60
           this.canClick = true 
          
        }
      }
    },
  },
  data(){
    // 账号登录校验
    // 账号校验
     const validateUsername = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error("用户名不能为空"));
      }else if(value.indexOf(" ")!=-1) {
        callback(new Error("用户名不能包含空格"));
      }else if(value.trim().length>=16) {
        callback(new Error("用户名最大长度为16"));
      }else {
        callback();
      }
    };
    // 账号密码校验
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码！"));
      } else if (!value) {
        callback(new Error("密码输入错误！"));
      } else {
        callback();
      }
    };
      //邮箱校验
       var validateemail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入账号/邮箱！'))
      } else if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
    //密码校验
      var validatePass = (rule, value, callback) => {
       if (!value) {
        callback(new Error('请输入密码！'))
      } else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,16}$/.test(value)) {
        callback(new Error('密码必须包含大小写字母和数字且长度在6-16之间'))
      } else {
        callback()
      }
      };
      //确认密码校验
      var validatePass2 = (rule, value, callback) => {
        if (!value) {
        callback(new Error('请再次确认密码！'))
      } else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,16}$/.test(value)) {
        callback(new Error('密码必须包含大小写字母和数字且长度在6-16之间'))
      } else {
        callback()
      }
      };
       // 手机号校验
    const validatephone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号不能为空'))
      } else if (!/^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[1,7]))\d{8}$/.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
           const params = {
            phone:value
          }
          isPhoneConflict(params).then(res=>{
            if(!res.result){
              callback();
            }else{
              callback(new Error("手机号已经注册"));
            }
          })
      }
    };
        //用户名称校验
     const validateuserName = (rule, value, callback) => {
        if (!value.trim()) {
        callback(new Error("请输入用户名！"));
      }else if(value.indexOf(" ")!=-1) {
        callback(new Error("用户名不能包含空格"));
      }else if(value.trim().length>=16) {
        callback(new Error("用户名最大长度为16！"));
      }else {
          const params = {
            userAccount:value
          }
          isAccountConflict(params).then(res=>{
            if(!res.result){
              callback();
            }else{
              callback(new Error("用户名已经存在"));
            }
          })
      }
    };
    //验证输入的手机号验证码是否和存储的验证码相同
     const checkPhoneCode = (rules, value, callback) => {
      if (value == this.contenttext) {
         window.clearInterval(this.clock)
          this.content = '获取验证码'
          this.totalTime = 60
          this.canClick = true
        return callback();
      } else {
        callback(new Error("验证码错误"));
      }
    };
    
      return{
        // 手机号登录获取验证码
       code:'获取验证码',
       codeClick:true,
       codeTime:60,
        codeClock:null,
        isShowErrorMessage:false,
        errorMessage:'',
        //用户名登录数据
        loginForm: {
        password: "",
        username: "",
        autoLogin:false,
      },
    // 手机号登录数据
      messageForm:{
            phone:'',
            verificationCode:'',
             autoLogin:false,
       },
       activeName: 'first',
       loading:false,
       content: '获取验证码',
       timeout:null,
       contenttext:'',
       clock:null,
       totalTime: 60,//记录倒计时时间
       canClick: true,
       ruleForm:{
       companyName:'',
       userName:'',
       email:'',
       password:'',
       checkPassword:'',
       phone:'',
       verificationCode:''
     },
    // 注册校验
     rules: {
          userName:[
            { validator: validateuserName, trigger: 'blur' },
             { required: true, message: '用户名不能为空', trigger: 'blur' },
          ],
          phone:[
            { validator: validatephone, trigger: 'blur' },
            { required: true, message: '手机号不能为空', trigger: 'blur' },
          ],
          email:[
            { validator: validateemail, trigger: 'blur' },
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
          ],
          password: [
            { validator: validatePass, trigger: 'blur' },
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          checkPassword: [
            { validator: validatePass2, trigger: 'blur' },
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          verificationCode:[
              { validator: checkPhoneCode, trigger: "blur" },
              { required: true, message: '验证码不能为空', trigger: 'blur' },
          ]
        },

        // 账户登录检验
         loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
          {
            pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,16}$/,
            message: "密码必须包含大小写字母和数字且长度在6-16之间",
          }
        ]
      },
      // 手机登录校验
      messageRules:{
         phone:[
            { validator: validatephone, trigger: 'blur' },
            { required: true, message: '手机号不能为空', trigger: 'blur' },
          ],
        verificationCode:[
              { required: true, message: '验证码不能为空', trigger: 'blur' },
          ]
      }
      }
  },
  methods:{
    // 重置数据
      resetForm(formName) {
      if(this.$refs[formName]!==undefined){
        this.$refs[formName].resetFields()
      }
    },
    // 通过账号登录
      handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          const username = this.loginForm.username;
          const password = this.loginForm.password;
          // 登录以form-data形式传参
          const formData = new FormData();
          formData.set("username", username);
          formData.set("password", password);
          api
            .login(formData)
            .then(res => {
              const userInfo = res.result.userInfo;
              const token = (res.result && res.result.token) || '';
              this.loading = false;
              this.$message({
                type: "success",
                message: "登录成功"
              });
              if (this.loginForm.autoLogin === true) {
                token && localStorage.setItem("token", token);
                userInfo&&localStorage.setItem("userInfo", JSON.stringify(userInfo));
              } else {
                token && sessionStorage.setItem("token", token);
               userInfo&&sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
              }
               this.handleClose()
            })
            .catch(res => {
              this.isShowErrorMessage = true;
              this.errorMessage =res.message;
              this.loading = false;
            });
        }
      });
    },
    // 通过短信登录
    loginMessage(){
          this.$refs.messageForm.validate(valid => {
        if (valid) {
          const phone = this.messageForm.phone;
          const code = this.messageForm.verificationCode;
          // 登录以form-data形式传参
          const formData = new FormData();
          formData.set("phone", phone);
          formData.set("code", code);
          api
            .loginPhone(formData)
            .then(res => {
              const userInfo = res.result.userInfo;
              const token = (res.result && res.result.token) || '';
              this.loading = false;
              this.$message({
                type: "success",
                message: "登录成功"
              });
              if (this.messageForm.autoLogin === true) {
                token && localStorage.setItem("token", token);
                userInfo&&localStorage.setItem("userInfo", JSON.stringify(userInfo));
              } else {
                token && sessionStorage.setItem("token", token);
               userInfo&&sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
              }
              this.handleClose()
            })
            .catch(res => {
              this.isShowErrorMessage = true;
              this.errorMessage = res.message;
              this.loading = false;
            });
        }
      });
    },
    loginUser(){
      this.activeName="first"
      this.loginType.type="login"
    },
    registerUser(){
         this.loginType.type="submit"
         this.resetForm('messageForm')
        this.resetForm('loginForm')
    },
      handleClick(tab, event) {
           this.isShowErrorMessage=false
         this.resetForm('messageForm')
         this.resetForm('loginForm')
      },
    //  countDown () {
    //     if (!this.canClick) return  //改动的是这两行代码
    //     this.canClick = false
    //     this.content = this.totalTime + '秒'
    //     this.clock = window.setInterval(() => {
    //     this.totalTime--
    //     this.content = this.totalTime + '秒'
    //     if (this.totalTime < 0) {
    //     window.clearInterval(this.clock)
    //     this.content = '重新发送验证码'
    //     this.totalTime = 60
    //     this.canClick = true  //这里重新开启
    //     }
    //     },1000)
    //  },
      sendMsg(){
         const params = {
          phone:this.ruleForm.phone
          }
          sendMsg(params).then(res=>{
            this.contenttext = res.result
            this.$forceUpdate()
              if (!this.canClick) return 
              this.canClick = false
              this.content = this.totalTime + '秒'
              this.clock = window.setInterval(() => {
              this.totalTime--
              this.content = this.totalTime + '秒'
              if (this.totalTime < 0) {
              window.clearInterval(this.clock)
              this.content = '获取验证码'
              this.totalTime = 60
              this.canClick = true 
              } },1000)

               setTimeout(() => {
                 this.ruleForm.verificationCode = this.contenttext
                 this.$forceUpdate()
               },5000)
          })
    },
    countDown () {
       this.ruleForm.verificationCode = ''
       this.contenttext = ''
        // 如果未输入手机号，结束执行
         if (this.ruleForm.phone == "") {
             this.$refs.ruleForm.validateField("phone", () => {
             });
            return;
          }else{
            this.sendMsg()
          }
        // if (!this.canClick) return  //改动的是这两行代码
        // this.canClick = false
        // this.content = this.totalTime + '秒'
        // this.clock = window.setInterval(() => {
        // this.totalTime--
        // this.content = this.totalTime + '秒'
        // if (this.totalTime < 0) {
        // window.clearInterval(this.clock)
        // this.content = '重新发送验证码'
        // this.totalTime = 60
        // this.canClick = true  //这里重新开启
        // }
        // },1000)
    },
     getCode() {
        this.$refs.messageForm.validateField("phone", phoneValid => {
        if(!phoneValid){
          // 获取手机验证码
          const phone=this.messageForm.phone
            const formData = new FormData();
            formData.set("phone", phone);
            api.loginCode(formData).then(res=>{
            console.log('res',res);
            }).catch()
        if (!this.codeClick) return  //改动的是这两行代码
        this.codeClick = false
        this.code= this.codeTime + '秒'
        this.codeClock = window.setInterval(() => {
        this.codeTime--
        this.code = this.codeTime + '秒'
        if (this.codeTime < 0) {
        window.clearInterval(this.codeClock)
        this.code = '重新发送验证码'
        this.codeTime = 60
        this.codeClick = true  //这里重新开启
        }
        },1000)
         }
         });
        
    },
    submit(){
         this.$refs.ruleForm.validate(valid => {
             if(valid){
                this.loading = true
                const params = {
                  company:this.ruleForm.companyName,
                  userAccount:this.ruleForm.userName,
                  email:this.ruleForm.email,
                  password:this.ruleForm.password,
                  phone:this.ruleForm.phone,    
                  checkCode:this.ruleForm.verificationCode,
                }
                register(params).then(res=>{
                 this.loading = false
                  this.$message({
                  type: 'success',
                  message: '注册成功!'
                });
                this.handleClose()
                })
             }else{
                 return false
             }
         })
    },
    handleClose(){
          this.isShowErrorMessage=false
          this.activeName="first"
          window.clearInterval(this.clock)
          this.content = '获取验证码'
          this.code="获取验证码"
          this.codeTime=60
          this.codeClick=true
          this.totalTime = 60
          this.canClick = true
          this.ruleForm = {
            companyName:'',
            userName:'',
            email:'',
            password:'',
            checkPassword:'',
            phone:'',
            verificationCode:''
          }
          this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
          this.$emit("close-callback");
          this.resetForm('messageForm')
          this.resetForm('loginForm')
      }
  },
};
</script>
<style lang="scss" scoped>
.el-alert--warning.is-light {
    color: #ff3a3a;
    background: #fff;
    padding-top: 0px;
    padding-left: 72px;
    display: flex;
    align-items: center;
  }
  /deep/.el-alert__content {
    display: flex;
  }
.show-error-message{
  .el-form-item__error {
    display: none;
}
}
.logo{
    // width: 160px;
    height: 55px;
    background: url('~@/assets/img/logo.png') no-repeat;
}
.login-container{
  margin-top: -30px;
.login-button{
  margin-top: 25px;
 /deep/.el-button--primary {
    width: 100%;
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
}
}
/deep/.el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #000;
    z-index: 1;
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    list-style: none;
}

/deep/.el-tabs__item.is-active {
    color: #000;
    font-weight: bold;
}

/deep/.el-tabs__item {
    padding: 0 20px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color:#0A1933;
    position: relative;
}
.register-user{
  color:#347FFF;
  cursor: pointer;
}

.verificationCodeStyle{
          width: 50%;
        //   overflow: hidden;
      }
      .verificationCodeButton{
        cursor: pointer;
        width: 40%;
        height: 40px;
        float:right;
        background: #FFFFFF;
        border-radius: 4px;
        border: 1px solid rgba(10, 25, 51, 0.2);
        font-size: 18px;
        text-align: center;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: rgba(10, 25, 51, 0.5);
      }
}

.submitStyle{
    .register-header{
     display: flex;
     justify-content:space-between;
     align-items: flex-end;
     .register-left{ 
      font-size: 24px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #0A1933;
     }
     .register-right{
      cursor: pointer;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #347FFF;
     }
     
    }
    .register-form{
      padding-top: 34px;
      .verificationCodeStyle{
          width: 50%;
        //   overflow: hidden;
      }
      .verificationCodeButton{
        width: 40%;
        height: 40px;
        float:right;
        background: #FFFFFF;
        border-radius: 4px;
        border: 1px solid rgba(10, 25, 51, 0.2);
        font-size: 18px;
        text-align: center;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: rgba(10, 25, 51, 0.5);
      }
      
    }
    .register-sub{
        cursor: pointer;
        height: 48px;
        margin: 0 auto;
        margin-top: 33px;
        background: #4B6FE6;
        border-radius: 4px;
        font-size: 20px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
        line-height: 48px;
    }
}
.disabled{
 background-color: #ddd;
 border-color: #ddd;
 color:#4B6FE6 !important ;
 cursor: not-allowed; // 鼠标变化
}
/deep/ .el-dialog__header{
  padding-top: 60px;
  padding-left: 60px;
  padding-right: 60px;
}
/deep/ .el-dialog__body{
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 42px;
  padding-bottom: 60px;
}

/deep/ .el-form-item__label{
    font-size: 18px;
}

/deep/ .el-input__inner{
    font-size: 18px;
}
</style>
