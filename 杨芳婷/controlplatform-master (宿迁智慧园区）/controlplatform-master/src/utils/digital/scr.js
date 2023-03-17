var viewer = new Cesium.Viewer('cesiumContainer', {
    requestRenderMode: true
});
var promise = Cesium.GeoJsonDataSource.load('/data/geojson/lineback_1.json');  //显示管线数据  直接加载json数据 比把json转化成czml在加载 快很多
promise.then(function (dataSource) {
    viewer.dataSources.add(dataSource);
    var entities = dataSource.entities.values;
    var colorHash = {};
    for (var o = 0; o < entities.length; o++) {
        var r = entities[o];
        r.nameID = o;   //给每条线添加一个编号，方便之后对线修改样式
        r.polyline.width = 10;  //添加默认样式
        (r.polyline.material = new Cesium.PolylineGlowMaterialProperty({
            glowPower: .1, //一个数字属性，指定发光强度，占总线宽的百分比。
            color: Cesium.Color.ORANGERED.withAlpha(.9)
        }), 10)

    }
    var temp = new Array();
    window.Hightlightline = function (nameid) {
        var exists = temp.indexOf(nameid);
        if (exists <= -1) {
            Highlight(nameid, 50, 50);
            temp.push(nameid);  // 添加线nameID到数组，
        }
        else  //已经是高亮状态了 再次点击修改为原始状态
        {
            Highlight(nameid, 10, 10);
            temp.splice(exists, 1);  //删除对应的nameID
        }
    }
    window.Highlight = function (nameid, width1, width2) {
        for (var o = 0; o < entities.length; o++) {
            var m = entities[o];
            if (nameid == o) {
                m.polyline.width = width1;
                (m.polyline.material = new Cesium.PolylineGlowMaterialProperty({
                    glowPower: .1, //一个数字属性，指定发光强度，占总线宽的百分比。
                    color: Cesium.Color.ORANGERED.withAlpha(.9)
                }), width2)
            }
        }
    }
});
viewer.flyTo(promise);
viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
    var pickedFeature = viewer.scene.pick(movement.position);
    if (typeof (pickedFeature) != "undefined")   //鼠标是否点到线上
    {
        var name_id = pickedFeature.id.nameID;  //获取每条线的nameID
        Hightlightline(name_id);
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
