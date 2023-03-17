var loadingBar = document.getElementById("loadbar"),
oldTime = (new Date).getTime();
function run() {
	var e = (new Date).getTime();
	3500 <= e - oldTime && (loadingBar && (loadingBar.className = ""), 3550 <= e - oldTime && (loadingBar && (loadingBar.className = "ins"), oldTime = e)),
	1 == Window.LOADING_FLAG && clearInterval(loadIdx)
}
function loaderOK() {
	$("#loadOverlay").hide(),
	$("#loadbar").removeClass("ins"),
	Window.LOADING_FLAG = !0
}
var loadIdx = setInterval(run, 100),
viewer;
function removeMask() {
	$("#mask").remove()
}
function initMap() {
	var t = haoutil.system.getRequest(),
	e = "config/config.json";
	t.config && (e = t.config),
	haoutil.loading.show(),
	qtum3d.createMap({
		id: "cesiumContainer",
		url: e + "?time=20190603",
		success: function(e, i) {
			setTimeout(removeMask, 3e3),
			loaderOK(),
			haoutil.loading.hide(),
			viewer = e;
			var a = !0;
			haoutil.isutil.isNotNull(t.widget) && (i.widget.widgetsAtStart.push({
				uri: t.widget,
				request: t
			}), a = !1);
			qtum3d.widget.init(e, i.widget);
			haoutil.isutil.isNotNull(t.x) && haoutil.isutil.isNotNull(t.y) && viewer.qtum.centerAt(t, {
				duration: 0,
				isWgs84: !0
			}),
			a && viewer.qtum.openFlyAnimation(),
			initWork(e)
		}
	})
}
function initUI() {
	haoutil.oneMsg("首次访问系统无缓存会略慢，请耐心等待！", "load3d_tip")
}
function initWork(e) {
	haoutil.oneMsg("如果未出现地球，是因为地形加载失败，请刷新重新加载！", "terrain_tip"),
	e.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK),
	e.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
	e.scene.screenSpaceCameraController._zoomFactor = 1.5,
	haoutil.system.isPCBroswer() || (e.targetFrameRate = 20, e.requestRenderMode = !0, e.scene.fog.enable = !1, e.scene.skyAtmosphere.show = !1, e.scene.fxaa = !1),
	0 <= window.navigator.userAgent.toLowerCase().indexOf("msie") && (e.targetFrameRate = 20, e.requestRenderMode = !0),
	e.scene.logarithmicDepthBuffer = !1,
	e.sceneModePicker && (e.sceneModePicker.viewModel.duration = 0);
	bindShowTilesParts()
}
function bindShowTilesParts() {
	new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas).setInputAction(function(e) {
		var i = viewer.scene.pick(e.position);
		if (i && Cesium.defined(i.primitive) && i.primitive._config && i.primitive._config.scenetree) {
			var a = "widgetsTS/tilesParts/widget.js";
			if (qtum3d.widget.isActivate(a)) if (qtum3d.widget.getClass(a).config.layerWork == i.primitive._config._layer) return;
			qtum3d.widget.activate({
				name: i.primitive._config.name + " 构件",
				uri: a,
				layerWork: i.primitive._config._layer,
				scenetree: i.primitive._config.scenetree,
				disableOhter: !1
			})
		}
	},
	Cesium.ScreenSpaceEventType.LEFT_CLICK)
}
function bindToLayerControl(e) {
	if (null == e._layer) {
		var i = e.visible;
		delete e.visible;
		var a = new qtum3d.layer.BaseLayer(e, viewer);
		a._visible = i,
		e._layer = a
	}
	var t = qtum3d.widget.getClass("widgets/manageLayers/widget.js");
	return t ? t.addOverlay(e) : viewer.qtum.config.operationallayers.push(e),
	e._layer
}
function unbindLayerControl(e) {
	var i = qtum3d.widget.getClass("widgets/manageLayers/widget.js");
	if (i) i.removeLayer(e);
	else for (var a = viewer.qtum.config.operationallayers,
	t = 0; t < a.length; t++) {
		if (a[t].name == e) {
			a.splice(t, 1);
			break
		}
	}
}
function activateWidget(e) {
	qtum3d.widget.activate(e)
}
function disableWidget(e) {
	qtum3d.widget.disable(e)
}
function activateFunByMenu(fun) {
	eval(fun)
}
