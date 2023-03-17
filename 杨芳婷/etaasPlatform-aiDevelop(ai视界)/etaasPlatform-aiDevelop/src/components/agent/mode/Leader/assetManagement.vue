<template>
  <div class="all" :id="tableid">
    <div class="equipment-details">
      <div class="equipment-header">
        <img
          class="icoStyle"
          src="@/assets/digital/assets/img/mode/billboard/ico.png"
          alt=""
        />
        <span class="equipment-header-title">资产管理办公室</span>
      </div>
      <div class="equipment-content">
        <span>人员统计</span>
      </div>
      <!-- <div class="equipment-br"> -->
      <img src="@/assets/digital/assets/img/mode/billboard/br.png" alt="" />
      <!-- </div> -->
      <div class="equipment-list">
        <span class="left">仓库管理人员</span>
        <span class="center">10</span>
        <span class="right">人</span>
      </div>
      <div class="equipment-list">
        <span class="left">仓库执勤人员</span>
        <span class="center">10</span>
        <span class="right">人</span>
      </div>
      <div class="equipment-list">
        <span class="left">仓库货检人员</span>
        <span class="center">10</span>
        <span class="right">人</span>
      </div>
      <div class="equipment-content">
        <span>仓库统计</span>
      </div>

      <img src="@/assets/digital/assets/img/mode/billboard/br.png" alt="" />

      <div class="echars-header">
        <div>
          <img
            class="ico1Style"
            src="@/assets/digital/assets/img/mode/billboard/ico1.png"
            alt=""
          />
        </div>
        <div class="echars-header-item">
          <div class="ti">200 个</div>
          <div class="ti1">货架总数</div>
        </div>
        <div class="line"></div>
        <div class="echars-header-item">
          <div class="ti">100个</div>
          <div class="ti1">已用货架</div>
        </div>
         <div class="line"></div>
        <div class="echars-header-item1">
          <div class="ti">100个</div>
          <div class="ti1">剩余货架</div>
        </div>
      </div>
      <div class="echars">
        <div
          id="cesiumEchars"
          class="bb"
          ref="cesiumEchars"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  props: ["tableid", "componentData"],
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.drawLine2();
    const erd1 = elementResizeDetectorMaker();
    if (erd1) {
      erd1.listenTo(this.$refs.cesiumEchars, (element) => {
        this.cesiumEchars && this.cesiumEchars.resize();
      });
    }
  },
  methods: {
    drawLine2() {
      let that = this;
      this.cesiumEchars = this.$echarts.init(
        document.getElementById("cesiumEchars")
      );
      this.cesiumEchars.setOption({
        title: {
          text: "",
          textStyle: {
            color: "#333333",
            fontSize: 18,
            // fontWeight:'400',
            fontFamily: "sans-serif",
          },
        },
        tooltip: {
          // trigger: "axis",
          // extraCssText: "box-shadow:8px 8px 8px 8px rgba(0, 0, 0, 0.05)",
          // backgroundColor: "#fff",
          // axisPointer: {
          //   // Use axis to trigger tooltip
          //   show: false,
          //   type: "none",
          // },
          // formatter: (params, index) => {
          // },
        },
        grid: {
          // 直角坐标系内绘图网格
          left: "0", //grid 组件离容器左侧的距离,
          //left的值可以是80这样具体像素值，
          //也可以是'80%'这样相对于容器高度的百分比
          top: "0",
          right: "0",
          bottom: "0",
          containLabel: true, //gid区域是否包含坐标轴的刻度标签。为true的时候，
          // left/right/top/bottom/width/height决定的是包括了坐标轴标签在内的
          //所有内容所形成的矩形的位置.常用于【防止标签溢出】的场景
        },
        xAxis: {
          //直角坐标系grid中的x轴,
          //一般情况下单个grid组件最多只能放上下两个x轴,
          //多于两个x轴需要通过配置offset属性防止同个位置多个x轴的重叠。
          type: "value", //坐标轴类型,分别有：
          //'value'-数值轴；'category'-类目轴;
          //'time'-时间轴;'log'-对数轴
          splitLine: { show: false }, //坐标轴在 grid 区域中的分隔线
          axisLabel: { show: false }, //坐标轴刻度标签
          axisTick: { show: false }, //坐标轴刻度
          axisLine: { show: false }, //坐标轴轴线
        },
        yAxis: {
          type: "category",
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            color: "white",
            fontSize: 16,
          },
          data: ["物料1", "物料1", "物料1", "物料1", "物料1", "物料1"],
          // data: ['a','b','c']//类目数据，在类目轴（type: 'category'）中有效。
          //如果没有设置 type，但是设置了axis.data,则认为type 是 'category'。
        },
        series: [
          //系列列表。每个系列通过 type 决定自己的图表类型
          {
            name: "%", //系列名称
            type: "bar", //柱状、条形图
            barWidth: 16, //柱条的宽度,默认自适应
            data: [50, 50, 50, 50, 50, 50, 50], //系列中数据内容数组
            label: {
              //图形上的文本标签
              show: true,
              position: "right", //标签的位置
              offset: [70,0],  //标签文字的偏移，此处表示向上偏移40
              formatter: "300T", //标签内容格式器 {a}-系列名,{b}-数据名,{c}-数据值
              color: "white", //标签字体颜色
              fontSize: 16, //标签字号
            },
            itemStyle: {
              normal: {
                color: "#25BCFF",
              },
            },
            zlevel: 1, //柱状图所有图形的 zlevel 值,
            //zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
          },
          {
            name: "进度条背景",
            type: "bar",
            barGap: "-100%", //不同系列的柱间距离，为百分比。
            // 在同一坐标系上，此属性会被多个 'bar' 系列共享。
            // 此属性应设置于此坐标系中最后一个 'bar' 系列上才会生效，
            //并且是对此坐标系中所有 'bar' 系列生效。
            barWidth: 16,
            data: [100, 100, 100, 100, 100, 100],
            color: "rgba(255,255,255,0.2000)", //柱条颜色
            itemStyle: {
              normal: {
                // barBorderRadius: 10
                color: "#333737",
              },
              emphasis: { color: "rgba(239,240,243,1)" },
            },
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss"   scoped>
.line {
  width: 1px;
  height: 17px;
  margin-top: 20px;
  
  background: #25bcff;
}
.ti {
  font-size: 20px;
  margin-bottom: 4px;
  color: #25bcff;
  margin-top: 5px;
}
.ti1 {
  margin-top: 10px;
  color: #ffffff;
  font-size: 16px;
}
.ico1Style {
  width: 32px;
  height: 32px;
  margin-top: 15px;
}
.echars-header {
  width: 90%;
  height: 54px;
  display: flex;
  justify-content: space-between;
  // background: red;
}
.echars-header-item {
  // width: 70px;
  height: 54px;
  // background: gold;
  // border-right: 1px #25BCFF solid;
}
.echars-header-item1 {
  width: 80px;
  height: 54px;
  // background: red;
}
.bb {
  height: 280px;
  /* background: red; */
}
.echars {
  width: 80%;
  height: 200px;
  /* background: #25bcff; */
}
.icoStyle {
  width: 20px;
  height: 20px;
}
.all {
  width: 365px;
  height: 650px;
  position: relative;
  pointer-events: all;
}
.equipment-details {
  width: 365px;
  height: 650px;
 background: url("~@/assets/digital/assets/img/mode/billboard/warehosebg.png") no-repeat;
  /* background: black; */
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 16px 0px 0px 20px;
}
.equipment-header {
  height: 20px;
}
.equipment-header-title {
  color: #25bcff;
}
.equipment-content {
  height: 22px;
  margin-top: 32px;
  line-height: 22px;
  color: #25bcff;
  /* background: red; */
}
.equipment-br {
  height: 1px;
  width: 92px;

  background: red;
}
.equipment-list {
  height: 28px;
  margin-top: 16px;
}
.left {
  line-height: 28px;
  color: #ffffff;
}
.center {
  line-height: 28px;
  padding: 0 10px;
  color: #25bcff;
  font-size: 20px;
}
.right {
  line-height: 28px;
  color: #25bcff;
}
img {
  width: 92px;
  height: 1px;
}
</style>