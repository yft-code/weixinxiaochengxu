<template>
  <div>
    <div class="control-container">
      <div class="tool-word">原件库列表</div>
      <div class="list">
        <div
          v-if="this.$store.state.equipmentSingle"
          @click="showListOne"
          :class="[this.oneFlag ? 'list-click' : 'list-one']"
        >
          <img :src="camera" />
          <p class="word">摄像头</p>
        </div>
        <div
        v-if="this.$store.state.perspectiveSingle"
          @click="showListTwo"
          :class="[this.twoFlag ? 'list-click' : 'list-one', 'list-two']"
        >
          <img :src="imgs" />
          <p class="word-mes">信息标签</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addCameraNew, addMessageTipNew } from "@/utils/digital/createCameraWall1";
import billboardVideo from "@/utils/digital/billboardVideo.js";
export default {
  data() {
    return {
      oneFlag: false,
      twoFlag: false,
      imgs: require("@/assets/agent/img/message.png"),
      camera: require("@/assets/agent/img/device.png"),
    };
  },

  methods: {
    showListOne() {
      this.oneFlag = true;
      this.twoFlag = false;
      this.$message.info("在模型上选取一个点位进行点击生成摄像头！");
      // console.log("you clicked");
      this.$store.state.deviceId = "";
      var _that = this;
      window.$viewer.qtum.draw.deleteAll(),
        window.drawControl.startDraw({
          type: "point",
          style: {
            pixelSize: 12,
            color: "#009BFF",
            outlineColor: "#0D829A",
            outlineWidth: 5,
          },
          success: function (i) {
            var e = i.position.getValue();
            // console.log("e", e);
            var cartographic = Cesium.Cartographic.fromCartesian(e);
            var longitude = Cesium.Math.toDegrees(cartographic.longitude);
            var latitude = Cesium.Math.toDegrees(cartographic.latitude);
            var height = cartographic.height;
            // console.log(
            //  '设备的地址',
            //   _that.$store.state.cameraAndMessageTipEntityUniqueId,
            //   longitude,
            //   latitude,
            //   height
            // );
            _that.$emit("showListOne", longitude, latitude, height);
            let pointObj = {
              id: _that.$store.state.cameraAndMessageTipEntityUniqueId++,
              center: {
                longitude,
                latitude,
                height,
              },
              perspective: {
                y: latitude,
                x: longitude,
                z: height + 20,
                heading: 220.7,
                pitch: -6.2,
                roll: 0.2,
              },
            };

            addCameraNew(dataSource, _that, pointObj);
            // 生成视频流代码（不要了）
            // billboardVideo(
            //   window.$viewer,
            //   Cesium,
            //   _that,
            //   {
            //     longitude: Number(pointObj.center.longitude),
            //     latitude: Number(pointObj.center.latitude),
            //     height: Number(pointObj.center.height),
            //   },
            //   pointObj
            // );
            // _that.$store.state.couldBeBindDeviceList =
            //   _that.$store.state.couldBeBindDeviceList.filter(
            //     (item, index) => {
            //       return (
            //         item.id != _that.$store.state.currentBindDeviceId
            //       );
            //     }
            //   );
            // _that.$store.state.currentBindDeviceId = "";
          },
        });
    },
    showListTwo() {
      this.oneFlag = false;
      this.twoFlag = true;
      this.$message.info("在模型上选取一个点位进行点击生成信息标签！");
      // console.log("you clicked2");

      var _that = this;
      window.$viewer.qtum.draw.deleteAll(),
        window.drawControl.startDraw({
          type: "point",
          style: {
            pixelSize: 12,
            color: "#009BFF",
            outlineColor: "#0D829A",
            outlineWidth: 5,
          },
          success: function (i) {
            var e = i.position.getValue();
            // console.log("e", e);
            var cartographic = Cesium.Cartographic.fromCartesian(e);
            var longitude = Cesium.Math.toDegrees(cartographic.longitude);
            var latitude = Cesium.Math.toDegrees(cartographic.latitude);
            var height = cartographic.height;
            // console.log(
            //   longitude,
            //   latitude,
            //   height
            // );
            let pointObj = {
              id: _that.$store.state.cameraAndMessageTipEntityUniqueId++,
              center: {
                longitude,
                latitude,
                height,
              },
              perspective: {
                y: latitude,
                x: longitude,
                z: height + 20,
                heading: 220.7,
                pitch: -6.2,
                roll: 0.2,
              },
            };
            // bindPoint({
            //   componentPoint:pointObj.center
            // })
            //   .then((res) => {
            //     console.log('组件点位',res);
            // if (res.code == 0 && res.success == true) {
            pointObj.perspective.y =
              pointObj.perspective.y + 0.0014277634220078994;
            pointObj.perspective.x =
              pointObj.perspective.x + 0.000982449335353408;
            pointObj.perspective.z = pointObj.perspective.z + 35;
            _that.$emit(
              "getPointPostion",
              pointObj.center,
              pointObj.perspective
            );
            addMessageTipNew(dataSource, _that, pointObj);

            // }
            // })
            // .catch((e) => {
            //   _that.$message.warning(e || "绑定信息标签失败！");
            // });
          },
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.control-container {
  position: absolute;
  z-index: 10000;
  width: 150px;
  right: 10px;
  background: rgba(3,31,44,0.6400);
  cursor: pointer;
  /deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 300px;
  }
  .tool-word {
    color: #fff;
    font-size: 14px;
    width: 100%;
    // background-color: #1d212d;
    height: 40px;
    padding-left: 10px;
    line-height: 40px;
    border-bottom: 1px solid #2c313b;
  }
  .word {
    margin-top: -6px;
    font-size: 10px;
  }
  .word-mes {
    margin-top: -6px;
    font-size: 10px;
  }
  .list {
    display: flex;
    color: #fff;
    font-size: 14px;
    // background-color: #1d212d;
    text-align: center;
    height: 80px;
    line-height: 40px;
    border-bottom: 1px solid #2c313b;
  }
  .list-one {
    width: 85%;
    height: 85%;
    margin: 5px auto;
    margin-left: 10px;
    flex: 1;
  }
  .list-click {
    width: 85%;
    height: 85%;
    margin: 5px auto;
    margin-left: 10px;
    flex: 1;
    // background-color: #2c313b;
  }
  .list-two {
    margin-right: 10px;
  }
  .list-one:hover {
    // background-color: #2c313b;
    background: rgba(232,238,255,0.1200);
    //   color:#2C313B;
  }
  .el-menu {
    border-right: none;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
  }
  /deep/ .el-menu-item {
    border-top: 1px solid #2c313b;
    color: #fff !important;
    // background-color: #1d212d !important;
  }
  .icon-word {
    font-size: 20px;
  }
  .icon-word:hover {
    color: #fff;
  }

  .icon-title {
    padding-left: 3px;
    // margin-left: 5PX;
  }
}
</style>
<style lang="scss">
.el-submenu__title {
  color: #fff;
}
.el-submenu__title:hover {
  color: #2889b6 !important;
}
.el-submenu__icon-arrow:hover {
  color: #2889b6;
}
.el-submenu:hover {
  color: #2889b6;
}
.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  color: #2889b6 !important;
  // background-color: #ecf5ff;
}
</style>