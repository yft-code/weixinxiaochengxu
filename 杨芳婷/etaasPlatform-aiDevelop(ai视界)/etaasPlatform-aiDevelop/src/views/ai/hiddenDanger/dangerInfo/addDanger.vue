<template>
  <div class="img-container">
     <el-dialog
        :title="title"
        :visible.sync="visible"
        width="700px"
        :before-close="handleClose"
      >
        <div style="border-top:1px solid rgba(10, 25, 51, 0.0500);">
   <el-form 
   style="margin-top:20px" 
   :model="ruleForm" 
   label-position="right"  
   :rules="rules"
    ref="ruleForm" 
    size="mini"
    label-width="105px" 
    class="demo-ruleForm">
    <el-col :span="11">
    <el-form-item label="编号" prop="code">
    <el-input v-model="ruleForm.code"></el-input>
  </el-form-item>
    </el-col>
    <el-col :span="12">
    <el-form-item label="隐患名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
    </el-col>
     <el-col :span="11">
    <el-form-item label="隐患类型" prop="type">
    <el-select v-model="ruleForm.type" placeholder="请选择隐患类型" style="width:100%">
      <el-option label="一般" value="一般"></el-option>
      <el-option label="重大" value="重大"></el-option>
    </el-select>
  </el-form-item>
    </el-col>
  <el-col :span="12">
    <el-form-item label="整改周期(天)" prop="period">
    <el-input v-model="ruleForm.period"></el-input>
  </el-form-item>
    </el-col>
 <el-col :span="23">
     <el-form-item label="规范说明" prop="description">
    <el-input type="textarea" maxlength="1000" v-model="ruleForm.description"></el-input>
  </el-form-item>
    </el-col>
 <el-col :span="23">
     <el-form-item label="危害后果" prop="harmResult">
    <el-input type="textarea" maxlength="500" v-model="ruleForm.harmResult"></el-input>
  </el-form-item>
  </el-col>
  <el-col :span="23">
     <el-form-item label="规范样例图" prop="desc">
    <span class="tips"></span>请上传隐患图片素材，最多上传3张,每张素材大小不超过3M
    <div style="display:flex">
       <div v-for="(item,index) in imgArr" :key="index">
       <img @mouseover="mouseover(item)" 
            @mouseleave="mouseLeave(item)"
           style="margin-right:24px" width="100" height="100" :src="item.src" alt=""/>
        <div  @mouseover="mouseover(item)" 
              @mouseleave="mouseLeave(item)" 
              v-show="item.show" 
              @click="deletePic(item)" 
              :class="[item.show?'delete-pic':'']">X</div>
        </div>
        <el-upload
               style="margin-right:24px"
               v-if="imgArr.length<3"
                accept="image/png,image/jpg,image/jpeg"
                ref="rebateUpload"
                class="avatar-uploader"
                :limit="1"
                action="#"
                :before-upload="beforeUpload"
                :file-list="fileList"
                :on-change="getLocalImg"
                :on-exceed="uploadExceed"
                :show-file-list="false"
              >
                <div class="show-img-word">
                <div> 
                    <img class="key-line" src="@/assets/img/ai/keyline.png" alt=""/>
                </div>
                  <p class="photo">上传照片</p>
                </div>
              </el-upload>
        
    </div>
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
import * as api from "@/api/ai/org.js";
export default {
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
    troubleId:{},
    type: {
      type: String,
      default: "",
    }
  },
  watch: {
    visible() {
      if (this.type === 'edit') {
        this.ruleForm=this.row
        let  str =this.row.sampleImgs
        let  arr = str.split( ',' );
        this.imgArr=[]
        arr&&arr.map(item=>{
          this.imgArr.push({
            show:false,
            url:item,
           src:item,
           file:'',
           id:item
          })
        })
      } else {
         this.ruleForm={}
         this.imgArr=[]
      }
    },
  },
    data() {
      const validatePeriod = (rule, value, callback) => {
        if(!value){
          callback();
        }else if(!/^[1-9]\d*$/.test(value)) {
         callback(new Error("只能输入大于0的整数"));
        }else{
       callback();
      }
    };
      return {
        file:'',
        showPhoto:false,
        fileList: [],
        isHidden:false,
        imgArr:[],
        ruleForm: {
          name: '',
          number:'',
          type:'',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '隐患名称不能为空', trigger: 'blur' },
            { max: 18, message: '长度不能超过18个字符', trigger: 'blur' }
          ],
           code: [
            { required: true, message: '编号不能为空', trigger: 'blur' },
            {  max: 18, message: '长度不能超过18字符', trigger: 'blur' },

          ],
          period:[
          {trigger: 'blur',validator:validatePeriod },
          ]
        }
      }
    },
  methods:{
    add(){
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let imgs=[]
            this.imgArr.map(item=>{
              imgs.push(item.src)
            })
             const params={
              code:this.ruleForm.code,
              description:this.ruleForm.description,
              type:this.ruleForm.type,
              name:this.ruleForm.name,
              period:this.ruleForm.period,
              sampleImgs:imgs.join(','),
              troubleId:this.troubleId,
              harmResult:this.ruleForm.harmResult
             }
              if(this.type==='add'){
                api.addPoint(params).then(res=>{
              if(res.code===0){
                    this.$message.success('添加成功')
                    this.handleClose()
              }
             }).catch(res=>{

             })
              }else{
                params.id=this.row.id
                api.editPoint(params).then(res=>{
                  if(res.code===0){
                    this.$message.success('修改成功')
                    this.handleClose()
              }

                })
              }
            
          }
        });  
    },
    // 删除图片
    deletePic(items){
     this.imgArr.splice(
            this.imgArr.findIndex((item) => item.id === items.id),
            1
          );
    },
    mouseover(item){
        item.show=true
    },
    mouseLeave(item){
        item.show=false
    },
    handleClose(){
   this.$emit("close-callback");
   this.$refs.ruleForm&&this.$refs.ruleForm.resetFields();
    },
    getLocalImg(event, fileList) {
      if(this.showPhoto){
       let url = "";
      if (window.createObjectURL !== undefined) {
        url = window.createObjectURL(event.raw);
      } else if (window.URL !== undefined) {
        url = window.URL.createObjectURL(event.raw);
      } else if (window.webkitURL !== undefined) {
        url = window.webkitURL.createObjectURL(event.raw);
      }
      let formData=new FormData()
      formData.set('img',this.file)
      api.addImg(formData).then(res=>{
        this.imgArr.push({
        show:false,
        url:url,
        src:res.message,
        file:this.file,
        id:this.file.uid
      })
      })
      //强制刷新，嵌套太深
      this.$forceUpdate();
      this.showPhoto=false
      }
    },
      beforeUpload(file) {
          const isLtSize = file.size / 1024 /1024<1
          let types = ['image/jpeg', 'image/jpg', 'image/png'];
          const isImage = types.includes(file.type)
          if(!isImage){
            this.$message.warning('上传图片只能是 JPG、JPEG、PNG 格式!')
          }
          if (!isLtSize) {
          this.$message.warning(`上传图片大小不能超过1MB!`)
          }
          if(isLtSize&& isImage){
            this.file=file
            this.showPhoto=true
          }else{
            this.showPhoto=false
          }
    },
    uploadExceed(files, fileList) {
      this.$set(fileList[0], "raw", files[0]);
      this.$set(fileList[0], "name", files[0].name);
      this.$refs["rebateUpload"].clearFiles(); // 清除文件
      this.$refs["rebateUpload"].handleStart(files[0]); // 选择文件后的赋值方法
    }
  }
}
</script>
<style lang="scss" scoped>
      .img-container{
     /deep/.el-dialog__title {
    font-weight: 550;
    font-size: 18PX;  
    color: #0A1933;
}

.tips{
font-size: 14PX;
color: rgba(10,25,51,0.5);
}
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
}
</style>