<template>
  <div style="position:relative">
     <Lz-Map @cesiumClick="cesiumClick" @startView="startView"></Lz-Map>
     <Lz-Billboard  :billboard="billboard" :viewer="viewer"></Lz-Billboard>
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
            >&lt;<span class="hljs-attrs">Lz-Billboard</span>
        
            <span class="hljs-attr">:billboard=
              <span class="hljs-string"
              >"billboard"</span>
            </span>
            
            <span class="hljs-attr">:viewer=
              <span class="hljs-string"
              >"viewer"</span>
            </span>&gt;
          </span>
          <span class="hljs-tag"
            ><span class="hljs-name">&lt;/Lz-Billboard&gt;</span></span
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

           </div>
          &nbsp;&nbsp;&nbsp;&nbsp; <span class="data">}</span><br />&nbsp;&nbsp;
          <span class="data">},</span>
        <br />
          <div class="data">&nbsp;&nbsp;methods: {</div>
          <div>
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;startView(viewer) {</span
            > 
          </div>
          <div class="data dataName">this.viewer = viewer;</div>
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
      <div class="tablecontentli">billboard</div>
      <div class="tablecontentli">传入的广告牌数据</div>
      <div class="tablecontentli">Object</div>
      <div class="tablecontentli">--</div>
      <div class="tablecontentli">{}</div>
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
            广告牌名称
          </div>
          <div class="tablecontentli" style="width: 10%">String</div>
          <div class="tablecontentli">--</div>
          <div class="tablecontentli">--</div>
          <div class="clear"></div>
          <div class="tablecontentli">width</div>
          <div class="tablecontentli" style="width: 30%">
            广告牌宽度
          </div>
          <div class="tablecontentli" style="width: 10%">String</div>
          <div class="tablecontentli">--</div>
          <div class="tablecontentli">--</div>
          <div class="clear"></div>
          <div class="tablecontentli">height</div>
          <div class="tablecontentli" style="width: 30%">
            广告牌高度
          </div>
          
          <div class="tablecontentli" style="width: 10%">String</div>
          <div class="tablecontentli">--</div>
          <div class="tablecontentli">--</div>
          <div class="clear"></div>
          <div class="tablecontentli">id</div>
          <div class="tablecontentli" style="width: 30%">
            所属广告牌id,不可重复
          </div>
          <div class="tablecontentli" style="width: 10%">String</div>
          <div class="tablecontentli">--</div>
          <div class="tablecontentli">--</div>
          <div class="clear"></div>
          <div class="tablecontentli">rotate</div>
          <div class="tablecontentli" style="width: 30%">
            广告牌旋转角度
          </div>
          <div class="tablecontentli" style="width: 10%">String</div>
          <div class="tablecontentli">--</div>
          <div class="tablecontentli">--</div>
          <div class="clear"></div>
          <div class="tablecontentli">anchor</div>
          <div class="tablecontentli" style="width: 30%">
            广告牌锚点
          </div>
          <div class="tablecontentli" style="width: 10%">Array</div>
          <div class="tablecontentli">--</div>
          <div class="tablecontentli">[0,0]</div>
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
            见实例,包括
            <div>time,people,area,floor,frequency,complete</div>
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
