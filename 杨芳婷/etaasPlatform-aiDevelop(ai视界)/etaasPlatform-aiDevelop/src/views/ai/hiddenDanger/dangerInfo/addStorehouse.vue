<template>
  <div>
     <el-dialog
        :title="title"
        :visible.sync="innerVisible"
        width="400px"
        :before-close="handleClose"
      >
   <div style="border-top:1px solid rgba(10, 25, 51, 0.0500);">
   <el-form style="margin-top:20px" :model="ruleForm" 
   label-position="right"  
   :rules="rules"
    ref="ruleForm" 
    size="mini"
    label-width="105px" 
    class="demo-ruleForm">
    <el-col :span="22">
    <el-form-item label="节点层级">
    <el-input v-model="ruleForm.level" disabled></el-input>
  </el-form-item>
    </el-col>
    <el-col :span="22">
    <el-form-item label="节点名称" prop="name">
    <el-input @input="onInput()"  maxlength="60" v-model="ruleForm.name"></el-input>
  </el-form-item>
    </el-col>
</el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="handleClose">取消</el-button>
          <el-button size="mini" type="primary" @click="add">确定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
 import * as api from '@/api/ai/org' 
export default {
   props: {
    innerVisible: {
      type: Boolean,
      default: false,
    },
    parentId:{},
    name:{},
    level:{},
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "add",
    }
  },
  watch: {
    innerVisible() {
      if (this.type === "edit") {
        this.ruleForm.parentId=this.parentId
        this.ruleForm.name=this.name
        this.ruleForm.level=this.level
      } else {
        this.ruleForm = {};
        this.ruleForm.level=this.level
        this.ruleForm.parentId=this.parentId
      }
    },
  },
      data() {
      return {
        file:'',
        showPhoto:false,
        fileList: [],
        isHidden:false,
        imgArr:[],
        ruleForm: {
          name: '',
          parentId:''
        },
        rules: {
          name: [
            { required: true, message: '节点名称不能为空', trigger: 'blur' },
            { min: 2, max: 16, message: '节点名称长度在 2 到 16 个字符', trigger: 'blur' }
          ]
        }
      };
    },
  methods:{

// 解决输入框不能输入的问题
  onInput(){
     this.$forceUpdate()
  },

  add() {
      this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.type==='add') {
          api.addChild(this.ruleForm).then(res => {
              if(res.code===0){
                this.$message.success('保存成功')
                this.$emit('getSingleTree')
                 this.handleClose()
              }
          }).catch()
        }
       else {
        const params={
          name:this.ruleForm.name,
          id:this.ruleForm.parentId
        }
        api.updateHidden(params).then((res) => {
          if(res.code===0){
                this.$message.success('修改成功')
                this.$emit('getSingleTree')
                 this.handleClose()
              }
        }).catch()
      }
      }
    })
  },
    handleClose(){
   this.$emit("close-callback");
   this.$refs.ruleForm&&this.$refs.ruleForm.resetFields();
    }
  },
}
</script>
<style lang="scss" scoped>
 .photo{
      font-size: 14PX;
     color: rgba(10,25,51,0.2);
  }
 /deep/ .el-upload__input {
    display: none;
  }
  .delete-pic{
    cursor: pointer;
    background-color: rgba(108, 117, 133, 1);
    width: 20PX;
    height: 20PX;
    border-radius:50%;
    position: absolute;
    margin-left: 90PX;
    margin-top: -108PX;
     text-align: center;
    line-height: 20PX;
    color: #fff;
    font-size: 12PX;
  }
  .key-line{
      width: 20PX;
      height: 20PX;
      margin-bottom: -10PX;
  }
  .show-img-word{
    width: 100PX;
    height: 100PX;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
      border: 1px dotted rgba(10,25,51,0.2)
  }
</style>