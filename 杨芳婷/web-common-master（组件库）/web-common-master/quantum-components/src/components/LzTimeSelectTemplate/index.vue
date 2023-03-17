<template>
  <div>
    <Lz-Timeselect
      :defaultCheck="defaultCheck"
      :setValue="setValue"
      @changeStart="changeStart"
      @changeEnd="changeEnd"
      @change="change"
    >
    </Lz-Timeselect>
    <div class="code">运行代码</div>
    <div>
      <div class="hljs">
        <div>
          <span class="hljs-tag"
            >&lt;<span class="hljs-attrs">Lz-Timeselect</span>
            <div class="hljs-attr">:defaultCheck=<span class="hljs-string">"defaultCheck"</span
            ></div>
            <div class="hljs-attr">:setValue=<span class="hljs-string"
              >"setValue"</span></div>
            <div class="hljs-attr">@changeStart=<span class="hljs-string"
              >"changeStart"</span
            ></div>
            <div class="hljs-attr">@changeEnd=<span class="hljs-string"
              >"changeEnd"</span
            ></div>
            <div class="hljs-attr">@change=<span class="hljs-string"
              >"change"</span
            >&gt;</div>
            </span>
          <span class="hljs-tag"
            >&lt;/<span class="hljs-name">Lz-Timeselect</span>&gt;</span
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
            <span class="data">&nbsp;{</span> 
          </div>
          <span class="data"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setValue: [ {</span
          >
          <span class="hljs-string"
            >
            <div class="nametree">
              <span class="data">type:</span>
              4
              <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data"> startTime: </span>
             "15:00:00"
             <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data"> endTime: </span>
               "16:00:00"
              <span class="data">,</span>
              </div>
            <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} ],</div></span
          >
          <p class="data"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;defaultCheck:
            <span class="hljs-string">[1,2,3]
              <span class="data">,</span>
            </span></p>&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="data">}</span>
          <br />&nbsp;&nbsp;<span class="data">},</span> <br />
          <div class="data">&nbsp;&nbsp;methods: {</div>
          <div>
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;changeStart() {</span
               >
          </div>
          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div>
            <div>
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;changeEnd() {</span
            >
          </div>
          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div>
            <div>
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;change() {</span
            >
          </div>
          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;}</div>
          <span class="data">&nbsp;&nbsp;} <br /></span>
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
      <div class="tablecontentli">defaultCheck</div>
      <div class="tablecontentli">用户自定义的禁用时间段</div>
      <div class="tablecontentli">Array</div>
      <div class="tablecontentli">--</div>
      <div class="tablecontentli">[1,2,3]</div>
      <div class="clear"></div>
      <div class="tablecontentli">setValue</div>
      <div class="tablecontentli">设置开始时间</div>
      <div class="tablecontentli">Array</div>
      <div class="tablecontentli">--</div>
      <div class="tablecontentli">[]</div>
      <div class="clear"></div>
    </div>
    
    <div class="codeTitle">Events:</div>
    <div class="table">
      <div class="eventli">参数</div>
      <div class="eventli">说明</div>
      <div class="eventli">回调参数</div>
      <div class="clear"></div>
      <div class="eventcontentli">changeStart</div>
      <div class="eventcontentli">用户确认开始时间的值触发</div>

      <div class="eventcontentli">当前被点击时间值<span style="color:#aaa;font-size:12px">(eg:23:59:59)</span></div>
      <div class="clear"></div>
      <div class="eventcontentli">changeEnd</div>
      <div class="eventcontentli">用户确定结束时间的值触发</div>

      <div class="eventcontentli">当前被点击时间值<span style="color:#aaa;font-size:12px">(eg:23:59:59)</span></div>
      <div class="clear"></div>
      <div class="eventcontentli">changeStart</div>
      <div class="eventcontentli">用户确定是否禁用某一天的值触发</div>

      <div class="eventcontentli">当前是否禁用值<span style="color:#aaa;font-size:12px">（false/true）</span></div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      defaultCheck: [0, 1, 2],
      setValue: [
        {
          type: 4,
          startTime: "15:00:00",
          endTime: "16:00:00",
        },
      ],
    };
  },
  methods: {
    // 时间选择器前面一个选择框事件
    changeStart(item) {
      console.log("start", item);
    },

    // 时间选择器后面一个选择框事件
    changeEnd(item) {
      console.log("end", item);
    },

    //事件选择器单选框选择
    change(item) {
      console.log("item", item);
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
.hljs-string{
  color:#756bb1;
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