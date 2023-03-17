<!-- 安装指南 -->
<template>
  <div>
    <Lz-Baseline
        @getAreaDate="getAreaDate"
        :nowDate="nowDate"
    ></Lz-Baseline>
    <div class="code">运行代码</div>
 <div>
      <div class="hljs">
        <div>
          <span class="hljs-tag"
            >&lt;<span class="hljs-attrs">Lz-Baseline</span>
            <div class="hljs-attr">:nowDate=<span class="hljs-string"
              >"nowDate"</span
            ></div>
            <span class="hljs-attr">@getAreaDate</span>=<span class="hljs-string"
              >"getAreaDate"</span
            >&gt;</span
          ><div class="hljs-tag"
            >&lt;/<span class="hljs-name">Lz-Baseline</span>&gt;</div
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
            <span class="hljs-keyword">&nbsp;&nbsp;&nbsp;&nbsp;return</span> 
            <span class="data"> {</span>
          </div>
          <span class="data"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nowDate: {</span
          >
          <span class="hljs-string"
            >
            <!-- <div class="khtree">{</div> -->
            <div class="nametree">
              <span class="data">date:</span>
              "2022/6/29"
             <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">name:</span>
              "Now"
              <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">imgUrl:</span>
              "http://api.tianditu.gov.cn/img/map/markerA.png"
              <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">color:</span>
              "#333"
              <span class="data">,</span>
            </div>
            <div class="data khtree">}</div>
           </span
          >
         &nbsp;&nbsp;&nbsp;&nbsp;<span class="data">}</span><br />&nbsp;&nbsp;
         <span class="data">} ,</span> <br/>
          <div  class="data">&nbsp;&nbsp;methods: {</div>
          <div>
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;getAreaDate() {</span
            >
          </div>
          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;}</div>
          &nbsp;&nbsp;<span class="data">}，</span> <br />
          <span class="data">}</span> 
        </div>
        <div class="hljs-tag">
          &lt;/<span class="hljs-name">script</span>&gt;
        </div>
      </div>
    </div>
    <div class="codeTitle">Props</div>
    <div class="table">
      <div class="tableli">参数</div>
      <div class="tableli" style="width: 30%">说明</div>
      <div class="tableli" style="width: 10%">类型</div>
      <div class="tableli">可选值</div>
      <div class="tableli">默认值</div>
      <div class="clear"></div>
      <div class="tablecontentli">nowDate</div>
      <div class="tablecontentli" style="width: 30%">当前时间节点显示</div>
      <div class="tablecontentli" style="width: 10%">Object</div>
      <div class="tablecontentli">name,date,imgUrl,color</div>
      <div class="tablecontentli">{}</div>
      <div class="clear"></div>
      <div class="tablecontentli">maxDate</div>
      <div class="tablecontentli" style="width: 30%">轴上最大时间</div>
      <div class="tablecontentli" style="width: 10%">String</div>
      <div class="tablecontentli">--</div>
      <div class="tablecontentli">2025/02/23</div>
      <div class="clear"></div>
      <div class="tablecontentli">minDate</div>
      <div class="tablecontentli" style="width: 30%">轴上最小时间</div>
      <div class="tablecontentli" style="width: 10%">String</div>
      <div class="tablecontentli">--</div>
      <div class="tablecontentli">2018/12/12</div>
      <div class="clear"></div>
      <div class="tablecontentli">format</div>
      <div class="tablecontentli" style="width: 30%">轴上格式化时间格式</div>
      <div class="tablecontentli" style="width: 10%">String</div>
      <div class="tablecontentli">--</div>
      <div class="tablecontentli">YY-MM-DD</div>
      <div class="clear"></div>
    </div>
    <div class="codeTitle">Events:</div>
    <div class="table">
      <div class="eventli">参数</div>
      <div class="eventli">说明</div>
      <div class="eventli">回调参数</div>
      <div class="clear"></div>
      <div class="eventcontentli">getAreaData</div>
      <div class="eventcontentli">获取拖拽时间线两者的</div>

      <div class="eventcontentli">actualStartDate,actualEndDate</div>
      <div class="clear"></div>
    </div>
   
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      nowDate: {
        date: "2022/6/29",
        name: "Now",
        imgUrl: "http://api.tianditu.gov.cn/img/map/markerA.png",
        color: "#333",
      },
    };
  },
  methods: {
    getAreaDate() {
     
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
.hljs-attrs {
  color: #3182bd;
}
.hljs-keyword {
  color: #3182bd;
}
.data{
  color: #000;
}
.khtree {
  margin-left: 38px;
}
.nametree {
  margin-left: 48px;
}
.hljs-string{
  color: #756bb1;
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
