// 添加摄像头的
export function addCamera(dataSource, cameraInfo) {
  cameraInfo.perspective.y = cameraInfo.perspective.y + 0.0014377634220078994
  cameraInfo.perspective.x = cameraInfo.perspective.x + 0.000982449335353408
  cameraInfo.perspective.z = cameraInfo.perspective.z-50
  let positionObj = cameraInfo.center;
  let cameraId = cameraInfo.id;
  let title=cameraInfo.title
  let num=cameraInfo.num?cameraInfo.num:'1'
  let point = {
    id: cameraId,
    title:title,
    num:num,
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


  if (dataSource && dataSource.entities) {

    dataSource.entities.add({
      id: point.id,
      position: Cesium.Cartesian3.fromDegrees(
        +point.lng,
        +point.lat,
        point.z || 0
      ),
      label: {
        show: true, // 是否显示
        text:point.title,  // 显示的文字
        font: '10px sans-serif',    // 字体样式配置
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
        pixelOffset: new Cesium.Cartesian2(0,-100),
        pixelOffsetScaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0),
    },
      billboard: {
        image: require("@/assets/cesium/camera.png"),
        scale: 1,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0)
      },
      click: function (t) {

      }
    });
  }
}