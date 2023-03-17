<!-- 首页 -->
<template>
  <div>
      <Lz-Customheader
          :reset-default="customHeaderData.isReset"
          ref="customHeader"
          :title="customHeaderData.titleCustom"
          :table-columns="customHeaderData.tableColumns"
          :default-radio-info="customHeaderData.defaultRadio"
          @reset-finish="handleResetFinish"
          @getColumns="getColumns"
      ></Lz-Customheader>
       <div class="code">运行代码</div>
    <div>
      <div class="hljs">
        <div>
          <span class="hljs-tag"
            >&lt;<span class="hljs-attrs">Lz-Customheader</span>
            <div class="hljs-attr">ref=<span class="hljs-string"
              >"customHeader"</span
            ></div>
             <div class="hljs-attr">:reset-default=<span class="hljs-string"
              >"isReset"</span
            ></div>
             <div class="hljs-attr">:title=<span class="hljs-string"
              >"titleCustom"</span
            ></div>
             <div class="hljs-attr">:table-columns=<span class="hljs-string"
              >"tableColumns"</span
            ></div>
             <div class="hljs-attr">:default-radio-info=<span class="hljs-string"
              >"defaultRadio"</span
            ></div>
             <div class="hljs-attr">@reset-finish=<span class="hljs-string"
              >"handleResetFinish"</span
            ></div>
             <div class="hljs-attr">@getColumns=<span class="hljs-string"
              >"getColumns"</span
            ></div>
         </span
          ><span class="hljs-tag"
            >&lt;/<span class="hljs-name">Lz-Customheader</span>&gt;</span
          >
        </div>
        <div class="hljs-tag">
          &lt;<span class="hljs-name">script</span>&gt;
        </div>
        <div class="javascript">
          <span class="hljs-keyword">export</span>&nbsp;
          <span class="hljs-keyword">default </span>
          <span class="data"> {</span>
          <div class="data">&nbsp;&nbsp;data() {</div>
          <div>
            <span class="hljs-keyword">&nbsp;&nbsp;&nbsp;&nbsp;return </span> 
            <span class="data">{</span>
          </div>
          <div>
           <span class="data"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isReset: </span
          >
          <span class="hljs-string"
            >false,</span>
          </div>
           <div>
           <span class="data"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;titleCustom:</span
          >
          <span class="hljs-string"
            >"筛选的监测项目",</span>
          </div>
          <span class="data"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tableColumns:[</span
          >
          <span class="hljs-string"
            >
            <div class="khtree data">{</div>
            <div class="nametree">
              <span class="data">prop:</span>
                "name"
                <span class="data">,</span>
              </div>
            <div class="nametree">
              <span class="data">label:</span>
              "名称"
             <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">show:</span>
              true,</div>
            <div class="nametree">
              <span class="data">fixshow:</span>
              true,</div>
            </span
          >
          <div class="khtree data">},</div>
           <span class="hljs-string"
            >
            <div class="khtree data">{</div>
            <div class="nametree">
              <span class="data">prop:</span>
                "area"
                <span class="data">,</span>
              </div>
            <div class="nametree">
              <span class="data">label:</span>
              "区域"
              <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">show:</span>
              true,</div>
            <div class="nametree">
              <span class="data">fixshow:</span>
              true,</div>
            </span
          >
           <div class="khtree data">},</div>
            <span class="hljs-string"
            >
            <div class="khtree data">{</div>

            <div class="nametree">
              <span class="data">prop:</span>
                "basin"
                <span class="data">,</span>
             </div>
            <div class="nametree">
              <span class="data">label:</span>
              "流域"
              <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">show:</span>
              true,</div>
            <div class="nametree">
              <span class="data">fixshow:</span>
              true,</div>
            </span
          >
           <div class="khtree data">},</div>
            <span class="hljs-string"
            >
            <div class="khtree data">{</div>
            <div class="nametree">
              <span class="data">prop:</span>
                "pointName"
                <span class="data">,</span>
             </div>
            <div class="nametree">
              <span class="data">label:</span>
              "点位名称"
              <span class="data">,</span></div>
            <div class="nametree">
              <span class="data">show:</span>
              true,</div>
            <div class="nametree">
              <span class="data">fixshow:</span>
              true,</div>
            </span
          >
           <div class="khtree data">},</div>
           <span class="hljs-string"
            >
            <div class="khtree data">{</div>
            <div class="nametree">
              <span class="data">prop:</span>
                "monitorTime"
                <span class="data">,</span>
             </div>
            <div class="nametree">
              <span class="data">label:</span>
              "时间"
              <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">show:</span>
              true,</div>
            <div class="nametree">
              <span class="data">fixshow:</span>
              true,</div>
            </span
          >
           <div class="khtree data">},</div>
           <span class="hljs-string"
            >
            <div class="khtree data">{</div>
            <div class="nametree">
              <span class="data">prop:</span>
                "temperature"
                <span class="data">,</span>
              </div>
            <div class="nametree">
              <span class="data">label:</span>
              "水温(℃)"
              <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">show:</span>
              true,</div>
            <div class="nametree">
              <span class="data">fixshow:</span>
              true,</div>
            </span
          >
           <div class="khtree data">},</div>
           <span class="hljs-string"
            >
            <div class="khtree data">{</div>
            <div class="nametree">
              
              <span class="data">prop:</span>
                "ph"
                <span class="data">,</span>
              </div>
            <div class="nametree">
              <span class="data">label:</span>
              "ph(6.0-9.0)"
              <span class="data">,</span>  
          </div>
            <div class="nametree">
              <span class="data">show:</span>
              true,</div>
            <div class="nametree">
              <span class="data">fixshow:</span>
              true,</div>
            </span
          >
           <div class="khtree data">},</div>
           <span class="hljs-string"
            >
            <div class="khtree data">{</div>
            <div class="nametree">
              <span class="data">prop:</span>
                "conductivity"
                <span class="data">,</span>
             </div>
            <div class="nametree">
              <span class="data">label:</span>
              "电导率(μS/cm)"
              <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">show:</span>
              true<span class="data">,</span></div>
            <div class="nametree">
              <span class="data">fixshow:</span>
              true<span class="data">,</span></div>
            </span
          >
           <div class="khtree data">},</div>
           <span class="hljs-string"
            >
            <div class="khtree data">{</div>
            <div class="nametree">
              <span class="data">prop:</span>
                "turbidity"
                <span class="data">,</span>
              </div>
            <div class="nametree">
              <span class="data">label:</span>
              "浊度(NTU)"
              <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">show:</span>
              true<span class="data">,</span></div>
            <div class="nametree">
              <span class="data">fixshow:</span>
              true<span class="data">,</span></div>
            </span
          >
           <div class="khtree data">},</div>
           <span class="hljs-string"
            >
            <div class="khtree data">{</div>
            <div class="nametree">
              <span class="data">prop:</span>
             "potassiumPermanganate"
            <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">label:</span>
              "高锰酸盐指数(mg/L)"
              <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">show:</span>
              true<span class="data">,</span></div>
            <div class="nametree">
              <span class="data">fixshow:</span>
              true<span class="data">,</span></div>
            </span
          >
           <div class="khtree data">},</div>
           <span class="hljs-string"
            >
            <div class="khtree data">{</div>
            <div class="nametree">
              <span class="data">prop:</span>
                "ammoniaNitrogen"
                <span class="data">,</span> 
           </div>
            <div class="nametree">
              <span class="data">label:</span>
              "氨氮(mg/L)"
              <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">show:</span>
              true<span class="data">,</span></div>
            <div class="nametree">
              <span class="data">fixshow:</span>
              true<span class="data">,</span></div>
            </span
          >
           <div class="khtree data">},</div>
           <span class="hljs-string"
            >
            <div class="khtree data">{</div>
            <div class="nametree">
              <span class="data">prop:</span>
                "totalPhosphorus"
                <span class="data">,</span>
             </div>
            <div class="nametree">
              <span class="data">label:</span>
              "总磷(mg/L)"
              <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">show:</span>
              true
            <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">fixshow:</span>
              true<span class="data">,</span></div>
            </span
          >
           <div class="khtree data">},</div>
           <span class="hljs-string"
            >
            <div class="khtree data">{</div>
            <div class="nametree">
              <span class="data">prop:</span>
                "totalNitrogen"
                <span class="data">,</span>
            </div>
            <div class="nametree">
              <span class="data">label:</span>
              "总氨(mg/L)"
            
            </div>
            <div class="nametree">
              <span class="data">show:</span>
              true<span class="data">,</span></div>
            <div class="nametree">
              <span class="data">fixshow:</span>
              true<span class="data">,</span></div>
            </span
          >
           <div class="khtree data">}</div>
        &nbsp;&nbsp;&nbsp;&nbsp;<span class="data">},</span> <br />
          <div class="data">&nbsp;&nbsp;methods: {</div>
          <div>
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;handleResetFinish() {</span
            >
          </div>
          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div>
          <div>
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;getColumns() {</span
            >
          </div>
          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;}</div>
          &nbsp;&nbsp;<span class="data">},</span> <br />
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
      <div class="tablecontentli">tableColumns</div>
      <div class="tablecontentli" style="width: 30%">
        表格表头配置属性
      </div>
      <div class="tablecontentli" style="width: 10%">Object</div>
      <div class="tablecontentli"></div>
      <div class="tablecontentli">{}</div>
      <div class="clear"></div>
      <div class="tablecontentli">radioArr</div>
      <div class="tablecontentli" style="width: 30%">
        快捷键配置
      </div>
      <div class="tablecontentli" style="width: 10%">Array</div>
      <div class="tablecontentli"></div>
      <div class="tablecontentli">[]</div>
      <div class="clear"></div>
      <div class="tablecontentli">defaultRadioInfo</div>
      <div class="tablecontentli" style="width: 30%">
        默认选中的类型
      </div>
      <div class="tablecontentli" style="width: 10%">String</div>
      <div class="tablecontentli">default,all,none</div>
      <div class="tablecontentli">default</div>
      <div class="clear"></div>
        <div class="tablecontentli">title</div>
      <div class="tablecontentli" style="width: 30%">
       按钮的名称
      </div>
      <div class="tablecontentli" style="width: 10%">String</div>
      <div class="tablecontentli"></div>
      <div class="tablecontentli">自定义列</div>
      <div class="clear"></div>
        <div class="tablecontentli">resetDefault</div>
      <div class="tablecontentli" style="width: 30%">
        重置默认按钮
      </div>
      <div class="tablecontentli" style="width: 10%">Boolean</div>
      <div class="tablecontentli">true,false</div>
      <div class="tablecontentli">false</div>
      <div class="clear"></div>
    </div>
    <div class="codeTitle">Events:</div>
    <div class="table">
      <div class="eventli">参数</div>
      <div class="eventli">说明</div>
      <div class="eventli">回调参数</div>
      <div class="clear"></div>
      <div class="eventcontentli">reset-finsh</div>
      <div class="eventcontentli">重置默认事件</div>

      <div class="eventcontentli">
        <div style="font-size:12px;color:#aaa">--对应触发后resetDefault传入值为false</div>
      </div>
      <div class="clear"></div>
      <div class="eventcontentli">getColumns</div>
      <div class="eventcontentli">
        获取自定义勾选后的配置信息
      </div>

      <div class="eventcontentli">
        value(array数组)
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import { customHeaderData } from "@/constants/custom-header-data";
export default {
  data() {
    return {
      customHeaderData: { ...customHeaderData },
    };
  },
  methods: {
    // 重置监测项目回调
    handleResetFinish() {
      this.isReset = false;
    },
    // 自定义检测项目点击获取返回的值
    getColumns(value) {
      // 处理数据
      console.log(value);
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
    /* margin-left: 8px; */
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

