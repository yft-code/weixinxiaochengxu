<template>
  <div style="position:relative">
     <Lz-Map @cesiumClick="cesiumClick" @startView="startView"></Lz-Map>
     <Lz-Bubble :bubbleChart="bubbleChart" :viewer="viewer"></Lz-Bubble>
      <div class="data">
        <div class="quickDetail">使用说明</div>
        <div class="quickDetail" style="margin-top: 10px;">创建一个名为hookChars.js文件,创建需要使用的方法,js代码如下</div>
         <div class="hljs data container">
           <div>export function addpopUp(element,$viewer) {</div>
           <div><span class="vStyle">let </span> currenDom = document.getElementById(element.id);</div>
           <div><span class="vStyle">let </span> t = new qtum3d.DivPoint($viewer, {</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;id: element.id,</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;{{htmlTag}}</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;{{htmlId}}</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div></div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div>`,</div>
           <div>position: Cesium.Cartesian3.fromDegrees(</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;element.center.longitude,</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;element.center.latitude,</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;element.center.height</div>
           <div>),</div>
           <div>anchor: element.anchor,</div>
           <div> visibleDistanceMin: 2000,</div>
           <div>visibleDistanceMax: 5000,</div>
           <div> click: function (i) {</div>
           <div> },</div>
           <div>});</div>
           <div> });</div>
           <div><span class="vStyle">let </span> parentdom = document.getElementById(element.id + "popup");</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;setTimeout(() => {</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;parentdom.appendChild(currenDom);</div>
           <div>}, 50);</div>
           <div>}</div>
        </div>
     </div>
    <div class="code">运行代码</div>
    <div>
      <div class="hljs">
        <div>
          <span class="hljs-tag"
            >&lt;<span class="hljs-attrs">div</span>
              <span>&nbsp;&nbsp;style=</span><span>"</span><span class="hljs-string">position:relative</span><span>"</span>
            <div class="hljs-attr">&lt;<span class="hljs-attrs"
              >div</span>
              <span class="hljs-attr">id=<span class="hljs-string"
              >"cesiumContainer"</span></span>&gt;
              &lt;/div&gt;
              </div>
              </span
          >  <span class="hljs-tag"
            >
            <div>
                <span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>div</span>&nbsp;
                <span>class=
                  <span class="hljs-string">"bubbleStyle"</span>
                  </span>&nbsp;
                <span>v-for=
                  <span class="hljs-string">"item in bubbleChart"</span>
                  </span>&nbsp;
                <span>:key=
                  <span class="hljs-string">"item.id"</span>
                  </span>
                <span>&gt;</span>
            </div>

           <div>
                &nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>div</span>&nbsp;
                <span>class= <span class="hljs-string">"all"</span></span>&nbsp;
                <span>:id=<span class="hljs-string">"item.id"</span></span>
                <span>&gt;</span>
            </div>
             
             <div>
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>div</span>&nbsp;
                <span>class=
                  <span class="hljs-string">"equipmentDetails"</span></span>&nbsp;
                <span>v-if=  <span class="hljs-string">"item.show"</span></span>
                <span>&gt;</span>
            </div>
            
             <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>div</span>&nbsp;
                <span>class=
                  <span class="hljs-string">"equipmentHeader"</span>
                  </span>&nbsp;
                <span>&gt;</span>
            </div>

             <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>img</span>&nbsp;
                <span>class=<span class="hljs-string">"icoStyle"</span></span>&nbsp;
                  <span>src=<span class="hljs-string">"@/assets/cesium/bubble/ico.jpg"</span></span>&nbsp;
                   <span>/</span>
                <span>&gt;</span>
            </div>

             <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>span</span>&nbsp;
                <span>class=<span class="hljs-string">"equipmentHeaderTitle"</span></span>
                <span>&gt;</span>
                <span class="data">{{touch}}</span>
                <span>&lt;</span>
                <span>/</span>
                <span>span</span>
                <span>&gt;</span>
            </div>

             <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>img</span>&nbsp;
                <span>class=<span class="hljs-string">"closeImg"</span></span>&nbsp;
                <span>src=<span class="hljs-string">"@/assets/cesium/close.png"</span></span>&nbsp;
                <span> @click=<span class="hljs-string">"closeClick(item)"</span></span>
                <span>/</span>
                <span>&gt;</span>
            </div>
             
             <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>span</span>&nbsp;
                <span>class=<span class="hljs-string">"clear"</span></span>
                <span>&gt;</span>
                <span>&lt;</span>
                <span>/</span>
                <span>span</span>
                <span>&gt;</span>
            </div>
            
             <div>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>/div</span>
                <span>&gt;</span>
            </div>
            
             <div>
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>div</span>&nbsp;
                <span>class=<span class="hljs-string">"equipmentContent"</span></span>
                <span>&gt;</span>
            </div>

             <div>
             <div class="hljs-tag">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span>div</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;class=<span class="hljs-string">"equipmentItem"</span></div>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v-for=<span class="hljs-string">"(item2, index2) in item.data"</span></span>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:key=<span class="hljs-string">"index2"</span></div>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>
            </div>
            
             <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>span</span>&nbsp;
                <span>class=<span class="hljs-string">"left"</span></span>
                <span>&gt;</span>
                <span class="data">{{touch1}}</span>
                <span>&lt;</span>
                <span>/</span>
                <span>span</span>
                <span>></span>
            </div>

             <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>span</span>&nbsp;
                <span>class=<span class="hljs-string">"center"</span></span>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   :class="[
                </div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  item.detail === '未完成' ? 'equipmentDetail' : '',
                </div>
                 <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  item.detail === '已完成' ? 'equipmentDone' : '',
                </div>
                 <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  ]"
                </div>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>
                <span class="data">{{touch2}}</span>
                <span>&lt;</span>
                <span>/</span>
                <span>span</span>
                <span>></span>
            </div>
            <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>span</span>&nbsp;
                <span>class=<span class="hljs-string">"clear"</span></span>
                <span>&gt;</span>
                <span>&lt;</span>
                <span>/</span>
                <span>span</span>
                <span>&gt;</span>
            </div>
            
              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>/</span>
                <span>div</span>
                <span>&gt;</span>
            </div>

            <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>/</span>
                <span>div</span>
                <span>&gt;</span>
            </div>

            <div>
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>/</span>
                <span>div</span>
                <span>&gt;</span>
            </div>

            <div>
                &nbsp;&nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>/</span>
                <span>div</span>
                <span>&gt;</span>
            </div>

            <div>
               &nbsp;&nbsp;<span class="hljs-tag">&nbsp;&nbsp;&lt;</span>
                <span>/</span>
                <span>div</span>
                <span>&gt;</span>
            </div>

            

            <div class="hljs-name">&lt;/div&gt;</div></span>
        </div>
        <div class="hljs-tag">
          &lt;<span class="hljs-name">script</span>&gt;
        </div>
          <div>
            <div class="data">//引入hookChars.js中的addpopUp方法,引入路径根据实际项目决定</div>
            <div class="hljs-tag"><span class="keyQuick">import</span>{addpopUp} from './hookChars'</div>
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
                  viewer:<span>{}</span>
                  <span>,</span>
                </div>

                   <div>
                  type:<span>"</span>
                  <span class="dataKey">1</span>
                  <span>"</span>
                  <span>,</span>
                </div>

                <div>
                  bubbleChart:
                  <span>[</span>
                  <!-- === -->
                  <div>
                     <div>&nbsp;&nbsp;{</div>
                     <div class="dataName">
                      <span>id:</span>
                      <span class="dataKey">"healthbubble1"</span>
                      <span class="data">,</span>
                     </div>

                     <div class="dataName">
                      <span>center:{</span>
                      <div>
                        &nbsp;&nbsp;longitude:
                        <span class="dataKey">105.929078</span>
                        <span class="data">,</span>
                      </div>
                      <div>
                        &nbsp;&nbsp;latitude:
                        <span class="dataKey">27.966007</span>
                        <span class="data">,</span>
                      </div>
                      <div>
                        &nbsp;&nbsp;height:
                        <span class="dataKey">962.25 </span>
                        <div>},</div>
                      </div>
                    </div>

                    <div class="dataName">
                      <span>show:</span>
                  <span class="dataKey">true</span>
                  <span class="data">,</span>
                    </div>
                  
                    <div class="dataName">
                      <span>name:</span>
                  <span class="dataKey">"垃圾桶1"</span>
                  <span class="data">,</span>
                    </div>

                    <div class="dataName">
                      <div>data:[</div>
                      <div>&nbsp;&nbsp;{</div>
                      <div class="dataNameTitle">
                        <span>
                          name:
                        <span class="dataKey">"清理人员"</span>
                        <span class="data">,</span>
                      </span>
                      </div>

                      <div class="dataNameTitle">
                        <span>
                          detail:
                        <span class="dataKey">"张三"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div>&nbsp;&nbsp;},</div>
                      <div>&nbsp;&nbsp;{</div>
                        <div class="dataNameTitle">
                        <span>
                         name:
                        <span class="dataKey">"清理时间"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataNameTitle">
                        <span>
                          detail:
                        <span class="dataKey">"2020.06.24"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div>&nbsp;&nbsp;},</div>
                      <div>&nbsp;&nbsp;{</div>
                        <div class="dataNameTitle">
                        <span>
                          name:
                        <span class="dataKey">"是否完成"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataNameTitle">
                        <span>
                          detail:
                        <span class="dataKey">"未完成"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div>&nbsp;&nbsp;}</div>
                      <div>],</div>
                    </div>
                    <div>&nbsp;&nbsp;&nbsp;},</div>
                  </div>
                  <!-- ==== -->
                  <div>
                     <div>&nbsp;&nbsp;{</div>
                     <div class="dataName">
                      <span>id:</span>
                      <span class="dataKey">"healthbubble1"</span>
                      <span class="data">,</span>
                     </div>

                     <div class="dataName">
                      <span>center:{</span>
                      <div>
                        &nbsp;&nbsp;longitude:
                        <span class="dataKey">105.931338</span>
                        <span class="data">,</span>
                      </div>
                      <div>
                        &nbsp;&nbsp;latitude:
                        <span class="dataKey">27.963965</span>
                        <span class="data">,</span>
                      </div>
                      <div>
                        &nbsp;&nbsp;height:
                        <span class="dataKey">921.7</span>
                        <div>},</div>
                      </div>
                    </div>

                    <div class="dataName">
                      <span>show:</span>
                  <span class="dataKey">true</span>
                  <span class="data">,</span>
                    </div>
                  
                    <div class="dataName">
                      <span>name:</span>
                  <span class="dataKey">"垃圾桶1"</span>
                  <span class="data">,</span>
                    </div>

                    <div class="dataName">
                      <div>data:[</div>
                      <div>&nbsp;&nbsp;{</div>
                      <div class="dataNameTitle">
                        <span>
                          name:
                        <span class="dataKey">"清理人员"</span>
                        <span class="data">,</span>
                      </span>
                      </div>

                      <div class="dataNameTitle">
                        <span>
                          detail:
                        <span class="dataKey">"张三"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div>&nbsp;&nbsp;},</div>
                      <div>&nbsp;&nbsp;{</div>
                        <div class="dataNameTitle">
                        <span>
                         name:
                        <span class="dataKey">"清理时间"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataNameTitle">
                        <span>
                          detail:
                        <span class="dataKey">"2020.06.24"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div>&nbsp;&nbsp;},</div>
                      <div>&nbsp;&nbsp;{</div>
                        <div class="dataNameTitle">
                        <span>
                          name:
                        <span class="dataKey">"是否完成"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataNameTitle">
                        <span>
                          detail:
                        <span class="dataKey">"未完成"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div>&nbsp;&nbsp;}</div>
                      <div>],</div>
                    </div>
                    <div>&nbsp;&nbsp;&nbsp;},</div>
                  </div>
                </div>
           </div>
           <!-- <div class="data nametree">
                <div>
                  type:<span class="dataNum">1</span>,
                  <div>
                  </div>
                  <div>
                    
                  </div>
                </div>

                  <div>
                  viewer:<span class="dataNum">{}</span>,
                  <div>
                  </div>
                  <div>
                    
                  </div>
                </div>
           </div> -->
          &nbsp;&nbsp;&nbsp;&nbsp; <span class="data">}</span><br />&nbsp;&nbsp;
          <span class="data">},</span>
        <br />
        <div class="data">
      <div class="data">&nbsp;&nbsp;mounted(){</div>
        <div class="methodBody">
         <div class="data">
             <span class="hljs-tag">if</span>
             (<span class="hljs-tag">this</span>.type === '1' ){
         </div>
         <div class="data">
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">this</span>.Mineinit();
         </div>
         <div class="data">
             }else{
         </div>
         <div class="data">
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">this</span>.init();
         </div>
         <div class="data">
             }
         </div>
        </div>
      <div class="data">&nbsp;&nbsp;},</div>
        </div>
          <div class="data">&nbsp;&nbsp;methods: {</div>
               <!-- <div class="way">
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;addpopUp(element,$viewer) {</span> 
          </div>
          <div class="methodBody">
              <span class="data"><span class="vStyle">let </span>currenDom=document.getElementById(element.id);</span>
              <div class="data"><span class="vStyle">let </span> t = new qtum3d.DivPoint($viewer, {</div>
              <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;id: element.id,</div>
              <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;{{htmlTag}}</div>
              <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;{{htmlId}}</div>
              <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;{{divendTag}}</div>
              <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;{{divendTag}}`,</div>
              <div class="data">position: Cesium.Cartesian3.fromDegrees(</div>
              <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;element.center.longitude,</div>
              <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;element.center.latitude,</div>
              <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;element.center.height</div>
              <div class="data">),</div>
              <div class="data">anchor: element.anchor,</div>
              <div class="data">visibleDistanceMin: 2000,</div>
              <div class="data">visibleDistanceMax: 5000,</div>
              <div class="data">click: function (i) {</div>
              <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div>
              <div class="data">});</div>
                 <div class="data">let parentdom = document.getElementById(element.id + "popup");</div>
              <div class="data">setTimeout(() => {</div>
              <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;parentdom.appendChild(currenDom);</div>
              <div class="data">}, 50);</div>
              <div class="data">},</div>
              <div class="data">});</div>
          
          </div>
             <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div> -->
           <div class="way">
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;getBubble() {</span
            > 
          </div>
          <div class="methodBody">
              <div class="data">this.bubbleChart.forEach((item) => {</div>
              <div class="data">//调用生成气泡的方法</div>
              <div class="data">addpopUp(item,this.viewer);</div>
              <div class="data">});</div>
          </div>

           

          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div>

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
                                     <span class="vStyle">let</span> _that = this;
                                 </div>               
                <div class="data"> <span class="vStyle">let</span> utc = Cesium.JulianDate.fromDate(new Date("2019/10/04 21:00:00"));</div>
                <div class="data">viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(</div>
                <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;utc,</div>
                <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;9,</div>
                <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;new Cesium.JulianDate()</div>
                <div class="data">);</div>
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
                <div class="data">
                      <span class="hljs-tag">this</span>.getBubble()
                </div>
          </div>
             <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div>
          <!-- ============ -->

          <!-- ======= -->
           <div class="way">
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;Mineinit() {</span
            > 
          </div>
          <div class="methodBody">
            <div class="data">
                  <span class="vStyle">let</span> url = haoutil.system.getRequestByName(
            </div>
            <div class="data">
                 &nbsp;&nbsp;&nbsp;&nbsp;"config",
            </div>
            <div class="data">
                 &nbsp;&nbsp;&nbsp;&nbsp;"static/common/config/ksconfig.json"
            </div>
            <div class="data">
                );
            </div>
            <div class="data">
                 <span class="vStyle">let</span> map = qtum3d.createMap({
            </div>
            <div class="data">
                 &nbsp;&nbsp;&nbsp;&nbsp;id:"cesiumContainer",
            </div>
            <div class="data">
                &nbsp;&nbsp;&nbsp;&nbsp;url: url,
            </div>
            <div class="data">
                   &nbsp;&nbsp;&nbsp;&nbsp;success: async (viewer, i) => {
            </div>
            <div class="data">
                  &nbsp;&nbsp;&nbsp;&nbsp;viewer.scene.requestRenderMode = true;
            </div>
            <div class="data">
                  &nbsp;&nbsp;&nbsp;&nbsp;window.$viewer = viewer;
            </div>
            <div class="data">
                 &nbsp;&nbsp;&nbsp;&nbsp;$("#location_mars_jwd").hide();
            </div>
            <div class="data">
                     <span class="vStyle">let</span> center = {
            </div>
            <div class="data">
                    &nbsp;&nbsp;&nbsp;&nbsp;y: 27.964285,
            </div>
            <div class="data">
                    &nbsp;&nbsp;&nbsp;&nbsp;x: 105.91934,
            </div>
            <div class="data">
                &nbsp;&nbsp;&nbsp;&nbsp;z: 986.99,
            </div>
            <div class="data">
                &nbsp;&nbsp;&nbsp;&nbsp;heading: 82.3,
            </div>
            <div class="data">
                &nbsp;&nbsp;&nbsp;&nbsp;pitch: -18,
            </div>
            <div class="data">
                 &nbsp;&nbsp;&nbsp;&nbsp;roll: 0.5,
            </div>
            <div class="data">
                 };
            </div>
            <div class="data">
                <span class="hljs-tag">this</span>.flyTo(center);
            </div>
            <div class="data">
                    <span class="hljs-tag">this</span>.viewer = viewer;  
            </div>
            <div class="data">
                      <span class="hljs-tag">this</span>.getBubble()
                </div>
            <div class="data">
                    },
            </div>
              <div class="data">
                  }); 
            </div>
          </div>
            <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div>
          <!-- =========== -->
          <!-- <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div> -->
          &nbsp;&nbsp; <span class="data">},</span><br/>
          <span class="data">}</span>
        </div>
        
        <div class="hljs-tag">
          &lt;/<span class="hljs-name">script</span>&gt;
        </div>
        
         <div class="data" style="margin-top:5px">
          <div>
            <div class="hljs-attrs">
              <span>&lt;</span>
              <span>style</span>
              <span>&gt;</span>
            </div>
            <div>.bubbleStyle {</div>
            <div style="margin-left:10px">
            <div>position: absolute;</div>
            <div>width: 500px;</div>
            <div>top:0px;</div>
            <div>left:0px;</div>        
            </div>
            <div>}</div>
            <div>.equipmentItem {</div>
            <div style="margin-left:10px">
               <div>width: 88%;</div>
            <div>margin-top: 9px;</div>
            <div>height: 30px;</div>
            <div>line-height: 30px;</div>
            </div>
            <div>}</div>

            <div></div>
            <div>.left {</div>
            <div style="margin-left:10px">
               <div>float: left;</div>
            <div>color: #ffffff;</div>
            <div>font-size: 12px;</div>
            </div>
           
            <div>}</div>

            <div>.center {</div>
            <div style="margin-left:10px">
            <div>margin-left: 10px;</div>
            <div>float: left;</div>
            <div>color:  #25bcff;</div>
            <div>font-size: 12px;</div>
            <div>text-align: left;</div>
            </div>
           
            <div>}</div>

            <div>.all {</div>
            <div style="margin-left:10px">
            <div>width: 230px;</div>
            <div>height: 174px;</div>
            <div>pointer-events:all;</div>
            <div>position: absolute;</div>
            <div>left:0px;</div>
            </div>
            
            <div>}</div>

            <div>.equipmentDetails {</div>
            <div style="margin-left:10px">
            <div>width: 230px;</div>
            <div>height: 174px;</div>
            <div>background: url("~@/assets/cesium/bubble/bg.png") no-repeat;</div>
            <div>background-size: 100% 100%;</div>
            <div>box-sizing: border-box;</div>
            <div>padding: 12px 0px 0px 12px;</div>
            <div>position: relative;</div>  
            </div>
            
            <div>}</div>

            <div>.equipmentHeader {</div>
            <div style="margin-left:10px">
            <div>height: 20px;</div>
            <div>}</div>
            <div>.icoStyle {</div>
            <div>width: 16px;</div>
            <div>height: 16px;</div>
            <div>float:left;</div>
            <div>margin-top:-1px;</div>
            </div>
            
            <div>}</div>

            <div>.equipmentHeaderTitle {</div>
            <div style="margin-left:10px">
              <div>margin-left:4px;</div>
            <div>color: #25bcff;</div>
            <div>float:left;</div>
            <div>font-size: 14px;</div>
            </div>
            
            <div>}</div>

            <div>.clear{</div>
            <div style="margin-left:10px">
               <div>clear:both;</div>
            </div>
            <div>}</div>

            <div>.equipmentDetail{</div>
            <div style="margin-left:10px">
                 <div>color:#FF833A !important;</div>
            </div>
            <div>}</div>

            <div>.closeImg{</div>
            <div style="margin-left:10px">
            <div>position: absolute;</div>
            <div>width:12px;</div>
            <div>right:0px;</div>
            <div>top:0px;</div>
            <div>cursor: pointer;</div>
            </div>
            <div>}</div>

            <div>.equipmentDone{</div>
            <div style="margin-left:10px">
                <div>color:#0BE6D4 !important;</div>
            </div>
          
            <div>}</div>

           <div class="hljs-attrs">
              <span>&lt;</span>
              <span>/style</span>
              <span>&gt;</span>
            </div>
           
          </div>
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
      htmlId:'<div id="${element.id}popup">',
      htmlTag:'html: `<div class="msg" style="pointer-events: none">',
      divTag:'<div>',
      divendTag:'</div>',
      touch:'{{item.name}}',
      touch1:'{{item2.name}}',
      touch2:'{{item2.detail}}',
      viewer:{},
      bubbleChart:[
        {
          id: "healthbubble1",
          center: 
          {
            longitude: 105.931338,
            latitude: 27.966007,
            height: 962.25,
          },
          show: true,
          anchor: [0, 0],
          name: "垃圾桶1",
          data: [
            {
              name: "清理人员",
              detail: "张三",
            },
            {
              name: "清理时间",
              detail: "2020.06.24",
            },
            {
              name: "是否完成",
              detail: "未完成",
            },
          ],
        },
        {
          id: "healthbubble2",
          center: {
            longitude: 105.929078,
            latitude: 27.963965,
            height: 921.7,
          },
          show: true,
          anchor: [0, 0],
          name: "垃圾桶2",
          data: [
            {
              name: "清理人员",
              detail: "张三",
            },
            {
              name: "清理时间",
              detail: "2020.06.24",
            },
            {
              name: "是否完成",
              detail: "已完成",
            },
          ],
        }
      ]
    };
  },
  methods: {
    startView(viewer){
       this.viewer = viewer;
    },
    cesiumClick(event) {
      console.log(event);
    },
  },
};
</script>

<style scoped>
.methodBody{
    margin-left: 30px;
}
.keyQuick {
    color: #3182bd;
}
.vStyle{
   color: #409eff;
}
.container{
  margin-top:10px;
}
.quickDetail {
  margin-top: 20px;
    font-size: 14px;
    color: #5e6d82;
}
.way{
    margin-top: 10px;
}
.vStyle{
   color: #409eff;
}
.methodBody{
    margin-left: 30px;
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

.dataKey{
  color: #756bb1;
}

.dataName{
  margin-left: 20px;
}
.dataNameTitle{
  margin-left: 18px;
}
.khtree {
  margin-left: 38px;
}
.nametree {
  margin-left:60px;
}
.data{
  color:#000;
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
