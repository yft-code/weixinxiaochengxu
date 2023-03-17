//气泡式图表
import toBase64ForDefaultValue from './html2base64.js'
// 沉浸式图表
export function addFeature(element,$viewer) {
    let chart = {
        id: element.id+'Tab',
        chartType: element.id,
        center: element.center,
        width: element.width, // 广告牌宽度
        height: element.height, // 广告牌高度
        rotate: element.rotate, // 正北顺时针角度
        type: "image",
        show: element.show,
        flyTo: true,
        viewer: $viewer,
        followCamera: false,
        isTrans: true, //背景透明
    };
    toBase64ForDefaultValue(chart.chartType).then((res1) => {
        chart.content = res1;
        console.log(new Cesium.CesiumWallBillboard(chart))
    });
    return chart
}

//气泡式图表
export function addpopUp(element,$viewer) {
    let currenDom = document.getElementById(element.id);
    let t = new qtum3d.DivPoint($viewer, {
        id: element.id,
        html: `<div class="msg" style="pointer-events: none">
          <div id="${element.id}popup">
          </div>
          </div>`,
        position: Cesium.Cartesian3.fromDegrees(
            element.center.longitude,
            element.center.latitude,
            element.center.height
        ),
        anchor: element.anchor,
        visibleDistanceMin: 2000,
        visibleDistanceMax: 5000,
        click: function (i) {
        },
    });
    //将组件放在对应的气泡图表上
    let parentdom = document.getElementById(element.id + "popup");
    setTimeout(() => {
        parentdom.appendChild(currenDom);
    }, 50);
}

// 增加垃圾点位
// export function addRubbishPoint(dataSource,element) {
  //   let arr = [
  //     `video-container-${element.id}`,
  //     `title-${element.id}`,
  //     `see-warning-list-${element.id}`,
  //     `close-camera-button-${element.id}`,
  //     `cameraVideo-${element.id}`,
  //   ];
  //   dataSource.entities.add({
  //     id: element.id,
  //     position: Cesium.Cartesian3.fromDegrees(
  //       +element.longitude,
  //       +element.latitude,
  //       element.height || 0
  //     ),
  //     label: {
  //       show: true,  // 是否显示
  //       text:element.title,  // 显示的文字
  //       font: '14px sans-serif',  // 字体样式配置
  //       fillColor: Cesium.Color.WHITE,  // 填充颜色
  //       outlineColor: Cesium.Color.BLACK,   // 外边线颜色
  //       outlineWidth: 3.0,  // 外边线宽度
  //       showBackground: true,   // 是否显示背景
  //       backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),    // 设置背景颜色
  //       backgroundPadding: new Cesium.Cartesian2(7, 5), // 设置背景内边距
  //       style: Cesium.LabelStyle.FILL, // 文字样式 FILL、OUTLINE、FILL_AND_OUTLINE
  //       // eyeOffset: new Cesium.Cartesian2(7, 5), // 视角偏移量，不知道怎么描述与pixelOffset不同，不偏移设置Cesium.Cartesian3.ZERO
  //       horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 文字水平对齐方式
  //       verticalOrigin: Cesium.VerticalOrigin.BASELINE, // 文字垂直对齐方式
  //       scale: 1.0, // 缩放
  //       pixelOffset: new Cesium.Cartesian2(0,-100),
  //       pixelOffsetScaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0),
  //   },
  //     billboard: {
  //       // image: require("@assets/digital/assets/img/mode/healthConcern/rubbish.png"),
  //       scale: 1,
  //       horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
  //       verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  //       scaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0)
  //     },
  //     click: function (t) {
  //     }
  //   });
  // }
//     let arr = [
//       `video-container-${element.id}`,
//       `title-${element.id}`,
//       `see-warning-list-${element.id}`,
//       `close-camera-button-${element.id}`,
//       `cameraVideo-${element.id}`,
//     ];
//     dataSource.entities.add({
//       id: element.id,
//       position: Cesium.Cartesian3.fromDegrees(
//         +element.longitude,
//         +element.latitude,
//         element.height || 0
//       ),
//       label: {
//         show: true,  // 是否显示
//         text:element.title,  // 显示的文字
//         font: '14px sans-serif',  // 字体样式配置
//         fillColor: Cesium.Color.WHITE,  // 填充颜色
//         outlineColor: Cesium.Color.BLACK,   // 外边线颜色
//         outlineWidth: 3.0,  // 外边线宽度
//         showBackground: true,   // 是否显示背景
//         backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),    // 设置背景颜色
//         backgroundPadding: new Cesium.Cartesian2(7, 5), // 设置背景内边距
//         style: Cesium.LabelStyle.FILL, // 文字样式 FILL、OUTLINE、FILL_AND_OUTLINE
//         // eyeOffset: new Cesium.Cartesian2(7, 5), // 视角偏移量，不知道怎么描述与pixelOffset不同，不偏移设置Cesium.Cartesian3.ZERO
//         horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 文字水平对齐方式
//         verticalOrigin: Cesium.VerticalOrigin.BASELINE, // 文字垂直对齐方式
//         scale: 1.0, // 缩放
//         pixelOffset: new Cesium.Cartesian2(0,-100),
//         pixelOffsetScaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0),
//     },
//       billboard: {
//         image: require("@assets/digital/assets/img/mode/healthConcern/rubbish.png"),
//         scale: 1,
//         horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//         verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
//         scaleByDistance: new Cesium.NearFarScalar(300, 1, 8000, 0)
//       },
//       click: function (t) {
//       }
//     });
//   }

//重新建立气泡式图表
export function addpopUpReCreated(element) {
  let currenDom = element.element;
  let t = new qtum3d.DivPoint($viewer, {
      id: element.id,
      html: `<div class="msg" style="pointer-events: all">
        <div id="${element.id}popup">
        </div>
        </div>`,
      position: Cesium.Cartesian3.fromDegrees(
          element.longitude,
          element.latitude,
          element.height
      ),
      noEvent: false,
      anchor: element.anchor,
      visibleDistanceMin: 2000,
      visibleDistanceMax: 5000,
      click: function (a,b,c) {
        if(c.target.className === 'closeImg'){
          document.getElementById(element.id).style.display = 'none';
        }
      },
  });
  // 将组件放在对应的气泡图表上
  let parentdom = document.getElementById(element.id + "popup");
  setTimeout(() => {
      parentdom.appendChild(currenDom);
  }, 50);
}