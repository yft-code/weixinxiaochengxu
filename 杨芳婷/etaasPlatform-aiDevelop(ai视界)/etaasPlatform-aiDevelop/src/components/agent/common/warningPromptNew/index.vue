<template>
  <div class="warningPrompt" id="warningPrompt">
    <div class="warningPromptTitle">
      {{ warningTitle }}
      <img
        src="@/assets/agent/img/close.svg"
        class="warningPromptClose"
        @click="closeClick"
      />
    </div>
    <div>
      <!-- <div class="warningPromptBorderCircle"></div> -->
      <!-- <div class="warningPromptBorder"></div> -->
      <!-- <div class="warningPromptBorderCircles"></div> -->
      <div class="clear"></div>
    </div>
    <div>
      <div class="warningPromptSingal">!</div>
      <div class="warningPromptInfo">{{ warningTips }}</div>
      <div class="clear"></div>
    </div>
    <div class="warningPromptOperate">
      <div class="warningPromptSure" @click="subClick">确定</div>
      <div class="warningPromptCancel" @click="closeClick">取消</div>

      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import { getDevices } from "@/api/digital/config";
import * as deviceApi from "@/api/digital/device";
import { bindArea } from "@/api/ai/region";
// import { initPointPosition } from "@/utils/digital/createCameraWall";
import { pageList } from "@/api/ai/deviceManage";
import { setCharts } from "@/utils/digital/utils.js";
export default {
  name: "warningPrompt",
  props: {
    warningTitle: {
      type: String,
      default: "删除",
    },
    warningTips: {
      type: String,
      default: "确定要删除改条信息吗",
    },
  },
  data() {
    return {
      //删除关联的参数
      deleteParams: {},
    };
  },
  mounted() {
    //      this.$bus.$on('getParams',(data)=>{
    //     this.deleteParams=data
    //     console.log('deletePrams1',this.deleteParams);
    //  })
  },
  created() {
    //    this.$bus.$on('getParams',(data)=>{
    //     this.deleteParams=data
    //     console.log('deletePrams2',this.deleteParams);
    //  })
    //  console.log('1231');
  },
  watch: {
    "$store.state.deviceDetailShow": {
      handler(newV, oldV) {
        if (newV == true) {
          // let x = document.getElementById("deviceDetail");
          // console.log("x", x);
          // setCharts(x, this);
        }
      },
      deep: true,
    },
  },
  methods: {
    //绑定后的数据
    getDevicesList() {
      let _that = this;
      getDevices()
        .then(async (res) => {
          if (res.success == true && res.code == 0) {
            let devices = [];
            for (let item of res.result) {
              if (
                item.height == 0.0 &&
                item.latitude == 0.0 &&
                item.longitude == 0.0
              ) {
                continue;
              }

              devices.push(item.id);
              _that.$store.state.deviceBind = devices;
              // console.log('devices删除后的摄像头', _that.$store.state.deviceBind);
            }
          }
        })
        .catch((e) => {
          _that.$message.warning(e || "获取设备列表失败！");
        });
    },
    closeAll() {
      this.$emit("closeAll");
    },
    bindArea() {
      const params = {
        areaId: this.$store.state.setAreaId,
        pointId: "",
      };
      // console.log(params,'ppp')
      bindArea(params).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });

        this.$emit("closeDelNew");
       
        // this.$store.state.myLoading = true;
         this.$bus.$emit('delPointPerspectiveOpenAllPoint')
      });
    },
    subClick() {
      if (this.warningTips === "不可重复关联!") {
        this.closeClick();
      }
      if (this.$store.state.delOperation) {
        this.$store.state.delOperation = false;
        this.bindArea();
      }
      if (this.$store.state.deleteDeviceFlag) {
        const params = {
          pointId: "",
          id: this.$store.state.deviceId,
        };
        deviceApi
          .bindDevice(params)
          .then((res) => {
            if (res.code === 0) {
              this.$store.state.deleteCameraId._show = false;
              this.$message.success("删除成功");
              this.getDevicesList();
              this.closeClick();
              //  console.log( this.$store.state.deleteCameraId);
              this.$emit("closeAll");
              // this.$bus.$emit('initAllPoint')
            }
          })
          .catch();
      }

      // 删除关联设备
      if (this.$store.state.scenceDelete) {
        let deleteParams = {};
        deleteParams = this.$store.state.scenceParams;
        const params = {};
        deleteParams.deviceIds =
          deleteParams &&
          deleteParams.deviceIds.filter((item) => {
            return item != this.$store.state.deviceId;
          });
        params.deviceIds = deleteParams.deviceIds;
        params.name = deleteParams.name;
        params.algIds = deleteParams.algIds;
        params.id = deleteParams.id;
        params.isActive = deleteParams.isActive;
        params.time = deleteParams.time;
        params.userIds = deleteParams.userIds;
        params.warningId = deleteParams.warningId;
        deviceApi
          .sceneUpdateDetails(params)
          .then((res) => {
            this.$message.success("解绑成功");
            this.closeAll();
            this.closeClick();
            this.$bus.$emit("hasScenceUpdate");
          })
          .catch();
      }
    },
    closeClick() {
      this.$emit("closeWarningPromptNew");
    },
  },
};
</script>

<style lang="scss" scoped>
.clear {
  clear: both;
}
.warningPrompt {
  position: fixed;
  z-index: 99;
  top: 16%;
  width: 20vw;
  height: 194px;
  right: 3%;
  background-size: 100% 100%;
  background: url("~@/assets/agent/img/bg1.png") no-repeat
    center center;
  background-size: 100% 100%;
  .warningPromptTitle {
    font-size: 20px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #e8eeff;
    line-height: 30px;
    padding: 8px 26px 8px 26px;
  }

  .warningPromptClose {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 25px;
    cursor: pointer;
  }
  .warningPromptBorderCircle {
    float: left;
    height: 2px;
    width: 2px;
    background: #fff;
    border-radius: 50%;
    margin-left: 26px;
  }
  .warningPromptBorder {
    border-bottom: 1px dashed #979797;
    width: calc(100% - 52px);
    float: left;
  }
  .warningPromptBorderCircles {
    float: left;
    height: 2px;
    width: 2px;
    background: #fff;
    border-radius: 50%;
    margin-right: 16px;
  }
  .warningPromptSingal {
    float: left;
    width: 19px;
    height: 19px;
    line-height: 19px;
    background: #ffa900;
    border-radius: 50%;
    color: #000;
    margin-left: 50px;
    text-align: center;
    margin-top: 42px;
  }
  .warningPromptInfo {
    float: left;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #e8eeff;
    line-height: 22px;
    margin-top: 40px;
    margin-left: 8px;
  }
  .warningPromptOperate {
    margin-top: 40px;
  }
  .warningPromptCancel {
    float: right;
    width: 64px;
    height: 28px;
    line-height: 28px;
    background: rgba(170, 170, 170, 0.16);
    border: 1px solid rgba(170, 170, 170, 0.75);
    cursor: pointer;
    color: #e8eeff;
    text-align: center;
    margin-right: 10px;
  }
  .warningPromptSure {
    float: right;
    width: 64px;
    height: 28px;
    line-height: 28px;
    color: #e8eeff;
    background: rgba(170, 170, 170, 0.16);
    border: 1px solid rgba(170, 170, 170, 0.75);
    text-align: center;
    cursor: pointer;
    margin-right: 26px;
  }
  .warningPromptCancel:hover,
  .warningPromptSure:hover {
    color: #25bcff;
    border: 1px solid #25bcff;
  }
}
</style>
