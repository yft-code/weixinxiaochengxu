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
function initPointPositionNew(dataSource) {
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
function addCameraNew(dataSource, self, cameraInfo) {
  cameraInfo.perspective.y = cameraInfo.perspective.y + 0.0017277634220078994
  cameraInfo.perspective.x = cameraInfo.perspective.x +  0.000982449335353408
  cameraInfo.perspective.z = cameraInfo.perspective.z + 25
  let positionObj = cameraInfo.center;
  let cameraId = cameraInfo.id;
  let title=cameraInfo.title?cameraInfo.title:''
  let point = {
    id: cameraId,
    title:title,
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
      id: point.id+'删除',
      position: Cesium.Cartesian3.fromDegrees(
        +point.lng,
        +point.lat,
        point.z || 0
      ),
      label: {
        show: true,  // 是否显示
        text:'清除点位',  // 显示的文字
        font: '5px sans-serif',  // 字体样式配置
        fillColor: Cesium.Color.fromCssColorString('#1ECBF0'),  // 填充颜色
        outlineColor: Cesium.Color.BLACK,   // 外边线颜色
        outlineWidth: 3.0,  // 外边线宽度
        showBackground: true,   // 是否显示背景
        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),    // 设置背景颜色
        backgroundPadding: new Cesium.Cartesian2(7, 5), // 设置背景内边距
        style: Cesium.LabelStyle.FILL, // 文字样式 FILL、OUTLINE、FILL_AND_OUTLINE
        // eyeOffset: new Cesium.Cartesian2(7, 5), // 视角偏移量，不知道怎么描述与pixelOffset不同，不偏移设置Cesium.Cartesian3.ZERO
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 文字水平对齐方式
        verticalOrigin: Cesium.VerticalOrigin.BASELINE, // 文字垂直对齐方式
        scale: 1.0,//缩放
        pixelOffset: new Cesium.Cartesian2(0,-80),
        pixelOffsetScaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0),
    },
      click: function (t) {
    
        $viewer.qtum.centerAt(cameraInfo.perspective);
        if(t._id.length <10){
          self.$message.warning('该点位没有成功绑定设备,不能删除')
        }else{
          self.$store.state.deviceId=cameraInfo.id
          self.$bus.$emit('deletePoints')
        }
      }
    });

    dataSource.entities.add({
      id: point.id+'备注信息',
      position: Cesium.Cartesian3.fromDegrees(
        +point.lng,
        +point.lat,
        point.z || 0
      ),
      label: {
        show: true,  // 是否显示
        text:'备注信息',  // 显示的文字
        font: '5px sans-serif',  // 字体样式配置
        fillColor: Cesium.Color.fromCssColorString('#1ECBF0'),  // 填充颜色
        outlineColor: Cesium.Color.BLACK,   // 外边线颜色
        outlineWidth: 3.0,  // 外边线宽度
        showBackground: true,   // 是否显示背景
        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),    // 设置背景颜色
        backgroundPadding: new Cesium.Cartesian2(7, 5), // 设置背景内边距
        style: Cesium.LabelStyle.FILL, // 文字样式 FILL、OUTLINE、FILL_AND_OUTLINE
        // eyeOffset: new Cesium.Cartesian2(7, 5), // 视角偏移量，不知道怎么描述与pixelOffset不同，不偏移设置Cesium.Cartesian3.ZERO
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 文字水平对齐方式
        verticalOrigin: Cesium.VerticalOrigin.BASELINE, // 文字垂直对齐方式
        scale: 1.0, // 缩放
        pixelOffset: new Cesium.Cartesian2(0,-120),
        pixelOffsetScaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0),
    },
      click: function (t) {
        // cameraInfo.perspective.y = cameraInfo.perspective.y + 0.0014277634220078994
        // cameraInfo.perspective.x = cameraInfo.perspective.x + 0.000782449335353408
        // cameraInfo.perspective.z = cameraInfo.perspective.z + 35
        $viewer.qtum.centerAt(cameraInfo.perspective);
        if(t._id.length <10){
          self.$message.warning('该点位没有成功绑定设备,不能添加备注')
        }else{
          self.$bus.$emit('postMessage')
        }
      }
    });
    
    dataSource.entities.add({
      id: point.id+'关联设备监管场景',
      position: Cesium.Cartesian3.fromDegrees(
        +point.lng,
        +point.lat,
        point.z || 0
      ),
      label: {
        show: true,// 是否显示
        text:'关联设备监管场景',  // 显示的文字
        font: '5px sans-serif',  // 字体样式配置
        fillColor: Cesium.Color.fromCssColorString('#1ECBF0'),  // 填充颜色
        outlineColor: Cesium.Color.BLACK, // 外边线颜色
        outlineWidth: 3.0,  // 外边RGBA(30, 203, 240, 1)线宽度
        showBackground: true,   // 是否显示背景
        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),    // 设置背景颜色
        backgroundPadding: new Cesium.Cartesian2(7, 5), // 设置背景内边距
        style: Cesium.LabelStyle.FILL, // 文字样式 FILL、OUTLINE、FILL_AND_OUTLINE
        // eyeOffset: new Cesium.Cartesian2(7, 5), // 视角偏移量，不知道怎么描述与pixelOffset不同，不偏移设置Cesium.Cartesian3.ZERO
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 文字水平对齐方式
        verticalOrigin: Cesium.VerticalOrigin.BASELINE, // 文字垂直对齐方式
        scale: 1.0, // 缩放
        pixelOffset: new Cesium.Cartesian2(0,-160),
        pixelOffsetScaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0),
    },
      click: function (t) {
        // cameraInfo.perspective.y = cameraInfo.perspective.y + 0.0014277634220078994
        // cameraInfo.perspective.x = cameraInfo.perspective.x + 0.000782449335353408
        // cameraInfo.perspective.z = cameraInfo.perspective.z + 20
        $viewer.qtum.centerAt(cameraInfo.perspective);
        if(t._id.length <10){
          self.$message.warning('该点位没有成功绑定设备,不能关联场景')
        }else{
          self.$bus.$emit('asssociateScenes')
        }
       
      }
    });
    dataSource.entities.add({
      id: point.id+'关联设备',
      position: Cesium.Cartesian3.fromDegrees(
        +point.lng,
        +point.lat,
        point.z || 0
      ),
      label: {
        show: true, // 是否显示
        text:'关联设备',  // 显示的文字
        font: '5px sans-serif',  // 字体样式配置
        fillColor: Cesium.Color.fromCssColorString('#1ECBF0'),  // 填充颜色
        outlineColor: Cesium.Color.BLACK, // 外边线颜色
        outlineWidth: 3.0,//外边线宽度
        showBackground: true,// 是否显示背景
        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),    // 设置背景颜色
        backgroundPadding: new Cesium.Cartesian2(7, 5), // 设置背景内边距
        style: Cesium.LabelStyle.FILL, // 文字样式 FILL、OUTLINE、FILL_AND_OUTLINE
        // eyeOffset: new Cesium.Cartesian2(7, 5), // 视角偏移量，不知道怎么描述与pixelOffset不同，不偏移设置Cesium.Cartesian3.ZERO
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 文字水平对齐方式
        verticalOrigin: Cesium.VerticalOrigin.BASELINE, // 文字垂直对齐方式
        scale: 1.0, // 缩放
        pixelOffset: new Cesium.Cartesian2(0,-200),
        pixelOffsetScaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0),
    },
      click: function (t) {
        self.$store.state.deviceId=''
        if(t._id.length >10){
          self.$store.state.deviceId=cameraInfo.id
          setTimeout(()=>{
            self.$bus.$emit('editBind',cameraInfo)
          })
        }
        // cameraInfo.perspective.y = cameraInfo.perspective.y + 0.0014277634220078994
        // cameraInfo.perspective.x = cameraInfo.perspective.x + 0.000782449335353408
        // cameraInfo.perspective.z = cameraInfo.perspective.z + 20
        $viewer.qtum.centerAt(cameraInfo.perspective);
        self.$bus.$emit('asssociateDevices')
      }
    });
    dataSource.entities.add({
      id: point.id,
      position: Cesium.Cartesian3.fromDegrees(
        +point.lng,
        +point.lat,
        point.z || 0
      ),
      billboard: {
        image: require("@assets/digital/assets/img/camera/camera2.png"),
        scale: 1,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0)
      },
      label: {
        show: true, // 是否显示
        text:point.title,  // 显示的文字
        font: '5px sans-serif',    // 字体样式配置
        fillColor: Cesium.Color.WHITE,  // 填充颜色
        outlineColor: Cesium.Color.BLACK,   // 外边线颜色
        outlineWidth: 3.0,  // 外边线宽度
        showBackground: true,   // 是否显示背景
        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),    // 设置背景颜色
        backgroundPadding: new Cesium.Cartesian2(7, 5), // 设置背景内边距
        style: Cesium.LabelStyle.FILL, // 文字样式 FILL、OUTLINE、FILL_AND_OUTLINE
        // eyeOffset: new Cesium.Cartesian2(7, 5), // 视角偏移量，不知道怎么描述与pixelOffset不同，不偏移设置Cesium.Cartesian3.ZERO
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 文字水平对齐方式
        verticalOrigin: Cesium.VerticalOrigin.BASELINE, // 文字垂直对齐方式
        scale: 1.0, // 缩放
        pixelOffset: new Cesium.Cartesian2(0,-240),
        pixelOffsetScaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0),
    },
      click: function (t) {
        // cameraInfo.perspective.y = cameraInfo.perspective.y + 0.0014277634220078994
        // cameraInfo.perspective.x = cameraInfo.perspective.x + 0.000782449335353408
        // cameraInfo.perspective.z = cameraInfo.perspective.z + 20
        $viewer.qtum.centerAt(cameraInfo.perspective);
      }
    });
  }
}

