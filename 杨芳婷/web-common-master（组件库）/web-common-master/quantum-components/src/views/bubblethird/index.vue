<template>
  <div style="position:relative">
     <Lz-Map @cesiumClick="cesiumClick" @startView="startView"></Lz-Map>
     <Lz-Bubble-Third :bubbleChart="bubbleChart" :viewer="viewer"></Lz-Bubble-Third>
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
              </span>&gt;</span
          ><span class="hljs-tag"
            ><span class="hljs-name">&lt;/Lz-Map&gt;</span></span
          >
        </div>
           <div>
          <span class="hljs-tag"
            >&lt;<span class="hljs-attrs">Lz-Bubble-Third</span>
        
            <span class="hljs-attr">:bubbleChart=
              <span class="hljs-string"
              >"bubbleChart"</span>
            </span>
            
            <span class="hljs-attr">:viewer=
              <span class="hljs-string"
              >"viewer"</span>
            </span>&gt;
          </span>
          <span class="hljs-tag"
            ><span class="hljs-name">&lt;/Lz-Bubble-Third&gt;</span></span
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
                  bubbleChart:
                  <span>[</span>
                  <!-- === -->
                  <div>
                     <div>&nbsp;&nbsp;{</div>
                     <div class="dataName">
                      <span>id:</span>
                      <span class="dataKey">"bubble0"</span>
                      <span class="data">,</span>
                     </div>

                     <div class="dataName">
                      <span>center:{</span>
                      <div>
                        &nbsp;&nbsp;longitude:
                        <span class="dataKey">105.922083</span>
                        <span class="data">,</span>
                      </div>
                      <div>
                        &nbsp;&nbsp;latitude:
                        <span class="dataKey">27.963952</span>
                        <span class="data">,</span>
                      </div>
                      <div>
                        &nbsp;&nbsp;height:
                        <span class="dataKey">830.55 </span>
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
                  <span class="dataKey">"厂区三"</span>
                  <span class="data">,</span>
                    </div>

                    <div class="dataName">
                      <div>data:[</div>
                      <div class="dataName">{</div>
                      <div class="dataName">
                        <span>
                          &nbsp;&nbsp;name:
                        <span class="dataKey">"采剥(掘)总量"</span>
                        <span class="data">,</span>
                      </span>
                      </div>

                      <div class="dataName">
                        <span>
                          &nbsp;&nbsp; number:
                        <span class="dataKey">"3.2"</span>
                        <span class="data">,</span>
                      </span>
                      <div>},</div>
                      </div>
                      
                      <div class="dataName">{</div>
                        <div class="dataName">
                        <span>
                          &nbsp;&nbsp;name:
                        <span class="dataKey">"掌子出矿量"</span>
                        <span class="data">,</span>
                      </span>
                      </div>

                      <div class="dataName">
                        <span>
                          &nbsp;&nbsp;number:
                        <span class="dataKey">"3.2"</span>
                        <span class="data">,</span>
                      </span>
                      <div>},</div>
                      </div>
                       
                      <div class="dataName">{</div>
                        <div class="dataName">
                        <span>
                          &nbsp;&nbsp;name:
                        <span class="dataKey">"剥离量(掘进量)"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>
                          &nbsp;&nbsp;number:
                        <span class="dataKey">"3.2"</span>
                        <span class="data">,</span>
                      </span>
                      <div>},</div>
                      
                      </div>
                        <div class="dataName">{</div>
                        <div class="dataName">
                        <span>
                          &nbsp;&nbsp;name:
                        <span class="dataKey">"开拓量"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>
                          &nbsp;&nbsp;number:
                        <span class="dataKey">"3.2"</span>
                        <span class="data">,</span>
                      </span>
                      <div>},</div>
                      
                      </div>
                        <div class="dataName">{</div>
                        <div class="dataName">
                        <span>
                          &nbsp;&nbsp;name:
                        <span class="dataKey">"其他作业量"</span>
                        <span class="data">,</span>
                      </span>
                      </div>
                      <div class="dataName">
                        <span>
                          &nbsp;&nbsp;number:
                        <span class="dataKey">"3.2"</span>
                        <span class="data">,</span>
                      </span>
                      <div>},</div>
                      
                      </div>
                      <div class="dataName">],</div>
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
            <span class="hljs-attrs">&nbsp;&nbsp;this</span>
                .viewer = viewer;</div>
          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div>
          <div>
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;cesiumClick(event) {</span> 
          </div>
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
      <div class="tablecontentli">healthBubbleChart</div>
      <div class="tablecontentli">传入的气泡数据</div>
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
            气泡名称
          </div>
          <div class="tablecontentli" style="width: 10%">String</div>
          <div class="tablecontentli">--</div>
          <div class="tablecontentli">--</div>
          <div class="clear"></div>
          <div class="tablecontentli">id</div>
          <div class="tablecontentli" style="width: 30%">
            所属气泡id,不可重复
          </div>
          <div class="tablecontentli" style="width: 10%">String</div>
          <div class="tablecontentli">--</div>
          <div class="tablecontentli">--</div>
          <div class="clear"></div>
          <div class="tablecontentli">center</div>
          <div class="tablecontentli" style="width: 30%">
            见实例,包括经纬度，高度
          </div>
          <div class="tablecontentli" style="width: 10%">Object</div>
          <div class="tablecontentli">--</div>
          <div class="tablecontentli">--</div>
          <div class="clear"></div>
          <div class="tablecontentli">data</div>
          <div class="tablecontentli" style="width: 30%">
            见实例,包括name,number
          </div>
          <div class="tablecontentli" style="width: 10%">Array</div>
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
      bubbleChart:[
        {
          id: "bubble0",
          center: {
            longitude: 105.922083,
            latitude: 27.963952,
            height: 830.55,
          },
          show: true,
          name: "厂区三",
          data: [
            {
              name: "采剥(掘)总量",
              number: "3.2",
            },
            {
              name: "掌子出矿量",
              number: "3.2",
            },
            {
              name: "剥离量(掘进量)",
              number: "3.3",
            },
            {
              name: "开拓量",
              number: "3.2",
            },
            {
              name: "其他作业量",
              number: "3.2",
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
