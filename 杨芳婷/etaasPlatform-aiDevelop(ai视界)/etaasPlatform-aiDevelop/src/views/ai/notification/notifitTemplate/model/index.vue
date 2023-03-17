<template>
  <div class="deviceContainer">
    <div class="deviceContent">
      <div class="content">
        <div class="notityTitle" @click="back">
          <img
            width="28PX"
            style="padding-top: -20PX"
            src="@/assets/img/ai/back.png"
            alt=""
          />
          &nbsp;通知模板
        </div>
        <!-- 模板实例 -->
        <div class="modelExample">
          <div class="emailExample">
            <div class="emailContent">
              <div class="exampleTitle">
                <img style="vertical-align:middle" :src="imgUrl"/> 
                <span> 邮箱示例</span>
              </div>
              <div style="display: flex;justify-content:space-between">
                <div class="emailTitle">标题: &nbsp;园区突发事件提醒</div>
                <div class="emailMessage">
                  <span>发件人: AI视界</span>
                  <span>&nbsp;&nbsp;&nbsp;时间: 2021.11.24 18:04:50</span>
                  <span>&nbsp;&nbsp;&nbsp;收件人: 王启超</span>
                </div>
              </div>

              <div class="emailBody">
                【一级告警】王启超你好，您所管理的**园区在2021年11月24日产生了事件告警，设备名"中心机房门口"检测到了【人员入侵】事件，请立即进行处理。事件留证如下
              </div>
              <div class="pic">
                <img
                  width="50%"
                  src="@/assets/img/ai/event.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 表格填写 -->
        <div class="modeForm">
          <el-form
            :model="modeForm"
            :rules="rules"
            ref="modeForm"
            class="demo-modeForm"
          >
            <el-form-item label="模板名称" prop="title"
            :rules="[
                      { required: true, message: '模板名称不能为空' },
                      {
                        max: 10,
                        message: '模板名称长度不能超过10'
                      },
                      { validator: validateName},
                    ]"
            >
              <el-input v-model="modeForm.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="模板内容" prop="content">
              <el-input type="textarea" v-model="modeForm.content"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 模板内容 -->
        <div v-loading="loading">
          <div style="display: flex">
            <p class="variable">事件变量</p>
            <div v-for="item in eventArr" :key="item">
              <li class="event" @click="getEvent(item)">{{ item }}</li>
            </div>
          </div>
          <div style="display: flex; margin-top: 10PX">
            <p class="variable" style="padding-top: 5PX">地点变量</p>
            <div v-for="item in locationArr" :key="item">
              <li class="event" @click="getEvent(item)">{{ item }}</li>
            </div>
          </div>
        </div>
        <!-- 按钮 -->
        <div class="btnGroup">
          <el-button
            :loading="saveLoading"
            style="margin-left: 10PX"
            type="primary"
            @click="save('modeForm')"
            size="small"
            >保存</el-button
          >
          <el-button size="small" @click="back">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as eapi from "@/api/ai/emailModel";
