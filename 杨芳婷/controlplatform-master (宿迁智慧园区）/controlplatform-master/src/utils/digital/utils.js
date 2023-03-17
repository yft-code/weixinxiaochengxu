import { model_url } from "@/api/digital/config.js";
import axios from "axios";

function addQxsy(viewer) {
  qtum3d.layer.createLayer(
    {
      type: "3dtiles",
      name: "水泥厂",
      url: model_url,
      offset: {
        z: 18.5
      },
      style: {
        color: {
          conditions: [
            ["${floor} >= 300", "rgba(0, 0, 0, 0.3)"],
            ["${floor} >= 200", "rgba(0, 0, 0, 0.3)"],
            ["${floor} >= 100", "rgba(0, 0, 0, 0.3)"],
            ["${floor} >= 50", "rgba(0, 0, 0, 0.2)"],
            ["${floor} >= 25", "rgba(0, 0, 0, 0.3)"],
            ["${floor} >= 10", "rgba(0, 0, 0, 0.3)"],
            ["${floor} >= 5", "rgba(0, 0, 0, 0.3)"],
            ["true", "rgba(0, 0, 0, 0.3)"]
          ]
        }
      },
      center: {
        y: 40.895092,
        x: 121.918679,
        z: 397.9,
        heading: 64,
        pitch: -41.4,
        roll: 0.2
      },
      visible: true
    },
    viewer
  );
}

function addRoadLayer(viewer) {
  var gaodeImageProvider = new Cesium.UrlTemplateImageryProvider({
    url: "http://mt1.google.cn/vt/lyrs=y&hl=zh-CN&x={x}&y={y}&z={z}&gl=cn" // 添加高德影像
  });
  viewer.imageryLayers.addImageryProvider(gaodeImageProvider);
}

function addMapBox(viewer) {
  var token =
    "pk.eyJ1IjoiYWRtaW44OTU2IiwiYSI6ImNrcG1jYTN2cjF6emMycHBpMm1hdGlmNjUifQ.1VfIq2__m-Y--yp4c37ZbA";

  var layer = new Cesium.MapboxStyleImageryProvider({
    url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    styleId: "dark-v10",
    accessToken: token,
    scaleFactor: true
  });

  viewer.imageryLayers.addImageryProvider(layer);
}

function changeSkyBox() {
  var qingtianSkybox = new Cesium.GroundSkyBox({
    sources: {
      positiveX: require("@/assets/digital/assets/img/skybox/dark/SunSetRight.png"),
      negativeX: require("@/assets/digital/assets/img/skybox/dark/SunSetLeft.png"),
      positiveY: require("@/assets/digital/assets/img/skybox/dark/SunSetFront.png"),
      negativeY: require("@/assets/digital/assets/img/skybox/dark/SunSetBack.png"),
      positiveZ: require("@/assets/digital/assets/img/skybox/dark/SunSetUp.png"),
      negativeZ: require("@/assets/digital/assets/img/skybox/dark/SunSetDown.png")
    }
  });
  var defaultSkybox = $viewer.scene.skyBox;
  var currSkyBox = qingtianSkybox;

  $viewer.scene.preRender.addEventListener(function (s, t) {
    var position = $viewer.camera.position;
    var height = Cesium.Cartographic.fromCartesian(position).height;
    if (height < 230000) {
      if (currSkyBox) {
        $viewer.scene.skyBox = currSkyBox;
      }
      $viewer.scene.skyAtmosphere.show = false;
    } else {
      if (defaultSkybox) {
        $viewer.scene.skyBox = defaultSkybox;
      }
      $viewer.scene.skyAtmosphere.show = true;
    }
  });
}

function formatNum(num) {
  //将数字 改成999,999.000 格式
  var str = num + "";

  var dot = "";
  if (str.split(".")[1]) {
    dot = str.split(".")[1];
    str = str.split(".")[0];
  }

  var arr = str.split("").reverse();

  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr.push(arr[i]);
    if ((i + 1) % 3 == 0 && i < arr.length - 1) {
      newArr.push(",");
    }
  }
  str = newArr.reverse().join("");
  if (dot.length) {
    str = str + "." + dot;
  }
  return str;
}

function addGlowline(viewer) {
  Cesium.GeoJsonDataSource.load("static/data/road.json", {
    clampToGround: !0
  })
    .then(function (e) {
      viewer.dataSources.add(e);
      var Routes11 = e.entities.values;
      for (var o = 0; o < Routes11.length; o++) {
        var i = Routes11[o];
        o < 100
          ? ((i.polyline.material = new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.06,
            color: Cesium.Color.ORANGERED.withAlpha(0.9)
          })),
            (i.polyline.width = 50))
          : ((i.polyline.material = new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.1,
            color: Cesium.Color.ORANGERED.withAlpha(0.9)
          })),
            (i.polyline.width = 10));
      }
    })
    .otherwise(function (e) {
      //window.alert(e);
    });
}

