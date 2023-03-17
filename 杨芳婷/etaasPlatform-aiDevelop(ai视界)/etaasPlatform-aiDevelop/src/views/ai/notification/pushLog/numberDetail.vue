<template>
  <div class="algorithm_update">
    <div class="close-btn">
      <el-dialog
        :visible.sync="visible"
        width="780px"
        :before-close="handleClose"
        :close-on-click-modal="false"
      >
        <div slot="title">
          <div class="checkDialogTitle">
            <div style="display: flex; align-items: center">
              <div
                :style="{
                  background:
                    formData && formData.warning && formData.warning.levelColor,
                }"
                class="points"
              ></div>
              <div class="warningName">
                {{ formData && formData.warning && formData.warning.name }}
              </div>
              <div class="title">事件编号:{{ numberName}}</div>
            </div>
          </div>
        </div>
        <div>
          <div class="edit_input">
            <div class="input_container">
              <div class="list-group">
                <el-form
                  :model="formData"
                  label-width="140px"
                  label-position="right"
                >
      
                  <el-form-item label="园区/厂区名称">{{formData.device.parkName}}</el-form-item>
                
                  <el-form-item label="楼层">{{formData.device.floor}}</el-form-item>
                  <el-form-item label="设备名称">{{formData.device.deviceName}}</el-form-item>
                  <el-form-item label="预警类型">{{formData.warning.type}}</el-form-item>

                  <el-form-item label="预警等级">{{formData.warning.levelName}}</el-form-item>
                  <el-form-item label="预警时间">{{formData.datetime}}</el-form-item>                  
                
                  <el-form-item label="通知对象">
                    <span class="detailContent"> 
                     {{arrName}}
                    </span>
                   
                  </el-form-item>
                </el-form>
              </div>
              <div class="phone_container">
                <div style="height: 220px" v-loading="imgLoading"  >
                  <img
                    class="imgStyle"
                    :src="imgUrl"
                    height="220px"
                    @click="lookImg"
                    v-show="!imgLoading"
                  />
                </div>
                <div style="margin-top: 16px">
                  <el-button size="mini" type="primary" @click="lookVideo"
                    >视频留证</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="handleClose">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
     <videoPlay :videoUrl="videoUrl" :visible="videoVisible" @close-callback-video="handleCloseVideo"></videoPlay>
     <pic :visible="picVisible" :imgUrl="imgUrl" @close-callback-pic="handleClosePic"></pic>
  </div>