function addPointNew(dataSource, self, cameraInfo) {
  let positionObj = cameraInfo.center;
  let cameraId = cameraInfo.id;
  let point = {
    title:cameraInfo.title,
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
    id: point.id+'edit',
    position: Cesium.Cartesian3.fromDegrees(
      +point.lng,
      +point.lat,
      point.z || 0
    ),
    label: {
      show: true,  // 是否显示
      text:'编辑区域信息',  // 显示的文字
      font: '5px sans-serif',  // 字体样式配置
      fillColor:Cesium.Color.fromCssColorString('#1ECBF0'),  // 填充颜色
      outlineColor: Cesium.Color.BLACK,   // 外边线颜色
      outlineWidth: 3.0,  // 外边线宽度
      showBackground: true,   // 是否显示背景
      backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),    // 设置背景颜色
      backgroundPadding: new Cesium.Cartesian2(7, 5), // 设置背景内边距
      style: Cesium.LabelStyle.FILL, // 文字样式 FILL、OUTLINE、FILL_AND_OUTLINE
      // eyeOffset: new Cesium.Cartesian2(7, 5), // 视角偏移量，不知道怎么描述与pixelOffset不同，不偏移设置Cesium.Cartesian3.ZERO
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 文字水平对齐方式
      verticalOrigin: Cesium.VerticalOrigin.BASELINE, // 文字垂直对齐方式
      scale: 1.0, // 缩放
      pixelOffset: new Cesium.Cartesian2(0,-120),
      pixelOffsetScaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0),
  },
    click: function (t) {
    
      self.flyTo(cameraInfo.perspective)

      self.$store.commit("setPointInfoShow", positionObj);
      if (self.$store.state.singleShow) {
        self.$store.state.areaInfoShowNew = false
        // self.$store.state.setVideoContainerShowNew = true
        self.$bus.$emit('closeDevice')
      } else {
        self.$store.state.areaInfoShowNew = true;
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

      self.$bus.$emit("editOperationNew", true);
    }
  });
  dataSource.entities.add({
    id: point.id+'del',
    position: Cesium.Cartesian3.fromDegrees(
      +point.lng,
      +point.lat,
      point.z || 0
    ),
    label: {
      show: true,  // 是否显示
      text:'删除点位',  // 显示的文字
      font: '5px sans-serif',  // 字体样式配置
      fillColor: Cesium.Color.fromCssColorString('#1ECBF0'),  // 填充颜色
      outlineColor: Cesium.Color.BLACK,   // 外边线颜色
      outlineWidth: 3.0,  // 外边线宽度
      showBackground: true,   // 是否显示背景
      backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),    // 设置背景颜色
      backgroundPadding: new Cesium.Cartesian2(7, 5), // 设置背景内边距
      style: Cesium.LabelStyle.FILL, // 文字样式 FILL、OUTLINE、FILL_AND_OUTLINE
      // eyeOffset: new Cesium.Cartesian2(7, 5), // 视角偏移量，不知道怎么描述与pixelOffset不同，不偏移设置Cesium.Cartesian3.ZERO
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 文字水平对齐方式
      verticalOrigin: Cesium.VerticalOrigin.BASELINE, // 文字垂直对齐方式
      scale: 1.0, // 缩放
      pixelOffset: new Cesium.Cartesian2(0,-80),
      pixelOffsetScaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0),
  },
    click: function (t) {
      self.flyTo(cameraInfo.perspective)
      self.$store.commit("setPointInfoShow", positionObj);
      if (self.$store.state.singleShow) {
        self.$store.state.areaInfoShowNew = false
        // self.$store.state.setVideoContainerShowNew = true
        self.$bus.$emit('closeDevice')
      } else {
        self.$store.state.areaInfoShowNew = true;
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
      if (!self.$store.state.delPoint) {
        self.$message({
          message: "该点位还未绑定区域",
          type: "warning",
        });
      } else {
        self.$store.state.delOperation = true;
        self.$store.state.delPoint = true;
        self.$bus.$emit("delOperationNew", true);
      }
    }
  });
  dataSource.entities.add({
    id: point.id,
    position: Cesium.Cartesian3.fromDegrees(
      +point.lng,
      +point.lat,
      point.z || 0
    ),
    billboard: {
      image: require("@assets/digital/assets/img/camera/messageNew.png"),
      scale: 1,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      scaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0)
    },
    label: {
      show: true, // 是否显示
      text:point.title,  // 显示的文字
      font: '5px sans-serif',    // 字体样式配置
      fillColor: Cesium.Color.WHITE, 
      outlineColor: Cesium.Color.BLACK,   // 外边线颜色
      outlineWidth: 3.0,  // 外边线宽度
      showBackground: true,   // 是否显示背景
      backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),    // 设置背景颜色
      backgroundPadding: new Cesium.Cartesian2(7, 5), // 设置背景内边距
      style: Cesium.LabelStyle.FILL, // 文字样式 FILL、OUTLINE、FILL_AND_OUTLINE
      // eyeOffset: new Cesium.Cartesian2(7, 5), // 视角偏移量，不知道怎么描述与pixelOffset不同，不偏移设置Cesium.Cartesian3.ZERO
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 文字水平对齐方式
      verticalOrigin: Cesium.VerticalOrigin.BASELINE, // 文字垂直对齐方式
      scale: 1.0, // 缩放
      pixelOffset: new Cesium.Cartesian2(0,-160),
      pixelOffsetScaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0),
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



    }
  });
}

