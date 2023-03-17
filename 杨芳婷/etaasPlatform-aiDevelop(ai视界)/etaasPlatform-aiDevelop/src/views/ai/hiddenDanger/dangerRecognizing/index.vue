<template>
    <div class="deviceContainer">
     <div class="deviceContent">
        <div class="title">隐患识别</div>
      <div class="warp">
        <div class="left">
          <el-form 
           :model="ruleForm"
            ref="ruleForm"
            :rules="rules">
            <el-form-item
            ref="photo"
            prop="path">
            <el-upload
                accept="image/png,image/jpg,image/jpeg"
                class="avatar-uploader"
                action="string"
                :show-file-list="false"
                :http-request="uploadImgs"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeUpload"
              >
                <div class="show-img-word" v-if="isHidden">
                <div> <img class="key-line" src="@/assets/img/ai/keyline.png" alt=""/></div>
                </div>
                <p v-if="isHidden" class="photo">上传照片</p>
                <img
                  class="show-img-word"
                  v-if="!isHidden"
                  :src="ruleForm.path"
                  width="100%"
                  height="100%"
                />
              </el-upload>
            <div :class="[this.ruleForm.path?'hasPath':'tips']">大小不超过1m</div>
            </el-form-item>
          </el-form>
         
        </div>
        <div class="right">
          <el-form ref="form" :model="form" size="small" :rules="inputRules" label-width="150px">
            <el-form-item label="隐患库" prop="id">
              <el-select
                style="width:60%"
                :popper-append-to-body="false"
                v-model="form.id"
                class="formInput"
                placeholder="请选择隐患库"
              >
                <el-option
                  v-for="item in list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="相似度阈值(100%)" prop="conf">
               <el-input placeholder="请输入相似度阈值"  style="width:60%" v-model="form.conf"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="reset">重置</el-button>
              <el-button type="primary" @click="check" :loading="loading">提交检测</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="title">识别结果</div>
      <div class="titles">
        <!-- <div class="commonWord">照明设备置于灯架正上方</div>
      <div class="elProgress">
        <el-progress  :stroke-width="12" :percentage="50"></el-progress>
    </div> -->
      <div v-if="resultArr&&resultArr.length>0">
        <div  v-for="(item,index) in resultArr" :key="index+10"> 
     <div  class="commonWord">{{item.name}}</div>
      <div class="elProgress">
        <el-progress  :stroke-width="12" :percentage="item.maxConf"></el-progress>
     </div>
