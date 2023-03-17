<template>
  <div class="concent-analysis"> 
    <div class="concent-chart">
    <div class="concent-chart-title"> 
      <div class="concent-chart-num">187</div>
      <div class="concent-chart-detail">测点总数量</div>
      </div> 
    <div  class="concent-charts" id="concentChart"  ref="concentChart"> 
     
    </div> 
    </div>
    <div  class="concent-legend">
    <div class="concent-legend-li">
      <div class="concent-circle"></div>
      <div class="concent-title">
        <span class="concent-title-opacity">非常安全(<0.03)</span><span class="concent-num">100</span></div>
    </div>
     <div class="concent-legend-li">
      <div class="concent-circle" style="background:#1ECEBA"></div>
      <div class="concent-title">
        <span class="concent-title-opacity">安全(0.03~0.5)</span>
          <span class="concent-num">50</span></div>
    </div>
     <div class="concent-legend-li">
      <div class="concent-circle" style="background:#F1963A"></div>
      <div class="concent-title">
        <span class="concent-title-opacity">风险(0.5~1.0)</span>
          <span class="concent-num">20</span></div>
    </div>
     <div class="concent-legend-li">
      <div class="concent-circle" style="background:#F16548"></div>
      <div class="concent-title">
        <span class="concent-title-opacity">危险(1.0~1.5)</span>
          <span class="concent-num">14</span></div>
    </div>
      <div class="concent-legend-li">
      <div class="concent-circle" style="background:#B7B7B7"></div>
      <div class="concent-title">
        <span class="concent-title-opacity">掉线</span>
       <span class="concent-num">8</span></div>
    </div>
    </div>
    <div class="clear"></div>
    <div class="concent-border"></div>
    <div class="concent-foot">
      <div class="concent-foot-flex">
        <img src="@/assets/img/right/xccs.png" class="concent-foot-img"/>
        <div class="concent-foot-content">
        <div class="concent-foot-content-title">检测超限</div>
        <div class="concent-foot-content-num">23</div>
        </div>
        <div class="clear"></div>
      </div>
          <div class="concent-foot-flex">
        <img src="@/assets/img/right/bhyc.png" class="concent-foot-img"/>
        <div class="concent-foot-content">
        <div class="concent-foot-content-title">变化异常</div>
        <div class="concent-foot-content-num">56</div>
        </div>
        <div class="clear"></div>
      </div>
          <div class="concent-foot-flex">
        <img src="@/assets/img/right/sxss.png" class="concent-foot-img"/>
        <div class="concent-foot-content">
        <div class="concent-foot-content-title">持续上升</div>
        <div class="concent-foot-content-num">78</div>
        </div>
        <div class="clear"></div>
      </div>
          <div class="concent-foot-flex">
        <img src="@/assets/img/right/tscd.png" class="concent-foot-img"/>
        <div class="concent-foot-content">
        <div class="concent-foot-content-title">特殊测点</div>
        <div class="concent-foot-content-num">20</div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>
