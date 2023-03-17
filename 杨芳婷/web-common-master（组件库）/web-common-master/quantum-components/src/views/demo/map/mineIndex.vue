<!-- 安装指南 -->
<template>
  <div>
     <Lz-Map :type="type" @cesiumClick="cesiumClick"  @startView="startView" :center="center"></Lz-Map>
    <div class="code">运行代码</div>
    <div>
      <div class="hljs">
        <div>
          <span class="hljs-tag"
            >&lt;<span class="hljs-attrs">div</span>&gt;
            <div class="hljs-attr">&lt;<span class="hljs-attrs"
              >div</span>
              <span class="hljs-attr">id=<span class="hljs-string"
              >"cesiumContainer"</span></span>&gt;
              &lt;/div&gt;
              </div>
              </span
          >  <span class="hljs-tag"
            >
            <div class="hljs-name">&lt;/div&gt;</div></span>
        </div>
        <div class="hljs-tag">
          &lt;<span class="hljs-name">script</span>&gt;
        </div>
        <div class="javascript">
          <span class="hljs-keyword">export</span>&nbsp;
          <span class="hljs-keyword">default </span>
          <span class="data">{</span>
          <div class="data">&nbsp;&nbsp;data() {</div>
          <div>
            <span class="hljs-keyword">&nbsp;&nbsp;&nbsp;&nbsp;return </span>
            <span class="data">{</span>
          </div>
           <div class="data nametree">
                 <div>
                  viewer:{},
                  <div>
                  </div>
                  <div>
                  </div>
                </div>
           </div>
          &nbsp;&nbsp;&nbsp;&nbsp; <span class="data">}</span><br />&nbsp;&nbsp;
          <span class="data">},</span>
        <br />
        <div class="data">
      <div class="data">&nbsp;&nbsp;mounted(){</div>
        <div class="methodBody">
         <!-- <div class="data">
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">this</span>.Mineinit();
         </div> -->
         <!-- <div class="data">
             }else{
         </div> -->
         <div class="data">
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">this</span>.init();
         </div>
         <!-- <div class="data">
             }
         </div> -->
        </div>
      <div class="data">&nbsp;&nbsp;},</div>
        </div>
          <div class="data">&nbsp;&nbsp;methods: {</div>
          <div class="way">
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;flyTo(center) {</span
            > 
          </div>

          <div class="methodBody">
              <span class="data"><span class="vStyle">$viewer</span>.qtum.centerAt(center);</span>
          </div>

          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div>
          <div class="way">
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;addMapBox(viewer) {</span
            > 
          </div>
           <div class="methodBody">
              <div class="data">
                <span class="vStyle">let</span>
                 token =
        "pk.eyJ1IjoiYWRtaW44OTU2IiwiYSI6ImNrcG1jYTN2cjF6emMycHBpMm1hdGlmNjUifQ.1VfIq2__m-Y--yp4c37ZbA";</div>
        <div class="data">
             <span class="vStyle">let</span> layer = new Cesium.MapboxStyleImageryProvider({
        </div>
        <div class="data">
            &nbsp;&nbsp;&nbsp;&nbsp;<span>url</span>: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        </div>
        <div class="data">
             &nbsp;&nbsp;&nbsp;&nbsp;<span>styleId</span>:"dark-v10",
        </div>
        <div class="data">
            &nbsp;&nbsp;&nbsp;&nbsp;<span>accessToken</span>: token,
        </div>
         <div class="data">
           &nbsp;&nbsp;&nbsp;&nbsp;<span>scaleFactor</span>: true
        </div>
        <div class="data">
            });
        </div>
        <div class="data">
           viewer.imageryLayers.addImageryProvider(layer);
        </div>
          </div>
          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div>
           <!-- ======= -->
             <div class="way">
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;init() {</span
            > 
          </div>
          <div class="methodBody">
            <div class="data">
                      var primitives, a;
                </div>
                <div class="data">
                      <span class="vStyle">let</span> url = haoutil.system.getRequestByName(
                </div>
           <div class="data">
                  "config",
           </div>
            <div class="data">
                 "static/common/config/config.json"
            </div>
             <div class="data">
                   );
             </div>
              <div class="data">
                  <span class="hljs-tag">this</span>.map = qtum3d.createMap({
              </div>
               <div class="data">
                &nbsp;&nbsp;&nbsp;&nbsp;id: "cesiumContainer",
               </div>
                <div class="data">
                &nbsp;&nbsp;&nbsp;&nbsp;url: url,
                </div>
                 <div class="data">
                     &nbsp;&nbsp;&nbsp;&nbsp;success: async (viewer, i) => {
                 </div>
                  <div class="data">
                    &nbsp;&nbsp;&nbsp;&nbsp;window.$viewer = viewer;
                  </div>
                   <div class="data">
                    &nbsp;&nbsp;&nbsp;&nbsp;viewer.scene.globe.depthTestAgainstTerrain = false;
                   </div>
                    <div class="data">
                    &nbsp;&nbsp;&nbsp;&nbsp;viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider(
                    </div>
                     <div class="data">
                          {}
                     </div>
                      <div class="data">
                          );
                      </div>
                       <div class="data">
                         $("#location_mars_jwd").hide();
                       </div>
                        <div class="data">
                                <span class="hljs-tag">this</span>.flyTo({
                        </div>
                         <div class="data">
                             &nbsp;&nbsp;&nbsp;&nbsp;y: 22.277989,
                         </div>
                          <div class="data">
                               &nbsp;&nbsp;&nbsp;&nbsp;x: 114.223356,</div> 
                               <div class="data">
                                  &nbsp;&nbsp;&nbsp;&nbsp;z: 574.67,
                               </div>
                           <div class="data">
                            &nbsp;&nbsp;&nbsp;&nbsp;heading: 239.6,
                           </div>
                            <div class="data">
                                     &nbsp;&nbsp;&nbsp;&nbsp;pitch: -21.5,
                            </div>
                             <div class="data">
                                  &nbsp;&nbsp;&nbsp;&nbsp;roll: 358.9,
                             </div>
                              <div class="data">
                                  });
                              </div>
                               <div class="data">
                                 (primitives = new Cesium.PrimitiveCollection()),
                              </div>

                                <div class="data">
                                 viewer.scene.primitives.add(primitives);
                              </div>

                                 <div class="data">
                                     <span class="vStyle">let</span> _that = this;
                                 </div>       

                                <div class="data">
                                 let dataSource = new Cesium.CustomDataSource();
                              </div>

                                <div class="data">
                                 $viewer.dataSources.add(dataSource);
                              </div>

                                <div class="data">
                                 this.drawControl = new qtum3d.Draw(window.$viewer, {}).on(
                              </div>

                                <div class="data">
                                 qtum3d.draw.event.DrawCreated,
                              </div>
                                 <div class="data">
                                    function (o) {
                                 </div>

                                  <div class="data">
                                    &nbsp;&nbsp;&nbsp;&nbsp;_that.drawControl.setVisible(false);
                                 </div>
                                  <div class="data">
                                    &nbsp;&nbsp;&nbsp;&nbsp;_that.drawControl;
                                 </div>
                                 <!-- ?===== -->
                                 <div class="data">
                                  }
                                 </div>
                                 <div class="data">
                                      );
                                 </div>
                                 <div class="data">
                                     window.drawControl = this.drawControl;
                                 </div>
                                <div class="data"> <span class="vStyle">let</span> utc = Cesium.JulianDate.fromDate(new Date("2019/10/04 21:00:00"));</div>
                <div class="data">viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(</div>
                <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;utc,</div>
                <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;9,</div>
                <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;new Cesium.JulianDate()</div>
                <div class="data">);</div>
                                 <div class="data">
                                    // 加载模型代码
                                 </div>
                                 <div class="data">
                                    <span class="vStyle">let</span> factoryTileset = new Cesium.Cesium3DTileset({
                                 </div>
                                 <div class="data">
                                      &nbsp;&nbsp;&nbsp;&nbsp;url: '真实的模型地址',
                                 </div>
                                 <div class="data">
                                    });
                                 </div>
                                 <!-- <div class="data">
                                  this.myView = viewer;
                                 </div> -->
                                 <div class="data">
                                      <span class="vStyle">let</span> tmp = viewer.scene.primitives.add(factoryTileset);
                                 </div>
                                 <!-- <div class="data">
                                   this.myViews.push(tmp);
                                 </div> -->
                                  <div class="data">
                                    viewer.scene.primitives.add(factoryTileset);
                                 </div>
                                  <div class="data">
                                    viewer.zoomTo(factoryTileset);
                                 </div>
                                  <div class="data">
                                    <span class="vStyle">let</span> longitude = 114.209492,
                                 </div>
                                  <div class="data">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;latitude = 22.27216499,
                                 </div>
                                  <div class="data">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;height = 60;
                                 </div>
                                  <div class="data">
                                    <span class="vStyle">let</span> heading = -20;
                                 </div>
                                  <div class="data">
                                    factoryTileset.readyPromise.then(function (argument) {
                                 </div>
                                  <div class="data">
                                     <span class="vStyle">let</span> position = Cesium.Cartesian3.fromDegrees(
                                 </div>
                                 <div class="data">
                                    &nbsp;&nbsp;&nbsp;&nbsp;longitude,
                                 </div>
                                 <div class="data">
                                     &nbsp;&nbsp;&nbsp;&nbsp;latitude,
                                 </div>
                                 <div class="data">
                                    &nbsp;&nbsp;&nbsp;&nbsp;height
                                 </div>
                                 <!-- <div class="data">
                                    &nbsp;&nbsp;&nbsp;&nbsp;_that.drawControl;
                                 </div> -->
                                 <div class="data">
                                    );
                                 </div>
                                 <div class="data">
                                    <span class="vStyle">let</span> mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
                                 </div>
                                 <div class="data">
                                    <span class="vStyle">let</span> rotationX = Cesium.Matrix4.fromRotationTranslation(
                                 </div>
                                 <div class="data">
                                   &nbsp;&nbsp;&nbsp;&nbsp;Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(heading))
                                 </div>
                                 <div class="data">
                                     );
                                 </div>
                                 <div class="data">
                                    Cesium.Matrix4.multiply(mat, rotationX, mat);
                                 </div>
                                  <div class="data">
                                    <span class="vStyle">let</span> scale = Cesium.Matrix4.fromUniformScale(15);
                                 </div>
                                  <div class="data">
                                     Cesium.Matrix4.multiply(mat, scale, mat);
                                 </div>
                                  <div class="data">
                                     &nbsp;&nbsp;&nbsp;&nbsp;factoryTileset._root.transform = mat;
                                 </div>
                                  <div class="data">
                                     });
                                 </div>
                                  
                                 <!-- ================= -->
                                       
                
                <div class="data"> <span class="hljs-tag">this</span>.addMapBox(viewer);</div>
                <div class="data">
                  viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1;
                </div>
                   <div class="data">
                         viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40000;
                </div>
                <div class="data">},</div>
                   <div class="data">
                     }); 
                </div>
                   <div class="data">
                      <span class="hljs-tag">this</span>.viewer = $viewer;
                </div>
          </div>
             <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div>
         
          &nbsp;&nbsp;<span class="data">},</span><br/>
          <span class="data">}</span>
        </div>
        
        <div class="hljs-tag">
          &lt;/<span class="hljs-name">script</span>&gt;
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
        type:'2',
        viewer:{},
        center:{},
    };
  },
  methods: {
    cesiumClick(event) {
      console.log(event);
    },
    startView(view){
      console.log(view)
    }
  },
};
</script>

