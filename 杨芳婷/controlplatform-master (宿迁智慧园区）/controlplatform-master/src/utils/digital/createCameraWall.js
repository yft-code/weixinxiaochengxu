import toBase64ForDefaultValue from "./html2base64";
// 图表点位
let pointArray = [
  {
    id: "storage-point-1",
    center: {
      longitude: 114.20787109992673,
      latitude: 22.276848876828698,
      height: 32
    },
    imgURL: "static/img/chart/img_yq@2x.png"
  },
  {
    id: "storage-point-2",
    center: {
      longitude: 114.21639250826566,
      latitude: 22.271391577229256,
      height: 32
    },
    imgURL: "static/img/chart/img_yq@2x.png"
  }
];
var idCounting = 1;
function initPointPosition(dataSource) {
  function createPoint(pointInfo) {
    let point = {
      id: pointInfo.id,
      lng: pointInfo.center.longitude,
      lat: pointInfo.center.latitude,
      z: pointInfo.center.height,
      heightObj: {
        maximumHeights: [
          pointInfo.center.height + 5,
          pointInfo.center.height + 5
        ],
        minimumHeights: [pointInfo.center.height, pointInfo.center.height]
      },
      imgURL: pointInfo.imgURL
    };
    let info = {
      id: `storage-info-${idCounting}`,
      chartType: "storage-info",
      center: {
        longitude: point.lng - 0.00012448047534974194,
        latitude: point.lat + 0.00013816914421127535,
        height: point.z + 20
      },
      width: 350, // 广告牌宽度
      height: 320, // 广告牌高度
      rotate: 50, // 正北顺时针角度
      type: "image",
      show: true,
      flyTo: true
    };
    let detail = {
      id: `storage-detail-${idCounting}`,
      chartType: "storage-detail",
      center: {
        longitude: point.lng - 0.0004166589983896074,
        latitude: point.lat + 0.0004411806565443044,
        height: point.z + 18
      },
      width: 350, // 广告牌宽度
      height: 350, // 广告牌高度
      rotate: 50, // 正北顺时针角度
      type: "image",
      show: false,
      flyTo: false
    };
    let htmlArray = [info, detail];
    let leftIcon = {
      id: `left-${idCounting}`,
      center: {
        longitude: point.lng - 0.0005828414353885591,
        latitude: point.lat + 0.0006260318846251778,
        height: point.z + 35
      },
      width: 45, // 广告牌宽度
      height: 80, // 广告牌高度
      rotate: 50, // 正北顺时针角度
      type: "image",
      content: "static/img/chart/button_sq_ylck@2x.png",
      isTrans: true,
      show: false,
      flyTo: false
    };
    let rightIcon = {
      id: `right-${idCounting}`,
      center: {
        longitude: point.lng - 0.00028516324044858266,
        latitude: point.lat + 0.0003064410015518604,
        height: point.z + 35
      },
      width: 45, // 广告牌宽度
      height: 80, // 广告牌高度
      rotate: 50, // 正北顺时针角度
      type: "image",
      content: "static/img/chart/button_zk_ylck@2x.png",
      isTrans: true,
      show: true,
      flyTo: false
    };
    let imageArray = [leftIcon, rightIcon];
    for (const chart of imageArray) {
      new Cesium.CesiumWallBillboard({
        id: chart.id,
        viewer: $viewer,
        center: chart.center,
        width: chart.width, // 广告牌宽度
        height: chart.height, // 广告牌高度
        rotate: chart.rotate, // 正北顺时针角度
        content: chart.content,
        followCamera: false, //是否跟随视角
        type: chart.type, // content的类型，echarts或html
        isTrans: chart.isTrans, //image材质背景是否透明
        show: chart.show
      });
    }
    for (let chart of htmlArray) {
      chart.isTrans = true; //背景透明
      chart.viewer = $viewer;
      chart.followCamera = false;
      toBase64ForDefaultValue(chart.chartType).then(res => {
        chart.content = res;
        new Cesium.CesiumWallBillboard(chart);
        document.getElementById(chart.chartType).style.display = "none";
      });
    }
    dataSource.entities.add({
      id: point.id,
      position: Cesium.Cartesian3.fromDegrees(
        +point.lng,
        +point.lat,
        point.z || 0
      ),
      billboard: {
        image: point.imgURL,
        scale: 0.3,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0)
      },
      click: function (t) {
        // $viewer.qtum.centerAt(pointInfo.perspective);
      }
    });
    idCounting += 1;
  }
  for (const item of pointArray) {
    createPoint(item);
  }
}
// 添加摄像头的
function addCamera(dataSource, self, cameraInfo) {
  let positionObj = cameraInfo.center;
  let cameraId = cameraInfo.id;
  let point = {
    id: cameraId,
    lng: positionObj.longitude,
    lat: positionObj.latitude,
    z: positionObj.height,
    heightObj: {
      maximumHeights: [positionObj.height, positionObj.height],
      minimumHeights: [positionObj.height, positionObj.height]
    }
  };
  let arr = [
    `video-container-${cameraId}`,
    `title-${cameraId}`,
    `see-warning-list-${cameraId}`,
    `close-camera-button-${cameraId}`,
    `cameraVideo-${cameraId}`,
  ];
  // console.log(self,self.$store.state.videoContainerShow)
  self.$store.state.videoContainerShow.push({ id: point.id, show: false });

  if (dataSource && dataSource.entities) {
    dataSource.entities.add({
      id: point.id,
      position: Cesium.Cartesian3.fromDegrees(
        +point.lng,
        +point.lat,
        point.z || 0
      ),
      billboard: {
        image: require("@assets/digital/assets/img/camera/camera2.svg"),
        scale: 1,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0)
      },
      click: function (t) {
        self.$store.state.deleteCameraId = t
        if (t._id && t._id.length > 10) {
          cameraInfo.id = t._id
        }
        if (cameraInfo.id.length > 10) {
          setTimeout(()=>{
            self.$bus.$emit('editBind',cameraInfo)
          })
          self.$store.state.deviceId = cameraInfo.id
        }
        if (cameraInfo.id.length < 10) {
          cameraInfo.id = self.$store.state.cameraInfoId
        }
        let currentCameraShow = self.$store.state.videoContainerShow.filter((item) => {
          return item.id == point.id
        })
        if (self.$store.state.listShow) {
          self.$store.state.videoCheck = false
          // console.log(cameraInfo.perspective);
          cameraInfo.perspective.y = cameraInfo.perspective.y + 0.0014277634220078994
          cameraInfo.perspective.x = cameraInfo.perspective.x + 0.000982449335353408
          cameraInfo.perspective.z = cameraInfo.perspective.z + 35
          $viewer.qtum.centerAt(cameraInfo.perspective);
          self.$store.state.parkFlag = true
          self.$store.state.videoContainerShow.forEach((item, index) => {
            item.id == point.id ? item.show = false : ''
          })
          self.$bus.$emit('closeArea')
          // console.log('当前摄像头的坐标',positionObj);
        } else {
          // if(cameraInfo.id.length<10){
          //   self.$message.warning('该点位没有成功绑定点位')
          // }else{
          //   self.$store.state.videoCheck=true
          //   self.$bus.$emit('setCameraId',cameraInfo.id)
          // }
          if (cameraInfo.id.length > 10) {
            cameraInfo.perspective.y = cameraInfo.perspective.y + 0.0014277634220078994
            cameraInfo.perspective.x = cameraInfo.perspective.x + 0.000982449335353408
            cameraInfo.perspective.z = cameraInfo.perspective.z + 45
            $viewer.qtum.centerAt(cameraInfo.perspective);
            self.$store.state.videoCheck = true
            self.$store.state.areaInfoShow = false
            // self.$bus.$emit('setCameraId', cameraInfo.id)
            self.$store.state.videoId=cameraInfo.id
          } else {
            self.$message.warning('该点位没有成功绑定设备,请重新绑定')
            // t._show=false
          }
        }
      }
    });
  }
}