export default {
  props: {
    flag: {},
    row: {},
  },
  data() {
    return {
      saveLoading:false,
      loading:true,
      name:'',
      imgUrl: require("@/assets/img/ai/mail-fill.svg"),
      eventArr: [],
      locationArr: [],
      modeForm: {
        title: "",
        content: "",
      },
      //  校验
      rules: {
        content: [
           { required: true, message: "模板内容不能为空", trigger: "blur" },
           { max: 200, message: '模板内容长度不能超过200' }
        ],
      },
    };
  },
  created() {
     this.getListAll()
    //   邮箱的增加和编辑
    if (this.flag === "eamil") {
      // console.log("ewewqe");
    } else if (this.flag === "editEmail") {
      // console.log('row',this.row);
      this.name=this.row.name
      this.modeForm.title = this.row.name
      this.modeForm.content = this.row.content
      // console.log("row", this.row);
    } else {
      // console.log("短信添加编辑");
    }
  },

  methods: {
       // 检验模板名称重复
    async validateName(rule, value, callback) {
      if (this.name !== this.modeForm.title) {
        // 添加,编辑时和回显的名称不同时进行校验
        const { result } = await eapi.isNameConflict({ name: value });
        if (result) {
          callback(new Error("该模板名称已存在，请重新填写"));
        }
      }
      // 调用接口查找名称是否重复, 是的话调出相关数据
      callback();
    },

    // 获取内置事件变量和地点变量
    getListAll(){
      this.loading=true
       eapi.getEmailVerity().then(res=>{
        //  console.log('地点变量res',res);
          let areaVar=res.result&&res.result.areaVar
          let eventVar=res.result&&res.result.eventVar
          this.locationArr=areaVar
          this.eventArr=eventVar
           this.loading=false
       }).catch()
    },

    //数据校验,重置数据
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    // 保存
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveLoading=true
          //  邮箱的模板添加
          if (this.flag === "eamil") {
            // console.log('模板添加');
             const params={
               content:this.modeForm.content,
               name:this.modeForm.title
             }
             eapi.addEmailModel(params).then(res=>{
              //  console.log('234123',res);
                if(res.code===0){
                   this.back()
                 this.$message({
                type: "success",
                message: "添加成功",
              });
              }
             }).catch()
          }
          // 邮箱模板的编辑
          if (this.flag === "editEmail") {
            // console.log("编辑邮箱模板");
            const params={
              id:this.row.id,
             content:this.modeForm.content,
               name:this.modeForm.title
            }
            eapi.updateEmailModel(params).then(res=>{
              // console.log('编辑res',res);
              if(res.code===0){
                 this.$message({
                type: "success",
                message: "编辑成功",
              });
             this.back()
              }
            }).catch()
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    // save(){

    // },
    // 返回到主页
    back() {
      this.saveLoading=false
      this.$emit("back");
    },
    getEvent(val) {
      this.modeForm.content += "【" + val + "】";
      this.$refs.modeForm.validateField("content", () => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.deviceContainer {
  .event {
    font-size: 14PX;
    border-radius: 4PX;
    padding: 5PX 0 5PX 0;
    min-width: 80PX;
    cursor: pointer;
    text-align: center;
    border: 1PX solid #347fff;
    margin-left: 10PX;
    color: #347fff;
  }
  .btnGroup {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 20PX;
    padding-bottom: 20PX;
  }
  .back {
    font-size: 20PX;
    font-weight: 400;
    color: #0a1933;
  }
  .notityTitle {
    cursor: pointer;
    font-size: 20PX;
    font-weight: 400;
    color: #0a1933;
    padding-bottom: 20PX;
    border-bottom: 1PX solid #f3f3f5;
    margin: 0 auto;
  }
  .variable {
    min-width: 70PX;
    font-size: 16PX;
    padding-top: 5PX;
    color: #347fff;
  }
  .modelExample {
    margin-top: 20PX;
  }
  .emailExample {
    width: 100%;
    border-radius: 8PX;
    box-sizing: border-box;
    box-shadow: 0PX 0PX 7PX -3PX rgba(33, 72, 141, 0.3);
  }
  .emailContent {
    width: 98%;
    margin: 0 auto;
  }
  .exampleTitle {
    height: 50PX;
    line-height: 50PX;
    border-radius: 8PX;
    font-size: 18PX;
    font-weight: 400;
    color: #0a1933;
    border-bottom: 1PX solid rgba(10, 25, 51, 0.05);
  }
  .emailTitle {
    margin-top: 15PX;
    font-size: 20PX;
    font-weight: 400;
    color: #0a1933;
  }
  .emailMessage {
    color: rgba(10, 25, 51, 0.65);
    margin-top: 15PX;
    font-size: 16PX;
  }
  .emailBody {
    margin-top: 20PX;
    font-size: 18PX;
    font-weight: 400;
    color: #0a1933;
  }
  .pic {
    margin-top: 10PX;
    padding-bottom: 10PX;
  }
  .modeForm {
    margin-top: 20PX;
    /deep/.el-form-item__label {
      text-align: right;
      vertical-align: middle;
      float: left;
      width: 90PX !important;
      font-size: 16PX;
      color: #606266;
      line-height: 40PX;
      padding: 0 12PX 0 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    /deep/.el-form-item__content {
      line-height: 40PX;
      margin-left: 90PX !important;
      position: relative;
      font-size: 16PX;
    }
  }
  width: 100%;
  .deviceContent {
    width: 97%;
    margin: 24PX auto;
    border-radius: 8PX;
    box-sizing: border-box;
    box-shadow: 0PX 0PX 7PX -3PX rgba(33, 72, 141, 0.2);
    background:#fff;
    .pickerdata {
      width: 350PX;
    }
    .content {
      padding-top: 24PX;
      width: 95%;
      margin: 0 auto;
    }
  }
}
</style>