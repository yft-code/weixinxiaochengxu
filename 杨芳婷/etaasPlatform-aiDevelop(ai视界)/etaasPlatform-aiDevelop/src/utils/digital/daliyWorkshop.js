import toBase64ForDefaultValue from "./html2base64";
export default function randerDaliyWorkshop(center, id, that) {
  let rotate = 44;
  let first = true;
  let arr = [
    {
      id: `daliyWorkshop` + id,
      chartType: "daliyWorkshopOut",
      center: center,
      width: 268, // 广告牌宽度
      height: 578, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image"
    },
    {
      id: `daliyWorkBtn1` + id,
      chartType: "daliyWorkBtn",
      center: {
        longitude: center.longitude - 0.00008215621274132445,
        latitude: center.latitude + 0.00007391765026909525,
        height: center.height + 27.5
      },
      width: 56, // 广告牌宽度
      height: 18, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image"
    },
    {
      id: `daliyWorkBtn2` + id,
      chartType: "daliyWorkBtn",
      center: {
        longitude: center.longitude - 0.00008215621274132445,
        latitude: center.latitude + 0.00007391765026909525,
        height: center.height + 18.5
      },
      width: 56, // 广告牌宽度
      height: 18, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image"
    },
    {
      id: `daliyWorkBtn3` + id,
      chartType: "daliyWorkBtn",
      center: {
        longitude: center.longitude - 0.00008215621274132445,
        latitude: center.latitude + 0.00007391765026909525,
        height: center.height + 10
      },
      width: 56, // 广告牌宽度
      height: 18, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image"
    },
    {
      id: `daliyWorkBtn4` + id,
      chartType: "daliyWorkBtn",
      center: {
        longitude: center.longitude - 0.00008215621274132445,
        latitude: center.latitude + 0.00007391765026909525,
        height: center.height + 1.5
      },
      width: 56, // 广告牌宽度
      height: 18, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image"
    },
    {
      id: `daliyWorkBtn5` + id,
      chartType: "daliyWorkBtn",
      center: {
        longitude: center.longitude - 0.00008215621274132445,
        latitude: center.latitude + 0.00007391765026909525,
        height: center.height - 7.5
      },
      width: 56, // 广告牌宽度
      height: 18, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image"
    },
    {
      id: `historyClose1` + id,
      center: {
        longitude: center.longitude - 0.0002836997387021256,
        latitude: center.latitude + 0.000281718338449366,
        height: center.height + 35
      },
      width: 14, // 广告牌宽度
      height: 14, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image",
      content: "static/img/chart/button_gb_lscl@2x.png",
      show: false
    },
    {
      id: `historyClose2` + id,
      center: {
        longitude: center.longitude - 0.0002836997387021256,
        latitude: center.latitude + 0.000281718338449366,
        height: center.height + 25
      },
      width: 14, // 广告牌宽度
      height: 14, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image",
      content: "static/img/chart/button_gb_lscl@2x.png",
      show: false
    },
    {
      id: `historyClose3` + id,
      center: {
        longitude: center.longitude - 0.0002836997387021256,
        latitude: center.latitude + 0.000281718338449366,
        height: center.height + 15
      },
      width: 14, // 广告牌宽度
      height: 14, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image",
      content: "static/img/chart/button_gb_lscl@2x.png",
      show: false
    },
    {
      id: `historyClose4` + id,
      center: {
        longitude: center.longitude - 0.0002836997387021256,
        latitude: center.latitude + 0.000281718338449366,
        height: center.height + 5
      },
      width: 14, // 广告牌宽度
      height: 14, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image",
      content: "static/img/chart/button_gb_lscl@2x.png",
      show: false
    },
    {
      id: `historyClose5` + id,
      center: {
        longitude: center.longitude - 0.0002836997387021256,
        latitude: center.latitude + 0.000281718338449366,
        height: center.height - 5
      },
      width: 14, // 广告牌宽度
      height: 14, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image",
      content: "static/img/chart/button_gb_lscl@2x.png",
      show: false
    },

    {
      id: `daliyWorktable` + id,
      center: {
        longitude: center.longitude + 0.00011767554670427671,
        latitude: center.latitude - 0.00010901930615858646,
        height: center.height - 38
      },
      width: 57, // 广告牌宽度
      height: 57, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image",
      content: "static/img/chart/img_yq@2x.png",
      show: true
    }
  ];
  let outputArr = [
    {
      id: `historyOutput1` + id,
      chartType: "daylydate",
      center: {
        longitude: center.longitude - 0.00021377222469709523,
        latitude: center.latitude + 0.00020032078929688169,
        height: center.height + 23
      },
      width: 224.04, // 广告牌宽度
      height: 216, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image",
      show: false
    },
    {
      id: `historyOutput2` + id,
      chartType: "daylydate",
      center: {
        longitude: center.longitude - 0.00021377222469709523,
        latitude: center.latitude + 0.00020032078929688169,
        height: center.height + 13
      },
      width: 224.04, // 广告牌宽度
      height: 216, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image",
      show: false
    },
    {
      id: `historyOutput3` + id,
      chartType: "daylydate",
      center: {
        longitude: center.longitude - 0.00021377222469709523,
        latitude: center.latitude + 0.00020032078929688169,
        height: center.height + 3
      },
      width: 224.04, // 广告牌宽度
      height: 216, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image",
      show: false
    },
    {
      id: `historyOutput4` + id,
      chartType: "daylydate",
      center: {
        longitude: center.longitude - 0.00021377222469709523,
        latitude: center.latitude + 0.00020032078929688169,
        height: center.height - 7
      },
      width: 224.04, // 广告牌宽度
      height: 216, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image",
      show: false
    },
    {
      id: `historyOutput5` + id,
      chartType: "daylydate",
      center: {
        longitude: center.longitude - 0.00021377222469709523,
        latitude: center.latitude + 0.00020032078929688169,
        height: center.height - 17
      },
      width: 224.04, // 广告牌宽度
      height: 216, // 广告牌高度
      rotate: rotate, // 正北顺时针角度
      type: "image",
      show: false
    }
  ];
  let detail = [
    `historyOutput1` + id,
    `historyOutput2` + id,
    `historyOutput3` + id,
    `historyOutput4` + id,
    `historyOutput5` + id,
    `historyClose1` + id,
    `historyClose2` + id,
    `historyClose3` + id,
    `historyClose4` + id,
    `historyClose5` + id
  ];
  randerWorkshop(arr);
  bandClickEvent(detail, id, outputArr, that, center, first);
}