function addPoint(dataSource, self, cameraInfo) {

  let positionObj = cameraInfo.center;
  let cameraId = cameraInfo.id;
  let point = {
    id: cameraId,
    lng: positionObj.longitude,
    lat: positionObj.latitude,
    z: positionObj.height,
    heightObj: {
      maximumHeights: [positionObj.height + 5, positionObj.height + 5],
      minimumHeights: [positionObj.height, positionObj.height]
    }
  };
  let arr = [
    `video-container-${cameraId}`,
    `title-${cameraId}`,
    `see-warning-list-${cameraId}`,
    `close-camera-button-${cameraId}`,
    `cameraVideo-${cameraId}`,
  ];
  dataSource.entities.add({
    id: point.id,
    position: Cesium.Cartesian3.fromDegrees(
      +point.lng,
      +point.lat,
      point.z || 0
    ),
    billboard: {
      image: require("@assets/digital/assets/img/camera/messageTip.svg"),
      scale: 1,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      scaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0)
    },
    click: function (t) {
      self.flyTo(cameraInfo.perspective)
      // if (self.$store.state.videoContainerShow) {
      //   $viewer.qtum.centerAt(cameraInfo.perspective)
      //   arr.forEach(id => {
      //     let entity = $viewer.entities.getById(id);
      //     entity && (entity.show = true);
      //   });
      // } else {
      //   arr.forEach(id => {
      //     let entity = $viewer.entities.getById(id);
      //     entity && (entity._show = false);
      //   });
      // }

      self.$store.commit("setPointInfoShow", positionObj);
      if (self.$store.state.editModuleShow) {
        self.$store.state.areaInfoShow = false
        self.$store.state.setVideoContainerShow = true
        self.$bus.$emit('closeDevice')
      } else {
        self.$store.state.areaInfoShow = true;
        if (self.$store.state.videoCheck) {
          self.$store.state.videoCheck = false
        }

      }
      self.$store.state.delPoint = true

      let data = {
        longitude: positionObj.longitude,
        latitude: positionObj.latitude,
        height: positionObj.height
      }
      self.$bus.$emit('sendMyPointPostion', data, {})
      self.$store.commit('setAreaId', cameraInfo.id)

    }
  });
}

