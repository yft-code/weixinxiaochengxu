<!-- 面包屑 -->
<template>
  <div>
    <Lz-Breadcrumb
      :breadcrumbData="breadcrumbData"
    ></Lz-Breadcrumb>
    <div class="code">运行代码</div>
    <div>
      <div class="hljs">
        <div>
          <span class="hljs-tag"
            >&lt;<span class="hljs-attrs">Lz-Breadcrumb</span>
            <div class="hljs-attr">:breadcrumbData=<span class="hljs-string"
              >"breadcrumbData"</span
            >
            </div>
          
         </span
          ><div class="hljs-tag"
            >&lt;/<span class="hljs-name">Lz-Breadcrumb</span>&gt;</div
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
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;breadcrumbData:[ { </span
          >
          <span class="hljs-string"
            >
            <div class="nametree">
              <span class="data">name:</span>
              "一级导航"
              <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">name:</span>
              "二级导航"
              <span class="data">,</span></div>
            <div class="nametree">
              <span class="data">name:</span>
              "三级导航"
             <span class="data">,</span>
            </div>
            </span
          >
          <div class="khtree">}</div>
          <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;}<br />
          </span>
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
      <div class="tablecontentli">separator</div>
      <div class="tablecontentli">分隔符</div>
      <div class="tablecontentli">String</div>
      <div class="tablecontentli">--</div>
      <div class="tablecontentli">/</div>
      <div class="clear"></div>
      <div class="tablecontentli">breadcrumbData</div>
      <div class="tablecontentli">展示数据</div>
      <div class="tablecontentli">Array</div>
      <div class="tablecontentli">--</div>
      <div class="tablecontentli">[]</div>
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
        显示的页面名称
      </div>
      <div class="tablecontentli" style="width: 10%">String</div>
      <div class="tablecontentli">--</div>
      <div class="tablecontentli">--</div>
      <div class="clear"></div>
      <div class="tablecontentli">path</div>
      <div class="tablecontentli" style="width: 30%">
        页面路径，用于跳转页面
      </div>
      <div class="tablecontentli" style="width: 10%">String</div>
      <div class="tablecontentli">--</div>
      <div class="tablecontentli">--</div>
      <div class="clear"></div>
    </div>
    <div class="codeTitle">Events:</div>
    <div class="table">
      <div class="eventli">参数</div>
      <div class="eventli">说明</div>
      <div class="eventli">回调参数</div>
      <div class="clear"></div>
      <div class="eventcontentli">toPath</div>
      <div class="eventcontentli">页面名称被点击时的回调</div>

      <div class="eventcontentli">currentPath</div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      breadcrumbData: [
        { name: "一级导航" },
        { name: "二级导航" },
        { name: "三级导航" },
      ],
    };
  },
  methods: {
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
  color:#000;
}
.khtree {
  color: #000;
  margin-left: 38px;
}
.nametree {
  color: #756bb1;
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
