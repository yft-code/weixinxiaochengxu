<template>
  <div class="deviceContainer">
   <div class="deviceContent">
      <div class="title">以图搜图</div>
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
                accept="image/png,image/gif,image/jpg,image/jpeg"
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
        <el-form ref="form" :model="form" size="small" :rules="inputRules" label-width="100px">
          <el-form-item label="查询时间">
          <el-date-picker
              @change="changeTime"
              style="width:60%"
              :append-to-body="false"
              popper-class="pickerPopper"
              v-model="time"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="相似度" prop="similarity">
            <el-select
              style="width:60%"
              :popper-append-to-body="false"
              v-model="form.similarity"
              class="formInput"
              placeholder="请选择"
            >
              <el-option
                v-for="item in List"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="抓拍设备" prop="deviceName">
             <el-select
             @change="changeDevice"
              style="width:60%"
              v-model="deviceName"
              multiple
              collapse-tags
              placeholder="请选择">
            <el-option
            v-for="item in deviceNameList"
            :key="item.value"
            :label="item.value"
            :value="item.value">
            </el-option>
       </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="reset">重置</el-button>
            <el-button type="primary" @click="check" :loading="loading">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="title">搜索结果</div>
    <div class="deviceTable" v-if="list&&list.length>0">
      <div class="captureLi" v-for="(item, index) in list" :key="index" v-loading="loading">
        <img :src=item.imgPath class="captureImg"/>
        <div class="captureDetail">
          <div class="captureDetailTitle">识别结果</div>
          <div class="captureDetailContent">{{ item.faceDbName?(item.faceDbName==='Unknown'?'未识别':item.faceDbName): '--'}}</div>
          <div class="clear"></div>

          <div class="captureDetailTitle">抓拍地点</div>
          <div class="captureDetailContent listAnother">{{ item.area }}</div>
          <div class="clear"></div>

          <div class="captureDetailTitle">抓拍时间</div>
          <div class="captureDetailContent listAnother" :title="item.time">{{ item.time }}</div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <div class="noResult" v-loading="loading" v-else>
     暂未匹配到人脸信息
    </div>
   </div>
  </div>
</template>
<script>
import {
  faceSearch
} from "@/api/ai/faceSearch";
import {
  getDeviceInfo
} from "@/api/ai/warningEvent";
import * as api from "@/api/ai/org.js";
export default {
  components: {},
  data() {
    const validatePhoto = (rule, value, callback) => {
      if (!this.ruleForm.path) {
        callback(new Error("照片不能为空"));
      } else {
        callback();
      }
    };
    return {
      path:'',
      fileList: [],
      imgLoading:true,
      loading:false,
      photoMark:false,
      inputMark:false,
      ruleForm:{
      path:'',
      },
      rules:{
          path: [{ required: true, trigger: "change", validator:validatePhoto }],
    },
    inputRules:{
      similarity:[
            { required: true, message: '相似度不能为空', trigger: 'change' }
          ],
          deviceName:[
            { required: true, message: '抓拍设备不能为空', trigger: 'change' }
          ],
    },
      time:[],
      showPhoto:false,
      isHidden:true,
      fileList: [],
      List:[{label:'高',value:'heigh'},
      {label:'中',value:'middle'},
      {label:'低',value:'low'}],
      deviceName:[],
      form: {
             startTime:'',
             endTime:'',
             deviceName:'',
             similarity:'',
             file:'',
             deviceNames:''
      },
      deviceNameList:[],
      imageUrl: "",
      list:[]
    };
  },
  watch: {},
  created() {
     this.getDevice()
  },
  mounted() {},
  methods: {
    reset(){
       this.list=[]
       this.loading=false
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
    changeTime(e){
      if(e){
        this.form.startTime=e[0]
        this.form.endTime=e[1]
      }
    },
    changeDevice(){
      this.form.deviceName=this.deviceName.join(',')
      if(this.deviceName.includes("全部")){
             this.form.deviceNames=''
      }else{
     this.form.deviceNames=this.deviceName.join(',')
      }
    },
    // 
    faceSearch(params){
      this.submitForm()
      if(this.photoMark&&this.inputMark){
        this.loading=true
         let formData = new FormData();
        formData.append("file", params.file);
        formData.append("startTime",params.startTime?params.startTime:'');
        formData.append("endTime", params.endTime?params.endTime:'');
        formData.append("deviceNames",params.deviceNames);
        formData.append("similarity", params.similarity);
       faceSearch(formData).then(res=>{
        if(res.code===0){
          this.$message.success('操作成功')
          let list=[]
        list=res.result
        this.list=list
        this.loading=false
        }
       
       }).catch(()=>{
        this.loading=false
       })
      }  
    },
    //获取设备名称
    getDevice() {
      getDeviceInfo()
        .then((res) => {
          if (res.code === 0) {
            let arr = []
            res.result.map(element=>{
              arr.push({value: element,label:element})
            })
            this.deviceNameList = arr;
          }
        })
        .catch();
    },
     // 获取上传图片的本地url，用于上传前的本地预览
     getLocalImg(event, fileList) {
      let url = "";
      if (window.createObjectURL !== undefined) {
        url = window.createObjectURL(event.raw);
      } else if (window.URL !== undefined) {
        url = window.URL.createObjectURL(event.raw);
      } else if (window.webkitURL !== undefined) {
        url = window.webkitURL.createObjectURL(event.raw);
      }
      this.path=url
      let self = this;
      //强制刷新，嵌套太深
      self.$forceUpdate();
    },
    uploadExceed(files, fileList) {
      this.$set(fileList[0], "raw", files[0]);
      this.$set(fileList[0], "name", files[0].name);
      this.$refs["rebateUpload"].clearFiles(); // 清除文件
      this.$refs["rebateUpload"].handleStart(files[0]); // 选择文件后的赋值方法
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
      if(isCommandType&&isLt4M){
          this.ruleForm.path=this.path
          this.isHidden = false
          this.form.file=file
          this.$forceUpdate();
          this.$refs.ruleForm.clearValidate('path');
      }else{
        this.ruleForm.path=''
        this.isHidden = true
        this.form.file=''
      }
      return isCommandType && isLt4M
    },
    // uploadExceed(files, fileList) {
    //   this.$set(fileList[0], "raw", files[0]);
    //   this.$set(fileList[0], "name", files[0].name);
    //   this.$refs["rebateUpload"].clearFiles(); // 清除文件
    //   this.$refs["rebateUpload"].handleStart(files[0]); // 选择文件后的赋值方法
    // },
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
      // margin-bottom: -10PX;
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
