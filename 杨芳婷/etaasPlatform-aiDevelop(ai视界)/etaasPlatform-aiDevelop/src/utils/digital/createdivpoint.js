// 添加一个div
function adddiv(idname, position, itemobj, arrPoint, drawControl) {
  var divitem = {
    id: idname,
    position: position,
    data: itemobj,
    changedivpositon: null
  };
  var mainpage = document.getElementsByClassName("main-page")[0];
  var divpoint = document.createElement("div");
  divpoint.className = "divpoint";
  divpoint.id = idname;
  divpoint.style.position = "absolute";
  divpoint.style.top = "0";
  divpoint.style.left = "0";
  divpoint.style.pointerEvents = "none";
  divpoint.style.visibility = "hidden";

  divpoint.style.width = "auto";
  divpoint.innerHTML = `<div class="closeitem" style="color:white;font-size:1rem;float:right;pointer-events:all;cursor:pointer;">关闭</div>`;
  var newitem = document.getElementById(itemobj.id);
  newitem.style.display = "block";
  divpoint.appendChild(newitem);
  //获取生成盒子高度
  setTimeout(() => {
    var offsethight = divpoint.offsetHeight;
    hooktoglobale(
      divpoint,
      position,
      [-150, -offsethight],
      true,
      arrPoint,
      idname
    );
    var closeitem = document
      .getElementById(idname)
      .getElementsByClassName("closeitem")[0];
    closeitem.addEventListener(
      "click",
      function (e) {
        closepointer(e, arrPoint, drawControl);
      },
      false
    );
  }, 20);

  mainpage.appendChild(divpoint);
  $viewer.scene.requestRender();
  return divitem;
}
//将div挂载到地球上
function hooktoglobale(
  divpoint,
  position,
  offset,
  hideOnBehindGlobe,
  arrPoint,
  idname
) {
  arrPoint.forEach((item, index) => {
    if (item.id == idname) {
      item.changedivpositon = changedivpositon;
    }
  });
  const scene = $viewer.scene,
    camera = $viewer.camera;
  const cartesian2 = new Cesium.Cartesian2();
  // var fn = cartestocavs.bind(null,[cartesian2,scene,camera,divpoint, position, offset, hideOnBehindGlobe]);
  scene.preRender.addEventListener(changedivpositon);
  function changedivpositon() {
    const canvasPosition = scene.cartesianToCanvasCoordinates(
      position,
      cartesian2
    ); // 笛卡尔坐标到画布坐标
    if (canvasPosition) {
      setCss(divpoint, "left", parseInt(canvasPosition.x + offset[0]) + "px");
      setCss(divpoint, "top", parseInt(canvasPosition.y + offset[1]) + "px");
      setCss(divpoint, "visibility", "visible");

      // 是否在地球背面隐藏
      if (hideOnBehindGlobe) {
        const cameraPosition = camera.position;
        let height = scene.globe.ellipsoid.cartesianToCartographic(
          cameraPosition
        ).height;
        height += scene.globe.ellipsoid.maximumRadius;
        if (!(Cartesian3.distance(cameraPosition, position) > height)) {
          setCss(divpoint, "display", "flex");
        } else {
          setCss(divpoint, "display", "none");
        }
      }
    }
  }
}
// 设置css值属性
function setCss(srcNodeRef, property, value) {
  if (srcNodeRef) {
    if (srcNodeRef instanceof Array && srcNodeRef.length > 0) {
      for (let i = 0; i < srcNodeRef.length; i++) {
        srcNodeRef[i].style.setProperty(property, value);
      }
    } else if (typeof srcNodeRef === "string") {
      if (
        srcNodeRef.indexOf("#") < 0 &&
        srcNodeRef.indexOf(".") < 0 &&
        srcNodeRef.indexOf(" ") < 0
      ) {
        const element = document.getElementById(srcNodeRef);
        element && element.style.setProperty(property, value);
      } else {
        const elements = document.querySelectorAll(srcNodeRef);
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.setProperty(property, value);
        }
      }
    } else if (srcNodeRef instanceof HTMLElement) {
      srcNodeRef.style.setProperty(property, value);
    }
  }
}
// 关闭单个气泡
function closepointer(e, arrPoint, drawControl) {
  var parendnode = e.target.parentNode;
  var parentid = parendnode.getAttribute("id");
  arrPoint.forEach((item, index) => {
    if (item.id === parentid) {
      let res = confirm("您是否要删除该表格");
      if (res) {
        parendnode.remove();
        arrPoint.splice(index, 1);
        index -= 1;
        drawControl.deleteEntity(item.ientity);
        $viewer.scene.preRender.removeEventListener(item.changedivpositon);
      }
    }
  });
}

export default adddiv;
