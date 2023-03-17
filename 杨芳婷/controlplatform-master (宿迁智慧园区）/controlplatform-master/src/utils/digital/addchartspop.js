//引入echarts
import echarts from "echarts";
function addechartspop(intnnumber) {
  var dataSource = new Cesium.CustomDataSource();
  var points = [
    {
      id: "echarts1",
      lng: 114.199372,
      lat: 22.326825,
      z: 12,
      text: "test",
      imagename: "mark1.png",
      iscreated: false,
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [2, 8, 4, 5, 8, 1, 9],
            type: "line",
          },
        ],
      },
    },
    {
      id: "echarts2",
      lng: 114.199581,
      lat: 22.325797,
      z: 20,
      text: "test",
      imagename: "mark2.png",
      iscreated: false,
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [2, 8, 4, 5, 8, 1, 9],
            type: "bar",
          },
        ],
      },
    },
  ];
  points.forEach((point) => {
    var cname = intnnumber++;
    var html = '<div class="divpoint2" id="' +
      point.id +
      '" style="width:25rem;height:20rem;">\n  </div >';
    dataSource.entities.add({
      id: point.id,
      name: point.text,
      position: Cesium.Cartesian3.fromDegrees(
        +point.lng,
        +point.lat,
        point.z || 0
      ),
      billboard: {
        image: require(`@/assets/digital/assets/img/marker/${point.imagename}`),
        scale: 1,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scaleByDistance: new Cesium.NearFarScalar(1000, 1, 8000, 0)
      },
      click: function (i) {
        if (point.iscreated) {
          return;
        }
        point.iscreated = true;
        var position = i.position.getValue();
        var mainpage = document.getElementsByClassName('main-page')[0];
        var divpoint = document.createElement("div");
        divpoint.className = "divpoint";
        divpoint.id = point.id;
        divpoint.style.position = "absolute";
        divpoint.style.top = "0";
        divpoint.style.left = "0";
        divpoint.style.pointerEvents = "none";
        divpoint.style.backgroundColor = "rgba(255,255,255,0.7)";
        divpoint.style.padding = "10px";

        divpoint.style.width = "200px";
        divpoint.style.height = "180px";
        divpoint.innerHTML = `<div class="closeitem" style="color:#000;font-size:1rem;float:right;pointer-events:all;cursor:pointer;">关闭</div>
    <div class="content" style="width:180px;height:180px;"></div>`;
        var offset = [-100, -230];

        const scene = $viewer.scene, camera = $viewer.camera;
        const cartesian2 = new Cesium.Cartesian2();
        scene.preRender.addEventListener(setposition);
        function setposition() {
          const canvasPosition = scene.cartesianToCanvasCoordinates(position, cartesian2); // 笛卡尔坐标到画布坐标
          if (canvasPosition) {
            divpoint.style.left = canvasPosition.x + offset[0] + "px";
            divpoint.style.top = canvasPosition.y + offset[1] + "px";
            // 是否在地球背面隐藏
            if (true) {
              const cameraPosition = camera.position;
              let height = scene.globe.ellipsoid.cartesianToCartographic(cameraPosition).height;
              height += scene.globe.ellipsoid.maximumRadius;
              if (!(Cesium.Cartesian3.distance(cameraPosition, position) > height)) {
                divpoint.style.display = "block";
              } else {
                divpoint.style.display = "none";
              }
            }
          }
        }
        mainpage.appendChild(divpoint);
        var item = divpoint.getElementsByClassName("content")[0];
        var closeitem = divpoint.getElementsByClassName("closeitem")[0];
        var myChart = echarts.init(item);
        setTimeout(() => {
          point.option && myChart.setOption(point.option);
        }, 50);

        //关闭弹窗
        closeitem.addEventListener('click', function (e) {
          point.iscreated = false;
          var parendnode = e.target.parentNode;
          parendnode.remove();
          scene.preRender.removeEventListener(setposition)
        }, false)

        $viewer.scene.requestRender();
      },
    });
  });
  $viewer.dataSources.add(dataSource);
}

export default addechartspop

