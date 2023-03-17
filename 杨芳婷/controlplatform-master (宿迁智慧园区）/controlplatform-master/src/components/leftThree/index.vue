<template>
<div class="common">
  <!--标题-->
  <div class="title"></div>
  <!--内容区-->
  <div class="warehouse-content">
    <div class="warehouse-item" v-for="item in warehouseData" :key="item.id">
      <div class="bubble-container">
        <div class="bubble" ref="bubble">
          <!-- 圆圈进度条 -->
          <Bubble :dash-array="dashArray" :percentage="getPercentage(item.percentage)"/>
          <img :src="bubblePic" class="bubble-pic">
          <span class="bubble-percentage">{{ toPercentage(item.percentage) }}</span>
        </div>
      </div>
      <!-- 仓储具体信息 -->
      <div class="item-detail">
        <span class="detail-name">{{ item.name }}</span>
        <img :src="isUp(item.odds) ? arrowsPic.up : arrowsPic.down" class="detail-icon">
        <span :class="isUp(item.odds) ? 'detail-odds detail-odds-up' : 'detail-odds detail-odds-down'">
          {{ deleteMinusSign(item.odds) }}
        </span>
      </div>
    </div>

  </div>
</div>
         
</template>

<script>
import Bubble from './bubble.vue'
export default {
  name: "leftThree",
  components: {
    Bubble
  },
  data() {
    return {
      // 气泡图片
      bubblePic: require('@/assets/img/left/bubble.svg'),
      // 箭头图片
      arrowsPic: {
        up: require('@/assets/img/left/up-arrow.svg'),
        down: require('@/assets/img/left/down-arrow.svg')
      },
      // 圆圈进度条周长
      dashArray: 0,
      // 仓储数据
      warehouseData: [
        {
          id: 1,
          name: '1号仓库',
          odds: '3.7',
          percentage: 0.55
        },
        {
          id: 2,
          name: '2号仓库',
          odds: '-1.2',
          percentage: 0.61
        },
        {
          id: 3,
          name: '3号仓库',
          odds: '-4.5',
          percentage: 0.45
        },
      ]
    }
  },
  mounted() {
    // 动态获取 圆圈进度条 的周长
    this.$nextTick(() => {
      this.dashArray = this.$refs.bubble[0].clientWidth * Math.PI
    })
  },
  methods: {
    // 判断是否上升
    isUp(num) {
      return num[0] !== '-'
    },
    // 删除负数符号
    deleteMinusSign(num) {
      return num[0] === '-' ? num.slice(1) : num
    },
    // 将数据修改为百分数
    toPercentage(num) {
      return Math.floor(num * 100) + '%'
    },
    // 计算圆圈进度条百分比
    getPercentage(percentage) {
      return (1 - percentage) * this.dashArray
    }
  }
}
</script>
<style lang="scss" scoped>
  .common{
    width: 100%;
    height: 31.17vh;
    background-image: url("~@/assets/img/left/left-three-bg.png");
    background-size: 100% 100%;
    background-color: transparent !important;
    /* 标题样式 */
    .title {
      height: 20%;
      width: 100%;
    }
    /* 内容区样式 */
    .warehouse-content {
      height: 80%;
      display: flex;
      padding: 8% 8%;
      gap: 5%;
      .warehouse-item {
        flex: 1;
        height: 100%;
        .bubble-container {
          /* 将盒子控制为正方形 */
          width: 100%;
          padding-top: 100%;
          background-color: transparent;
          position: relative;
          .bubble {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
          }
          .bubble-pic {
            width: 76%;
            position: absolute;
            left: 12%;
            top: 12%;
          }
          .bubble-percentage {
            color: #fff;
            font-size: 1.6vw;
            font-weight: 600;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
          }
        }
        .item-detail {
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
          margin-top: 12%;
          .detail-name {
            color: #fff;
            display: inline-block;
            margin-right: 4%;
            font-size: 1vw;
          }
          .detail-icon {
            font-size: 0.5vw;
            margin-right: 2%;
          }
          .detail-odds {
            font-size: 0.5vw;
            &-up {
              color: #8EEC80;
            }
            &-down {
              color: #FF6B64;
            }
          }
        }
      }
    }
  }
</style>