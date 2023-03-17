<template>
  <div>
    <div id="cesiumContainer"></div>
  </div>
</template>
<script>
export default {
  name: "LzMap",
  props: {
    type: {
      default:'1',
      type: String,
    },
    center:{
      default:(()=>{
        return {}
      }),
      type: Object,
    }
  },
  data() {
    return {
      viewer:""
    };
  },
  mounted() {
    if(this.type === '1'){
      this.Mineinit();
    }else{
      this.init();
    }
  },
  watch:{
    center:{
       handler(val){
        if(JSON.stringify(val) != "{}"){
          setTimeout(()=>{
             $viewer.qtum.centerAt(val);
          },1000)
        }
       },
       immediate:true
     }
  },
  methods: {
    flyTo(center) {
      $viewer.qtum.centerAt(center);
    },
    addMapBox(viewer) {
      let token =
        "pk.eyJ1IjoiYWRtaW44OTU2IiwiYSI6ImNrcG1jYTN2cjF6emMycHBpMm1hdGlmNjUifQ.1VfIq2__m-Y--yp4c37ZbA";

      let layer = new Cesium.MapboxStyleImageryProvider({
        url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        styleId: "dark-v10",
        accessToken: token,
        scaleFactor: true
      });
      viewer.imageryLayers.addImageryProvider(layer);
   },
    //水泥厂
     init() {
      var primitives, a;
      let url = haoutil.system.getRequestByName(
        "config",
        "static/common/config/config.json"
      );
      this.map = qtum3d.createMap({
        id: "cesiumContainer",
        url: url,
        success: async (viewer, i) => {
          window.$viewer = viewer;
          viewer.scene.globe.depthTestAgainstTerrain = false;
          viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider(
            {}
          );
          $("#location_mars_jwd").hide();
          this.flyTo({
            y: 22.277989,
            x: 114.223356,
            z: 574.67,
            heading: 239.6,
            pitch: -21.5,
            roll: 358.9,
          });
          (primitives = new Cesium.PrimitiveCollection()),
            viewer.scene.primitives.add(primitives);

          let _that = this;
          let dataSource = new Cesium.CustomDataSource();

         
         
          $viewer.dataSources.add(dataSource);
          this.drawControl = new qtum3d.Draw(window.$viewer, {}).on(
            qtum3d.draw.event.DrawCreated,
            function (o) {
              _that.drawControl.setVisible(false);
              _that.drawControl;
            }
          );
          window.drawControl = this.drawControl;
          // 生成摄像头
          // this.createBilloard()
          // 获取拾取点位
          // leftClickEntity(this,viewer,Cesium)
          let utc = Cesium.JulianDate.fromDate(new Date("2019/10/04 21:00:00"));
          viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(
            utc,
            9,
            new Cesium.JulianDate()
          );
          this.modelData &&
            this.modelData.map((item) => {
              let factoryTileset = new Cesium.Cesium3DTileset({
                url: item,
              });
              this.myView = viewer;
              let tmp = viewer.scene.primitives.add(factoryTileset);
              this.myViews.push(tmp);
              // delModels.push(factoryTileset)
              // this.delModels=delModels
              viewer.scene.primitives.add(factoryTileset);
              viewer.zoomTo(factoryTileset);
              let longitude = 114.209492,
                  latitude = 22.27216499,
                  height = 60;
              let heading = -20;
              factoryTileset.readyPromise.then(function (argument) {
                let position = Cesium.Cartesian3.fromDegrees(
                  longitude,
                  latitude,
                  height
                );
                let mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
                let rotationX = Cesium.Matrix4.fromRotationTranslation(
                  Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(heading))
                );
                Cesium.Matrix4.multiply(mat, rotationX, mat);

                let scale = Cesium.Matrix4.fromUniformScale(15);
                Cesium.Matrix4.multiply(mat, scale, mat);

                factoryTileset._root.transform = mat;
              });
            });
          this.addMapBox(viewer);
          viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1;
          viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40000;
          let helper = new Cesium.EventHelper();
          helper.add(viewer.scene.globe.tileLoadProgressEvent, function (e) {
            if (e == 0) {
              // console.log("矢量切片加载完成时的回调");
            }
          });
          // this.putReport()
        },
      }); 
      this.viewer = $viewer;
      this.$emit('startView',this.viewer)
    },
    //矿山
    Mineinit() {
      let url = haoutil.system.getRequestByName(
        "config",
        // "static/common/config/config.json"
        "static/common/config/ksconfig.json"
      );
      let map = qtum3d.createMap({
        id: "cesiumContainer",
        url: url,
        success: async (viewer, i) => {
         // viewer.scene.debugShowFramesPerSecond = true; //显示帧数
          viewer.scene.requestRenderMode = true;
          window.$viewer = viewer;
          $("#location_mars_jwd").hide();
          // 东经121.506377，北纬31.245105
          let center = {
            y: 27.964285,
            x: 105.91934,
            z: 986.99,
            heading: 82.3,
            pitch: -18,
            roll: 0.5,
          };
          let polyline = viewer.entities.add({
            id: "line",
            show: true,
            polyline: {
              position: [
                Cesium.Cartesian3.fromDegrees(118, 32, 0),
                Cesium.Cartesian3.fromDegrees(119, 32, 0),
                Cesium.Cartesian3.fromDegrees(117, 32, 0),
              ],
            },
            width: 2,
            material: Cesium.Color.WHITE,
          });
          this.flyTo(center);
          let _that = this;
          let dataSource = new Cesium.CustomDataSource();

          $viewer.dataSources.add(dataSource);
          this.drawControl = new qtum3d.Draw(window.$viewer, {}).on(
            qtum3d.draw.event.DrawCreated,
            function (o) {
              _that.drawControl.setVisible(false);
              _that.drawControl;
            }
          );
          window.drawControl = this.drawControl;
          var utc = Cesium.JulianDate.fromDate(new Date("2019/10/04 16:00:00"));
          viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(
            utc,
            9,
            new Cesium.JulianDate()
          );

          let layerWork = qtum3d.layer.createLayer(
            {
              type: "3dtiles",
              name: "矿山",
              url:
                // this.store.state.downPath +
                "http://10.22.90.2:8081/ai-daemon-download/model/luzhou/Scene/tileset.json",
              maximumScreenSpaceError: 1,
              offset: {
                z: 75,
              },
              visible: !0,
            },
            viewer
          );
          viewer.scene.requestRenderMode = true;

          window.measureSurface = new qtum3d.Measure({
            viewer: viewer,
            removeScreenSpaceEvent: !0,
            label: {
              font_size: 20,
              border_width: 4,
              background: !1,
            },
          });
          // 控制缩放范围;
          viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40000;
           // 鼠标事件监听
          let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
          handler.setInputAction((click)=>{
               _that.$emit('cesiumClick',click)
          },Cesium.ScreenSpaceEventType.LEFT_CLICK)
          //监听视角高度，控制图标组件显示隐藏
          viewer.camera.changed.addEventListener(() => {
            "";
            let height = viewer.camera.positionCartographic.height;
            this.showByCamera = height >= 5000 ? false : true;
          });
          //方量分析
          viewer.scene.globe.depthTestAgainstTerrain = !0;
          let that = this;
          viewer.scene.globe.depthTestAgainstTerrain = false;
        
          let helper = new Cesium.EventHelper();
          helper.add(viewer.scene.globe.tileLoadProgressEvent, function (e) {
            if (e == 0) {
              setTimeout(() => {
               // that.$store.state.myLoading = false;
              }, 2000);
            }
          });  
          this.viewer = viewer;  
          this.$emit('startView',this.viewer)
          this.$emit('startDasource',dataSource)
        },  
      });
    
    
    },
  },
};
</script>
<style scoped>
</style>