function addMessageTip(dataSource, self, cameraInfo) {
  let positionObj = cameraInfo.center;
  let cameraId = cameraInfo.id;
  let point = {
    id: cameraId,
    lng: positionObj.longitude,
    lat: positionObj.latitude,
    z: positionObj.height,
    heightObj: {
      maximumHeights: [positionObj.height + 5, positionObj.height + 5],
      minimumHeights: [positionObj.height, positionObj.height]
    }
  };
  dataSource.entities.add({
    id: point.id,
    position: Cesium.Cartesian3.fromDegrees(
      +point.lng,
      +point.lat,
      point.z || 0
    ),
    billboard: {
      image: require("@assets/digital/assets/img/camera/messageTip.svg"),
      scale: 1,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      scaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0)
    },
    click: function (t) {
      // self.flyTo(cameraInfo.perspective)
      $viewer.qtum.centerAt(cameraInfo.perspective);
      // self.$store.state.setVideoContainerShow=!self.$store.state.setVideoContainerShow
      if (self.$store.state.editModuleShow) {
        self.$store.state.areaInfoShow = false
        self.$store.state.setVideoContainerShow = true
      } else {
        self.$store.state.areaInfoShow = true;
      }
      self.$bus.$emit('closeDevice')
      self.$store.state.delPoint = false
      self.$store.commit('setAreaId', '')
    }
  });
}
export { addCamera, initPointPosition, addMessageTip, addPoint };
