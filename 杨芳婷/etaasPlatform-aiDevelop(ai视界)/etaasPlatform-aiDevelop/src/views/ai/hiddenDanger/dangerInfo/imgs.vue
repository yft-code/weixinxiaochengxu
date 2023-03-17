<template>
  <div class="img-container">
     <el-dialog
        title="新增图集"
        :visible.sync="visible"
        width="800px"
        :before-close="handleClose"
      >
  <div style="border-top:1px solid rgba(10, 25, 51, 0.0500);min-height: 250px;">
   <el-form 
   style="margin-top:20px" 
   :model="ruleForm" 
   label-position="right"
    ref="ruleForm" 
    size="mini"
    label-width="105px" 
    class="ruleForm">
  <el-col :span="23">
     <el-form-item label="隐患素材" prop="desc">
      <span class="tipss">请上传隐患图片素材,最多上传10张,每张素材大小不超过3M</span>
  
    <div style="
     width: 100%;
     display: flex;
     margin-top:14px;
     font-size: 16px;
     flex-wrap: wrap;">
       <div class="imgLi" v-for="(item,index) in imgArr" :key="index">
       <img @mouseover="mouseover(item)" 
            @mouseleave="mouseLeave(item)"
           style="margin-right:24px" width="100" height="100" :src="item.url" alt=""/>
        <div  @mouseover="mouseover(item)" 
              @mouseleave="mouseLeave(item)" 
              v-show="item.show" 
              @click="deletePic(item)" 
              :class="[item.show?'delete-pic':'']">X</div>
        </div>
        <el-upload
               style="margin-right:24px"
               v-if="imgArr.length<10"
                :multiple="true" 
                action="#"
                accept="image/png,image/jpg,image/jpeg"
                ref="rebateUpload"
                class="avatar-uploader"
                :limit="10"
                :http-request="uploadImgs"
                :before-upload="beforeUpload"
                :file-list="fileList"
                :on-exceed="handleExceed"
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
    rowImg: {},
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    }
  },
    data() {
      return {
        imgArrs:[],
        file:'',
        showPhoto:false,
        fileList: [],
        isHidden:false,
        imgArr:[],
        ruleForm:{}
      }
    },
  methods:{
    uploadImgs(){
    let formData=new FormData()
    formData.set('img',this.file)
    api.addImg(formData).then(res=>{
      this.imgArr.push({
      show:false,
      url:res.message,
      id:this.file.uid
    })
    })
    },
    add(){
      let arr=[]
      let formData=new FormData()
      this.imgArrs.forEach(file => {
      formData.append('imgs', file.file)
    })
       formData.append('id',this.rowImg.id)
       api.addImgLists(formData).then(res=>{
          if(res.code===0){
              this.$message.success("保存成功")
              this.handleClose()
          }
       })
    },

    // 删除图片
    deletePic(items){
     this.imgArr.splice(
            this.imgArr.findIndex((item) => item.id === items.id),
            1
          )
          this.imgArrs.splice(
            this.imgArr.findIndex((item) => item.id === items.id),
            1
          )
    },
    mouseover(item){
        item.show=true
    },
    mouseLeave(item){
        item.show=false
    },
    handleClose(){
      this.$emit("close-callback");
      this.imgArr=[]
      this.imgArrs=[]
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
      // this.imgArr.push({
      //   show:false,
      //   url:url,
      //   file:this.file,
      //   id:this.file.uid
      // })
      // this.showPhoto=false
      // this.fileList.push(fileList)
      }
    },
    
    handleExceed(files,fileList) {
      this.$message.warning(`最多只能上传10个图片`);
    },
      beforeUpload(file) {
        const isLtSize = file.size / 1024 /1024< 3
        let types = ['image/jpeg', 'image/jpg', 'image/png'];
          const isImage = types.includes(file.type)
          if(!isImage){
            this.$message.warning('上传图片只能是 JPG、JPEG、PNG 格式!')
          }
       if (!isLtSize) {
        this.$message.warning(`上传图片大小不能超过3MB!`)
      }
      if(isImage&&isLtSize){
        this.file=file
        this.imgArrs.push({
        id:this.file.uid,
        file:file
        })
      }
      return isLtSize && isImage
    },
    uploadExceed(files, fileList) {
      this.$set(fileList[0], "raw", files[0]);
      this.$set(fileList[0], "name", files[0].name);
      // this.$refs["rebateUpload"].clearFiles(); // 清除文件
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
  .ruleForm{
  /deep/.el-form-item__label {
  font-family: SimHei; 
  font-size: 16PX !important; 
  color: #0A1933;
}
.tips{
font-size: 14PX;
color: rgba(10,25,51,0.5);
}
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
  .imgLi {
   margin-right: 20PX;
   margin-bottom: 20PX;
   width: 100PX;
   height: 100PX;
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