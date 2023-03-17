<template>
  <div class="algorithm_update">
      <el-dialog
      title="高级配置"
      :visible.sync="visible"
      width="500px"
      :before-close="handleClose"
    >
      <div class="input_container">
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          label-width="180px"
          size="mini"
          class="demo-ruleForm"
        >
          <el-form-item
            label="抽帧规则(人)"
            prop="people"
          >
            <el-input
              @input="change"
              placeholder="请输入"
              maxlength="10"
              style="width: 100%"
              v-model.number="form.people"
              autocomplete="off"
            ></el-input>
          </el-form-item>
           <el-form-item
            label="抽帧规则(烟火)"
            prop="smog"
          >
            <el-input
              @input="change"
              maxlength="10"
              style="width: 100%"
              v-model.number="form.smog"
            placeholder="请输入"
            ></el-input>
          </el-form-item>
           <!-- <el-form-item
            label="事件图像存储时间(天)"
            prop="picPast"
          >
            <el-input
             @input="change"
             placeholder="请设置图像存储时间"
              maxlength="100"
              style="width: 100%"
              v-model="form.picPast"
            ></el-input>
          </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose()">取消</el-button>
        <el-button size="mini"  :loading="loading" type="primary" @click="submit('form')"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/ai/algorithmManage";
export default {
  name: "edit",
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    const validatePeople = (rule, value, callback) => {
      if (!value) {
        callback(new Error("抽帧规则不能为空"));
      } else if(!/^[1-9]?(\d){1,}0$/.test(value)) {
        callback("只能填写10的正整倍数");
      }else{
          callback();
      }
    };

     const validateImg = (rule, value, callback) => {
      if (!value) {
        callback(new Error("事件存储时间不能为空"));
      } else if(!/^([1-9]|[1-9]\d|1[0-7]\d|180)$/.test(value)) {
        callback("只能填1-180之间的正整数")
      }else{
          callback();
      }
    };
    return {
        rules: {
        people:[{ required: true, trigger: "blur", validator: validatePeople }],
        smog:[{ required: true, trigger: "blur", validator: validatePeople }],
        picPast:[{ required: true, trigger: "blur", validator: validateImg }],
      },
     form:{
        people:'',
        smog:'',
        picPast:''
        },
      loading: false,
    };
  },
   watch: {
    visible: {
      handler(newVal) {
         if(newVal){
          this.getConfig()
         }
      },
      immediate: true,
      deep: true,
    }
   },
  methods: {
    change(){
      this.loading=false
    },
    getConfig(){
        api.getConfigs().then((res)=>{
                 if(res.code===0){
                 const {fire,person,picPast} = res.result
                       this.form.people=person
                       this.form.smog=fire
                       this.form.picPast=picPast
                 }
        })
    },
    handleClose() {
      this.$emit("close-callback");
      this.resetForm('form')
    },
    submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading=true
            const params={
                 person:this.form.people,
                 fire:this.form.smog,
                 picPast:this.form.picPast
            }
            api.AlgorithmConfigs(params).then(res=>{
               if(res.code===0){
                this.$message.success(res.message)
                this.handleClose()
                this.loading=false
               }
            })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
};
</script>

<style lang="scss" scoped>
.algorithm_update {
  /deep/ .el-dialog {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0px !important;
}
  .input_container {
    width: 70%;
    margin: 0px auto;
  }
  ::v-deep .el-dialog__title {
    color: #0a1933;
    // line-height: 60px;
    font-weight: 550;
  }
  .input_border {
    width: 99%;
    overflow: auto;
    border-top: 1px solid rgba(10, 25, 51, 0.05);
    // margin: -50px auto;
    margin-bottom: 20px;
  }
}
</style>
