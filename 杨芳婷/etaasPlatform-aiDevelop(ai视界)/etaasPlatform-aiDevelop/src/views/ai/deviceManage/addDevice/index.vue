<template>
  <div class="addDevice">
    <el-dialog
      width="800px"
      :title="title"
      :visible.sync="visible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <div class="form_br"></div>
      <div style="overflow: auto" :style="{ maxHeight: `${screenHeight1}px` }">
        <el-form
          v-loading="loading"
          :rules="rules"
          ref="ruleForm"
          :model="ruleForm"
          label-width="140px"
          size="mini"
        >
          <div style="display: flex">
            <el-form-item label="ID" v-show="disableFlag === true">
              <el-input
                style="width: 200px"
                v-model="ruleForm.id"
                :disabled="disableFlag"
              ></el-input>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item label="设备序列号" prop="serialNumber">
              <el-input
                style="width: 200px"
                maxlength="16"
                :disabled="disableFlag"
                v-model="ruleForm.serialNumber"
                placeholder="请输入设备序列号"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备IP" prop="ip">
              <el-input
                style="width: 200px"
                v-model="ruleForm.ip"
                placeholder="请输入设备IP"
              ></el-input>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item label="设备用户" prop="username">
              <el-input
                style="width: 200px"
                maxlength="50"
                v-model="ruleForm.username"
                placeholder="请输入设备用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备密码" prop="password">
              <el-input
                style="width: 200px"
                maxlength="50"
                v-model="ruleForm.password"
                placeholder="请输入设备密码"
              ></el-input>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item label="rtsp地址" prop="rtsp">
              <el-input
                style="width: 450px"
                maxlength="100"
                type="textarea"
                v-model="ruleForm.rtsp"
                placeholder="请输入rtsp地址"
              ></el-input>
            </el-form-item>
            <el-upload
              class="upload-demo upload"
              action=""
              :http-request="handleVideoSuccess"
              v-bind:before-upload="beforeUploadVideo"
              multiple
              accept="video/mp4, video/ogg, video/flv, video/avi, video/wmv, video/rmvb, video/mov"
              :show-file-list="false"
            >
              <el-button size="small" type="primary">视频上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </div>
          <!-- <el-form-item label="rtsp地址" prop="rtsp">
              <el-input
                  style="width: 540px"
                  maxlength="100"
                  type="textarea"
                  v-model="ruleForm.rtsp"
                  placeholder="请输入rtsp地址"
              ></el-input>
            </el-form-item> -->

          <div style="display: flex">
            <el-form-item label="园区/厂区名称" prop="parkName">
              <el-select
                v-model="ruleForm.parkName"
                style="width: 200px"
                placeholder="请选择"
                @change="parkNameChange"
              >
                <el-option
                  v-for="item in parkNameList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <!-- <el-input
                style="width: 540px"
              maxlength="50"
              v-model="ruleForm.parkName"
              placeholder="请输入园区/厂区名称"
            ></el-input> -->
            </el-form-item>
            <el-form-item label="建筑名称" prop="buildingName">
              <el-select
                style="width: 200px"
                v-model="ruleForm.buildingName"
                placeholder="请选择"
                @change="buildingChange"
              >
                <el-option
                  v-for="item in buildingNameList"
                  :key="item.id"
                  :label="item.buildingName"
                  :value="item.id"
                />
              </el-select>
              <!-- <el-input
                style="width: 200px"
                maxlength="50"
                v-model="ruleForm.buildingName"
                placeholder="请输入建筑名称"
            ></el-input> -->
            </el-form-item>

            <!-- <el-form-item label="楼层" prop="floor">
            <el-input  type="text"  value="" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" style="width: 200px"  v-model="ruleForm.floor" placeholder="请输入楼层"></el-input>
          </el-form-item> -->
          </div>
          <div style="display: flex">
            <el-form-item label="楼层" prop="floor">
              <el-select
                v-model="ruleForm.floor"
                style="width: 200px"
                placeholder="请选择"
                @change="floorChange"
              >
                <el-option
                  v-for="item in floorNameList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <!-- <el-input  maxlength="4"   style="width: 200px"   v-model.number="ruleForm.floor" placeholder="请输入楼层"></el-input> -->
            </el-form-item>
            <el-form-item label="区域名称" prop="areaId">
              <el-select
                v-model="ruleForm.areaId"
                style="width: 200px"
                placeholder="请选择"
                @change="areaNameChange"
              >
                <el-option
                  v-for="item in areaNameList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item label="设备名称" prop="deviceName">
              <el-input
                style="width: 200px"
                maxlength="50"
                v-model="ruleForm.deviceName"
                placeholder="请输入设备名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备经度" prop="longitude">
              <el-input
                oninput="value=value.replace(/[^\d^\.]/g,'')"
                style="width: 200px"
                v-model="ruleForm.longitude"
                placeholder="请输入设备经度"
              ></el-input>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item label="设备维度" prop="latitude">
              <el-input
                oninput="value=value.replace(/[^\d^\.]/g,'')"
                style="width: 200px"
                v-model="ruleForm.latitude"
                placeholder="请输入设备维度"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备海拔" prop="altitude">
              <el-input
                oninput="value=value.replace(/[^\d^\.]/g,'')"
                style="width: 200px"
                v-model="ruleForm.altitude"
                placeholder="请输入设备海拔"
              ></el-input>
            </el-form-item>
          </div>

          <div style="display: flex">
            <el-form-item label="权重" prop="weight">
              <el-input
                maxlength="4"
                style="width: 200px"
                v-model.number="ruleForm.weight"
                placeholder="请输入权重"
              ></el-input>
            </el-form-item>
            <el-form-item label="运行状态" v-if="type === 'edit'">
              <span
                v-if="ruleForm.state === '运行中'"
                style="
                  color: #52c41a;
                  background: rgb(227 244 218);
                  padding: 5px 10px;
                  border-radius: 4px;
                "
                >{{ ruleForm.state }}</span
              >
              <span
                v-if="ruleForm.state === '设备异常'"
                style="
                  color: #ff3a3a;
                  background: rgb(250 235 235);
                  padding: 5px 10px;
                  border-radius: 4px;
                "
                >{{ ruleForm.state }}</span
              >
              <span v-if="ruleForm.state === ''">--</span>
            </el-form-item>
          </div>
          <div style="display: flex" v-if="type === 'edit'">
            <el-form-item label="备注" prop="comment">
              <el-input
                style="width: 200px"
                v-model="ruleForm.comment"
                placeholder="请输入备注"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleAddDevice()"
          :loading="loading1"
        >
          确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  deviceSave,
  deviceUpdate,
  importVideo,
} from "../../../../api/ai/deviceManage";
import {
  getParknameList,
  getBuildnameList,
  getFloorList,
  getAreanameList,
} from "@/api/ai/deviceManage";
export default {
  name: "index",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    disableFlag: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    row: {},
  },
  data() {
     const checkLong = (rule, value, callback) => {
        setTimeout(() => {
          if(value !== '' && value !== undefined){
               if (value.toString().length > 20) {
                  callback(new Error('设备经度不可超过20个字符'));
                } else {
                  callback();
                }
            
          }else{
            callback();
          }
          
        }, 1000);
      };
       const checkLat = (rule, value, callback) => {
        setTimeout(() => {
          if(value !== '' && value !== undefined){
               if (value.toString().length > 20) {
                  callback(new Error('设备维度不可超过20个字符'));
                } else {
                  callback();
                }
            
          }else{
            callback();
          }
          
        }, 1000);
      };
       const checkAlt = (rule, value, callback) => {
        setTimeout(() => {
          if(value !== '' && value !== undefined){
               if (value.toString().length > 20) {
                  callback(new Error('设备海拔不可超过20个字符'));
                } else {
                  callback();
                }
            
          }else{
            callback();
          }
          
        }, 1000);
      };
    const validateIp = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入设备IP"));
      } else if (
        !/^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/.test(
          value
        )
      ) {
        callback(new Error("请输入正确的设备IP"));
      } else {
        callback();
      }
    };
    return {
      myParkName: "",
      areaId: "",
      buildingName: "",
      areaNameList: [],
      parkNameList: [],
      buildingNameList: [],
      floorNameList: [],
      loading1: false,
      fileList: [
        //  {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        //  {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
      ],
      files: {},
      loading: false,
      screenHeight1: document.body.clientHeight - 300,
      screenHeight: document.body.clientHeight - 340,
      windowWidth: document.documentElement.clientWidth,
      ruleForm: {
        id: "",
        ip: "",
        username: "",
        rtsp: "",
        parkName: "",
        buildingName: "",
        floor: "",
        areaId: "",
        deviceName: "",
        longitude: "",
        weight: "",
      },
      rules: {
        ip: [{ required: true, trigger: "blur", validator: validateIp }],
        username: [
          { required: true, message: "请输入设备用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入设备密码", trigger: "blur" },
        ],
        rtsp: [{ required: true, message: "请输入rtsp地址", trigger: "blur" }],
        parkName: [
          { required: true, message: "请输入园区/厂区名称", trigger: "blur" },
        ],
        buildingName: [
          { required: false, message: "请输入建筑名称", trigger: "blur" },
        ],
        floor: [{ required: false, message: "请输入楼层", trigger: "blur" }],
        // ,{ pattern: /^\+?[1-9]\d*$/, message: '请输入大于0的正整数'}
        weight: [
          { required: false, message: "请输入权重", trigger: "blur" },
          { pattern: /^\+?[0-9]\d*$/, message: "请输入0~9999的正整数" },
        ],
        areaId: [
          { required: true, message: "请输入区域名称", trigger: "blur" },
        ],
        serialNumber: [
          { required: true, message: "请输入设备序列号", trigger: "blur" },
        ],
        deviceName: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
        ],
        floor:[
          { required: true, message: "请输入楼层", trigger: "blur" },
        ],
        buildingName:[
          { required: true, message: "请选择建筑名称", trigger: "blur" },
        ],
        longitude:[
          {
           trigger: "blur",validator: checkLong
          }
        ],
        latitude:[
          {
            trigger: "blur",validator: checkLat
          }
        ],
        altitude:[
          {
           trigger: "blur",validator: checkAlt
          }
        ],
      },
    };
  },
  watch: {
    visible() {
      if (this.type === "edit") {
        this.ruleForm = this.row;
        this.changeBuildingName();
        this.changeFloorName1(this.ruleForm.buildingId);
        this.getAreaName1();
        // this.areaId  = this.ruleForm.areaId
        // this.ruleForm.areaId = this.ruleForm.areaName
      } else {
        this.buildingNameList = [];
        this.floorNameList = [];
        this.myParkName = "";
        this.buildingName = "";
        this.ruleForm.floor = "";
        this.getAreaName();
        // this.areaNameList = []
        this.ruleForm = {
          id: "",
          ip: "",
          username: "",
          rtsp: "",
          parkName: "",
          buildingName: "",
          floor: "",
          areaId: "",
          deviceName: "",
          longitude: "",
          weight: "",
        };
      }
    },
  },
  mounted() {
    const that = this;
    this.getParkName();
    this.getAreaName();
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight - 300;
        that.screenHeight1 = window.screenHeight;
      })();
    };
  },
  methods: {
    getParkName() {
      getParknameList().then((res) => {
        this.parkNameList = res.result;
        if(this.parkNameList&&this.parkNameList.length>0){
          if(this.parkNameList[0]==='全部'){
            this.parkNameList.shift()
          }
        }
      });
    },
    getAreaName1() {
      let params = {
        parkName: this.ruleForm.parkName,
        buildingName: this.ruleForm.buildingName,
        floor: this.ruleForm.floor,
        current: 1,
        limit: 9999,
      };
      getAreanameList(params).then((res) => {
        if (res.result && res.result.list) {
          this.areaNameList = res.result.list;
        }
      });
    },
    getAreaName() {
      let params = {
        parkName: this.myParkName,
        buildingName: this.buildingName,
        floor: this.ruleForm.floor,
        current: 1,
        limit: 9999,
      };
      getAreanameList(params).then((res) => {
        if (res.result && res.result.list) {
          this.areaNameList = res.result.list;
        }
      });
    },

    changeBuildingName() {
      let params = {
        // parkName: this.ruleForm.parkName,
        parkName: this.myParkName,
      };
      getBuildnameList(params).then((res) => {
        this.buildingNameList = res.result;
        if (this.buildingNameList&&this.buildingNameList.length>0) {
          if(this.buildingNameList[0].buildingName === "全部"){
            this.buildingNameList.shift();
          }
          
        }
      });
    },

    changeFloorName() {
      let params = {
        id: this.ruleForm.buildingName,
      };
      getFloorList(params).then((res) => {
        this.floorNameList = res.result;
      });
    },
    changeFloorName1(val) {
      let params = {
        id: val,
      };
      getFloorList(params).then((res) => {
        this.floorNameList = res.result;
      });
    },

    parkNameChange(val) {
      if (val === "全部") {
        this.myParkName = "";
      } else {
        this.myParkName = val;
      }
      this.buildingName = "";
      this.ruleForm.buildingName = "";
      this.ruleForm.floor = "";
      this.ruleForm.areaId = "";
      this.ruleForm.areaName = "";
      this.changeBuildingName();
      this.getAreaName();
    },

    buildingChange(val) {
      this.buildingNameList.map((item) => {
        if (item.id === val) {
          this.buildingName = item.buildingName;
        }
      });
      this.ruleForm.floor = "";
      this.ruleForm.areaId = "";
      this.ruleForm.areaName = "";
      this.changeFloorName();
      this.getAreaName();
    },
    floorChange() {
      this.ruleForm.areaId = "";
      this.ruleForm.areaName = "";
      this.getAreaName();
    },
    areaNameChange(val) {
      this.areaId = val;
      this.areaNameList.map((item) => {
        if (item.id === val) {
          this.ruleForm.areaName = item.name;
        }
      });
    },
    //上传成功回调
    handleVideoSuccess() {
      let fileFormData = new FormData();
      fileFormData.append("file", this.files); // 上传的文件
      importVideo(fileFormData).then((res)=>{
        this.loading = false;
        this.$message({
          message: "上传成功!",
          type: "success",
        });
        this.ruleForm.rtsp = res.result;
        this.$refs.ruleForm.validateField("rtsp", () => {});
      }).catch((err)=>{
         this.loading = false;
      })
    },
    beforeUploadVideo(file) {
      this.loading = true;
      this.files = file;
      var fileSize = file.size / 1024 / 1024 < 500;

      if (!fileSize) {
        this.loading = false;
        this.$message({
          message: "视频大小不能超过500MB",
          type: "success",
        });
        return false;
      }
    },
    handleAddDevice() {
      console.log(this.ruleForm, "edit");
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.loading1) {
            this.loading1 = true;
            if (this.type === "add") {
              deviceSave(this.ruleForm).then((res) => {
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
                this.$emit("close-callback1", "yes");
                  this.loading1 = false;
              }).catch(()=>{
                 this.loading1 = false;
              });
            } else if (this.type === "edit") {
              deviceUpdate(this.ruleForm).then((res) => {
                this.$message({
                  message: "编辑成功",
                  type: "success",
                });
                 this.$emit("close-callback1", "yes");
                this.loading1 = false;
              }).catch(()=>{
                 this.loading1 = false;
              });
            }
          }
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.loading = false;
      // 该方法用于关闭弹窗
      this.ruleForm = {
        id: "",
        ip: "",
        weight: "",
        username: "",
        rtsp: "",
        parkName: "",
        buildingName: "",
        floor: "",
        areaId: "",
        areaName: "",
        deviceName: "",
        longitude: "",
      };
      this.$message({
        message: "取消成功",
        type: "success",
      });
      this.floorNameList = [];
      this.buildingNameList = [];
      this.areaNameList = [];
      this.buildingName = "";
      // this.getAreaName();
      this.$emit("close-callback1", "no");
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-upload__input {
  display: none;
}
.addDevice {
  .upload {
    margin-left: 12px;
    margin-top: 10px;
  }
  ::v-deep .el-form-item__label {
    font-size: 14px;
  }
  .form_br {
    width: 100%;
    height: 1px;
    margin-bottom: 20px;
    background-color: #f3f3f5;
  }
  ::v-deep .el-dialog__body {
    padding: 0px 30px;
    //padding: 0px;
  }
  ::v-deep .el-dialog__header {
    padding: 20px 20px;
  }
  ::v-deep .el-dialog__footer {
    padding: 30px 20px 20px;
    //  box-shadow: 0px 9px 28px 8px rgba(6, 16, 48, 0.05),
    //    0px 6px 16px 0px rgba(6, 16, 48, 0.08),
    //    0px 0px 7px -3px rgba(10, 25, 51, 0.2);
  }
}
</style>
