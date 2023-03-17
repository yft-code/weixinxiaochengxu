import {
  getHttpflv,
} from "./camerashttprequests";
import { getVideoStream } from "../../api/digital/config";
import flvjs from 'flv.js/src'
import toBase64ForDefaultValue, { toBase64ForDefaultValue2 } from "./html2base64";
function billboardVideo(viewer, Cesium, that, positionObj, cameraItem) {
  const { id: cameraId, tagname, rtsp } = cameraItem;
  let playerArr = [];
  let videoData = [
    {
      id: `video-container-${cameraId}`,
      center: {},
      width: 300, // 广告牌宽度
      height: 300, // 广告牌高度
      rotate: 44, // 正北顺时针角度
      type: "image",
      content: `${require("../../assets/digital/assets/img/camera/11.png")}`
    },
    // {
    //   id: `title-${cameraId}`,
    //   center: {},
    //   needHtml2Canvas: true,
    //   width: 160, // 广告牌宽度
    //   height: 20, // 广告牌高度
    //   rotate: 44, // 正北顺时针角度
    //   type: "image",
    //   content: `
    //   <div style="
    //   font-size: 30px;
    //   font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    //   font-weight: 500;
    //   color: #E8EEFF;
    //   text-align: center;
    //   line-height: 50px; 
    //   position:fixed;" 
    //   id="title-${cameraId}">${tagname}</div>
    // `
    // },
    // {
    //   id: `see-warning-list-${cameraId}`,
    //   center: {},
    //   needHtml2Canvas: true,
    //   width: 96, // 广告牌宽度
    //   height: 16, // 广告牌高度
    //   rotate: 44, // 正北顺时针角度
    //   type: "image",
    //   content: `
    //   <div style="
    //   padding-bottom: 3px;
    //   border-bottom: 1px solid blue;
    //   font-size: 20px;
    //   font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    //   font-weight: 500;
    //   color: #25BCFF;
    //   text-align: center;
    //   line-height: 20px; 
    //   position:fixed;" 
    //   id="see-warning-list-${cameraId}">查看预警清单</div>
    // `
    // },
    // {
    //   id: `close-camera-button-${cameraId}`,
    //   center: {},
    //   // needHtml2Canvas: true,
    //   width: 20, // 广告牌宽度
    //   height: 20, // 广告牌高度
    //   rotate: 44, // 正北顺时针角度
    //   type: "image",
    //   content:
    //     `${require("../../assets/digital/assets/img/camera/close.png")}`
    //   //  `<div style="width:100px;height:100px;position:fixed;top:0;left:0;z-index:999999999999;font-size:100px;color:#fff;" id="close-camera-button-${cameraId}">X</div>`
    // },
    // {
    //   id: `cameraVideo-${cameraId}`,
    //   center: {},
    //   // needHtml2Canvas: true,
    //   width: 336, // 广告牌宽度
    //   height: 189, // 广告牌高度
    //   rotate: 44, // 正北顺时针角度
    //   type: "video",
    //   content: ""
    //   // type: "image",

    //   // center: {},
    //   // width: 336, // 广告牌宽度
    //   // height: 189, // 广告牌高度
    //   // rotate: 44, // 正北顺时针角度
    //   // type: "image",
    //   // content: `${require("../../assets/digital/assets/img/camera/close.png")}`
    //   //   content: 
    //   //   `
    //   //   <div style="
    //   //   width: 336px;
    //   //   height: 189px; 
    //   //   background-color: blue;
    //   //   position:fixed;" 
    //   //   id="cameraVideo-${cameraId}"></div>
    //   // `
    // },
  ];
  videoData&&videoData.map(item=>{
    that.$store.state.allBillboardId.push(item.id)
  })
  initCamera();
  function initCamera() {
    // 初始化所有实体位置
    initCameraComponent();
    videoData.forEach(element => {
      element.isTrans = true;
      element.viewer = viewer;
      element.show = true;
      element.followCamera = false;
      element.flyTo = true; //不绑定点击飞行事件
      if (element.needHtml2Canvas) {
        randerobj(element);
      } else {
        new Cesium.CesiumWallBillboard(element);
      }
    });
  }

  function createVideoNode(id, src, element) {
    let videoNode = document.createElement("div");
    videoNode.innerHTML = `<video id="${id}" autoplay muted="muted" v-show="false" loop="loop">
      </video>`;
    document.body.appendChild(videoNode);
    let node = document.getElementById(id);
    if (src) {
      var player = new ZLMRTCClient.Endpoint({
        element: node, // video 标签
        debug: false, // 是否打印日志
        zlmsdpUrl: src, //流地址
        simulcast: true,
        useCamera: false,
        audioEnable: false,
        videoEnable: true,
        recvOnly: true,
        resolution: { w: 1280, h: 720 }
      });

      player.on(ZLMRTCClient.Events.WEBRTC_ICE_CANDIDATE_ERROR, function (e) {
        // ICE 协商出错
        console.log("ICE 协商出错");
      });

      player.on(ZLMRTCClient.Events.WEBRTC_ON_REMOTE_STREAMS, function (e) {
        //获取到了远端流，可以播放
        videoNode.children[0].srcObject = e.streams[0];
        playerArr.push(player);
        setTimeout(() => {
          let videoElement = document.getElementById(id); //重新获取DOM
          videoElement && videoElement.play();
          element.content = videoElement;
          new Cesium.CesiumWallBillboard(element);
          hideHtmlNodeForDefault(id);
        })
      });

      player.on(
        ZLMRTCClient.Events.WEBRTC_OFFER_ANSWER_EXCHANGE_FAILED,
        function (e) {
          // offer answer 交换失败
          console.log("offer answer 交换失败", e);
          stop();
        }
      );

    }

  }

  function createVideoNode2(id) {
    let videoNode = document.createElement("div");
    videoNode.innerHTML = `<video id="${id}" autoplay muted="muted" v-show="false" loop="loop">
      </video>`;
    document.body.appendChild(videoNode);
  }
  function initCameraComponent() {
    var msg = createBillboard();
    videoData.forEach((element, index) => {
      element.center.longitude = msg[index].longitude;
      element.center.latitude = msg[index].latitude;
      element.center.height = msg[index].height;
    });
  }



  // 渲染数据
  function randerobj(element) {
    if (document.getElementById(element.id) == null) {
      createHtmlNodeForDefault(element.content);
    }

    toBase64ForDefaultValue(element.id).then(res1 => {
      element.content = res1;
      new Cesium.CesiumWallBillboard(element);
      // hideHtmlNodeForDefault(element.id);
    });
  }

  function createHtmlNodeForDefault(detail) {
    let sonDetailDiv = document.createElement("div");
    sonDetailDiv.innerHTML = detail;
    document.body.appendChild(sonDetailDiv);
  }

  function hideHtmlNodeForDefault(id1) {
    document.getElementById(id1).style.display = "none";
  }
  // 初始化实体相对位置的函数
  function createBillboard() {
    let result = [
      {
        id: "video-container",
        longitude: positionObj.longitude - 0.0001695416288640672,
        latitude: positionObj.latitude + 0.000142453381773322,
        height: positionObj.height + 35.5
      },
      {
        id: "video-container",
        longitude: positionObj.longitude - 0.00008326211017,
        latitude: positionObj.latitude + 0.000075116722412,
        height: positionObj.height + 50
      },
      {
        id: "video-container",
        longitude: positionObj.longitude - 0.0002425416288607503,
        latitude: positionObj.latitude + 0.0002314533817726201,
        height: positionObj.height + 50
      },
      {
        id: "video-container",
        longitude: positionObj.longitude - 0.0002955416288585866,
        latitude: positionObj.latitude + 0.00028445338177363055,
        height: positionObj.height + 49.8
      },
      {
        id: "video-container",
        longitude: positionObj.longitude - 0.0001694416288640672,
        latitude: positionObj.latitude + 0.000142453381773322,
        height: positionObj.height + 33
      },
    ];
    return result;
  }

  let idArr = [
    `video-container-${cameraId}`,
    `title-${cameraId}`,
    `see-warning-list-${cameraId}`,
    `close-camera-button-${cameraId}`,
    `cameraVideo-${cameraId}`,
  ];
  // 鼠标事件监听
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction(function (event) {
    var pick = viewer.scene.pick(event.position);
    if (Cesium.defined(pick)) {
      if (!pick.id) {
        return;
      }
      switch (pick.id.id) {
        case `see-warning-list-${cameraId}`:
          // 触发actions请求弹窗列表数据
          that.$store.state.currentCameraId = cameraId;
          that.$store.commit('setEarlyWarnigShow', true)
          that.$store.state.earlyStyleShow = false
          that.$bus.$emit('setEarlyWarnig')
          break;
        case `close-camera-button-${cameraId}`:
          console.log('点击关闭按钮关闭')
          idArr.forEach(id => {
            $viewer.entities = $viewer.entities || []
            let entity = $viewer.entities.getById(id);
            entity && (entity._show = false);
          });
          // that.$store.commit("setVideoContainerShow");
          // console.log(this.$store.state.videoContainerShow,'222')
          that.$store.state.videoContainerShow.forEach((item, index) => {
            item.id == cameraId ? item.show = false : ''
          })
          break;
        default:
          break;
      }

    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  // handler.setInputAction(function(event) {
  //   let scene = viewer.scene;
  //   var wp = event.position;
  //   if (!Cesium.defined(wp)) {
  //     return;
  //   }
  //   // 笛卡尔坐标
  //   let cartesian = scene.pickPosition(wp);
  //   if (!Cesium.defined(cartesian)) {
  //     return;
  //   }
  //   // 经纬度坐标
  //   var ellipsoid = scene.globe.ellipsoid;
  //   var xyz = new Cesium.Cartesian3(cartesian.x, cartesian.y, cartesian.z);
  //   var wgs84 = ellipsoid.cartesianToCartographic(xyz);
  //   console.log(
  //     Cesium.Math.toDegrees(wgs84.longitude) +
  //       "," +
  //       Cesium.Math.toDegrees(wgs84.latitude)
  //   );
  // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

export default billboardVideo;