function drawGltf(viewer) {
  // var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
  //   Cesium.Cartesian3.fromDegrees(114.199271, 22.326215, 15)
  // );
  // var model = viewer.scene.primitives.add(
  //   Cesium.Model.fromGltf({
  //     url: "static/data/gltf/output.glb",
  //     modelMatrix: modelMatrix,
  //     scale: 10.0
  //   })
  // );
  // // 通过viewer设置镜头，飞行至实体位置
  // viewer.camera.setView({
  //   destination: Cesium.Cartesian3.fromDegrees(114.199271, 22.326215, 15)
  // });
  var drawControl = new qtum3d.Draw(viewer, {});
  var jsonUrl = "./static/data/model.json";
  axios.get(jsonUrl).then(res => {
    var json = res.data;
    drawControl.jsonToEntity(json, true, true);
  });
  drawControl.selectHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.RIGHT_CLICK
  );
  drawControl.selectHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_CLICK
  );
  drawControl.selectHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.MOUSE_MOVE
  );
  drawControl.selectHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  );
  // if (document.getElementById("print")) {
  //   document.getElementById("print").addEventListener("click", () => {
  //     console.log(JSON.stringify(drawControl.toGeoJSON()));
  //   });
  // }
}

function addCircleAnimation(
  id,
  viewer,
  position,
  height,
  color = new Cesium.Color(255 / 255, 0 / 255, 0, 0.7)
) {
  viewer.entities.add({
    id: id,
    position: position,
    ellipse: {
      height: height,
      semiMinorAxis: 50,
      semiMajorAxis: 50,
      material: new qtum3d.CircleWaveMaterial({
        duration: 5e3,
        gradient: 0,
        count: 1,
        color: color
      })
    }
  });
}

// 绘制模型轨迹移动
function movingCar(Cesium, viewer) {
  //使用JulianDate创建起始时间
  var start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
  var stop = Cesium.JulianDate.addSeconds(start, 120, new Cesium.JulianDate());

  //设置时间轴
  viewer.clock.startTime = start.clone();
  viewer.clock.stopTime = stop.clone();
  viewer.clock.currentTime = start.clone();
  viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //在结束时循环
  viewer.clock.multiplier = 3; //时间轴的速率
  viewer.clock.shouldAnimate = true;
  // viewer.timeline.zoomTo(start, stop); //时间轴

  // 定义开始与结束的位置
  var pos1 = Cesium.Cartesian3.fromDegrees(
    114.19575279459048,
    22.323652022095747
  );
  var pos2 = Cesium.Cartesian3.fromDegrees(
    114.20192168016922,
    22.325751983342975
  );

  var position = new Cesium.SampledPositionProperty();
  position.addSample(start, pos1); //指定时间所在的位置
  position.addSample(stop, pos2);

  var entity = viewer.entities.add({
    availability: new Cesium.TimeIntervalCollection([
      //定义动画开始与结束的时间
      new Cesium.TimeInterval({
        start: start,
        stop: stop
      })
    ]),
    model: {
      uri: "static/data/gltf/CesiumMilkTruck.glb",
      maximumPixelSize: 40,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      scale: 10,
      scaleByDistance: new Cesium.NearFarScalar(1000, 1, 8000, 0) //缩放
    },
    // viewFrom: new Cesium.Cartesian3(-100.0, 0.0, 100.0), //视角位置
    position: position,
    orientation: new Cesium.VelocityOrientationProperty(position) // 根据所提供的速度计算模型的朝向
  });
}


// 拖拽
function setCharts(el, _this) {
  el.onmousedown = function (e) {
    var disx = e.pageX - el.offsetLeft;
    var disy = e.pageY - el.offsetTop;
    el.style.cursor = "Move";
    document.onmousemove = function (e) {
      e.preventDefault;
      var width = el.parentElement.clientWidth - el.offsetWidth;
      var height = el.parentElement.clientHeight - el.offsetHeight;
      var x = e.pageX - disx;
      var y = e.pageY - disy;
      // min方法保证不会超过右边界，max保证不会超过左边界
      x = Math.min(Math.max(0, x), width);
      y = Math.min(Math.max(0, y), height);
      el.style.left = x + "px";
      el.style.top = y + "px";
    };
    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
      el.style.cursor = "Default";
    };
  };
}



// 原生cesium绘制模型
function drawGltfByCesium() { }
export {
  addQxsy,
  addRoadLayer,
  addMapBox,
  changeSkyBox,
  formatNum,
  addGlowline,
  drawGltf,
  addCircleAnimation,
  movingCar,
  setCharts
};
