function createDragEntity(Cesium, viewer, elements) {
  var elementsID = []
  elements.forEach(element => {
    elementsID.push(element.id)
    new Cesium.CesiumWallBillboard(element)
  });
  let res = MoveEntity();
  res({ viewer }, elementsID)
}

var MoveEntity = function () {
  var leftDownFlag = false;
  var pointDraged = null;
  var center = {};
  var rotate = 10;
  var bill_width = 500,
    image_width = 420;
  var viewer;
  var handler;
  var wp;
  /**
   *
   * @param {Object} options
   */
  function ConstructMoveEntity(options, elementsID) {
    viewer = options.viewer;
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    Init(elementsID);
  }
  function Init(elementsID) {
    // 判断是否选中实体
    handler.setInputAction(function (movement) {
      wp = movement.position;
      if (!Cesium.defined(wp)) {
        return;
      }
      pointDraged = viewer.scene.pick(wp); //选取当前的entity
      if (!Cesium.defined(pointDraged)) {
        return;
      }
      if (pointDraged.id && (elementsID.indexOf(pointDraged.id.id) !== -1)) {
        leftDownFlag = true;
        viewer.scene.screenSpaceCameraController.enableRotate = false; //锁定相机
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

    // Release plane on mouse up
    handler.setInputAction(function () {
      leftDownFlag = false;
      pointDraged = null;
      viewer.scene.screenSpaceCameraController.enableRotate = true;
    }, Cesium.ScreenSpaceEventType.LEFT_UP);
    // Update plane on mouse move
    handler.setInputAction(function (movement) {
      if (leftDownFlag === true && pointDraged != null) {
        let ray = viewer.camera.getPickRay(movement.endPosition);
        let cartesian3 = viewer.scene.globe.pick(ray, viewer.scene);
        if (!Cesium.defined(cartesian3)) {
          return;
        }
        // 经纬度坐标
        let ellipsoid = viewer.scene.globe.ellipsoid;
        let xyz = new Cesium.Cartesian3(
          cartesian3.x,
          cartesian3.y,
          cartesian3.z
        );
        let wgs84 = ellipsoid.cartesianToCartographic(xyz);
        console.log(wgs84, '-------------------------------------------------', cartesian3.z)
        center = {
          longitude: Cesium.Math.toDegrees(wgs84.longitude),
          latitude: Cesium.Math.toDegrees(wgs84.latitude),
          height: Cesium.Math.toDegrees(wgs84.latitude) + 30,
        };

        elementsID.forEach((element) => {
          viewer.entities.getById(
            element
          ).wall.positions = new Cesium.CallbackProperty((time, result) => {
            let pointleft = destinationVincenty(
              center,
              rotate + 90,
              bill_width / 18
            );
            let pointright = destinationVincenty(
              center,
              rotate + 330,
              bill_width / 18
            );
            return Cesium.Cartesian3.fromDegreesArrayHeights([
              pointleft.longitude,
              pointleft.latitude,
              pointleft.height,
              pointright.longitude,
              pointright.latitude,
              pointright.height
            ]);
          }, false);
        })
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
  return ConstructMoveEntity;
};

function destinationVincenty(lonlat, brng, dist) {
  var ct = {
    a: 6378137,
    b: 6356752.3142,
    f: 1 / 298.257223563
  };
  var a = ct.a,
    b = ct.b,
    f = ct.f;

  var lon1 = lonlat.longitude;
  var lat1 = lonlat.latitude;

  var s = dist;
  var alpha1 = (brng * Math.PI) / 180.0;
  var sinAlpha1 = Math.sin(alpha1);
  var cosAlpha1 = Math.cos(alpha1);

  var tanU1 = (1 - f) * Math.tan((lat1 * Math.PI) / 180.0);
  var cosU1 = 1 / Math.sqrt(1 + tanU1 * tanU1),
    sinU1 = tanU1 * cosU1;
  var sigma1 = Math.atan2(tanU1, cosAlpha1);
  var sinAlpha = cosU1 * sinAlpha1;
  var cosSqAlpha = 1 - sinAlpha * sinAlpha;
  var uSq = (cosSqAlpha * (a * a - b * b)) / (b * b);
  var A = 1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  var B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));

  var sigma = s / (b * A),
    sigmaP = 2 * Math.PI;
  while (Math.abs(sigma - sigmaP) > 1e-12) {
    var cos2SigmaM = Math.cos(2 * sigma1 + sigma);
    var sinSigma = Math.sin(sigma);
    var cosSigma = Math.cos(sigma);
    var deltaSigma =
      B *
      sinSigma *
      (cos2SigmaM +
        (B / 4) *
        (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
          (B / 6) *
          cos2SigmaM *
          (-3 + 4 * sinSigma * sinSigma) *
          (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    sigmaP = sigma;
    sigma = s / (b * A) + deltaSigma;
  }

  var tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
  var lat2 = Math.atan2(
    sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
    (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp)
  );
  var lambda = Math.atan2(
    sinSigma * sinAlpha1,
    cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1
  );
  var C = (f / 16) * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
  var L =
    lambda -
    (1 - C) *
    f *
    sinAlpha *
    (sigma +
      C *
      sinSigma *
      (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));

  var revAz = Math.atan2(sinAlpha, -tmp); // final bearing

  return {
    longitude: lon1 + (L * 180) / Math.PI,
    latitude: (lat2 * 180) / Math.PI,
    height: lonlat.height
  };
}

export default createDragEntity;