function addPointNewShow(dataSource, self, cameraInfo) {

  let positionObj = cameraInfo.center;
  let cameraId = cameraInfo.id;
  let point = {
    title:cameraInfo.title,
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
      image: require("@assets/digital/assets/img/camera/messageNew.png"),
      scale: 1,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      scaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0)
    },
    label: {
      show: true, // 是否显示
      text:point.title,  // 显示的文字
      font: '5px sans-serif',    // 字体样式配置
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,   // 外边线颜色
      outlineWidth: 3.0,  // 外边线宽度
      showBackground: true,   // 是否显示背景
      backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),    // 设置背景颜色
      backgroundPadding: new Cesium.Cartesian2(7, 5), // 设置背景内边距
      style: Cesium.LabelStyle.FILL, // 文字样式 FILL、OUTLINE、FILL_AND_OUTLINE
      // eyeOffset: new Cesium.Cartesian2(7, 5), // 视角偏移量，不知道怎么描述与pixelOffset不同，不偏移设置Cesium.Cartesian3.ZERO
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 文字水平对齐方式
      verticalOrigin: Cesium.VerticalOrigin.BASELINE, // 文字垂直对齐方式
      scale: 1.0, // 缩放
      pixelOffset: new Cesium.Cartesian2(0,-100),
      pixelOffsetScaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0),
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
      if (self.$store.state.singleShow) {
        self.$store.state.areaInfoShowNew = false
        self.$store.state.setVideoContainerShowNew = true
        self.$bus.$emit('closeDevice')
      } else {
        self.$store.state.areaInfoShowNew = true;
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

function addMessageTipNew(dataSource, self, cameraInfo) {
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
    id: point.id+'edit',
    position: Cesium.Cartesian3.fromDegrees(
      +point.lng,
      +point.lat,
      point.z || 0
    ),
    label: {
      show: true,  // 是否显示
      text:'编辑区域信息',  // 显示的文字
      font: '5px sans-serif',  // 字体样式配置
      fillColor: Cesium.Color.fromCssColorString('#1ECBF0'),
      outlineColor: Cesium.Color.BLACK,   // 外边线颜色
      outlineWidth: 3.0,  // 外边线宽度
      showBackground: true,   // 是否显示背景
      backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),    // 设置背景颜色
      backgroundPadding: new Cesium.Cartesian2(7, 5), // 设置背景内边距
      style: Cesium.LabelStyle.FILL, // 文字样式 FILL、OUTLINE、FILL_AND_OUTLINE
      // eyeOffset: new Cesium.Cartesian2(7, 5), // 视角偏移量，不知道怎么描述与pixelOffset不同，不偏移设置Cesium.Cartesian3.ZERO
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 文字水平对齐方式
      verticalOrigin: Cesium.VerticalOrigin.BASELINE, // 文字垂直对齐方式
      scale: 1.0, // 缩放
      pixelOffset: new Cesium.Cartesian2(0,-120),
      pixelOffsetScaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0),
  },
    click: function (t) {
      if (self.$store.state.singleShow) {
        self.$store.state.areaInfoShowNew = false
        // self.$store.state.setVideoContainerShowNew= true
      } else {
        self.$store.state.areaInfoShowNew = true;
      }
      self.$bus.$emit('closeDevice')
      self.$store.state.delPoint = false
      self.$store.commit('setAreaId', '')

      self.$bus.$emit("editOperationNew", true);
    }
  });
  dataSource.entities.add({
    id: point.id+'del',
    position: Cesium.Cartesian3.fromDegrees(
      +point.lng,
      +point.lat,
      point.z || 0
    ),
    label: {
      show: true,  // 是否显示
      text:'删除点位',  // 显示的文字
      font: '5px sans-serif',  // 字体样式配置
      fillColor: Cesium.Color.fromCssColorString('#1ECBF0'),
      outlineColor: Cesium.Color.BLACK,   // 外边线颜色
      outlineWidth: 3.0,  // 外边线宽度
      showBackground: true,   // 是否显示背景
      backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),    // 设置背景颜色
      backgroundPadding: new Cesium.Cartesian2(7, 5), // 设置背景内边距
      style: Cesium.LabelStyle.FILL, // 文字样式 FILL、OUTLINE、FILL_AND_OUTLINE
      // eyeOffset: new Cesium.Cartesian2(7, 5), // 视角偏移量，不知道怎么描述与pixelOffset不同，不偏移设置Cesium.Cartesian3.ZERO
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 文字水平对齐方式
      verticalOrigin: Cesium.VerticalOrigin.BASELINE, // 文字垂直对齐方式
      scale: 1.0, // 缩放
      pixelOffset: new Cesium.Cartesian2(0,-80),
      pixelOffsetScaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0),
  },
    click: function (t) {
      // $viewer.qtum.centerAt(cameraInfo.perspective);
      // self.$store.state.setVideoContainerShow=!self.$store.state.setVideoContainerShow
      if (self.$store.state.singleShow) {
        self.$store.state.areaInfoShowNew = false
        // self.$store.state.setVideoContainerShowNew= true
      } else {
        self.$store.state.areaInfoShowNew = true;
      }
      self.$bus.$emit('closeDevice')
      self.$store.state.delPoint = false
      self.$store.commit('setAreaId', '')
      if (!self.$store.state.delPoint) {
        self.$message({
          message: "该点位还未绑定区域",
          type: "warning",
        });
      } else {
        self.$store.state.delOperation = true;
        self.$store.state.delPoint = true;
        self.$bus.$emit("delOperationNew", true);
      }
      
    }
  });
  dataSource.entities.add({
    id: point.id,
    position: Cesium.Cartesian3.fromDegrees(
      +point.lng,
      +point.lat,
      point.z || 0
    ),
    billboard: {
      image: require("@assets/digital/assets/img/camera/messageNew.png"),
      scale: 1,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      scaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0)
    },
    click: function (t) {
      // self.flyTo(cameraInfo.perspective)
      $viewer.qtum.centerAt(cameraInfo.perspective);
      // self.$store.state.setVideoContainerShow=!self.$store.state.setVideoContainerShow
      // if (self.$store.state.singleShow) {
      //   self.$store.state.areaInfoShowNew = false
      //   self.$store.state.setVideoContainerShowNew= true
      // } else {
      //   self.$store.state.areaInfoShowNew = true;
      // }
      // self.$bus.$emit('closeDevice')
      // self.$store.state.delPoint = false
      // self.$store.commit('setAreaId', '')
    }
  });
}
export { addCameraNew, initPointPositionNew, addMessageTipNew, addPointNew,addPointNewShow };
