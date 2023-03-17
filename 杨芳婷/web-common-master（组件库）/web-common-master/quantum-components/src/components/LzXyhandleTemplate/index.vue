<!-- 拖拽 -->
<template>
  <div>
    <div>
      <el-tag @click="isShowFlex = 'top'">向上</el-tag>
      <el-tag @click="isShowFlex = 'left'" type="success">向左</el-tag>
      <el-tag @click="isShowFlex = 'right'" type="warning">向右</el-tag>
      <el-tag @click="isShowFlex = 'bottom'" type="danger">向下</el-tag>
      <!--居上-->
      <div
          v-if="isShowFlex === 'top'"
          class="container_top_bottom"
          :style="{ height: height + 'px' }"
      ></div>
      <Lz-Xyhandle
          v-if="isShowFlex === 'top'"
          class="myXHandle"
          :direction="isShowFlex"
          :flex="'y'"
          @widthChange="widthChange"
          @mouseUpInfo="mouseUpInfo"
      />
      <!--居左-->
      <div class="flex_info" v-if="isShowFlex === 'left'">
        <div
            class="container_left_right"
            :style="{ width: width + 'px' }"
        ></div>
        <Lz-Xyhandle
            class="myXHandle"
            :direction="isShowFlex"
            @widthChange="widthChange"
            @mouseUpInfo="mouseUpInfo"
        />
      </div>
      <!--居右-->
      <div class="flex_info_right" v-if="isShowFlex === 'right'">
        <Lz-Xyhandle
            class="myXHandle"
            :direction="isShowFlex"
            @widthChange="widthChange"
            @mouseUpInfo="mouseUpInfo"
        />
        <div
            class="container_left_right"
            :style="{ width: width + 'px' }"
        ></div>
      </div>
      <!--居下-->
      <div class="flex_info_bottom" v-if="isShowFlex === 'bottom'">
        <Lz-Xyhandle
            class="myXHandle"
            :direction="isShowFlex"
            :flex="'y'"
            @widthChange="widthChange"
            @mouseUpInfo="mouseUpInfo"
        />
        <div
            class="container_top_bottom"
            :style="{ height: height + 'px' }"
        ></div>
      </div>
    </div>
          <div class="code">运行代码</div>
    <div>
      <div class="hljs">
        <div>
          <span class="hljs-tag"
            >&lt;<span class="hljs-attrs">Lz-Xyhandle</span>
            
             <div class="hljs-attr">:direction

              =<span class="hljs-string"
              >"isShowFlex"</span
            >
             </div>
             <div class="hljs-attr">:flex=<span class="hljs-string"
              >"y"</span
            ></div>
            
             <div class="hljs-attr">@widthChange=<span class="hljs-string"
              >"widthChange"</span
            ></div>
             <span class="hljs-attr">@mouseUpInfo</span>=<span class="hljs-string"
              >"mouseUpInfo"</span
            >
         </span>
         <div class="hljs-tag"
            >&lt;/<span class="hljs-name">Lz-Xyhandle</span>&gt;</div
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
            <span class="data">
              {
            </span>
          </div>
          <div>
           <span class="data"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isShowFlex</span
          >:
          <span class="hljs-string"
            >"top"
          <span class="data">,</span>
          </span>
          </div>
           <div>
           <span class="data"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flex</span
          >:
          <span class="hljs-string"
            >"y"
            <span class="data">,</span></span>
          </div>
          
    
           
        &nbsp;&nbsp;&nbsp;&nbsp;<span class="data">},</span> <br />
          <div class="data">&nbsp;&nbsp;methods: {</div>
          <div>
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;widthChange() {</span
            >
          </div>
          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;},</div>
          <div>
            <span class="data">&nbsp;&nbsp;&nbsp;&nbsp;mouseUpInfo() {</span
            >
          </div>
          <div class="data">&nbsp;&nbsp;&nbsp;&nbsp;}</div>
           &nbsp;&nbsp; <span class="data">},</span> <br />
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
      <div class="tablecontentli">direction</div>
      <div class="tablecontentli" style="width: 30%">
        拖拽方向
      </div>
      <div class="tablecontentli" style="width: 10%">String</div>
      <div class="tablecontentli">top,left,right,bottom</div>
      <div class="tablecontentli">left</div>
      <div class="clear"></div>
      <div class="tablecontentli">flex</div>
      <div class="tablecontentli" style="width: 30%">
        x（左右）,y（上下）
      </div>
      <div class="tablecontentli" style="width: 10%">String</div>
      <div class="tablecontentli">x,y</div>
      <div class="tablecontentli">x</div>
      <div class="clear"></div>
    </div>
    <div class="codeTitle">Events:</div>
    <div class="table">
      <div class="eventli">参数</div>
      <div class="eventli">说明</div>
      <div class="eventli">回调参数</div>
      <div class="clear"></div>
      <div class="eventcontentli">widthChange</div>
      <div class="eventcontentli">获取拖拽的距离</div>

      <div class="eventcontentli">
        <div>movement(距离),direction(方向)</div>
        <div style="font-size:12px;color:#aaa">-- 根据方向去计算判断宽高，具体可参考示例</div>
      </div>
      <div class="clear"></div>
      <div class="eventcontentli">mouseUpInfo</div>
      <div class="eventcontentli">
        <div>拖拽鼠标离开触发事件</div>
       <div style="font-size:12px;color:#aaa">(主要拖拽放开立即存储数据)</div>
       
      </div>

      <div class="eventcontentli">
        <div>direction(方向)</div>
        <div>isMouseMove(是否触发移动)</div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      width: 400,
      isShowFlex: "top",
      height: 250,
    };
  },

  methods: {
    mouseUpInfo(direction, isMouseMove) {
      if (isMouseMove) {
        if (direction === "top" || direction === "bottom") {
          // 联调接口保存布局
          // this.updateLayoutInfoApi(this.isShowFlex, this.height);
        } else if (direction === "right" || direction === "left") {
          // 联调接口保存布局
          // this.updateLayoutInfoApi(this.isShowFlex, this.width);
        }
      }
    },
    // 获取宽度
    widthChange(movement, direction) {
      if (direction === "top" || direction === "bottom") {
        this.height -= movement;
        if (this.height < 250) {
          this.height = 250;
        }
        if (this.height > 400) {
          this.height = 400;
        }
      } else {
        this.width -= movement;
        if (this.width < 300) {
          this.width = 300;
        }
        if (this.width > 600) {
          this.width = 600;
        }
      }
    },
  },
};
</script>

<style scoped>
.el-tag {
  margin-right: 10px;
  cursor: pointer;
}
.container_top_bottom {
  width: 80vw;
  height: 250px;
  background-color: indianred;
}
.container_left_right {
  width: 400px;
  height: 80vh;
  background-color: indianred;
}
.flex_info {
  display: flex;
}
.flex_info_right {
  display: flex;
  position: absolute;
  right: 10px;
}
.flex_info_bottom {
  position: absolute;
  bottom: 10px;
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