</div>
      </div>
   
      <div style="padding-bottom:20px" v-if="resultArr&&resultArr.length>0">
        <div  v-for="(item,index) in resultArr" :key="index">
        <div class="middleTitle">
           <span class="middleLeft">{{item.name}}</span>
           <span class="middleRight">{{item.type}}隐患|整改周期{{item.period}}天</span>
        </div>
        <div class="middleResult">
        <div>
           <div class="question">问题样例</div>
           <div class="imgResult" v-if="item.problemImgs&&item.problemImgs.length>0">
            <div  v-for="(val,index) in item.problemImgs" :key="index+6">
                 <div class="hiddenTips">隐患</div>
                 <img class="imgList" :src="val" alt="">    
            </div>
           </div>
           <div v-else>--</div>
           
        </div>
        <div>
           <div>
            <span class="middleLefts">规范样例</span>
            <span class="checkDescript" @click="checkRules(item)">查看规范说明</span>
           </div>
           <div class="imgResult" v-if="item.sampleImgs&&item.sampleImgs.length>0">
            <div  v-for="(ele,index) in item.sampleImgs" :key="index+5">
                 <div class="hiddenCheckTips">样本</div>
                 <img class="imgList" :src="ele" alt="">
            </div>
        </div>  
        <div class="noDataPic" v-else>暂无样例图</div>  
        </div>
    </div>
    </div>
  
      </div>
      <div class="noResult" v-loading="loading" v-if="resultArr.length<=0">
       暂未匹配到结果信息
      </div>
      </div>

     </div>
     <checkSample :type="type" @close="close"  :arr="arr"  :innerVisible="innerVisible"></checkSample>
    </div>
  </template>
  <script>
    import * as api from "@/api/ai/dangerlibManage.js";
    import  checkSample from '@/views/ai/hiddenDanger/dangerInfo/checkSample.vue'
    import * as apis from "@/api/ai/org.js";
  export default {
    components: {checkSample},
    data() {
      const validatePhoto = (rule, value, callback) => {
        if (!this.ruleForm.path) {
          callback(new Error("照片不能为空"));
        } else {
          callback();
        }
      };

      const validateConf = (rule, value, callback) => {
        let conf = /^([0-9]{1,2}$)|(^[0-9]{1,2}\.[0-9]{1,2}$)|100$/
        if (!value) {
          callback(new Error("相似度阈值不能为空"));
        } else if(!conf.test(value)) {
          callback(new Error("请输入0-100之间的数字,最多保留两位小数"));
        }else{
          callback()
        }
      };
      return {
        type:'',
        innerVisible:false,
        resultArr:[],
        arr:{},
        loading:false,
        photoMark:false,
        inputMark:false,
        ruleForm:{
        path:'',
        },
        rules:{
            path: [{ required: true, trigger: "blur", validator:validatePhoto }],
      },
      inputRules:{
        id:[
              { required: true, message: '隐患库不能为空', trigger: 'change' }
            ],
        conf:[
              { required: true, trigger: 'blur',validator:validateConf }
            ],
      },
        time:[],
        showPhoto:false,
        isHidden:true,
        fileList: [],
        deviceName:[],
        form: {
               id:null,
               file:'',
               conf:null,
        },
        deviceNameList:[],
        imageUrl: "",
        list:[]
      };
    },
    watch: {},
    created() {
       this.getHiddenList()
    },
    mounted() {},
    methods: {
    uploadImgs(file){
    this.isHidden = false;
    let formData=new FormData()
    formData.set('img',file.file)
    apis.addImg(formData).then(res=>{
      if(res.code===0){
        this.form.file=file.file
        this.ruleForm.path=res.message
        this.$refs.photo.clearValidate();
      }else{
          this.$message.warning('图片上传失败请重新上传')
      }
    }).catch(res=>{
      this.$message.warning('图片上传失败请重新上传')
    })
    },
      // 获取隐患库列表
      getHiddenList(){
           let params={
            limit: 9999,
             current: 1
           }
           api.gethiddenList(params).then(res=>{
            let list=[]
            res&&res.result&&res.result.list&&res.result.list.map(item=>{
                list.push({
                  name:item.name,
                  id:item.id
                })
            })
            this.list=list
           })
      },
        // 查看规范样例说明
        checkRules(item){
             this.arr=item
             this.type='select'
             this.innerVisible=true
        },

            // 关闭规范样例
    close(){
    this.innerVisible=false
    },
      reset(){
        this.resultArr=[]
         this.$refs.form.resetFields();
         this.$refs.ruleForm.resetFields();
         this.form={}
         this.isHidden=true
         this.deviceName=[]
         this.time=[]
      },
       submitForm(){
          this.$refs.ruleForm.validate((valid) => {
            if (valid) {
             this.photoMark=true
            } else {
              this.photoMark=false
            }
          });
          this.$refs.form.validate((valid) => {
            if (valid) {
             this.inputMark=true
            } else {
              this.inputMark=false
            }
          });
        },
      check(){
          this.faceSearch(this.form)
      },
      // 
      faceSearch(params){
        this.submitForm()
        if(this.photoMark&&this.inputMark){
          this.loading=true
           let formData = new FormData();
          formData.append("file", params.file);
          formData.append("id",params.id);
          formData.append("conf", params.conf);
         api.selecthiddenList(formData).then(res=>{
          if(res.code===0){
            this.$message.success('操作成功')
            let list=[]
            list=res.result
            this.resultArr=list
            this.loading=false
          }
         }).catch(()=>{
          this.loading=false
         })
        }  
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
        this.ruleForm.path = url;
        this.isHidden = false;
        this.$refs.photo.clearValidate();
        //强制刷新，嵌套太深
        this.$forceUpdate();
        this.showPhoto=false
        }
      },
      beforeUpload(file) {
      const isCommandType = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
      const isLt4M = file.size / 1024 / 1024 < 1

      if (!isCommandType) {
        this.$message.warning('上传图片只能是 JPG、JPEG、PNG 格式!')
      }

      if (!isLt4M) {
        this.$message.warning('上传头像图片大小不能超过 1MB！')
      }
      return isCommandType && isLt4M
    },
      uploadExceed(files, fileList) {
        this.$set(fileList[0], "raw", files[0]);
        this.$set(fileList[0], "name", files[0].name);
        this.$refs["rebateUpload"].clearFiles(); // 清除文件
        this.$refs["rebateUpload"].handleStart(files[0]); // 选择文件后的赋值方法
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;
  
        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .deviceContainer {
    width: 100%;
      .deviceContent {    
      font-family: PingFangSC-Medium, PingFang SC;
      width: 97%;
      margin: 24px auto;
      height: 100%;
      box-sizing: border-box;
      border-radius: 8px;
      box-shadow: 0px 0px 7px -3px rgba(33, 72, 141, 0.2);
      background:#fff;
    }
    }
  .captureDetailContent{
     float:left;
    color: #347FFF;
    margin-left:16px;
    line-height: 28PX;
    max-width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .listAnother{
  color: #0A1933;
  }
  .captureImg{
    display: block;
    width:100%;
  }
  .clear{
    clear:both;
  }
  .captureLi {
    width: calc(100% / 6);
    padding: 12px 12px;
  }
  .captureDetail {
    background: rgba(52, 127, 255, 0.03);
    font-size: 12px;
    padding: 16px;
  }
  .captureDetailTitle {
    float: left;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #0a1933;
    line-height: 28PX;
    opacity: 0.64;
  }
  .deviceTable {
    width: 100%;
    display: flex;
    font-size: 16px;
    flex-wrap: wrap;
    padding: 0 12px;
  }
  .title {
    margin-bottom:20PX;
    font-size: 18px;
    font-weight: bold;
    padding: 20PX 0 0 24PX;
    color: #0a1933;
  }
  .titles{
    padding-left: 35PX;
  }
  .commonWord{ 
   font-size: 16px; 
   font-weight: 400;
   padding-bottom:12px;
   color: #0A1933;
  }

  .middleTitle{
margin-top:36px;
  }

  .middleResult{
    display: flex;
    margin-top: 27PX;
  }
.question{
font-size: 16px;
font-weight: 400;
color: #0A1933;
}
  .checkDescript{
    cursor:pointer;
     padding-left:14px;
     font-size: 16px;
     font-weight: 400;
     color: #347FFF;
  }
  .middleLeft{
font-size: 16px;
font-weight: 550;
color: #0A1933;
  }
  .middleLefts{
    font-size: 16px;
    font-weight: 500;
    color: #0A1933;
  }
  .middleRight{
font-size: 16px;
padding-left: 8px;
color: rgba(10,25,51,0.5);
  }
   .imgResult{
    display: flex;
    margin-top: 16PX;
    width: 530PX;
   }
  .noDataPic{
    height: 150PX;
    line-height: 150PX;
    font-size: 16px;
    width: 500PX;
    text-align: center;
    color:#0A1933 ;
  }
  .imgList{
    width: 150PX;
    height: 150PX;
    margin-right: 20px;
  }

  .hiddenTips{
    position:absolute;
    padding: 5PX;
    margin-left: 105PX;
    margin-top: 8PX;
    font-size: 12px;
    color: #FFFFFF;
    background-color: rgba(255, 58, 58, 1);
  }
  
  .hiddenCheckTips{
    position:absolute;
    padding: 5PX;
    margin-left: 105PX;
    margin-top: 8PX;
    font-size: 12px;
    color: #FFFFFF;
    background-color: rgba(2, 214, 36, 1);
  }

  .elProgress{
    width: 40%;
    padding-bottom: 24px;
  }
  .warp {
    display: flex;
    margin-left: 40px;
  }
  .left {
    .photo{
      position: absolute;
      font-size: 14PX;
      width: 100PX;
      text-align: center;
      margin-top: -55PX;
     color: rgba(10,25,51,0.2);
    }
     .tips{
      width: 100PX;
      text-align: center;
      font-size: 14PX;
      color: rgba(10,25,51,0.2);
     }
     .hasPath{
       width: 100PX;
      text-align: center;
      font-size: 14PX;
      color: rgba(10,25,51,0.2);
      margin-top: -15PX;
     }
    .key-line{
        width: 20PX;
        height: 20PX;
        margin-bottom: 15PX;
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
    /deep/ .el-upload__input {
      display: none;
    }
  }
  .noResult{
   padding: 180px 0 200px 0;
   text-align: center;
   font-size: 24px;
  color: rgba(10, 25, 51, 0.3);
  }
  .right {
    width: 60%;
  }
  </style>
  