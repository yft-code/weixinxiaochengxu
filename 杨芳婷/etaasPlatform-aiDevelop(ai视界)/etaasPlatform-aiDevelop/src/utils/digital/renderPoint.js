import adddiv from "./createdivpoint"
function renPointFN(element, drawControl, arrPoint) {
  let data = element.componentdata;
  let position = element.position;
  let id = element._id;
  let propose = element.properties.style;
  var entityitem = drawControl.dataSource.entities.add({
    id: id,
    position: position,
    point: {
      color: Cesium.Color.fromCssColorString(propose.color),
      pixelSize: propose.pixelSize,
      outlineColor: Cesium.Color.fromCssColorString(propose.outlineColor),
      outlineWidth: propose.outlineWidth,
    }
  })
  //调用画div盒子的方法
  var res = adddiv(id, position, data, arrPoint, drawControl)
  res.ientity = entityitem;
  arrPoint.push(res);
}

export default renPointFN