</template>
<script>
import {getAlarmDataById, getRecordByDevice} from "../../../../api/ai/pushLog";
import pic from './pic.vue'
import videoPlay from './videoPlay.vue'
export default {
  components: {
    videoPlay,
    pic
  },
  name: "numberDetail",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    warningNumberId: {
      type: String,
      default: "",
    },
     numberName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      videoUrl:'',
      videoVisible:false,
      picVisible:false,
      imgVisible:false,
      imgLoading: true,
      imgUrl: "",
      arrName:'',
      formData: {
        pic:'',
        warning:{
          levelName:'',
          type:''
        },
        device:{
          buildingName:'',
          areaName:'',
          parkName:'',
          floor:'',
          deviceName:''
        }
      },
      users:[]
    };
  },
  mounted() {},
  watch: {
    visible(n, o) {
      if (n) {
        const params = {
          id:this.warningNumberId
        }
        getAlarmDataById(params.id).then((res) => {
        let arr = [];
         this.formData = res.result
         this.users = res.result.users
         if(this.users.length===0){
           this.users.push({name:'--'})
         }else{
           this.users.map(element =>{
              arr.push(element.name)
           })
           this.arrName = arr.join(',');
         }
         this.imgUrl = res.result.pic
         
    });
      } else {
      }
    },
     "formData.pic": {
      handler(val) {
        this.imgLoading = true;
        this.imgUrl = "";
        if(localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))){
           const userInfo = JSON.parse(localStorage.getItem("userInfo"))['aiHorizon'];
            if (userInfo) {
              this.getImgUrl({
                url: val,
                content: userInfo.userAccount,
                cb: (base64Url) => {
                  // 使用两种方法设置显示img的src都可以
                  // document.getElementById('myimg').src = base64Url
                  this.imgUrl = base64Url;
                  setTimeout(() => {
                    this.imgLoading = false;
                  });
                },
              });
            }
        }
       
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    lookImg() {
      this.picVisible = true
    },
      handleClosePic(){
      this.picVisible= false
    },
    handleCloseVideo(){
      this.videoVisible = false
    },
    
    lookVideo() {
      const params = {
        id: this.formData.device.id,
        time: this.formData.datetime,
      };
      getRecordByDevice(params).then((res) => {
        this.videoUrl = res.result;
        if (this.videoUrl) {
         this.videoVisible  =true
        } else {
          this.$message({
            message: "暂无视频记录",
            type: "warning",
          });
        }
      });
    },

    // 关闭弹框
    handleClose() {
      this.$emit("close-callback-number");
    },

    getImgUrl({
      url = "",
      textAlign = "left",
      textBaseline = "top",
      font = "108px Microsoft Yahei",
      fillStyle = "rgba(255, 255, 255, 0.5)",
      content = "我是默认的水印参数",
      cb = null,
      textX = 100,
      textY = 30,
    } = {}) {
      // 创建所需要添加水印的img图片
      const img = new Image();
      img.src = url;
      img.crossOrigin = "anonymous";

      img.onload = () => {
        // 创建canvas，并将创建的img绘制成canvas
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0);
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.font = font;
        ctx.fillStyle = fillStyle;
        // ctx.rotate((Math.PI / 180) * 15)
        // 循环绘制水印
        // for (let i = 0; i < img.height / 120; i++) {
        //   for (let j = 0; j < img.width / 50; j++) {
        //     ctx.fillText(content, i * 200, j * 100, img.width)
        //   }
        // }
        ctx.fillText(content, 200, 880, img.width);
        // 将绘制完成的canvas转换为base64的地址
        const base64Url = canvas.toDataURL();
        cb && cb(base64Url);
      };
    },
  },
};
</script>

<style lang="scss" scoped>

