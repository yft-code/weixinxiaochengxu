import adddiv from "./createdivpoint";

function drawPointFN(window, drawControl, arrPoint, itemobj) {
  window.$viewer.qtum.draw.deleteAll();
  drawControl.startDraw({
    type: "point",
    style: {
      pixelSize: 12,
      color: "#009BFF",
      outlineColor: "#0D829A",
      outlineWidth: 5
    },
    success: function (i) {
      let contentName = i._id;

      //拿到经纬度
      var e = i.position.getValue();

      var res = adddiv(contentName, e, itemobj, arrPoint, drawControl);
      res.ientity = i;
      //保存打点信息
      arrPoint.push(res);
    }
  });
}
export default drawPointFN;
