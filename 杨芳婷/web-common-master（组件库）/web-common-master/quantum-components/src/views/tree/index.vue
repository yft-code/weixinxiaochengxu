<!-- 安装指南 -->
<template>
  <div>
    <Lz-Tree
      :treeData="treeData"
      :isExpand="isExpand"
      @nodeClick="nodeClick"
    ></Lz-Tree>
    <div class="code">运行代码</div>
    <div>
      <div class="hljs">
        <div>
          <span class="hljs-tag"
            >&lt;<span class="hljs-attrs">Lz-Tree</span>
            <div class="hljs-attr">:treeData=<span class="hljs-string"
              >"treeData"</span
            ></div>
            <div class="hljs-attr">:isExpand=<span class="hljs-string"
              >"isExpand"</span
            ></div>
            <span class="hljs-attr">@nodeClick=<span class="hljs-string"
              >"nodeClick"</span></span>&gt;</span
          ><span class="hljs-tag"
            ><div class="hljs-name">&lt;/Lz-Tree&gt;</div></span
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
          <span class="data"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;treeData:</span
          >
          <span class="data">[
            <div class="khtree">{</div>
            <div class="nametree">name:
              <span class="hljs-string">"1"</span>
              ,</div>
            <div class="nametree">child: [</div>
            <div class="khtreesecond">{</div>
            <div class="nametreesecond">name: <span class="hljs-string">"22"</span>,</div>
            <div class="khtreesecond">}</div>
            <div class="nametree">],</div>
            <div class="nametree">name: <span class="hljs-string">"2"</span></div>
            <div class="khtree data">}</div>
            <div class="btree">],</div></span
          >
          <span class="data"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isExpand:</span
          ><span class="hljs-string">true</span> <br />&nbsp;&nbsp;&nbsp;&nbsp; <span class="data">}</span><br />&nbsp;&nbsp;
          <span class="data">},</span>
        <br />
          <div class="data">&nbsp;&nbsp;methods: {</div>
          <div>
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;nodeClick(item) {</span
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
      <div class="tablecontentli">isEpand</div>
      <div class="tablecontentli">是否展开</div>
      <div class="tablecontentli">Boolean</div>
      <div class="tablecontentli">true,false</div>
      <div class="tablecontentli">true</div>
      <div class="clear"></div>
      <div class="tablecontentli">treeData</div>
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
        指定节点标签为节点对象的某个属性值
      </div>
      <div class="tablecontentli" style="width: 10%">String</div>
      <div class="tablecontentli">--</div>
      <div class="tablecontentli">--</div>
      <div class="clear"></div>
      <div class="tablecontentli">child</div>
      <div class="tablecontentli" style="width: 30%">
        指定子树为节点对象的某个属性值
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
      <div class="eventcontentli">nodeClick</div>
      <div class="eventcontentli">节点被点击时的回调</div>

      <div class="eventcontentli">--</div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      isExpand: true,
      treeData: [
        {
          name: "1",
          child: [
            {
              name: "22",
            },
          ],
        },
        {
          name: "2",
        },
      ],
    };
  },
  methods: {
    nodeClick(item) {
      console.log(item);
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
.khtree {
  margin-left: 38px;
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
