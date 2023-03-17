<template>
  <div class="algorithm_update">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :before-close="handleClose"
      :destroy-on-close="true"
      width="500px"
      :close-on-click-modal="false"
    >
      <div class="input_border">
        <div
          class="input_container"
          :style="{ maxHeight: `${screenHeight}px` }"
        >
          <el-form      ref="formData"  :model="formData" :rules="rules" label-width="80px" size="mini">
            <el-form-item label="任务名称" prop="name">
              <el-input  v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="选择设备" prop="deviceId">
              <el-select   style="width:100%" v-model="formData.deviceId" placeholder="请选择">
    <el-option
      v-for="item in deviceNameList"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
            </el-form-item>
            <el-form-item label="采集数量" ref="num" prop="num">
             <el-row style="width:100%">
              <el-col :span="10">
                <el-input-number @change="numChange" v-model="formData.num"  :min="1" label="描述文字"></el-input-number>
              </el-col>
              <el-col :span="4">
                张
              </el-col>
             </el-row>
              
            </el-form-item>
            <el-form-item label="采集频率" ref="rate" prop="rate">
              <el-row style="width:100%">
              <el-col :span="10">
                <el-input-number  @change="rateChange" v-model="formData.rate"  :min="1" label="描述文字"></el-input-number>
              </el-col>
              <el-col :span="4">
                秒
              </el-col>
             </el-row>
            </el-form-item>
            <el-form-item label="采集时段" prop="scene">
              <el-time-picker
              :default-time="['00:00:00', '23:59:59']"
              @change="timeChange"
            is-range
            style="width:100%"
          v-model="value"
         value-format="HH:mm:ss"
      range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围">
  </el-time-picker>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="confirm"
          :loading="loading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/ai/task";
export default {
  name: "edit",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    id: {},
  },
  watch: {
    visible() {
      if (this.visible) {
        this.formData= {
       startTime:'00:00:00',
         endTime:'23:59:59',
       }
       this.value=[new Date(2016, 9, 10, 0, 0), new Date(2016, 9, 10, 23, 59, 59)]
    }
  }
  },
  data() {
    const validateNum = (rule, value, callback) => {
      let id = /^[0-9]+$/;
      if (!value) {
        callback(new Error("采集数量不能为空"));
      } else if (!id.test(value)) {
        callback(new Error("只能输入整数"));
      } else {
        callback();
      }
    };

    const validateRate = (rule, value, callback) => {
      let id = /^[0-9]+$/;
      if (!value) {
        callback(new Error("采集频率不能为空"));
      } else if (!id.test(value)) {
        callback(new Error("只能输入整数"));
      } else {
        callback();
      }
    };
    return {
      formData: {
      startTime:'00:00:00',
      endTime:'23:59:59',
    },
      deviceNameList:[],
      value: [new Date(2016, 9, 10, 0, 0), new Date(2016, 9, 10, 23, 59, 59)],
      // 初始值高度
      screenHeight: document.body.clientHeight - 220,
      loading: false,
      rules: {
        name: [
          {required: true, message: "名称不能为空", trigger: "blur"},
        ],
        deviceId: [
          { required: true,message: '设备不能为空', trigger: "blur",},
        ],
        rate: [
            { required: true, trigger: 'blur',validator:validateNum}
          ],
        num: [
          {required: true, trigger: "blur",validator:validateRate},
        ],
      },
    };
  },
  // 只有页面动了才会获取到数据
  mounted() {
    this.getDevice()
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        that.screenHeight = window.screenHeight - 150;
      })();
    };
  },
  methods: {
    //去除频率校验
    rateChange(){
      let reg = /^[0-9]+$/;
      if(reg.test(this.formData.rate)){
        this.$refs.rate.clearValidate();
      }   
    },
    
    //去除数量校验
    numChange(){
      let reg = /^[0-9]+$/;
      if(reg.test(this.formData.num)){
        this.$refs.num.clearValidate();
      }
    },

    // 获取设备列表
    getDevice() {
      api.deviceList()
        .then((res) => {
          if (res.code === 0) {
            let arr = []
            res.result&&res.result.map(item=>{
              arr.push({
                label:item.name,
                value:item.id
              })
            })
            this.deviceNameList = arr;
          }
        })
        .catch();
    },

    // 获取时间
    timeChange(e){
       if(e){
        this.formData.startTime=e[0]
        this.formData.endTime=e[1]
       }
  },

    handleClose() {
      this.loading = false
      this.formData={}
      this.$emit("close-callback");
    },
    // 保存
    confirm() {
      this.$refs.formData.validate((valid) => {
          if (valid) {
            this.loading=true
            const params=this.formData
            api.add(params).then(res=>{
         if(res.code===0){
          this.$message.success(res.message)
          this.handleClose()
         }
        }).catch(()=>{
           this.loading=false
        })
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.algorithm_update {
  .input_container {
    width: 90%;
    margin: 0 auto;
    margin-top:20PX;
  }
  ::v-deep .el-date-editor .el-range__close-icon {
    display: none;
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