import elementResizeDetectorMaker from "element-resize-detector";
export default {
   data() {
    return {
     concentChart:""
    };
  },
  mounted(){
    const erd = elementResizeDetectorMaker();
    erd.listenTo(this.$refs.concentChart, (element) => {
      this.concentChart.resize();
    });
   this.initChart();
  },
  methods:{
   initChart(){
     this.concentChart = this.$echarts.init(document.getElementById('concentChart'));
     let option = {
            title: {
              text: '',
              subtext: '',
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)'
            },
            // graphic:{
            //    type: "text",
            //     left: "23%",
            //     top: "center",
            //     style: {
            //       text: `{val|187}\n{name|测点总数量}`,
            //       textAlign: "center",
            //       width: 30,
            //       height: 30,
            //       fill:'#6FAEFF',
            //       rich: {
            //         name: {
            //           fontSize: 12,
            //           color: '#6FAEFF'
            //         },
            //         val: {
            //           fontSize: 24,
            //           fontWeight: 'bold',
            //           color: '#333333'
            //         }
            //       }
            //     }
            // },
            color:["#539DFC","#1ECEBA","#F1963A","#F16548","#B7B7B7",],
            legend: {
              left: 'center',
              orient: 'vertical',//设置图例的方向
					    	top: 10,
				        itemGap:30,//设置图例的间距
              data: [
                'rose1',
                'rose2',
                'rose3',
                'rose4',
                'rose5'
              ]
            },
            toolbox: {
              show: false,
              feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            series: [
              {
                name: 'Radius Mode',
                type: 'pie',
                radius: ['40%', '80%'],
                center: ['50%', '50%'],
                roseType: 'radius',
                itemStyle: {
                  borderRadius: 5
                },
                label: {
                   normal: {
                    show: false,
                    position: 'center',
                    
                    // color:'#9A9EBA',
                    // formatter: '配⽐详情',
                    },
                    emphasis: {//中间文字显示
                        show: false,
                    }

                },
                emphasis: {
                  label: {
                    show: false,
                  }
                },
                labelLine:{
                      show: false
                },
                data: [
                  { value: 100, name: '非常安全' },
                  { value: 50, name: '安全' },
                  { value: 20, name: '风险' },
                  { value: 14, name: '危险' },
                  { value: 8, name: '掉线' },
                  
                ]
              }
            
            ]
          };
	 
        // 使用刚指定的配置项和数据显示图表。
        this.concentChart.setOption(option);

   } 
  }
};
</script>
<style lang="scss" scoped>
.concent-analysis {
  width: 100%;
  min-height: 36.28vh;
  background:url('~@/assets/img/right/thirdbg.png') no-repeat center center;
  background-size:100% 100%;

.concent-chart{
  width:50%;
  float:left;
  margin:0 auto;
  margin-top:5vh;
  height:23vh;
  position: relative;
  .concent-charts{
    width:100%;
    height: 100%;
  }
  .concent-chart-title{
    position: absolute;
    top:40%;
    left:calc(50% - 2.5vw);
    width:5vw;
    color:#6FAEFF;
    font-size: 1.8vw;
    text-align: center;
  }
  .concent-chart-num{
    font-weight: bold;
  }
  .concent-chart-detail{
     font-size: 0.6vw;
     color:#fff;
     margin-top:0.4vh;
  }
}
.clear{
  clear:both;
}
.concent-legend{
  float:left;
  width:50%;
  margin-top:10vh;
}
.concent-circle{
  background:#539DFC;
  border-radius: 50%;
  width:8px;
  height: 8px;
  float:left;
  margin-top:2px;
  margin-right:0.3vw;
}
.concent-title{
  color:#BCDAFF;
 
}
.concent-title-opacity{
   opacity: 0.65;
}
.concent-num{
  margin-left:16px;
  float:right;
}
.concent-legend-li{
  margin-bottom:1.5vh;
  width:80%;
  font-size: 0.7vw;
}
.concent-border{
  width:90%;
  margin:0 auto;
  height:2px;
  background: linear-gradient(to right, rgba(34,131,255,0), #4895f6, rgba(72,149,247,0.39), rgba(72,150,248,0.77), rgba(71,152,255,0));
}
.concent-foot{
  display: flex;
  .concent-foot-flex{
    flex:1;
    align-items: center;
    justify-items: center;
    .concent-foot-content{
      float:left;
      margin-left:0.3vw;
      margin-top:2vh;
    }

    .concent-foot-img{
      float:left;
      width:1.8vw;
      margin-left:0.8vw;
      margin-top:2vh;
    }    
    @media screen and (max-width: 1320px) {
    .concent-foot-img{

      margin-left:0.2vw;
 
    }  
    }
    .concent-foot-content-title{
      color:#fff;
      opacity: 0.65;
      font-size: 12px;
    }
    .concent-foot-content-num{
      color:#fff;
      font-size: 16px;
      font-weight: bold;
      margin-top:8px;
    }
  }
}
}
</style>