<style scoped>
.way{
    margin-top: 10px;
}
.vStyle{
   color: #409eff; 
}
.dataNum{
   color: #31a354; 
}
.dataName {
  margin-left: 20px;
}
.dataNameTitle {
  margin-left: 18px;
}
.componentTitle {
  margin-top: 32px;
  font-size: 24px;
  color: #333;
  line-height: 48px;
}
.npmTitle {
  margin-top: 54px;
  font-size: 18px;
  color: #1f2f3d;
}
.npmFirst {
  font-size: 12px;
  padding: 18px 24px;
  background-color: #fafafa;
  border: 1px solid #eaeefb;
  margin-bottom: 25px;
  border-radius: 4px;
  margin-top: 32px;
}
.hljs-tag {
  color: #3182bd;
}
.hljs {
  font-size: 14px;
  padding: 18px 24px;
  background-color: #fafafa;
}
.code {
  height: 48px;
  line-height: 48px;
}
.hljs-attr {
  color: #3182bd;
  margin-left: 8px;
}
.hljs-string{
  color: #756bb1;
}
.hljs-attrs {
  color: #3182bd;
}
.hljs-keyword {
  color: #3182bd;
}

.data{
  color:#000;
}
.methodBody{
    margin-left: 30px;
}
.khtree {
  margin-left: 38px;
}
.dataKey {
  color: #756bb1;
}
.nametree {
  margin-left: 48px;
}
.btree {
  margin-left: 34px;
}
.khtreesecond {
  margin-left: 58px;
}
.nametreesecond {
  margin-left: 68px;
}
.tableli {
  float: left;
  width: 20%;
  text-align: left;
  white-space: nowrap;
  color: #909399;
  font-weight: 400;
  font-size: 14px;
  line-height: 36px;
  border-bottom: 1px solid #909399;
}
.clear {
  clear: both;
}
.tablecontentli {
  color: #606266;
  float: left;
  width: 20%;
  text-align: left;
  white-space: nowrap;
  font-weight: 400;
  font-size: 13px;
  line-height: 36px;
}
.codeTitle {
  font-size: 18px;
  font-weight: 600;
  line-height: 48px;
  margin-top: 16px;
}
.eventli {
  float: left;
  width: calc(100% / 3);
  text-align: left;
  white-space: nowrap;
  color: #909399;
  font-weight: 400;
  font-size: 14px;
  line-height: 36px;
  border-bottom: 1px solid #909399;
}
.eventcontentli {
  color: #606266;
  float: left;
  width: calc(100% / 3);
  text-align: left;
  white-space: nowrap;
  font-weight: 400;
  font-size: 13px;
  line-height: 36px;
}
</style>
