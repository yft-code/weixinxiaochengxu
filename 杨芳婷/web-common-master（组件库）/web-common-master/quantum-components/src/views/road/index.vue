<template>
    <div style="position:relative">
       <Lz-Map @cesiumClick="cesiumClick" @startView="startView" :center="center"></Lz-Map>
       <Lz-Road-High  :roadArr="roadArr" :colorRgba="colorRgba" :viewer="viewer"></Lz-Road-High>
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
                 <span class="hljs-attr">:center=<span class="hljs-string"
                >"center" &nbsp;</span>
                </span>
                &gt;</span
            >
            
            <span class="hljs-tag"
              ><span class="hljs-name">&lt;/Lz-Map&gt;</span></span
            >
          </div>
             <div>
            <span class="hljs-tag"
              >&lt;<span class="hljs-attrs">Lz-Road-High</span>
          
              <span class="hljs-attr">:roadArr=
                <span class="hljs-string"
                >"roadArr"</span>
              </span>
              
              <span class="hljs-attr">:colorRgba=
                <span class="hljs-string"
                >"colorRgba"</span>
              </span>
              <span class="hljs-attr">:viewer=
                <span class="hljs-string"
                >"viewer"</span>
              </span>&gt;
            </span>
            <span class="hljs-tag"
              ><span class="hljs-name">&lt;/Lz-Road-High&gt;</span></span
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
                  <span class="dataKey">27.963297</span>
                  <span class="data">,</span>
                     </div>

                     

                    <div class="dataName">
                      <span>x:</span>
                  <span class="dataKey">105.91685</span>
                  <span class="data">,</span>
                    </div>
                  
                    <div class="dataName">
                      <span>z:</span>
                  <span class="dataKey">932.82</span>
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

                  <div>
                    viewer:<span>{}</span>
                    <span>,</span>
                  </div>

                  <div>
                    colorRgba:<span>[</span>
                    <span class="hljs-attrs">0,191,255,1</span>
                    <span>]</span>
                    <span>,</span>
                  </div>
                  <div>
                    roadArr:<span>[</span>
                    <span class="hljs-attrs">
                      <div class="data-lan">105.92099210350383,27.963819145222057,</div>
                      <div class="data-lan">105.92096828886392,27.96382457027858,</div>
                      <div class="data-lan">105.92095501959602,27.963828551721264,</div>
                      <div class="data-lan">105.92094642956769,27.963832195288695,</div>
                      <div class="data-lan">105.9209195568148,27.963852685489467,</div>
                      <div class="data-lan">105.92090495325714,27.96387171315268,</div>
                      <div class="data-lan">105.9208733145479,27.96413487311091,</div>
                      <div class="data-lan">105.92093149466417,27.964164441184256,</div>
                      <div class="data-lan">105.92102349938146,27.964193561652824,</div>
                      <div class="data-lan">105.92112934533262,27.964214509293914,</div>
                      <div class="data-lan">105.92128922872111,27.96427080225929,</div>
                      <div class="data-lan">105.9219417218975,27.9646976897298,</div>
                      <div class="data-lan">105.9220707203454,27.964806248448074,</div>
                      <div class="data-lan">105.92218835604513,27.964853839315992,</div>
                      <div class="data-lan">105.92242427601147,27.96496780101612,</div>
                      <div class="data-lan">105.92254092476244,27.96499058567692,</div>
                      <div class="data-lan">105.92254619912713,27.965016580152902,</div>
                      <div class="data-lan">105.92247925407007,27.965014152641402,</div>
                      <div class="data-lan">105.92244027565295,27.9650201633429,</div>
                      <div class="data-lan">105.92241646737719,27.965018101871433,</div>
                      <div class="data-lan">105.92244481261046,27.965073315994317,</div>
                      <div class="data-lan">105.9224905531549,27.96512149528183,</div>
                      <div class="data-lan">105.92247318679547,27.965146398907365,</div>
                      <div class="data-lan">105.92241100854221,27.965086004446857,</div>
                      <div class="data-lan">105.92237063563363,27.96502676655238,</div>
                      <div class="data-lan">105.92216588271124,27.96490892237527,</div>
                      <div class="data-lan">105.92206417368361,27.964856399562176,</div>
                      <div class="data-lan">105.92127480021676,27.964310577977493,</div>
                      <div class="data-lan">105.92112718345972,27.96426925714564,</div>
                      <div class="data-lan">105.92112043357696,27.964256287556264,</div>
                      <div class="data-lan">105.92091193877158,27.964205562111193,</div>
                      <div class="data-lan">105.9208542238164,27.964187114438232,</div>
                      <div class="data-lan">105.9208197130125,27.96415830310821,</div>
                      <div class="data-lan">105.92080029324812,27.96412281270561,</div>
                      <div class="data-lan">105.9207860293069,27.964079824705042,</div>
                      <div class="data-lan">105.92078595718984,27.964026160094324,</div>
                      <div class="data-lan">105.92080459928937,27.963956686123016,</div>
                      <div class="data-lan">105.92085962858022,27.963860641969582,</div>
                      <div class="data-lan">105.92093103210053,27.96379657462432,</div>
                      <div class="data-lan">105.92096582117499,27.96375567639937,</div>
                      <div class="data-lan">105.92096012510541,27.96371640066716,</div>
                      <div class="data-lan">105.92093745019233,27.963660018969595,</div>
                      <div class="data-lan">105.92089153879233,27.96358718054201,</div>
                      <div class="data-lan">105.92086031809195,27.963537705526033,</div>
                      <div class="data-lan">105.92083396495131,27.963481231552954,</div>
                      <div class="data-lan">105.92080330513602,27.96340439676488,</div>
                      <div class="data-lan">105.92074524671014,27.963349814394903,</div>
                      <div class="data-lan">105.9206979370472,27.963330882951873,</div>
                      <div class="data-lan">105.92066511856488,27.963319671266106,</div>
                      <div class="data-lan">105.92062998583725,27.96330949526065,</div>
                      <div class="data-lan">105.92058744938319,27.963306718447708,</div>
                      <div class="data-lan">105.92064638420857,27.963267307084834,</div>
                      <div class="data-lan">105.92070407877083,27.96329179367823,</div>
                      <div class="data-lan">105.92077953577544,27.963324934975866,</div>
                      <div class="data-lan">105.92083386985662,27.963402784434198,</div>
                      <div class="data-lan">105.92088229239988,27.96348281179864,</div>
                      <div class="data-lan">105.92091094441868,27.963550527717192,</div>
                      <div class="data-lan">105.92097527030333,27.963659693742056,</div>
                      <div class="data-lan">105.92102319031027,27.963740398674496,</div>
                      <div class="data-lan">105.92103030554405,27.963784961423734,</div>
                      <div class="data-lan">105.92101930940022,27.96380814627377,</div>
                      <div class="data-lan">105.92099210350383,27.963819145222057</div>
                    </span>
                    <span>]</span>
                    <span>,</span>
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
        <div class="tableli" style="width: 30%">说明</div>
        <div class="tableli" style="width: 10%">类型</div>
        <div class="tableli">可选值</div>
        <div class="tableli">默认值</div>
        <div class="clear"></div>
        <div class="tablecontentli">colorRgba</div>
        <div class="tablecontentli" style="width: 30%">道路高亮的颜色,对应rgba(0,191,255,1)</div>
        <div class="tablecontentli" style="width: 10%">Array</div>
        <div class="tablecontentli">--</div>
        <div class="tablecontentli">[]</div>
        <div class="clear"></div>
        <div class="tablecontentli">roadArr</div>
        <div class="tablecontentli" style="width: 30%">道路点位</div>
        <div class="tablecontentli" style="width: 10%">Array</div>
        <div class="tablecontentli">--</div>
        <div class="tablecontentli">[]</div>
        <div class="clear"></div>
        <div class="tablecontentli">viewer</div>
        <div class="tablecontentli" style="width: 30%">地图传入的viewer视图数据</div>
        <div class="tablecontentli" style="width: 10%">Object</div>
        <div class="tablecontentli">--</div>
        <div class="tablecontentli">{}</div>
        <div class="clear"></div>
         <div class="tablecontentli">center</div>
        <div class="tablecontentli" style="width: 30%">中心点选择</div>
        <div class="tablecontentli" style="width: 10%">Object</div>
        <div class="tablecontentli">根据需要视角切换</div>
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
            <!-- <div class="tablecontentli">name</div>
            <div class="tablecontentli" style="width: 30%">
              广告牌名称
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
            <div class="clear"></div> -->
            <div class="tablecontentli">center</div>
            <div class="tablecontentli" style="width: 30%">
              见实例,包括经纬度，高度
            </div>
            <div class="tablecontentli" style="width: 10%">Object</div>
            <div class="tablecontentli">--</div>
            <div class="tablecontentli">--</div>
            <div class="clear"></div>
            <!-- <div class="tablecontentli">data</div> -->
            <!-- <div class="tablecontentli" style="width: 30%">
              见实例,包括name,detail
            </div>
            <div class="tablecontentli" style="width: 10%">Array</div>
            <div class="tablecontentli">--</div>
            <div class="tablecontentli">--</div>
            <div class="clear"></div> -->
          </div>
     
    </div>
  </template>
  <script>
  export default {
    components: {},
    data() {
      return {
        center:{y:27.963297,x:105.91685,z:932.82,heading:82.3,pitch:-18,roll:0.5},
        viewer:{},
        colorRgba:[0,191,255,1],
        roadArr:[
        105.92099210350383,27.963819145222057,
        105.92096828886392,27.96382457027858,
        105.92095501959602,27.963828551721264,
        105.92094642956769,27.963832195288695,
        105.9209195568148,27.963852685489467,
        105.92090495325714,27.96387171315268,
        105.92086791783647,27.963954996006574,
        105.92084251636328,27.964058604218025,
        105.92085695674486,27.96410324369808,
        105.9208733145479,27.96413487311091,
        105.92093149466417,27.964164441184256,
        105.92102349938146,27.964193561652824,
        105.92112934533262,27.964214509293914,
        105.92128922872111,27.96427080225929,
        105.9219417218975,27.9646976897298,
        105.9220707203454,27.964806248448074,
        105.92218835604513,27.964853839315992,
        105.92242427601147,27.96496780101612,
        105.92254092476244,27.96499058567692,
        105.92254619912713,27.965016580152902,
        105.92247925407007,27.965014152641402,
        105.92244027565295,27.9650201633429,
        105.92241646737719,27.965018101871433,
        105.92244481261046,27.965073315994317,
        105.9224905531549,27.96512149528183,
        105.92247318679547,27.965146398907365,
        105.92241100854221,27.965086004446857,
        105.92237063563363,27.96502676655238,
        105.92216588271124,27.96490892237527,
        105.92206417368361,27.964856399562176,
        105.92127480021676,27.964310577977493,
        105.92112718345972,27.96426925714564,
        105.92112043357696,27.964256287556264,
        105.92091193877158,27.964205562111193,
        105.9208542238164,27.964187114438232,
        105.9208197130125,27.96415830310821,
        105.92080029324812,27.96412281270561,
        105.9207860293069,27.964079824705042,
        105.92078595718984,27.964026160094324,
        105.92080459928937,27.963956686123016,
        105.92085962858022,27.963860641969582,
        105.92093103210053,27.96379657462432,
        105.92096582117499,27.96375567639937,
        105.92096012510541,27.96371640066716,
        105.92093745019233,27.963660018969595,
        105.92089153879233,27.96358718054201,
        105.92086031809195,27.963537705526033,
        105.92083396495131,27.963481231552954,
        105.92080330513602,27.96340439676488,
        105.92074524671014,27.963349814394903,
        105.9206979370472,27.963330882951873,
        105.92066511856488,27.963319671266106,
        105.92062998583725,27.96330949526065,
        105.92058744938319,27.963306718447708,
        105.92064638420857,27.963267307084834,
        105.92070407877083,27.96329179367823,
        105.92077953577544,27.963324934975866,
        105.92083386985662,27.963402784434198,
        105.92088229239988,27.96348281179864,
        105.92091094441868,27.963550527717192,
        105.92097527030333,27.963659693742056,
        105.92102319031027,27.963740398674496,
        105.92103030554405,27.963784961423734,
        105.92101930940022,27.96380814627377,
        105.92099210350383,27.963819145222057],
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
  .data-lan{
    margin-left: 10px;
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
  