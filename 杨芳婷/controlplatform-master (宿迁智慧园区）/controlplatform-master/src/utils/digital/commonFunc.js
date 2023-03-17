
  // 点击选中实体
export const leftClickEntity = (self,viewer,Cesium) => {
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function (movement) {
  let modelPosition = null
  // 当前点击的实体
  console.log('当前的点击实体movement',movement);
  var pick = viewer.scene.pick(movement.position);
  if (Cesium.defined(pick)) {
    if (!pick.id) {
      return;
    }
  }
  const ellipsoid = viewer.scene.globe.ellipsoid;
  //选中某模型pick选中的对象
  if(pick){
    console.log('12313213213213213');
     if (pick && pick.id) {
      self.$bus.$emit('getCamerasImg',pick.id._id)
    console.log('点击事件生成的点位443434343',pick.id);
  modelPosition = viewer.scene.pickPosition(movement.position);
  if (document.getElementById(pick.id._id)) {
    document.getElementById(pick.id._id).style.display = 'none'
  }
  if(pick.id._id==='Site001'){
    console.log('我是Site0001');
  }
  console.log('hsgasasg');
    //方向   围绕Z轴旋转
   const heading = Cesium.Math.toDegrees(viewer.camera.heading).toFixed(2);
  //倾斜角度   围绕Y轴旋转
  const pitch = Cesium.Math.toDegrees(viewer.camera.pitch).toFixed(2);
  //围绕X轴旋转
  const roll = Cesium.Math.toDegrees(viewer.camera.roll).toFixed(2);
  console.log('heading:'+heading+';'+'pitch:'+pitch + ';'+'roll:' + roll)
  console.log('当前点击实体的笛卡尔坐标',modelPosition);
  var cartographic = ellipsoid.cartesianToCartographic(modelPosition);
 const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(7);
 const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(7);
  //相机高度
const height=viewer.camera.positionCartographic.height.toFixed(0);
console.log('lon:'+lon+";"+'lat:'+lat+";"+ 'height:'+height);
// alert('经度:'+lon+";"+'纬度:'+lat+";"+ '高程:'+height)
  }
  }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
// 添加模型（3DTiles\Glb\gltf模型）  options: 模型数据参数 otherPara：其他配置参数  type: 模型类型  rate模型缩放比例  TOK
export const modleFn = (viewer,Cesium, options,otherPara, type, rate) => {
    const {position, model}  = options
    const tileset  = new Cesium.Cesium3DTileset({
        url:options.model,
        otherPara
      })
    const positionNew = Cesium.Cartesian3.fromDegrees(
        position.latitude,
        position.longitude,
        position.height
      );
    // const orientation = setModelDirection(120.378114, 36.0954352, 90);
    switch (type) {
      case "3dtitles":
       viewer.scene.primitives.add(tileset)
      //  viewer.flyTo(tileset);
       break;
       case "glb":
       case "gltf":
        viewer.entities.add({
          name: "url",
          position: positionNew,
          // 方向
          // orientation: orientation,
          model: {
          clampToGround:true, //贴地
          uri: model,
          scale: rate || 1,  //缩放比例
          //不管缩放如何，模型的最小最小像素大小。
          minimumPixelSize: 1,
          //模型的最大比例尺大小。 minimumPixelSize的上限。
          maximumScale: 100,
          },
      });
        // viewer.flyTo(entity); // 缓慢飞行到该位置
        // $viewer.trackedEntity = entity;  //直接定位
       break;
       default:
        break;
    }
  }

  // 相机飞行 - 飞行到视角位置 需要设置摄像机的最终位置    centeropt： 经纬度和方向 { "x": 122.14673042592898, "y": 41.00024230147126, "z": 100, "heading": 357.8, "pitch": -70.5, "roll": 360 };
export const CameraFlyTo = (viewer,Cesium,centeropt) =>{
  //通过动画的方式转移到某个位置
  viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(centeropt.x, centeropt.y, centeropt.z || 0), //经度、纬度、高度
      orientation: {
          heading: Cesium.Math.toRadians(centeropt.heading || 0),                          //绕垂直于地心的轴旋转  方位角
          pitch: Cesium.Math.toRadians(centeropt.pitch || -Cesium.Math.PI_OVER_FOUR),      //绕纬度线旋转  倾角
          roll: Cesium.Math.toRadians(centeropt.roll || 0)                                 //绕经度线旋转  旋转角
      },
      maximumHeight: 1000,                  //飞行高峰时的最大高度
      duration: 4, //飞行所用时间
 });
//  将摄像机定位到某个位置
//  viewer.camera.setView({
//   destination : Cesium.Cartesian3.fromDegrees(centeropt.x, centeropt.y, centeropt.z || 0),//相机位置
//   orientation: {
//       heading: Cesium.Math.toRadians(centeropt.heading || 0),   
//       pitch: Cesium.Math.toRadians(centeropt.pitch || -Cesium.Math.PI_OVER_FOUR),
//       roll: Cesium.Math.toRadians(centeropt.roll || 0)           
//   }
// });
}
  
  // 竖直广告牌 - 图片显示 canvas:图片  max:材质的最高高程  min:材质的最低高程  positions:实体的两个点位 控制它的 宽度
export const abbrImg = (viewer,Cesium,canvas,max,min,positions,id) => {
    // 返回一个实例
    let returnData = new Cesium.CustomDataSource();
    // 添加一个实体
    returnData.entities.add({
    name: "立体墙",
    id:id,
    wall: {
    positions:positions,
    maximumHeights: max,
    minimumHeights: min,
    // 用img来填充当前的材质
    material: new Cesium.ImageMaterialProperty({
    image: canvas,
    transparent: true,
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    }),
    },
    });
    // 添加到viewer中
    viewer.dataSources.add(returnData);
  }

 
// 实体飞行 - 飞行到某对象 obj： 实体对象
export const EntityFlyTo = (viewer,obj) =>{
  viewer.flyTo(obj)  //通过动画方式转移到某个位置
  // $viewer.flyTo(entity, {
  //   offset: {
  //     heading: opt.heading,
  //     pitch:opt.pitch,
  //     roll: opt.roll
  //   },
  //   duration: opt.duration // 设置飞行持续时间，默认会根据距离来计算
  // })

  // $viewer.zoomTo(obj) // 可以立即定位到某个位置
}


// html 绑定 实体
const BindToFollow = (viewer,Cesium) => {
  if (entityGather.length != 0) {
    try {
      entityGather.forEach(item => {
        if (item._id) {
          // 世界坐标转 屏幕坐标
          var position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, item._position._value);
          if( document.getElementById(item._id)){
            document.getElementById(item._id).style.transform = `translate3d(${(position.x + 180)}px, ${(position.y - 50)}px, 0)`
          }
        }
      })
    } catch (error){
      console.log(error)
    }
  } else {
    return false;
  }
}

// 创建气泡式图表
// 存储所有的气泡式图表的实体信息
let entityGather = []
// 添加一个点位图标
export const bubbleChartsFn = (viewer,Cesium,position,bubbleImage) => {
  let _id = position.id;
  let iconEntitie = viewer.entities.add({
    id: _id,
    position: position.posi,
    billboard: {
      //图标
      image:bubbleImage.image,
      width: bubbleImage.width || 10,
      height: bubbleImage.height || 10,
      scale: bubbleImage.scale || 1,
      pixelOffset: bubbleImage.pixelOffset || new Cesium.Cartesian2(0, -12),
    },

  });
  entityGather.push(iconEntitie)
  iconEntitie.heightReference = Cesium.HeightReference.CLAMP_TO_GROUND;
  EntityFlyTo(viewer,iconEntitie)
  // 监听气泡式图表 实时改变位置
  viewer.scene.postRender.addEventListener(function(){
    BindToFollow(viewer,Cesium)
  })
}