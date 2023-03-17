<!-- 安装指南 -->
<template>
  <div>
     <Lz-Map @cesiumClick="cesiumClick"  @startView="startView" :center="center"></Lz-Map>
    <div class="code">运行代码</div>
    <div>
      <div class="hljs">
        <div>
          <span class="hljs-tag"
            >&lt;<span class="hljs-attrs">Lz-Map</span>
        
            <span class="hljs-attr">@cesiumClick=<span class="hljs-string"
              >"cesiumClick"</span></span><span class="hljs-attr">@startView=<span class="hljs-string"
              >"startView"</span></span><span class="hljs-attr">:center=<span class="hljs-string"
              >"center"</span></span>&gt;</span
          >  <span class="hljs-tag"
            ><div class="hljs-name">&lt;/Lz-Map&gt;</div></span
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
                  center:
                  <div>
                     <div>&nbsp;&nbsp;{</div>
                     <div class="dataName">
                       <span>y:</span>
                  <span class="dataKey">27.963575</span>
                  <span class="data">,</span>
                     </div>

                     

                    <div class="dataName">
                      <span>x:</span>
                  <span class="dataKey">105.918308</span>
                  <span class="data">,</span>
                    </div>
                  
                    <div class="dataName">
                      <span>z:</span>
                  <span class="dataKey">882.51</span>
                  <span class="data">,</span>
                    </div>
                  <div class="dataName">
                      <span>heading:</span>
                  <span class="dataKey">82.3</span>
                  <span class="data">,</span>
                    </div>
                     <div class="dataName">
                      <span>pitch:</span>
                  <span class="dataKey">-18</span>
                  <span class="data">,</span>
                    </div>
                 <div class="dataName">
                      <span>roll:</span>
                  <span class="dataKey">0.5</span>
       
                    </div>
                    <div>&nbsp;&nbsp;&nbsp;},</div>
                  </div>
                  <!-- ==== -->
                  <div>
                    
                  </div>
                </div>
           </div>
          &nbsp;&nbsp;&nbsp;&nbsp; <span class="data">}</span><br />&nbsp;&nbsp;
          <span class="data">},</span>
        <br />
          <div class="data">&nbsp;&nbsp;methods: {</div>
          <div>
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;cesiumClick(event) {</span
            > 
          </div>
          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;}</div>
          <div>
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;startView(view) {</span
            > 
          </div>
          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;}</div>
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
      <div class="tablecontentli">type</div>
      <div class="tablecontentli">类型选择</div>
      <div class="tablecontentli">Sting</div>
      <div class="tablecontentli">'1'(矿山),'2'(水泥厂)</div>
      <div class="tablecontentli">'1'(矿山)</div>
      <div class="clear"></div>
       <div class="tablecontentli">center</div>
      <div class="tablecontentli">中心点选择</div>
      <div class="tablecontentli">Object</div>
      <div class="tablecontentli">根据需要视角切换</div>
      <div class="tablecontentli">矿山：
          <div>{</div>
        <div style="font-size:12px;color:#ddd">
        <div >y: 27.964285,</div>
        <div> x: 105.91934,</div>
         <div>z: 986.99,</div>
         <div>heading: 82.3,</div>
         <div>pitch: -18,</div>
         <div>roll: 0.5</div>
        </div>
        <div>}</div>
        <div>水泥厂:
            <div>{</div>
        <div style="font-size:12px;color:#ddd">
        <div>y: 22.277989,</div>
        <div> x: 114.223356,</div>
         <div>z: 574.67,</div>
         <div>heading: 239.6,</div>
         <div>pitch: -21.5,</div>
         <div>roll: 358.9</div>
        </div>
        <div>}</div>
        </div>
      </div>
      <div class="clear"></div>
    </div>

    <div class="codeTitle">Events:</div>
    <div class="table">
      <div class="eventli">参数</div>
      <div class="eventli">说明</div>
      <div class="eventli">回调参数</div>
      <div class="clear"></div>
      <div class="eventcontentli">cesiumClick</div>
      <div class="eventcontentli">地图被点击事件</div>

      <div class="eventcontentli">返回经纬度</div>
      <div class="clear"></div>
      <div class="eventcontentli">startView</div>
      <div class="eventcontentli">地图渲染完回调事件</div>

      <div class="eventcontentli">
        <div>返回view</div>
        <div style="font-size:12px;color:#ddd">提供地图view,传入为广告牌，气泡提供服务</div>
        </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      center:
        {
          y:27.963575,
          x:105.918308,
          z:882.51,
          heading:82.3,
          pitch:-18,
          roll:0.5
        }
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
