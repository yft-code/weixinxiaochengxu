<template>
  <div style="position:relative">
     <Lz-Map @cesiumClick="cesiumClick" @startView="startView" @startDasource="startDasource"></Lz-Map>
     <Lz-Camera :cameraData="cameraData" :viewer="viewer" :dataSource="dataSource"></Lz-Camera>
    <div class="code">运行代码</div>
    <div>
      <div class="hljs">
        <div>
          <span class="hljs-tag"
            >&lt;<span class="hljs-attrs">Lz-Map</span>
            <span class="hljs-attr">@cesiumClick=<span class="hljs-string"
              >"cesiumClick"  &nbsp;</span>
              </span>
               <span class="hljs-attr">@startView=<span class="hljs-string"
              >"startView"  &nbsp;</span>
              </span>
               <span class="hljs-attr">@startDasource=<span class="hljs-string"
              >"startDasource"  &nbsp;</span>
              </span>&gt;</span
          ><span class="hljs-tag"
            ><span class="hljs-name">&lt;/Lz-Map&gt;</span></span
          >
        </div>
           <div>
          <span class="hljs-tag"
            >&lt;<span class="hljs-attrs">Lz-Camera</span>
        
            <span class="hljs-attr">:cameraData=
              <span class="hljs-string"
              >"cameraData"</span>
            </span>
            <span class="hljs-attr">:viewer=
              <span class="hljs-string"
              >"viewer"</span>
            </span>
            <span class="hljs-attr">:dataSource=
              <span class="hljs-string"
              >"dataSource"</span>
            </span>&gt;
          </span>
          <span class="hljs-tag"
            ><span class="hljs-name">&lt;/Lz-Camera&gt;</span></span
          >
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
                  viewer:<span>{}</span>
                  <span>,</span>
                </div>
                <div>
                  dataSource:<span>null</span>
                  <span>,</span>
                </div>
                <div>
                  cameraData:
                  <span>[</span>
                  <!-- === -->
                  <div>
                     <div>&nbsp;&nbsp;{</div>
                     <div class="dataName">
                      <span>id:</span>
                      <span class="dataKey">"1"</span>
                      <span class="data">,</span>
                     </div>
                     <div class="dataName">
                      <span>name:</span>
                      <span class="dataKey">"监控室"</span>
                      <span class="data">,</span>
                     </div>
                      <div class="dataName">
                      <span>height:</span>
                      <span class="dataKey">"811.7"</span>
                      <span class="data">,</span>
                     </div>
                     <div class="dataName">
                      <span>latitude:</span>
                      <span class="dataKey">"27.966099"</span>
                      <span class="data">,</span>
                     </div>
                     <div class="dataName">
                      <span>longitude:</span>
                      <span class="dataKey">"105.924103"</span>
                      <span class="data">,</span>
                     </div>
                    <div>&nbsp;&nbsp;&nbsp;},</div>
                  </div>
                  <!-- ==== -->
                  <div>
                     <div>&nbsp;&nbsp;{</div>
                      <div class="dataName">
                      <span>id:</span>
                      <span class="dataKey">"2"</span>
                      <span class="data">,</span>
                     </div>
                     <div class="dataName">
                      <span>name:</span>
                      <span class="dataKey">"办公室执行机构"</span>
                      <span class="data">,</span>
                     </div>
                      <div class="dataName">
                      <span>height:</span>
                      <span class="dataKey">"851.9460076462658"</span>
                      <span class="data">,</span>
                     </div>
                     <div class="dataName">
                      <span>latitude:</span>
                      <span class="dataKey">"27.96417167351249"</span>
                      <span class="data">,</span>
                     </div>
                     <div class="dataName">
                      <span>longitude:</span>
                      <span class="dataKey">"105.92442734082462"</span>
                      <span class="data">,</span>
                     </div>

                
                    <div>&nbsp;&nbsp;&nbsp;},</div>
                  </div>
                </div>
           </div>
          &nbsp;&nbsp;&nbsp;&nbsp; <span class="data dataName">}</span><br />&nbsp;&nbsp;
          <span class="data">},</span>
        <br />
          <div class="data">&nbsp;&nbsp;methods: {</div>
          <div>
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;startView(viewer) {</span
            > 
          </div>
          <div class="data dataName">
            <span class="hljs-attrs">&nbsp;&nbsp;this</span>.viewer = viewer;</div>
          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div>
          <div>
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;startDasource(datasource) {</span
            > 
          </div>
          <div class="data dataName">
            <span class="hljs-attrs">&nbsp;&nbsp;this</span>.datasource = datasource;</div>
          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div>
          <div>
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;cesiumClick(event) {</span> 
            
          </div>
          <div class="data dataName">
            <span class="hljs-attrs">&nbsp;&nbsp;console</span>.log(event)</div>
          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div>
          &nbsp;&nbsp; <span class="data">},</span><br/>
          <span class="data">}</span>
        </div>
        <div class="hljs-tag">
          &lt;/<span class="hljs-name">script</span>&gt;
        </div>
      </div>
    </div>
    <div class="codeTitle">Attributes</div>
    <div class="table">
      <div class="tableli">参数</div>
      <div class="tableli">说明</div>
      <div class="tableli">类型</div>
      <div class="tableli">可选值</div>
      <div class="tableli">默认值</div>
      <div class="clear"></div>
      <div class="tablecontentli">cameraData</div>
      <div class="tablecontentli">传入的摄像头点位信息</div>
      <div class="tablecontentli">Array</div>
      <div class="tablecontentli">--</div>
      <div class="tablecontentli">[]</div>
      <div class="clear"></div>
      <div class="tablecontentli">viewer</div>
      <div class="tablecontentli">地图传入的viewer视图数据</div>
      <div class="tablecontentli">Object</div>
      <div class="tablecontentli">--</div>
      <div class="tablecontentli">{}</div>
      <div class="clear"></div>
      <div class="tablecontentli">datasource</div>
      <div class="tablecontentli">地图传入的datasource数据</div>
      <div class="tablecontentli">Object</div>
      <div class="tablecontentli">--</div>
      <div class="tablecontentli">{}</div>
      <div class="clear"></div>
    </div>
    <div class="codeTitle">Props</div>
        <div class="table">
          <div class="tableli">参数</div>
          <div class="tableli" style="width: 30%">说明</div>
          <div class="tableli" style="width: 10%">类型</div>
          <div class="tableli">可选值</div>
          <div class="tableli">默认值</div>
          <div class="clear"></div>
          <div class="tablecontentli">name</div>
          <div class="tablecontentli" style="width: 30%">
            摄像头名称
          </div>
          <div class="tablecontentli" style="width: 10%">String</div>
          <div class="tablecontentli">--</div>
          <div class="tablecontentli">--</div>
          <div class="clear"></div>
          <div class="tablecontentli">id</div>
          <div class="tablecontentli" style="width: 30%">
            所属摄像头id,不可重复
          </div>
          <div class="tablecontentli" style="width: 10%">String</div>
          <div class="tablecontentli">--</div>
          <div class="tablecontentli">--</div>
          <div class="clear"></div>
          <div class="tablecontentli">latitude</div>
          <div class="tablecontentli" style="width: 30%">
            纬度
          </div>
          <div class="tablecontentli" style="width: 10%">String</div>
          <div class="tablecontentli">--</div>
          <div class="tablecontentli">--</div>
          <div class="clear"></div>
          <div class="tablecontentli">longitude</div>
          <div class="tablecontentli" style="width: 30%">
            经度
          </div>
          <div class="tablecontentli" style="width: 10%">String</div>
          <div class="tablecontentli">--</div>
          <div class="tablecontentli">--</div>
          <div class="clear"></div>
           <div class="tablecontentli">height</div>
          <div class="tablecontentli" style="width: 30%">
            高度
          </div>
          <div class="tablecontentli" style="width: 10%">String</div>
          <div class="tablecontentli">--</div>
          <div class="tablecontentli">--</div>
          <div class="clear"></div>
        </div>
   
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      viewer:{},
      dataSource:null,
      cameraData:[
        {
           latitude: 27.966099,
           name: "监控室",
           id: "1",
           longitude: 105.924103,
           height: 811.79
       },
       {
           latitude: 27.96417167351249,
           name: "办公室执行机构",
           id: "2",
           longitude: 105.92442734082462,
           height: 851.9460076462658
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
    startDasource(datasource){
      this.dataSource = datasource;
    }
  },
};
</script>

<style scoped>
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
