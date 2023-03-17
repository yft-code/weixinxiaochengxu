<template>
  <div style="position:relative">
     <Lz-Map @cesiumClick="cesiumClick" @startView="startView"></Lz-Map>
     <Lz-Billboard  :billboard="billboard" :viewer="viewer"></Lz-Billboard>
     
     <div class="data">
        <div class="quickDetail">使用说明</div>
        <div class="quickDetail" style="margin-top: 10px;">创建一个名为html2base64.js文件,创建需要使用的方法,js代码如下</div>
        <!-- html2canvas -->
        <div class="hljs data container">
           <div><span class="keyQuick">import</span>
            html2canvas from
            <span class="stringQuick">"html2canvas"</span>
            ;</div>
           <div>async function toBase64ForDefaultValue(htmlID, color = null) {</div>
           <div><span class="vStyle">let</span>
           element = document.getElementById(htmlID);</div>
           <div><span class="vStyle">let</span>
             img = await html2canvas(element, {</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;dpi: 1000,</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;backgroundColor: color</div>
           <div>}).then(function (canvas) {</div>
           <div><span class="vStyle">let</span> image = canvas.toDataURL("png");</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;return image;</div>
           <div> });</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;return img;</div>
           <div>}</div>
           <div>
            <span class="algolia-highlight">export</span>
             default toBase64ForDefaultValue;</div>
        </div>

        <div class="quickDetail">创建一个名为hookChars.js文件,创建需要使用的方法,js代码如下</div>
         <div class="hljs data container">
            <div>//引入html2base64.js中定义的toBase64ForDefaultValue方法,引入路径根据实际项目决定</div>
           <div><span class="keyQuick">import</span> toBase64ForDefaultValue from './html2base64.js'</div>
           <div>   <span class="algolia-highlight">export</span> function addFeature(element,$viewer) {</div>
           <div><span class="vStyle">let</span> chart = {</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;id: element.id+'Tab',</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;chartType: element.id,</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;center: element.center,</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;width: element.width, // 广告牌宽度</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;height: element.height, // 广告牌高度</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;rotate: element.rotate, // 正北顺时针角度</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;type: "image",</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;show: element.show,</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;flyTo: true,</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;viewer: $viewer,</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;followCamera: false,</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;isTrans: true, //背景透明</div>
           <div> };</div>
           <div>toBase64ForDefaultValue(chart.chartType).then((res1) => {</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;chart.content = res1;</div>
           <div>&nbsp;&nbsp;&nbsp;&nbsp;console.log(new Cesium.CesiumWallBillboard(chart))</div>
           <div>});</div>
           <div>return chart</div>
           <div>}</div>
        </div>
     </div>
    <div class="code">运行代码</div>
    <div>
      <div class="hljs">
        <div>
          <span class="hljs-tag"
            >&lt;<span class="hljs-attrs">div</span>&gt;
            <div class="hljs-attr">&lt;<span class="hljs-attrs"
              >div</span> 
              <span class="hljs-attr"> id=<span class="hljs-string"
              >"cesiumContainer"</span></span>&gt;
              &lt;/div&gt;
              </div>
              </span
          >  <span class="hljs-tag"
            >
            <!-- 广告牌代码 -->
            <div>
             <div>&nbsp;&nbsp;&lt;div  class=
              <span class="hljs-string">"workAreaTable"</span>
               :id= <span class="hljs-string">"billboard.id"</span>&gt;</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class= <span class="hljs-string">"equipmentDetails"</span>&gt;</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class= <span class="hljs-string">"equipmentHeader"</span>&gt;</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;img</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;class= <span class="hljs-string">"icoStyle"</span></div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;src= <span class="hljs-string">"@/assets/cesium/billboard/ico.png"</span></div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alt=""</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/></div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class= <span class="hljs-string">"equipmentHeaderTitle"</span>&gt;<span class="data">{{billboardName}}</span>&lt;/span></div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class= <span class="hljs-string">"clear"</span>/&gt;&lt;/span></div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class= <span class="hljs-string">"workAreaHead"</span>&gt;</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class= <span class="hljs-string">"workAreaHeadLi"</span> v-for= <span class="hljs-string">"(item,index) in headerList"</span> :key= <span class="hljs-string">"index"</span>
              :style= <span class="hljs-string">"{width:item.width}"</span>></div>
             <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{itemTitle}}</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class= <span class="hljs-string">"clear"</span>&gt;&lt;/div></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class= <span class="hljs-string">"workAreaBody"</span>&gt;</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class= <span class="hljs-string">"workAreaBodyLi"</span> v-for= <span class="hljs-string">"(item,index) in billboard.data" </span>
              :key= <span class="hljs-string">"index"</span>></div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class= <span class="hljs-string">"workAreaDetail"</span> style= <span class="hljs-string">"width:20%"</span>></div>
             <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{itemTime}}</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div></div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class= <span class="hljs-string">"workAreaDetail"</span> style= <span class="hljs-string">"width:10%"</span>></div>
             <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{itemPeople}}</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class= <span class="hljs-string">"workAreaDetail"</span> style= <span class="hljs-string">"width:15%"</span>></div>
             <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{itemArea}}</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class= <span class="hljs-string">"workAreaDetail"</span> style= <span class="hljs-string">"width:10%"</span>></div>
             <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{itemFloor}}</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class= <span class="hljs-string">"workAreaDetail"</span> style= <span class="hljs-string">"width:25%"</span>></div>
             <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{itemFrequency}}</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class= <span class="hljs-string">"workAreaDetail"</span> style= <span class="hljs-string">"width:20%;color:#0BE6D4"</span>></div>
             <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{itemComplete}}</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div></div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class= <span class="hljs-string">"clear"</span>&gt;&lt;/div></div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div></div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div></div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div> class= <span class="hljs-string">"workAreaImg"</span>></div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;img src= <span class="hljs-string">"@/assets/cesium/billboard/pre.headerListpng"</span> class= <span class="hljs-string">"preImg"</span>/></div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;img src= <span class="hljs-string">"@/assets/cesium/billboard/next.png"></span>/</div>
             <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div></div>
             <div>&nbsp;&nbsp;&nbsp;&lt;/div></div>
               <div>&nbsp;&nbsp;&lt;/div></div>
             <!-- <div>&lt;/div></div> -->
             <!-- <div>&lt;/div></div> -->

            </div>
            <div class="hljs-name">&lt;/div&gt;</div></span>
        </div>
        <div class="hljs-tag">
          &lt;<span class="hljs-name">script</span>&gt;
        </div>

        <div>
            <div class="data">//引入hookChars.js中的addFeature方法,引入路径根据实际项目决定</div>
            <div class="hljs-tag"><span class="keyQuick">import</span>{addFeature} from './hookChars'</div>
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
                  billboard:
                  <div>{</div>
                    <div class="dataName">
                      <span>id:</span>
                  <span class="dataKey">"AreaBillboard1"</span>
                  <span class="data">,</span>
                    </div>
                    <div class="dataName">
                      <span>center:</span>
                      <span>{</span>
                      <div>&nbsp;&nbsp;
                        longitude:
                        <span class="dataKey">105.922338</span>
                        <span class="data">,</span>
                      </div>
                      <div>&nbsp;&nbsp;
                        latitude:
                        <span class="dataKey">27.964801</span>
                        <span class="data">,</span>
                      </div>
                      <div>&nbsp;&nbsp;
                        height:
                        <span class="dataKey">947.39</span>
                        <span>,</span>
                      </div>
                      <div>},</div>
                    </div>
                    <div class="dataName">
                      <span>show:</span>
                  <span class="dataKey">true</span>
                  <span class="data">,</span>
                    </div>
                    <div class="dataName">
                      <span>anchor:</span>
                      <span>[</span>
                  <span class="dataKey">0,0</span>
                  <span>]</span>
                  <span class="data">,</span>
                    </div>

                    <div class="dataName">
                      <span>name:</span>
                  <span class="dataKey">"厂区一"</span>
                  <span class="data">,</span>
                    </div>
                    <div class="dataName">
                      <span>width:</span>
                  <span class="dataKey">650</span>
                  <span class="data">,</span>
                    </div>
                    <div class="dataName">
                      <span>height:</span>
                  <span class="dataKey">362</span>
                  <span class="data">,</span>
                    </div>
                    <div class="dataName">
                      <span>rotate:</span>
                  <span class="dataKey">50</span>
                  <span class="data">,</span>
                    </div>
                    <div class="dataName">
                      <div>data:[</div>
                      <div class="dataName">{</div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        time:
                        <span class="dataKey">"2022.03.01"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        people:
                        <span class="dataKey">"张三"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                        <div class="dataName">
                        <span>&nbsp;&nbsp;
                        area:
                        <span class="dataKey">"园区大楼"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                         <div class="dataName">
                        <span>&nbsp;&nbsp;
                        floor:
                        <span class="dataKey">"一层"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                         <div class="dataName">
                        <span>&nbsp;&nbsp;
                        frequency:
                        <span class="dataKey">"1"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        complete:
                        <span class="dataKey">"已完成"</span>
                        <span class="data">,</span>
                      </span>
                      <div>},</div>
                      </div>
                         <div class="dataName">{</div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        time:
                        <span class="dataKey">"2022.03.01"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        people:
                        <span class="dataKey">"张三"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                        <div class="dataName">
                        <span>&nbsp;&nbsp;
                        area:
                        <span class="dataKey">"园区大楼"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                         <div class="dataName">
                        <span>&nbsp;&nbsp;
                        floor:
                        <span class="dataKey">"一层"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                         <div class="dataName">
                        <span>&nbsp;&nbsp;
                        frequency:
                        <span class="dataKey">"1"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        complete:
                        <span class="dataKey">"已完成"</span>
                        <span class="data">,</span>
                      </span>
                      <div>},</div>
                      </div>
                         <div class="dataName">{</div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        time:
                        <span class="dataKey">"2022.03.01"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        people:
                        <span class="dataKey">"张三"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                        <div class="dataName">
                        <span>&nbsp;&nbsp;
                        area:
                        <span class="dataKey">"园区大楼"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                         <div class="dataName">
                        <span>&nbsp;&nbsp;
                        floor:
                        <span class="dataKey">"一层"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                         <div class="dataName">
                        <span>&nbsp;&nbsp;
                        frequency:
                        <span class="dataKey">"1"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        complete:
                        <span class="dataKey">"已完成"</span>
                        <span class="data">,</span>
                      </span>
                      <div>},</div>
                      </div>
                         <div class="dataName">{</div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        time:
                        <span class="dataKey">"2022.03.01"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        people:
                        <span class="dataKey">"张三"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                        <div class="dataName">
                        <span>&nbsp;&nbsp;
                        area:
                        <span class="dataKey">"园区大楼"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                         <div class="dataName">
                        <span>&nbsp;&nbsp;
                        floor:
                        <span class="dataKey">"一层"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                         <div class="dataName">
                        <span>&nbsp;&nbsp;
                        frequency:
                        <span class="dataKey">"1"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        complete:
                        <span class="dataKey">"已完成"</span>
                        <span class="data">,</span>
                      </span>
                      <div>},</div>
                      </div>
                         <div class="dataName">{</div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        time:
                        <span class="dataKey">"2022.03.01"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        people:
                        <span class="dataKey">"张三"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                        <div class="dataName">
                        <span>&nbsp;&nbsp;
                        area:
                        <span class="dataKey">"园区大楼"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                         <div class="dataName">
                        <span>&nbsp;&nbsp;
                        floor:
                        <span class="dataKey">"一层"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                         <div class="dataName">
                        <span>&nbsp;&nbsp;
                        frequency:
                        <span class="dataKey">"1"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        complete:
                        <span class="dataKey">"已完成"</span>
                        <span class="data">,</span>
                      </span>
                      <div>},</div>
                      </div>
                    
                       
                     
                      
                    </div>
                    <div class="dataName">&nbsp;],</div>
                
                    
                   
                    <!-- <div class="dataName">
                      <span>anchor:</span>
                      <span>[</span>
                  <span class="dataKey">0,0</span>
                  <span>]</span>
                  <span class="data">,</span>
                    </div> -->
                  
                    
                    <div class="dataName">
                    
                    
                    </div>
                  
             
                </div>
                <div>},</div>
                <div>
                  headerList:[
                    <div class="dataName">
                      <!-- <div>[</div> -->
                      <div class="dataName">{</div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        title:
                        <span class="dataKey">'时间'</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                       width:
                        <span class="dataKey">'20%'</span>
                        <span class="data">,</span>
                      </span>
                       <div>},</div>
                      </div>
                       
                         <div class="dataName">{</div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        title:
                        <span class="dataKey">'人员'</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        width:
                        <span class="dataKey">"10%"</span>
                        <span class="data">,</span>
                      </span>
                        <div>},</div>
                      </div>
                         <div class="dataName">{</div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                         title:
                        <span class="dataKey">'区域'</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        width:
                        <span class="dataKey">'15%'</span>
                        <span class="data">,</span>
                      </span>
                      <div>},</div>
                      </div>
                         <div class="dataName">{</div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        title:
                        <span class="dataKey">'楼层'</span>
                        <span class="data">,</span>
                      </span>
                
                      </div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        width:
                        <span class="dataKey">'10%'</span>
                        <span class="data">,</span>
                      </span>
                              <div>},</div>
                      </div>
                         <div class="dataName">{</div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        title:
                        <span class="dataKey">'保洁次数/天'</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>&nbsp;&nbsp;
                        width:
                        <span class="dataKey">'25%'</span>
                        <span class="data">,</span>
                      </span>
                      <div>}</div>
                      </div>  
                    </div>
                    <div class="dataName">&nbsp;],</div>
                </div>
           </div>
          &nbsp;&nbsp;&nbsp;&nbsp; <span class="data">}</span><br />&nbsp;&nbsp;
          <span class="data">},</span>
        <br />
          <div class="data">
      <div class="data">&nbsp;&nbsp;mounted(){</div>
        <div class="methodBody">
         <div class="data">
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-tag">this</span>.Mineinit();
         </div>
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
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;Mineinit() {</span
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
                  "static/common/config/ksconfig.json"
            </div>
             <div class="data">
                   );
             </div>
              <div class="data">
                  <span class="vStyle">let </span>map = qtum3d.createMap({
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
                    &nbsp;&nbsp;&nbsp;&nbsp; viewer.scene.requestRenderMode = true;
                   </div>
                  <div class="data">
                    &nbsp;&nbsp;&nbsp;&nbsp;window.$viewer = viewer;
                  </div>
                  
                    <!-- <div class="data">
                    &nbsp;&nbsp;&nbsp;&nbsp;viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider(
                    </div> -->
                     <!-- <div class="data">
                          {}
                     </div> -->
                      <!-- <div class="data">
                          );
                      </div> -->
                       <div class="data">
                         $("#location_mars_jwd").hide();
                       </div>
                        <div class="data">
                                <span class="hljs-tag">this</span>.flyTo({
                        </div>
                         <div class="data">
                             &nbsp;&nbsp;&nbsp;&nbsp;y: 27.964285,
                         </div>
                          <div class="data">
                               &nbsp;&nbsp;&nbsp;&nbsp;x: 105.91934,</div> 
                               <div class="data">
                                  &nbsp;&nbsp;&nbsp;&nbsp;z: 986.99,
                               </div>
                           <div class="data">
                            &nbsp;&nbsp;&nbsp;&nbsp;heading: 82.3,
                           </div>
                            <div class="data">
                                     &nbsp;&nbsp;&nbsp;&nbsp;pitch:-18,
                            </div>
                             <div class="data">
                                  &nbsp;&nbsp;&nbsp;&nbsp;roll:0.5,
                             </div>
                              <div class="data">
                                  });
                              </div>
                               <!-- <div class="data">
                                 (primitives = new Cesium.PrimitiveCollection()),
                              </div> -->

                                <!-- <div class="data">
                                 viewer.scene.primitives.add(primitives);
                              </div> -->

                                 <div class="data">
                                     <span class="vStyle">let</span> _that = this;
                                 </div>       

                                <div class="data">
                                 <span class="vStyle">let</span> dataSource = new Cesium.CustomDataSource();
                              </div>

                                <div class="data">
                                 $viewer.dataSources.add(dataSource);
                              </div>

                                <div class="data">
                                 <span class="hljs-tag">this</span>.drawControl = new qtum3d.Draw(window.$viewer, {}).on(
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
                                     window.drawControl = <span class="hljs-tag">this</span>.drawControl;
                                 </div>
                                <div class="data"> <span class="vStyle">let</span> utc = Cesium.JulianDate.fromDate(new Date("2019/10/04 16:00:00"));</div>
                <div class="data">viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(</div>
                <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;utc,</div>
                <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;9,</div>
                <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;new Cesium.JulianDate()</div>
                <div class="data">);</div>
                                 <div class="data">
                                    // 加载模型代码
                                 </div>
                                 <div class="data">
                                    <span class="vStyle">let</span> layerWork = qtum3d.layer.createLayer(
                                 </div>
                                 <div class="data">
                                  {
                                 </div>
                                 <div class="data">
                                      &nbsp;&nbsp;&nbsp;&nbsp; type: "3dtiles",
                                 </div>
                                  <div class="data">
                                      &nbsp;&nbsp;&nbsp;&nbsp; name: "矿山",
                                 </div>
                                  <div class="data">
                                      &nbsp;&nbsp;&nbsp;&nbsp;url:"http://10.22.90.2:8081/ai-daemon-download/model/luzhou/Scene/tileset.json",
                                 </div>
                                 <div class="data">
                                      &nbsp;&nbsp;&nbsp;&nbsp;maximumScreenSpaceError: 1,
                                 </div>
                                 <div class="data">
                                      &nbsp;&nbsp;&nbsp;&nbsp;offset: {
                                 </div>
                                 <div class="data">
                                      &nbsp;&nbsp;&nbsp;&nbsp;z: 75,
                                 </div>
                                 <div class="data">
                                      &nbsp;&nbsp;&nbsp;&nbsp;},
                                 </div>
                                 <div class="data">
                                      &nbsp;&nbsp;&nbsp;&nbsp;visible: !0,
                                 </div>
                                 <div class="data">
                                      &nbsp;&nbsp;&nbsp;&nbsp;},
                                 </div>
                                 <div class="data">
                                      &nbsp;&nbsp;&nbsp;&nbsp;viewer
                                 </div>
                                 <div class="data">
                                      &nbsp;&nbsp;&nbsp;&nbsp;);
                                 </div>
                                 <div class="data">
                                     viewer.scene.requestRenderMode = true;
                                 </div>
                                 <div class="data">
                                      viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40000;
                                 </div>
                                  <div class="data">
                                       viewer.scene.globe.depthTestAgainstTerrain = !0;
                                 </div>
                                  <div class="data">
                                       viewer.scene.globe.depthTestAgainstTerrain = false;
                                 </div>
                   <div class="data">
                      <span class="hljs-tag">this</span>.viewer = $viewer;
                   </div>
                   <div class="data">
                     addFeature(<span class="hljs-tag">this</span>.billboard,<span class="hljs-tag">this</span>.viewer);
                </div>
          </div>
             <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},</div>
             <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;})</div>
             <div class="data"> &nbsp;&nbsp;&nbsp;}</div>
             <div class="data">&nbsp;&nbsp;}</div>
            <span class="data">}</span><br/>
          <!-- <span class="data">}</span> -->
         </div>
        <div class="hljs-tag">
          &lt;/<span class="hljs-name">script</span>&gt;
        </div>
        <div>
            <div class="data">
                <div class="hljs-attrs">&lt;style></div>
                <div>.workAreaTable {</div>
                <div  style="margin-left:10px">
                    <div>  width: 464px;</div>
                <div>  height: 245px;</div>
                <div>  position: absolute;</div>
                <div>  pointer-events:all;</div>
                <div>  top:0;</div>
                <div>  left:-5000px;</div>
                <div>  z-index: 9999;</div>
                </div>
                
                <div>}</div>
                <div>.equipmentDetails {</div>
                <div style="margin-left:10px">
<div>  width: 464px;</div>
                <div>  height: 256px;</div>
                <div>  background: url("~@/assets/cesium/billboard/bg.png") no-repeat;</div>
                <div>  background-size: 100% 100%;</div>
                <div>  box-sizing: border-box;</div>
                <div>  padding: 12px;</div>
                <div>  position: relative;</div>
                </div>
                
                <div>}</div>
                <div>.equipmentHeader {</div>
                <div style="margin-left:10px">
  <div>  height: 20px;</div>
                <div>  margin-bottom:8px;</div>
                </div>
              
                <div>}</div>
                <div>.icoStyle {</div>
                <div style="margin-left:10px">
<div>  width: 16px;</div>
                <div>  height: 16px;</div>
                <div>  float:left;</div>
                <div>  margin-top:-1px;</div>
                </div>
                
                
                <div>}</div>
                <div>.equipmentHeaderTitle {</div>
                <div style="margin-left:10px">
  <div>  margin-left:4px;</div>
                <div>  color: #25bcff;</div>
                <div>  float:left;</div>
                <div>  font-size: 14px;</div>
                <div>  font-weight: 500;</div>
                </div>
              
                <div>}</div>
                <div>.clear{</div>
                <div style="margin-left:10px">
 <div>  clear:both;</div>
                </div>
               
                <div>}</div>
                <div>.workAreaHead{</div>
                <div style="margin-left:10px">
<div>  background: rgba(255,255,255,0.2)</div>
                <div>  font-weight: 400;</div>
                <div>  color: rgb(180,180,180);</div>
                <div>  font-size: 14px;</div>
                <div>  padding:0 12px;</div>
                </div>
                
                <div>}</div>
                <div>.workAreaHeadLi{</div>
                <div style="margin-left:10px">
 <div>  float:left;</div>
                <div>  line-height: 24px;</div>
                </div>
               
                <div>}</div>
                <div>.workAreaBodyLi{</div>
                <div style="margin-left:10px">
 <div>  background: url("~@/assets/cesium/billboard/areaTable.png") no-repeat;</div>
                <div>  height:28px;</div>
                <div>  padding:6px 12px;</div>
                </div>
               
                <div>}</div>
                <div>.workAreaDetail{</div>
                <div style="margin-left:10px">
 <div>  font-family: HelveticaNeue;</div>
                <div>  color: #FFFFFF;</div>
                <div>  font-size: 14px;</div>
                <div>  float:left;</div>
                </div>
               
                <div>}</div>
                <div>.workAreaImg{</div>
                <div style="margin-left:10px">
  <div>  margin-top:8px</div>
                <div>  text-align: right;</div>
                <div>}</div>
                </div>
              
                <div>.preImg{</div>
                <div style="margin-left:10px">
 <div>  margin-right:8px;</div>
                <div>  cursor: pointer;</div>
                </div>
               
                <div>}</div>
                <div class="hljs-attrs">&lt;/style></div>
               
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
    itemTime:'{{item.time}}',
    itemPeople:'{{item.people}}',
    itemArea:'{{item.area}}',
    itemFloor:'{{item.floor}}',
    itemFrequency:'{{item.frequency}}',
    itemComplete:'{{item.complete}}',
    itemTitle:'{{item.title}}',
    billboardName:'{{billboard.name}}',
      viewer:{},
      billboard:
        {
          id: "AreaBillboard1", //广告牌的id
          center: {
            longitude: 105.922338,
            latitude: 27.964801,
            height: 947.39,
          },
          show: true,
          name: "厂区一",
          anchor: [0, 0],
          width: 650,
          height: 362,
          rotate: 50,
          data: [
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
            {
              time: "2022.03.01",
              people: "张三",
              area: "园区大楼",
              floor: "一层",
              frequency: "1",
              complete: "已完成",
            },
          ],
        }
       
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
.algolia-highlight {
    color: #409eff;
    font-weight: 700;
}
.stringQuick {
    color: #756bb1;
}
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
  margin-top: 30px;
    font-size: 14px;
    color: #5e6d82;
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
.khtree {
  margin-left: 38px;
}
.nametree {
  margin-left: 48px;
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
