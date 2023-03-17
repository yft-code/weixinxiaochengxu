function createdynamicbillboard() {
  var dataSource = new Cesium.CustomDataSource();
  var points = [
    {
      id: "billboard1",
      lng: 114.1981329645075,
      lat: 22.32618149390615,
      z: 25,
      text: "first",
      imagename: "mark1.png",
      iscreated: false,
      billdata: {
        name: "广告牌一",
        message: "这个是第一个广告牌"
      }
    },
    {
      id: "billboard2",
      lng: 114.1991810805212,
      lat: 22.326701953002015,
      z: 20,
      text: "secondes",
      imagename: "mark2.png",
      iscreated: false,
      billdata: {
        name: "广告牌二",
        message: "这个是第二个广告牌"
      }
    }
  ];

  points.forEach(point => {
    var canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;

    var svgString =
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
      '<foreignObject width="100%" height="100%">' +
      '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:16px; color: #FFF;">' +
      point.text +
      '<span style="color:white; text-shadow:0 0 2px blue;">' +
      "</span>" +
      "</div>" +
      "</foreignObject>" +
      "</svg>";

    var image = new Image();
    image.src = "data:image/svg+xml;base64," + window.btoa(svgString);

    //Need to wait for image to load before proceeding to draw
    image.onload = function () {
      canvas.getContext("2d").drawImage(image, 0, 0);

      dataSource.entities.add({
        id: point.id,
        position: Cesium.Cartesian3.fromDegrees(
          +point.lng,
          +point.lat,
          point.z || 0
        ),
        billboard: {
          image: canvas
        },
        description: "<p>This is a cupcake that can be modified.</p>"
      });
    };
  });

  $viewer.dataSources.add(dataSource);
}
export default createdynamicbillboard;