.algorithm_update .container_list .show[data-v-79e5ddda] {
  margin-left: 157px !important;
  margin-top: -14px !important;
}
/deep/ .el-upload__input {
  display: none;
}
/deep/.el-loading-spinner .circular {
  height: 28px;
  width: 28px;
  -webkit-animation: loading-rotate 2s linear infinite;
  animation: loading-rotate 2s linear infinite;
}
/deep/.el-loading-spinner {
  top: 91%;
  margin-top: -22px;
  width: 30px;
  text-align: center;
  position: absolute;
}
.close-btn {
  /deep/.el-dialog__headerbtn {
    position: absolute;
    top: 18px;
    display: none;
    right: 20px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 16px;
  }
}
.points {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.title {
  margin-left: 25px;
  font-size: 18px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: rgba(10, 25, 51, 0.65);
}
.checkDialogTitle {
  font-size: 20px;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-weight: 600;
  color: #0a1933;
  line-height: 32px;
  padding-left: 0px;
  float: left;
}
.checkEvent {
  float: right;
  padding-left: 16px;
  padding-right: 8px;
  min-width: 115px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  color: #347fff;
  font-size: 18px;
  margin-right: 0px;
}
.checkDialogWarning {
  float: left;
  padding-left: 16px;
  padding-right: 8px;
  min-width: 115px;
  height: 32px;
  line-height: 32px;
  background: #ff3a3a;
  border-radius: 4px;
  color: #fff;
  font-size: 18px;
  margin-left: 16px;
}
.checkDialogisWarning {
  float: left;
  padding-left: 16px;
  padding-right: 8px;
  min-width: 115px;
  height: 32px;
  line-height: 32px;
  background: lightgray;
  border-radius: 4px;
  color: #fff;
  font-size: 18px;
  margin-left: 16px;
}
.checkWay {
  cursor: pointer;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  color: #347fff;
  font-size: 18px;
}
.event-repeat {
  cursor: pointer;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  color: #347fff;
  font-size: 18px;
  margin-left: 10px;
}
.closeIcon {
  cursor: pointer;
  font-size: 22px;
  margin-left: 15px;
  color: lightgrey;
  &:hover {
    color: #347fff;
  }
}

.warningLevelSecond {
  background: #fa9c50;
}
.warningLevelThird {
  background: #848c99;
}
.clear {
  clear: both;
}
.check-type {
  color: #ff3a3a;
}
.pre-file {
  color: #347fff;
  cursor: pointer;
}
.algorithm_update {
  .checkDidalogSpan {
    float: left;
    width: 100%;
    margin-top: -12px;
    line-height: 24px;
    height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .edit_input {
    width: 99%;
    margin-top: 0;
    border-top: 1px solid rgba(10, 25, 51, 0.05);
  }
  .bottom_container {
    width: 100%;
    margin: 5px auto;
    ::v-deep .el-icon-document:before {
      content: "\e77d";
    }
    ::v-deep .el-upload-list__item:first-child {
      margin-top: 3px;
    }
    .upload-demo {
      display: flex;
      ::v-deep .el-upload-list__item-name {
        color: #347fff;
      }
    }
  }
  .detail_container {
    width: 100%;
    margin: 5px auto;
    ::v-deep .el-form-item__content {
      line-height: 0px;
      color: #0a1933;
      margin-top: 8px;
    }
    ::v-deep.el-form-item__label {
      line-height: 0px;
      color: #0a1933;
      margin-top: 8px;
    }
    .wrapper_contaier {
      margin-top: -32px;
      width: 90%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .wrapper-content {
        width: 33%;
        margin-top: 5px;

        .show {
          display: none;
        }
        a:hover {
          background-color: rgb(245, 247, 250);
          .show {
            display: inline-block;
          }
        }
      }
      .word_container {
        margin-left: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .over-title {
    position: relative;
    width: 70px;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -icab-text-overflow: ellipsis;
    -khtml-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
  }
  .list_view {
    padding-top: 10px;
    margin-top: -6px;
    width: 300px;
    margin-left: 168px;
  }
  .container_list {
    margin-top: 6px;
    .show {
      display: none;
    }
    a:hover {
      background-color: rgb(245, 247, 250);
      .show {
        display: inline-block;
      }
    }
    /deep/.el-upload-list {
      margin-left: 20px;
    }
  }
  .input_container {
    width: 100%;
    margin: 20px auto;
    display: flex;
    .list-group {
      width: 40%;
      ::v-deep .el-form-item__content {
        line-height: 0px;
        color: #0a1933;
        margin-top: 8px;
      }
      ::v-deep.el-form-item__label {
        line-height: 0px;
        color: #0a1933;
        margin-top: 8px;
      }
    }
    .detail_list {
      margin-bottom: 20px;
    }
    .phone_container {
      width: 60%;
      img {
        width: 100%;
        // height: 220px;
      }
    }
  }
  ::v-deep .el-dialog__title {
    color: #0a1933;
    line-height: 60px;
    font-weight: 550;
  }
  .input_border {
    width: 99%;
    border-top: 1px solid rgba(10, 25, 51, 0.05);
    margin: -50px auto;
    margin-bottom: 20px;
  }
  .box_check {
    ::v-deep .el-radio__inner {
      border-radius: 0;
    }
  }
}
/deep/ .el-dialog__body{
  padding: 20px 20px 10px !important;
}
.clear{
  clear:both;
}

.detailContent{
  display:inline-block;
  line-height: 26px;
  margin-top:-12px;
}
</style>