function randerWorkshop(arr, index, id) {
  for (let chart of arr) {
    chart.isTrans = true; //背景透明
    chart.viewer = $viewer;
    chart.followCamera = false;
    chart.flyTo = false;
    if (chart.id.indexOf("historyClose") != -1) {
      new Cesium.CesiumWallBillboard(chart);
    } else if (chart.id.indexOf("daliyWorktable") != -1) {
      new Cesium.CesiumWallBillboard(chart);
    } else if (chart.id.indexOf("daliyWorkBtn") != -1) {
      toBase64ForDefaultValue(chart.chartType, "#384653").then(res1 => {
        chart.content = res1;
        new Cesium.CesiumWallBillboard(chart);
        document.getElementById(chart.chartType).style.display = "none";
      });
    } else {
      if (chart.id.indexOf(`daliyWorkshop`) !== -1) {
        chart.flyTo = true;
      }
      if (
        chart.id.indexOf(`historyOutput`) != -1 &&
        chart.id === `historyOutput` + index + id
      ) {
        chart.show = true;
      }
      toBase64ForDefaultValue(chart.chartType).then(res1 => {
        chart.content = res1;
        new Cesium.CesiumWallBillboard(chart);
        document.getElementById(chart.chartType).style.display = "none";
      });
    }
  }
}
function bandClickEvent(detail, id, outputArr, that, center, first) {
  let latitude = center.latitude;
  let longitude = center.longitude;
  let height = center.height;
  // 鼠标事件监听
  let handler = new Cesium.ScreenSpaceEventHandler($viewer.canvas);

  handler.setInputAction(function (event) {
    var pick = $viewer.scene.pick(event.position);
    if (Cesium.defined(pick)) {
      if (!pick.id) {
        return;
      }
      if (pick.id.id && pick.id.id.indexOf("daliyWorkBtn") > -1) {
        let currentId = pick.id.id.substring(13); //当前点击的日产量图表的id
        let index = pick.id.id[12]; //当前点击的第几个图表
        if (first) {
          first = false;
          $viewer.entities.getById(
            `historyClose` + index + currentId
          )._show = true;
          randerWorkshop(outputArr, index, currentId);
          return;
        }
        if (
          !Cesium.defined(
            $viewer.entities.getById(`historyOutput` + index + currentId)
          )
        ) {
          return;
        }

        detail.forEach(element => {
          $viewer.entities.getById(element)._show = false;
        });

        $viewer.entities.getById(
          `historyOutput` + index + currentId
        )._show = true;
        $viewer.entities.getById(
          `historyClose` + index + currentId
        )._show = true;
      } else if (pick.id.id && pick.id.id.indexOf("historyClose") > -1) {
        let currentId = pick.id.id.substring(13);
        let index = pick.id.id[12];
        $viewer.entities.getById(
          `historyOutput` + index + currentId
        )._show = false;
        $viewer.entities.getById(
          `historyClose` + index + currentId
        )._show = false;
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
